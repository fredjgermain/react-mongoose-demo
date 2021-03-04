import { useState } from 'react'; 
import { GetValueAt, SetValueAt } from '../_utils'; 
import { useUpdate } from './useupdate.hook'; 


/* 
Get(keys) => any 
Set(newValue, keys) => previous value ? 
Add(newValue, keys) => previous value ? 
Rem(keys) => previous value ? 
Has(keys) => boolean 
Find(predicate) => keys ? 
*/ 
export function useStateAt<T>(value:T, OnChange?:(newValue:T) => void): 
[ (keys?: any[] | undefined) => any, 
  (newValue: any, keys?: any[] | undefined) => T] 
{ 
  const [Value, SetValue] = useState(value); 

  useUpdate(() => { 
    Set(value); 
  }, value); 

  function Get(keys?:any[]) { 
    return GetValueAt(Value, keys); 
  } 

  function Set(newValue:any, keys?:any[]) { 
    const prev = Value; 
    if(JSON.stringify(prev) === JSON.stringify(newValue)) 
      return prev; 
    SetValue((prev:T) => { 
      return SetValueAt(prev, newValue, keys); 
    }) 
    if(OnChange) OnChange(newValue) // callback when Value has changed. 
    return prev; 
  } 

  return [Get, Set]; 
} 

export function TestUseStateAt() { 
  const obj = {value:{id:12}, value2:'dasdsa'}; 
  console.log('TestUseStateAt'); 
  const [get, set] = useStateAt(obj); 

  const idKeys = ['value', 'id']; 

  return <div> 
    {JSON.stringify(obj)} <br/> 
    {JSON.stringify(get(['value']))} <br/> 
    {JSON.stringify(get(idKeys))} <br/> 
    {JSON.stringify(get(['value2']))} <br/> 
    
    <button onClick={() => set(get(idKeys)+1, idKeys)} >+1</button> 
    <button onClick={() => set(get(idKeys)-1, idKeys)} >-1</button> 
  </div> 
} 
