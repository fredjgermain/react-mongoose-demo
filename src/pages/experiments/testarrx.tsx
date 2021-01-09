import React, {useContext, useState, useEffect} from 'react'; 
import {Arrx, ArrxContext, Elements, Element, ElementContext, ElementIndex, ElementRead} from '../../reusable/arrx2/_arrx';
import {Objx, ObjxContext, Fields, Field, FieldContext, 
  FieldLabel, FieldRead, FieldEdit} from '../../reusable/objx2/_objx'; 
import {Input} from '../../reusable/input/_input'; 
import {OnEnter} from '../../reusable/utils/_utils';


import {usePage, IPageHook} from '../../reusable/usepage/usePage';



export function TestArrx() {   

  // Object
  const ifield = {type:'', accessor:'', defaultValue:'', label:'', options:{}} as IField; 
  const ifields:IField[] = [ 
    {...ifield, type:'number', accessor:'a', label:'A : ', defaultValue:0}, 
    {...ifield, type:'string', accessor:'b', label:'B : ', defaultValue:''}, 
  ]; 

  // Object-Array 
  const [datas, setDatas] = useState([
    {a:12, b:'a'}, 
    {a:13, b:'b'}, 
    {a:14, b:'c'}, 
    {a:15, b:'d'}, 
    {a:16, b:'e'}, 
    {a:17, b:'f'}, 
    {a:18, b:'g'}, 
    {a:15, b:'h'}, 
    {a:16, b:'i'}, 
    {a:17, b:'j'}, 
    {a:18, b:'k'} 
  ]); 
  
  const {pageIndex, setPageIndex, from, to, pageIndexes} = usePage(datas, 5); 
  const page = Array.from({length: to-from}, (v, k) => k+from); 

  return <div>
    <div>{JSON.stringify(datas)}</div>
    <Arrx {...{type:'', values:datas, defaultValue:{}}} > 
      <Elements indexes={page} > 
        <ElementIndex /> 
        <Fields {...{ifields}}> 
          <NestedEdit {...{setValues:setDatas}} /> 
        </Fields> 
        <br/>
      </Elements>
    </Arrx>
    <Paging {...{from, to, pageIndex, setPageIndex, pageIndexes}}/>
  </div>
} 


interface NestedEdit extends React.HTMLAttributes<HTMLInputElement> {
  setValues:any; 
}



function NestedEdit({setValues, ...props}:React.PropsWithChildren<NestedEdit>) { 
  const {ReadElement} = useContext(ArrxContext); 
  const {ReadField} = useContext(ObjxContext); 
  const {index} = useContext(ElementContext); 
  const {ifield} = useContext(FieldContext); 

  const Value = ReadElement(index)[ifield.accessor]; 
  const [value, setValue] = useState(Value); 

  const {type, defaultValue} = ifield; 

  const onKeyUp = (event:any) => OnEnter(event, () => { 
    setValues((prev:any) => { 
      const copyelem = {...prev[index]}; 
      copyelem[ifield.accessor] = value; 
      const copy = [...prev]; 
      copy[index] = copyelem; 
      return copy; 
    }); 
  }); 

  return <Input {...{type, value, setValue, defaultValue, onKeyUp, ...props}} /> 
}


function Paging({from, to, pageIndex, setPageIndex, pageIndexes}:IPageHook) { 
  return <div>
    {pageIndexes.map( (p, i) => { 
      return <button key={i} onClick={() => setPageIndex(i)} disabled={pageIndex===i} >
          {i+1}
        </button> 
    })} 
  </div>
}

/*
function ElementObjx({ifields, children}:React.PropsWithChildren<{ifields:IField[]}>) { 
  const {ReadElement: Read, UpdateElement: Update} = useContext(ArrxContext); 
  const {index} = useContext(ElementContext); 
  const value = Read(index); 
  const setValue = (newValue:any) => Update(newValue, index); 

  return <Objx {...{value, setValue, ifields}} > 
    {children}
  </Objx>
}
*/
/*

  const test = <div> 
      <div> 
        <div>OBJX</div>
        <Objx {...{ifields, value, setValue}}> 
          <Fields> 
            <FieldLabel/> 
            <FieldRead/> 
            <FieldEdit/> 
            <br/> 
          </Fields>
        </Objx>
      </div>
      <div>
      <div>ARRX</div>
      <Arrx {...{type:'string', values, setValues, defaultValue:''}} > 
        <Elements> 
          <ElementIndex /> 
          <ElementRead /> 
          <ElementUpdate /> 
          <ElementDelete /> 
          <br/> 
        </Elements> 
        + <ElementCreate /> 
      </Arrx> 
      </div>
    </div>

*/