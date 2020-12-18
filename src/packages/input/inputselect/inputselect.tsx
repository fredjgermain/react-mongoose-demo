import React, {useState} from 'react'; 
import {IInput, useInputHook} from '../_common'; 

import './inputselect.css'; 



// InputSelect ==================================
interface ISelect extends IInput<any|Array<any>> { 
  isMulti?:boolean; 
  options:IOption[]; 
} 
export default function InputSelect({isMulti=false, options, ...props}:ISelect) { 
  const value = [props.value].flat(); 
  const onSendValue = isMulti ? props.onSendValue: (value:any[]) => props.onSendValue(value[0]); 
  return <InputSelectMulti {...{...props, value, options, onSendValue, isMulti}} /> 
}


//
export function InputSelectMulti({isMulti=false, options, ...props}:ISelect) { 
  //console.log('Select');
  const {value, setValue, onSendValue, onBlur, onPressEnter} = useInputHook<Array<any>>(props); 
  const [fold, setFold] = useState(true); 
  
  // On Change
  const onChange = (newValue:any) => { 
    let selection = value ? [...value]: []; 
    const index = selection.findIndex( v => v === newValue); 
    if(index >=0) 
      selection.splice(index, 1); 
    else 
      selection = isMulti? [...selection, newValue] : [newValue]; 
    setValue(selection); 
    if(!isMulti) { 
      onSendValue(selection); 
      setFold(true); 
    }
  } 

  // On Blur
  function OnBlur(event:any) { 
    setFold(true); 
    if(onBlur) 
      onBlur(event); 
  } 

  // On Press Enter 
  function OnPressEnter(event:any) { 
    setFold(true); 
    if(onPressEnter) 
      onPressEnter(event); 
  } 

  // RENDER -------------------------------------
  if(fold)
    return <div className={'inputSelect'} tabIndex={0} onBlur={OnBlur} onKeyUp={OnPressEnter} > 
      <SelectHeader {...{value, options, fold, setFold}}/> 
    </div> 

  return <div className={'inputSelect'} tabIndex={0} onBlur={OnBlur} onKeyUp={OnPressEnter} > 
    <SelectHeader {...{value, options, fold, setFold}}/> 
    <SelectFolder {...{value, options, onChange}}/> 
  </div> 
} 


// SelectHeader =================================
interface IPropsHeader { 
  value: Array<any>; 
  options: IOption[]; 
  fold: boolean; 
  setFold: React.Dispatch<React.SetStateAction<boolean>>; 
} 
function SelectHeader({value, options, fold, setFold}:IPropsHeader) { 
  const selection = options.filter( o => value.includes(o.value) ) 
  // RENDER -------------------------------------
  return <div className={'selectHeader'} onClick={() => setFold(!fold)}> 
    <span className={'selected'}> 
      {selection.map( (o,i) => { 
        return <span key={i} className={'element'}> {o.label} </span>; 
      })} 
    </span> 
    <span className={'btn'}>&#x25BC;</span> 
  </div>; 
} 


// SelectFolder ===============================
interface IPropsFolder { 
  value:Array<any>; 
  options:IOption[]; 
  onChange:(event:any) => void; 
} 
function SelectFolder({value, options, onChange}:IPropsFolder) { 
  const selectedOptions = options.filter( o => value.includes(o.value)); 
  const notSelectedOptions = options.filter( o => !value.includes(o.value) ); 

  // RENDER -------------------------------------
  return <div className={'selectFold'}> 
    {selectedOptions.map( (o,i) => { 
      return <div key={i} onClick={()=>onChange(o.value)} 
              className={'selectedOption'} >{o.label}</div> 
    })} 
    {notSelectedOptions.map( (o,i) => { 
      return <div key={i} onClick={()=>onChange(o.value)} 
              className={'notSelectedOption'} >{o.label}</div> 
    })} 
  </div>; 
} 