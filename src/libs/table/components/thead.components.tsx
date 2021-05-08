import React from 'react'; 

export const THeadsContext = React.createContext({} as {cols:string[]}) 
export function THeads({cols, children}:React.PropsWithChildren<{cols:string[]}>) { 
  return <THeadsContext.Provider value={{cols}}> 
    {cols.map(col => { 
      return <THead key={col} col={col}>{children}</THead> 
    })} 
  </THeadsContext.Provider> 
} 

export const THeadContext = React.createContext({} as {col:string}) 
export function THead({col, children}:React.PropsWithChildren<{col:string}>) { 
  return <th><THeadContext.Provider value={{col}}> 
    {children} 
  </THeadContext.Provider></th> 
}