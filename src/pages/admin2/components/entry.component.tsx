import React, { useContext } from 'react'; 
import { IUseEntry, useEntry } from '../useentry.hook'; 

import { Reader, Editor } from '../../../reusable/_input'; 
import { AdminContext } from '../admin.page'; 

import {GetSetAt, ReaderAt, EditorAt, Key, Keys} from '../../../reusable/components/objx2/objx.component'; 
import { GetValueAt, IsEmpty } from '../../../reusable/_utils'; 



// ENTRY ==================================================
export const EntryContext = React.createContext({} as IUseEntry)
export function Entry() { 
  const { GetFields } = useContext(AdminContext); 
  const context = useEntry(); 
  const { index, IsEditing, GetEntry, SetEntry, GetArgs, GetEditing } = context; 

  const Get = (keys?:TKey[]) => GetValueAt(GetEntry(), keys); 
  const Set = (newValue:any, keys?:TKey[]) => SetEntry(newValue, keys); 
  const Args = GetArgs; 

  const keys = GetFields().map( f => [f.accessor]); 
  const btn = ['btn']; 

  return <EntryContext.Provider value={context}> 
    <GetSetAt {...{Get, Set, Args}} > 
      <tr><Keys {...{keys}} > 
        <td> 
          {IsEditing() ? <EditorAt {...{editorFunc:Editor}} /> : <ReaderAt {...{readerFunc:Reader}} /> } 
        </td> 
      </Keys> 
      <Key k={btn}> 
        <td> 
          { IsEmpty(index) ? <InlineCreateBtn/> : <InlineUpdateDeleteBtn /> } 
        </td> 
      </Key> 
      </tr> 
    </GetSetAt>
  </EntryContext.Provider>
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
  const { GetEditing, SetEditing } = useContext(EntryContext); 

  const mode = GetEditing(); 
  if(mode === 'read') 
    return <span> 
      <button onClick={() => SetEditing(props.mode) }>{props.labels.affirm}</button>
    </span> 
  if(mode === props.mode) 
    return <span> 
      <button onClick={props.action}>{props.labels.confirm}</button> 
      <button onClick={() => SetEditing() }>{props.labels.cancel}</button> 
    </span> 
  return <span>{mode}</span>; 
}
