import React, { useContext, useState } from 'react'; 
import {Tablr, TablrContext, 
  Rows, Row, RowContext, 
  Cells, Cell, CellContext, 
  Header, Heads, Head, HeadContext} from '../../reusable/components/tablr/_tablr'; 

import {Input} from '../../reusable/components/input/_input';
import {Arrx, ArrxContext, 
  Elements, Element, 
  ElementContext, ElementIndex, ElementValue
} from '../../reusable/components/arrx/_arrx'; 

import {usePage, IPageHook} from '../../reusable/hooks/usepage/usePage'; 


// Mock data
// Ifields
const ifield = {type:'', accessor:'', defaultValue:'', label:'', options:{}} as IField; 
const ifields:IField[] = [ 
  {...ifield, type:'string', accessor:'_id', label:'Id'}, 
  {...ifield, type:'number', accessor:'age', label:'Age', defaultValue:0}, 
  {...ifield, type:'string', accessor:'firstName', label:'First name'}, 
  {...ifield, type:'string', accessor:'lastName', label:'Last name'}, 
  {...ifield, type:'string', accessor:'title', label:'Title'}, 
]; 

// Data
const Datas = [ 
  {_id:'id1', age:12, firstName:'a', lastName:'last name a', title:'title a'}, 
  {_id:'id2', age:13, firstName:'b', lastName:'last name b', title:'title b'}, 
  {_id:'id3', age:14, firstName:'c', lastName:'last name c', title:'title c'}, 
  {_id:'id4', age:15, firstName:'d', lastName:'last name d', title:'title d'}, 
  {_id:'id5', age:16, firstName:'e', lastName:'last name e', title:'title e'}, 
  {_id:'id6', age:17, firstName:'f', lastName:'last name f', title:'title f'}, 
  {_id:'id7', age:18, firstName:'g', lastName:'last name g', title:'title g'}, 
  {_id:'id8', age:15, firstName:'h', lastName:'last name h', title:'title h'}, 
  {_id:'id9', age:16, firstName:'i', lastName:'last name i', title:'title i'}, 
  {_id:'id10', age:17, firstName:'j', lastName:'last name j', title:'title j'}, 
  {_id:'id11', age:18, firstName:'k', lastName:'last name k', title:'title k'} 
]; 


// TEST TABLR ====================================
export function TestTablr() { 
  const [datas, setDatas] = useState(Datas); 
  const {pageIndex, setPageIndex, pageIndexes, from, to} = usePage(datas, 5); 
  const rows = datas.map((v,i) => i).filter((i) => i >=from && i<=to); 

  return <div> 
    <div><Arrx {...{values:datas}} > 
      <Elements>
        <ElementIndex/>
        <ElementValue/>
        <br/>
      </Elements>
    </Arrx></div> 
    <div> 
      <Tablr {...{datas}} > 
        <Header> 
          <Heads {...{ifields}} /> 
        </Header> 
        <Rows {...{rows}} > 
          <Cells {...{ifields}}> 
            <TablrInput {...{setDatas}} /> 
          </Cells> 
        </Rows> 
      </Tablr>
      <Paging {...{pageIndex, setPageIndex, pageIndexes, from, to}} />
    </div> 
  </div> 
}



function TablrInput({setDatas}:{setDatas:React.Dispatch<any>}) { 
  const {value:_value, row, ifield} = useContext(CellContext); 
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


function Paging({pageIndex, setPageIndex, pageIndexes}:IPageHook) { 
  return <div>
    {pageIndexes.map( (p, i) => { 
      return <button key={i} onClick={() => setPageIndex(i)} disabled={pageIndex===i} >
          {i+1}
        </button> 
    })} 
  </div>
}