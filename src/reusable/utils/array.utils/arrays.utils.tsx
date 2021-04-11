import { IsEmpty } from '../../_utils';


/** PREDICATE =============== 
 * @param t current element.  
 * @param i current index number. 
 * @param a array itself. 
 * @param positive accumulator for positive results.  
 * @param negative accumulator of negative results.  
 * @return boolean if predicate passes of fails. 
 */
export type Predicate<T> = (t:T, i:number, a:T[], positive:T[], negative:T[]) => boolean; 

/** SORTER ================== 
 * @param t current element 
 * @param pivot value to compare to 't' 
 * @return boolean if comparison of 't' and 'pivot' passes or fails. 
 */
export type Sorter<T> = (t:T, pivot:T) => boolean; 



/** TOARRAY ================= 
 * Converts an object into a array if it is not already an array. Returns the array itself it is already an array, or returns an empty array if it is empty. 
 * @param toArray value to be converted into an array. 
 * @returns an array. 
 */
export function ToArray(toArray:any|any[]):any[] { 
  return toArray !== undefined ? [toArray].flat() : [] as any[]; 
} 


/**
 * 
 * @param array 
 * @param predicate 
 * @returns 
 */
/*export function BreakAt<T>(array:T[], predicate:Predicate<T>): T[][] { 
  if(IsEmpty(array)) 
    return [array]; 
  let segments = [] as T[][]; 
  let [left, right] = Filter(array, predicate); 
  segments.push(left); 
  while(!IsEmpty(left) && !IsEmpty(right)) { 
    [left, right] = Filter(right, predicate); 
    segments.push(left); 
  } 
  if(!IsEmpty(right)) 
    segments.push(right); 
  return segments; 
} */



/** PICK ==================== 
 * 
 * @param toPickFrom 
 * @param pickingOrder 
 * @param picker 
 * @returns 
 */ 
export function Pick<T, U>(toPickFrom:T[], pickingOrder:U[] = [], picker:(t:T, u:U) => boolean):T[] { 
  let picked = [] as T[]; 
  pickingOrder.forEach( p => { 
    const found = toPickFrom.filter( t => picker(t, p) ) 
    if(found) 
      picked = [...picked, ...found]; 
  }); 
  return picked; 
}


/** GROUP =================== 
 * Grups elements using a single predicate. 
 * @param array array to group. 
 * @param grouping grouping predicate determines a criteria to group elements. 
 * @returns an array of grouped values (array of arrays). 
 */ 
export function Group<T>(array:T[] = [], grouping:Predicate<T>):T[][] { 
  if(IsEmpty(array)) 
    return []; 
  const [grouped, ungrouped] = Filter(array, grouping); 
  const remainder = Group<T>(ungrouped, grouping); 
  return [grouped, ...remainder]; 
}


/*export function Group<T>(array:T[] = [], sorter:Sorter<T>):T[][] { 
  const [pivot, ...remainder] = [...array]; 
  if(IsEmpty(remainder)) 
    return pivot ? [[pivot]] : []; 
  const [grouped, ungrouped] = Filter(remainder, (t:T) => sorter(t, pivot)); 
  const right = Group<T>(ungrouped, sorter); 
  return [[...grouped, pivot], ...right]; 
} */


/** SORTS ===================
 * Quick sorts an array using multiple criterias. The reversing of the sorters is necessary to properly sort. 
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
 * Quick sort an array
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
 * Takes an array and filter that array according to a predicate. Returns 2 accumulators; 
 * accumulator "positive" for elements that pass the predicate. 
 * accumulator "negative" for elements that fail the predicate. 
 * @param array array to filter 
 * @param predicate filtering predicate 
 * @returns 2 arrays: 
 * - First array matching values. 
 * - Second array not matching values. */
export function Filter<T>(array:T[] = [], predicate:Predicate<T>):[T[], T[]] { 
  const positive = [] as T[]; 
  const negative = [] as T[]; 
  array.forEach( (v:T, i:number, a:T[]) => 
    predicate(v, i, a, positive, negative) ? positive.push(v): negative.push(v) 
  ) 
  return [positive, negative]; 
} 


/** CONCATENATE ===================
 * Concatenate 2 arrays 
 * @param A an array or single element 
 * @param B an array or single element 
 * @param predicate 
 * @returns return a single array
 */
export function Concatenate<T>(A:T|T[] = [], B:T|T[] = [], predicate?:Predicate<T>): T[] { 
  const union = [...ToArray(A), ...ToArray(B)]; 
  return predicate ? Filter(union, predicate)[0] : union; 
} 