import React, {useState} from 'react'; 
import {Input} from '../../components/input/input.component'; 
import {InputArray, InputElements, InputElement, InputCreate, DeleteBtn, } from '../../components/inputarray/_inputarray'; 
import {Select, Options} from '../../components/select/_select'; 
import {IOption} from '../../reusable/_input'; 


export default function Patient() { 
  return <TestInputArray />; 
} 

function TestInputArray() { 
  const [values, setValues] = useState([]); 
  const type = 'number'; 
  const defaultValue = 0; 

  return <div> 
    {JSON.stringify(values)} 
    <InputArray {...{type, values, setValues, defaultValue}} > 
      <InputElements> 
        <InputElement/> <DeleteBtn>X</DeleteBtn> 
        <br/> 
      </InputElements> 
      <InputCreate/>
    </InputArray> 
  </div>
}


function TestInput() { 
  const [value, setValue] = useState(12); 
  const type = 'number'; 
  console.log('TestInput'); 

  return <div> 
    {value}; 
    <Input {...{type, value, setValue}} /> 
  </div> 
} 










function TestSelect() { 
  const [value, setValue] = useState([]); 
  const type = 'number'; 
  const placeholder = 'test number'; 

  //const [values, setValues] = useState([]); 
  const options1:IOption[] = [ 
    {value:0, label:'valeur 0'}, 
    {value:1, label:'valeur 1'}, 
    {value:2, label:'valeur 2'}, 
    {value:3, label:'valeur 3'}, 
    {value:4, label:'valeur 4'}, 
  ]

  const options2:IOption[] = [ 
    {value:5, label:'valeur 5'}, 
    {value:6, label:'valeur 6'}, 
    {value:7, label:'valeur 7'}, 
    {value:8, label:'valeur 8'}, 
  ]; 

  return <div> 

    <div> 
      {JSON.stringify(value)}
      <Select {...{value, setValue, multiple:true, width:10}} > 
        <Options {...{label:'group 1', options:options1}} /> 
        <Options {...{label:'group 2', options:options2}} /> 
      </Select> 
    </div> 
    <h1>PATIENT SECTION</h1> 
    
  </div> 
}