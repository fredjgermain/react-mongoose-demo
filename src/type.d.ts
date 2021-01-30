interface IOption{ 
  value:any; 
  label:string; 
} 

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
  defaultValue: any; 

  validators?: IValidator[]; 
  isRequired?: boolean; 
  regex?: string; 

  /*validation: { 
    required: boolean; 
    regex: string; 
    range: { 
      min: number; 
      max: number; 
    }; 
  }; */ 

  format?: any; 
  isMixed?: boolean; 
  isArray?: boolean; 
  isModel?: boolean; 
  isEnum?: boolean; 
  isAbbrev?: boolean; 
  enums?: string[]; 
  sort?: string; 
} 

enum EActionType { 
  CREATE = 'create', 
  READ = 'read', 
  UPDATE = 'update', 
  DELETE = 'delete', 
}

interface ICrudResponse { 
  actionType: EActionType; 
  success: boolean; 
  data: any; 
  err: any[]; 
} 
