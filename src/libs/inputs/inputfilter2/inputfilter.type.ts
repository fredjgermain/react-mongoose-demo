import { Predicate } from '../../_arrayutils'; 

export interface IInputFilter<T> { 
  keys:string[], 
  type:string, 
  SetFilters: (strPredicate:string[], type:string, keys:string[]) => void 
}

export interface IUseFilter<T> {
  matchValues: T[]; 
  unmatchValues: T[]; 
  SetFilters: (key: string, newPredicate?: Predicate<T> | undefined) => void;
  ResetFilters: () => void;
}

// export interface IInputFilter { 
//   keys:string[], 
//   type:string, 
//   SetFilters: (newValue: any, keys?:string[]) => void 
// }
