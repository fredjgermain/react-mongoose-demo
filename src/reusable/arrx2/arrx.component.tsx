import React, { useContext, useState } from 'react'; 
import {IArrx, IUseArrx, useArrx} from './arrx.hook'; 
import {Input} from '../../reusable/input/_input'; 
import {OnEnter} from '../../reusable/utils/_utils';


export const ArrxContext = React.createContext({} as IUseArrx); 
const ElementsContext = React.createContext({} as any); 
export const ElementContext = React.createContext({} as {index:number}); 

// ARRX =========================================
export function Arrx({children, ...props}:React.PropsWithChildren<IArrx>) { 
  const context:IUseArrx = useArrx(props); 
  return <ArrxContext.Provider value={context} > 
    {children}
  </ArrxContext.Provider>
}

// ELEMENTS =====================================
export function Elements({indexes, children}:React.PropsWithChildren<{indexes?:number[]}>) { 
  const {values} = useContext(ArrxContext); 
  const elements = indexes ? values.filter( (v,i) => indexes.includes(i) ): values; 

  console.log(elements); 

  return <ElementsContext.Provider value={{}}> 
    {elements.map( (v:any, index:number) => { 
      return <Element key={index} {...{index}}>{children}</Element> 
    })} 
    </ElementsContext.Provider> 
}

export function Element({index, children}:React.PropsWithChildren<{index:number}>) {
  console.log(index); 

  return <ElementContext.Provider key={index} value={{index}} > 
    {children} 
  </ElementContext.Provider> 
}

// Typical ELEMENT ======================================
// Element Index ----------------------------------
export function ElementIndex() { 
  const {index} = useContext(ElementContext); 
  return <span>{index}. </span> 
} 

// Element Read ----------------------------------
export function ElementRead() { 
  const {Read} = useContext(ArrxContext); 
  const {index} = useContext(ElementContext); 
  return <span>{Read(index)}</span> 
}

// Element Update ----------------------------------
export function ElementUpdate({...props}:React.PropsWithChildren<React.HTMLAttributes<HTMLInputElement>>) { 
  const {type, defaultValue, Read, Update} = useContext(ArrxContext); 
  const {index} = useContext(ElementContext); 
  const [value, setValue] = useState(Read(index)); 
  const onKeyUp = (event:any) => OnEnter(event, () => {
    Update(value, index)
  }); 

  return <Input {...{type, value, setValue, defaultValue, onKeyUp, ...props}} /> 
}


// Element Create ----------------------------------
export function ElementCreate({...props}:React.PropsWithChildren<React.HTMLAttributes<HTMLInputElement>>) { 
  const {type, defaultValue, Read, Create} = useContext(ArrxContext); 
  const [value, setValue] = useState(Read()); 

  const onKeyUp = (event:any) => OnEnter(event, () => { 
    Create(value); 
    setValue(() => defaultValue); // reset input to defaultValue after creation. 
  }); 

  return <Input {...{type, value, setValue, defaultValue, onKeyUp, ...props}} /> 
}


// Element Delete ----------------------------------
export function ElementDelete({children, ...props}:React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) { 
  const {Delete} = useContext(ArrxContext); 
  const {index} = useContext(ElementContext); 

  return <button onClick={() => Delete(index)} {...props}> 
    {!children ? 'x' : children} 
  </button> 
}
