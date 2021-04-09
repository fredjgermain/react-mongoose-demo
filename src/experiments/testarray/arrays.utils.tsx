import { IsEmpty } from '../../reusable/_utils';

export type Predicate<T> = (t:T, i?:number, a?:T[]) => boolean; 
export type Sorter<T> = (t:T, pivot:T) => boolean; 

/* GROUPS =======================================
Groups elements using multiple predicates. 
returns an array of grouped elements. 
*/
export function Groups<T>(array:T[] = [], sorters:Sorter<T>[]):T[][] { 
  const [sorter, ..._sorters] = sorters; 
  if(!sorter) 
    return [array]; 
  
  let grouped = [] as T[][]; 
  const groups = Group(array, sorter); 
  groups.forEach( group => { 
    const _grouped = Groups(group, _sorters); 
    grouped = [...grouped, ..._grouped]; 
  }); 
  return grouped; 
} 


/* GROUP ======================================== 
Groups elements using a Sorter predicate. 
returns an array of grouped elements. 
*/ 
export function Group<T>(values:T[] = [], sorter:Sorter<T>):T[][] { 
  const [pivot, ...remainder] = [...values]; 
  if(IsEmpty(remainder)) 
    return pivot ? [[pivot]] : []; 
  const [grouped, ungrouped] = Filter(remainder, (t:T) => sorter(t, pivot)); 
  const right = Group<T>(ungrouped, sorter); 
  return [[...grouped, pivot], ...right]; 
}



/* FILTER =======================================

*/
export function Filter<T>(values:T[] = [], predicate:Predicate<T>):[T[], T[]] { 
  const positive = [] as T[]; 
  const negative = [] as T[]; 
  values.forEach( (v:T, i:number, a:T[]) => 
    predicate(v, i, a) ? positive.push(v): negative.push(v) 
  ) 
  return [positive, negative]; 
}


/* SORTS ============================================== 

!! The ORDER of SORTERS is CRUCIAL !!

Execute in sequence of quick sort. 
  Tip: If your wish to sort a list using column A, column B, column C etc. 
  then the order of your sorter should sort by column C, than B, than A. 
  (See storybook) 


  const toSort [
    {id:'a', num:3, str: 'l'}, 
    {id:'a', num:1, str: 'b'}, 
    {id:'a', num:2, str: 'f'}, 
    {id:'c', num:1, str: 'g'}, 
    {id:'b', num:1, str: 'g'}, 
    {id:'a', num:3, str: 'v'}, 
    {id:'c', num:2, str: 'f'}, 
    {id:'b', num:4, str: 'g'}, 
    {id:'a', num:3, str: 'z'}, 
    {id:'c', num:1, str: 'd'}, 
  ]

  const sorters: [
    (x:Item, pivot:Item) => x.str < pivot.str,  // (by column 'str') 
    (x:Item, pivot:Item) => x.num < pivot.num,  // (by column 'num') 
    (x:Item, pivot:Item) => x.id < pivot.id,    // (by column 'id') 
  ]

  const results = Sorts(toSort, sorters)
  console.log(results) 
  
> 0 {"id":"a","num":1,"str":"b"} 
> 1 {"id":"a","num":2,"str":"f"} 
> 2 {"id":"a","num":3,"str":"l"} 
> 3 {"id":"a","num":3,"str":"v"} 
> 4 {"id":"a","num":3,"str":"z"} 
> 5 {"id":"b","num":1,"str":"g"} 
> 6 {"id":"b","num":4,"str":"g"} 
> 7 {"id":"c","num":1,"str":"d"} 
> 8 {"id":"c","num":1,"str":"g"} 
> 9 {"id":"c","num":2,"str":"f"} 
*/


export function Sorts<T>(array:T[] = [], sorters:Sorter<T>[] = []):T[] { 
  let sorted = [...array]; 
  if(IsEmpty(sorters)) 
    return sorted; 
  sorters.forEach( sorter => { 
    sorted = Sort(sorted, sorter); 
  }) 
  return sorted; 
}


export function Sort<T>(array:T[] = [], sorter:Sorter<T>):T[] { 
  const [pivot, ...remainder] = [...array]; 
  if(IsEmpty(remainder)) 
    return pivot ? [pivot]:[]; 
  const [inclusion, exclusion] = Filter(remainder, (t:T) => sorter(t, pivot)); 
  const left = Sort<T>(inclusion, sorter); 
  const right = Sort<T>(exclusion, sorter); 
  return [...left, pivot, ...right]; 
} 