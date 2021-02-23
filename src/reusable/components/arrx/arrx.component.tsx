import React, { useContext } from 'react'; 
import {IsEmpty} from '../../_utils'; 

export interface IArrx { 
  values:any[]; 
} 

export const ArrxContext = React.createContext({} as IArrx); 
const ElementsContext = React.createContext({} as any); 
export const ElementContext = React.createContext({} as {index:number}); 

// ARRX =========================================
export function Arrx({values, children}:React.PropsWithChildren<IArrx>) { 
  const context = {values:IsEmpty(values) ? []: values}; 
  return <ArrxContext.Provider value={context} > 
    {children ?? <Elements/>} 
  </ArrxContext.Provider> 
} 


// ELEMENTS =====================================
export function Elements({indexes, children}:React.PropsWithChildren<{indexes?:number[]}>) { 
  const {values} = useContext(ArrxContext); 
  const elements = indexes ?? indexes ?? values?.map((v,i) => i ) ?? []; 

  return <ElementsContext.Provider value={{}}> 
    {elements.map( (index:any) => { 
      return <Element key={index} {...{index}}>{children}</Element> 
    })} 
    </ElementsContext.Provider> 
}


// ELEMENT ======================================
export function Element({index, children}:React.PropsWithChildren<{index:number}>) {
  return <ElementContext.Provider value={{index}}> 
    {children ?? <div>
      <ElementIndex/> <ElementValue/>
    </div>} 
  </ElementContext.Provider> 
}


// Typical Component ============================
export function ElementIndex() { 
  const {index} = useContext(ElementContext); 
  return <span>{index}. </span> 
}

export function ElementValue() { 
  const {values} = useContext(ArrxContext); 
  const {index} = useContext(ElementContext); 
  return <span>{JSON.stringify(values[index])}</span> 
}