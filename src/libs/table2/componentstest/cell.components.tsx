import React, { useContext } from 'react'; 
import { DaoContext } from '../../_dao'; 
import { RowContext, ColContext } from './rowcol.components';
import { TableContext } from '../hooktest/useTable.hook';


export function Cell() { 
  const {row, col, value, editValue, ifield, options} = GetDaoCell(); 
  return <span>{value}</span> 
}

export function HeadCell() { 
  const {col} = useContext(ColContext); 
  return <span>{col}</span> 
} 


export function GetDaoHeadCell() { 
  const dao = useContext(DaoContext); 
  const {collection} = useContext(TableContext); 
  const {col} = useContext(ColContext); 
  let [ifield] = dao.GetIFields(collection, [col]); 
  const {abbrevField} = dao.GetForeignElements(ifield); 
  ifield = abbrevField ?? ifield; 
  const options = dao.GetIOptions(ifield); 
  return {col, ifield, options}; 
}

export function GetDaoCell() { 
  const dao = useContext(DaoContext); 
  const {collection, datas, defaultEntry} = useContext(TableContext); 
  const {row} = useContext(RowContext); 
  const {col} = useContext(ColContext); 
  const entry = datas[row] ?? defaultEntry; 

  const [ifield] = dao.GetIFields(collection, [col]); 
  const options = dao.GetIOptions(ifield); 
  const value = entry[col]; 

  const editValue = (newValue:any) => { 
    const copy = {...entry}; 
    copy[col] = newValue; 
  }; 

  return {row, col, value, editValue, ifield, options}; 
} 