import React, { useContext } from 'react'; 
import {ArrxContext, ElementContext} from '../arrx/_arrx'; 

export interface IObjx { 
  value:any; 
  ifields:IField[]; 
} 

export const ObjxContext = React.createContext({} as IObjx); 
const FieldsContext = React.createContext({} as any); 
export const FieldContext = React.createContext({} as {ifield:IField}); 

// ARRX =========================================
export function Objx({children, ...props}:React.PropsWithChildren<IObjx>) { 
  //const context:IUseArrx = useArrx(props); 
  return <ObjxContext.Provider value={props} > 
    {children} 
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

// FIELD ========================================
export function Field({ifield, children}:React.PropsWithChildren<{ifield:IField}>) {
  return <FieldContext.Provider value={{ifield}} > 
    {children} 
  </FieldContext.Provider> 
}

// Util component ----------------------------
export function FieldLabel() {
  const {ifield} = useContext(FieldContext);
  return <span>{ifield.accessor}:</span>
}

export function FieldValue() {
  const {value} = useContext(ObjxContext); 
  const {ifield} = useContext(FieldContext); 
  return <span>{value[ifield.accessor] ?? ifield.defaultValue}</span> 
}

export function ArrxObjx({ifields, children}:React.PropsWithChildren<{ifields:IField[]}>) { 
  const {values} = useContext(ArrxContext); 
  const {index} = useContext(ElementContext); 
  return <Objx {...{value:values[index], ifields}} > 
    {children} 
  </Objx>
}
