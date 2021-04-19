import { useState } from 'react'; 
import { IInputSorter } from './inputsort.type'; 
import { SorterPredicate } from './inputsorter.utils'; 




/* 
﹀
︿

⏫   9195
⏬   9196

🔺
🔻

🔼	128316	1F53C
🔽	128317	1F53D

▲
△
▼
▽

▴ &#9652; 
▵ &#9653; 

▾ &#9662; 
▿ &#9663; 
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
    const value = newValue === sorterValue ? 0 : newValue; 
    setSorterValue(value); 
    const newSorter = SorterPredicate(value, type, handle); 
    SetSorters(newSorter, [handle]); 
  }

  return <span> 
    <button onClick={() => Sort(1)} >🔺 {sorterValue === 1 && '*'}</button> 
    <button onClick={() => Sort(-1)} >🔻 {sorterValue === -1 && '*'}</button> 
  </span> 
}