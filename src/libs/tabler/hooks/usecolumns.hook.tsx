import { useState } from 'react'; 


export interface IUseColumn { 
  columns: string[]; 
  SetColumns: (fields: string[]) => void; 
} 

export function useColumn(defaultColumns:string[]):IUseColumn { 
  const [columns, setColumns] = useState(defaultColumns); 
  const SetColumns = (newColumns:string[]) => setColumns(newColumns); 
  return {columns, SetColumns}; 
}
