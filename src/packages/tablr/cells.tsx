import React, {useContext} from 'react'; 
import {TablrContext} from './tablr'; 
import {RowContext} from './rows'; 
import { FieldRendering } from '../_fieldrendering'; 


// CELLS ===========================================
const CellsContext = React.createContext({}); 
interface ICells{}
export function Cells() { 
  const {UseColumnSettings:{cols}} = useContext(TablrContext); 
  return <CellsContext.Provider value={{}} > 
    {cols.map((col,i) => { 
      return <Cell key={i} {...{col}} />; 
    })} 
  </CellsContext.Provider> 
} 

interface ICell{ 
  col:IField; 
} 
export function Cell({col}:ICell) { 
  const {datas, fieldRendering, UseTablr:{activeData, setActiveData, GetRenderer}} = useContext(TablrContext); 
  const {row} = useContext(RowContext); 

  const value = (row !== undefined && row >=0)? 
    datas[row][col.accessor] ?? col.defaultValue: 
    col.defaultValue; 
  const onSendValue = (newValue:any) => { 
    const newData = {...activeData}; 
    newData[col.accessor] = newValue; 
    setActiveData(newData); 
  } 
  const renderer = GetRenderer(col, row); 
  return <td>{renderer(value, onSendValue)}</td> 
} 
