import { useState } from 'react'; 
import { FilterPredicate } from './inputfilter.utils'; 
import { Input } from '../input/_input'; 
import { IInputFilter } from './inputfilter.type'; 


/** INPUT FILTER 
 * 
 * @param handle 
 * @param type 
 * @param SetFilters 
 * @returns 
 */
export function InputFilter({handle, type, SetFilters}:IInputFilter) { 
  const [strFilter, setStrFilter] = useState(''); 
  const value = strFilter; 
  const onSetValue = (newValue:string) => { 
    setStrFilter(newValue); 
  }; 

  const onPressEnter = () => { 
    const newFilter = FilterPredicate(strFilter, type, handle); 
    SetFilters(newFilter, [handle]); 
  }; 

  return <Input {...{type:'string', value, onSetValue, onPressEnter}} /> 
}