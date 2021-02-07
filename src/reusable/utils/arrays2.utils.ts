//import { IsEmpty } from "../_utils2";


/* ToArray ======================================
"Wrap" an object as an array if not already an array. 
If object is undefined, returns an empty array. 
*/
export function ToArray(toArray:any|any[]):any[] { 
  return toArray !== undefined ? [toArray].flat() : [] as any[]; 
} 

export type Predicate<T> = (value:T, i:number, array:T[]) => boolean; 
export type Comparator<T, U> = (t:T, u:U) => boolean; 
export type Sorter<T> = (t:T, pivot:T) => boolean; 

// export 

// Useful predicate 
export function HasDuplicates<T> (value:T, i:number, array:T[]):boolean { 
  const accumulator = [...array].splice(i,1); 
  return accumulator.includes(value); 
} 

// IsADuplicate 
export function IsADuplicate<T> (value:T, i:number, array:T[]):boolean { 
  const accumulator = [...array].splice(0,i); 
  console.log(accumulator); 
  return accumulator.includes(value); 
} 


/* DUPLICATES ===========================================

*/
export function Duplicates<T>(array:T[] = [], compare?:Comparator<T, T>):
  {duplicates:T[], unics:T[]} { 

  let duplicates = [] as T[]; 
  let unics = [] as T[]; 

  array.forEach( (t:T, ti:number, array:T[]) => { 
    const predicate = (a:T, ai:number) => { 
      if(ti===ai) 
        return false; 
      return compare ? compare(t,a): t === a; 
    } 
    if(array.some(predicate)) 
      duplicates.push(t); 
    else 
      unics.push(t); 
  }) 
  return {duplicates, unics}; 
}


/* GROUP ========================================
--- If 'values' is specified, groups elements from 'array' by their element[key] values, where element[key] in values. 
Groups will follow the order of values specified in 'values'

--- If 'values' is NOT specified, groups element from 'array' by their element[key] values. 
*/
export function Group<T>(array:T[] = [], key:string, values?:any[]):Array<T[]> { 
  const [value, ...remainder] = values ?? []; 
  if(!value) 
    return []; 
  const predicate = (t:any, i:number, ts:any[]) => { 
    if(value) 
      return t[key] === value; 
    const [a] = ts; 
    return t[key] === a[key]; 
  } 
  const {inclusion, exclusion} = Filter(array, predicate); 
  const groups = Group(exclusion, key, remainder); 
  return [inclusion, ...groups]; 
}


/* SORT =========================================
Quick sort using a predicate (sorter) 
*/ 
export function Sort<T>(array:T[] = [], sorter:Sorter<T>):T[] { 
  const [pivot, ...remainder] = [...array]; 
  if(remainder && remainder?.length <= 1) 
    return pivot ? [pivot] : []; 
  const {exclusion, inclusion} = Filter(remainder, (t:T) => sorter(t, pivot)); 
  const left = Sort<T>(exclusion, sorter); 
  const right = Sort<T>(inclusion, sorter); 
  return [...left, pivot, ...right]; 
} 


/* INDEXES ======================================= 
Returns indexes of each element matching predicate 
*/ 
export function Indexes<T>(array:T[] = [], predicate:Predicate<T>): number[] { 
  const indexes = [] as number[]; 
  array?.forEach( (t,i,a) => { 
    if(predicate(t,i,a)) 
      indexes.push(i); 
  }) 
  return indexes; 
} 


/* INTERSECT ==================================== 
Return 2 lists, 
  - 'inclusion' the list of elements from 'ts' that intersect 'us'. 
  - 'exclusion' the list of all remaining elements. 

2 elements intersect if the predicate 'compare' return true for these 2 elements. 
*/ 
export function Intersection<T, U>(ts:T[] = [], us:U[] = [], compare:Comparator<T,U>): 
    {inclusion:T[], exclusion:T[]} { 
  
  const predicate = (t:T) => us.some(u => compare(t,u)); 
  return Filter(ts, predicate); 
} 


/* FILTER ======================================= 
Return 2 lists, 
  - 'inclusion' the list of elements matching predicate. 
  - 'exclusion' the list of all remaining elements. 
*/ 
export function Filter<T>(array:T[] = [], predicate:Predicate<T>): 
    {inclusion:T[], exclusion:T[]} { 

  const inclusion = [] as T[]; 
  const exclusion = [] as T[]; 

  array?.forEach( (value:T, i:number, array:T[]) => { 
    if(predicate(value, i, array)) 
      inclusion.push(value); 
    else 
      exclusion.push(value); 
  })
  return {inclusion, exclusion}; 
} 


/* UNION ================================================== 
Unite 2 lists. 
Optional; exclude element not matching predicate. 
*/ 
export function Union<T>(A:T|T[] = [], B:T|T[] = [], predicate?:Predicate<T>): T[] { 
  const union = [...ToArray(A), ...ToArray(B)]; 
  return predicate ? union.filter(predicate) : union; 
} 