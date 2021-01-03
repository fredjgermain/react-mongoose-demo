import React, {useContext, useEffect} from 'react'; 
import {IOption} from '../../reusable/_input'; 
import {SelectContext} from './select.component'; 



// SELECT BODY ==================================
export function SelectBody() { 

}

// OPTIONS ======================================
interface IOptions { 
  label?:string; // defines a optgroup with a label 
  options:IOption[]; 
  [key:string]:any; 
} 
//const OptionsContext = React.createContext({}); 
export function Options({label, options:os}:IOptions) { 
  const {fold, setOptions} = useContext(SelectContext); 
  
  useEffect(() => { 
    setOptions( (prev:any) => [...prev, ...os] ); 
  }, []); 

  //const Label = 

  return <div> 
    {!fold && label ? (<div className={'select_body_label'}>
        {label}
      </div>) : null} 
    {!fold ? os.map( (o,i) => { 
      return <Option key={i} option={o} /> 
    }) : null} 
  </div> 
} 

function Option({option}:{option:IOption}) { 
  const {Select} = useContext(SelectContext); 
  return <div className={'select_body_option'} onClick={() => Select(option.value)}> 
    {option.label} 
  </div>
}