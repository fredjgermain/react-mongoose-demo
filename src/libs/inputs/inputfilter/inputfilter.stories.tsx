import { Story } from '@storybook/react'; 
import { InputFilter, useFilter } from './_inputfilter'; 


function TemplateResearch({values, filters}:{values:any[], filters:{handle:string, type:string}[]}) { 
  const {filteredValues, SetFilters} = useFilter(values); 
  return <div> 
    Original <br/> 
    {values.map( (value,i) => { 
      return <div key={i}>{JSON.stringify(value)}</div> 
    })} 
    <br/>Filters <br/> 
    {filters.map( ({handle, type}, i) => { 
      return <span>
        {handle}: 
        <InputFilter key={i} {...{ type, handle, SetFilters }} /> 
      </span>
    })} 
    <br/>Filtered <br/> 
    {filteredValues.map( (value,i) => { 
      return <div key={i}>{JSON.stringify(value)}</div> 
    })} 
  </div> 
} 



const str = "ajjaaj"; 
console.log( str.match('aa')); 



export default { 
  title: 'input/Filter2', 
  component: TemplateResearch 
} 

const Template:Story<any> = args => <TemplateResearch {...args} /> 



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

export const LambdaFilter = Template.bind({}) 
LambdaFilter.args = { 
  values:[1,2,3,4,6,8,9], 
  filters:[{handle:'', type:'number'}] 
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
  