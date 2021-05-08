import React, { useState, useContext } from 'react'; 
import { Story } from '@storybook/react'; 
import { InlineTable } from './components/inlinetable.component'; 
import { InlineEntry, InlineEntryContext } from './components/inlineentry.components'; 
import { InlineTableFeedback } from './components/inlinetablefeedback.component'; 
import { THeads } from './components/thead.components'; 
import { Rows, Row } from './components/rows.components'; 
import { ColContext, Cols } from './components/cols.components'; 
import { THeadCell, THeadFilter, THeadSorter, Cell, InlineCell } from './components/cell.components'; 
import { IndexDatasByKey } from './utils/utils'; 
import { ColumnSelector, useColumnsSelector } from './components/columnselector.component'; 
import { Reader, Editor } from '../editor_reader/_editor_reader';

import { useFilter, useSorter } 
  from '../_inputs'; 
import { usePager, PagerBtn, PageOfPages } from '../pager/_pager'; 

import { crud } from '../dao/stories/mockcrud'; 
import { DaoContext, DaoContexter, ICrud } from '../_dao'; 


export default { 
  title: 'Table/daotable', 
  component: TemplateComponent, 
} 


function usePrepTable() { 
  const dao = useContext(DaoContext); 
  const {collection} = useContext(CollectionContext); 
  const entries = dao.GetIEntries(collection); 
  const cols = dao.GetIFields(collection).filter(f => f.label).map(f => f.accessor); 
  const defaultEntry = dao.GetDefaultIEntry(collection); 

  const filters = useFilter(entries); 
  const sorters = useSorter(filters.matchValues); 
  const paging = usePager(sorters.sortedValues, 10); 
  const indexedDatas = IndexDatasByKey('_id', paging.page); 
  const rows = Object.keys(indexedDatas); 

  return {indexedDatas, defaultEntry, rows, cols, filters, sorters, paging}; 
} 

function CrudMethods() { 
  const dao = useContext(DaoContext); 
  const {collection} = useContext(CollectionContext); 

  async function Create(entry:IEntry) { 
    const [response] = await dao.Create(collection, [entry]); 
    return response; 
  } 

  async function Update(entry:IEntry) { 
    const [response] = await dao.Update(collection, [entry]); 
    return response; 
  } 

  async function Delete(entry:IEntry) { 
    const [response] = await dao.Delete(collection, [entry]); 
    return response; 
  } 

  return {Create, Update, Delete}; 
}


type IGetCellArgs = () => { 
  value: any; 
  editValue: (newValue: any) => void; 
  ifield: IField; 
  options: IOption[]; 
} 

function GetCellArgs() { 
  const dao = useContext(DaoContext); 
  const {col} = useContext(ColContext); 
  const {collection} = useContext(CollectionContext); 
  const {entry, SetEntry} = useContext(InlineEntryContext); 

  const value = entry[col]; 
  const editValue = (newValue:any) => { 
    const copy = {...entry}; 
    copy[col] = newValue; 
    SetEntry(copy); 
  } 
  const [ifield] = dao.GetIFields(collection, [col]); 
  const options = dao.GetIOptions(ifield); 

  return {value, editValue, ifield, options} 
} 

function DaoCell({...props}:{GetCellArgs:IGetCellArgs}) { 
  const {value, editValue, ifield, options} = props.GetCellArgs(); 
  const {isEditing, isSelected} = useContext(InlineEntryContext); 

  return <span>
    {isEditing && isSelected ? 
      <Editor {...{value, editValue, ifield, options}} />: 
      <Reader {...{value, ifield, options}} /> 
    } 
  </span> 
} 


const CollectionContext = React.createContext({} as {collection:string}); 
function DaoInlineTable() { 
  const {indexedDatas, defaultEntry, rows, cols:_cols, filters, sorters, paging} = usePrepTable(); 
  const {Create, Update, Delete} = CrudMethods(); 
  const Columns = useColumnsSelector(_cols); 
  const cols = Columns.columns; 

  return <div>
    <ColumnSelector {...{...Columns, _columns:_cols}} /> 
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
            <DaoCell {...{GetCellArgs}} /> 
          </Cols> 
        </InlineEntry> 
      </Rows> 
      <Row {...{row:'create'}}> 
        <InlineEntry> 
          <Cols {...{cols}} > 
            <DaoCell {...{GetCellArgs}} /> 
          </Cols> 
        </InlineEntry> 
      </Row>
      </tbody> 

    </table></InlineTable> 
    <PagerBtn {...{paging}} /> 
  </div> 
} 

function TemplateComponent() { 
  const accessors = ['questions', 'patients', 'responses', 'answers', 'forms', 'instructions']; 
  const collection = 'questions'; 
  return <DaoContexter {...{crud:crud as ICrud, accessors}}> 
    <CollectionContext.Provider value={{collection}} > 
      <DaoInlineTable/> 
    </CollectionContext.Provider> 
  </DaoContexter> 
    
} 

const Template:Story<{}> = (args) => <TemplateComponent {...args} /> 

export const TestTabler = Template.bind({}) 
TestTabler.args = {}