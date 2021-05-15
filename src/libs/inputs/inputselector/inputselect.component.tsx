import React, { useContext } from 'react'; 
import { useInputSelect } from './inputselect.hook'; 
import { IInputSelect, IUseSelect } from './inputselect.type'; 
import { Options, OptionGroup } from './inputselect.option.component'; 
import { DisplaySelection, Selection } from './inputselect.selection.component';

import './inputselect.css'; 


export const InputSelectContext = React.createContext({} as IUseSelect); 
export function InputSelect({children, ...props}:React.PropsWithChildren<IInputSelect>) { 
  const context = useInputSelect(props); 
  const {SetToggle} = context; 
  const onBlur = () => SetToggle(false); 
  const onFocus = () => SetToggle(true); 
  const className = 'select-main'; 

  if(children) 
    return <InputSelectContext.Provider value={context}> 
        <div tabIndex={0} {...{onBlur, onFocus, className}}>{children}</div> 
    </InputSelectContext.Provider> 
  // default InputSelect
  return <InputSelectContext.Provider value={context}> 
    <div tabIndex={0} {...{onBlur, onFocus, className}}> 
      <Selection><DisplaySelection/></Selection> 
      <Options><OptionGroup options={true} /><hr/><OptionGroup options={false} /></Options> 
    </div> 
  </InputSelectContext.Provider> 
} 

