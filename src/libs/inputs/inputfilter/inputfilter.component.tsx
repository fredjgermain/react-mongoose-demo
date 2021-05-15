import { useState } from 'react'; 
import { FilterPredicate } from './inputfilter.utils'; 
import { Input } from '../input/_input'; 
import { IInputFilter } from './inputfilter.type'; 


/** INPUT FILTER 
 * 
 * @param keys 
 * @param type 
 * @param SetFilters 
 * @returns 
 */
export function InputFilter<T>({keys, type, SetFilters}:IInputFilter<T>) { 
  const Key = keys.reduce((prev, current) => prev+current); 

  const [strFilter, setStrFilter] = useState(''); 
  const value = strFilter; 
  const onSetValue = (newValue:string) => { 
    setStrFilter(newValue); 
  }; 

  const onPressEnter = () => { 
    const newFilter = FilterPredicate(strFilter, type, keys); 
    SetFilters(Key, newFilter); 
  }; 

  const style = { 
    borderRadius: '0.2em', 
    border: '1px solid black', 
    padding: '0.2em', 
    paddingBottom: '0.3em'
  }

  //U+25BE
  //U+25B4

  return <span style={style}> 
    <Input {...{type:'string', value, onSetValue, onPressEnter}} />🔍
  </span>
}
