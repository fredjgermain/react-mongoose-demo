import React, { useState } from 'react'; 
import { Story } from '@storybook/react'; 
import {InputArray, IInputArray} from './_inputarray'; 



function TestInputArray({...props}:IInputArray) { 
  const [values, setValues] = useState(props.values); 
  const onSetValues = (newValue:any[]) => setValues(newValue); 
  props.values = values; 
  props.onSetValues = onSetValues; 

  return <div> 
    {JSON.stringify(values)} 
    <InputArray {...props} /> 
  </div> 
} 



export default { 
  title: 'Input/InputArray', 
  component: TestInputArray, 
} 

const Template:Story<IInputArray> = args => <TestInputArray {...args} /> 

export const TestInput_StringsError = Template.bind({}) 
TestInput_StringsError.args = { 
  type: 'string', 
  values:['a string']
} 


export const TestInput_StringS = Template.bind({}) 
TestInput_StringS.args = { 
  type: 'string', 
  values:['a string'], 
  defaultValue: '', 
} 

export const TestInput_NumberS = Template.bind({}) 
TestInput_NumberS.args = { 
  type: 'number', 
  values:[21, 56], 
  defaultValue: 0, 
} 


export const TestInput_BoolS = Template.bind({}) 
TestInput_BoolS.args = { 
  type: 'boolean', 
  values:[true, false, false], 
  defaultValue: false, 
} 