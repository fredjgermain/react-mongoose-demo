import { Story } from '@storybook/react'; 
import React, { useContext, useState } from 'react'; 
import { THeader, THead, THeads, THeadContext} from '../components/header.components'; 
import { TRows, TRow, TCols, TCol, GetRowCol } from '../components/rowcol.components'; 
import { useEditState, IEditState, IUseEditState } from '../hooks/useeditstate.hook'; 

function Head({colHeads}:{colHeads:string[]}) { 
  const {col} = useContext(THeadContext); 
  return <span>{colHeads[col]}</span> 
} 

function Cell({matrix}:{matrix:any[][]}) { 
  const {row, col} = GetRowCol(); 
  const {editState, SetEditState} = useContext(TableContext); 
  const isSelected = row === editState.row; 
  return <span>{row} - {col}{isSelected && '*'}</span> 
} 

function InlineBtn() { 
  const {row, col} = GetRowCol(); 
  const {editState, SetEditState} = useContext(TableContext); 
  const isSelected = row === editState.row; 

  const SelectRow = () => { 
    const newEditState = {...editState}; 
    newEditState.row = isSelected ? null: row; 
    SetEditState(newEditState); 
  }

  return <button onClick={SelectRow}>{isSelected ? 'Unselect': 'Select'} row:{row}</button>
}


//<THeader ids={ids} ><DisplayHeadId/></THeader> 
interface ITemplate { 
  colHeads:string[], 
  matrix:any[][], 
} 



const TableContext = React.createContext({} as IUseEditState); 
function Tabler({colHeads, matrix}:ITemplate) { 
  const rows = matrix.map((row,i) => i); 
  const cols = colHeads.map((col,i) => i); 
  const editState = useEditState(); 

  return <TableContext.Provider value={editState} > 
    <table> 
      <thead><tr>
          <THeads {...{cols}}> 
            <Head {...{colHeads}}/> 
          </THeads> 
          <th>Btn</th> 
      </tr></thead> 

      <tbody> 
        <TRows {...{rows}} > 
          <TCols {...{cols}} > 
            <Cell {...{matrix}} /> 
          </TCols> 
          <td><InlineBtn/></td> 
        </TRows> 
      </tbody> 
    </table> 
  </TableContext.Provider> 
} 


function TemplateComponent({colHeads, matrix}:ITemplate) { 
  return <Tabler {...{colHeads, matrix}} />
}


export default { 
  title: 'Tabler/Tabler', 
  component: TemplateComponent, 
} 

const Template:Story<ITemplate> = args => <TemplateComponent {...args} /> 


export const GroupById = Template.bind({}) 
GroupById.args = { 
  colHeads: ['a', 'b', 'c'],  
  matrix: [ 
    [1,2,3], 
    [4,5,6], 
    [7,8,9] 
  ] 
} 


