import React, { useContext } from 'react'; 

import { TRowContext, TColContext } from '../components/rowcol.components'; 
import { THeadContext } from '../components/header.components'; 
import { usePager, IPageHook } from '../../pager/_pager'; 
import { useColumn, IUseColumn } from './usecolumns.hook'; 
import { Predicate, IndexArray } from '../../_arrayutils'; 
import { Indexed } from '../../utils/array/arrays.utils'; 
import { IUseFilter, IUseSorter, useFilter, useSorter } from '../../_inputs'; 


export const TableContext = React.createContext({} as IUseTable<IEntry>); 

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
// At table lvl 
export function useTable<T>(datas:T[], options?:{defaultCols?:string[]}):IUseTable<T> { 
  // index datas to keep track of any filtering, sorting and paging on datas. 
  const indexedDatas = IndexArray(datas); 
  const filter = useFilter(indexedDatas); 
  const sorter = useSorter(filter.matchValues); 

  const columns = useColumn(options?.defaultCols ?? []); 

  const paging = usePager<Indexed<T>>(sorter.sortedValues, 10); 
  const rows = paging.page.map( e => e.i ); 
  const cols = columns.columns.map( (e,i) => i ); 
  
  function GetRowCol() { 
    const {row} = useContext(TRowContext); 
    const colContext = useContext(TColContext); 
    const headContext = useContext(THeadContext); 
    const col = (colContext?.col ?? headContext?.col); 
    return {row, col}; 
  } 

  return {datas, rows, cols, GetRowCol, filter, sorter, columns, paging} 
} 
