import { useContext } from 'react'; 
import { Story } from '@storybook/react'; 
import { usePager, PagerBtn, PageOfPages } from '../pager/_pager'; 

import { useFilter, useSorter } 
  from '../_inputs'; 

import { crud } from '../dao/stories/mockcrud'; 
import { DaoContext, DaoContexter, ICrud } from '../_dao'; 

import { Cell, HeadCell, InlineTableContext, 
  RowContext, 
  Rows, Row, Cols, THeads, 
  InlineEntryContext, useInlineEntry, 
  useInlineTable, InlineCreateBtn, InlineUpdateDeleteBtn} from './_table'; 



function InlineRow() { 
  const context = useInlineEntry(); 
  const {cols}  = useContext(InlineTableContext); 
  return <InlineEntryContext.Provider value={context}> 
    <Cols {...{cols}}> 
      <Cell/> 
    </Cols> 
    <InlineBtn/> 
  </InlineEntryContext.Provider> 
} 


function InlineBtn() { 
  const {row} = useContext(RowContext); 
  return <td>{row === -1 ? <InlineCreateBtn />: <InlineUpdateDeleteBtn/>}</td> 
} 



function PrepInlineTable(collection:string) { 
  const dao = useContext(DaoContext); 
  const entries = dao.GetIEntries(collection); 
  const filters = useFilter(entries); 
  const sorters = useSorter(filters.matchValues); 
  const paging = usePager(sorters.sortedValues, 10); 
  const datas = paging.page; 
  const defaultEntry = dao.GetDefaultIEntry(collection); 
  const cols = dao.GetIFields(collection).filter(f => f.label).map(f => f.accessor); 

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

  return {datas, cols, defaultEntry, filters, sorters, paging, Create, Update, Delete} 
}

function TableTest({collection}:{collection:string}) { 
  const {filters, sorters, paging, ...prepInlineTable} = PrepInlineTable(collection); 
  const inlineTable = useInlineTable({collection, ...prepInlineTable}); 
  const {rows, cols} = inlineTable; 

  const key = collection + paging.pageIndex; 

  return <InlineTableContext.Provider key={key} value={inlineTable} > 
      <table>
      <thead><tr> 
        <THeads {...{cols}}><HeadCell {...{sorterFilter:{...filters, ...sorters}}} /></THeads> 
        <th>btn</th> 
      </tr></thead> 

      <tbody> 
        <Rows {...{rows}}><InlineRow/></Rows> 
        <Row {...{row:-1}}><InlineRow/></Row> 
      </tbody> 
    </table> 
    <PagerBtn {...{paging}} /> 
  </InlineTableContext.Provider>
}  


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