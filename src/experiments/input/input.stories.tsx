import React, {useState} from 'react'; 
import { Story } from '@storybook/react'; 
import { Input } from './input.component';


export default { 
  title: 'Experiment/Input', 
  component: Input, 
} 

function TemplateTest() { 
  return <Input /> 
} 


const Template:Story<any> = args => <Input /> 

export const TestInput = Template.bind({}) 
TestInput.args = {} 

