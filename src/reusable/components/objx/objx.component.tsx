import React, { useContext } from 'react'; 
//import { FieldValue } from '../../_objx';
import { IsEmpty } from '../../_utils';
//import {ArrxContext, ElementContext} from '../arrx/_arrx'; 
import {GetDefaultValueFromIField} from '../../_utils';

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

// FIELD ========================================
export function Field({ifield, children}:React.PropsWithChildren<{ifield:IField}>) {
  return <FieldContext.Provider value={{ifield}} > 
    {children ?? <div><FieldLabel/> <FieldValue/></div>} 
  </FieldContext.Provider> 
}

// Util component ----------------------------
export function FieldLabel() {
  const {ifield} = useContext(FieldContext);
  return <span>{ifield.label}:</span>
}

export function FieldValue() {
  const {value} = useContext(ObjxContext); 
  const {ifield} = useContext(FieldContext); 
  const _value = value[ifield.accessor] ?? GetDefaultValueFromIField(ifield); 
  return <span>{JSON.stringify(_value)}</span> 
}

export function DisplayObjx({value, ifields}:{value:any, ifields:IField[]}) { 
  return <Objx {...{value, ifields}}> 
      <Fields>
        <FieldLabel/> 
        <FieldValue/> 
        <br/>
      </Fields>
    </Objx>
}