import React from 'react'; 
import { TestInputSelect } from './inputselect.component';


export default { 
  title: 'Input/InputSelect', 
  component: TestInputSelect, 
} 

const Template = args => <TestInputSelect {...args} /> 

export const TestInput_StringS = Template.bind({}) 
TestInput_StringS.args = { 
  _value:0, 
  _options: [ 
    {value:0, label:'option 0'}, 
    {value:1, label:'option 1'}, 
    {value:2, label:'option 2'}, 
  ] as IOption[], 
  _multiple: false, 
} 
