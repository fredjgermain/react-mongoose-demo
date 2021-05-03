import { Indexed } from '../_arrayutils'; 
import { IUseFilter, IUseSorter } from '../_inputs'; 
import { IPageHook } from '../pager/_pager'; 

export interface IUseColumn { 
  columns: string[]; 
  SetColumns: (fields: string[]) => void; 
} 

export interface IUseInlineEntry { 
  entry: IEntry; 
  SetEntry: (newEntry: any) => void; 
} 

export interface IInlineTableState { 
  row:number|null; 
  mode:string; 
} 


export interface IUseTable<T> { 
  datas: T[]; 
  rows: number[]; 
  cols: number[]; 

  GetRowCol(): { 
    row: number; 
    col: number; 
  }

  filter: IUseFilter<Indexed<T>>; 
  sorter: IUseSorter<Indexed<T>>; 
  columns : IUseColumn; 
  paging: IPageHook<Indexed<T>>; 
}