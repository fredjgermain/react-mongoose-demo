// TYPE VALUE TESTING ###########################
export function GetDefaultValueFromIField(ifield:IField) { 
  if(ifield.isArray) 
    return []; 
  if(ifield.isModel) 
    return ''; // return an null id value ?? 
  if(ifield.isMixed) 
    return {}; 
  return ifield.defaultValue; 
}

export function SetValueAt(value:any, newValue:any, keys?:any[]):any { 
  if(!keys || IsEmpty(keys)) 
    return value; 
  const [key, ...remainingKeys] = keys; 
  const copy = Copy(value); 
  copy[key] = IsEmpty(remainingKeys) ? 
    copy[key] = newValue: 
    copy[key] = SetValueAt(copy[key], newValue, remainingKeys); 
  return copy; 
} 

export function GetValueAt(value:any, keys?:any[]):any { 
  if(!keys || IsEmpty(keys)) 
    return value; 
  const [key, ...remainingKeys] = keys; 
  return GetValueAt(value[key], remainingKeys); 
} 

export function Copy(value:any) { 
  if(Array.isArray(value)) 
    return [...value] 
  if(typeof value === 'object') 
    return {...value} 
  return value; 
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

export function IsNull(value:any) { 
  return (value ?? null) === null || JSON.stringify(value) === 'null' || value === undefined; 
} 

export function IsEmpty(value:any) { 
  return IsNull(value) || 
    value === '' || 
    (Array.isArray(value) && value.length === 0) || 
    (typeof value === 'object' && JSON.stringify(value) === '{}'); 
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