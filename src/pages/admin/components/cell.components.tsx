import { useContext, useState } from 'react'; 
import { DaoContext } from '../../../libs/_dao'; 
import { InputFilter } from '../../../libs/_inputs'; 
import { IsNull } from '../../../libs/_utils'; 
import { Editor, Reader } from '../../../libs/editor_reader/_editor_reader'; 
import { InlineEntryContext, InlineTableContext } from '../../../libs/table/_table'; 

import { AdminContext } from '../admin.hook'; 


export function HeaderCell() { 
  const {filter:{SetFilters}} = useContext(InlineTableContext); 
  const {column, ifield} = GetDaoCell(); 
  const keys = ['t', column]; 

  return <span> 
    {ifield.label} <br/> 
    {!ifield.isArray && !ifield.isMixed && !ifield.isModel && <InputFilter {...{keys, type:ifield.type, SetFilters}} />} 
  </span> 
} 

export function Cell() { 
  const {IsSelected, IsEditing} = useContext(InlineTableContext); 
  return <span> 
  {IsSelected() && IsEditing() ? 
    <CellEdit/>: 
    <CellRead/>} 
  </span> 
} 

function CellRead() { 
  const {value, ifield, options} = GetDaoCell(); 
  return <Reader {...{value, ifield, options}} /> 
} 

function CellEdit() { 
  const {ifield, options, column} = GetDaoCell(); 
  const {entry, SetEntry} = useContext(InlineEntryContext); 
  const [value, setValue] = useState(entry[column]); 

  const editValue = (newValue:any) => { 
    setValue(newValue); 
    const copy = {...entry}; 
    copy[column] = newValue; 
    SetEntry(copy); 
  } 

  return <Editor {...{value, ifield, options, editValue}} /> 
} 


function GetDaoCell() { 
  const {collectionAccessor} = useContext(AdminContext); 
  const dao = useContext(DaoContext); 
  const {datas, columns:{columns}, GetRowCol} = useContext(InlineTableContext); 
  const {row, col} = GetRowCol(); 
  const column = columns[col]; 
  const [ifield] = dao.GetIFields(collectionAccessor, [column]); 
  const options = dao.GetIOptions(ifield); 
  const defaultValue = ifield.defaultValue; 
  const value = !IsNull(datas[row]) ? datas[row][column]: defaultValue; 
  return {row, col, column, value, ifield, options}; 
} 
