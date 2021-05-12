import React, { useContext } from 'react'; 
import { IUseFilter, useFilter, IUseSorter, useSorter } 
  from '../../../libs/_inputs'; 
import { usePager } from '../../../libs/pager/_pager'; 
import { DaoContext } from '../../../libs/_dao'; 

import { RowContext, ColContext, THeadContext, IndexDatasByKey, Indexed } 
  from '../../../libs/table/_table'; 
import { useStateReset } from '../../../libs/_customhooks';


export interface IUseAnswers { 
  patient: string; 
  SetPatient: (newValue: string) => void; 

  indexedDatas: Indexed<IEntry>; 
  rows: string[]; 
  cols: string[]; 

  filters: IUseFilter<IEntry>; 
  sorters: IUseSorter<IEntry>; 
  paging: { 
      page: IEntry[]; 
      pages: IEntry[][]; 
      pageIndex: number; 
      setPageIndex: (newIndex: number) => void; 
  }; 

  GetCellArgs(): {
    value: any;
    editValue: (newValue: any) => void;
    ifield: IField;
    options: IOption[];
  }
  GetHeadArgs(): {ifield: IField}
} 

export const AnswersContext = React.createContext({} as IUseAnswers); 
export function useAnswers():IUseAnswers { 
  const dao = useContext(DaoContext); 
  const collection = 'answers'; 
  const [patient, SetPatient] = useStateReset({} as string); // id IPatient

  const entries = dao.GetIEntries(collection); 
  const filters = useFilter(entries); 
  const sorters = useSorter(filters.matchValues); 
  const paging = usePager(sorters.sortedValues, 10); 
  const indexedDatas = IndexDatasByKey('_id', paging.page); 

  const rows = Object.keys(indexedDatas); 
  const cols = dao.GetIFields(collection, ['question', 'date', 'answer']).filter(f=>f.label).map(f => f.accessor); 

  function GetCellArgs() { 
    const {row} = useContext(RowContext); 
    const {col} = useContext(ColContext); 
    
    const value = indexedDatas[row][col]; 
    const editValue = (newValue:any) => {} 
    const [ifield] = dao.GetIFields(collection, [col]); 
    const options = dao.GetIOptions(ifield); 

    return {value, editValue, ifield, options} 
  }

  function GetHeadArgs() {
    const {col} = useContext(THeadContext); 
    const [ifield] = dao.GetIFields(collection, [col]); 
    //ifield.label = ifield.accessor; 
    return {ifield}; 
  }

  return {patient, SetPatient, 
    indexedDatas, rows, cols, 
    filters, sorters, paging, 
    GetCellArgs, GetHeadArgs, 
  } 
} 
