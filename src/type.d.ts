/*type FieldPredicate = (ifield:IField) => boolean; 
type ReadFunc = (ifield:IField, value:any) => any; 
type EditFunc = (ifield:IField, value:any, setValue:any) => any; 
interface IFieldFormat { 
  ifield:IField; 
  readFunc?:ReadFunc; 
  editFunc?:EditFunc; 
} 
type CrudFunc = (entry:IEntry) => Promise<boolean> 
interface ICrudSettings { 
  Create:CrudFunc; 
  Update:CrudFunc; 
  Delete:CrudFunc; 
}*/

/*interface IRow { 
  id:number; 
  entry:IEntry; 
} 

interface IColumn {} */

/*interface IOption { 
  value: any; 
  label: string; 
} */

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

  format?: any; 
  isMixed?: boolean; 
  isArray?: boolean; 
  isModel?: boolean; 
  isEnum?: boolean; 
  isAbbrev?: boolean; 
  enums?: string[]; 
  sort?: string; 

  /*cellMode:{ 
    read:(value:any) => any, 
    edit:(value:any, setValue:any) => any, 
    //hover: defaultDisplay, 
  } */
} 

enum EActionType { 
  CREATE = 'create', 
  READ = 'read', 
  UPDATE = 'update', 
  DELETE = 'delete', 
}

interface IResponse { 
  actionType: EActionType; 
  success: boolean; 
  data?: any; 
  err?: any[]; 
} 
