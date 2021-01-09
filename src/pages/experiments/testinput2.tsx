import React, {useState} from 'react';
import {Input} from '../../reusable/input/_input'; 


export function TestInput2() { 
  const [nums, setNums] = useState([1,2,3,4,5]); 

  const [num, setNum] = useState(12); 
  const [str, setStr] = useState('fafafa'); 
  const [bool, setBool] = useState(false); 

  /*
  <Input {...{value:num}} /> 
    <Input {...{value:str}} /> 
  */
  return <div>
    {num}
    <Input {...{value:num, setValue:setNum}} />
  </div>
}