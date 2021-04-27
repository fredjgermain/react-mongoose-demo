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
export function InputFilter({keys, type, SetFilters}:IInputFilter) { 
  const filterId = keys.reduce((prev, current) => prev+current); 

  const [strFilter, setStrFilter] = useState(''); 
  const value = strFilter; 
  const onSetValue = (newValue:string) => { 
    setStrFilter(newValue); 
  }; 

  const onPressEnter = () => { 
    const newFilter = FilterPredicate(strFilter, type, keys); 
    SetFilters(newFilter, [filterId]); 
  }; 

  return <Input {...{type:'string', value, onSetValue, onPressEnter}} /> 
}