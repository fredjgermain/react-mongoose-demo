import React, {useContext} from 'react'; 
import {TablrContext} from './tablr'; 


// ROWS =========================================
const RowsContext = React.createContext({}); 

//const context:IRowContext = {row}
interface IRows { 
  rows?: number[]; 
} 
export function Rows({rows, children}:React.PropsWithChildren<IRows>) { 
  const {datas} = useContext(TablrContext); 
  const Rows = datas ? datas.map( (v,i) => i) : rows ?? []; 

  return <RowsContext.Provider value={{}} >
    {Rows.map((row, i) => { 
      return <Row key={i} {...{row, children}} /> 
    })}
  </RowsContext.Provider>
}

// Row --------------------------------------------
interface IRowContext { 
  row?: number; 
} 
export const RowContext = React.createContext({} as IRowContext); 
interface IRow { 
  row?: number; 
} 
export function Row({row, children}:React.PropsWithChildren<IRow>) {
  const context = {row} as IRowContext; 
  return <RowContext.Provider value={context}> 
    <tr>{children}</tr>
  </RowContext.Provider>; 
}
