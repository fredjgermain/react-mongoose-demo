export type KeyPredicate = {handle:string, predicate:(x:any) => boolean} 

export interface IUseFilters { 
  filteredValues: any[]; 
  setPredicates: (keyPredicate?: KeyPredicate) => void; 
} 