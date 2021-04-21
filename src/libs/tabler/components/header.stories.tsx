import { Story } from '@storybook/react'; 
import { useContext } from 'react';
import { THeader, THead, THeads, THeadContext, TCell, TCells, TCellContext, TRowContext, TRow, TRows } 
  from './header.components'

function ColumnHead({colHeads}:{colHeads:string[]}) { 
  const {col} = useContext(THeadContext); 
  return <span>{colHeads[col]}</span> 
} 

function CellRowCol({matrix}:{matrix:any[][]}) { 
  const {row} = useContext(TRowContext); 
  const {col} = useContext(TCellContext); 
  return <span> 
    {row} - {col} 
  </span> 
} 


//<THeader ids={ids} ><DisplayHeadId/></THeader> 
interface ITemplate { 
  colHeads:string[], 
  matrix:any[][], 
} 

function TemplateComponent({colHeads, matrix}:ITemplate) { 

  const rows = matrix.map((row,i) => i); 
  const cols = colHeads.map((col,i) => i); 
  return <div> 
    Test ### 
    <table> 
      <THeader {...{cols:colHeads.map((c,i) => i)}}> 
        <ColumnHead {...{colHeads}}/> 
      </THeader> 
      <tbody> 
        <TRows {...{rows}} > 
          <TCells {...{cols}} > 
            <CellRowCol {...{matrix}} /> 
          </TCells>
          <td> InlineBtn ...</td>
        </TRows> 
      </tbody>
    </table> 
    ###
  </div>
} 

export default { 
  title: 'Header/Header', 
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


