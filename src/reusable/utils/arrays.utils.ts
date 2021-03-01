import { IsEmpty } from "../_utils";

//export type Predicate<T> = (value:T, i:number, array:T[]) => boolean; 
export type Predicate<T> = (t:T, i:number, positive:T[], negative:T[], remainder:T[]) => boolean; 
export type Comparator<T, U> = (t:T, u:U) => boolean; 
export type Sorter<T> = (t:T, pivot:T) => boolean; 


/* ToArray ======================================
"Wrap" an object as an array if not already an array. 
If object is undefined, returns an empty array. 
*/
export function ToArray(toArray:any|any[]):any[] { 
  return toArray !== undefined ? [toArray].flat() : [] as any[]; 
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



/* PICK =========================================
Intersect elements comparable with pickingOrder
Sort intersecting elements according to pickingOrder
returns sorted elements
*/
export function Pick<T, U>(array:T[] = [], pickingOrder:U[], compare:Comparator<T,U>): T[] { 
  const [toSort] = Intersect(array, pickingOrder, compare); 

  // Sort 'toSort'. 
  const sorter = (t:T, pivot:T) => { 
    const pivotIndex = pickingOrder.findIndex(u => compare(pivot,u)); 
    const index = pickingOrder.findIndex(u => compare(t,u)); 
    return index >= pivotIndex; 
  }; 
  // Return sorted elements 
  return Sort<T>(toSort,  sorter); 
} 



/* GROUPS =======================================
Successively use Group on previous 
*/
export function Groups<T>(array:T[] = [], predicates:Predicate<T>[]):T[][] { 
  const [predicate, ..._predicates] = predicates; 
  if(!predicate) 
    return [array]; 
  
  let grouped = [] as T[][]; 
  const groups = Group(array, predicate); 
  groups.forEach( group => { 
    const _grouped = Groups(group, _predicates); 
    grouped = [...grouped, ..._grouped]; 
  }); 
  return grouped; 
} 



/* GROUP ======================================== 
Successively use Filter on previous 'Negatives' until there's nothing left to filter. 
After each Filter, 'Positive' are added as a group. 
returns an array of grouped elements. 
*/
export function Group<T>(array:T[] = [], predicate:Predicate<T>):T[][] { 
  let [grouped, ungrouped] = Filter([...array], predicate); 
  let groups:T[][] = [grouped]; 

  while(!IsEmpty(grouped) && !IsEmpty(ungrouped)) { 
    [grouped, ungrouped] = Filter([...ungrouped], predicate); 
    groups = [...groups, grouped]; 
  } 
  return IsEmpty(ungrouped) ? groups: [...groups, ungrouped]; 
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



/* FILTER ======================================= 
Return 2 lists, 
  - 'positive' the list of elements matching predicate. 
  - 'negative' the list of elements not matching predicate. 

  // remainder excludes the iteration current value. 
*/ 
export function Filter<T>(values:T[] = [], predicate:Predicate<T>):[T[], T[]] { 
  let positive = [] as T[]; 
  let negative = [] as T[]; 

  values.forEach( (value:T, i:number) => { 
    const remainder = values.slice(i+1); 
    if(predicate(value, i, positive, negative, remainder)) 
      positive.push(value); 
    else 
      negative.push(value); 
  }) 
  return [positive, negative]; 
}



/* UNION ================================================== 
Unite 2 lists. 
Optional; exclude element not matching predicate. 
*/ 
export function Union<T>(A:T|T[] = [], B:T|T[] = [], predicate?:Predicate<T>): T[] { 
  const union = [...ToArray(A), ...ToArray(B)]; 
  return predicate ? Filter(union, predicate)[0] : union; 
} 