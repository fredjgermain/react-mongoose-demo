import React from 'react'; 


export const TRowsContext = React.createContext({rows:[]} as {rows:number[]}); 
export function TRows({rows, children}:React.PropsWithChildren<{rows:number[]}>) { 
  return <TRowsContext.Provider value={{rows}} >
    {rows.map( row => { 
      return <TRow key={row} row={row}>{children}</TRow> 
    })}
  </TRowsContext.Provider>
}

export const TRowContext = React.createContext({row:0} as {row:number}); 
export function TRow({row, children}:React.PropsWithChildren<{row:number}>) { 
  return <tr><TRowContext.Provider value={{row}}> 
      {children} 
    </TRowContext.Provider></tr> 
}

export const TColsContext = React.createContext({} as {cols:number[]}); 
export function TCols({cols, children}:React.PropsWithChildren<{cols:number[]}>) { 
  return <TColsContext.Provider value={{cols}} > 
    {cols.map( col => { 
      return <TCol key={col} col={col}>{children}</TCol> 
    })} 
  </TColsContext.Provider> 
}

export const TColContext = React.createContext({} as {col:number}); 
export function TCol({col, children}:React.PropsWithChildren<{col:number}>) {
  return <TColContext.Provider value={{col}}> 
    <td>{children}</td> 
  </TColContext.Provider> 
} 