import React, {useState} from 'react'; 
import {Search} from './search.component'; 



function TemplateResearch({selection}:{selection:any[]}) { 
  const [_selection, setSelection] = useState(selection); 
  return <div> 
    {JSON.stringify(selection)} <br/> 
    {JSON.stringify(_selection)} <br/> 
    <Search {...{selection, setSelection, field:'v'}} /> 
  </div> 
} 



export default { 
  title: 'research/Research', 
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

export const ResearchString = Template.bind({}) 
ResearchString.args = { 
    selection:[
      {a:'a', v:1}, 
      {a:'b', v:2}, 
      {a:'c', v:3}, 
      {a:'d', v:4}, 
      {a:'e', v:2}, 
      {a:'f', v:3}, 
    ]
}
  