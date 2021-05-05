import React, { useContext, useState } from 'react'; 
import { Story } from '@storybook/react'; 
import { usePager, PagerBtn, PageOfPages } from '../pager/_pager'; 
import { IsNull, IsEmpty } from '../_utils'; 

import { InputFilter, InputSorter, useFilter, useSorter, IUseFilter, IUseSorter } 
  from '../_inputs'; 
import { Reader, Editor } from '../editor_reader/_editor_reader'; 

import { crud } from '../dao/stories/mockcrud'; 
import { DaoContext, DaoContexter, ICrud } from '../_dao'; 

import { InlineTableContext, TableContext, 
  THeadContext, RowContext, ColContext, 
  Rows, Row, Cols, THeads, 
  useInlineEntry, useInlineTable, 
  InlineCreateBtn, InlineUpdateDeleteBtn, 
    } from './_table';


function GetDaoCell() { 
  const dao = useContext(DaoContext); 
  const {collection, datas} = useContext(InlineTableContext); 
  const {row} = useContext(RowContext); 
  const {col} = useContext(ColContext); 
  console.log(col); 
  const [ifield] = dao.GetIFields(collection, [col]); 
  const options = dao.GetIOptions(ifield); 
  const defaultValue = ifield.defaultValue; 
  const value = !IsNull(datas[row]) ? datas[row][col]: defaultValue; 
  return {row, col, value, ifield, options}; 
} 

function HeadCell<T>({sorterFilter}:{sorterFilter:IUseSorter<T> & IUseFilter<T>}) { 
  const {SetFilters, SetSorters} = sorterFilter; 
  const {col} = useContext(THeadContext); 
  return <span>{col} 
    <InputFilter {...{keys:[col], type:'string', SetFilters}} /> 
    <InputSorter {...{keys:[col], type:'string', SetSorters}} /> 
  </span> 
} 

function Cell() { 
  const {value, ifield, options} = GetDaoCell(); 
  return <Reader {...{value, ifield, options}} /> 
} 

const InlineRowContext = React.createContext({} as {isSelected:boolean}); 
function InlineRow({children}:React.PropsWithChildren<any>) { 
  const {datas, inlineState} = useContext(InlineTableContext); 
  const {row} = useContext(RowContext); 
  const id = datas[row] ? datas[row]['_id']: ''; 

  const isSelected = inlineState.row === row; 
  return <InlineRowContext.Provider key={id} value={{isSelected}} > 
    {children} 
  </InlineRowContext.Provider> 
} 


function InlineBtn() { 
  const {row} = useContext(RowContext); 
  return <td>{row === -1 ? <InlineCreateBtn />: <InlineUpdateDeleteBtn/>}</td>
}

/*
function InlineBtn() { 
  const {inlineState, SetInlineState, ResetInlineState} = useContext(InlineTableContext); 
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
*/

function TableTest({collection}:{collection:string}) { 
  const dao = useContext(DaoContext); 
  const datas = dao.GetIEntries(collection); 
  const filters = useFilter(datas); 
  const sorters = useSorter(filters.matchValues); 
  const paging = usePager(sorters.sortedValues, 10); 

  const inlineTable = useInlineTable(datas, collection); 
  const {rows, cols} = inlineTable; 

  const key = collection + paging.pageIndex; 

  return <InlineTableContext.Provider key={key} value={inlineTable} > 
      <table>
      <thead><tr> 
        <THeads {...{cols}}><HeadCell {...{sorterFilter:{...filters, ...sorters}}} /></THeads> 
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
    </table> 
    <PagerBtn {...{paging}} /> 
  </InlineTableContext.Provider>
} 

/*
  <Row {...{row:-1}}> 
    <InlineRow> 
      <Cols {...{cols}}><Cell/></Cols> 
      <td><InlineBtn/></td> 
    </InlineRow> 
  </Row>
*/ 


export default { 
  title: 'Table/table2', 
  component: TemplateComponent, 
} 


function TemplateComponent() { 
  const accessors = ['questions', 'patients', 'responses', 'answers', 'forms', 'instructions']; 
  const collection = 'questions'; 
  return <DaoContexter {...{crud:crud as ICrud, accessors}}> 
    <TableTest {...{collection}} /> 
  </DaoContexter> 
} 

const Template:Story<{}> = (args) => <TemplateComponent {...args} /> 

export const TestTabler = Template.bind({}) 
TestTabler.args = {} 