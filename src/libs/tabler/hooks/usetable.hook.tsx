import React, { useContext } from 'react'; 

import { TRowContext, TColContext } from '../components/rowcol.components'; 
import { usePage, IPageHook } from '../../pager/_pager'; 
import { useColumn, IUseColumn } from './usecolumns.hook'; 
import { useFilter } from '../../inputs/inputfilter/inputfilter.hook'; 
import { Predicate } from '../../_arrayutils'; 


export const TableContext = React.createContext({} as IUseTable<IEntry>); 

export interface IUseTable<T> { 
  datas: T[]; 
  columns: IUseColumn; 
  rows: number[]; 
  cols: number[]; 
  paging: IPageHook<T>; 
  SetFilters: (newValue: any, keys?: TKey[] | undefined) => void; 
  GetRowCol: () => {row: number, col: number}; 
}
// At table lvl 
export function useTable<T>(datas:T[], options?:{pageBreak?:Predicate<T>|number, defaultCols?:string[]}):IUseTable<T> { 
  const {filteredValues, SetFilters} = useFilter(datas); 
  const paging = usePage(filteredValues, options?.pageBreak ?? 10); 
  const columns = useColumn(options?.defaultCols ?? []); 
  const cols = columns.columns.map( (c,i) => i ); 
  const rows = paging.page.map( e => e.i ); 

  
  function GetRowCol() { 
    const {row} = useContext(TRowContext); 
    const {col} = useContext(TColContext); 
    return {row, col}; 
  }

  return {datas, columns, rows, cols, GetRowCol, paging, SetFilters} 
} 
