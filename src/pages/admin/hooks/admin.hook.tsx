import React, { useContext } from 'react'; 
import { useStateReset } from '../../../libs/_customhooks'; 
import { IUseFilter, useFilter, IUseSorter, useSorter } 
  from '../../../libs/_inputs'; 
import { usePager } from '../../../libs/pager/_pager'; 
import { DaoContext } from '../../../libs/_dao'; 

import { ColContext, InlineEntryContext, THeadContext, IndexDatasByKey, Indexed } 
  from '../../../libs/table/_table'; 


export interface IUseAdmin { 
  collection: string; 
  SetCollection: (newCollection: string) => void; 

  indexedDatas: Indexed<IEntry>; 
  rows: string[]; 
  cols: string[]; 

  feedback: ICrudResponse; 
  SetFeedback: (newValue: ICrudResponse) => void; 
  ResetFeedback: () => void; 

  filters: IUseFilter<IEntry>; 
  sorters: IUseSorter<IEntry>; 
  paging: { 
      page: IEntry[]; 
      pages: IEntry[][]; 
      pageIndex: number; 
      setPageIndex: (newIndex: number) => void; 
  }; 

  Create(entry: IEntry): Promise<ICrudResponse>; 
  Update(entry: IEntry): Promise<ICrudResponse>; 
  Delete(entry: IEntry): Promise<ICrudResponse>; 

  GetCellArgs(): {
    value: any;
    editValue: (newValue: any) => void;
    ifield: IField;
    options: IOption[];
  }
  GetHeadArgs(): {ifield: IField}
} 

export const AdminContext = React.createContext({} as IUseAdmin); 
export function useAdmin() { 
  const dao = useContext(DaoContext); 
  const [collection, SetCollection]  = useStateReset(''); 
  

  const entries = dao.GetIEntries(collection); 
  const filters = useFilter(entries); 
  const sorters = useSorter(filters.matchValues); 
  const paging = usePager(sorters.sortedValues, 10); 
  const indexedDatas = IndexDatasByKey('_id', paging.page); 

  const rows = Object.keys(indexedDatas); 
  const cols = dao.GetIFields(collection).filter(f=>f.label).map(f => f.accessor); 
  const [feedback, SetFeedback, ResetFeedback] = useStateReset({} as ICrudResponse); 
  

  async function Create(entry:IEntry) { 
    const [response] = await dao.Create(collection, [entry]); 
    SetFeedback(response); 
    return response; 
  } 

  async function Update(entry:IEntry) { 
    const [response] = await dao.Create(collection, [entry]); 
    SetFeedback(response); 
    return response; 
  } 

  async function Delete(entry:IEntry) {
    const [response] = await dao.Create(collection, [entry]); 
    SetFeedback(response); 
    return response; 
  }

  function GetCellArgs() { 
    const dao = useContext(DaoContext); 
    const {col} = useContext(ColContext); 
    const {entry, SetEntry} = useContext(InlineEntryContext); 
    
    const value = entry[col]; 
    const editValue = (newValue:any) => { 
      const copy = {...entry}; 
      copy[col] = newValue; 
      SetEntry(copy); 
    } 
    const [ifield] = dao.GetIFields(collection, [col]); 
    const options = dao.GetIOptions(ifield); 

    return {value, editValue, ifield, options} 
  }

  function GetHeadArgs() {
    const dao = useContext(DaoContext); 
    const {col} = useContext(THeadContext); 
    const [ifield] = dao.GetIFields(collection, [col]); 
    return {ifield}; 
  }

  return {collection, SetCollection, 
    indexedDatas, rows, cols, 
    feedback, SetFeedback, ResetFeedback, 
    filters, sorters, paging, 
    Create, Update, Delete, 
    GetCellArgs, GetHeadArgs, 
  } 
} 