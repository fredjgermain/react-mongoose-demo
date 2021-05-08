import { InputSelect } from '../../_inputs'; 
import { useStateReset } from '../../_customhooks'; 


export function useColumnsSelector(cols:string[]) { 
  const [columns, SetColumns, ResetColumns] = useStateReset(cols); 
  return {columns, SetColumns, ResetColumns} 
} 

export function ColumnSelector({_columns, columns, SetColumns, ResetColumns}:{
    _columns:string[]; 
    columns: string[]; 
    SetColumns: (newValue: string[]) => void; 
    ResetColumns: () => void; 
  }) { 
  const options:IOption[] = _columns.map( col => { 
    return {label:col, value:col} as IOption; 
  }); 

  console.log(_columns); 
  
  return <InputSelect {...{value:columns, onSetValue:SetColumns, options, multiple:true}} /> 
} 