import { Story } from '@storybook/react'; 
import { useContext } from 'react'; 
import { THeader, THead, THeads, THeadContext} from '../components/header.components'; 
import { TRows, TRow, TCols, TCol, GetRowCol } from '../components/rowcol.components'; 

function Head({colHeads}:{colHeads:string[]}) { 
  const {col} = useContext(THeadContext); 
  return <span>{colHeads[col]}</span> 
} 

function Cell({matrix}:{matrix:any[][]}) { 
  const {row, col} = GetRowCol(); 
  return <span>{row} - {col}</span> 
} 


//<THeader ids={ids} ><DisplayHeadId/></THeader> 
interface ITemplate { 
  colHeads:string[], 
  matrix:any[][], 
} 

function TemplateComponent({colHeads, matrix}:ITemplate) { 
  const rows = matrix.map((row,i) => i); 
  const cols = colHeads.map((col,i) => i); 
  return <table> 
      <thead><tr>
        <THeads {...{cols}}> 
          <Head {...{colHeads}}/> 
        </THeads> 
        <th>Btn</th> 
      </tr>
      </thead> 

      <tbody> 
        <TRows {...{rows}} > 
          <TCols {...{cols}} > 
            <Cell {...{matrix}} /> 
          </TCols> 
          <td> InlineBtn ...</td> 
        </TRows> 
      </tbody> 
    </table> 
} 

export default { 
  title: 'Tabler/Header', 
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


