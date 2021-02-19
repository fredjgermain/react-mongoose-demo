// TYPE VALUE TESTING ###########################
export function GetDefaultIEntry(ifields:IField[]) { 
  let entry = {} as IEntry; 
  ifields?.forEach( f => { 
    entry[f.accessor] = GetDefaultValueFromIField(f); 
  }); 
  return entry; 
}

export function GetDefaultValueFromIField(ifield:IField) { 
  if(ifield.isArray) 
    return []; 
  if(ifield.isModel) 
    return ''; // return an null id value ?? 
  if(ifield.isMixed) 
    return {}; 
  return ifield.defaultValue; 
}

/*
export function Edit(prev:any, newValue:any, key:string|number) { 
  const edited = Copy(prev); 
  edited[key] = newValue; 
  return edited; 
} 

export function Read(value:any, key:string|number) { 
  return value[key]; 
} */

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
  if(type==='string') 
    return '';
  if(type==='number')
    return 0; 
  if(type==='array')
    return []; 
  if(type==='object')
    return {}; 
  return null; 
}