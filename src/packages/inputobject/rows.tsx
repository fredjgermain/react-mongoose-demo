import React, {useContext} from 'react'; 
import {TableContext} from './table'; 
import {Package_FieldRendering} from '../../custompackages'; 
type IFieldRendering = Package_FieldRendering.IFieldRendering; 

interface IProps { 
  fieldRenderings:IFieldRendering[]; 
} 
// FieldRenderer =====================================
export function Cell({fieldRenderings}:IProps) { 
  const {entries, activeEntry, setActiveEntry} = useContext(TableContext); 
  const {row} = useContext(RowContext); 
  const {ifield} = useContext(CellContext); 

  const fieldRendering = fieldRenderings.find( f => f.predicate(ifield, '') ); 
  const defaultRenderer = (value:any, onSendValue:any) => <span>{JSON.stringify(value)}</span>; 
  const Renderer = fieldRendering? fieldRendering.renderer(ifield): defaultRenderer; 

  let value; 
  if(row !== undefined && row >=0) 
    value = entries[row][ifield.accessor];  // or default value as given by colsettings 
  value = value ?? ifield.defaultValue; 

  // TEMP ..............................
  const SetActiveEntry = (newValue:any, ifield:IField) => { 
    const copy = {...activeEntry}; 
    copy[ifield.accessor] = newValue; 
    setActiveEntry(copy); 
  }
  // TEMP ..............................
  

  const onSendValue = (newValue:any) => SetActiveEntry(newValue, ifield); 
  // RENDER -------------------------------------
  return <span>{Renderer(value, onSendValue)} </span>
} 



interface ICellContext {
  ifield:IField; 
}
export const CellContext = React.createContext({} as ICellContext); 

const CellsContext = React.createContext({}); 
export function Cells({children}:React.PropsWithChildren<any>) { 
  const {columnSettings} = useContext(TableContext); 

  return <CellsContext.Provider value={{}}> 
    {columnSettings.map( (col, i) => { 
      const context = {ifield:col}; 
      return <td key={i}> 
        <CellContext.Provider value={context}> 
          {children} 
        </CellContext.Provider> 
      </td> 
    })} 
  </CellsContext.Provider> 
} 


const RowsContext = React.createContext({} as any); 
interface IRows { 
  rows?: number[]; 
} 
// Input Rows ===================================
export function Rows({rows, children}:React.PropsWithChildren<IRows>) { 
  const {entries} = useContext(TableContext); 
  const Rows = (entries === undefined) ? [] : 
    (rows !== undefined) ? rows: entries.map((v,i) => i); 
  
  return <RowsContext.Provider value={{}}>
    {Rows.map((row, i) => {
      return <Row key={i} {...{row, children}} /> 
    })}
  </RowsContext.Provider>
} 



interface IRowContext { 
  row?: number; 
} 
export const RowContext = React.createContext({} as IRowContext); 
// Input Row ==================================== 
interface IRow { 
  row?: number; 
} 
export function Row({row, children}:React.PropsWithChildren<IRow>) { 
  const context = {row} as IRowContext; 
  return <RowContext.Provider value={context} > 
    <tr> 
      {children} 
    </tr> 
  </RowContext.Provider>; 
}