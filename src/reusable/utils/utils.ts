// 
type ArrayPredicate = (e?:any, i?:number, a?:any[])=>boolean; 

export function Remove(array:any[], predicate:ArrayPredicate):[any[], any[]] { 
  const removed = array.filter(predicate); 
  const kept = array.filter( (e,i,a) => !predicate(e,i,a) ); 
  return [kept, removed]; 
} 

export function Union(array:any[], toUnite:any|any[], predicate:ArrayPredicate = () => true):any[] { 
  return [...array, ...ToArray(toUnite).filter(predicate)]; 
}

export function ToArray(toArray:any|any[]):any[] { 
  return toArray ? [toArray].flat() : []; 
}

export function Select(array:any[], predicate:ArrayPredicate = () => true):any[] { 
  const selection:any[] = []; 
  array.forEach( e => { 
    if(predicate(e)) 
      selection.push(e); 
  }); 
  return selection; 
}