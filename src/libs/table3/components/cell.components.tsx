import React, { useContext } from 'react'; 
import { DaoContext } from '../../_dao'; 
import { RowContext, ColContext } from './rowcol.components'; 
import { InlineEntryContext } from '../hook/inlineentry.hook'; 
import { InlineTableContext } from '../hook/inlinetable.hook'; 
import { Reader, Editor } from '../../editor_reader/_editor_reader'; 


export function Cell() { 
  const {row, col, value, editValue, ifield, options} = GetDaoCell(); 
  const {isEditing, isSelected} = useContext(InlineEntryContext); 

  if(isEditing && isSelected) 
    return <Editor {...{value, editValue, ifield, options}} /> 
  return <Reader {...{value, ifield, options}} /> 
}

export function HeadCell() { 
  const {col} = useContext(ColContext); 
  return <span>{col}</span> 
} 



export function GetDaoHeadCell() { 
  const dao = useContext(DaoContext); 
  const {collection} = useContext(InlineTableContext); 
  const {col} = useContext(ColContext); 
  let [ifield] = dao.GetIFields(collection, [col]); 
  const {abbrevField} = dao.GetForeignElements(ifield); 
  ifield = abbrevField ?? ifield; 
  const options = dao.GetIOptions(ifield); 
  return {col, ifield, options}; 
}

export function GetDaoCell() { 
  const dao = useContext(DaoContext); 
  const {collection} = useContext(InlineTableContext); 
  const {entry, SetEntry, isEditing, isSelected} = useContext(InlineEntryContext); 

  const {row} = useContext(RowContext); 
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