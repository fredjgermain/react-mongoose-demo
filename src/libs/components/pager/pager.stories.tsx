import { Story } from '@storybook/react'; 
import { PageOfPages, PagerBtn, PagerFromTo } from './pager.component'; 
import { usePage } from '../../_customhooks'; 

import { Sorts, Sorter, Predicate } from '../../_arrayutils';


interface ITemplate {items:Item[], sorter:Sorter<Item>[], grouping:Predicate<Item>} 
function TemplateComponent({items, sorter, grouping}:ITemplate) { 
  const sorted = Sorts(items, sorter); 
  const paging = usePage(sorted, grouping); 

  return <div> 
    <div> 
      {sorted.map( (e,i) => { 
        return <div>[{i}] {JSON.stringify(e)}</div> 
      })} 
    </div> 
    <br/> 
    <div> 
      {paging.page.map( e => { 
        return <div>[{e.i}] {JSON.stringify(e.t)}</div> 
      })} 
    </div> 
    <PagerFromTo {...{paging}} /> 
    <PageOfPages {...{paging}} /> 
    <PagerBtn {...{paging}} /> 
  </div>
} 

export default { 
  title: 'Pager/Pager', 
  component: TemplateComponent, 
} 

const Template:Story<ITemplate> = args => <TemplateComponent {...args} /> 

type Item = {id:string, num:number, str:string}; 

export const GroupById = Template.bind({}) 
GroupById.args = { 
  items: [ 
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
  sorter: [
    (x:Item, pivot:Item) => x.id < pivot.id, 
  ],   
  grouping: (x:Item, i:number, a:Item[]) => {
    const [pivot] = a; 
    return x.id === pivot?.id; 
  }, 
} 



export const GroupByIdNum = Template.bind({}) 
GroupByIdNum.args = { 
  items: [ 
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
  sorter: [
    (x:Item, pivot:Item) => x.id < pivot.id, 
    (x:Item, pivot:Item) => x.num < pivot.num, 
  ], 
  grouping: (x:Item, i:number, a:Item[]) => { 
    const [pivot] = a; 
    return x.id === pivot?.id && x.num === pivot.num; 
  }, 
} 


export const GroupBy3 = Template.bind({}) 
GroupBy3.args = { 
  items: [ 
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
  sorter: [
    (x:Item, pivot:Item) => x.id < pivot?.id, 
    (x:Item, pivot:Item) => x.num < pivot?.num, 
  ], 
  grouping: (x:Item, i:number, a:Item[], positive:Item[] ) => { 
    const [pivot] = a; 
    return x.id === pivot.id && positive.length < 3; 
  }, 
} 


