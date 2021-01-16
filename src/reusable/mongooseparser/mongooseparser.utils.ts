export interface IMongooseModel { 
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

//async function ParseFields() 
export function ParseField(field:IMongooseField):IField {   
  const {path, instance, options, $embeddedSchemaType} = field; 
  const ifield:IField = {} as IField; 

  ifield.accessor = path ?? ''; 
  ifield.label = options.label ?? ''; 
  ifield.options = options ?? {}; 
  ifield.type = options?.ref ?? $embeddedSchemaType?.instance ?? field.instance.toLowerCase(); 
  ifield.isMixed = instance.toLowerCase() === 'mixed'; 
  ifield.isEnum = !!options?.enum; 
  ifield.isArray = instance.toLowerCase() === 'array'; 
  ifield.isModel = !!options?.ref; 
  ifield.isAbbrev = !!options?.abbrev; 

  ifield.enums = options.enum ?? []; 
  ifield.format = options.format ?? "${value}"; 
  ifield.sort = options.sortType ?? ''; 
  ifield.defaultValue = GetDefaultValue(ifield.type, ifield.options); 
  
  //ifield.validators = 
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