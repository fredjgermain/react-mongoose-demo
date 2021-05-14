import React, {useState} from 'react'; 
import { Story } from '@storybook/react'; 
import { InputFilter, useFilter, Input } from '../../_inputs'; 
import { InputSelect, Selection, Options, DisplaySelection, OptionGroup } from './inputselect.component'; 
import { IInputSelect } from './inputselect.type'; 

function TestInputSelect({...props}:IInputSelect) { 
  const [value, setValue] = useState(props.value); 
  const onSetValue = (newValue:any[]) => setValue(newValue); 
  const {matchValues:options, SetFilters} = useFilter(props.options); 

  return <div> 
    <Input {...{value:'', type:'string', onSetValue:()=>{}}}/> 
    {JSON.stringify(options)} <br/> 
    <InputSelect {...{value, onSetValue, options}}> 
      <Selection> 
        <DisplaySelection/> <br/> 
        <InputFilter {...{keys:['label'], SetFilters, type:'string'}} /> 
      </Selection> 
      <Options> 
        <OptionGroup/> 
      </Options> 
    </InputSelect> 
  </div> 
} 

export default { 
  title: 'Input/InputSelect2', 
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
    {value:11, label:'option 11'}, 
    {value:12, label:'option 12'}, 
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