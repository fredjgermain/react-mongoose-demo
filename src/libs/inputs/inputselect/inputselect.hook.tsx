import React, { useState } from 'react'; 
import { Filter, ToArray } from '../../_arrayutils'; 
import { GetSelectedValuesFromOptions, IsEmpty } from '../../_utils'; 
import { IInputSelect, IUseSelect } from './inputselect.type'; 

// USE SELECT ====================================
export function useInputSelect({...props}:IInputSelect):IUseSelect { 
  const [toggle, setToggle] = useState(false); 
  const SetToggle = (toggle?:boolean) => { 
    setToggle( prev => { 
      return toggle ?? !prev; 
    }) 
  } 

  props.multiple = props.multiple ?? false; 
  props.options = props.options ?? []; 
  props.placeholder = props.placeholder ?? "--- Empty ---"; 

  // SelectValue ................................
  function SelectValue (newValue:any) { 
    const [inclusion, exclusion] = Filter(ToArray(props.value), e => e === newValue); 
    if(IsEmpty(inclusion) && props.multiple) 
      exclusion.push(newValue); 
    if(IsEmpty(inclusion) && !props.multiple) 
      exclusion[0] = newValue; 
    const selectionFromOptions = GetSelectedValuesFromOptions(exclusion, props.options).map( o => o.value); 
    const selection = props.multiple ? selectionFromOptions: selectionFromOptions.shift(); 
    props.onSetValue(selection); 
    if(!props.multiple) 
      SetToggle(false); 
  } 

  function GetSelection() { 
    return GetSelectedValuesFromOptions(props.value, props.options); 
  } 

  return {...props, toggle, SetToggle, SelectValue, GetSelection}; 
} 