import { useContext } from 'react'; 

import { InputFilter, InputSorter, IUseFilter, IUseSorter } 
  from '../../_inputs'; 
import { Reader, Editor } from '../../editor_reader/_editor_reader'; 
import { DaoContext } from '../../_dao'; 

import { THeadContext, RowContext, ColContext, InlineTableContext, InlineEntryContext } from '../_table'; 



export function GetDaoHeadCell() { 
  const dao = useContext(DaoContext); 
  const {collection} = useContext(InlineTableContext); 
  const {col} = useContext(THeadContext); 
  let [ifield] = dao.GetIFields(collection, [col]); 
  const {abbrevField} = dao.GetForeignElements(ifield); 
  ifield = abbrevField ?? ifield; 
  const options = dao.GetIOptions(ifield); 
  return {col, ifield, options}; 
}

export function GetDaoCell() { 
  const dao = useContext(DaoContext); 
  const {collection} = useContext(InlineTableContext); 
  const {row} = useContext(RowContext); 
  const {entry, SetEntry, isEditing, isSelected} = useContext(InlineEntryContext); 
  const {col} = useContext(ColContext); 
  const [ifield] = dao.GetIFields(collection, [col]); 
  const options = dao.GetIOptions(ifield); 
  const value = entry[col]; 

  const editValue = (newValue:any) => { 
    const copy = {...entry}; 
    copy[col] = newValue; 
    SetEntry(copy); 
  }; 

  return {row, col, value, editValue, ifield, options, isSelected, isEditing}; 
} 


export function HeadCell<T>({sorterFilter}:{sorterFilter:IUseSorter<T> & IUseFilter<T>}) { 
  const {col, ifield, options} = GetDaoHeadCell(); 
  const {SetFilters, SetSorters} = sorterFilter; 

  if(!SetFilters || !SetSorters)
    return <span>{ifield.label}</span> 

  return <span>{ifield.label} 
    <InputFilter {...{keys:[col], type:'string', SetFilters}} /> 
    <InputSorter {...{keys:[col], type:'string', SetSorters}} /> 
  </span> 
} 

export function Cell() { 
  const {value, editValue, ifield, options} = GetDaoCell(); 
  return <Reader {...{value, ifield, options}} /> 
} 
