import { useContext } from 'react'; 
import { TableContext } from './table.components'; 
import { InlineEntryContext } from './inlineentry.components'; 
import { THeadContext } from './thead.components'; 
import { RowContext } from './rows.components'; 
import { ColContext } from './cols.components'; 
import { Reader, Editor } from '../../editor_reader/_editor_reader';
import { InputFilter, InputSorter, IUseFilter, IUseSorter } from '../../_inputs'; 


export function THeadCell() { 
  const {col} = useContext(THeadContext); 
  return <span>{col}</span> 
}

export function THeadFilter({filters}:{filters:IUseFilter<IEntry>}) { 
  const {col} = useContext(THeadContext); 
  const keys = [col]; 
  const type = 'string'; 
  return <InputFilter {...{keys, type, SetFilters:filters.SetFilters}} /> 
}

export function THeadSorter({sorters}:{sorters:IUseSorter<IEntry>}) { 
  const {col} = useContext(THeadContext); 
  const keys = [col]; 
  const type = 'string'; 
  return <InputSorter {...{keys, type, SetSorters:sorters.SetSorters}} /> 
} 

export function Cell() { 
  const {row} = useContext(RowContext); 
  const {col} = useContext(ColContext); 
  const {indexedDatas} = useContext(TableContext); 

  return <span> 
    {indexedDatas[row][col]} 
  </span> 
} 

export function InlineCell() { 
  const {row} = useContext(RowContext); 
  const {col} = useContext(ColContext); 
  const {entry, SetEntry, isEditing, isSelected} = useContext(InlineEntryContext); 

  const value = entry[col]; 
  const editValue = (newValue:any) => { 
    const copy = {...entry}; 
    copy[col] = newValue; 
    SetEntry(copy); 
  } 
  const ifield:IField = {accessor:col, defaultValue:'', label:col, type:'string'} 

  return <span>
    {isEditing && isSelected ? 
      <Editor {...{value, editValue, ifield}} />: 
      <Reader {...{value, ifield}} /> 
    } 
  </span> 
} 