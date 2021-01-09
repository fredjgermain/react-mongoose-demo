import React, {useContext} from 'react'; 
import {TablrContext} from './tablr.component'; 

// ROWS =========================================
const RowsContext = React.createContext({}); 
interface IRows { 
  rows?: number[]; 
  ifields?: IField[]; 
} 
export function Rows({rows, ifields, children}:React.PropsWithChildren<IRows>) { 
  const {datas, ...tablrContext} = useContext(TablrContext); 
  const Ifields = ifields ?? tablrContext.ifields; 
  const Rows = datas ? datas.map( (v,i) => i) : rows ?? []; 

  // RENDER -------------------------------------
  return <RowsContext.Provider value={{}} > 
    {Rows.map((row, i) => { 
      return <Row key={i} {...{row, ifields:Ifields}}> 
        {children} 
      </Row> 
    })} 
  </RowsContext.Provider> 
} 

// Row --------------------------------------------
interface IRowContext { 
  row: number; 
  ifields: IField[]; 
} 
export const RowContext = React.createContext({} as IRowContext); 
interface IRow { 
  row: number; 
  ifields?: IField[]; 
} 
export function Row({row, ifields, children}:React.PropsWithChildren<IRow>) { 
  const {datas, ...tablrContext} = useContext(TablrContext); 
  const Ifields = ifields ?? tablrContext.ifields; 
  const context = {row, ifields:Ifields} as IRowContext; 
  
  // RENDER -------------------------------------
  return <tr> 
    <RowContext.Provider value={context}> 
      {children} 
    </RowContext.Provider> 
  </tr> 
} 
