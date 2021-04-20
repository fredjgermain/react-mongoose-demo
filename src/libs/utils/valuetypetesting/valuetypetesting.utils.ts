import { Pick, ToArray } from "../../_arrayutils";

// TYPE VALUE TESTING ###########################
export function GetDefaultIEntry(ifields:IField[]) { 
  let entry = {} as IEntry; 
  ifields?.forEach( f => { 
    entry[f.accessor] = GetDefaultValueFromIField(f); 
  }); 
  return entry; 
}

export function GetSelectedValuesFromOptions(value:any, options:IOption[]) { 
  return Pick(options, ToArray(value), (o,u) => o.value === u); 
}

export function GetDefaultValueFromIField(ifield:IField) { 
  if(ifield.isArray) 
    return []; 
  if(ifield.isModel) 
    return ''; // return an null id value ?? 
  if(ifield.isMixed) 
    return {}; 
  if(ifield.defaultValue) 
    return ifield.defaultValue; 
  return GetDefaultValueByType(ifield.type); 
}

export function IsInRange(value:number, min?:number, max?:number) { 
  if(!value && min) 
    return false; 
  const minCondition = min ? (value >= min) : true; 
  const maxCondition = max ? (value <= max) : true; 
  return minCondition && maxCondition; 
} 

export function GetTypeByValue(value:any) { 
  if(typeof value === 'string') 
    return 'string'; 
  if(typeof value === 'number') 
    return 'number'; 
  if(typeof value === 'boolean') 
    return 'boolean'; 
  if(Array.isArray(value)) 
    return 'array'; 
  if(typeof value === 'object') 
    return 'object'; 
}

export function GetDefaultValueByType(type:string) { 
  if(type==='boolean') 
    return false; 
  if(type==='string') 
    return ''; 
  if(type==='number') 
    return 0; 
  if(type==='array') 
    return []; 
  if(type==='date') 
    return new Date(); 
  if(type==='object') 
    return {}; 
  return null; 
}

