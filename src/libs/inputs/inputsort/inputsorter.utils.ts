import { IsEmpty } from "../../utils/valuetypetesting/value.utils";

export function SorterPredicate(strSorter:number, type:string, key?:string): (x:any, pivot:any) => boolean { 
  let sorter = (x:any, pivot:any) => false; 
  if(strSorter === 0) 
    return sorter; 
  if(strSorter === 1) 
    sorter = (x:any, pivot:any) => x < pivot; 
  if(strSorter === -1) 
    sorter = (x:any, pivot:any) => x > pivot; 

  if(key) 
    return (x:any, pivot:any) => sorter(x[key], pivot[key]); 
  return sorter; 
}