import { Predicate } from '../../_arrayutils'; 

export interface IInputFilter { 
  keys:string[], 
  type:string, 
  SetFilters: (key:string, newFilter?:Predicate<any>) => void 
}

// export interface IInputFilter { 
//   keys:string[], 
//   type:string, 
//   SetFilters: (newValue: any, keys?:string[]) => void 
// }
