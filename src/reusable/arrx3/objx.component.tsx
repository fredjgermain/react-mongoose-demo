import React, { useContext } from 'react'; 

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