import { IsEmpty, GetValueAt } from '../../_utils'; 

export function SorterPredicate(strSorter:number, type:string, keys?:string[]): (x:any, pivot:any) => boolean { 
  let sorter = (x:any, pivot:any) => false; 
  if(strSorter === 0) 
    return sorter; 
  if(strSorter === 1) 
    sorter = (x:any, pivot:any) => x < pivot; 
  if(strSorter === -1) 
    sorter = (x:any, pivot:any) => x > pivot; 
  
  return !IsEmpty(keys) ? 
    (x:any, pivot:any) => 
      sorter(GetValueAt(x, keys), GetValueAt(pivot, keys)): 
      sorter; 
}