import { useEffect, useState } from 'react';
import { GetValueAt, SetValueAt } from '../_utils';
import {Session} from './session.class'; 



// UseSession =============================================
export function useSession(sessionName:string, value:any) { 
  const [session, setSession] = useState(value); 

  if(!Session.SessionExists(sessionName)) 
    Session.StartSession(sessionName, value ?? {}); 

  const Start = (value:any) => { 
    Session.StartSession(sessionName, value); 
    setSession(value); 
  } 

  const Get = (keys?:string[]) => { 
    return GetValueAt(session, keys); 
  } 

  const Set = (newValue:any, keys?:string[]) => { 
    setSession((prev:any) => { 
      const newSession = SetValueAt(prev, newValue, keys); 
      Session.Set(sessionName, newSession); 
      return newSession; 
    }) 
  } 

  const End = () => { 
    Session.EndSession(sessionName); 
    setSession(undefined); 
  } 
  
  return {Start, Get, Set, End}; 
}