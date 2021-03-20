import React, {useState} from 'react'; 
import {IInputSelect, InputSelect, } from './_inputselect'; 


function TestInputSelect({...props}:IInputSelect) { 
  const [_value, setValue] = useState(props._value); 
  const _onChange = (newValue:any[]) => setValue(newValue); 
  const {_options, _multiple, _width} = props; 

  return <div> 
    {JSON.stringify(_value)} <br/> 
    <InputSelect {...{_value, _onChange, _options, _multiple, _width}} /> 
  </div> 
} 


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
