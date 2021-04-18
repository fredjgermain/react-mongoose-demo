export interface IInputFilter { 
  handle:string, 
  type:string, 
  SetFilters: (newValue: any, keys?: TKey[] | undefined) => void
}
