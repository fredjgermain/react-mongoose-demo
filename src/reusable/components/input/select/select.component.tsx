import React, {useRef} from 'react'; 
//import {IOption} from '../../reusable/_input'; 
import {SetWidth} from '../../../utils/_utils'; 
import {SelectHeader} from './selectheader.component'; 
import {useSelect, IUseSelect} from './select.hook';

import './select.styles.css'; 



// SELECT CONTEXT =======================================
interface ISelectContext extends IUseSelect {
  placeholder: string; 
  ref:React.RefObject<HTMLDivElement>; 
} 
export const SelectContext = React.createContext({} as ISelectContext); 


// SELECT =======================================
interface ISelect { 
  //type: string; 
  value: any; 
  setValue: any; 
  width?:number; 
  placeholder?: string; 
  multiple?:boolean; 
} 
export function Select({value, setValue, width, placeholder = 'select', multiple=false, children}:React.PropsWithChildren<ISelect>) { 
  const ref = useRef<HTMLDivElement>(null); 
  const context = useSelect(value, setValue, multiple, ref); 
  const style = width ? SetWidth(width): undefined; 
  
  /*if(ref.current && !context.fold) { 
    ref.current.hidden = false; 
    ref.current.focus(); 
  }*/

  // ref={ref} tabIndex={0}
  return <span>
  <SelectContext.Provider value={{...context, placeholder, ref}} > 
    <div className={'select_main'} {...style} > 
      <SelectHeader /> 
      <div className={'select_body'} tabIndex={0} ref={ref} 
        hidden={context.fold} 
        onFocus={() => {}} >
        {children} 
      </div> 
    </div> 
  </SelectContext.Provider> 
  </span>
} 

