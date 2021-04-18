import React, {useState} from 'react'; 
import { InputFilters, InputFilter, useFilters } from './inputfilter.component'; 



function TemplateResearch({values, filters}:{values:any[], filters:{handle:string, type:string}[]}) { 
  
  return <InputFilters {...{values}} > 
    {filters.map( f => { 
      return <InputFilter key={f.handle} {...f} /> 
    })}
  </InputFilters> 
} 


const str = "ajjaaj"; 
console.log( str.match('aa')); 



export default { 
  title: 'editor/Filter', 
  component: TemplateResearch 
} 

const Template = args => <TemplateResearch {...args} /> 



// Editor One Value ===========================================
/*const predicates:Predicate<number>[] = [ 
  (t:number) => t % 2 === 0, 
  (t:number) => t < 10, 
]
export const TestFilters = Template.bind({}) 
TestFilters.args = { 
  values:[1,2,3,5,4,6,9,7,8,10,45,12,14], 
  predicates: predicates, 
}*/

export const ArrayNumber = Template.bind({}) 
ArrayNumber.args = { 
  values:[1,2,3,4,6,8,9], 
  filters:[{handle:'', type:'number'}] 
} 
  
export const ResearchString = Template.bind({}) 
ResearchString.args = { 
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
  