import React, { useContext } from 'react'; 
import {InputTableContext} from './inputtable'; 
import {IColumnSetting} from '../common'; 
//import {I} from './columsetter'; 
import {InputRowContext} from './inputrows'; 


interface IInputCellsContext{} 
const InputCellsContext = React.createContext({} as IInputCellsContext); 
// INPUT CELLS ==================================
export function InputCells() { 
  const {tableHook:{GetActiveHook}, columnSettings:{GetColumnSettings}} = useContext(InputTableContext); 
  const {row} = useContext(InputRowContext); 

  // pick the right column setting depending on activeRow and ModeHook 
  const columnSettings = GetColumnSettings(GetActiveHook(row)); 

  // RENDER -------------------------------------
  return <InputCellsContext.Provider value={{}}> 
      {columnSettings.map( (column, i) => { 
      return <InputCell key={i} {...{column}} /> 
    })} 
    </InputCellsContext.Provider> 
} 


// INPUT CELL ====================================
interface IInputCell { 
  column: IColumnSetting; 
} 
export function InputCell({column}: IInputCell) { 
  const {tableHook:{entries, SetActiveEntry}} = useContext(InputTableContext); 
  const {row} = useContext(InputRowContext); 
  const {ifield, renderer} = column; 
  
  let value; 
  if(row !== undefined && row >=0) 
    value = entries[row][ifield.accessor];  // or default value as given by colsettings 
  value = value ?? ifield.defaultValue; 
  
  const onSendValue = (newValue:any) => SetActiveEntry(newValue, ifield); 
  // RENDER -------------------------------------
  return <td> 
    {renderer(value, onSendValue)} 
  </td> 
} 