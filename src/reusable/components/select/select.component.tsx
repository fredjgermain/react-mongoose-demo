import React, { useContext, useState } from 'react'; 
import {IsEmpty} from '../../_utils'; 
import {useSelect, IUseSelect} from './select.hook'; 
//import CSS from 'csstype'; 

import './select.style.css'; 

export function TestSelect() { 
  const options:IOption[] = [
    {value:0, label:'valeur 0'}, 
    {value:1, label:'valeur 1'}, 
    {value:2, label:'valeur 2'}, 
    {value:3, label:'valeur 3'}, 
  ] 

  const [value, setValue] = useState(); 

  return <div> 
    <span>{JSON.stringify(value)}</span> 
    <span>Label:</span> 
    <Select {...{value, setValue, options, multiple:false}} /> 
    <span>asdasdasdsa:</span> 
    <Select {...{value, setValue, options, multiple:true}} /> 
    <span>asdasdasdsa:</span> 
  </div> 
} 



// SELECT =======================================
interface ISelect { 
  //type: string; 
  value: any; 
  setValue: any; 
  options: IOption[]; 
  width?:number; 
  placeholder?: string; 
  multiple?:boolean; 
} 


export const SelectContext = React.createContext({} as IUseSelect); 
export function Select({value, setValue, options, placeholder, multiple=false}:ISelect) { 
  const _placeholder = placeholder ?? (multiple ? 'Select 1+ item-s': 'Select 1 item'); 
  const context = useSelect(value, setValue, options, _placeholder, multiple); 

  // Necessary styles for Select component proper functionning. 
  /*const style: CSS.Properties = { 
    width: '20ch', 
    position : 'relative', 
    display: 'inline-block', 
  }; */

  return <SelectContext.Provider value={context}> 
    <div className={'select-main'}> 
      <Selection/> 
      <Options /> 
    </div>
  </SelectContext.Provider> 
} 


function Selection() { 
  const {placeholder, SelectValue, GetSelection} = useContext(SelectContext); 
  const selection = GetSelection(); 

  return <div className={'select-header'}> 
    {IsEmpty(selection) && <span className={'select-placeholder'}>{placeholder}</span>} 
    {selection.map( (option, i) => { 
      const key = JSON.stringify(option.value); 
      const onClick = () => SelectValue(option?.value); 
      const className = 'select-option'; 
      return <span key={key} {...{onClick, className}}> 
        {option?.label}{(i < selection.length-1) ? ', ':''}
      </span> 
    })} 
  </div> 
} 


function Options() { 
  const {options, SelectValue, GetSelection} = useContext(SelectContext); 
  const selection = GetSelection(); 
  const IsSelected = (option:IOption) => selection.some(o => o?.value === option?.value); 

  /*const style: CSS.Properties = { 
    display: 'none', 
    position: 'absolute', 
    width: '100%', 
    zIndex: 1, 
  }*/

  return <div className={'select-options'}  > 
    {options.map( option => { 
      const key = JSON.stringify(option.value); 
      const onClick = () => SelectValue(option.value); 
      const className = IsSelected(option) ? 'select-option-selected': 'select-option'; 
      return <div key={key} {...{onClick, className}} > 
        {option.label} 
      </div> 
    })}
  </div>
} 
