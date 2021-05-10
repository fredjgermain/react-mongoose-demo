import React, { useContext } from 'react'; 
import { Story } from '@storybook/react'; 

import { Cell,
  Cols, ColContext, Rows, RowContext, 
  THeads, THeadCell, THeadContext, IndexDatasByKey 
 } from '../_table'; 


import { useFilter, useSorter } from '../../_inputs'; 
import { usePager, PagerBtn, PageOfPages } from '../../pager/_pager'; 


export default { 
  title: 'Table/statictable', 
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




function MockInlineTable({datas, cols}:{datas:IEntry[], cols:string[]}) { 
  const {indexedDatas, rows, filters, sorters, paging} = usePrepTable(datas); 

  const GetCellArgs = () => { 
    const {row} = useContext(RowContext); 
    const {col} = useContext(ColContext); 
    const entry = indexedDatas[row]; 

    const value = entry ? entry[col]: ''; 
    const editValue = (newValue:any) => {return;}

    const ifield:IField = {accessor:col, defaultValue:'', label:'', type:'string'} 
    const options = [] as IOption[]; 
    return {value, editValue, ifield, options} 
  }

  const GetHeadArgs = () => { 
    const {col} = useContext(THeadContext); 
    const ifield:IField = {accessor:col, defaultValue:'', label:col, type:'string'} 
    return {ifield}; 
  }


  return <div> 
    <table> 
      <thead><tr> 
        <THeads {...{cols}} ><THeadCell {...{GetHeadArgs}}/></THeads> 
      </tr></thead> 
      <tbody> 
      <Rows {...{rows}}> 
        <Cols {...{cols}} > 
          <Cell {...{GetCellArgs}} /> 
        </Cols> 
      </Rows> 
      </tbody> 
    </table> 
    <PagerBtn {...{paging}} /> 
  </div> 
} 


function TemplateComponent({datas, cols, defaultItem}:{datas:Item[], cols:string[], defaultItem:Item}) { 
  return <div> 
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