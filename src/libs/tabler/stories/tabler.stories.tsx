import { Story } from '@storybook/react'; 
import React, { useContext, useState } from 'react'; 
import { THeader, THead, THeads, THeadContext} from '../components/header.components'; 
import { TRows, TRow, TCols, TCol, GetRowCol } from '../components/rowcol.components'; 
import { useInline, IUseInline } from '../hooks/useInline.hook';

import { crud } from '../../dao/stories/mockcrud'; 
import { DaoContexter, ICrud } from '../../_dao'; 


function Head() { 
  const {columns} = useContext(TableContext); 
  const {col} = useContext(THeadContext); 
  return <span>{columns.columns[col]}</span> 
} 

function Cell() { 
  const {columns, editState} = useContext(TableContext); 
  const {row, col} = GetRowCol(); 
  const isSelected = row === editState.editState.row; 
  const colAccessor = columns.columns[col]; 
  
  return <span>{row} - {col}{isSelected && '*'}</span> 
} 

function InlineBtn() { 
  const {row, col} = GetRowCol(); 
  const {editState} = useContext(TableContext); 
  const isSelected = row === editState.editState.row; 

  const SelectRow = () => { 
    const newEditState = {...editState.editState}; 
    newEditState.row = isSelected ? null: row; 
    editState.SetEditState(newEditState); 
  }

  return <button onClick={SelectRow}>{isSelected ? 'Unselect': 'Select'} row:{row}</button>
}


//<THeader ids={ids} ><DisplayHeadId/></THeader> 
interface ITemplate { 
  colHeads:string[], 
  matrix:any[][], 
} 



const TableContext = React.createContext({} as IUseInline); 
function Tabler() { 
  const inline = useInline('questions'); 
  const cols = inline.columns.columns.map((c,i) => i); 
  const rows = inline.paging.page.map( e => e.i); 

  return <TableContext.Provider value={inline} > 
    <table> 
      <thead><tr>
          <THeads {...{cols}}> 
            <Head/> 
          </THeads> 
          <th>Btn</th> 
      </tr></thead> 

      <tbody> 
        <TRows {...{rows}} > 
          <TCols {...{cols}} > 
            <Cell/> 
          </TCols> 
          <td><InlineBtn/></td> 
        </TRows> 
      </tbody> 
    </table> 
  </TableContext.Provider> 
} 


function TemplateComponent({...props}:{accessors:string[]}) { 
  return <DaoContexter {...{crud:crud as ICrud, accessors:props.accessors}}> 
    <Tabler/> 
  </DaoContexter> 
} 

const Template:Story<{accessors:string[]}> = (args) => <TemplateComponent {...args} /> 

export const TestTabler = Template.bind({}) 
TestTabler.args = { 
  accessors: ['questions', 'patients', 'responses', 'answers', 'forms', 'instructions'], 
} 
