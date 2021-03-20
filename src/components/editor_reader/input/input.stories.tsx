import React, {useState} from 'react'; 
import { IInput, Input } from './_input'; 
import { GetInputType } from '../../../reusable/_utils'; 



function TestInput({...props}:IInput) { 
  const [value, setValue] = useState(props._value); 
  props._value = value; 
  props._onChange = (newValue:any) => setValue(newValue); 

  return <div> 
    {JSON.stringify(value)} {GetInputType(props._type)} <br/> 
    <Input {...props} > </Input> 
  </div>
}


export default { 
  title: 'Input/Input', 
  component: TestInput, 
} 

const Template = args => <TestInput {...args} /> 

export const TestInput_String = Template.bind({}) 
TestInput_String.args = { 
  _type: 'string', 
  _value:'a string', 
  _defaultValue: '', 
  _onChange: (newValue:any) => console.log(newValue), 
  _onPressEnter: () => console.log('on Press Enter'), 
  //_width: , 
} 

export const TestInput_Number = Template.bind({}) 
TestInput_Number.args = { 
  _type: 'number', 
  _value: 12, 
  _defaultValue: 0, 
  _onChange: (newValue:any) => console.log(newValue), 
  _onPressEnter: () => console.log('on Press Enter'), 
  //_width: , 
} 

export const TestInput_Bool = Template.bind({}) 
TestInput_Bool.args = { 
  _type: 'boolean', 
  _value: false, 
  _defaultValue: false, 
  _onChange: (newValue:any) => console.log(newValue), 
  _onPressEnter: () => console.log('on Press Enter'), 
  //_width: , 
} 

export const TestInput_Date = Template.bind({}) 
TestInput_Date.args = { 
  _type: 'date', 
  _value: '2010-10-10', 
  _defaultValue: '2010-10-10', 
  _onChange: (newValue:any) => console.log(newValue), 
  _onPressEnter: () => console.log('on Press Enter'), 
  _width: (value:any) => 15, 
} 