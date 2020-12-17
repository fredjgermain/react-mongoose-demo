import React, { useContext } from 'react'; 
import {InputTableContext} from './inputtable'; 
import {IColumnSetting} from '../colsetting/columnsetting'; 

// INPUT HEADER ROW =============================
interface IInputHeaderRowContext {} 
export const InputHeaderRowContext = React.createContext({} as IInputHeaderRowContext); 
interface IInputHeaderRow { 
  children?: React.ReactNode; 
} 
export function InputHeaderRow({children}:React.PropsWithChildren<IInputHeaderRow>) { 

  return <InputHeaderRowContext.Provider value={{}}> 
      <tr>{children}</tr> 
    </InputHeaderRowContext.Provider> 
}

// INPUT CELLS ==================================
interface IInputHeaderContext {} 
export const InputHeaderContext = React.createContext({} as IInputHeaderRowContext); 
interface IInputHeader { 
  columnSetting?:IColumnSetting; 
} 

export function InputHeader() { 
  const {tableHook, columnSettings:{GetColumnSettings}} = useContext(InputTableContext); 
  const ColumnSettings:IColumnSetting[] = GetColumnSettings(); 

  return <InputHeaderContext.Provider value={{}}> 
    {ColumnSettings.map( (column, i) => { 
      return <th key={i} >{column.ifield.label}</th> 
    })} 
  </InputHeaderContext.Provider> 
} 
