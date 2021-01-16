import React, {useContext} from 'react'; 
import {RowContext} from './rows.component'; 
import {TablrContext} from './tablr.component'; 
import {IsNull} from '../../utils/_utils'; 

// CELLS ========================================
const CellsContext = React.createContext({}); 
interface ICells{ ifields:IField[]; } 
export function Cells({ifields, children}:React.PropsWithChildren<ICells>) { 

  // Render -------------------------------------
  return <CellsContext.Provider value={{}} > 
    {ifields.map((ifield,key) => { 
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

  const value = GetDefaultValue(datas, ifield, row); 
  const context = {value, row, ifield} as ICellContext; 
  const data = datas[row];
  const _value = row >= 0 ? data[ifield.accessor] : ifield.defaultValue; 
  
  if(row >= 0) {
    /*console.log([row, ifield.accessor]); 
    console.log(['DATAs', datas]); 
    console.log(['DATA', data]); 
    console.log(['DATA_field', data[ifield.accessor]]); */
  }
    
  
  // RENDER -------------------------------------
  return <CellContext.Provider value={context}> 
      <td>{!children && JSON.stringify(value) || children}</td> 
    </CellContext.Provider> 
} 

function GetDefaultValue(datas:any[], ifield:IField, row?:number) { 
  const Row = row === undefined ? -1: row; 
  const data = datas[Row]; 
  return data ? data[ifield.accessor] : ifield.defaultValue; 
}