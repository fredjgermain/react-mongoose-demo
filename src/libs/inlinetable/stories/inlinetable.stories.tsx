import { Story } from '@storybook/react'; 
/*import React, { useContext, useState } from 'react'; 
import { THeader, THead, THeads, THeadContext, Head} from '../components/header.components'; 
import { TRows, TRow, TCols, TCol, GetRowCol, TRowContext } from '../components/rowcol.components'; 


import { useTable, TableContext } from '../hooks/usetable.hook'; 
import { Editor, Reader } from '../../editor_reader/_editor_reader'; 

import { IUseInlineEntry, InlineEntryContext, useInlineEntry } from '../hooks/useinlineentry.hook'; 
import { IInlineTableState, IUseInlineTable, InlineTableContext, useInlineTable } from '../hooks/useinlinetable.hook'; 


import { crud } from '../../dao/stories/mockcrud'; 
import { DaoContexter, ICrud } from '../../_dao'; 


function Cell() { 
  const {row, col} = GetRowCol(); 
  const {GetFields, GetOptions} = useContext(InlineTableContext); 
  const {entry, SetEntry, isSelected, isEditing} = useContext(InlineEntryContext); 
  const {columns} = useContext(TableContext); 
  const accessor = columns.columns[col]; 
  const value = entry[accessor]; 
  const [ifield] = GetFields([accessor]); 
  const options = GetOptions(ifield); 
  const editValue = () => {}; 

  if(isSelected)
    console.log([isSelected, isEditing])
  
  return <span>
      {isEditing ? 
        <Editor {...{value, ifield, options, editValue}} /> : 
        <Reader {...{value, ifield, options}} />
      }
    </span> 
} 


function InlineBtn() { 
  const {row} = useContext(TRowContext); 
  const {inlineTableState, SetInlineTableState} = useContext(InlineTableContext); 
  const isSelected = row === inlineTableState.row; 

  const SelectRow = (mode:string) => { 
    SetInlineTableState({row, mode}); 
  } 

  return <span> 
    <button onClick={() => SelectRow('update')}>Update</button> 
    <button onClick={() => SelectRow('delete')}>Delete</button> 
  </span> 
} 


function CrudRow() { 
  const {rows, cols} = useContext(TableContext); 
  const {row} = useContext(TRowContext); 
  const crudEntry = useInlineEntry(row); 

  return <InlineEntryContext.Provider value={crudEntry}> 
    <TCols cols={cols}><Cell /></TCols> 
    <td><InlineBtn/></td> 
  </InlineEntryContext.Provider> 
}


function Tabler({collectionAccessor}:{collectionAccessor:string}) { 
  const inlineTable = useInlineTable(collectionAccessor); 
  const entries = inlineTable.GetEntries(); 
  const table = useTable(entries, {defaultCols:inlineTable.GetDefaultColumns()} ); 
  const {rows, cols} = table; 
  
  return <InlineTableContext.Provider value={inlineTable} > 
    <TableContext.Provider value={table} > 
    {JSON.stringify(inlineTable.inlineTableState)}
    <table> 
      <thead><tr> 
          <THeads {...{cols}}><Head/></THeads> 
          <th>Btn</th> 
      </tr></thead> 

      <tbody> 
        <TRows {...{rows}}><CrudRow/></TRows> 
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
  title: 'Tabler/Tabler', 
  component: TemplateComponent, 
} 

function TemplateComponent({...props}:{accessors:string[]}) { 
  return <DaoContexter {...{crud:crud as ICrud, accessors:props.accessors}}> 
    <Tabler collectionAccessor={'questions'} /> 
  </DaoContexter> 
} 

const Template:Story<{accessors:string[]}> = (args) => <TemplateComponent {...args} /> 

export const TestTabler = Template.bind({}) 
TestTabler.args = { 
  accessors: ['questions', 'patients', 'responses', 'answers', 'forms', 'instructions'], 
} 
*/