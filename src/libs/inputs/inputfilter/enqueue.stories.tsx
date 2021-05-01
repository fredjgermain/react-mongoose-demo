import { useState } from 'react';
import { Story } from '@storybook/react'; 
import { InputFilter } from './_inputfilter'; 
import { IndexArray, Sorts, Filter, Predicate, Sorter } from '../../_arrayutils'; 



//type HandlePredicate = [string, Predicate<any>|Sorter<any>]; 
// let predicates = [] as HandlePredicate[]; 

//   const SetQueue = (handle:string, newPredicate?:Predicate<any>|Sorter<any>) => { 
//     const [found, rest] = Filter(predicates, hp => { 
//       const [_handle] = hp; 
//       return handle === _handle; 
//     }); 
//     //console.log(found, rest); 
//     if(newPredicate)
//       predicates = [...rest, [handle, newPredicate]]; 
//     else 
//     predicates = [...rest]; 
//   } 
//   console.log(predicates); 
//   SetQueue("handle1", (x:any) => true); 
//   console.log(predicates); 
//   SetQueue("handle2", (x:any) => true); 
//   console.log(predicates); 
//   SetQueue("handle1", (x:any) => true); 
//   console.log(predicates); 
//   SetQueue("handle1"); 
//   console.log(predicates); 


function useSorters<T>(values:T[]) { 
  type HandleSorter = [string, Sorter<T>]; 
  const [sorters, setSorters] = useState([] as HandleSorter[]); 

  const SetSorters = (handle:string, newSorter?:Sorter<any>) => { 
    setSorters( prev => { 
      const [found, rest] = Filter(prev, hp => handle === hp[0]); 
      return newSorter ? 
        [...rest, [handle, newSorter]]: 
        [...rest]; 
    }) 
  } 

  const sortedValues = Sorts(values, sorters.map( hp => hp[1])); 
  return {sortedValues, SetSorters}; 
} 


function useFilters<T>(values:T[]) { 
  type HandleFilter = [string, Predicate<T>]; 
  const [filters, setFilters] = useState([] as HandleFilter[]); 

  const SetFilters = (handle:string, newPredicate?:Predicate<any>) => { 
    setFilters( prev => { 
      const [found, rest] = Filter(prev, hp => handle === hp[0]); 
      return newPredicate ? 
         [...rest, [handle, newPredicate]]: 
         [...rest]; 
    }) 
  } 

  const AllFilters = (t: T, i: number, a: T[], positive: T[], negative: T[]) => { 
    return filters.map( f => f[1] ).every( f => f(t, i, a, positive, negative) ); 
  } 
  const [matchValues, unmatchValues] = Filter(values, AllFilters); 
  return {matchValues, unmatchValues, SetFilters}; 
} 



function TemplateResearch({values, filters}:{values:any[], filters:{handle:string, type:string}[]}) { 
  const {matchValues, SetFilters} = useFilters(values); 
  const lessThen5 = () => SetFilters('test', (x:any) => x < 5); 
  const moreThen5 = () => SetFilters('test', (x:any) => x > 5); 
  const all = () => SetFilters('test'); 

  const ascending = () => SetSorters('test', (x:any, pivot:any) => x < pivot); 
  const descending = () => SetSorters('test', (x:any, pivot:any) => x > pivot); 
  const unsort = () => SetSorters('test'); 

  const {sortedValues, SetSorters} = useSorters(matchValues); 

  return <div> 
    <div> 
      {sortedValues.map( (v,i) => { 
        return <span key={i}>{v}</span> 
      })} 
    </div> 
    <button onClick={all}>All</button> 
    <button onClick={moreThen5}>{'> 5'}</button> 
    <button onClick={lessThen5}>{'< 5'}</button> 

    <button onClick={ascending}>ascending</button> 
    <button onClick={descending}>descending</button> 
    <button onClick={unsort}>unsort</button> 
  </div> 
} 


export default { 
  title: 'input/Euqueue', 
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
  