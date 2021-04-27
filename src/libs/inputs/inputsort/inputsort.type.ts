export interface IInputSorter { 
  keys:string[], 
  type:string, 
  SetSorters: (newValue: any, keys?:string[]) => void 
}
