import React, { useContext } from 'react'; 
import { IUseEntry, useEntry } from '../useentry.hook'; 

import { Reader, Editor } from '../../../reusable/_input'; 
import { Arrx, Elements, ElementContext, Element } from '../../../reusable/_arrx'; 
import { Objx, Fields, Field, FieldReader, FieldEditor } from '../../../reusable/_objx'; 
import { AdminContext } from '../admin.page'; 

import {GetSetAt, ReaderAt, EditorAt, Key, Keys, KeyString, KeyValue} from '../../../reusable/components/objx2/objx.component'; 
import { useStateAt } from '../../../reusable/_customhooks';
import { GetValueAt } from '../../../reusable/_utils';



// ENTRY ==================================================
export function Entry2() {
  const { GetFields } = useContext(AdminContext); 
  const { IsEditing, GetEntry, SetEntry, GetArgs } = useEntry(); 
  const {index} = useContext(ElementContext); 

  const _value = GetEntry(); 
  const Get = (keys?:TKey[]) => GetValueAt(_value, keys); 
  const Set = (newValue:any, keys?:TKey[]) => SetEntry(newValue, keys); 
  const Args = GetArgs; 

  const keys = GetFields().map( f => [f.accessor]); 
  const btn = ['btn']; 

  // 
  return <GetSetAt {...{Get, Set, Args}} > 
    <tr><Keys {...{keys}} > 
      <td> 
        {IsEditing() ? <EditorAt {...{editorFunc:Editor}} /> : <ReaderAt {...{readerFunc:Reader}} /> } 
      </td> 
    </Keys> 
    <Key k={btn}> 
      <td> 
      {index >= 0 ? <InlineUpdateDeleteBtn />: <InlineCreateBtn/> } 
      </td> 
    </Key> 
    </tr> 
  </GetSetAt>
}


export function Entry() { 
  const { GetFields } = useContext(AdminContext); 
  const { IsEditing, GetEntry, SetEntry } = useEntry(); 
  const {index} = useContext(ElementContext); 

  const value = GetEntry(); 

  
  const setValue = (newValue:any) => console.log(newValue); 
  const ifields = GetFields(); 
  const btn:IField = {accessor:'', defaultValue:'', label:'btn', type:''}; 

  return <Objx {...{value, ifields}}> 
    <tr><Fields> 
      <td> 
        {IsEditing() ? <FieldEditor {...{setValue, editorFunc:Editor}} /> : <FieldReader {...{readerFunc:Reader}} /> } 
      </td> 
    </Fields> 
    <Field ifield={btn}> 
      <td> 
      {index >= 0 ? <InlineUpdateDeleteBtn />: <InlineCreateBtn/> } 
      </td> 
    </Field> 
    </tr> 
  </Objx> 
} 

export function InlineCreateBtn() {
  const {CreateUpdateEntry} = useContext(AdminContext); 
  const CreateBtn = {mode:'create', action:CreateUpdateEntry, labels:{affirm:'Create', confirm:'Confirm', cancel:'Cancel'}} 

  return <span> 
    <InlineBtn {...CreateBtn}/> 
  </span> 
}


export function InlineUpdateDeleteBtn() { 
  const {CreateUpdateEntry, DeleteEntry} = useContext(AdminContext); 
  const UpdateBtn = {mode:'update', action:CreateUpdateEntry, labels:{affirm:'Update', confirm:'Confirm', cancel:'Cancel'}} 
  const DeleteBtn = {mode:'delete', action:DeleteEntry, labels:{affirm:'Delete', confirm:'Confirm', cancel:'Cancel'}} 

  return <span> 
    <InlineBtn {...UpdateBtn} /> 
    <InlineBtn {...DeleteBtn} /> 
  </span> 
} 

export function InlineBtn({...props}:{mode:string, labels:{affirm:string, confirm:string, cancel:string}, action:()=>Promise<void>}) { 
  const { GetEditing, SetEditing } = useEntry(); 

  const mode = GetEditing(); 
  console.log(mode); 
  if(mode === 'read') 
    return <span><button onClick={() => SetEditing(props.mode) }>{props.labels.affirm}</button></span> 
  if(mode === props.mode) 
    return <span> 
      <button onClick={props.action}>{props.labels.confirm}</button> 
      <button onClick={() => SetEditing() }>{props.labels.cancel}</button> 
    </span> 
  return <span></span>; 
}
