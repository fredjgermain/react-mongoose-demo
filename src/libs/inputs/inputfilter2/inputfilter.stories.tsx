import { Story } from '@storybook/react'; 
import { useFilter } from './inputfilter.hook'; 
import {} from './inputfilter.utils'; 


function TemplateResearch({values, filters}:{values:any[], filters:{handle:string, type:string}[]}) { 
  return <div></div>
} 


export default { 
  title: 'input/FilterSorter3', 
  component: TemplateResearch 
} 

const Template:Story<any> = args => <TemplateResearch {...args} /> 



export const LambdaFilter = Template.bind({}) 
LambdaFilter.args = { 
  values:[3,4,1,2,6,8,9], 
  filters:[{handle:'', type:'number'}] 
} 


export const DayFilter = Template.bind({}) 
DayFilter.args = { 
  values:['2021-05-10', '2021-05-11', '2021-05-12', '2021-05-13'], 
  filters:[{handle:'', type:'date'}] 
} 
  
export const MultipleFieldFilter = Template.bind({}) 
MultipleFieldFilter.args = { 
  values:[ 
    {a:'aa', v:1, bool:false}, 
    {a:'aa', v:2, bool:true}, 
    {a:'b', v:3, bool:false}, 
    {a:'bb', v:4, bool:true}, 
    {a:'ee', v:2, bool:false}, 
    {a:'bbb', v:3, bool:false}, 
  ], 
  filters:[ 
    {handle:'a', type:'string'}, 
    {handle:'v', type:'number'}, 
    {handle:'bool', type:'boolean'}, 
  ] 
}
