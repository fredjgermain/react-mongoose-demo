import React, {useContext, useState} from 'react'; 
import {Arrx, ArrxContext, Elements, Element, ElementContext, ElementIndex} from '../../reusable/components/arrx/_arrx'; 
import {Objx, ObjxContext, Fields, Field, FieldContext, FieldLabel, FieldValue, ArrxObjx} from '../../reusable/components/objx/_objx'; 
import {Input} from '../../reusable/components/input/_input'; 
import {OnEnter} from '../../reusable/utils/_utils'; 
import { ElementValue } from '../../reusable/components/arrx/arrx.component';



// TEST ARRX ====================================
export function TestArrx() {
  // Ifields
  const ifield = {type:'', accessor:'', defaultValue:'', label:'', options:{}} as IField; 
  const ifields:IField[] = [ 
    {...ifield, type:'number', accessor:'a', label:'A : ', defaultValue:0}, 
    {...ifield, type:'string', accessor:'b', label:'B : ', defaultValue:''}, 
  ]; 

  // Data
  const Datas = [
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
  ]; 

  const [datas, setDatas] = useState(Datas); 

  return <div> 
    <Arrx {...{values:datas}} > 
      <Elements>
        <ElementIndex/>
        <ElementValue/>
        <br/>
      </Elements>
    </Arrx>

    
    <Arrx {...{values:datas}} > 
      <Elements>
        <ElementIndex />
        <ArrxObjx {...{ifields}}> 
          <Fields>
            [ <FieldLabel/> = <FieldValue/> ]
            <FieldEdit {...{setValues:setDatas}}/>
          </Fields>
          <br/>
        </ArrxObjx>
      </Elements> 
    </Arrx>
  </div>
}


interface IFieldEdit {setValues:any}
function FieldEdit({setValues}:IFieldEdit) { 
  const {values} = useContext(ArrxContext); 
  const {index} = useContext(ElementContext); 
  const {ifield} = useContext(FieldContext); 

  const [value, setValue] = useState(values[index][ifield.accessor]); 
  const {type, defaultValue} = ifield; 
  
  const onEnterUp = () => { 
    setValues((prev:any) => { 
      const newElement = {...prev[index]}; 
      newElement[ifield.accessor] = value; 
      prev[index] = newElement; 
      return [...prev]; 
    }); 
  }

  return <Input {...{value, setValue, type, defaultValue, onEnterUp}} />
}