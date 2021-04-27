export interface IPageHook<T> { 
  pageIndex:number; 
  setPageIndex:(newIndex:number)=>void; 
  page:T[]; 
  pages:T[][]; 
} 
