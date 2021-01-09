import React, { useContext, useState } from 'react'; 
import {Input} from '../../../reusable/components/input/_input'; 


export interface IArrx { 
  values:any[]; 
} 

export const ArrxContext = React.createContext({} as IArrx); 
const ElementsContext = React.createContext({} as any); 
export const ElementContext = React.createContext({} as {index:number}); 

// ARRX =========================================
export function Arrx({children, ...props}:React.PropsWithChildren<IArrx>) { 
  //const context:IUseArrx = useArrx(props); 
  return <ArrxContext.Provider value={props} > 
    {children}
  </ArrxContext.Provider>
}


// ELEMENTS =====================================
export function Elements({indexes, children}:React.PropsWithChildren<{indexes?:number[]}>) { 
  const {values} = useContext(ArrxContext); 
  const elements = indexes ? indexes: values.map((v,i) => i ); 

  return <ElementsContext.Provider value={{}}> 
    {elements.map( (index:any) => { 
      return <Element key={index} {...{index}}>{children}</Element> 
    })} 
    </ElementsContext.Provider> 
}


// ELEMENT ======================================
export function Element({index, children}:React.PropsWithChildren<{index:number}>) {
  return <ElementContext.Provider key={index} value={{index}}> 
    {children} 
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
  return <span>{JSON.stringify(values[index])}. </span> 
}