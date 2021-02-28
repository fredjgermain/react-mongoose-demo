import {useState} from 'react'; 
import { Group } from '../../reusable/_arrayutils';

export type Predicate<T> = (value:T, i:number, array:T[]) => boolean; 

export interface IPageHook { 
  pageIndex:number; 
  setPageIndex:React.Dispatch<React.SetStateAction<number>>; 
  pages:Array<number[]>; 
}

export function usePage(datas:any[], predicate:Predicate<any>|number):IPageHook { 
  const [pageIndex, setPageIndex] = useState(-1); 
  const _predicate = typeof predicate === 'number'? 
    (v:any, i:number, array:any[]) => i < predicate: 
    predicate; 
  
  const pages = Group(datas, _predicate); 
  return {pageIndex, setPageIndex, pages} 
}
