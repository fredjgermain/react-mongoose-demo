import { useState } from 'react'; 
import { UpdateValue } from '../_utils'; 


type IUseStateReset<T> = [
  T, 
  (newValue:any) => void, 
  () => void, 
]
export function useStateReset<T>(initState:T): 
[T, (newValue:T) => void, () => void ] 
{ 
  const [value, setValue] = useState(initState); 
  
  const SetValue = (newValue:T) => { 
    setValue( prev => UpdateValue<T>(prev, newValue)) 
  }; 
  const ResetValue = () => SetValue(initState); 

  return [value, SetValue, ResetValue]; 
} 