import React, { useState } from 'react'; 
import { Story } from '@storybook/react'; 
import { InlineTable } from './components/inlinetable.component'; 
import { InlineEntry } from './components/inlineentry.components'; 
import { InlineTableFeedback } from './components/inlinetablefeedback.component'; 
import { THeads } from './components/thead.components'; 
import { Rows, Row } from './components/rows.components'; 
import { Cols } from './components/cols.components'; 
import { THeadCell, THeadFilter, THeadSorter, Cell, InlineCell } from './components/cell.components'; 
import { IndexDatasByKey } from './utils/utils'; 
import { ColumnSelector, useColumnsSelector } from './components/columnselector.component'; 


import { useFilter, useSorter } 
  from '../_inputs'; 
import { usePager, PagerBtn, PageOfPages } from '../pager/_pager'; 


export default { 
  title: 'Table/inlinetable', 
  component: TemplateComponent, 
} 


function usePrepTable(entries:IEntry[]) { 
  const filters = useFilter(entries); 
  const sorters = useSorter(filters.matchValues); 
  const paging = usePager(sorters.sortedValues, 10); 
  const indexedDatas = IndexDatasByKey('_id', paging.page); 
  const rows = Object.keys(indexedDatas); 

  return {indexedDatas, rows, filters, sorters, paging}; 
} 


function CrudMethods(SetEntries:React.Dispatch<React.SetStateAction<IEntry[]>>) {
  async function Create(entry:IEntry) { 
    const response:ICrudResponse = {actionType:'create', data:entry, success:true, err:[]}; 
    SetEntries( prev => { 
      return [...prev, entry]; 
    }) 
    return response; 
  } 

  async function Update(entry:IEntry) { 
    const response:ICrudResponse = {actionType:'update', data:entry, success:true, err:[]}; 
    SetEntries( prev => { 
      const copy = [...prev]; 
      const index = copy.findIndex( e => e._id === entry._id ); 
      copy[index] = entry; 
      return copy; 
    }) 
    return response; 
  }

  async function Delete(entry:IEntry) { 
    const response:ICrudResponse = {actionType:'delete', data:entry, success:true, err:[]}; 
    SetEntries( prev => { 
      const copy = [...prev]; 
      const index = copy.findIndex( e => e._id === entry._id ); 
      copy.splice(index, 1); 
      return copy; 
    }) 
    console.log(response); 
    return response; 
  } 
  return {Create, Update, Delete}; 
}

function MockInlineTable({datas, defaultEntry, cols:_Cols}:{datas:IEntry[], defaultEntry:IEntry, cols:string[]}) { 
  const [entries, SetEntries] = useState(datas); 
  const {indexedDatas, rows, filters, sorters, paging} = usePrepTable(entries); 
  const {Create, Update, Delete} = CrudMethods(SetEntries); 
  const Columns = useColumnsSelector(_Cols); 
  const cols = Columns.columns; 

  return <div>
    <ColumnSelector {...{...Columns, _columns:_Cols}} /> 
    <InlineTable {...{indexedDatas, defaultEntry, Create, Delete, Update}}>
      <InlineTableFeedback/>
      <table> 
      <thead> 
        <tr><THeads {...{cols}} > 
          <THeadCell/> 
          <THeadSorter {...{sorters}} /> 
          <br/> 
          <THeadFilter {...{filters}} /> 
        </THeads><th>Btn</th></tr> 
      </thead> 

      <tbody> 
      <Rows {...{rows}}> 
        <InlineEntry> 
          <Cols {...{cols}} > 
            <InlineCell/> 
          </Cols> 
        </InlineEntry> 
      </Rows> 
      <Row {...{row:'create'}}> 
        <InlineEntry> 
          <Cols {...{cols}} > 
            <InlineCell/> 
          </Cols> 
        </InlineEntry> 
      </Row>
      </tbody> 

    </table></InlineTable> 
    <PagerBtn {...{paging}} /> 
  </div>
} 


function TemplateComponent({datas, cols, defaultEntry}:{datas:Item[], cols:string[], defaultEntry:Item}) { 
  return <div> 
    <MockInlineTable  {...{datas, defaultEntry, cols}} /> 
  </div> 
} 

const Template:Story<{datas:Item[], cols:string[], defaultEntry:Item}> = (args) => <TemplateComponent {...args} /> 

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
  defaultEntry: {_id:'', value:'', value2:''}, 
} 
