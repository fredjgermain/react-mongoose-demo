import {IPageHook} from '../../reusable/_usepage'; 



// PAGING =======================================
export function Paging({pageIndex, setPageIndex, pages}:IPageHook) { 
  const page = pages[pageIndex] ?? []; 
  const [from, to] = [ [...page].shift(), [...page].pop()]; 
  const [first, last] = [pages.flat().shift(), pages.flat().pop()]; 

  return <div>
    <span>page : {pageIndex+1} of {pages.length}</span>
    <div>{(from??0) +1} - {(to??0)+1} of {(first??0)+1} - {(last??0)+1}</div>
    {pages.map( (p:number[], i:number) => { 
      const onClick = () => {setPageIndex(i)} 
      const disabled = pageIndex === i; 
      return <button key={i} {...{onClick, disabled}} >{i+1}</button> 
    })} 
  </div>
}
