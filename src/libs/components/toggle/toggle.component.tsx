import React from 'react';
import {useToggle} from './usetoggle.hook';


export function TestToggle () { 
  const {toggle, ToggleBtnAction, toggleTarget} = useToggle<HTMLDivElement>(true); 

  return <div> 
    <button {...ToggleBtnAction()} >{toggle ? 'On': 'Off'}</button> 
    <div tabIndex={0} ref={toggleTarget} hidden={toggle}> 
      Open
    </div> 
  </div> 
} 


interface IToggleTarget {
  toggle:boolean, 
  toggleTarget:React.RefObject<HTMLDivElement>, 
} 
function ToggleTarget ({toggle, toggleTarget, children}:React.PropsWithChildren<IToggleTarget>) { 
  return <div tabIndex={0} ref={toggleTarget} hidden={toggle}> 
      {children} 
    </div> 
}