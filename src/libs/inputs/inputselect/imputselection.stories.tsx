import React, {useState} from 'react'; 
import { Story } from '@storybook/react'; 
import {IInputSelect, InputSelect, } from './_inputselect'; 


function TestInputSelect({...props}:IInputSelect) { 
  const [value, setValue] = useState(props.value); 
  props.value = value; 
  props.onSetValue = (newValue:any[]) => setValue(newValue); 

  return <div> 
    {JSON.stringify(value)} <br/> 
    <InputSelect {...props} /> 
  </div> 
} 


export default { 
  title: 'Input/InputSelect', 
  component: TestInputSelect, 
} 

const Template:Story<IInputSelect> = args => <TestInputSelect {...args} /> 

export const TestInputSelect_single = Template.bind({}) 
TestInputSelect_single.args = { 
  value:0, 
  options: [ 
    {value:0, label:'option 0'}, 
    {value:1, label:'option 1'}, 
    {value:2, label:'option 2'}, 
  ] as IOption[], 
  multiple: false, 
  placeholder: 'select one'
} 


export const TestInputSelect_multi = Template.bind({}) 
TestInputSelect_multi.args = { 
  value:['a'], 
  options: [ 
    {value:'0', label:'option 0'}, 
    {value:'1', label:'option 1'}, 
    {value:'2', label:'option 2'}, 
  ] as IOption[], 
  multiple: true, 
} 
