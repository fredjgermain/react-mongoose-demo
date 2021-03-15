import React from 'react'; 
import { TestInputArray } from './inputarray.component';


export default { 
  title: 'Input/InputArray', 
  component: TestInputArray, 
} 

const Template = args => <TestInputArray {...args} /> 

export const TestInput_StringS = Template.bind({}) 
TestInput_StringS.args = { 
  _type: 'string', 
  _values:['a string'], 
  _defaultValue: '', 
} 

export const TestInput_NumberS = Template.bind({}) 
TestInput_NumberS.args = { 
  _type: 'number', 
  _values:[21, 56], 
  _defaultValue: 0, 
} 


export const TestInput_BoolS = Template.bind({}) 
TestInput_BoolS.args = { 
  _type: 'boolean', 
  _values:[true, false, false], 
  _defaultValue: false, 
} 