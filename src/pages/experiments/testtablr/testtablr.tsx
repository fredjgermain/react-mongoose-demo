import React, { useContext, useState } from 'react'; 
import {Tablr, Rows, Row, RowContext, Cells, CellContext, Header, Heads, Cell} 
  from '../../../reusable/components/tablr/_tablr'; 
import {Arrx, Elements, ElementIndex, ElementValue} 
  from '../../../reusable/components/arrx/_arrx'; 
import {usePage, IPageHook} from '../../../reusable/hooks/usepage/usePage'; 
import {ifields, Datas, GetForeignOptions, GetForeignValue} from './mockdata'; 

import './table.css'; 
import {IUseActive, useActive} from '../../../reusable/hooks/useactive/_useactive'; 
import {CreateBtn, UpdateBtn, DeleteBtn} from './crudbtn.component'; 
import {BuildDefaultRenderingFunc} from './rendering/renderers.utils'; 
import {CellRenderer} from './cellrenderer.component'; 

/* 
export const DaoContext = React.createContext({} as ); 
const daoContext = {, GetForeignOptions, GetForeignValue, Create, Update, Delete} 
*/ 


export const ActiveContext = React.createContext({} as IUseActive); 
// TEST TABLR ====================================
export function TestTablr() { 
  const [datas, setDatas] = useState(Datas); 
  const renderers = BuildDefaultRenderingFunc(GetForeignValue, GetForeignOptions); 
  
  // page rows
  const {pageIndex, setPageIndex, pageIndexes, from, to} = usePage(datas, 5); 
  const rows = datas.map((v,i) => i).filter((i) => i >=from && i<=to); 

  // defineds columns for buttons. 
  const colBtn = {label:'Btn', accessor:'', defaultValue:'', options:{}, type:''} as IField; 

  // activeContext 
  const activeContext = useActive(datas, ifields); 
  

  // For debug purposes. 
  const displayDatas = <Arrx {...{values:datas}} > 
      <Elements>
        <ElementIndex/><ElementValue/><br/>
      </Elements>
    </Arrx>


  const Create = async (entry:any) => { 
    setDatas((prev:any[]) => { return [...prev, entry]; }) 
  }; 
  const Update = async (entry:any) => {
    setDatas((prev:any[]) => { 
      const newDatas = [...prev]; 
      const index = newDatas.findIndex( e => e['_id'] === entry['_id']); 
      if(index >=0 ) 
        newDatas[index] = entry; 
      return newDatas; 
    }) 
  }; 
  const Delete = async (entry:any) => {
    setDatas((prev:any[]) => { 
      const newDatas = [...prev]; 
      const index = newDatas.findIndex( e => e['_id'] === entry['_id']); 
      if(index >=0) 
        newDatas.splice(index, 1); 
      return newDatas; 
    }) 
  }; 


  const displayActive = <div>{JSON.stringify(activeContext.active)}</div> 
  // tablr
  const displayCrudTable = <ActiveContext.Provider value={activeContext} ><Tablr {...{datas}} > 
    <Header> 
      <Heads {...{ifields:[...ifields,colBtn, ]}} /> 
    </Header> 
    <tbody> 
      <Rows {...{rows}} > 
        <Cells {...{ifields}}> 
          <CellRenderer {...{renderers}} /> 
        </Cells> 
        <Cell {...{ifield:colBtn}} >
          <UpdateBtn {...{action:Update}} />
          <DeleteBtn {...{action:Delete}} />
        </Cell>
      </Rows> 
      <Row {...{row:-1}} > 
        <Cells {...{ifields}}> 
          <CellRenderer {...{renderers}} /> 
        </Cells>
        <Cell {...{ifield:colBtn}} > 
          <CreateBtn {...{action:Create}} /> 
        </Cell>
      </Row>
    </tbody>
  </Tablr></ActiveContext.Provider>

  // RENDER .....................................
  return <div> 
    <div>{displayDatas}</div> 
    <br/>
    {displayActive}
    <br/>
    <div>{displayCrudTable}</div> 
    <div><Paging {...{pageIndex, setPageIndex, pageIndexes, from, to}} /></div> 
  </div> 
}


// PAGING ---------------------------------------
function Paging({pageIndex, setPageIndex, pageIndexes}:IPageHook) { 
  return <div>
    {pageIndexes.map( (p, i) => { 
      return <button key={i} onClick={() => setPageIndex(i)} disabled={pageIndex===i} >
          {i+1}
        </button> 
    })} 
  </div>
}