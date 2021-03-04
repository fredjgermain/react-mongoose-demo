import { IPageHook } from '../../../reusable/_customhooks'; 
import {Filter, HeadMidTail} from '../../../reusable/_arrayutils';
import { IsNull } from '../../../reusable/_utils';
import {usePage} from '../../_customhooks'; 



/* Pager Btn
Display buttons to change pages. 
*/
export function PagerBtn<T>({paging:{pageIndex, setPageIndex, page, pages}}:{paging:IPageHook<T>}) { 
  let indexes = pages.map( (p,i) => i); 
  if(indexes.length > 10) 
    indexes = AbbrevIndexes(pageIndex, indexes); 

  return <span> 
    {indexes.map( (index, i) => { 
      return <span key={index}> 
        <button onClick={() => setPageIndex(index)} disabled={index===pageIndex}>{index+1}</button> 
        {index + 1 !== indexes[i+1] && i < indexes.length-1 && '...'} 
      </span> 
    })} 
  </span> 
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
  return <span> 
    {from === to ? 
      <span>Item #{from}</span>: 
      <span>Items #{from} to {to}</span>} 
  </span> 
} 


/* PageOfPages 
Display index the current page being display and the total number of pages. 
*/
export function PageOfPages<T>({paging:{pageIndex, setPageIndex, page, pages}}:{paging:IPageHook<T>}) { 
  return <span>Page {pageIndex+1} of {pages?.length ?? 0}</span> 
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
  const [abbrev] = Filter(indexes, (i:number, positive:number[], negative:number[], remainder:number[]) => { 
    const t = Math.floor(indexes.length/5); 
    return [0, ...window, indexes.length-1].includes(i) || (i % t) === 0; 
  }) 
  return abbrev; 
}

function AbbrevIndexes2(index:number, indexes:number[]) { 
  const [firstHalf, remainder] = Filter(indexes, (n:number, firstHalf:number[]) => firstHalf.length < index); 
  const [current, ...secondHalf] = remainder; 

  const [first, fistLeft, firstQuart, firstRight, prev] = HeadMidTail(firstHalf); 
  const [next, secondLeft, secondQuart, secondRight, last] = HeadMidTail(secondHalf); 
  
  const abbrevIndexes = [ 
    first, first+1, firstQuart, 
    prev-1, prev, current, next, next+1, 
    secondQuart, last-1, last]; 
  const [abbrev] = Filter(abbrevIndexes, (i:number, positive:number[]) => { 
    return !IsNull(i) && !positive.includes(i) && i>=0 && i < indexes.length; 
  }) 
  return abbrev; 
}




export function TestPagerBtn<T>() { 
  let items = [] as number[]; 
  while(items.length < 98) 
    items.push(items.length); 

  const paging = usePage(items, 5); 

  
  let i = 0;
  while(i<11) {
    console.log([i, IndexesWindow(i++, 0, 10, 5)]);
  }

  /*TestAbbrev(10);
  TestAbbrev(50);
  TestAbbrev(98);
  TestAbbrev(99);
  TestAbbrev(100);*/

  return <div> 
    {JSON.stringify(paging.page)} <br/> 
    <PagerBtn {...{paging}}/> 
  </div> 
} 


function TestAbbrev(length:number) {
  let items = [] as number[]; 
  while(items.length < length) 
    items.push(items.length); 

  AbbrevIndexes(0, items); 
  AbbrevIndexes(1, items); 
  AbbrevIndexes(2, items); 
  AbbrevIndexes(length-3, items); 
  AbbrevIndexes(length-2, items); 
  AbbrevIndexes(length-1, items); 
}
