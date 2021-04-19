import { useState } from 'react'; 
import { IInputSorter } from './inputsort.type'; 
import { SorterPredicate } from './inputsorter.utils'; 




/*
▴ &#9652;
▾ &#9662;
*/
/** INPUT SORT 
 * 
 * @param handle 
 * @param type 
 * @param SetSorters
 * @returns 
 */
export function InputSorter({handle, type, SetSorters}:IInputSorter) { 
  const [sorterValue, setSorterValue] = useState(0); 

  const Sort = (newValue:number) => { 
    if(newValue === sorterValue) 
      setSorterValue(0); 
    else 
      setSorterValue(newValue); 
    const newSorter = SorterPredicate(sorterValue, type, handle); 
    SetSorters(newSorter, [handle]); 
  }

  return <div> 
    {sorterValue}
    <br/>
    <button onClick={() => Sort(1)}> {sorterValue === 1 ? `&#9653;`: '&#9652;'} </button> 
    <br/>
    <button onClick={() => Sort(-1)}> {sorterValue === -1 ? '&#9663;': '&#9662;'} </button> 
  </div> 
}
