import { useState } from 'react'; 
import { IUseColumn } from '../_table'; 


export function useColumn(defaultColumns:string[]):IUseColumn { 
  const [columns, setColumns] = useState(defaultColumns); 
  const SetColumns = (newColumns:string[]) => setColumns(newColumns); 
  return {columns, SetColumns}; 
}
