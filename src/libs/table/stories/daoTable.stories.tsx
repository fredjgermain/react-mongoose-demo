import { Story } from '@storybook/react'; 
import { useContext } from 'react'; 
import { THeads, THeadContext } from '../components/header.components'; 
import { TRows, TCols } from '../components/rowcol.components'; 
import { useTable, TableContext } from '../hooks/usetable.hook'; 

import { crud } from '../../dao/stories/mockcrud'; 
import { DaoContext, DaoContexter, ICrud } from '../../_dao'; 
import { Reader } from '../../editor_reader/_editor_reader'; 

import { PagerBtn, PagerFromTo } from '../../pager/_pager'; 


function HeaderCell({collectionAccessor}:{collectionAccessor:string}) { 
  const {columns} = useContext(TableContext); 
  const dao = useContext(DaoContext); 
  const {col} = useContext(THeadContext); 
  const column = columns.columns[col]; 
  const [ifield] = dao.GetIFields(collectionAccessor, [column]); 
  return <span>{ifield.label}</span> 
} 

function Cell({collectionAccessor}:{collectionAccessor:string}) { 
  const {datas, GetRowCol} = useContext(TableContext); 
  const dao = useContext(DaoContext); 
  const {row, col} = GetRowCol(); 
  const column = Object.keys(datas[row])[col]; 
  const value = datas[row][column]; 
  const [ifield] = dao.GetIFields(collectionAccessor, [column]); 
  const options = dao.GetIOptions(ifield); 
  return <Reader {...{value, ifield, options}} /> 
} 


function Table({collectionAccessor}:{collectionAccessor:string}) { 
  const dao = useContext(DaoContext); 
  const datas = dao.GetIEntries(collectionAccessor); 
  const defaultCols = dao.GetIFields(collectionAccessor).filter(f => !!f.label).map( f => f.accessor ); 

  const table = useTable(datas, {defaultCols} ); 
  const {rows, cols, paging} = table; 
  
  return <TableContext.Provider value={table} > 
    <table> 
      <thead><tr> 
          <THeads {...{cols}}><HeaderCell {...{collectionAccessor}} /></THeads> 
      </tr></thead> 

      <tbody> 
        <TRows {...{rows}}> 
          <TCols {...{cols}}><Cell {...{collectionAccessor}}/></TCols> 
        </TRows> 
      </tbody> 
    </table> 
    <PagerBtn {...{paging}} /> 
    <PagerFromTo {...{paging}} /> 
  </TableContext.Provider> 
} 




export default { 
  title: 'Table/DaoTable', 
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

interface Item { 
  id: number; 
  value: string; 
  value2: string; 
}
export const TestTabler = Template.bind({}) 
TestTabler.args = {} 
