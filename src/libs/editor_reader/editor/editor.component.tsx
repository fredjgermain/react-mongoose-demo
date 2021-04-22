import { useEffect, useState } from 'react'; 
import { IsEmpty, GetDefaultValueFromIField } from '../../_utils'; 
import { GetReadValue, IReader } from '../reader/_reader'; 
import { Input, InputArray, InputSelect } from '../../_inputs'; 


export type IEditorFunc = ({...props}:IEditor) => JSX.Element; 
export interface IEditor extends IReader { 
  editValue: (newValue:any) => void; 
  validation?: (newValue:any) => boolean; 
  
  placeholder?: string; 
  sizeFunc?: (value:any) => number; 
  inputAttribute?: React.InputHTMLAttributes<HTMLInputElement>; 
} 

interface IProps extends IEditor{ 
  func?: IEditorFunc; 
}



export function Editor({options = [], validation = () => true, ...props}:IProps) { 
  const value = IsEmpty(props.value) ? GetDefaultValueFromIField(props.ifield): props.value; 
  const args = {...props, value, options, validation}; 
  props.func = props.func ?? GetDefaultEditorFunc(props.ifield, !IsEmpty(options)); 
  return <props.func {...args} /> 
} 


function GetDefaultEditorFunc(ifield:IField, hasOptions:boolean) { 
  if(hasOptions) 
    return EditSelection(ifield); 
  if(ifield.isArray) 
    return EditMany; 
  if(ifield.isMixed) 
    return EditMixed; 
  return EditOne; 
} 

// Edit one
function EditOne({value, editValue, ifield, ...props}:IEditor) { 
  const onSetValue = editValue; 
  const type = ifield.type; 
  const defaultValue = ifield.defaultValue; 
  return <Input {...{...props, type, value, onSetValue, defaultValue}} /> 
}


// Edit many
function EditMany({value, editValue, options, ifield, ...props}:IEditor) { 
  const values = value; 
  const onSetValues = editValue; 
  const type = ifield.type; 
  const defaultValue = ifield.defaultValue; 
  return <InputArray {...{...props, type, values, onSetValues, defaultValue}} /> 
}

function EditMixed({value, editValue, options, ifield}:IEditor) { 
  return <div>
    Edit Mixed
  </div>
}




// Edit Selection 
function EditSelection(ifield:IField) { 
  return ifield.isArray ? 
    EditSelectMulti: 
    EditSelectSingle; 
}

function EditSelectSingle({editValue, options = [], ifield, ...props}:IEditor) { 
  const onSetValue = editValue; 
  return <InputSelect {...{...props, onSetValue, options}} /> 
}

function EditSelectMulti({editValue, options = [], ifield, ...props}:IEditor) { 
  const onSetValue = editValue; 
  return <InputSelect {...{...props, onSetValue, options, multiple:true}} /> 
}