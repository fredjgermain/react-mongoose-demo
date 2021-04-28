import { Story } from '@storybook/react'; 
import React, { useContext, useState } from 'react'; 
import { THeads, THeadContext } from '../components/header.components'; 
import { TRows, TCols } from '../components/rowcol.components'; 


import { useTable, TableContext } from '../hooks/usetable.hook'; 
import { InputFilter } from '../../_inputs'; 
import { Editor, Reader } from '../../editor_reader/_editor_reader'; 

import { IUseInlineEntry, InlineEntryContext, useInlineEntry } from '../hooks/useinlineentry.hook'; 
import { IInlineTableState, IUseInlineTable, InlineTableContext, useInlineTable } from '../hooks/useinlinetable.hook'; 


import { crud } from '../../dao/stories/mockcrud'; 
import { DaoContext, DaoContexter, ICrud } from '../../_dao'; 



function HeaderCell({collectionAccessor}:{collectionAccessor:string}) { 
  const {columns, SetFilters} = useContext(TableContext); 
  const dao = useContext(DaoContext); 
  const {col} = useContext(THeadContext); 
  const column = columns.columns[col]; 
  const [ifield] = dao.GetIFields(collectionAccessor, [column]); 
  const keys = ['t', column]; 

  return <span> 
    {ifield.label} <br/> 
    {!ifield.isArray && !ifield.isMixed && !ifield.isModel 
      && <InputFilter {...{keys, type:ifield.type, SetFilters}} />} 
  </span> 
} 


function CellRead({collectionAccessor}:{collectionAccessor:string}) { 
  const {datas, GetRowCol, columns} = useContext(TableContext); 
  const dao = useContext(DaoContext); 
  const {row, col} = GetRowCol(); 
  const column = columns.columns[col]; 
  const value = datas[row][column]; 
  const [ifield] = dao.GetIFields(collectionAccessor, [column]); 
  const options = dao.GetIOptions(ifield); 
  return <Reader {...{value, ifield, options}} /> 
} 

function CellEdit({collectionAccessor}:{collectionAccessor:string}) { 
  const {datas, GetRowCol, columns} = useContext(TableContext); 
  const {entry, SetEntry, isSelected, isEditing} = useContext(InlineEntryContext); 
  const dao = useContext(DaoContext); 
  const {row, col} = GetRowCol(); 
  const column = columns.columns[col]; 
  const [value, setValue] = useState(entry[column]); 
  const [ifield] = dao.GetIFields(collectionAccessor, [column]); 
  const options = dao.GetIOptions(ifield); 

  const editValue = (newValue:any) => { 
    setValue(newValue); 
    const copy = {...entry}; 
    copy['column'] = newValue; 
    SetEntry(copy); 
  } 

  return <Editor {...{value, ifield, options, editValue}} /> 
} 

function Cell({collectionAccessor}:{collectionAccessor:string}) { 
  const {isSelected, isEditing} = useContext(InlineEntryContext); 
  return <span> 
  {isSelected && isEditing ? 
    <CellEdit {...{collectionAccessor}} />: 
    <CellRead {...{collectionAccessor}} />} 
  </span> 
} 


function InlineBtn() { 
  const {GetRowCol} = useContext(TableContext); 
  const {entry, SetEntry, isSelected, isEditing} = useContext(InlineEntryContext); 
  const {inlineTableState, SetInlineTableState} = useContext(InlineTableContext); 
  const {row, col} = GetRowCol(); 

  const SelectRow = (mode:string) => { 
    SetInlineTableState({row, mode}); 
  } 

  return <span> 
    <button onClick={() => SelectRow('update')}>Update</button> 
    <button onClick={() => SelectRow('delete')}>Delete</button> 
  </span> 
} 


function CrudRow({collectionAccessor}:{collectionAccessor:string}) { 
  console.log('CrudRow'); 
  const {rows, cols, GetRowCol} = useContext(TableContext); 
  const {row} = GetRowCol(); 
  const crudEntry = useInlineEntry(row); 

  return <InlineEntryContext.Provider value={crudEntry}> 
    <TCols cols={cols}><Cell {...{collectionAccessor}} /></TCols> 
    <td><InlineBtn/></td> 
  </InlineEntryContext.Provider> 
}


function Table({collectionAccessor}:{collectionAccessor:string}) { 
  console.log('Table'); 
  const inlineTable = useInlineTable(collectionAccessor); 

  const dao = useContext(DaoContext); 
  const entries = dao.GetIEntries(collectionAccessor); 
  const defaultCols = dao.GetIFields(collectionAccessor).filter(f => !!f.label).map( f => f.accessor ); 
  const table = useTable(entries, {defaultCols} ); 
  const {rows, cols} = table; 
  
  return <InlineTableContext.Provider value={inlineTable} > 
    <TableContext.Provider value={table} > 
    {JSON.stringify(inlineTable.inlineTableState)}
    <table> 
      <thead><tr> 
          <THeads {...{cols}}><HeaderCell {...{collectionAccessor}} /></THeads> 
          <th>Btn</th> 
      </tr></thead> 

      <tbody> 
        <TRows {...{rows}}><CrudRow {...{collectionAccessor}} /></TRows> 
      </tbody> 
    </table> 
    </TableContext.Provider> 
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
