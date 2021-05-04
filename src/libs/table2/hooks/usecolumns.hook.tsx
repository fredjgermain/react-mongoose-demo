import { useStateReset } from '../../_customhooks';


export function useColumn(defaultColumns:string[]) { 
  const [columns, SetColumns, ResetColumns] = useStateReset(defaultColumns); 
  return {columns, SetColumns, ResetColumns}; 
}
