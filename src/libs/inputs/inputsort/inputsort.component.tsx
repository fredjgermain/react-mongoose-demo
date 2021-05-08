import { useState } from 'react'; 
import { IInputSorter } from './inputsort.type'; 
import { SorterPredicate } from './inputsorter.utils'; 




/** INPUT SORT 
 * 
 * @param handle 
 * @param type 
 * @param SetSorters
 * @returns 
 */
export function InputSorter<T>({keys, type, SetSorters}:IInputSorter<T>) { 
  const Key = keys.reduce((prev, current) => prev+current); 
  const [sorterValue, setSorterValue] = useState(0); 

  const Sort = (newValue:number) => { 
    const value = newValue === sorterValue ? 0 : newValue; 
    setSorterValue(value); 
    const newSorter = SorterPredicate(value, type, keys); 
    SetSorters(Key, newSorter); 
  }

  if(sorterValue === 1) 
    return <button onClick={() => Sort(-1)}>🔺</button> 
  if(sorterValue === -1) 
    return <button onClick={() => Sort(0)}>🔻</button> 
  return <button onClick={() => Sort(1)}>--</button> 
}


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