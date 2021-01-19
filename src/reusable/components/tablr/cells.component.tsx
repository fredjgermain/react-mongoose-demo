import React, {useContext} from 'react'; 
import {RowContext} from './rows.component'; 
import {TablrContext} from './tablr.component'; 
import {IsNull, GetDefaultValueFromIField, IsEmpty} from '../../utils/_utils'; 

// CELLS ========================================
const CellsContext = React.createContext({}); 
interface ICells{ ifields:IField[]; } 
export function Cells({ifields, children}:React.PropsWithChildren<ICells>) { 

  // Render -------------------------------------
  return <CellsContext.Provider value={{}} > 
    {ifields.map((ifield) => { 
      const key = ifield.accessor; 
      return <Cell {...{key, ifield}}>{children}</Cell>; 
    })} 
  </CellsContext.Provider> 
} 


// Row --------------------------------------------
interface ICell { ifield: IField; } 
interface ICellContext { value:any, row:number, ifield:IField} 
export const CellContext = React.createContext({} as ICellContext); 
export function Cell({ifield, children}:React.PropsWithChildren<ICell>) { 
  const {datas} = useContext(TablrContext); 
  const {row} = useContext(RowContext); 

  const data = datas[row]; 
  const value = IsEmpty(data) ? GetDefaultValueFromIField(ifield): datas[row][ifield.accessor]; 
  const context = {value, row, ifield} as ICellContext; 
  
  // RENDER -------------------------------------
  return <CellContext.Provider value={context}> 
      <td>{!children && JSON.stringify(value) || children}</td> 
    </CellContext.Provider> 
} 
