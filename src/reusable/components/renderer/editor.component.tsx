import React, {useEffect, useState} from 'react'; 
import {GetDefaultValueFromIField, IsEmpty} from '../../_utils'; 
import {ToArray, Pick} from '../../_arrayutils'; 
import {Input, InputArray} from '../../_input'; 
import {Select} from '../../_input'; 

import {IReader} from './reader.component'; 
import { useUpdate } from '../../_useupdate'; 



export interface IEditor extends IReader { 
  setValue: React.Dispatch<React.SetStateAction<any>>; 
} 

type EditorFunc = ({...props}:IEditor) => JSX.Element; 

interface IEditorComponent extends IEditor { 
  CustomEditDefault?:EditorFunc; 

  CustomEditOne?:EditorFunc; 
  CustomEditMany?:EditorFunc; 

  CustomEditOneOptions?:EditorFunc; 
  CustomEditManyOptions?:EditorFunc; 

  CustomEditMixed?:EditorFunc; 
} 

/* EDITOR ===========================================================
- ifield      // gives info about the type and default values to be displayed. 
- value       // will be assigned to its appropriate default values if undefined. 
- options     // if not empty, the label matching the value will be displayed. 
- setValue    // hooks with parent component value. 

- CustomEditDefault : if defined this function will be used display value. 

- CustomEditOne : if defined is used to display value, otherwise uses 'EditOne' (Input) 

- CustomEditMany : if defined is used to display value, otherwise uses 'EditMany' (Input array) 

- CustomEditOneOptions : if defined is used to display value, otherwise uses 'EditOneOptions' (Select with multiple:false) 

- CustomEditOneOptions : if defined is used to display value, otherwise uses 'EditManyOptions' (Select with multiple:true) 

- CustomEditMixed : if defined is use to display value, otherwise uses 'EditMixed' (EditMixed) 
*/ 
export function Editor({ifield, options, ...props}:IEditorComponent) { 
  const _value = IsEmpty(options) ? 
    props.value ?? GetDefaultValueFromIField(ifield): 
    GetSelection(props.value).map(o => o.value); 
  
  const [value, setValue] = useState(_value); 
  
  // synchronize from parent value
  useEffect(() => { 
    if(value !== _value) 
      props.setValue(value); 
  }, [value]); 

  // synchronize to parent value 
  //useUpdate(() => {props.setValue(_value)},_value); 

  function GetSelection (value:any) { 
    return Pick(options, ToArray(props.value), (o,u) => o.value === u); 
  } 

  const args = {ifield, value, setValue, options}; 
  const hasOptions = !IsEmpty(options); 

  // Edit Default
  let editfunc = props.CustomEditDefault ?? undefined; 

  // Edit Many options
  if(!editfunc && ifield.isArray && hasOptions) 
    editfunc = props.CustomEditManyOptions ?? EditManyOptions; 

  // Edit Many
  if(!editfunc && ifield.isArray && !hasOptions) 
    editfunc = props.CustomEditMany ?? EditMany; 

  // Edit Mixed
  if(!editfunc && ifield.isMixed) 
    editfunc = props.CustomEditMixed ?? EditMixed; 

  // Edit One option
  if(!editfunc && hasOptions) 
    editfunc = props.CustomEditOneOptions ?? EditOneOptions; 
  // Edit One
  editfunc = editfunc ?? props.CustomEditOne ?? EditOne; 

  return <EditFunc {...{editfunc, args}} /> 
} 


function EditFunc({...props}:{editfunc:EditorFunc, args:IEditor}) { 
  return <props.editfunc {...props.args} />; 
} 


function EditOne({...args}:IEditor) { 
  return <Input {...args} /> 
}

function EditMany({value, setValue, ifield}:IEditor) { 
  return <InputArray {...{ifield, values:value, setValues:setValue}} /> 
}

function EditOneOptions({ifield, value, setValue, ...props}:IEditor) { 
  const options = props.options ?? [] as IOption[]; 
  return <Select {...{ifield, value, setValue, options}  } /> 
} 

function EditManyOptions({...props}:IEditor) { 
  const options = props.options ?? [] as IOption[]; 
  return <Select {...{...props, options} } /> 
} 

function EditMixed({ifield, value, options, setValue}:IEditor) {
  return <div>{JSON.stringify(value)}</div> 
}