// TYPE VALUE TESTING ###########################
export function IsNull(value:any) { 
  return (value ?? null) === null; 
} 

export function IsEmpty(value:any) { 
  return IsNull(value) || 
    value === '' || 
    (Array.isArray(value) && value.length === 0) || 
    (typeof value === 'object' && JSON.stringify(value) === '{}'); 
} 
