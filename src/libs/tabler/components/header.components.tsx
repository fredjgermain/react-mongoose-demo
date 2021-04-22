import React from 'react'; 

interface ICols {cols:number[]} 
interface ICol {col:number} 



export function THeader({cols, children}:React.PropsWithChildren<ICols>) { 
  return <thead><tr> 
    <THeads {...{cols}}>{children}</THeads> 
  </tr></thead> 
} 

export const THeadsContext = React.createContext({} as ICols); 
export function THeads({cols, children}:React.PropsWithChildren<ICols>) { 
  return <THeadsContext.Provider value={{cols}} > 
    {cols.map( col => { 
      return <THead key={col} {...{col}}>{children}</THead> 
    })} 
  </THeadsContext.Provider> 
} 

export const THeadContext = React.createContext({} as ICol); 
export function THead({col, children}:React.PropsWithChildren<ICol>) { 
  return <THeadContext.Provider value={{col}}> 
    <th>{children}</th> 
  </THeadContext.Provider> 
}


/*
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
*/