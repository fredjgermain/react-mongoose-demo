import { useEffect, useState } from 'react';
import { GetValueAt, SetValueAt } from '../_utils';
import {Session} from './session.class'; 



// UseSession =============================================
export function useSession(sessionName:string, value:any) { 
  const [session, setSession] = useState(value); 

  if(!Session.SessionExists(sessionName)) 
    Start(value); 
  else 
    Set(Get()); 


  function Start(value:any) { 
    Session.StartSession(sessionName, value); 
    setSession(value); 
  } 

  function Get(keys?:string[]) { 
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
    setSession(undefined); 
  } 
  
  return {Start, Get, Set, End}; 
}