import React, { useContext } from 'react'; 
import { IsEmpty } from '../../_utils'; 
import { Field } from './field.component'; 


export interface IObjx { 
  value:any; 
  ifields:IField[]; 
} 

export const ObjxContext = React.createContext({} as IObjx); 
const FieldsContext = React.createContext({} as any); 
export const FieldContext = React.createContext({} as {ifield:IField}); 

// ARRX =========================================
export function Objx({value, ifields, children}:React.PropsWithChildren<IObjx>) { 
  const context = {value:IsEmpty(value)? {}:value, ifields}; 
  //const context:IUseArrx = useArrx(props); 
  return <ObjxContext.Provider value={context} > 
    {children ?? <Fields/> } 
  </ObjxContext.Provider> 
} 

// FIELDS =======================================
export function Fields({ifields, children}:React.PropsWithChildren<{ifields?:IField[]}>) { 
  const context = useContext(ObjxContext); 
  const IFields = ifields ?? context.ifields; 

  return <FieldsContext.Provider value={{}}> 
    {IFields.map( (ifield:IField, index:number) => { 
      return <Field key={index} {...{ifield}} >{children}</Field> 
    })} 
  </FieldsContext.Provider> 
}
