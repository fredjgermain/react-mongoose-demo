import { IsEmpty, IsInRange, IsNull } from '../../_utils'; 

//console.log(new RegExp("^[a-zA-Z]{4}[0-9]{8}$").test('JEAF23118301')); 


export const ValidatorRequired = ():IValidator => { 
  return (value:any) => !IsNull(value); 
} 

export const ValidatorMinMaxNumber = (min?:number, max?:number):IValidator => { 
  return (value:any) => IsInRange(value, min, max); 
} 

export const ValidatorArrayLength = (min?:number, max?:number):IValidator => { 
  return (value:any[] = []) => { 
    if(!Array.isArray(value)) 
      return false; 
    return IsInRange(value.length, min, max) 
  }; 
} 

export const ValidatorRegex = (regex:string):IValidator => { 
  return (value:string) => { 
    const result = new RegExp(regex).test(value);
    console.log([value, regex, result]); 
    return result; 
  }; 
} 