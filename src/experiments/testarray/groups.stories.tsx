import React, {useState} from 'react'; 
import { Groups, Sorter } from './arrays.utils'; 


function TemplateArray({values, sorter}:{values:Item[], sorter:Sorter<Item>[]}) { 
  const results = Groups(values, sorter); 
  return <div> 
    <div>{JSON.stringify(values)}</div> 
    <div>---------</div> 
    {results.map( (r,i) => { 
      return <div key={i}>[{i}] {JSON.stringify(r)}</div> 
    })} 
  </div> 
} 


export default { 
  title: 'utils/groups', 
  component: TemplateArray
} 

const Template = args => <TemplateArray {...args} /> 

type Item = {id:string, num:number, str:string};   


export const GroupsById = Template.bind({}) 
GroupsById.args = { 
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
  sorter: [
    (x:Item, pivot:Item) => x.id === pivot.id, 
  ]
}
  
export const GroupsByNum = Template.bind({}) 
GroupsByNum.args = { 
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
  sorter: [
    (x:Item, pivot:Item) => x.num === pivot.num, 
  ]
}
  

export const GroupsByIdNum = Template.bind({}) 
GroupsByIdNum.args = { 
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
  sorter: [
    (x:Item, pivot:Item) => x.id === pivot.id, 
    (x:Item, pivot:Item) => x.num === pivot.num, 
  ]
}


export const GroupsByIdNumStr = Template.bind({}) 
GroupsByIdNumStr.args = { 
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
  sorter: [
    (x:Item, pivot:Item) => x.id === pivot.id, 
    (x:Item, pivot:Item) => x.num === pivot.num, 
    (x:Item, pivot:Item) => x.str === pivot.str, 
  ]
}
  