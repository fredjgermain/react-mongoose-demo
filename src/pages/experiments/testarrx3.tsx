import React, {useContext, useState} from 'react'; 
import {Arrx, ArrxContext, Elements, Element, ElementContext} from '../../reusable/arrx3/arrx.component'; 
import {Objx, ObjxContext, Fields, Field, FieldContext} from '../../reusable/arrx3/objx.component'; 
import {Copy, Edit, Read, OnEnter} from '../../reusable/utils/_utils'; 
import {Input} from '../../reusable/input/_input';

export function TestArrx() { 
  
  // Object
  const ifield = {type:'', accessor:'', defaultValue:'', label:'', options:{}} as IField; 
  const ifields:IField[] = [ 
    {...ifield, type:'number', accessor:'a', label:'A : ', defaultValue:0}, 
    {...ifield, type:'string', accessor:'b', label:'B : ', defaultValue:''}, 
  ]; 
  const [value, setValue] = useState({a:12, b:'a'}); 

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
  
  /*const {pageIndex, setPageIndex, from, to, pageIndexes} = usePage(datas, 5); 
  const page = Array.from({length: to-from}, (v, k) => k+from); */

  return <div> 
    <div>{JSON.stringify(datas)}</div> 
    <Arrx {...{type:'', values:datas, defaultValue:{}}} > 
      <Elements> 
        <ElementIndex/> 
        <ElementObjx {...{ifields}} > 
          <Fields>
            <FieldValue /> 
            <FieldEdit {...{setValue:setDatas}}/> 
          </Fields>          
        </ElementObjx>
        <br/> 
      </Elements> 
    </Arrx>
    
  </div>
}


function ElementObjx({ifields, children}:React.PropsWithChildren<{ifields:IField[]}>) { 
  const {values} = useContext(ArrxContext); 
  const {index} = useContext(ElementContext); 

  return <Objx {...{value:values[index], ifields}} > 
    {children} 
  </Objx> 
}

function ElementIndex() { 
  const {index} = useContext(ElementContext); 
  return <span>{index}. </span> 
} 

function ElementValue() { 
  const {values} = useContext(ArrxContext); 
  const {index} = useContext(ElementContext); 
  return <span>{JSON.stringify(values[index])}</span> 
} 

function FieldValue() { 
  const {value} = useContext(ObjxContext); 
  const {ifield} = useContext(FieldContext); 
  return <span>{JSON.stringify(value[ifield.accessor])}</span> 
} 

function FieldEdit({setValue:SetValue}:{setValue:any}) { 
  const {values} = useContext(ArrxContext); 
  const {index} = useContext(ElementContext); 
  const {ifield} = useContext(FieldContext); 
  const _value = values[index][ifield.accessor]; 

  const [value, setValue] = useState(_value); 

  const onKeyUp = (event:any) => OnEnter(event, () => { 
    SetValue((prev:any) => { 
      const editedElement = Edit(values[index], value, ifield.accessor); 
      return Edit(values, editedElement, index); 
    })
    
    //console.log(edited); 

    /*SetValue((prev:any) => { 
      console.log(prev[index]) 
      const element = Edit(prev[index], value, ifield.accessor); 
      console.log(Edit(prev, element, index)); 
      return Edit(prev, element, index); 
    })*/
  })
    
    /*  const prevfield = prev[index][ifield.accessor]; 
      console.log(prevfield); 
      //const element = Edit(prev[index][ifield.accessor], value, ifield.accessor); 
      //console.log(Edit(prev[index], element, index)); 
      //return Edit(prev[index], element, index); 
    }) */
  return <Input {...{value, setValue, onKeyUp}} /> 
}