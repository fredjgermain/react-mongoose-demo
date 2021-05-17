import { IsEmpty, GetValueAt, YMD, ReduceToString } from '../../_utils'; 

/* 
PredicateFilter [ 
  [predicate && predicate] || 
  [predicate && predicate] || ... 
] 


StringFilter  [operand] 
NumberFilter  [operator, operand] 
              [operator, operand, operator, operand] 

SelectFilter  [value1, value2, ... valueN] => [[===, operand], ... [===, operand]] 
DateFilter    [[operator, operand], ... [operator, operand]] 
*/

const test = ['+', '5', '===', '12']; 
console.log(LambdaFilter(test)(7)) 

const testdate = ['before', '2021/01/10']; 
console.log(DateFilter(testdate)('2021/01/11')) 

const teststring = ['be']; 
console.log(StringFilter(teststring)('before')) 

const testIdentify = ['a', 'b', 'c']; 
console.log(IdentifyFilter(testIdentify)('d')); 


function IdentifyFilter(splitPredicate:string[]) { 
  return (x:any) => splitPredicate.some( s => s === x); 
} 

function LambdaFilter(splitPredicate:string[]) { 
  const reduced = ReduceToString(splitPredicate, ' '); 
  return (x:any) => eval(`${x} ${reduced}`); 
} 

function StringFilter(splitPredicate:string[]) { 
  const [toMatch] = splitPredicate; 
  return (x:string) => { 
    return !!x.match(toMatch); 
  } 
} 

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


/*function DateFilter(strPredicate:string):(x:any) => boolean {   
  return (x:any) => { 
    const x_ymd = new YMD(x as string) 
    const xymd = new YMD(x as string) 
    return true; 
  } 
}*/




export function FilterPredicate(strPredicate:string, type:string, keys?:string[]): (x:any) => boolean { 
  let predicate = (x:any) => true; 
  if(IsEmpty(strPredicate)) 
    return predicate; 
  
  if(type === 'boolean') 
    predicate = EqualPredicate(strPredicate); 
  else if(type === 'string') 
    predicate = StringMatchPredicate(strPredicate); 
  else 
    predicate = LambdaPredicate(strPredicate); 

  return !IsEmpty(keys) ? 
    (x:any) => 
      predicate(GetValueAt(x, keys)): 
      predicate; 
} 




function EqualPredicate(strPredicate:string):(x:any) => boolean { 
  return (x:string) => { 
    return String(x) === strPredicate; 
  } 
} 

function StringMatchPredicate(strPredicate:string):(x:any) => boolean { 
  return (x:string) => { 
    return !!x.match(strPredicate); 
  } 
}

function LambdaPredicate(strPredicate:string): (x:any) => boolean { 
  /*const operator =  /[(>=)|(<=)|(>)|(<)|(=)]/ 
  const operand =  /[(>=)|(<=)|(>)|(<)|(=)]/ */ 
  const seperator = /[(&&)]/ 
  const strPredicates = strPredicate.split(seperator).filter(s => s!==''); 
  const predicates:((x:any) => boolean)[] = []; 
  strPredicates.forEach( p => { 
    try{ 
      const func = (x:any):boolean => eval(x.toString() + p); 
      func(0); 
      predicates.push(func); 
    }catch(error) { 
      return (x:any) => true; 
    }; 
  }) 
  return (x:any) => predicates.every( predicate => predicate(x) ); 
}