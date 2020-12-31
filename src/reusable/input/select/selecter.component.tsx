import React from 'react'; 
//import {useInput} from '../useInput.hook'; 
import {IInput, IOption} from '../input.utils'; 
import {IUseSelect, useSelect} from './selecter.hook'; 
import {SelecterHeader} from './selecterheader.component'; 
import {SelecterFolder} from './selecterfolder.component'; 
import './selecter.styles.css'; 

export interface ISelecter extends IInput { 
  isMulti?:boolean; 
  options:IOption[]; 
} 
interface ISelecterContext extends IUseSelect {} 
export const SelecterContext = React.createContext({} as ISelecterContext); 
export default function Selecter({isMulti=false, options, children, ...props}:React.PropsWithChildren<ISelecter>) { 
  const context = useSelect({isMulti, options, ...props}); 
  const {onBlur, onPressEnter} = context; 
  
  // onBlur={(event:any) => {console.log('onblur'); if(onBlur) onBlur(event)}} 
  return <SelecterContext.Provider value={context}> 
      <div className={'select_box'} tabIndex={0} onKeyUp={onPressEnter} > 
        <SelecterHeader /> 
        <SelecterFolder /> 
      </div> 
  </SelecterContext.Provider> 
} 


