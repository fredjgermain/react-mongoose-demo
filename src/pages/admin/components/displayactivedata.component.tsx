import {Objx, ObjxContext, Fields, Field, FieldContext, FieldLabel, FieldValue} from '../../../reusable/components/objx/_objx'; 


export function DisplayObjx({value, ifields}:{value:any, ifields:IField[]}) { 

  return 
    <Objx {...{value, ifields}}> 
      <Fields>
        <FieldLabel/> 
        <FieldValue/> 
        <br/>
      </Fields>
    </Objx>
}