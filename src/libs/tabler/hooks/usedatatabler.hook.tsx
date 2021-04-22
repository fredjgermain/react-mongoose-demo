import { useContext, useEffect, useState } from 'react'; 
import { DaoContext, IDao } from '../../_dao'; 
import { usePage, IPageHook } from '../../pager/_pager'; 
import { useColumn, IUseColumn } from './usecolumns.hook'; 


export interface IUseDataTabler { 
  paging: IPageHook<IEntry>; 
  columns: IUseColumn; 
  GetEntry: (row?: number | undefined) => IEntry; 
  GetFields: (accessors: string[]) => IField[]; 
  GetOptions: (ifield: IField) => IOption[]; 
}
// At table lvl 
export function useDataTabler(collectionAccessor:string) { 
  const dao = useContext(DaoContext); 
  const entries = dao.GetIEntries(collectionAccessor); 
  const fileredEntries = entries; 
  const paging = usePage(fileredEntries, 10); 
  const columns = useColumn(collectionAccessor); 

  useEffect(() => { 
    paging.setPageIndex(0); 
  }, [collectionAccessor]); 

  // GetEntry .............................................
  function GetEntry(row?:number) { 
    return dao.GetIEntries(collectionAccessor).find( (e,i) => i === row) 
      ?? dao.GetDefaultIEntry(collectionAccessor) 
      ?? {} as IEntry; 
  } 

  function GetFields(accessors:string[]) { 
    return dao.GetIFields(collectionAccessor, accessors); 
  } 

  function GetOptions(ifield:IField) { 
    return dao.GetIOptions(ifield); 
  } 

  return {paging, columns, GetEntry, GetFields, GetOptions} 
} 
