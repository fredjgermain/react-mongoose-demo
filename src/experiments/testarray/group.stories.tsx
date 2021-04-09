import React, {useState} from 'react'; 
import { Group, Sorts, Sorter } from './arrays.utils'; 


function TemplateArray({values, sorter}:{values:Item[], sorter:Sorter<Item>}) { 

  const sorters: Sorter<Item>[] = [ 
    (x:Item, pivot:Item) => x.num === pivot.num, 
    (x:Item, pivot:Item) => x.id === pivot.id, 
  ] 

  const sorted = Sorts( values, sorters ); 
  const results = Group( sorted, (x:Item, pivot:Item) => sorters.every( s => s(x, pivot) ) ); 
  return <div> 
    <div>{JSON.stringify(values)}</div> 
    <div>---------</div> 
    {results.map( (r,i) => { 
      return <div key={i}>[{i}] {JSON.stringify(r)}</div> 
    })} 
  </div> 
} 


export default { 
  title: 'utils/group', 
  component: TemplateArray
} 

const Template = args => <TemplateArray {...args} /> 

type Item = {id:string, num:number, str:string}; 

export const TestGroups = Template.bind({}) 
TestGroups.args = { 
  values: [ 
    {id:'a', num:3, str: 'l'}, 
    {id:'a', num:1, str: 'b'}, 
    {id:'a', num:2, str: 'f'}, 
    {id:'c', num:1, str: 'g'}, 
    {id:'b', num:1, str: 'g'}, 
    {id:'a', num:3, str: 'l'}, 
    {id:'c', num:2, str: 'f'}, 
    {id:'b', num:4, str: 'g'}, 
    {id:'a', num:3, str: 'l'}, 
    {id:'c', num:1, str: 'd'}, 
  ], 
  sorter: (x:Item, pivot:Item) => x.id === pivot.id && x.num === pivot.num
} 
