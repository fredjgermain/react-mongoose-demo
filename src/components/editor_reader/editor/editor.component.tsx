import { useEffect, useState } from 'react'; 
import { IsEmpty, GetDefaultValueFromIField } from '../../../reusable/_utils'; 
import { GetReadValue, IReader } from '../reader/_reader'; 
import { Input } from '../input/_input'; 
import { InputArray } from '../inputarray/_inputarray'; 
import { InputSelect } from '../inputselect/_inputselect'; 


export type IEditorFunc = ({...props}:IEditor) => JSX.Element; 
export interface IEditor extends IReader { 
  editValue: (newValue:any) => void; 
  validation?: (newValue:any) => boolean; 
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
function EditOne({value, editValue, ifield}:IEditor) { 
  const onSetValue = editValue; 
  const type = ifield.type; 
  const defaultValue = ifield.defaultValue; 
  return <Input {...{type, value, onSetValue, defaultValue}} /> 
}


// Edit many
function EditMany({value, editValue, options, ifield}:IEditor) { 
  const values = value; 
  const onSetValues = editValue; 
  const type = ifield.type; 
  const defaultValue = ifield.defaultValue; 
  return <InputArray {...{type, values, onSetValues, defaultValue}} /> 
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

function EditSelectSingle({value, editValue, options = [], ifield}:IEditor) { 
  const _value = value; 
  const _onChange = editValue; 
  const _options = options; 
  return <InputSelect {...{value: _value, options: _options, onSetValue: _onChange}} /> 
}

function EditSelectMulti({value, editValue, options = [], ifield}:IEditor) { 
  const _value = value; 
  const _onChange = editValue; 
  const _options = options; 
  return <InputSelect {...{value: _value, options: _options, onSetValue: _onChange, multiple:true}} /> 
}