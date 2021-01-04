import React, {useContext, useEffect} from 'react'; 
import {IOption} from '../../reusable/_input'; 
import {SelectContext} from './select.component'; 


// OPTIONS ======================================
interface IOptions { 
  label?:string; // defines a optgroup with a label 
  options:IOption[]; 
  [key:string]:any; 
} 
//const OptionsContext = React.createContext({}); 
export function Options({label, options}:IOptions) { 
  const {setOptions} = useContext(SelectContext); 
  
  useEffect(() => { 
    setOptions( (prev:any) => [...prev, ...options] ); 
  }, []); 

  return <div > 
    {label ? (<div className={'select_body_label'}>{label}</div>) : null} 
    {options.map( (option,i) => { 
      return <Option key={i} option={option} /> 
    })} 
  </div> 
} 

function Option({option}:{option:IOption}) { 
  const {SelectValue} = useContext(SelectContext); 
  return <div className={'select_body_option'} onClick={() => SelectValue(option.value)}> 
    {option.label} 
  </div>
}