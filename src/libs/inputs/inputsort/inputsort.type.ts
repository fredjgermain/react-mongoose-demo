import { Sorter } from '../../_arrayutils'; 

export interface IInputSorter<T> { 
  keys:string[], 
  type:string, 
  SetSorters: (key:string, newFilter?:Sorter<T>) => void 
}


export interface IUseSorter<T> {
  sortedValues: T[];
  keySorters: [string, Sorter<T>][];
  SetSorters: (key: string, newPredicate?: Sorter<T> | undefined) => void;
  ResetSorters: () => void;
}