import React from 'react'; 

export function THeader({cols, children}:React.PropsWithChildren<{cols:number[]}>) { 
  return <thead><tr> 
    <THeads {...{cols}}>{children}</THeads> 
  </tr></thead> 
} 

export const THeadsContext = React.createContext({} as {cols:number[]}); 
export function THeads({cols, children}:React.PropsWithChildren<{cols:number[]}>) { 
  return <THeadsContext.Provider value={{cols}} > 
    {cols.map( col => { 
      return <THead key={col} {...{col}}>{children}</THead> 
    })} 
  </THeadsContext.Provider> 
} 

export const THeadContext = React.createContext({} as {col:number}); 
export function THead({col, children}:React.PropsWithChildren<{col:number}>) { 
  return <THeadContext.Provider value={{col}}> 
    <th>{children}</th> 
  </THeadContext.Provider> 
}

