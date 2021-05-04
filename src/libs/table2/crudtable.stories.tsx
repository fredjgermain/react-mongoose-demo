import React, { useContext, useState } from 'react'; 
import { Story } from '@storybook/react'; 
import { useStateReset } from '../_customhooks'; 
import { usePager, PagerBtn, PageOfPages } from '../pager/_pager'; 

import { InputFilter, InputSorter, useFilter, useSorter } from '../_inputs'; 

import { crud } from '../dao/stories/mockcrud'; 
import { DaoContext, DaoContexter, ICrud } from '../_dao'; 


function THead({columns}:{columns:string[]}) { 
  return <thead><tr> 
    {columns.map( col => { 
      return <th key={col}>{col}</th> 
    })} 
  </tr></thead> 
} 


function Row({row, columns}:{row:number, columns:string[]}) { 
  return <tr> 
    {columns.map( col => { 
      return <td key={col}><Cell {...{row, col}} /></td> 
    })} 
  </tr> 
} 

function Cell({row, col}:{row:number, col:string}) { 
  const datas = useContext(TableContext); 
  const [inc, setInc] = useState(0); 
  const SetInc = () => setInc(prev => {
    return prev + 1; 
  }) 

  return <span> 
    {inc} | 
    {datas[row][col]} 
    <button onClick={SetInc} >+1</button> 
  </span> 
} 


const TableContext = React.createContext({} as any[]); 
function CrudTable() { 
  const [columns, SetColumns, ResetColumns] = useStateReset(defaultCols); 
  const {matchValues, SetFilters, ResetFilters} = useFilter(datas); 
  const {sortedValues, SetSorters, ResetSorters} = useSorter(matchValues); 
  const paging = usePager(sortedValues, 10); 
  
  return <TableContext.Provider key={paging.pageIndex} value={paging.page}> 
    <table> 
      <THead {...{columns}} /> 
      <tbody> 
        {paging.page.map( (e,row) => { 
          return <Row key={row} {...{row, columns}} /> 
        })} 
      </tbody> 
    </table> 
    <PagerBtn {...{paging}} /> 
    </TableContext.Provider> 
} 


export default { 
  title: 'Table/CrudTable2', 
  component: TemplateComponent, 
} 

function TemplateComponent({datas, defaultCols}:ITable) { 
  return <CrudTable {...{datas, defaultCols}} /> 
} 

const Template:Story<any> = (args) => <TemplateComponent {...args} /> 

export const TestTabler = Template.bind({}) 
TestTabler.args = {} 
