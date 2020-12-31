import {useEffect, useState} from 'react'; 
//import {useInput} from '../useInput.hook'; 
import {IEvent, IsPressEnter} from '../input.utils'; 
import {ISelecter} from './selecter.component'; 
import {ToArray, Remove, Union} from '../../_utils'; 


export interface IUseSelect extends ISelecter { 
  fold: boolean; 
  setFold: any; 
  Select: (newValue:any) => void; 
} 

// USE SELECT ===================================
export function useSelect(props:ISelecter):IUseSelect { 

  const initValue = props.isMulti ? props.value ?? [] : props.value; 
  const [value, setValue] = useState(initValue); 
  const [fold, setFold] = useState(true); 
  const placeHolder = props.placeHolder ?? "Empty selection"; 

  // Synchronize value with parent's value
  useEffect(() => { 
    if(props.value !== value) 
      setValue(initValue); 
  }, [JSON.stringify(initValue)]) 

  const {type, useref} = props; 
  const onChange = (newValue:any) => setValue(newValue); 
  const onPressEnter = DefaultOnPressEnter(setFold, props.onPressEnter); 
  const onBlur = DefaultOnBlur(setFold); 

    // if newValue is already selected; 
  //    remove newValue from selection
  // else; 
  //    if ismulti
  //      add to selection
  //    else 
  //      replace selection
  function Select(newValue:any) { 
    const selection = ToArray(value); 
    const newSelection = selection.includes(newValue) ? 
      Remove(selection, (e) => e === newValue)[0]: 
      props.isMulti ? 
        Union(selection, newValue) : 
        ToArray(newValue); 
    const valueToReturn = props.isMulti ? newSelection: newSelection.shift(); 
    setValue(() => valueToReturn); 
    if(!props.isMulti) 
      setFold(true); 
    props.returnValue(valueToReturn); 
  } 

  return {...props, value, type, setValue, placeHolder, useref, onChange, onBlur, onPressEnter, fold, setFold, Select}; 
} 

// Default On Blur ------------------------------
function DefaultOnBlur(setFold:any):(event:any)=> void { 
  return (event:any) => setFold(true);
} 

// Default On Press Enter -----------------------
function DefaultOnPressEnter(setFold:any, onPressEnter?:(event:any) => void):(event:any) => void {
  return (event:any) => { 
    if(IsPressEnter((event as IEvent).code) ) {
      console.log('onpress');
      onPressEnter? onPressEnter(event) : setFold(true); 
    }
  } 
} 
