import { Story } from '@storybook/react'; 
import React, { useContext, useState } from 'react'; 
import { THeader, THead, THeads, THeadContext} from '../components/header.components'; 
import { TRows, TRow, TCols, TCol, GetRowCol } from '../components/rowcol.components'; 
import { useDataTabler, IUseDataTabler } from '../hooks/usedatatabler.hook'; 
import { useCrudState, IUseCrudState } from '../hooks/usecrudstate.hook'; 
import { Reader } from '../../editor_reader/_editor_reader'; 


import { crud } from '../../dao/stories/mockcrud'; 
import { DaoContexter, ICrud } from '../../_dao'; 


function Head() { 
  const {columns} = useContext(TableContext); 
  const {col} = useContext(THeadContext); 
  return <span>{columns.columns[col]}</span> 
} 

function Cell() { 
  const {columns, crudState, GetEntry, GetFields, GetOptions} = useContext(TableContext); 
  const {row, col} = GetRowCol(); 
  const isSelected = row === crudState.row; 
  const accessor = columns.columns[col]; 
  const entry = GetEntry(row); 
  const [ifield] = GetFields([accessor]); 
  const value = entry[accessor]; 
  const options = GetOptions(ifield); 
  
  return <span><Reader {...{value, ifield, options}} />{isSelected && '*'}</span> 
} 

function InlineBtn() { 
  const {row, col} = GetRowCol(); 
  const {crudState, SetCrudState} = useContext(TableContext); 
  const isSelected = row === crudState.row; 

  const SelectRow = () => { 
    SetCrudState({row}); 
  }

  return <button onClick={SelectRow}>{isSelected ? 'Unselect': 'Select'} row:{row}</button>
}


//<THeader ids={ids} ><DisplayHeadId/></THeader> 
interface ITemplate { 
  colHeads:string[], 
  matrix:any[][], 
} 



const TableContext = React.createContext({} as IUseDataTabler & IUseCrudState); 
function Tabler() { 
  const dataTabler = useDataTabler('questions'); 
  const crudState = useCrudState(); 
  const cols = dataTabler.columns.columns.map((c,i) => i); 
  const rows = dataTabler.paging.page.map( e => e.i); 

  return <TableContext.Provider value={{...dataTabler, ...crudState}} > 
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


export default { 
  title: 'Tabler/Tabler', 
  component: TemplateComponent, 
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
