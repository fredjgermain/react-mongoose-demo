import { useEffect, useState } from 'react';
import { GetValueAt, SetValueAt } from '../_utils';
import {Session} from './session.class'; 


type Keys = any[]; 

export interface IUseSession { 
  Get: (keys?:Keys) => any; 
  Set: (newValue: any, keys?:Keys) => void; 
  End: () => void; 
} 

// UseSession =============================================
export function useSession(sessionName:string, value?:any):IUseSession { 
  const [session, setSession] = useState(value); 

  function Get(keys?:string[]) { 
    if(!Session.SessionExists(sessionName)) 
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
  
  return {Get, Set, End}; 
}