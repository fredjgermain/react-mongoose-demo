import { useState } from 'react'; 
import { IInputFilter } from './inputfilter.type'; 


export function InputFilter<T>({keys, type, SetFilters}:IInputFilter<T>) { 
  const [strFilter, setStrFilter] = useState(['']); 
  const value = strFilter; 
  const onSetValue = (newValue:string[]) => { 
    setStrFilter(newValue); 
  }; 

  const onPressEnter = () => { 
    SetFilters(strFilter, type, keys); 
  } 

  
}


/* 
boolean ... Select [ -- , true, false ] 
  display (N) 
array ... Select from existing unic values 
  display (N) 

string ... single input string

lambda ... 
  or use a single input string with Regex?? 

  Select [ -- , <operator> ] 
  input <type> 
  
  if operator selected is NOT a comparator add an other 
  Select [ -- , <operator> ] 
  input <type> 




*/