import React, { useContext } from 'react'; 

import { TRowContext, TColContext } from '../components/rowcol.components'; 
import { usePager, IPageHook } from '../../pager/_pager'; 
import { useColumn, IUseColumn } from './usecolumns.hook'; 
import { useFilter } from '../../inputs/inputfilter/inputfilter.hook'; 
import { Predicate, IndexArray } from '../../_arrayutils'; 
import { Indexed } from '../../utils/array/arrays.utils'; 


export const TableContext = React.createContext({} as IUseTable<IEntry>); 

export interface IUseTable<T> { 
  datas: T[]; 
  columns: IUseColumn; 
  rows: number[]; 
  cols: number[]; 
  paging: IPageHook<Indexed<T>>; 
  SetFilters: (newValue: any, keys?: TKey[] | undefined) => void; 
  GetRowCol: () => {row: number, col: number}; 
}
// At table lvl 
export function useTable<T>(datas:T[], options?:{defaultCols?:string[]}):IUseTable<T> { 
  // index datas to keep track of any filtering, sorting and paging on datas. 
  const indexedDatas = IndexArray(datas); 
  const {filteredValues, SetFilters} = useFilter(indexedDatas); 
  const paging = usePager<Indexed<T>>(filteredValues, 10); 
  const columns = useColumn(options?.defaultCols ?? []); 
  const cols = columns.columns.map( (c,i) => i ); 
  const rows = paging.page.map( e => e.i ); 
  
  function GetRowCol() { 
    const {row} = useContext(TRowContext); 
    const {col} = useContext(TColContext); 
    return {row, col}; 
  }

  return {datas, columns, rows, cols, paging, SetFilters, GetRowCol} 
} 
