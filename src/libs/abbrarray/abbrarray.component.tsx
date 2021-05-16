import { ReduceToString } from '../_utils'; 

export function AbbrevArray({toAbbrev, maxLength = 20}:{toAbbrev:string[], maxLength:number}) { 
  const predicate = (t:string, i:number, a:string[]) => { 
    const toReduce = [...a.slice(0,i)]; 
    return ReduceToString(toReduce).length < maxLength; 
  } 
  const reducable = toAbbrev.filter(predicate); 
  const reduced = ReduceToString(reducable); 
  const full = ReduceToString(toAbbrev.map( (s, i) => `[${i}] ${s}`), '\n'); 
  const ifLong = reducable.length < toAbbrev.length ? ', ...': ''; 
  const nSelected = ` (${toAbbrev.length}) `; 

  return <span title={full}>{nSelected + reduced + ifLong}</span>; 
}