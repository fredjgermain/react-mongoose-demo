import { IsEmpty } from '../_utils';

export type Predicate<T> = (t:T, i?:number, a?:T[]) => boolean; 
export type Sorter<T> = (t:T, pivot:T) => boolean; 



/** TOARRAY =================
 * Converts an object into a array. 
 * @param toArray value to be converted into an array. 
 * @returns an array 
 */
export function ToArray(toArray:any|any[]):any[] { 
  return toArray !== undefined ? [toArray].flat() : [] as any[]; 
} 


export function Pick<T, U>(toPickFrom:T[], pickingOrder:U[], picker:(t:T, u:U) => boolean):T[] { 
  let picked = [] as T[]; 
  pickingOrder.forEach( p => { 
    const found = toPickFrom.filter( t => picker(t, p) ) 
    if(found) 
      picked = [...picked, ...found]; 
  }); 
  return picked; 
}


/** GROUPS ==================
 * Groups elements using multiple grouping predicates. returns an array of grouped elements. Also sorts values. 
 * @param array Array to group. 
 * @param sorters Multiple grouping criterias. 
 * @returns an array of array of grouped values. 
 */
export function Groups<T>(array:T[] = [], sorters:Sorter<T>[]):T[][] { 
  const sorted = Sorts( array, sorters ); 
  return Group( sorted, (t:T, pivot:T) => 
    sorters.every( s => s(t, pivot) ) 
  ); 
} 

/** GROUP ===================
 * Grups elements using a single predicate. 
 * @param array array to group. 
 * @param sorter grouping predicate
 * @returns an array of array of grouped values. 
 */
export function Group<T>(array:T[] = [], sorter:Sorter<T>):T[][] { 
  const [pivot, ...remainder] = [...array]; 
  if(IsEmpty(remainder)) 
    return pivot ? [[pivot]] : []; 
  const [grouped, ungrouped] = Filter(remainder, (t:T) => sorter(t, pivot)); 
  const right = Group<T>(ungrouped, sorter); 
  return [[...grouped, pivot], ...right]; 
} 


/** SORTS ===================
 * Sorts an array by multiple criteria. The reversing of the sorters helps proper sorting of array. 
 * @param array array to sort. 
 * @param sorters array of sorting predicates. 
 * @returns sorted array 
 */
export function Sorts<T>(array:T[] = [], sorters:Sorter<T>[] = []):T[] { 
  let sorted = [...array]; 
  if(IsEmpty(sorters)) 
    return sorted; 
    const _sorters = [...sorters].reverse(); 
  _sorters.forEach( sorter => sorted = Sort(sorted, sorter)) 
  return sorted; 
} 


/** SORT ====================
 * Quick sort array
 * @param array array to sort. 
 * @param sorter sorting predicate. 
 * @returns sorted array. 
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


/** FILTER ==================
 * Filter 
 * @param array array to filter 
 * @param predicate filtering predicate 
 * @returns 2 arrays: 
 * - First array matching values. 
 * - Second array not matching values. 
 */
export function Filter<T>(array:T[] = [], predicate:Predicate<T>):[T[], T[]] { 
  const positive = [] as T[]; 
  const negative = [] as T[]; 
  array.forEach( (v:T, i:number, a:T[]) => 
    predicate(v, i, a) ? positive.push(v): negative.push(v) 
  ) 
  return [positive, negative]; 
} 


/** CONCATENATE ===================
 * Concatenate 2 arrays 
 * @param A 
 * @param B 
 * @param predicate 
 * @returns 
 */
export function Concatenate<T>(A:T|T[] = [], B:T|T[] = [], predicate?:Predicate<T>): T[] { 
  const union = [...ToArray(A), ...ToArray(B)]; 
  return predicate ? Filter(union, predicate)[0] : union; 
} 