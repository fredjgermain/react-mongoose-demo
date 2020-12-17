import {useEffect, useRef} from 'react';


export function useOutsideClick<T extends HTMLElement>(onOutClick:any): [React.MutableRefObject<any>] { 
  
  const htmlelement = useRef<T>(null); 
  useEffect(() => { 
    document.addEventListener("mousedown", outsideClick); 
    return () => { 
      document.removeEventListener("mousedown", outsideClick); 
    }; 
  }, []); 

  const outsideClick = (e:{target:any}) => { 
    if (!(htmlelement.current && htmlelement.current.contains(e.target))) 
      onOutClick(e); 
  }; 
  return [htmlelement]; 
}