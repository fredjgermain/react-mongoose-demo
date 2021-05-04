import React, { useContext, useState } from 'react'; 
import { Story } from '@storybook/react'; 
import { useStateReset } from '../_customhooks'; 
import { usePager, PagerBtn, PageOfPages } from '../pager/_pager'; 

import { InputFilter, InputSorter, useFilter, useSorter, IUseFilter, IUseSorter } 
  from '../_inputs'; 
import { Table, THeads, THead, Rows, Row, Cols, Col, 
  TableContext, THeadContext, RowContext, ColContext } 
    from './components/table.component'; 

    
function HeadCell() { 
  const {SetSorters, SetFilters} = useContext(DatasContext); 
  const {col} = useContext(THeadContext); 
  return <span>{col} 
    <InputFilter {...{keys:[col], type:'string', SetFilters}} /> 
    <InputSorter {...{keys:[col], type:'string', SetSorters}} /> 
  </span> 
} 

function Cell() { 
  const {datas} = useContext(TableContext); 
  const {row} = useContext(RowContext); 
  const {col} = useContext(ColContext); 
  const value = datas[row] ? datas[row][col]: ''; 
  const {isSelected} = useContext(InlineRowContext); 
  
  if(isSelected) 
    return <span>!{value}!</span> 
  return <span>{row}/{col}:{value}</span> 
} 

const InlineRowContext = React.createContext({} as {isSelected:boolean}); 
function InlineRow({children}:React.PropsWithChildren<any>) { 
  const {inlineState} = useContext(DatasContext); 
  const {datas} = useContext(TableContext); 
  const {row} = useContext(RowContext); 
  const key = datas[row] ? datas[row]['_id']: ''; 

  const isSelected = inlineState.row === row; 
  return <InlineRowContext.Provider key={key} value={{isSelected}} > 
    {children} 
  </InlineRowContext.Provider> 
}

function InlineBtn() { 
  const {inlineState, SetInlineState, ResetInlineState} = useContext(DatasContext); 
  const {row} = useContext(RowContext); 
  const isSelected = inlineState.row === row; 

  const Select = () => SetInlineState({row, mode:'edit'}); 
  const Reset = () => ResetInlineState(); 

  return <span> 
    {!isSelected ? 
      <button onClick={Select}>Select</button>: 
      <button onClick={Reset}>Select!</button>} 
    </span> 
} 



type InlineState = {row?:number, mode:string}; 
interface IUseInlineState { 
  inlineState: InlineState; 
  SetInlineState: (newValue: InlineState) => void; 
  ResetInlineState: () => void; 
} 

type IData = IUseFilter<any> & IUseSorter<any> & IUseInlineState; 

const DatasContext = React.createContext({} as IData); 
function TemplateComponent({datas, cols}:{datas:any[], cols:string[]}) { 
  const filters = useFilter(datas); 
  const sorters = useSorter(filters.matchValues); 
  const paging = usePager(sorters.sortedValues, 10); 
  const rows = paging.page.map((e,i) => i); 

  const initInlineState = {row:undefined,mode:'read'} as InlineState; 
  const [inlineState, SetInlineState, ResetInlineState] = useStateReset(initInlineState); 
  const useInlineState = {inlineState, SetInlineState, ResetInlineState}; 


  const context = {...filters, ...sorters, ...useInlineState}; 
  return <DatasContext.Provider value={context} > 
    <Table {...{unicKey:'test', datas:paging.page, cols}} > 
      <thead><tr> 
        <THeads {...{cols}}><HeadCell/></THeads> 
        <th>btn</th> 
      </tr></thead> 

      <tbody> 
        <Rows {...{rows}}> 
          <InlineRow> 
            <Cols {...{cols}}><Cell/></Cols> 
            <td><InlineBtn/></td> 
          </InlineRow>
        </Rows> 
      </tbody> 

    </Table> 
    <PagerBtn {...{paging}} /> 
  </DatasContext.Provider>
} 


export default { 
  title: 'Table/Table2', 
  component: TemplateComponent, 
} 

const Template:Story<{datas:Item[], cols:string[]}> = (args) => <TemplateComponent {...args} /> 

interface Item {
  _id: number;
  value: string; 
  value2: string; 
}
export const TestTabler = Template.bind({}) 
TestTabler.args = { 
  datas: [ 
    {_id:1, value:'asd', value2:'fgsf'}, 
    {_id:2, value:'asd', value2:'fgaf'}, 
    {_id:3, value:'asd', value2:'fgf'}, 
    {_id:4, value:'fg', value2:'fgdff'}, 
    {_id:5, value:'h', value2:'fgnf'}, 
    {_id:6, value:'asd', value2:'ggf'}, 
    {_id:7, value:'j', value2:'fgf'}, 
    {_id:8, value:'k', value2:'fhgf'}, 
    {_id:9, value:'asd', value2:'fhgf'}, 
    {_id:10, value:'ll', value2:'fgf'}, 
    {_id:11, value:'aa', value2:'fgf'}, 
    {_id:12, value:'asd', value2:'fhgf'}, 
    {_id:13, value:'gg', value2:'fgf'}, 
    {_id:14, value:'asd', value2:'fhgf'}, 
    {_id:15, value:'cc', value2:'fghf'}, 
    {_id:16, value:'asd', value2:'h'}, 
    {_id:17, value:'g', value2:'fgf'}, 
    {_id:18, value:'asd', value2:'fgf'}, 
    {_id:19, value:'g', value2:'fgf'}, 
  ] as Item[], 
  cols: ['value', 'value2']
} 
