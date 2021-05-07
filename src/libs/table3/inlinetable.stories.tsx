import React, { useContext } from 'react'; 
import { Story } from '@storybook/react'; 

import { crud } from '../dao/stories/mockcrud'; 
import { DaoContext, DaoContexter, ICrud } from '../_dao'; 

import { useFilter, useSorter } 
  from '../_inputs'; 
import { usePager, PagerBtn, PageOfPages } from '../pager/_pager'; 

import { useInlineTable, InlineTableContext } from './hook/inlinetable.hook'; 
import { Head, Row } from './components/rowcol.components'; 
import { InlineEntry } from './components/inlineentry.component'; 


/*
function InlineRow() { 
  //const {row} = useContext(RowContext); 
  const {cols} = useContext(InlineTableContext); 
  const inlineEntry = useInlineEntry(); 
  const {entry} = inlineEntry; 

  return <InlineEntryContext.Provider key={entry._id} value={inlineEntry} > 
    {cols.map( col => {
      return <td key={col}><ColContext.Provider value={{col}} >
        <Cell/> 
      </ColContext.Provider></td>
    })}
    <InlineBtn/> 
  </InlineEntryContext.Provider> 
}
*/

/*
function InlineBtn() { 
  const {row} = useContext(RowContext); 
  return <td>{row === -1 ? <InlineCreateBtn />: <InlineUpdateDeleteBtn/>}</td> 
} 
*/


function PrepInlineTable(collection:string) { 
  const dao = useContext(DaoContext); 
  const entries = dao.GetIEntries(collection); 
  const filters = useFilter(entries); 
  const sorters = useSorter(filters.matchValues); 
  const paging = usePager(sorters.sortedValues, 10); 
  const datas = paging.page; 
  const defaultEntry = dao.GetDefaultIEntry(collection); 

  const rows = datas.map((d,i) => i); 
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

  return {collection, datas, rows, cols, defaultEntry, filters, sorters, paging, Create, Update, Delete} 
}


function TableTest({collection}:{collection:string}) { 

  const {filters, sorters, paging, rows, cols, ...inlineTable} = PrepInlineTable(collection); 
  const context = useInlineTable({rows, cols, ...inlineTable}); 
  const datas = inlineTable.datas; 

  
  return <InlineTableContext.Provider value={context}>
    Test: {collection}
    <table>
      <thead><tr>
        {cols.map(col => { 
          return <Head key={col} {...{col}}/> 
        })} 
        <th>Btn</th>
      </tr></thead>

      <tbody>
        {rows.map(row => { 
          return <InlineEntry key={row} {...{row, cols}}/> 
        })} 
        <InlineEntry {...{row:-1, cols}}/> 
      </tbody>
    </table>
    <PagerBtn {...{paging}}/>
    </InlineTableContext.Provider>
}  

//

export default { 
  title: 'Table/table3', 
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