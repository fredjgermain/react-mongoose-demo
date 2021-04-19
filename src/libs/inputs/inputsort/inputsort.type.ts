export interface IInputSorter { 
  handle:string, 
  type:string, 
  SetSorters: (newValue: any, keys?: TKey[] | undefined) => void
}
