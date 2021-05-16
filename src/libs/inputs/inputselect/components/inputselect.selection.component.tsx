import React, { useContext } from 'react'; 
import { IsEmpty } from '../../../_utils'; 
import { InputSelectContext } from './inputselect.component'; 

export function Selection({children}:React.PropsWithChildren<{}>) { 
  return <div className={'select-header'}> 
    {children} 
  </div> 
} 


export function DisplaySelection() { 
  const context = useContext(InputSelectContext); 
  const selection = context.selection; 

  if(IsEmpty(selection)) 
    return <span className={'select-placeholder'}>{context.placeholder}</span> 
  return <span> 
    {selection.map( (s,i) => { 
      return <span key={s.value}>{i > 0 && ', '}{s.label}</span> 
    })} 
  </span> 
} 
