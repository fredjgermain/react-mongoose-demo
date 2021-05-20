import { IsEmpty, GetValueAt, YMD, Stringify } from '../../_utils'; 




const REGEXP = { 
  INTEGER: new RegExp(/(\d+)/), 
  DECIMAL: new RegExp(/(\d+[\.\,]\d+)/), 

  EQUAL: new RegExp(/(===)|(==)/), 
  NOT_EQUAL: new RegExp(/(!==)|(!=)/), 
  LESSER_EQUAL: new RegExp(/(<=)/), 
  LESSER: new RegExp(/(<)/), 
  GREATER_EQUAL: new RegExp(/(>=)/), 
  GREATER: new RegExp(/(>)/), 

  ARITHMETIC: new RegExp(/((\+)|(-)|(\/)|(\*)|(%))/), 

  CONJUNCTION: new RegExp(/(\&\&)|(\&)/), 
  DISJUNCTION: new RegExp(/(\|\|)|(\|)/), 
} 



export function FilterPredicate(strPredicate:string, type:string, keys?:string[]): (x:any) => boolean { 
  let predicate = (x:any) => true; 
  if(IsEmpty(strPredicate)) 
    return predicate; 

  console.log(type); 
  if(type === 'boolean' || type === 'array') 
    predicate = IdentifyFilter(strPredicate); 
  else if(type === 'date') 
    predicate = DateFilter(strPredicate); 
  else if(type === 'string') 
    predicate = StringFilter(strPredicate); 
  else if(type === 'number') 
    predicate = LambdaFilter(strPredicate); 

  return !IsEmpty(keys) ? 
    (x:any) => 
      predicate(GetValueAt(x, keys)): 
      predicate; 
} 

/* 
boolean 
array 
*/ 
function IdentifyFilter(strPredicate:string) { 
  const splitPredicate = strPredicate.split('|'); 
  return (x:any) => splitPredicate.some( s => { 
    const [_s, _x] = Stringify([s, x]); 
    console.log(_s, _x); 
    return _s === _x; 
  }); 
} 


function LambdaFilter(strPredicate:string) { 
  return (x:any) => { 
    try{ 
      return eval(`${x} ${strPredicate}`); 
    } catch(err) { 
      return true; 
    } 
  } 
} 

/* 
string 
*/ 
function StringFilter(strPredicate:string) { 
  return (x:string) => { 
    return !!x.match(strPredicate); 
  } 
} 


/* 
date 
*/ 
function DateFilter(strPredicate:string) { 
  const splitPredicate = strPredicate.split(''); 
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


