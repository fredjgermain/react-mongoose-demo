

/* ToArray ======================================
"Wrap" an object as an array if not already an array. 
If object is undefined, returns an empty array. 
*/
export function ToArray(toArray:any|any[]):any[] { 
  return toArray !== undefined ? [toArray].flat() : [] as any[]; 
} 



export type Predicate<T> = (value:T, i:number, array:T[]) => boolean; 
export type Comparator<T, U> = (t:T, u:U) => boolean; 

// export 

// Useful predicate
export function HasDuplicates<T> (value:T, i:number, array:T[]):boolean { 
  const accumulator = [...array].splice(i,1); 
  return accumulator.includes(value); 
} 

export function IsADuplicate<T> (value:T, i:number, array:T[]):boolean { 
  const accumulator = [...array].splice(0,i); 
  console.log(accumulator); 
  return accumulator.includes(value); 
} 


/* PICK ==========================================

*/
export function Pick<T>(array:T[] = [], predicate:Predicate<T>): T[] { 
  /*if(Array.isArray(predicate)) { 
    const indexPredicate = (value:T, i:number) => predicate.includes(i); 
    return Pick(); 
  } */

  return Filter(array, predicate).inclusion; 
} 


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


/* INDEXES =======================================

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

*/
export function Union<T>(A:T|T[] = [], B:T|T[] = [], predicate?:Predicate<T>): T[] { 
  const union = [...ToArray(A), ...ToArray(B)]; 
  return predicate ? union.filter(predicate) : union; 
} 

