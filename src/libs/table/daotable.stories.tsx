import React, { useContext } from 'react'; 
import { Story } from '@storybook/react'; 

import { InlineTableContext, useInlineTable, InlineEntry, InlineEntryContext,
  InlineCell,
  Cols, ColContext, Rows, Row, 
  THeads, THeadCell, THeadFilter, THeadSorter, THeadContext, 
  InlineTableFeedback, 
  ColumnSelector, useColumnsSelector, IndexDatasByKey
 } from './_table'; 


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

function GetHeadArgs() {
  const dao = useContext(DaoContext); 
  const {col} = useContext(THeadContext); 
  const {collection} = useContext(CollectionContext); 
  const [ifield] = dao.GetIFields(collection, [col]); 
  return {ifield}; 
}



const CollectionContext = React.createContext({} as {collection:string}); 
function DaoInlineTable() { 
  const {indexedDatas, defaultEntry, rows, cols:_cols, filters, sorters, paging} = usePrepTable(); 
  const {Create, Update, Delete} = CrudMethods(); 
  const Columns = useColumnsSelector(_cols); 
  const cols = Columns.columns; 
  const useinlinetable = useInlineTable({indexedDatas, defaultEntry, Create, Update, Delete}); 

  return <div>
    <ColumnSelector {...{...Columns, _columns:_cols}} /> 
    <InlineTableContext.Provider value={useinlinetable}> 
      <InlineTableFeedback/>  
      <table> 
      <thead> 
        <tr><THeads {...{cols}} > 
          <THeadCell {...{GetHeadArgs}}/> 
          <THeadSorter {...{sorters}} /> 
          <br/> 
          <THeadFilter {...{filters}} /> 
        </THeads><th>Btn</th></tr> 
      </thead> 

      <tbody> 
      <Rows {...{rows}}> 
        <InlineEntry> 
          <Cols {...{cols}} > 
            <InlineCell {...{GetCellArgs}} /> 
          </Cols> 
        </InlineEntry> 
      </Rows> 
      <Row {...{row:'create'}}> 
        <InlineEntry> 
          <Cols {...{cols}} > 
            <InlineCell {...{GetCellArgs}} /> 
          </Cols> 
        </InlineEntry> 
      </Row>
      </tbody> 
      </table>
    </InlineTableContext.Provider>
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