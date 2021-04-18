import { IPageHook } from '../../_customhooks'; 
import { Filter } from '../../_arrayutils'; 
import { IsNull } from '../../_utils'; 

/* Pager Btn
Display buttons to change pages. 
*/
export function PagerBtn<T>({paging:{pageIndex, setPageIndex, page, pages}}:{paging:IPageHook<T>}) { 
  let indexes = pages.map( (p,i) => i); 
  if(indexes.length > 10) 
    indexes = AbbrevIndexes(pageIndex, indexes); 

  return <div> 
    {indexes.map( (index, i) => { 
      return <span key={index}> 
        <button onClick={() => setPageIndex(index)} disabled={index===pageIndex}>{index+1}</button> 
        {index + 1 !== indexes[i+1] && i < indexes.length-1 && '...'} 
      </span> 
    })} 
  </div> 
} 

/* Pager From To
Display the range of element being represented on a given page. 
*/
export function PagerFromTo<T>({paging:{pageIndex, setPageIndex, page, pages}}:{paging:IPageHook<T>}) { 
  const indexes = page?.map(p=>p.i) ?? []; 
  let [from, a, mid, b, to] = HeadMidTail(indexes); 
  from = !IsNull(from) ? from+1: 0; 
  to = !IsNull(to) ? to+1: from; 
  //const indexes.length-1; 
  return <div> 
    {from === to ? 
      <div>Item #{from}</div>: 
      <div>Items #{from} to {to}</div>} 
  </div> 
} 


/* PageOfPages 
Display index the current page being display and the total number of pages. 
*/
export function PageOfPages<T>({paging:{pageIndex, setPageIndex, page, pages}}:{paging:IPageHook<T>}) { 
  return <div>Page {pageIndex+1} of {pages?.length ?? 0}</div> 
} 



/* GetHeadMidTail ==================================
*/
function HeadMidTail<T>(array:T[] = []): [T, T[], T, T[], T] { 
  const [firstHalf, secondHalf] = Filter(array, (t:T, i:number, a:T[], firstHalf:T[]) => firstHalf.length < a.length/2); 
  const [head, ...remainder] = firstHalf ?? []; 
  const [mid, ...firstRemainder] = remainder.reverse() ?? []; 
  const [tail, ...secondRemainder] = secondHalf?.reverse() ?? []; 

  return [head, firstRemainder?.reverse() ?? [], mid ?? head, secondRemainder?.reverse() ?? [], tail ?? head]; 
} 

function IndexesWindow(index:number, min:number, max:number, length:number) { 
  const window = []; 
  let i = index-2; 
  i = Math.min(i, max-length); 
  i = Math.max(i, min); 
  while(window.length < length && i >=min && i<max) { 
    window.push(i++); 
  } 
  return window; 
} 

function AbbrevIndexes(index:number, indexes:number[]) { 
  const window = IndexesWindow(index, 0, indexes.length-1, 5); 
  const [abbrev] = Filter(indexes, (i:number) => { 
    const t = Math.floor(indexes.length/5); 
    return [0, ...window, indexes.length-1].includes(i) || (i % t) === 0; 
  }) 
  return abbrev; 
}
