import { useContext, useEffect, useState } from 'react'; 
import { DaoContext } from '../../_dao'; 

export interface IUseColumn { 
  columns: string[]; 
  SetColumns: (fields: string[]) => void; 
} 

export function useColumn(collectionAccessor:string):IUseColumn { 
  const dao = useContext(DaoContext); 
  const initColumns = dao.GetIFields(collectionAccessor) 
    .filter(f => !!f.label).map( f => f.accessor ); 
  const [columns, setColumns] = useState(initColumns); 
  const SetColumns = (fields:string[]) => setColumns(fields); 

  return {columns, SetColumns}; 
}
