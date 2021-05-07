import React from 'react'; 

export const ColsContext = React.createContext({} as {cols:string[]}) 
export function Cols({cols, children}:React.PropsWithChildren<{cols:string[]}>) { 
  return <ColsContext.Provider value={{cols}}> 
    {cols.map(col => { 
      return <Col key={col} col={col}>{children}</Col> 
    })} 
  </ColsContext.Provider> 
} 

export const ColContext = React.createContext({} as {col:string}) 
export function Col({col, children}:React.PropsWithChildren<{col:string}>) { 
  return <td><ColContext.Provider value={{col}}> 
    {children} 
  </ColContext.Provider></td> 
}