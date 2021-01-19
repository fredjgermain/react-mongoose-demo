import React, { useState } from 'react'; 
import {Select, Options} from '../reusable/components/input/_input'; 



export function TestKey() { 
  const [value, setValue] = useState(0); 
  const options:IOption[] = [ 
    {value:0, label:'value 0'}, 
    {value:1, label:'value 1'}, 
    {value:2, label:'value 2'}, 
  ] 
  
  const selector = <Select {...{value, setValue}}> 
    <Options {...{options}}/> 
  </Select> 
  const key = value; 
  

  return <div> 
    {selector} 
    <TestHook key={value} Value={value} /> 
  </div> 
  //return <div key={value} ></div> 
} 


function TestHook({Value}:{Value:any}) { 
  const [value, setValue] = useState(Value); 

  return <div>
    {JSON.stringify(value)}
  </div>
}