import React, { useContext } from 'react'; 


interface IRows {rows:number[]} 
interface IRow {row:number} 
interface ICols {cols:number[]} 
interface ICol {col:number} 


export function GetRowCol() { 
  const {row} = useContext(TRowContext); 
  const {col} = useContext(TColContext); 
  return {row, col}; 
}

export const TRowsContext = React.createContext({rows:[]} as IRows); 
export function TRows({rows, children}:React.PropsWithChildren<IRows>) { 
  return <TRowsContext.Provider value={{rows}} >
    {rows.map( row => { 
      return <TRow key={row} row={row}>{children}</TRow> 
    })}
  </TRowsContext.Provider>
}

export const TRowContext = React.createContext({row:0} as IRow); 
export function TRow({row, children}:React.PropsWithChildren<IRow>) { 
  return <tr><TRowContext.Provider value={{row}}> 
      {children} 
    </TRowContext.Provider></tr> 
}

export const TColsContext = React.createContext({} as ICols); 
export function TCols({cols, children}:React.PropsWithChildren<ICols>) { 
  return <TColsContext.Provider value={{cols}} > 
    {cols.map( col => { 
      return <TCol {...{key:col, col}}>{children}</TCol> 
    })} 
  </TColsContext.Provider> 
}

export const TColContext = React.createContext({} as ICol); 
export function TCol({col, children}:React.PropsWithChildren<ICol>) {
  return <TColContext.Provider value={{col}}> 
    <td>{children}</td> 
  </TColContext.Provider> 
} 