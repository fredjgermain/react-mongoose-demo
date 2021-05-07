import React, { useContext } from 'react'; 
import { TableContext } from './table.components'; 
import { THeadContext } from './thead.components'; 
import { RowContext } from './rows.components'; 
import { ColContext } from './cols.components'; 


export function THeadCell() { 
  const {col} = useContext(THeadContext); 
  return <span>{col}</span> 
}

export function Cell() { 
  const {row} = useContext(RowContext); 
  const {col} = useContext(ColContext); 
  const {indexedDatas} = useContext(TableContext); 

  return <span> 
    {indexedDatas[row][col]} 
  </span> 
}