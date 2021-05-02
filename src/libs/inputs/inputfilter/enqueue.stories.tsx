import { useState } from 'react';
import { Story } from '@storybook/react'; 
import { InputFilter } from './_inputfilter'; 
import { IndexArray, Sorts, Filter, Predicate, Sorter } from '../../_arrayutils'; 
import { InputSorter } from '../inputsort/_inputsort'; 



function usePredicates<K, P>(): [ 
    [K, P][], 
    (key:K, newPredicate?:P) => void, 
    () => void, 
  ] { 
  const [predicates, setPredicates] = useState([] as [K, P][]); 
  
  function SetPredicates(key:K, newPredicate?:P) { 
    setPredicates( prev => { 
      const rest = prev.filter(kp => key != kp[0]); 
      return newPredicate ? 
        [...rest, [key, newPredicate]]: 
        [...rest]; 
    }) 
  } 

  function ResetPredicates() { 
    setPredicates([] as [K, P][]) 
  }; 

  return [predicates, SetPredicates, ResetPredicates]; 
}


function useSorters<T>(values:T[]) { 
  const [keySorters, SetSorters, ResetSorters] = usePredicates<string, Sorter<T>>(); 
  const sorters = keySorters.map( s => s[1] ); 
  const sortedValues = Sorts(values, sorters); 
  return {sortedValues, keySorters, SetSorters, ResetSorters} 
}

function useFilters<T>(values:T[]) { 
  const [keyFilters, SetFilters, ResetFilters] = usePredicates<string, Predicate<T>>(); 

  const filters = (t: T, i: number, a: T[], positive: T[], negative: T[]) => { 
    return keyFilters.map( f => f[1] ).every( f => f(t, i, a, positive, negative) ); 
  } 
  const [matchValues, unmatchValues] = Filter(values, filters); 
  return {matchValues, unmatchValues, SetFilters, ResetFilters} 
}




function TemplateResearch({values, filters}:{values:any[], filters:{handle:string, type:string}[]}) { 
  const {matchValues, SetFilters} = useFilters(values); 
  const {sortedValues, SetSorters} = useSorters(matchValues); 

  /*const lessThen5 = () => SetFilters('test', (x:any) => x < 5); 
  const moreThen5 = () => SetFilters('test', (x:any) => x > 5); 
  const all = () => SetFilters('test'); 

  const ascending = () => SetSorters('test', (x:any, pivot:any) => x < pivot); 
  const descending = () => SetSorters('test', (x:any, pivot:any) => x > pivot); 
  const unsort = () => SetSorters('test'); */

  return <div> 
    <div> 
      {sortedValues.map( (v,i) => { 
        return <span key={i}>{v}</span> 
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
  title: 'input/Euqueue', 
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
  