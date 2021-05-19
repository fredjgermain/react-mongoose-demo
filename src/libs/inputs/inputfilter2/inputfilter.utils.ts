import { IsEmpty, GetValueAt, YMD, ReduceToString, SplitWithRegex } from '../../_utils'; 

/* 
boolean 
array 
*/ 
function IdentifyFilter(splitPredicate:string[]) { 
  return (x:any) => splitPredicate.some( s => s === x); 
} 

/* 
number 

single number (decimal or integer)
((\d+[\.\,]?\d+)|(\d+))

arithmetic operator 
[+-\/\*%] 
((\+)|(-)|(\/)|(\*)|(%))

comparator operator 
((===)|(==)|(!==)|(!=)|(>=)|(<=)|(>)|(<))

*/

//const regexp = new RegExp('foo[a-z]*','g'); 

const REGEXP = { 
  INTEGER: new RegExp(/(\d+)/), 
  NUMBER: new RegExp(/((\d+[\.\,]?\d+)|(\d+))/), 
  COMPARATOR: new RegExp(/((===)|(==)|(!==)|(!=)|(>=)|(<=)|(>)|(<))/), 
  //ARITHMETIC: new RegExp(/[+-\/\*%]/), 
  ARITHMETIC: new RegExp(/((\+)|(-)|(\/)|(\*)|(%))/), 
} 

const regexs = ReduceToString( Object.values(REGEXP).map( regex => regex.source ), '|' ); 

console.log(new RegExp(regexs).source); 

//const regex = '(' + REGEXP.ARITHMETIC.source + REGEXP.NUMBER.source + ')';

const test = '5++++asd== 21222 > asd <=sa2'; 
console.log(SplitWithRegex(test, new RegExp(regexs))); 



function LambdaFilter(splitPredicate:string[]) { 
  const reduced = ReduceToString(splitPredicate, ' '); 
  return (x:any) => eval(`${x} ${reduced}`); 
} 

/* 
string 
*/ 
function StringFilter(splitPredicate:string[]) { 
  const [toMatch] = splitPredicate; 
  return (x:string) => { 
    return !!x.match(toMatch); 
  } 
} 


/* 
date 
*/ 
function DateFilter(splitPredicate:string[]) { 
  const funcs = [] as ((x:any) => boolean)[]; 
  for(let i=0; i<splitPredicate.length; i++) { 
    const operator = splitPredicate[i]; 
    const operand = splitPredicate[++i]; 
    let func = (x:any) => true; 
    if(operator==='before') 
      func = (x:any) => YMD.IsBefore(x, operand); 
    else if(operator==='after') 
      func = (x:any) => YMD.IsBefore(operand, x); 
    else if(operator==='same') 
      func = (x:any) => YMD.IsSameDay(x, operand); 
    funcs.push(func); 
  } 
  return (x:any) => funcs.every( func => func(x)); 
} 



export function FilterPredicate(splitPredicate:string[], type:string, keys?:string[]): (x:any) => boolean { 
  let predicate = (x:any) => true; 
  if(IsEmpty(splitPredicate)) 
    return predicate; 
  
  if(type === 'boolean' || type === 'array') 
    predicate = IdentifyFilter(splitPredicate); 
  else if(type === 'date') 
    predicate = DateFilter(splitPredicate); 
  else if(type === 'string') 
    predicate = StringFilter(splitPredicate); 
  else 
    predicate = LambdaFilter(splitPredicate); 

  return !IsEmpty(keys) ? 
    (x:any) => 
      predicate(GetValueAt(x, keys)): 
      predicate; 
} 


