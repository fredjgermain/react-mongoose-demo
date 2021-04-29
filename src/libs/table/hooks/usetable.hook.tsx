import React, { useContext } from 'react'; 

import { TRowContext, TColContext } from '../components/rowcol.components'; 
import { THeadContext } from '../components/header.components'; 
import { usePager, IPageHook } from '../../pager/_pager'; 
import { useColumn } from './usecolumns.hook'; 
import { useFilter } from '../../inputs/inputfilter/inputfilter.hook'; 
import { Predicate, IndexArray } from '../../_arrayutils'; 
import { Indexed } from '../../utils/array/arrays.utils'; 


export const TableContext = React.createContext({} as IUseTable<IEntry>); 

export interface IUseTable<T> { 
  datas: T[]; 
  rows: number[]; 
  cols: number[]; 
  columns: string[]; 
  SetColumns: (fields: string[]) => void; 
  paging: IPageHook<Indexed<T>>; 
  SetFilters: (newValue: any, keys?: TKey[] | undefined) => void; 
  GetRowCol(): { 
    row: number; 
    col: number; 
  }
}
// At table lvl 
export function useTable<T>(datas:T[], options?:{defaultCols?:string[]}):IUseTable<T> { 
  // index datas to keep track of any filtering, sorting and paging on datas. 
  const indexedDatas = IndexArray(datas); 
  const {filteredValues, SetFilters} = useFilter(indexedDatas); 
  const {columns, SetColumns} = useColumn(options?.defaultCols ?? []); 
  const paging = usePager<Indexed<T>>(filteredValues, 10); 
  const rows = paging.page.map( e => e.i ); 
  const cols = columns.map( (e,i) => i ); 
  
  function GetRowCol() { 
    const {row} = useContext(TRowContext); 
    const colContext = useContext(TColContext); 
    const headContext = useContext(THeadContext); 
    const col = (colContext?.col ?? headContext?.col); 
    return {row, col}; 
  } 

  return {datas, rows, cols, columns, SetColumns, paging, SetFilters, GetRowCol} 
} 
