import {useEffect, useRef} from 'react';

export enum KeyEventType { 
  KEYDOWN = 'keydown', 
  KEYPRESS = 'keypress', 
  KEYUP = 'keyup', 
  MOUSEDOWN = 'mousedown', 
  MOUSEPRESS = 'mousepress', 
  MOUSEUP = 'mouseup',
}

export function useKey<T extends HTMLElement>( 
  keyEvent:string, 
  keyTest:(event:any) => boolean, 
  onKey:(event:any) => void):[React.MutableRefObject<any>] { 
  
  function OnKey(event:any) { 
    if(keyTest(event)) 
      onKey(event); 
  } 

  const htmlelement = useRef<T>(null); 
  useEffect(() => { 
    document.addEventListener(keyEvent, OnKey); 
    return () => { 
      document.removeEventListener(keyEvent, OnKey); 
    }; 
  }, []); 

  return [htmlelement]; 
}