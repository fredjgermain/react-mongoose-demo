import React, { useContext } from 'react'; 
import { IsEmpty } from '../../_utils'; 
import { Predicate, Filter } from '../../_arrayutils'; 
import { useInputSelect } from './inputselect.hook'; 
import { IInputSelect, IUseSelect } from './inputselect.type'; 

import './inputselect.css'; 


export const InputSelectContext = React.createContext({} as IUseSelect); 
export function InputSelect({children, ...props}:React.PropsWithChildren<IInputSelect>) { 
  const context = useInputSelect(props); 
  const {SetToggle} = context; 
  return <InputSelectContext.Provider value={context}> 
    <div className={'select-main'} tabIndex={0} onFocus={() => SetToggle(true)} onBlur={() => SetToggle(false)}> 
      {children} 
    </div> 
  </InputSelectContext.Provider> 
} 

export function Selection({children}:React.PropsWithChildren<{}>) { 
  
  return <div className={'select-header'}> 
    {children} 
  </div> 
} 


//  tabIndex={0} 
export function Options({children}:React.PropsWithChildren<{}>) { 
  const {toggle, SetToggle} = useContext(InputSelectContext); 
  return <div className={'select-options'} hidden={!toggle}> 
    {children} 
  </div> 
} 


export function DisplaySelection() { 
  const context = useContext(InputSelectContext); 
  const selection = context.GetSelection(); 
  if(IsEmpty(selection)) 
    return <span>{context.placeholder}</span> 
  return <span> 
    {selection.map( s => { 
      return <span key={s.value}>{s.label}</span> 
    })} 
  </span> 
} 

interface IOptionGroup { 
  options?:IOption[] | Predicate<IOption> 
} 
export function OptionGroup({options}:IOptionGroup) { 
  const context = useContext(InputSelectContext); 
  const selection = context.GetSelection(); 
  const IsSelected = (option:IOption) => selection.some(o => o?.value === option?.value); 

  let _options = []; 
  if(!options) 
    _options = context.options; 
  else if(Array.isArray(options)) 
    _options = options.filter(option => context.options.some( o => o.value === option.value )); 
  else 
    [_options] = Filter(context.options, options as Predicate<IOption>); 

  return <div> 
    {_options.map( (option,i) => { 
      const onClick = () => context.SelectValue(option.value); 
      const className = IsSelected(option) ? 'select-option-selected': 'select-option'; 
      return <div key={i} {...{onClick, className}} > 
        {option.label} 
      </div> 
    })}
  </div> 
} 
