import React, {useContext} from 'react'; 



interface IHeads {cols:number[]} 
interface IHead {col:number} 


interface ITable {rows:number[], cols:number[]} 
interface IRows {rows:number[]} 
interface IRow {row:number} 
interface ICells {cols:number[]} 
interface ICell {col:number} 


/*export const TableContext = React.createContext({} as ITable) 
export function Table({rows, cols, children}:React.PropsWithChildren<ITable>) { 
  return <TableContext.Provider value={{rows, cols}}> 
    {rows

    }
  </TableContext.Provider>
}*/

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

export const TCellsContext = React.createContext({} as ICells); 
export function TCells({cols, children}:React.PropsWithChildren<ICells>) { 
  return <TCellsContext.Provider value={{cols}} > 
    {cols.map( col => { 
      return <TCell {...{key:col, col}}>{children}</TCell> 
    })} 
  </TCellsContext.Provider> 
}


export const TCellContext = React.createContext({} as ICell); 
export function TCell({col, children}:React.PropsWithChildren<ICell>) {
  return <TCellContext.Provider value={{col}}> 
    <td>{children}</td> 
  </TCellContext.Provider> 
} 


export function THeader({cols, children}:React.PropsWithChildren<IHeads>) { 
  return <thead><tr> 
    <THeads {...{cols}}>{children}</THeads> 
  </tr></thead> 
} 

export const THeadsContext = React.createContext({} as IHeads); 
export function THeads({cols, children}:React.PropsWithChildren<IHeads>) { 
  return <THeadsContext.Provider value={{cols}} > 
    {cols.map( col => { 
      return <THead key={col} {...{col}}>{children}</THead> 
    })} 
  </THeadsContext.Provider> 
} 

export const THeadContext = React.createContext({} as IHead); 
export function THead({col, children}:React.PropsWithChildren<IHead>) { 
  return <THeadContext.Provider value={{col}}> 
    <th>{children}</th> 
  </THeadContext.Provider> 
}

export const ArrxContext = React.createContext([] as string[]); 
export const ElmxContext = React.createContext<string>(''); 
export function Arrx({ids, children}:React.PropsWithChildren<{ids:string[]}>) { 
  return <ArrxContext.Provider value={ids}>
    {ids.map( id => { 
      return <Elmx key={id} {...{id}} >{children}</Elmx>
    })} 
  </ArrxContext.Provider>
}

export function Elmx({id, children}:React.PropsWithChildren<{id:string}>) { 
  return <ElmxContext.Provider key={id} value={id}> 
    {children} 
  </ElmxContext.Provider> 
}
