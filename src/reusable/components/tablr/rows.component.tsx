import React, {useContext} from 'react'; 
import {TablrContext} from './tablr.component'; 

// ROWS =========================================
const RowsContext = React.createContext({}); 
interface IRows { rows?: number[]; } 
export function Rows({rows, children}:React.PropsWithChildren<IRows>) { 
  const {datas} = useContext(TablrContext); 
  const Rows = rows ?? datas?.map( (v,i) => i) ?? []; 

  // RENDER -------------------------------------
  return <RowsContext.Provider value={{}} > 
    {Rows.map((row) => { 
      return <Row key={row} {...{row}}>{children}</Row> 
    })} 
  </RowsContext.Provider> 
} 

// Row --------------------------------------------
interface IRow { row: number; } 
export const RowContext = React.createContext({} as IRow); 
export function Row({row, children}:React.PropsWithChildren<IRow>) { 
  const context = {row}; 

  // RENDER -------------------------------------
  return <RowContext.Provider value={context}> 
    <tr>{children}</tr>  
  </RowContext.Provider> 
} 
