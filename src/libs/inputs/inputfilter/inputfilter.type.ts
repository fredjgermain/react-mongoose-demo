export type _Predicate = (x:any) => boolean; 


export type KeyPredicate = {handle:string, predicate:(x:any) => boolean} 


export interface IUseFilters { 
  filteredValues: any[]; 
  setPredicates: (keyPredicate?: KeyPredicate) => void; 
} 