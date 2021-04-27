import { Story } from '@storybook/react'; 
import { InputSorter, useSorter } from './_inputsort'; 
import { IndexArray } from '../../_arrayutils'; 


function TemplateResearch({values, filters}:{values:any[], filters:{handle:string, type:string}[]}) { 
  const indexedValues = IndexArray(values); 
  const {sortedValues, SetSorters} = useSorter(indexedValues); 

  const original = <div>Original : {values.map( (value, i) => { 
    return <div key={i}>{JSON.stringify(value)}</div> 
  })} <br/> </div>

  return <div> 
    {original} 
    <br/>Filters <br/> 
    {filters.map( ({handle, type}, i) => { 
      const keys = handle ? ['t', handle]: ['t']; 
      return <span key={i}> 
        {handle}: 
        <InputSorter {...{ type, keys, SetSorters }} /> 
      </span> 
    })} 
    <br/>Filtered <br/> 
    {sortedValues.map( value => { 
      return <div key={value.i}>{JSON.stringify(value.t)}</div> 
    })} 
  </div> 
} 

export default { 
  title: 'input/Sorter', 
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

export const SortNumbers = Template.bind({}) 
SortNumbers.args = { 
  values:[1,2,8,6,3,9,4], 
  filters:[{handle:'', type:'number'}] 
} 
  
export const MultipleFieldSorter = Template.bind({}) 
MultipleFieldSorter.args = { 
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
  