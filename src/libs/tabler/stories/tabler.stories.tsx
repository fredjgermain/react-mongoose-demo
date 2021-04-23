import React, { useContext } from 'react'; 
import { Story } from '@storybook/react'; 

import { THeads, THeadContext } from '../components/header.components'; 
import { TRows, TCols } from '../components/rowcol.components'; 
import { useTable, TableContext } from '../hooks/usetable.hook'; 



export function HeaderCell() { 
  const {columns} = useContext(TableContext); 
  const {col} = useContext(THeadContext); 
  return <span>{columns.columns[col]}</span> 
} 

export function Cell() { 
  const {datas, GetRowCol} = useContext(TableContext); 
  const {row, col} = GetRowCol(); 
  const column = Object.keys(datas[row])[col]; 
  return <span>{datas[row][column]}</span> 
}


interface ITable {datas:any[], defaultCols:string[]} 
function Table({datas, defaultCols}:ITable) { 
  const table = useTable(datas, {defaultCols} ); 
  const {rows, cols} = table; 
  
  return <TableContext.Provider value={table} > 
    <table> 
      <thead><tr> 
          <THeads {...{cols}}><HeaderCell/></THeads> 
      </tr></thead> 

      <tbody> 
        <TRows {...{rows}}> 
          <TCols {...{cols}}><Cell /></TCols> 
        </TRows> 
      </tbody> 
    </table> 
    </TableContext.Provider> 
} 




export default { 
  title: 'Tabler/Tabler', 
  component: TemplateComponent, 
} 

function TemplateComponent({datas, defaultCols}:ITable) { 
  return <Table {...{datas, defaultCols}} /> 
} 

const Template:Story<ITable> = (args) => <TemplateComponent {...args} /> 

interface Item {
  id: number;
  value: string; 
  value2: string; 
}
export const TestTabler = Template.bind({}) 
TestTabler.args = { 
  datas: [ 
    {id:1, value:'asd', value2:'fgsf'}, 
    {id:2, value:'asd', value2:'fgaf'}, 
    {id:3, value:'asd', value2:'fgf'}, 
    {id:4, value:'fg', value2:'fgdff'}, 
    {id:5, value:'h', value2:'fgnf'}, 
    {id:6, value:'asd', value2:'ggf'}, 
    {id:7, value:'j', value2:'fgf'}, 
    {id:8, value:'k', value2:'fhgf'}, 
    {id:9, value:'asd', value2:'fhgf'}, 
    {id:10, value:'ll', value2:'fgf'}, 
    {id:11, value:'aa', value2:'fgf'}, 
    {id:12, value:'asd', value2:'fhgf'}, 
    {id:13, value:'gg', value2:'fgf'}, 
    {id:14, value:'asd', value2:'fhgf'}, 
    {id:15, value:'cc', value2:'fghf'}, 
    {id:16, value:'asd', value2:'h'}, 
    {id:17, value:'g', value2:'fgf'}, 
    {id:18, value:'asd', value2:'fgf'}, 
    {id:19, value:'g', value2:'fgf'}, 
  ] as Item[], 
  defaultCols: ['Value1', 'Value2']
} 
