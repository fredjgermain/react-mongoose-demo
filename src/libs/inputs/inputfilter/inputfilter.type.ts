export interface IInputFilter { 
  keys:string[], 
  type:string, 
  SetFilters: (newValue: any, keys?:string[]) => void 
}
