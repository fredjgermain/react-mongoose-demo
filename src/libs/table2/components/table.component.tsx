import React from 'react';



export const THeadsContext = React.createContext({} as {cols:string[]}); 
export function THeads({cols, children}:React.PropsWithChildren<{cols:string[]}>) { 
  return <THeadsContext.Provider value={{cols}} > 
    {cols.map( col => { 
      return <THead key={col} {...{col}}>{children}</THead> 
    })} 
  </THeadsContext.Provider> 
} 

export const THeadContext = React.createContext({} as {col:string}); 
export function THead({col, children}:React.PropsWithChildren<{col:string}>) { 
  return <THeadContext.Provider value={{col}}> 
    <th>{children}</th> 
  </THeadContext.Provider> 
}

export const RowsContext = React.createContext({rows:[]} as {rows:number[]}) 
export function Rows({rows, children}:React.PropsWithChildren<{rows:number[]}>) { 
  return <RowsContext.Provider value={{rows}} >
    {rows.map( row => { 
      return <Row key={row} row={row}>{children}</Row> 
    })}
  </RowsContext.Provider>
}

export const RowContext = React.createContext({row:0} as {row:number});
export function Row({row, children}:React.PropsWithChildren<{row:number}>) { 
  return <RowContext.Provider value={{row}}>
    <tr>{children}</tr>
  </RowContext.Provider> 
}

export const ColsContext = React.createContext({} as {cols:string[]}); 
export function Cols({cols, children}:React.PropsWithChildren<{cols:string[]}>) { 
  return <ColsContext.Provider value={{cols}} > 
    {cols.map( col => { 
      return <Col key={col} col={col}>{children}</Col> 
    })} 
  </ColsContext.Provider> 
}

export const ColContext = React.createContext({} as {col:string}); 
export function Col({col, children}:React.PropsWithChildren<{col:string}>) {
  return <ColContext.Provider value={{col}}> 
    <td>{children}</td> 
  </ColContext.Provider> 
} 


interface ITable {datas:any[], cols:string[]} 
export const TableContext = React.createContext({} as ITable); 
export function Table({datas, cols, children}:React.PropsWithChildren<ITable>) { 
  return <TableContext.Provider value={{datas, cols}}> 
    <table>{children}</table> 
    </TableContext.Provider> 
} 
