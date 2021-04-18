export type I<T> = {i:number, t:T} 
export interface IPageHook<T> { 
  pageIndex:number; 
  setPageIndex:(newIndex:number)=>void; 
  page:I<T>[]; 
  pages:I<T>[][]; 
} 
