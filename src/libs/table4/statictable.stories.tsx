import { Story } from '@storybook/react'; 
import { Table } from './components/table.components'; 
import { THeads } from './components/thead.components'; 
import { Rows } from './components/rows.components'; 
import { Cols } from './components/cols.components'; 
import { THeadCell, Cell } from './components/cell.components'; 
import { IndexDatasByKey } from './utils/utils'; 


import { useFilter, useSorter } 
  from '../_inputs'; 
import { usePager, PagerBtn, PageOfPages } from '../pager/_pager'; 


export default { 
  title: 'Table/statictable4', 
  component: TemplateComponent, 
} 


function usePrepTable<T extends IEntry>(entries:T[]) { 
  const filters = useFilter(entries); 
  const sorters = useSorter(filters.matchValues); 
  const paging = usePager(sorters.sortedValues, 10); 
  const indexedDatas = IndexDatasByKey('_id', paging.page); 
  const rows = Object.keys(indexedDatas); 

  return {indexedDatas, rows, filters, sorters, paging}; 
} 


function MockInlineTable<T extends IEntry>({datas, cols}:{datas:T[], cols:string[]}) { 
  const {indexedDatas, rows, filters, sorters, paging} = usePrepTable(datas); 


  return <div>
    <Table {...{indexedDatas}}> 
      <thead><tr> 
        <THeads {...{cols}} ><THeadCell/></THeads> 
      </tr></thead> 
      <tbody> 
      <Rows {...{rows}}> 
        <Cols {...{cols}} > 
          <Cell/> 
        </Cols> 
      </Rows> 
      </tbody> 
    </Table> 
    <PagerBtn {...{paging}} /> 
  </div>
} 


function TemplateComponent({datas, cols, defaultItem}:{datas:Item[], cols:string[], defaultItem:Item}) { 
  return <div>
    {datas.map( d => { 
      return <div key={d._id}>{JSON.stringify(d)}</div> 
    })} 
    <MockInlineTable  {...{datas, cols}} /> 
  </div> 
} 

const Template:Story<{datas:Item[], cols:string[], defaultItem:Item}> = (args) => <TemplateComponent {...args} /> 

interface Item extends IEntry {
  _id: string;
  value: string; 
  value2: string; 
}
export const TestTabler = Template.bind({}) 
TestTabler.args = { 
  datas: [ 
    {_id:'1a', value:'asd', value2:'fgsf'}, 
    {_id:'2a', value:'asd', value2:'fgaf'}, 
    {_id:'3a', value:'asd', value2:'fgf'}, 
    {_id:'4a', value:'fg', value2:'fgdff'}, 
    {_id:'5a', value:'h', value2:'fgnf'}, 
    {_id:'6a', value:'asd', value2:'ggf'}, 
    {_id:'7a', value:'j', value2:'fgf'}, 
    {_id:'8a', value:'k', value2:'fhgf'}, 
    {_id:'9b', value:'asd', value2:'fhgf'}, 
    {_id:'10c', value:'ll', value2:'fgf'}, 
    {_id:'11c', value:'aa', value2:'fgf'}, 
    {_id:'c12', value:'asd', value2:'fhgf'}, 
    {_id:'13b', value:'gg', value2:'fgf'}, 
    {_id:'14g', value:'asd', value2:'fhgf'}, 
    {_id:'15f', value:'cc', value2:'fghf'}, 
    {_id:'16f', value:'asd', value2:'h'}, 
    {_id:'17g', value:'g', value2:'fgf'}, 
    {_id:'18h', value:'asd', value2:'fgf'}, 
    {_id:'19j', value:'g', value2:'fgf'}, 
  ] as Item[], 
  cols: ['_id','value', 'value2'], 
  defaultItem: {_id:'', value:'', value2:''}, 
} 
