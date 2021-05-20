import { ToArray } from '../../_arrayutils'; 
import { IsEmpty } from '../../_utils'; 



/** STRINGIFY ===================================
 * takes a value or array of values and stringify all of them. 
 * If a value is already a string, it returns that string value unchanged. 
 * @param values 
 * @returns 
 */
export function Stringify(values:any):string[]{ 
  const array = ToArray(values); 
  if(IsEmpty(array)) 
    return []; 
  return array.map( value => { 
    return typeof value === 'string' ? value: JSON.stringify(value); 
  }) 
} 


/** REDUCETOSTRING ==============================
 * Reduces an array of strings to a single string. 
 * @param strArray 
 * @param delimiter 
 * @returns a single string. 
 */
export function ReduceToString(values:any, delimiter:string = '') { 
  const strArray = Stringify(values); 
  return (strArray ?? []).reduce( (prev, curr, i) => prev + ( i ? `${delimiter}${curr}`: `${curr}` ), ''); 
} 



/** SPLIT WITH REGEX ============================
 * Takes a single string and recursively split that string when it matches regexs. 
 * @param src a single string 
 * @param regexs a array of regexs 
 * @returns an array of pairs [matching substring, matching regex] 
 */
export function SplitWithRegex(src:string, regexs:RegExp[]):[string, string][] { 
  const [regex, ..._regexs] = regexs; 
  if(!src) 
    return []; 
  if(!regex) 
    return [[src, '']]; 
  const match = regex.exec(src); 
  if(!match) { 
    return SplitWithRegex(src, _regexs); 
  } 

  const before = src.slice(0, match.index); 
  const found = [match[0], regex.source] as [string, string]; 
  const after = src.slice(match.index + found[0].length); 
  const befores = SplitWithRegex(before, _regexs); 
  const afters = SplitWithRegex(after, regexs); 
  return [...befores, found, ...afters]; 
}
