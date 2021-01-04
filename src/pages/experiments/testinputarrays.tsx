import React, {useState} from 'react'; 
import {InputArray, Elements, Element, CreateElement, DeleteBtn, ElementCount, ReadArray} from '../../reusable/input/_input'; 

interface ITest{ 
  value:any, 
  type:string, 
  defaultValue:any; 
}
  

// EXPERIMENTS ==================================
export function TestInputArrays() { 
  return <div> 
    <h1>Test Array</h1> 
    <TestInputArray type={'number'} value={[1,2,3]} defaultValue={0} /> 
    <TestInputArray type={'string'} value={['aa', 'bcd']} defaultValue={''} /> 
    <TestInputArray type={'boolean'} value={[false, true]} defaultValue={false} /> 
  </div> 
} 

// TEST ARRAY ===================================
function TestInputArray({...props}:ITest) { 
  const [values, setValues] = useState(props.value); 
  const {type, defaultValue} = props; 

  return <div> 
    <ReadArray values={values} /> 
    <br/> 
    <InputArray {...{type, values, setValues, defaultValue}} > 
      <ElementCount/> 
      <Elements> 
        <Element/> <DeleteBtn>X</DeleteBtn> 
        <br/> 
      </Elements> 
      <CreateElement/> 
    </InputArray> 
  </div> 
} 
