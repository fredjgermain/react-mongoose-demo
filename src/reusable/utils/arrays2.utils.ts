import { IsEmpty } from "../_utils2";


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


/* COMPARE ====================================== 
  Compare each element of 'toCompare' with the 'array' 
*/ 
export function Compare<T, U>(array:T[] = [], toCompare:U[] = [], compare:Comparator<T,U>):
  {comparable:T[], remainder:T[]} { 
  let comparable = [] as T[]; 
  let remainder = [...array]; 

  const copy = []; 
  toCompare?.forEach( u => { 
    const predicate = (t:T) => compare(t,u); 
    const {inclusion, exclusion} = Filter(remainder, predicate); 
    comparable = [...comparable, ...inclusion]; 
    remainder = [...exclusion]; 
  }) 
  return {comparable, remainder}; 
} 


/* Group ======================================== 
*/ 
export function Group<T>(array:T[] = [], predicates:Predicate<T>[] = []):Array<T[]> { 
  const [predicate, ...remainder] = predicates; 
  if(!predicate || IsEmpty(array) ) 
    return []; 
  const {inclusion, exclusion} = Filter(array, predicate); 
  if(IsEmpty(remainder)) 
    return [inclusion, exclusion]; 
  const groups = Group(exclusion, remainder); 
  return [inclusion, ...groups]; 
} 

/* Sort =========================================
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