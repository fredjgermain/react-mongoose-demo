import React, { useContext, useState } from 'react'; 
import {Tablr, Rows, Row, RowContext, Cells, CellContext, Header, Heads, Cell} 
  from '../../../reusable/components/tablr/_tablr'; 
import {Input} from '../../../reusable/components/input/_input'; 
import {Arrx, Elements, ElementIndex, ElementValue} 
  from '../../../reusable/components/arrx/_arrx'; 
import {usePage, IPageHook} from '../../../reusable/hooks/usepage/usePage'; 
import {ifields, Datas} from './mockdata'; 

import './table.css'; 
import {IUseActive, useActive} from '../../../reusable/hooks/useactive/_useactive'; 
import {CreateBtn, UpdateBtn, DeleteBtn} from './crudbtn.component'; 



export const ActiveContext = React.createContext({} as IUseActive); 
// TEST TABLR ====================================
export function TestTablr() { 
  const [datas, setDatas] = useState(Datas); 
  
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
          <CellContent {...{setDatas}} /> 
        </Cells> 
        <Cell {...{ifield:colBtn}} >
          <UpdateBtn {...{action:Update}} />
          <DeleteBtn {...{action:Delete}} />
        </Cell>
      </Rows> 
      <Row {...{row:-1}} > 
        <Cells {...{ifields}}> 
          <CellContent {...{setDatas}} /> 
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



export function CellContent({setDatas}:{setDatas:React.Dispatch<any>}) { 
  const {value, row} = useContext(CellContext); 
  const {active, SetData} = useContext(ActiveContext); 
  const isActive = active.row === row; 
  const isEdit = (active.mode === 'create' || active.mode === 'update') && isActive; 

  // Cell Context -------------------------------
  return <span>
    {!isEdit && JSON.stringify(value)} 
    {isEdit && <CellInput />} 
  </span>
}


function CellInput() { 
  const {active:{data}, SetData} = useContext(ActiveContext); 
  const {ifield:{accessor, type, defaultValue}} = useContext(CellContext); 

  const value = data[accessor]; 
  const setValue = (newValue:any) => { 
    const newData = {...data}; 
    newData[accessor] = newValue; 
    SetData(newData); 
  }; 

  return <Input {...{value, setValue, type, defaultValue}} /> 
}


function TablrInput({setDatas}:{setDatas:React.Dispatch<any>}) { 
  const {value:_value, row, ifield} = useContext(CellContext); 
  const {SetData} = useContext(ActiveContext); 
  const {type, defaultValue} = ifield; 

  const [value, setValue] = useState(_value); 
  
  const onEnterUp = () => { 
    setDatas((prev:any) => { 
      const newElement = {...prev[row]}; 
      newElement[ifield.accessor] = value; 
      prev[row] = newElement; 
      return [...prev]; 
    }); 
  }

  return <Input {...{value, setValue, type, defaultValue, onEnterUp}} /> 
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