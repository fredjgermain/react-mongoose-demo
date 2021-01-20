import {useState} from 'react'; 

// As a reducer function ??
type PageBreakPredicate = { 
  (accumulator:Array<any>, value?:any, index?:number):boolean; 
} 

// PAGE HOOK ====================================
export interface IPageHook { 
  pageIndex:number, 
  setPageIndex:any, 
  pages:Array<number[]>, 
}

export function usePage(datas:any[], pageBreak:PageBreakPredicate|number):IPageHook { 
  const [pageIndex, setPageIndex] = useState(0); 

  function PagesBreak(datas:any[], pageBreak:PageBreakPredicate|number):any[] { 
    if(typeof pageBreak === 'number') { 
      const pagesize = pageBreak > 0 ? pageBreak: 1; 
      return PagesBreak(datas, (accumulator:Array<any>):boolean => accumulator?.length >= pagesize); 
    } 

    const pages:any[] = []; 
    const indexes:number[] = []; 
    const accumulator:any[] = []; 
    datas.forEach( (d:any, i:number) => { 
      accumulator.push(d); 
      indexes.push(i); 
      if(pageBreak(accumulator, d, i)) { 
        accumulator.splice(0); 
        pages.push([...indexes]); 
        indexes.splice(0); 
      } 
      else if(i===datas.length-1) { 
        pages.push(indexes); 
      } 
      
    }) 
    return pages; 
  } 

  const pages = PagesBreak(datas, pageBreak); 

  return {pageIndex, setPageIndex, pages}; 
}


/*
export function usePage(data:any[], pageBreak:PageBreakPredicate|number):IPageHook { 
  const [pageIndex, setPageIndex] = useState(0); 

  function PageBreak(entries:Array<any>, pageBreakPredicate:PageBreakPredicate|number):number[] { 
    if(typeof pageBreakPredicate === 'number') { 
      const pagesize = pageBreakPredicate > 0 ? pageBreakPredicate: 1; 
      return PageBreak(entries, (accumulator:Array<any>):boolean => accumulator?.length >= pagesize); 
    } 
    const pageIndexes = [0]; 
    const accumulator:any[] = []; 
    for(let i=0; i<entries.length-1; i++) { 
      accumulator.push(entries[i]); 
      if(pageBreakPredicate(accumulator, entries[i], i)) { 
        pageIndexes.push(i+1); // queue starting index of next page. 
        accumulator.splice(0); 
      } 
    } 
    return pageIndexes; 
  } 

  function GetPage(entries:Array<any>, pageIndexes:number[], pageIndex:number):{from:number, to:number} { 
    const pagei = pageIndex < 0 ? 0 : Math.min(pageIndex, pageIndexes.length-1); 
    const from = pageIndexes[pagei]; 
    const to = pageIndexes[pagei+1] ?? entries.length; 
    return {from:from, to:to}; 
  } 
  const pageIndexes = PageBreak(data, pageBreak); 
  const {from, to} = GetPage(data, pageIndexes, pageIndex); 
  
  return {pageIndex, setPageIndex, pageIndexes, from, to}; 
} */
