import { Story } from '@storybook/react'; 
import { useContext } from 'react'; 
import { InputFilter } from '../../_inputs'; 
import { IsNull } from '../../_utils';
import { crud } from '../../dao/stories/mockcrud'; 
import { DaoContext, DaoContexter, ICrud } from '../../_dao'; 
import { Reader } from '../../editor_reader/_editor_reader'; 
import { PagerBtn } from '../../pager/_pager'; 

import { THeads, TRows, TCols, useTable, TableContext } from '../_table'; 


function GetDaoCell(collectionAccessor:string) { 
  const dao = useContext(DaoContext); 
  const {datas, columns:{columns}, GetRowCol} = useContext(TableContext); 
  const {row, col} = GetRowCol(); 
  const column = columns[col]; 
  const [ifield] = dao.GetIFields(collectionAccessor, [column]); 
  const options = dao.GetIOptions(ifield); 
  const defaultValue = ifield.defaultValue; 
  const value = !IsNull(datas[row]) ? datas[row][column]: defaultValue; 
  return {row, col, column, value, ifield, options}; 
} 

function HeaderCell({collectionAccessor}:{collectionAccessor:string}) { 
  const {filter:{SetFilters}} = useContext(TableContext); 
  const {column, ifield} = GetDaoCell(collectionAccessor); 
  const keys = ['t', column]; 

  return <span> 
    {ifield.label} <br/> 
    {!ifield.isArray && !ifield.isMixed && !ifield.isModel && <InputFilter {...{keys, type:ifield.type, SetFilters}} />} 
  </span> 
} 

function Cell({collectionAccessor}:{collectionAccessor:string}) { 
  const {value, ifield, options} = GetDaoCell(collectionAccessor); 
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
          <TCols {...{cols}}><Cell {...{collectionAccessor}} /></TCols> 
        </TRows> 
      </tbody> 
    </table> 
    <PagerBtn {...{paging}} /> 
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

export const TestTabler = Template.bind({}) 
TestTabler.args = {} 
