import { useEffect, useState } from 'react'; 
//import { IFieldSetting, CrudFunc } from "./columsetting/columsetter"; 


export interface ITableStatus { 
  entries: IEntry[]; 
  activeEntry:IEntry; 
  activeRow:number; 
  activeMode:string; 
}
export interface ITableHook extends ITableStatus{ 
  setActiveEntry:any; 
  setActiveRow: any; 
  setActiveMode:any; 
  CrudAction: (crudFunc:CrudFunc) => Promise<void>; 
  SetActiveEntry: (newValue:any, ifield:IField) => void; 
  GetActiveHook: (row?:number) => string; 
  ActivateHook: (mode?:string, row?:number) => void; 
  ResetActiveHooks: () => void; 
} 

/// useInputTable
export function useInputTable(entries:IEntry[]):ITableHook { 
  const [activeEntry, setActiveEntry] = useState<IEntry>({} as IEntry); 
  const [activeRow, setActiveRow] = useState(-1); 
  const [activeMode, setActiveMode] = useState('read'); 

  useEffect(() => { 
    if(activeMode != 'read' || activeRow != -1) 
    ResetActiveHooks(); 
  },[entries]); 

  const CrudAction = async (crudFunc:CrudFunc) => { 
    if(await crudFunc(activeEntry)) 
      ResetActiveHooks(); 
  } 

  const SetActiveEntry = (newValue:any, ifield:IField) => { 
    const newEntries = {...activeEntry}; 
    newEntries[ifield.accessor as any] = newValue; 
    setActiveEntry(newEntries); 
  } 

  const GetActiveHook = (row?:number) => { 
    if(row != undefined && activeRow === row) 
      return activeMode; 
    return ''; 
  }

  const ActivateHook = (mode:string = 'read', row:number =-1) => { 
    const entry = entries[row] ?? {}; 
    setActiveMode(mode); 
    setActiveRow(row); 
    setActiveEntry(entry); 
  } 

  const ResetActiveHooks = () => { 
    setActiveEntry({} as IEntry); 
    setActiveRow(-1); 
    setActiveMode('read'); 
  } 

  const tableHook = {entries, activeEntry, setActiveEntry, activeRow, setActiveRow, activeMode, setActiveMode, 
    SetActiveEntry, CrudAction, GetActiveHook, ActivateHook, ResetActiveHooks} as ITableHook; 


  return {...tableHook}; 
} 