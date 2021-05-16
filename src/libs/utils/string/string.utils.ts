
export function ReduceToString(strArray:string[], delimiter:string = ', ') { 
  return (strArray ?? []).reduce( (prev, curr, i) => prev + ( i ? `${delimiter}${curr}`: `${curr}` ), ''); 
} 


