import { Sorter } from '../../_arrayutils'; 

export interface IInputSorter { 
  keys:string[], 
  type:string, 
  SetSorters: (key:string, newFilter?:Sorter<any>) => void 
}
