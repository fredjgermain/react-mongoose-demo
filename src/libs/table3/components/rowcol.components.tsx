import React from 'react'; 
import { Cell, HeadCell } from './cell.components'; 

export function Head({col}:{col:string}) {
  return <th><ColContext.Provider value={{col}}> 
    <HeadCell />
  </ColContext.Provider></th>
}

export const RowContext = React.createContext({} as {row:number}); 
export function Row({row, cols}:{row:number, cols:string[]}) { 
  return <tr><RowContext.Provider value={{row}}> 
    {cols.map(col => { 
      return <Col key={col} {...{col}} /> 
    })} 
  </RowContext.Provider></tr> 
} 


export const ColContext = React.createContext({} as {col:string}); 
export function Col({col}:{col:string}) { 
  return <td><ColContext.Provider value={{col}}> 
    <Cell />
  </ColContext.Provider></td>
}