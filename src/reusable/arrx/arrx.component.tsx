import React, { useContext } from 'react'; 

interface IArrx{ 
  values:any[]; 
  setValues: any; 
} 
export const ArrxContext = React.createContext({} as IArrx); 
// ARRX =========================================
export function Arrx({children, ...props}:React.PropsWithChildren<IArrx>) { 
  const {values} = props; 
  // RENDER --------------------------------------
  return <ArrxContext.Provider value={props}> 
    {values.map((value, index) => { 
      return <Element {...{key:index, index, children}} /> 
    })} 
  </ArrxContext.Provider>; 
} 

// Hook Arrx 
function SetElement(values:any[], setValues:any, index:number) { 
  return (newValue:any) => { 
    console.log(values); 
    const newValues = [...values]; 
    newValues[index] = newValue; 
    setValues(newValues); 
  } 
} 


interface IElementContext { 
  value: any; 
  setValue: React.Dispatch<any>; 
  index: number; 
} 
interface IElement {index:number}
export const ElementContext = React.createContext({} as IElementContext); 
// Element ======================================
export function Element({index, children}:React.PropsWithChildren<IElement>) { 
  const {values, setValues} = useContext(ArrxContext); 

  const value = values[index]; 
  const setValue = SetElement(values, setValues, index); 
  return <ElementContext.Provider key={index} value={{value, setValue, index}} > 
    {children} 
  </ElementContext.Provider> 
}

