import { IsEmpty } from '../../reusable/_utils';

export type Predicate<T> = (t:T, i?:number, a?:T[]) => boolean; 
export type Sorter<T> = (t:T, pivot:T) => boolean; 

/* GROUPS =======================================
Groups elements using multiple predicates. 
returns an array of grouped elements. 
*/
export function Groups<T>(array:T[] = [], sorters:Sorter<T>[]):T[][] { 
  const sorted = Sorts( array, sorters ); 
  return Group( sorted, (t:T, pivot:T) => sorters.every( s => s(t, pivot) ) ); 
} 
/*export function Groups<T>(array:T[] = [], sorters:Sorter<T>[]):T[][] { 
  const [sorter, ..._sorters] = sorters; 
  if(!sorter) 
    return [array]; 
  
  let grouped = [] as T[][]; 
  const groups = Group(array, sorter); 
  groups.forEach( group => { 
    const _grouped = Groups(group, _sorters); 
    grouped = [...grouped, ..._grouped]; 
  }); 
  return grouped; 
} */


/* GROUP ======================================== 
Groups elements using a Sorter predicate. 
returns an array of grouped elements. 
*/ 
export function Group<T>(values:T[] = [], sorter:Sorter<T>):T[][] { 
  const [pivot, ...remainder] = [...values]; 
  if(IsEmpty(remainder)) 
    return pivot ? [[pivot]] : []; 
  const [grouped, ungrouped] = Filter(remainder, (t:T) => sorter(t, pivot)); 
  const right = Group<T>(ungrouped, sorter); 
  return [[...grouped, pivot], ...right]; 
}



/* FILTER =======================================

*/
export function Filter<T>(values:T[] = [], predicate:Predicate<T>):[T[], T[]] { 
  const positive = [] as T[]; 
  const negative = [] as T[]; 
  values.forEach( (v:T, i:number, a:T[]) => 
    predicate(v, i, a) ? positive.push(v): negative.push(v) 
  ) 
  return [positive, negative]; 
}


/* SORTS ============================================== 
Execute several quick sorts. 
*/
export function Sorts<T>(array:T[] = [], sorters:Sorter<T>[] = []):T[] { 
  let sorted = [...array]; 
  if(IsEmpty(sorters)) 
    return sorted; 
    const _sorters = [...sorters].reverse(); 
  _sorters.forEach( sorter => sorted = Sort(sorted, sorter)) 
  return sorted; 
}

/* SORT =============================================== 
Quick sort 
*/ 
export function Sort<T>(array:T[] = [], sorter:Sorter<T>):T[] { 
  const [pivot, ...remainder] = [...array]; 
  if(IsEmpty(remainder)) 
    return pivot ? [pivot]:[]; 
  const [inclusion, exclusion] = Filter(remainder, (t:T) => sorter(t, pivot)); 
  const left = Sort<T>(inclusion, sorter); 
  const right = Sort<T>(exclusion, sorter); 
  return [...left, pivot, ...right]; 
} 