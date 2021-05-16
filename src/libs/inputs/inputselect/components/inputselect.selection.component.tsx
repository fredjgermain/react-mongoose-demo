import React, { useContext } from 'react'; 
import { IsEmpty, ReduceToString } from '../../../_utils'; 
import { Filter, Predicate, ToArray } from '../../../_arrayutils'; 
import { InputSelectContext } from './inputselect.component'; 



function AbbrevArray({toAbbrev, maxLength = 20}:{toAbbrev:string[], maxLength:number}) { 
  const predicate:Predicate<string> = (t, i, a, positive) => { 
    return ReduceToString([...positive, t]).length < maxLength; 
  } 
  const [reducable, remainder] = Filter(toAbbrev, predicate); 
  const reduced = ReduceToString(reducable); 
  const full = ReduceToString(toAbbrev.map( (s, i) => `[${i}] ${s}`), '\n'); 
  const ifLong = remainder.length ? '...': ''; 
  const nSelected = ` (${toAbbrev.length})`; 

  return <span title={full}>{nSelected + reduced + ifLong}</span>; 
}



export function Selection({children}:React.PropsWithChildren<{}>) { 
  return <div className={'select-header'}> 
    {children} 
  </div> 
} 


export function DisplaySelection() { 
  const context = useContext(InputSelectContext); 
  const selection = context.selection.map(option => option.label); 
  const className = IsEmpty(context.selection) ? 'select-placeholder': ''; 
  const toAbbrev = ToArray(selection); 

  const [single] = selection; 

  if(context.multiple)
    return <span className={className}> 
      {IsEmpty(toAbbrev) && context.placeholder} 
      <AbbrevArray {...{toAbbrev, maxLength:17}} />
    </span> 
  return <span className={className}> 
    {single ?? context.placeholder} 
  </span> 
} 
