import { Story } from '@storybook/react'; 
import { useContext, useState } from 'react'; 
import { THeads } from '../components/header.components'; 
import { TRows, TRow, TCols } from '../components/rowcol.components'; 
import { InlineCreateBtn, InlineUpdateDeleteBtn } from '../components/inlinebtn.component'; 

import { useTable, TableContext } from '../hooks/usetable.hook'; 
import { InlineEntryContext, useInlineEntry } from '../hooks/useinlineentry.hook'; 
import { InlineTableContext, useInlineTable } from '../hooks/useinlinetable.hook'; 
import { InlineTableFeedback } from '../components/inlinetablefeedback.component'; 

import { InputFilter } from '../../_inputs'; 
import { IsNull } from '../../_utils'; 
import { Editor, Reader } from '../../editor_reader/_editor_reader'; 
import { PagerBtn } from '../../pager/_pager'; 

import { crud } from '../../dao/stories/mockcrud'; 
import { DaoContext, DaoContexter, ICrud } from '../../_dao'; 


function GetDaoCell(collectionAccessor:string) { 
  const dao = useContext(DaoContext); 
  const {datas, columns, GetRowCol} = useContext(TableContext); 
  const {row, col} = GetRowCol(); 
  const column = columns[col]; 
  const [ifield] = dao.GetIFields(collectionAccessor, [column]); 
  const options = dao.GetIOptions(ifield); 
  const defaultValue = ifield.defaultValue; 
  const value = !IsNull(datas[row]) ? datas[row][column]: defaultValue; 
  return {row, col, column, value, ifield, options}; 
} 

function HeaderCell({collectionAccessor}:{collectionAccessor:string}) { 
  const {SetFilters} = useContext(TableContext); 
  const {column, ifield} = GetDaoCell(collectionAccessor); 
  const keys = ['t', column]; 

  return <span> 
    {ifield.label} <br/> 
    {!ifield.isArray && !ifield.isMixed && !ifield.isModel && <InputFilter {...{keys, type:ifield.type, SetFilters}} />} 
  </span> 
} 

function Cell({collectionAccessor}:{collectionAccessor:string}) { 
  const {isSelected, isEditing} = useContext(InlineEntryContext); 
  return <span> 
  {isSelected && isEditing ? 
    <CellEdit {...{collectionAccessor}} />: 
    <CellRead {...{collectionAccessor}} />} 
  </span> 
} 

function CellRead({collectionAccessor}:{collectionAccessor:string}) { 
  const {value, ifield, options} = GetDaoCell(collectionAccessor); 
  return <Reader {...{value, ifield, options}} /> 
} 

function CellEdit({collectionAccessor}:{collectionAccessor:string}) { 
  const {ifield, options, column} = GetDaoCell(collectionAccessor); 
  const {entry, SetEntry} = useContext(InlineEntryContext); 
  const [value, setValue] = useState(entry[column]); 

  const editValue = (newValue:any) => { 
    setValue(newValue); 
    const copy = {...entry}; 
    copy[column] = newValue; 
    SetEntry(copy); 
  } 

  return <Editor {...{value, ifield, options, editValue}} /> 
} 


function CrudRow({collectionAccessor}:{collectionAccessor:string}) { 
  const {cols, GetRowCol} = useContext(TableContext); 
  const {row} = GetRowCol(); 
  const crudEntry = useInlineEntry(row); 

  return <InlineEntryContext.Provider value={crudEntry}> 
    <TCols cols={cols}><Cell {...{collectionAccessor}} /></TCols> 
    <td>{row === -1 ? 
      <InlineCreateBtn /> : 
      <InlineUpdateDeleteBtn />}</td> 
  </InlineEntryContext.Provider> 
}


function Table({collectionAccessor}:{collectionAccessor:string}) { 
  const dao = useContext(DaoContext); 
  const entries = dao.GetIEntries(collectionAccessor); 
  const defaultCols = dao.GetIFields(collectionAccessor).filter(f => !!f.label).map( f => f.accessor ); 
  const table = useTable(entries, {defaultCols} ); 
  
  return <TableContext.Provider value={table} > 
    <InlineTable {...{collectionAccessor}} /> 
  </TableContext.Provider> 
} 

function InlineTable({collectionAccessor}:{collectionAccessor:string}) {
  const table = useContext(TableContext); 
  const {rows, cols, paging} = table; 
  const inlineTable = useInlineTable(collectionAccessor); 

  return <InlineTableContext.Provider value={inlineTable} > 
    <InlineTableFeedback {...{collectionAccessor}} /> 
    <table> 
      <thead><tr> 
          <THeads {...{cols}}><HeaderCell {...{collectionAccessor}} /></THeads> 
          <th>Btn</th> 
      </tr></thead> 

      <tbody> 
        <TRows {...{rows}}><CrudRow {...{collectionAccessor}} /></TRows> 
        <TRow {...{row:-1}}><CrudRow {...{collectionAccessor}} /></TRow> 
      </tbody> 
    </table> 
    <PagerBtn {...{paging}} /> 
  </InlineTableContext.Provider> 
}


interface ITemplate { 
  colHeads:string[], 
  matrix:any[][], 
} 

export default { 
  title: 'Table/InlineTable', 
  component: TemplateComponent, 
} 

function TemplateComponent() { 
  const accessors = ['questions', 'patients', 'responses', 'answers', 'forms', 'instructions']; 
  const collectionAccessor = 'questions'; 
  return <DaoContexter {...{crud:crud as ICrud, accessors}}> 
    <Table {...{collectionAccessor}} /> 
  </DaoContexter> 
} 

const Template:Story<{}> = (args) => <TemplateComponent {...args} /> 

export const TestTabler = Template.bind({}) 
TestTabler.args = {} 
