import React, {useContext} from 'react'; 
import {ObjxContext} from './objx.component'; 

// Fields ===========================================
interface IFieldContext { 
  value: any; 
  setValue: (newValue:any) => void; 
  ifield:IField; 
}
export const FieldContext = React.createContext({} as IFieldContext); 
export default function Fields({children}:React.PropsWithChildren<any>) { 
  const {obj, setObj,  ifields} = useContext(ObjxContext); 


  function GetValueSetValue(ifield:IField) { 
    const value = obj[ifield.accessor] ?? []; 
    const setValue = (newValue:any) => { 
      const newObj = {...obj}; 
      newObj[ifield.accessor] = newValue; 
      setObj(() => newObj); 
    } 
    return {value, setValue}; 
  } 

  // RENDER --------------------------------------
  return <div> 
    {ifields.map( (ifield, i) => { 
      const {value, setValue} = GetValueSetValue(ifield); 
      const fieldContext = {value, setValue, ifield}; 
      return <FieldContext.Provider key={i} value={fieldContext} > 
        {children} 
      </FieldContext.Provider> 
    })} 
  </div> 
}

// Field Label ==================================
export function FieldLabel() { 
  const {ifield} = useContext(FieldContext); 
  return <label>{ifield.label}: </label>; 
} 

export function FieldValue() { 
  const {value} = useContext(FieldContext); 
  return <em>{value}</em>; 
} 