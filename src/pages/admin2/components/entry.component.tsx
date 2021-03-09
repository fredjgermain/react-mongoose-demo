import React, { useContext } from 'react'; 
import { IUseEntry, useEntry } from '../useentry.hook'; 
import { Reader, Editor } from '../../../reusable/_input'; 
import { AdminContext } from '../admin.page'; 
import { DaoContext } from '../../../reusable/_dao';


// ENTRY ==================================================
export const EntryContext = React.createContext({} as IUseEntry) 
export function Entry({index}:{index:number}) { 
  const {GetIOptions} = useContext(DaoContext); 
  const context = useEntry(index); 
  const {editMode, Get, Set, Args, GetColumnsIField} = context; 
  const isCreateUpdate = ['create', 'update'].includes(editMode); 
  const ifields = GetColumnsIField(); 

  function Cell(ifield:IField) { 
    const value = Get([ifield.accessor]); 
    const setValue = (newValue:any) => Set(newValue, [ifield.accessor]); 
    const options = GetIOptions(ifield); 
    return isCreateUpdate ? <Editor {...{value, setValue, ifield, options}} /> : <Reader {...{value, ifield, options}} /> 
  }

  return <EntryContext.Provider value={context}> 
    <tr> 
      {ifields.map( ifield => <td key={ifield.accessor}>{Cell(ifield)}</td> )} 
      <td> 
        {index > -1 ? <InlineUpdateDeleteBtn/>: <InlineCreateBtn/>} 
      </td> 
    </tr> 
  </EntryContext.Provider>
}


export const IndexedContext = React.createContext({} as {value:any}); 
export const IndexesContext = React.createContext({} as any); 
export const IndexContext = React.createContext({} as {index:number|string}); 

export function Indexed({value, children}:React.PropsWithChildren<{value:any}>) { 
  return <IndexedContext.Provider value={{value}}> 
    {children} 
  </IndexedContext.Provider> 
} 

export function Indexes({indexes, children}:React.PropsWithChildren<{indexes:(string|number)[]}>) { 
  return <IndexesContext.Provider value={{}}> 
    {indexes.map( index => { 
      return <Index key={index} index={index}> 
        {children} 
      </Index> 
    })} 
    {children} 
  </IndexesContext.Provider> 
} 

export function Index({index, children}:React.PropsWithChildren<{index:(string|number)}>) { 
  return <IndexContext.Provider value={{index}} > 
    {children} 
  </IndexContext.Provider> 
}


export function InlineCreateBtn() {
  const {CreateUpdateEntry} = useContext(EntryContext); 
  const CreateBtn = {mode:'create', action:CreateUpdateEntry, labels:{affirm:'Create', confirm:'Confirm', cancel:'Cancel'}} 

  return <span> 
    <InlineBtn {...CreateBtn}/> 
  </span> 
}


export function InlineUpdateDeleteBtn() { 
  const {CreateUpdateEntry, DeleteEntry} = useContext(EntryContext); 
  const UpdateBtn = {mode:'update', action:CreateUpdateEntry, labels:{affirm:'Update', confirm:'Confirm', cancel:'Cancel'}} 
  const DeleteBtn = {mode:'delete', action:DeleteEntry, labels:{affirm:'Delete', confirm:'Confirm', cancel:'Cancel'}} 

  return <span> 
    <InlineBtn {...UpdateBtn} /> 
    <InlineBtn {...DeleteBtn} /> 
  </span> 
} 

export function InlineBtn({...props}:{mode:string, labels:{affirm:string, confirm:string, cancel:string}, action:()=>Promise<void>}) { 
  const {editMode, index} = useContext(EntryContext); 
  const {SetEditingMode} = useContext(AdminContext); 

  if(editMode === 'read') 
    return <span> 
      {editMode}
      <button onClick={() => SetEditingMode(index, props.mode) }>{props.labels.affirm}</button>
    </span> 
  if(editMode === props.mode) 
    return <span> 
      {editMode}
      <button onClick={props.action}>{props.labels.confirm}</button> 
      <button onClick={() => SetEditingMode() }>{props.labels.cancel}</button> 
    </span> 
  return <span>{editMode}</span>; 
}
