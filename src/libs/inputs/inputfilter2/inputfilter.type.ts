export interface IInputFilter<T> { 
  keys:string[], 
  ifield:IField, 
  usefilter:IUseFilter<T>, 
}

export interface IUseFilter<T> {
  values: T[]; 
  matchValues: T[]; 
  unmatchValues: T[]; 
  SetFilters: (strPredicate: string, type: string, keys: string[]) => void; 
  ResetFilters: () => void; 
} 

// export interface IInputFilter { 
//   keys:string[], 
//   type:string, 
//   SetFilters: (newValue: any, keys?:string[]) => void 
// }
