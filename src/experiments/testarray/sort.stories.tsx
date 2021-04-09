import React, {useState} from 'react'; 
import { Group, Groups, Sorts, Sort, Sorter } from './arrays.utils'; 


function TemplateArray({values, sorters}:{values:Item[], sorters:Sorter<Item>[]}) { 

  const results = Sorts(values, sorters); 
  return <div> 
    <div>{JSON.stringify(values)}</div> 
    <div>---------</div> 
    {results.map( (r,i) => { 
      return <div key={i}>[{i}] {JSON.stringify(r)}</div> 
    })} 
  </div> 
} 


export default { 
  title: 'utils/sort', 
  component: TemplateArray 
} 

const Template = args => <TemplateArray {...args} /> 

type Item = {id:string, num:number, str:string}; 


export const TestSortsToGroup = Template.bind({}) 
TestSortsToGroup.args = { 
  values: [ 
    {id:'a', num:3, str: 'l'}, 
    {id:'a', num:1, str: 'b'}, 
    {id:'a', num:2, str: 'f'}, 
    {id:'c', num:1, str: 'g'}, 
    {id:'b', num:1, str: 'g'}, 
    {id:'a', num:3, str: 'v'}, 
    {id:'c', num:2, str: 'f'}, 
    {id:'b', num:4, str: 'g'}, 
    {id:'a', num:3, str: 'z'}, 
    {id:'c', num:1, str: 'd'}, 
  ], 
  sorters: [ 
    (x:Item, pivot:Item) => x.num === pivot.num, 
    (x:Item, pivot:Item) => x.id === pivot.id, 
  ]
} 

export const TestSortsByMany = Template.bind({}) 
TestSortsByMany.args = { 
  values: [ 
    {id:'a', num:3, str: 'l'}, 
    {id:'a', num:1, str: 'b'}, 
    {id:'a', num:2, str: 'f'}, 
    {id:'c', num:1, str: 'g'}, 
    {id:'b', num:1, str: 'g'}, 
    {id:'a', num:3, str: 'v'}, 
    {id:'c', num:2, str: 'f'}, 
    {id:'b', num:4, str: 'g'}, 
    {id:'a', num:3, str: 'z'}, 
    {id:'c', num:1, str: 'd'}, 
  ], 
  sorters: [ 
    (x:Item, pivot:Item) => x.str < pivot.str, 
    (x:Item, pivot:Item) => x.num < pivot.num, 
    (x:Item, pivot:Item) => x.id < pivot.id, 
  ]
} 


