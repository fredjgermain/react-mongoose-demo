import React, {useContext, useState} from 'react'; 
import {Arrx, ArrxContext, Elements, Element, ElementContext,
  ElementIndex, ElementCreate, ElementRead, ElementUpdate, ElementDelete} from '../../reusable/arrx2/_arrx';
import {Objx, ObjxContext, Fields, Field, FieldContext, 
  FieldLabel, FieldRead, FieldEdit} from '../../reusable/objx2/_objx'; 


export function TestArrx() { 
  // Array
  const [values, setValues] = useState(['a','b','c','d']); 

  // Object
  const ifield = {type:'', accessor:'', defaultValue:'', label:'', options:{}} as IField; 
  const ifields:IField[] = [ 
    {...ifield, type:'number', accessor:'a', label:'A : ', defaultValue:0}, 
    {...ifield, type:'string', accessor:'b', label:'B : '}, 
  ]; 
  const [value, setValue] = useState({a:12, b:'a'}); 

  // Object-Array 
  const [objs, setObjs] = useState([{a:12, b:'a'}, {a:13, b:'b'}, {a:14, b:'c'}]); 

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

  return <div>
    <div>{JSON.stringify(objs)}</div>
    <Arrx {...{type:'', values:objs, setValues:setObjs, defaultValue:{}}} > 
      <Elements> 
        <ElementIndex /> 
        <ElementObjx {...{ifields}}> 
          <Fields>
            <FieldLabel/> 
            <FieldRead/> 
            <FieldEdit/>
          </Fields>
        </ElementObjx>
        <br/>
      </Elements>
    </Arrx>
  </div>
} 

function ElementObjx({ifields, children}:React.PropsWithChildren<{ifields:IField[]}>) { 
  const {Read, Update} = useContext(ArrxContext); 
  const {index} = useContext(ElementContext); 
  const value = Read(index); 
  const setValue = (newValueFunc:any) => { 
    Update(newValueFunc(value), index); 
  }
  //const [value, setValue] = useState(Read(index)); 

  return <Objx {...{value, setValue, ifields}} > 
    {children}
  </Objx>
  //const 
}