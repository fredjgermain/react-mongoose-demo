import React, {useContext} from 'react'; 


// HEADER =======================================
interface IHeader {}
export function Header({children}:React.PropsWithChildren<IHeader>) { 
  return <thead> 
    <tr>{children}</tr> 
  </thead> 
} 

// HEADS ---------------------------------------
const HeadsContext = React.createContext({}); 
export function Heads({ifields, children}:React.PropsWithChildren<{ ifields:IField[] }>) { 

  return <HeadsContext.Provider value={{}}> 
    {ifields.map( (ifield, key) => { 
      return <Head {...{key, ifield}}>{children}</Head>
    })} 
  </HeadsContext.Provider> 
}

// HEAD ---------------------------------------
export const HeadContext = React.createContext({} as {ifield:IField}); 
export function Head({ifield, children}:React.PropsWithChildren<{ ifield:IField }>) { 

  return <HeadContext.Provider value={{ifield}}>
    <th>{!children && ifield.label || children}</th>
  </HeadContext.Provider>
} 
