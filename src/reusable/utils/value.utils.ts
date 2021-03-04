/* Copy ========================================= 
return a shallow copy of a value 
if that value is either an array or an object

otherwise return the value itself. 
*/
export function Copy(value:any) { 
  if(Array.isArray(value)) 
    return [...value] 
  if(typeof value === 'object') 
    return {...value} 
  return value; 
} 


/* HasKey =========================================
Recursively search through 'value' to find the nested keys specified in keys. 
Returns false if it fails to find one of the keys. 
Return true if it find all of the keys. 

!!! Note: Works for both objects and arrays. 
*/ 
export function HasKey(value:any, keys?:any[]):boolean { 
  if(IsEmpty(value) || !keys || IsEmpty(keys)) 
    return false; 
  const [key, ...remainingKeys] = keys; 
  const _key = typeof key === 'string' ? key: new Number(key).toString(); 
  if(!Object.keys(value).includes(_key) ) 
    return false; 
  if(IsEmpty(remainingKeys)) 
    return true; 
  return HasKey(value[_key], remainingKeys); 
}


/* SetValueAt =====================================
Assign a newValue in object or array value at the index/key defined by keys. 
Can assign a newValue to object with multiple levels. 
*/
export function SetValueAt(value:any, newValue:any, keys?:any[]):any { 
  if(!keys || IsEmpty(keys)) 
    return newValue; 
  const [key, ...remainingKeys] = keys; 
  const copy = Copy(value); 
  copy[key] = IsEmpty(remainingKeys) ? 
    copy[key] = newValue: 
    copy[key] = SetValueAt(copy[key], newValue, remainingKeys); 
  return copy; 
} 

/* GetValueAt ========================================
Return value specified at 'keys' 
*/
export function GetValueAt(value:any, keys?:any[]):any { 
  if(IsEmpty(value) || !keys || IsEmpty(keys)) 
    return value; 
  const [key, ...remainingKeys] = keys; 
  return GetValueAt(value[key], remainingKeys); 
} 


/* IsNUll =======================================
returns true if value is:
  - undefined
  - null
otherwise returns false
*/
export function IsNull(value:any): boolean { 
  return (value ?? null) === null || IsNaN(value); 
} 

export function IsNaN(value:any): boolean { 
  return typeof value === 'number' && new Number(value).toString() === 'NaN'; 
}

/* IsEmpty ====================================== 
return true if value is 
  - undefined
  - null
  - '' (an empty string)
  - [] (an empty array)
  - {} (an empty object)
otherwise returns false
*/
export function IsEmpty(value:any): boolean {
  if(IsNull(value)) 
    return true; 
  if(Array.isArray(value) && value.length === 0) 
    return true; 
  if(JSON.stringify(value) === '{}') 
    return true; 
  if(value === '') 
    return true; 
  return false; 
}


