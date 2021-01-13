import React, { useContext } from 'react' 
import {Tablr, Rows, Row, RowContext, Cells, CellContext, Header, Heads, Cell} 
  from '../../../reusable/components/tablr/_tablr'; 
//import { Arrx, Elements, ElementIndex, ElementValue } from '../../../reusable/components/arrx/_arrx'; 
import {BuildDefaultRenderingFunc} from './renderers.utils'; 
import {DaoContext} from './testdao';

import {IUseActive, useActive} from '../../../reusable/hooks/useactive/_useactive'; 
import {CreateBtn, UpdateBtn, DeleteBtn} from './crudbtn.component'; 
import {CellRenderer} from './cellrenderer.component'; 

import '../testtablr/table.css'; 

export const ActiveContext = React.createContext({} as IUseActive); 
export function DaoTablr() { 
  const {activeCollection, GetForeignOptions, GetForeignValue} = useContext(DaoContext); 
  const {entries, ifields} = activeCollection; 
  const renderers = BuildDefaultRenderingFunc(GetForeignValue, GetForeignOptions); 
  
  // defineds columns for buttons. 
  const colBtn = {label:'Btn', accessor:'', defaultValue:'', options:{}, type:''} as IField; 
  const activeContext = useActive(entries, ifields); 



  return <ActiveContext.Provider value={activeContext} >
    <h3>{activeCollection.label}</h3> 
  <Tablr {...{datas:entries}} > 
  <Header> 
    <Heads {...{ifields:[...ifields,colBtn, ]}} /> 
  </Header> 
  <tbody> 
    <Rows {...{rows:[1]}} > 
      <Cells {...{ifields}}> 
        <CellRenderer {...{renderers}} /> 
      </Cells> 
      <Cell {...{ifield:colBtn}} >
        <UpdateBtn />
        <DeleteBtn />
      </Cell>
    </Rows> 
    <Row {...{row:-1}} > 
      <Cells {...{ifields}}> 
        <CellRenderer {...{renderers}} /> 
      </Cells>
      <Cell {...{ifield:colBtn}} > 
        <CreateBtn /> 
      </Cell>
    </Row>
  </tbody>
</Tablr></ActiveContext.Provider>
}

