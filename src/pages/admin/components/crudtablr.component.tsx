import React, {useContext, useEffect} from 'react'; 
import {DaoContexter, DaoContext} from '../../../reusable/dao/_dao'; 
import {IUseActive, useActive} from '../../../reusable/hooks/useactive/_useactive'; 

import {Tablr, Rows, Row, RowContext, Cells, CellContext, Header, Heads, Cell} 
  from '../../../reusable/components/tablr/_tablr'; 
import {DisplayObjx} from '../../../reusable/components/objx/_objx'; 

import {BuildDefaultRenderingFunc, IRenderers} from '../../../components/rendering/renderers.utils'; 
import {CellRenderer} from './cellrenderer.component'; 
import {CreateBtn, UpdateBtn, DeleteBtn} from './crudbtn.component'; 

import '../../../css/table.css'; 


export const ActiveContext = React.createContext({} as IUseActive); 
export function CrudTablr() { 
  const {activeCollection, GetForeignElements, GetForeignOptions, GetForeignValues} = useContext(DaoContext); 
  const renderers = BuildDefaultRenderingFunc(GetForeignElements, GetForeignOptions, GetForeignValues); 
  const {entries, ifields} = activeCollection; 

  const activeContext = useActive(entries, ifields); 
  const cols = ifields.filter(f=>f.label); 
  const colBtn = {label:'Btn', accessor:'', defaultValue:'', options:{}, type:''} as IField; 

  return <ActiveContext.Provider value={activeContext}> 
    <Tablr {...{datas: entries}}> 
      <Header><Heads {...{ifields:[...cols,colBtn]}}/></Header> 
      <tbody> 
        <InlineDataEdit {...{cols, colBtn, renderers}} /> 
        <InlineDataCreation {...{cols, colBtn, renderers}} /> 
      </tbody>
  </Tablr></ActiveContext.Provider> 
}

// Inline Data Creation ============================
function InlineDataCreation({cols, colBtn, renderers}:{ cols:IField[], colBtn:IField, renderers:IRenderers}) { 
return <Row {...{row:-1}} > 
    <Cells {...{ifields:cols}}> 
      <CellRenderer {...{renderers}} />
    </Cells>
    <Cell {...{ifield:colBtn}} > 
      <CreateBtn /> 
    </Cell>
  </Row>
}

// Inline Data Edit ===============================
function InlineDataEdit({cols, colBtn, renderers}:{ cols:IField[], colBtn:IField, renderers:IRenderers}) { 
return <Rows> 
    <Cells {...{ifields:cols}}> 
      <CellRenderer {...{renderers}} />
    </Cells> 
    <Cell {...{ifield:colBtn}} >
      <UpdateBtn />
      <DeleteBtn />
    </Cell>
  </Rows> 
}
