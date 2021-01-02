import React, {useState} from 'react'; 
import {Input, Select, Options} from '../../components/input/input.component'; 
import {IOption} from '../../reusable/_input';

export default function Patient() { 
  const [value, setValue] = useState([]); 
  const type = 'number'; 
  const placeholder = 'test number'; 

  //const [values, setValues] = useState([]); 
  const options:IOption[] = [ 
    {value:0, label:'valeur 0'}, 
    {value:1, label:'valeur 1'}, 
    {value:2, label:'valeur 2'}, 
    {value:3, label:'valeur 3'}, 
    {value:4, label:'valeur 4'}, 
    {value:5, label:'valeur 5'}, 
    {value:6, label:'valeur 6'}, 
    {value:7, label:'valeur 7'}, 
    {value:8, label:'valeur 8'}, 
  ]; 

  /*const Selector = <Selector {...{type, setValue, multiple:false}} onBlur={(event:any) => console.log('onblur')} > 
      <Options {...{options}} /> 
    </Selector> 
  */
  // <Input {...{type, value, setValue, placeholder}} /> 


  return <div> 
    <h1>PATIENT SECTION</h1> 
    <div> 
      <Select {...{type, value, setValue, multiple:true}} > 
        <Options {...{options}} /> 
      </Select> 
    </div> 
  </div> 
} 
