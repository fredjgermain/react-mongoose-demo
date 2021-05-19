

/** REDUCETOSTRING ==============================
 * Reduces an array of strings to a single string. 
 * @param strArray 
 * @param delimiter 
 * @returns a single string. 
 */
export function ReduceToString(strArray:string[], delimiter:string = '') { 
  return (strArray ?? []).reduce( (prev, curr, i) => prev + ( i ? `${delimiter}${curr}`: `${curr}` ), ''); 
} 



/** SPLIT WITH REGEX ============================
 * Takes a single string and recursively split that string in an array of strings, including the mathching regex pattern. 
 * @param src a single string 
 * @param regex a regex 
 * @returns a string[] including the matching pattern 
 */
export function SplitWithRegex(src:string, regex:RegExp):(string|[string, string])[] { 
  if(!src) 
    return []; 
  let match = src.match(regex) as any; 
  if(!match) 
    return [src]; 

  const before = src.slice(0, match.index); 
  const found = match[0]; 

  const remain = src.slice(match.index + found.length); 
  if(before) 
    return [[before,''], [found, found], ...SplitWithRegex(remain, regex)]; 
  return [[found, found], ...SplitWithRegex(remain, regex)]; 
}
