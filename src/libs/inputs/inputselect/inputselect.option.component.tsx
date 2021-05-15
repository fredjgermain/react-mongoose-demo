import React, { useContext } from 'react'; 
import { IsEmpty } from '../../_utils'; 
import { Predicate, Filter } from '../../_arrayutils'; 
import { InputSelectContext } from './inputselect.component'; 

//  tabIndex={0} 
export function Options({children}:React.PropsWithChildren<{}>) { 
  const {toggle} = useContext(InputSelectContext); 
  return <div className={'select-options'} hidden={!toggle}> 
    {children} 
  </div> 
} 

type IOptionGroup = IOption[] | Predicate<IOption> | boolean; 
export function OptionGroup({options}:{options?:IOptionGroup}) { 
  const _options = GetOptions(options); 
  return <div>
    {_options.map( option => { 
      return <Option key={option.value} {...{option}} />
    })}
  </div> 
} 


export function Option({option}:{option:IOption}) { 
  const context = useContext(InputSelectContext); 
  const selection = context.GetSelection(); 
  const IsSelected = (option:IOption) => selection.some(o => o?.value === option?.value); 
  const onClick = () => context.SelectValue(option.value); 
  const className = IsSelected(option) ? 'select-option-selected': 'select-option'; 

  return <div {...{onClick, className}} > 
    {option.label} 
  </div> 
}


function GetOptions(options?:IOptionGroup):IOption[] { 
  const context = useContext(InputSelectContext); 
  const selection = context.GetSelection(); 
  const IsSelected = (option:IOption) => selection.some(o => o?.value === option?.value); 
  let _options = context.options; 

  if(IsEmpty(options)) 
    return _options; 
  if(Array.isArray(options)) 
    return _options.filter(option => _options.some( o => o.value === option.value )); 
  if(typeof options === 'boolean') 
    return _options.filter((option) => IsSelected(option) === options); 
  [_options] = Filter(_options, options as Predicate<IOption>); 
  return _options; 
} 
