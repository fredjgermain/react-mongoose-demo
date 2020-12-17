import React, { useContext } from 'react'; 
import {InputTableContext} from './inputtable'; 

interface IInputRowsContext{} 
const InputRowsContext = React.createContext({} as IInputRowsContext); 
// INPUT ROWS ==================================
interface IInputRows { 
  rows?: number[]; 
} 
export function InputRows({rows, children}: React.PropsWithChildren<IInputRows>) { 
  const {tableHook:{entries}} = useContext(InputTableContext); 
  const Rows = (entries === undefined) ? [] : 
    (rows !== undefined) ? rows: entries.map( (v,i) => i); 

  return <InputRowsContext.Provider value={{}}> 
    {Rows.map( (row, i) => { 
      return <InputRow key={i} {...{row, children}} /> 
    })} 
  </InputRowsContext.Provider> 
} 


interface IInputRowContext { 
  row?: number|undefined; 
} 
export const InputRowContext = React.createContext({} as IInputRowContext); 
// INPUT ROW ==================================
interface IInputRow { 
  row?: number; 
  children?: React.ReactNode; 
} 
export function InputRow({row, children}:IInputRow) { 
  //const {tableHook:{entries}} = useContext(InputTableContext); 

  const context = {row} as IInputRowContext; 
  return <InputRowContext.Provider value={context}> 
      <tr> 
        {children} 
      </tr> 
    </InputRowContext.Provider> 
}



