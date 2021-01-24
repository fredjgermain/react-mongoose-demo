import React, { useEffect, useState } from 'react'; 
import {Input, InputArray, Select} from '../../_input'; 
import {GetDefaultValueFromIField, IsEmpty} from '../../_utils'; 
import {useUpdate} from '../../_useupdate'; 



// Reader =======================================
interface IEditor{ 
  ifield:IField; 
  value:any; 
  setValue:React.Dispatch<any>; 
  options?:IOption[]; 
} 
export function Editor({ ifield, value=GetDefaultValueFromIField(ifield), setValue, options}:IEditor) { 
  const {defaultValue, type} = ifield; 
  const _options = options ?? [] as IOption[]; 
  const [_value, _setValue] = useState(value); 

  // synchronize from parent value
  useEffect(() => { 
    if(value !== _value) 
      _setValue(value); 
  }, [value]); 

  // synchronize to parent value 
  useUpdate(() => {setValue(_value)},_value); 

  // Edit Many
  if(ifield.isArray) {
    if(IsEmpty(options)) 
      return <InputArray {...{defaultValue, type, values:_value, setValues:_setValue}} /> 
    return <Select {...{value:_value, setValue:_setValue, options:_options, multiple:true}} /> 
  }
  // Edit Mixed
  if(ifield.isMixed) 
    return <EditMixed {...{ifield, value, setValue}} /> 

  // Edit One
  if(IsEmpty(options)) 
    return <Input {...{value:_value, setValue:_setValue, type, defaultValue}} /> 
  return <Select {...{value:_value, setValue:_setValue, options:_options, multiple:false}} /> 
} 


function EditMixed ({ifield, value=GetDefaultValueFromIField(ifield), setValue, options}:IEditor) {
  return <span>{JSON.stringify(value)}</span>
}