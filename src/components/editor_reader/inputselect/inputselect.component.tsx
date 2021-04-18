import React, {useContext} from 'react'; 
import { IInputSelect, IUseSelect, useInputSelect } from './inputselect.hook'; 
import { useToggle } from '../../../libs/_customhooks'; 
import { IsEmpty } from '../../../libs/_utils';

import './select.style.css'; 


export const SelectContext = React.createContext({} as IUseSelect); 
export function InputSelect({...props}:IInputSelect) { 
  const context = useInputSelect(props); 

  const {toggle, ToggleBtnAction, toggleTarget, Toggle} = useToggle<HTMLDivElement>(true); 

  const CloseToggle = () => { 
    if(!context.multiple) 
      Toggle(); 
  }

  return <SelectContext.Provider value={context}> 
    <div className={'select-main'} > 
      <div  {...ToggleBtnAction()} > 
        <Selection/> 
      </div> 
      <div tabIndex={0} ref={toggleTarget} hidden={toggle} onClick={CloseToggle}> 
        <Options /> 
      </div> 
    </div> 
  </SelectContext.Provider> 
}


function Selection() {
  const {SelectValue, GetSelection, placeholder} = useContext(SelectContext); 
  const selection = GetSelection(); 

  return <div className={'select-header'}> 

    {IsEmpty(selection) && <div className={'select-placeholder'}> {placeholder} </div>} 

    {selection.map( (option, i) => { 
      //const onClick = () => SelectValue(option?.value); 
      const className = ''; 
      return <div key={i} {...{className}}> 
        {option?.label}{(i < selection.length-1) ? ', ':''}
      </div> 
    })} 
  </div> 
}



function Options() { 
  const {options: _options, SelectValue, GetSelection} = useContext(SelectContext); 
  const selection = GetSelection(); 
  const IsSelected = (option:IOption) => selection.some(o => o?.value === option?.value); 

  return <div className={'select-options'}  > 
    {_options.map( (option,i) => { 
      const onClick = () => SelectValue(option.value); 
      const className = IsSelected(option) ? 'select-option-selected': 'select-option'; 
      return <div key={i} {...{onClick, className}} > 
        {option.label} 
      </div> 
    })}
  </div>
} 