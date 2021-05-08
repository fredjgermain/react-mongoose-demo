import React from 'react'; 

export const RowsContext = React.createContext({} as {rows:string[]}) 
export function Rows({rows, children}:React.PropsWithChildren<{rows:string[]}>) { 
  return <RowsContext.Provider value={{rows}}> 
    {rows.map(row => { 
      return <Row key={row} row={row}>{children}</Row> 
    })} 
  </RowsContext.Provider> 
} 

export const RowContext = React.createContext({} as {row:string}) 
export function Row({row, children}:React.PropsWithChildren<{row:string}>) { 
  return <tr><RowContext.Provider value={{row}}> 
    {children} 
  </RowContext.Provider></tr> 
}

