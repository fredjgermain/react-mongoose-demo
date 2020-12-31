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
  const {path, instance, options} = field; 
  const ifield:IField = {} as IField; 
  ifield.accessor = path; 
  ifield.label = options.label ?? ''; 
  ifield.options = options; 
  ifield.type = GetType(field); 
  ifield.enums = options['enum'] ?? []; 
  ifield.format = options.format ?? "${value}"; 
  ifield.sort = options.sortType ?? ''; 
  ifield.defaultValue = GetDefaultValue(ifield.type, ifield.options); 
  
  ifield.isEnum = options['enum']? true: false; 
  ifield.isArray = instance.toLowerCase() === 'array'; 
  ifield.isModel = instance.toLowerCase() === 'objectid'; 
  //ifield.isMixed = 
  //ifield.validators = 
  return ifield; 
} 

function GetType({instance, $embeddedSchemaType}:IMongooseField) { 
  if(instance.toLocaleLowerCase() === 'array') 
    return ($embeddedSchemaType?.instance ?? '').toLocaleLowerCase(); 
  return instance.toLocaleLowerCase(); 
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