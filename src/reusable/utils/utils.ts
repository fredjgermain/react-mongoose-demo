// 
type ArrayPredicate = (e:any, i:number, a:any[])=>boolean; 

export function Remove(array:any[], predicate:ArrayPredicate):[any[], any[]] { 
  const removed = array.filter(predicate); 
  const kept = array.filter( (e,i,a) => !predicate(e,i,a) ); 
  return [kept, removed]; 
} 

export function Union(array:any[], toUnite:any|any[], predicate:ArrayPredicate = () => true):any[] { 
  return [...array, ...ToArray(toUnite).filter(predicate)]; 
} 

export function ToArray(toArray:any|any[]):any[] { 
  return toArray !== undefined ? [toArray].flat() : []; 
} 


// Select element by predicate
interface IFilter<T> { 
  selection: T[]; 
  indexes: number[]; 
} 
export function Filter<T>(array:T[] = [], predicate:ArrayPredicate = () => true):IFilter<T> { 
  const selection:T[] = []; 
  const indexes:number[] = []; 
  array.forEach( (e,i,a) => { 
    if(predicate(e,i,a)) { 
      selection.push(e); 
      indexes.push(i); 
    } 
  }) 
  return {selection, indexes}; 
} 
