import React, {useState} from 'react'; 
import { InputFilter, FilterBy, useFilters } from './search.component'; 



function TemplateResearch({...props}:{values:any[]}) { 
  const _values = [1,2,3,4,5,6,7,8,9]; 
  const {filteredValues, setPredicates} = useFilters(_values); 

  const even = {handle:'a', predicate: (x:any) => x % 2 ===0} 
  const odd = {handle:'a', predicate: (x:any) => x % 2 ===1} 
  const greaterthan5 = {handle:'b', predicate: (x:any) => x > 5} 
  const lessthan5 = {handle:'b', predicate: (x:any) => x <= 5} 

  return <div> 
    {JSON.stringify(filteredValues)} 
    <br/> 
    <button onClick={()=>setPredicates()}>All</button> 
    <button onClick={()=>setPredicates(even)}>evens</button> 
    <button onClick={()=>setPredicates(odd)}>odds</button> 
    <button onClick={()=>setPredicates(greaterthan5)}>{'> 5'}</button> 
    <button onClick={()=>setPredicates(lessthan5)}>{'<= 5'}</button> 
  </div> 
} 



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
} 
  
export const ResearchString = Template.bind({}) 
ResearchString.args = { 
  values:[ 
    {a:'a', v:1}, 
    {a:'b', v:2}, 
    {a:'c', v:3}, 
    {a:'d', v:4}, 
    {a:'e', v:2}, 
    {a:'f', v:3}, 
  ]
}
  