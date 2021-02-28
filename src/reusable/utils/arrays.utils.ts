import { IsEmpty } from "../_utils";

export type Predicate<T> = (value:T, i:number, array:T[]) => boolean; 
export type Comparator<T, U> = (t:T, u:U) => boolean; 
export type Sorter<T> = (t:T, pivot:T) => boolean; 


/* ToArray ======================================
"Wrap" an object as an array if not already an array. 
If object is undefined, returns an empty array. 
*/
export function ToArray(toArray:any|any[]):any[] { 
  return toArray !== undefined ? [toArray].flat() : [] as any[]; 
} 


/* DUPLICATES ===========================================

*/
export function Duplicates<T>(array:T[] = [], compare?:Comparator<T, T>):
  {duplicates:T[], unics:T[]} { 

  let duplicates = [] as T[]; 
  let unics = [] as T[]; 

  array.forEach( (t:T, ti:number, array:T[]) => { 
    const predicate = (a:T, ai:number, array:T[]) => { 
      if(ti===ai) 
        return false; 
      return compare ? compare(t,a): t === a; 
    }; 
    if(array.some(predicate)) 
      duplicates.push(t); 
    else
      unics.push(t); 
  }); 
  return {duplicates, unics}; 
}


/* INTERSECT ==================================== 
Return 2 lists, 
  - 'inclusion' the list of elements from 'ts' that intersect 'us'. 
  - 'exclusion' the list of all remaining elements. 

2 elements intersect if the predicate 'compare' return true for these 2 elements. 
*/ 
export function Intersect<T, U>(ts:T[] = [], us:U[] = [], compare:Comparator<T,U>): 
    [T[],T[]] { 
  
  const predicate = (t:T) => us.some(u => compare(t,u)); 
  return Filter(ts, predicate); 
} 


/* Pick ========================================
Filter elements comparable with pickingOrder
returns sorted elements
*/
export function Pick<T, U>(array:T[] = [], pickingOrder:U[], compare:Comparator<T,U>): T[] { 
  // Filter that intersect with pickingOrder
  // Intersection 
  const [toSort] = Intersect(array, pickingOrder, compare); 
  /*const predicate = (t:T) => pickingOrder.findIndex(u => compare(t,u)) >=0; 
  const [toSort] = Filter(array, predicate); */

  // Sort 'toSort'. 
  const sorter = (t:T, pivot:T) => { 
    const pivotIndex = pickingOrder.findIndex(u => compare(pivot,u)); 
    const index = pickingOrder.findIndex(u => compare(t,u)); 
    return index >= pivotIndex; 
  }; 
  // Return sorted elements 
  return Sort<T>(toSort,  sorter); 
} 



/* Group ======================================== */
export function Group<T>(array:T[], predicate:Predicate<T>):T[][] { 
  if(IsEmpty(array)) 
    return []; 
  if(array.length === 1) 
    return [array]; 
  let [grouped, ungrouped] = Filter(array, predicate); 
  let groups:T[][] = []; 

  let i = 0;
  while( !IsEmpty(grouped) && !IsEmpty(ungrouped) ) { 
    groups.push(grouped); 
    [grouped, ungrouped] = Filter(ungrouped, predicate); 
  } 
  if(!IsEmpty(grouped)) 
    groups.push(grouped); 
  else
    groups.push(ungrouped); 
  return groups; 
} 

/* SORT =========================================
Quick sort using a predicate (sorter) 
*/ 
export function Sort<T>(array:T[] = [], sorter:Sorter<T>):T[] { 
  const [pivot, ...remainder] = [...array]; 
  if(IsEmpty(remainder)) 
    return pivot ? [pivot] : []; 
  const [inclusion, exclusion] = Filter(remainder, (t:T) => sorter(t, pivot)); 
  const left = Sort<T>(exclusion, sorter); 
  const right = Sort<T>(inclusion, sorter); 
  return [...left, pivot, ...right]; 
} 


/* INDEXES ======================================= 
Returns indexes of each element matching predicate 
*/ 
export function Indexes<T>(array:T[] = [], predicate:Predicate<T>): [number[], number[]] { 
  const filtered = [] as number[]; 
  const remainder = [] as number[]; 

  array?.forEach( (t,i,a) => { 
    if(predicate(t,i,a)) 
      filtered.push(i); 
    else
      remainder.push(i); 
  }) 
  return [filtered, remainder]; 
} 


/* ACCUMULATOR ================================== 
*/
type AccumulatorPredicate<T> = (t:T, i:number, accumulator:T[], remainder:T[]) => boolean; 
export function Accumulator<T>(values:T[] = [], predicate:AccumulatorPredicate<T>) { 
  let filtered = [] as T[]; 
  let remainder = [...values]; 

  values.forEach( (value:T, i:number) => { 
    if(predicate(value, i, filtered, remainder)) { 
      filtered.push(remainder.shift() as T); 
    } 
  }) 
  return [filtered, remainder]; 
}



/* FILTER ======================================= 
Return 2 lists, 
  - 'filtered' the list of elements matching predicate. 
  - 'remainder' the list of all remaining elements. 
*/ 
export function Filter<T>(array:T[] = [], predicate:Predicate<T>):[T[], T[]] { 
  const filtered = [] as T[]; 
  const remainder = [] as T[]; 
  array?.forEach( (value:T, i:number, array:T[]) => { 
    if(predicate(value, i, array)) 
      filtered.push(value); 
    else 
      remainder.push(value); 
  }) 
  return [filtered, remainder]; 
} 


/* UNION ================================================== 
Unite 2 lists. 
Optional; exclude element not matching predicate. 
*/ 
export function Union<T>(A:T|T[] = [], B:T|T[] = [], predicate?:Predicate<T>): T[] { 
  const union = [...ToArray(A), ...ToArray(B)]; 
  return predicate ? union.filter(predicate) : union; 
} 