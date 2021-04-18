import React, { useContext, useEffect, useState } from 'react'; 
//import { Filter, Predicate } from '../../reusable/_arrayutils'; 

import { Input } from '../input/_input'; 
import { IUseFilters } from './inputfilter.type'; 
import { useFilter, useFilters } from './inputfilter.hook'; 
import { FilterPredicate } from './inputfilter.utils'; 


export const FilterPredicatesContext = React.createContext({} as IUseFilters); 
export function InputFilters({values, children}:React.PropsWithChildren<{values:any[]}>) { 
  const context = useFilters(values); 
  return <FilterPredicatesContext.Provider value={context}> 
    {JSON.stringify(context.filteredValues)}
    {children} 
  </FilterPredicatesContext.Provider> 
} 

export function InputFilter({handle, type}:{handle:string, type:string}) { 
  const {setPredicates} = useContext(FilterPredicatesContext); 
  const [value, setValue] = useState(''); 
  const onSetValue = (newValue:any) => setValue(newValue); 

  const onPressEnter = () => { 
    const predicate = FilterPredicate(value, type, handle); 
    setPredicates({handle, predicate}); 
  }; 

  return <Input {...{type:'string', value, onSetValue, onPressEnter}} /> 
} 




