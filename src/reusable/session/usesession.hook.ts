import { useEffect, useState } from 'react';
import { GetValueAt, SetValueAt } from '../_utils';
import {Session} from './session.class'; 


type Keys = any[]; 

export interface IUseSession { 
  Get: (keys?:Keys) => any; 
  Set: (newValue: any, keys?:Keys) => void; 
  Reset: () => void; 
  End: () => void; 
} 

// UseSession =============================================
export function useSession(sessionName:string, value?:any):IUseSession { 
  const _value = Session.Exists(sessionName) ? Session.Get(sessionName): value;
  const [session, setSession] = useState(_value); 

  console.log(Session.Get(sessionName)); 
  console.log(session); 

  function Reset() { 
    Set(value); 
  } 

  function Get(keys?:string[]) { 
    if(!Session.Exists(sessionName)) 
      Session.Set(sessionName, session); 
    return GetValueAt(session, keys); 
  } 

  function Set(newValue:any, keys?:string[]) { 
    setSession((prev:any) => { 
      const newSession = SetValueAt(prev, newValue, keys); 
      Session.Set(sessionName, newSession); 
      return newSession; 
    }) 
  } 

  function End() { 
    Session.EndSession(sessionName); 
    setSession(undefined) 
  } 
  
  return {Get, Set, Reset, End}; 
}