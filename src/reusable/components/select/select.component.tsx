import React, { useContext, useState } from 'react'; 
import {IsEmpty} from '../../_utils'; 
import {useSelect, IUseSelect} from './select.hook'; 
import {IEditor} from '../../_input'; 
import {useToggle, IUseToggle} from '../../_usetoggle'; 


import './select.style.css'; 

export function TestSelect() { 
  const options:IOption[] = [
    {value:0, label:'valeur 0'}, 
    {value:1, label:'valeur 1'}, 
    {value:2, label:'valeur 2'}, 
    {value:3, label:'valeur 3'}, 
  ] 

  const ifield = {accessor:'', label:'', defaultValue:'', type:'string'} as IField; 
  const [value, setValue] = useState(0); 



  return <div> 
    <span>{JSON.stringify(value)}</span> 
    <span>Label:</span> 
    <Select {...{ifield, value, setValue, options}} /> 
    <span>asdasdasdsa:</span> 
  </div> 
} 


export const SelectContext = React.createContext({} as IUseSelect); 
export function Select({ifield, value, setValue, options}:IEditor) { 
  const context = useSelect({ifield, value, setValue, options}); 

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
  const {SelectValue, GetSelection} = useContext(SelectContext); 
  const selection = GetSelection(); 

  return <div className={'select-header'}> 

    {IsEmpty(selection) && <span className={'select-placeholder'}> --- Empty --- </span>} 

    {selection.map( (option, i) => { 
      const key = JSON.stringify(option.value); 
      const onClick = () => SelectValue(option?.value); 
      const className = 'select-option'; 
      return <span key={key} {...{onClick, className}}> 
        {option?.label}{(i < selection.length-1) ? ', ':''}
      </span> 
    })} 
  </div> 
}



function Options() { 
  const {options, SelectValue, GetSelection} = useContext(SelectContext); 
  const selection = GetSelection(); 
  const IsSelected = (option:IOption) => selection.some(o => o?.value === option?.value); 

  /*const style: CSS.Properties = { 
    display: 'none', 
    position: 'absolute', 
    width: '100%', 
    zIndex: 1, 
  }*/

  return <div className={'select-options'}  > 
    {options.map( option => { 
      const key = JSON.stringify(option.value); 
      const onClick = () => SelectValue(option.value); 
      const className = IsSelected(option) ? 'select-option-selected': 'select-option'; 
      return <div key={key} {...{onClick, className}} > 
        {option.label} 
      </div> 
    })}
  </div>
} 