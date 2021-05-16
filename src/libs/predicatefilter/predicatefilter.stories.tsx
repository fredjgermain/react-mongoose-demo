import React, {useState} from 'react'; 
import { Story } from '@storybook/react'; 


function TestPredicateFilter() { 
  return <div></div>
} 

export default { 
  title: 'Filter/Predicate', 
  component: TestPredicateFilter, 
} 

const Template:Story<any> = args => <TestPredicateFilter {...args} /> 

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
    {value:'11', label:'option 11'}, 
    {value:'12', label:'option 12'}, 
  ] as IOption[], 
  multiple: true, 
} 
