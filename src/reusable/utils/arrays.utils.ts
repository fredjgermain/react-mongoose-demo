// ARRAY METHODS ################################


// Common predicate ----------------------------
const IsDuplicate = (comparator:(a:any, b:any) => boolean = () => true) => (b:any, i:number, ar:any[]) => 
  ar.some(a => comparator(a, b) && a!==b); 

const IsUnic = (comparator:(a:any, b:any) => boolean = () => true) => (b:any, i:number, ar:any[]) => 
  !ar.some(a => comparator(a, b) && a!==b); 

const ByIndexes = (indexes:number[]) => (b:any, i:number, ar:any[]) => 
  indexes.includes(i); 

const Intersect = (array:any[], comparator:(a:any, b:any) => boolean = () => true) => (b:any) => 
  array.some(a => comparator(a, b) && a===b); 

const Exclusion = (array:any[], comparator:(a:any, b:any) => boolean = () => true) => (b:any) => 
  !array.some(a => comparator(a, b) && a===b); 

export const CommonPredicates = {IsDuplicate, IsUnic, ByIndexes, Intersect, Exclusion}; 

/*=> (b:any, i:number, ar:any[]) => 
  indexes.includes(i); */

// ToArray ======================================
export function ToArray(toArray:any|any[]):any[] { 
  return toArray !== undefined ? [toArray].flat() : []; 
} 


// Remove =======================================
export function Remove(array:any[], predicate:(e:any, i:number, a:any[])=>boolean ):[any[], any[]] { 
  const removed = array.filter(predicate); 
  const kept = array.filter( (e,i,a) => !predicate(e,i,a) ); 
  return [kept, removed]; 
} 

// Union ========================================
export function Union(array:any[], toUnite:any|any[], predicate:(e:any, i:number, a:any[])=>boolean = () => true):any[] { 
  return [...array, ...ToArray(toUnite).filter(predicate)]; 
} 


// Filter =======================================
export function Filter<T>(array:T[] = [], predicate:(e:any, i:number, a:any[])=>boolean = () => true) 
: {selection: T[], indexes: number[]} 
{ 
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


// DUPLICATES ===================================
export function Duplicates(array:any[], compare:(a:any, b:any)=>boolean = (a:any, b:any) => a === b ):{duplicates:any[], unics:any[]} { 
  const {selection:duplicates} = Filter(array, IsDuplicate(compare)); 
  const {selection:unics} = Filter(array, IsUnic(compare)); 
  return {duplicates, unics}; 
} 


// COMBINE =========================================
export function Combine(As:any[], Bs:any[], compare:(a:any, b:any)=>boolean = () => true ) { 
  const combines:any[] = []; 
  As.forEach( a => { 
    Bs.forEach( b => compare(a,b) ? combines.push([a,b]): null)
  }) 
  return combines; 
} 

export const ArrayMethods = {}; 
//const combine = Combine(ordering, strings, (a,b) => a===b.name).map(([a,b]) => b); 