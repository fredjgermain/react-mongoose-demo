import React from 'react'; 
import {ITableHook, useInputTable} from '../hook/usetable'; 
import {useColumnSetting} from '../hook/useColumnSetting'; 
import {IColumnSetting} from '../colsetting/columnsetting'; 


// INPUT TABLE ==================================
interface IInputTableContext{ 
  tableHook:ITableHook; 
  columnSettings: {
    GetColumnSettings: (handle?:string) => IColumnSetting[]; 
    FilterColumns: (columns:string[]) => void; 
  } 
} 
export const InputTableContext = React.createContext({} as IInputTableContext); 
interface IInputTable{ 
  entries: any[]; 
  colsetting: IColumnSetting[]; 
} 
export default function InputTable({entries, colsetting, children}: React.PropsWithChildren<IInputTable>) { 
  const tableHook = useInputTable(entries); 
  const columnSettings = useColumnSetting(colsetting); 

  // RENDER -------------------------------------
  const context = {tableHook, columnSettings} as IInputTableContext; 
  
  return <InputTableContext.Provider value={context} > 
      <div>{JSON.stringify([tableHook.activeMode, tableHook.activeRow])}</div> 
      <div>{JSON.stringify(tableHook.activeEntry)}</div> 
      <table>{children}</table> 
    </InputTableContext.Provider> 
}