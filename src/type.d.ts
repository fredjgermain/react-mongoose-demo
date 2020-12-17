type FieldPredicate = (ifield:IField) => boolean; 
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
}

interface IRow { 
  id:number; 
  entry:IEntry; 
} 

interface IColumn {} 

interface IOption { 
  value: any; 
  label: string; 
} 

interface ICollection {
  accessor:string; 
  label: string; 
  ifields: Array<IField>; 
  entries: Array<IEntry>; 
}

interface IEntry { 
  _id: string; 
  [key:string]:any; 
} 

interface IField { 
  accessor: string; 
  label: string; 
  type: string; 
  subtype: string; 
  modeltype: string; 
  options: any; 
  defaultValue: any; 
  format: any; 
  sort?: any; 

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
  actionType: EActionType
  success: boolean; 
  data?: any; 
  err?: any[]; 
} 
