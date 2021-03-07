import React, { useContext } from 'react'; 
import { useAdmin, IUseAdmin, TEditingState } from './useadmin.hook'; 
import { IUseEntry, useEntry } from './useentry.hook'; 

import { Select, Reader, Editor } from '../../reusable/_input'; 
import { Arrx, Elements, ElementContext, Element } from '../../reusable/_arrx'; 
import { Objx, Fields, Field, FieldReader, FieldEditor } from '../../reusable/_objx'; 
import { IsEmpty } from '../../reusable/_utils';

import '../../css/table.css'; 

/* 
- title 
- CollectionSelector. 
- AdminTablr once a collection has been selected. 
*/ 
export const AdminContext = React.createContext({} as IUseAdmin); 
export default function AdminPage() { 
  const context = useAdmin(); 
  return <AdminContext.Provider value={context}> 
    <h2>Admin section</h2> 
    <CollectionSelector/> 
    {!IsEmpty(context.GetCollection()) && <AdminTablr/>} 
  </AdminContext.Provider> 
} 

export function CollectionSelector() { 
  const {Get, Set, GetCollectionOptions} = useContext(AdminContext); 
  const value = Get(['collection']); 
  const setValue = (newValue:string) => Set(newValue, ['collection']); 
  const ifield:IField = {accessor:'', label:'', defaultValue:'', type:'string'}; 
  const options = GetCollectionOptions(); 

  return <Select {...{value, setValue, ifield, options}} /> 
} 


export function AdminTablr() { 
  console.log('admintablr'); 
  const {GetCollection, GetEntries} = useContext(AdminContext); 
  const values = GetEntries(); 
  const collectionLabel = GetCollection()?.label; 

  return <div> 
    <h3>{collectionLabel}</h3> 
    <EditingState/> 
    <table> 
      <tbody><Arrx {...{values}}> 
          <Elements><Entry/></Elements> 
          <Element index={-1} ><Entry/></Element> 
      </Arrx></tbody> 
    </table> 
  </div> 
} 


export function Entry() { 
  const { GetFields } = useContext(AdminContext); 
  const { IsEditing, GetEntry, SetEntry } = useEntry(); 
  const {index} = useContext(ElementContext); 

  const value = GetEntry(); 
  const setValue = SetEntry; 
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


export function EditingState() {
  const {Get} = useContext(AdminContext); 
  const {collection, entry, mode} = Get() as TEditingState; 

  return <div> 
    Collection: {collection} <br/> 
    Entry: {JSON.stringify(entry)} <br/> 
    Mode: {mode} <br/> 
  </div>
}