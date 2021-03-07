interface IOption{ 
  value:any; 
  label:string; 
} 

type TKey = string|number; 

interface ICollection { 
  accessor:string; 
  label: string; 
  ifields: IField[]; 
  entries: IEntry[]; 
} 

interface IEntry { 
  _id: string; 
  [key:string]:any; 
} 

type IValidator = (value:any) => boolean; 

interface IField { 
  accessor: string; 
  label: string; 
  type: string;         // takes type name or modelName or element type if is an array
  defaultValue: any; 

  validators?: IValidator[]; 
  isRequired?: boolean; 
  regex?: string; 
  format?: any; 
  isMixed?: boolean; 
  isArray?: boolean; 
  isModel?: boolean; 
  isEnum?: boolean; 
  enums?: string[]; 
  isAbbrev?: boolean; 
  sort?: string; 
} 


interface ICrudResponse { 
  actionType: EActionType; 
  success: boolean; 
  data: any; 
  err: any[]; 
} 
