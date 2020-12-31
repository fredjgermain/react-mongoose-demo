import React, {useContext} from 'react'; 
import {TablrContext} from './tablr.component'; 


// HEADER =======================================
interface IHeader {}
export function Header({children}:React.PropsWithChildren<IHeader>) { 
  const Children = children ?? <Heads/>; 
  // Render -------------------------------------
  return <thead><tr> 
    {Children}
  </tr></thead> 
} 


export const HeadsContext = React.createContext({});
export function Heads() {
  const {ifields} = useContext(TablrContext); 
  return <HeadsContext.Provider value={{}}> 
    {ifields.map( (ifield, i) => { 
      return <Head key={i} label={ifield.label} /> 
    })} 
  </HeadsContext.Provider>  
}

export function Head({label}:{label:string}) { 
  return <th>{label}</th>; 
}