import React, {useContext} from 'react'; 
import {IOption} from '../input.utils'; 
import {SelecterContext} from './selecter.component'


// Select Folder ================================
export function SelecterFolder() { 
  const {options, fold} = useContext(SelecterContext); 

  if(!fold)
    return <div className={'select_folder'}> 
      {options.map( (o,i) => { 
        return <Option key={i} option={o} /> 
      })}
    </div> 
  return null;
} 


// Option ---------------------------------------
function Option({option}:{option:IOption}) { 
  const {value, Select} = useContext(SelecterContext); 

  const isSelected = () => { 
    if( (Array.isArray(value) && value.includes(option.value)) || value === option.value) 
      return <span>&#x2713;</span> 
    return null; 
  } 
  
  return <div className={'select_option'} onClick={ () => Select(option.value) } > 
      {option.value} - {option.label} {isSelected()} 
    </div> 
}