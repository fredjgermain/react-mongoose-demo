import { Story } from '@storybook/react'; 
import { InputFilter, useFilter } from './_inputfilter'; 
import { InputSorter, useSorter } from '../inputsort/_inputsort'; 


function TemplateResearch({values, filters}:{values:any[], filters:{handle:string, type:string}[]}) { 
  const {matchValues, SetFilters} = useFilter(values); 
  const {sortedValues, SetSorters} = useSorter(matchValues); 

  return <div> 
    <div> 
      {sortedValues.map( (v,i) => { 
        return <div key={i}>{JSON.stringify(v)}</div> 
      })} 
    </div> 
    <div> 
      {filters.map( (f,i) => { 
        return <span key={i}> 
          <InputFilter {...{ type:f.type, keys:[f.handle], SetFilters }} /> 
          <InputSorter {...{ type:f.type, keys:[f.handle], SetSorters }} /> 
        </span>
      })} 
    </div> 
  </div> 
} 


export default { 
  title: 'input/FilterSorter', 
  component: TemplateResearch 
} 

const Template:Story<any> = args => <TemplateResearch {...args} /> 



export const LambdaFilter = Template.bind({}) 
LambdaFilter.args = { 
  values:[3,4,1,2,6,8,9], 
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
