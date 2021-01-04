import React, {useState} from 'react'; 
import {Input} from '../../reusable/input/_input'; 

interface ITest{ 
  value:any, 
  type:string, 
  defaultValue:any; 
}

// TestInputs ===================================
export function TestInputs() {
  
  return <div> 
    <h1>Test Input</h1> 
    <TestInput type={'string'} value={''} defaultValue={''} /> 
    <TestInput type={'number'} value={0} defaultValue={0} /> 
    <TestInput type={'boolean'} value={false} defaultValue={false} /> 
  </div> 
}


// TEST INPUT ===================================
function TestInput({...props}:ITest) { 
  const [value, setValue] = useState(props.value); 
  const {type, defaultValue} = props; 

  return <div> 
    {JSON.stringify(value)} 
    <br/> 
    <Input {...{type, value, setValue, defaultValue}} /> 
  </div> 
} 
