export interface IInputSorter { 
  handle:string, 
  type:string, 
  SetSorters: (newValue: any, handle:string) => void 
}
