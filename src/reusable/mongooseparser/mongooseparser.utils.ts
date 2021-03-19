import {IsEmpty, IsInRange} from '../_utils';

export interface IMongooseCollection { 
  accessor:string; 
  label:string; 
  fields: IMongooseField[]; 
  entries: IEntry[]; 
} 

export interface IMongooseField { 
  path:string;  // accessor 
  instance:string; 
  validators: any; 
  options: { 
    ref?: string; 
    label?: string; 
    sortType?: string; 
    defaultValue?: any; 
    format?: string; 
    enum?: any[]; 
    abbrev?: boolean; 
    [key:string]:any; 
  }; 
  $embeddedSchemaType?:{ 
    instance:string; 
  }; 
  [key:string]:any; 
} 


// Parser functions =============================
export function ParseCollection(model:any):ICollection { 
  const accessor = model['accessor']; 
  const label = model['label']; 
  const ifields = ParseFields(model['fields']); 
  const entries = model['entries']; 
  return {accessor, label, ifields, entries}; 
} 

export function ParseFields(fields:any):IField[] { 
  const mongooseFields:IMongooseField[] = Object.keys(fields).map(f => fields[f]); 
  return mongooseFields.map(f=>ParseField(f)); 
} 

export function ParseField(field:IMongooseField):IField { 
  const {path, instance, options, $embeddedSchemaType} = field; 
  const ifield:IField = {} as IField; 

  ifield.accessor = path ?? ''; 
  ifield.label = options.label ?? ''; 
  ifield.type = options?.ref ?? $embeddedSchemaType?.instance ?? field.instance.toLowerCase(); 
  ifield.isMixed = instance.toLowerCase() === 'mixed'; 
  ifield.isEnum = !!options?.enum; 
  ifield.isArray = instance.toLowerCase() === 'array'; 
  ifield.isModel = !!options?.ref; 
  ifield.isAbbrev = !!options?.abbrev; 
  ifield.validators = GetValidators(field); 
  ifield.isRequired = field.options['required'] ?? false; 
  ifield.regex = field.options['regex']? field.options['regex']: undefined; 

  ifield.enums = options.enum ?? []; 
  ifield.format = options.format ?? "${value}"; 
  ifield.sort = options.sortType ?? ''; 
  ifield.defaultValue = GetDefaultValue(ifield.type, field.options); 

  return ifield; 
} 


function GetDefaultValue(type:string, options:any):any { 
  if(options['defaultValue']) 
    return options['defaultValue']; 
  if(options['default']) 
    return options['default']; 
  if(type === 'boolean') 
    return false; 
  if(type === 'number') 
    return 0; 
  return ''; 
} 






function GetValidators(field:IMongooseField):IValidator[] { 
  const required = (value:any) => { 
    return !IsEmpty(value); 
  }; 

  const regex = (value:any) => { 
    if(field.options['regex']) 
      return new RegExp(field.options['regex']).test(value); 
    return true; 
  } 

  const arrayLength = (value:any[]) => { 
    return IsInRange(value.length, field.options['minelements'], field.options['maxelements']) 
  } 

  const numberRange = (value:any) => { 
    return IsInRange(value, field.options['min'], field.options['max']); 
  } 

  let validators:IValidator[] = []; 
  if(field.options['required']) 
    validators.push(required); 
  if(field.options['regex']) 
    validators.push(regex); 
  if(field.options['min'] || field.options['max']) 
    validators.push(numberRange); 
  if(field.options['minelements'] || field.options['maxelements']) 
    validators.push(arrayLength); 
  return validators; 
} 



