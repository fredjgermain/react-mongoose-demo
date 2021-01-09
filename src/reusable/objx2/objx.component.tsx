import React, {useContext, useEffect, useState} from 'react'; 
import {IObjx, IUseObjx, useObjx } from './objx.hook';
import {Input} from '../../reusable/input/_input'; 
import {OnEnter} from '../../reusable/utils/_utils';


export const ObjxContext = React.createContext({} as IUseObjx); 
const FieldsContext = React.createContext({} as any); 
export const FieldContext = React.createContext({} as {ifield:IField}); 

// OBJX =========================================
export function Objx({children, ...props}:React.PropsWithChildren<IObjx>) { 
  const context:IUseObjx = useObjx(props); 
  // render --------------------------------------
  return <ObjxContext.Provider value={context}> 
    {children} 
  </ObjxContext.Provider>; 
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

export function Field({ifield, children}:React.PropsWithChildren<{ifield:IField}>) {
  return <FieldContext.Provider value={{ifield}} > 
    {children} 
  </FieldContext.Provider> 
}


// Typical field element =============================
// Field Label
export function FieldLabel() { 
  const {ifield:{label}} = useContext(FieldContext); 
  return <span>{label}</span> 
}

// Field Read
export function FieldRead() { 
  const {ReadField: Read} = useContext(ObjxContext); 
  const {ifield} = useContext(FieldContext); 
  return <span>{JSON.stringify(Read(ifield))}</span> 
}

// Field Edit 
export function FieldEdit({...props}:React.PropsWithChildren<React.HTMLAttributes<HTMLInputElement>>) { 
  console.log('Field');
  const {ReadField: Read, EditField: Edit} = useContext(ObjxContext); 
  const {ifield} = useContext(FieldContext); 
  const [value, setValue] = useState(Read(ifield)); 
  
  //console.log([Read(ifield), value]); 
  //const ReInitValue = JSON.stringify(Read(ifield)) === JSON.stringify(value); 

  useEffect(() => { 
    if(Read(ifield) !== value)
      setValue(Read(ifield)); 
  }, [Read(ifield)]); 

  const {type, defaultValue} = ifield; 

  const onKeyUp = (event:any) => OnEnter(event, () => { 
    Edit(value, ifield); 
  }); 

  return <Input {...{type, value, setValue, defaultValue, onKeyUp, ...props}} /> 
}