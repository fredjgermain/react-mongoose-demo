import React, { useContext } from 'react'; 
import { IReaderComponent, IEditorComponent } from '../../_input'; 
import { useGetSet } from '../../_usegetset'; 
import { GetDefaultValueFromIField, GetValueAt } from '../../_utils'; 
import { ObjxContext, FieldContext } from './objx.component'; 


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


type ReaderFunc = ({...props}:IReaderComponent) => JSX.Element; 
export function FieldReader({...props}:{readerFunc:ReaderFunc}) { 
  const {value} = useContext(ObjxContext); 
  const {ifield} = useContext(FieldContext); 
  const _value = GetValueAt(value, [ifield.accessor]); 
  return <props.readerFunc {...{value:_value, ifield}} /> 
} 


type EditorFunc = ({...props}:IEditorComponent) => JSX.Element; 
export function FieldEditor({...props}:{setValue:React.Dispatch<React.SetStateAction<IEntry>>, editorFunc:EditorFunc}) { 
  const {value} = useContext(ObjxContext); 
  const {ifield} = useContext(FieldContext); 
  const {accessor, ...args} = useGetSet(value, props.setValue, ifield.accessor); 
  return <props.editorFunc {...{...args, ifield}} /> 
} 
