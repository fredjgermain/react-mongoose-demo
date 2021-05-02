import React from 'react'; 
import { Story } from '@storybook/react'; 
import { useContext, useState } from 'react'; 
import { THeads } from '../components/header.components'; 
import { TRows, TRow, TCols } from '../components/rowcol.components'; 
import { InlineCreateBtn, InlineUpdateDeleteBtn } from '../components/inlinebtn.component'; 

import { useTable, TableContext } from '../hooks/usetable.hook'; 
import { InlineEntryContext, InlineEntryContext as RowReadContext, useInlineEntry } from '../hooks/useinlineentry.hook'; 
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
  const {datas, columns:{columns}, GetRowCol} = useContext(InlineTableContext); 
  const {row, col} = GetRowCol(); 
  const column = columns[col]; 
  const [ifield] = dao.GetIFields(collectionAccessor, [column]); 
  const options = dao.GetIOptions(ifield); 
  const defaultValue = ifield.defaultValue; 
  const value = !IsNull(datas[row]) ? datas[row][column]: defaultValue; 
  return {row, col, column, value, ifield, options}; 
} 

function HeaderCell({collectionAccessor}:{collectionAccessor:string}) { 
  const {filter:{SetFilters}} = useContext(InlineTableContext); 
  const {column, ifield} = GetDaoCell(collectionAccessor); 
  const keys = ['t', column]; 

  return <span> 
    {ifield.label} <br/> 
    {!ifield.isArray && !ifield.isMixed && !ifield.isModel && <InputFilter {...{keys, type:ifield.type, SetFilters}} />} 
  </span> 
} 

function Cell({collectionAccessor}:{collectionAccessor:string}) { 
  const {IsSelected, IsEditing} = useContext(InlineTableContext); 
  return <span> 
  {IsSelected() && IsEditing() ? 
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
  const {entry, SetEntry} = useContext(RowReadContext); 
  const [value, setValue] = useState(entry[column]); 

  const editValue = (newValue:any) => { 
    setValue(newValue); 
    const copy = {...entry}; 
    copy[column] = newValue; 
    SetEntry(copy); 
  } 

  return <Editor {...{value, ifield, options, editValue}} /> 
} 

const ReadEntryContext = React.createContext(null); 
function RowRead({collectionAccessor}:{collectionAccessor:string}) { 
  const {cols, GetRowCol} = useContext(InlineTableContext); 
  const {row} = GetRowCol(); 
  return <ReadEntryContext.Provider value={null} >
    <td>{row}</td>
    <TCols cols={cols}>
      <Cell {...{collectionAccessor}} />
    </TCols> 
    <InlineBtn/>
  </ReadEntryContext.Provider>
}

function RowSelected({collectionAccessor}:{collectionAccessor:string}) { 
  const {cols, GetRowCol} = useContext(InlineTableContext); 
  const {row} = GetRowCol(); 
  const inlineEntry = useInlineEntry(row); 
  return <InlineEntryContext.Provider value={inlineEntry}> 
    <td>{row}</td>
    <TCols cols={cols}>
      <Cell {...{collectionAccessor}} />
    </TCols> 
    <InlineBtn/>
  </InlineEntryContext.Provider> 
}

function InlineBtn() { 
  const {GetRowCol} = useContext(InlineTableContext); 
  const {row} = GetRowCol(); 

  return <td>{row === -1 ? <InlineCreateBtn />: <InlineUpdateDeleteBtn/>}</td>
}


function Row({collectionAccessor}:{collectionAccessor:string}) { 
  const {IsSelected} = useContext(InlineTableContext); 
  if(IsSelected()) 
    return <RowSelected {...{collectionAccessor}} /> 
  return <RowRead {...{collectionAccessor}} /> 
}


function InlineTable({collectionAccessor}:{collectionAccessor:string}) {
  const inlineTable = useInlineTable(collectionAccessor); 
  const {rows, cols, paging} = inlineTable; 

  return <InlineTableContext.Provider value={inlineTable} > 
    <InlineTableFeedback {...{collectionAccessor}} /> 
    <table> 
      <thead><tr> 
        <th>Row</th> 
        <THeads {...{cols}}><HeaderCell {...{collectionAccessor}} /></THeads> 
        <th>Btn</th> 
      </tr></thead> 

      <tbody> 
        <TRows {...{rows}}><Row {...{collectionAccessor}} /></TRows> 
        <TRow {...{row:-1}}><Row {...{collectionAccessor}} /></TRow> 
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
    <InlineTable {...{collectionAccessor}} /> 
  </DaoContexter> 
} 

const Template:Story<{}> = (args) => <TemplateComponent {...args} /> 

export const TestTabler = Template.bind({}) 
TestTabler.args = {} 
