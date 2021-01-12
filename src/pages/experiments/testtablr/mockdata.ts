

// Mock data
// Ifields
const ifield = {type:'', accessor:'', defaultValue:'', label:'', options:{}} as IField; 
export const ifields:IField[] = [ 
  {...ifield, type:'string', accessor:'_id', label:'Id'}, 
  {...ifield, type:'number', accessor:'age', label:'Age', defaultValue:0}, 
  {...ifield, type:'string', accessor:'firstName', label:'First name'}, 
  {...ifield, type:'string', accessor:'lastName', label:'Last name'}, 
  {...ifield, type:'string', accessor:'title', label:'Title', isModel:true}, 
]; 

// Data
export const Datas = [ 
  {_id:'id1', age:12, firstName:'a', lastName:'last name a', title:'0'}, 
  {_id:'id2', age:13, firstName:'b', lastName:'last name b', title:'1'}, 
  {_id:'id3', age:14, firstName:'c', lastName:'last name c', title:'2'}, 
  {_id:'id4', age:15, firstName:'d', lastName:'last name d', title:'3'}, 
  {_id:'id5', age:16, firstName:'e', lastName:'last name e', title:'2'}, 
  {_id:'id6', age:17, firstName:'f', lastName:'last name f', title:'3'}, 
  {_id:'id7', age:18, firstName:'g', lastName:'last name g', title:'1'}, 
  {_id:'id8', age:15, firstName:'h', lastName:'last name h', title:'0'}, 
  {_id:'id9', age:16, firstName:'i', lastName:'last name i', title:'2'}, 
  {_id:'id10', age:17, firstName:'j', lastName:'last name j', title:'3'}, 
  {_id:'id11', age:18, firstName:'k', lastName:'last name k', title:'1'} 
]; 

  // Foreign options 
const foreignOptions:IOption[] = [ 
    {value:'0', label:'foreign 0'}, 
    {value:'1', label:'foreign 1'}, 
    {value:'2', label:'foreign 2'}, 
    {value:'3', label:'foreign 3'} 
  ] 
export const GetForeignValue:(ifield:IField, value:any) => any = (ifield:IField, value:any) => { 
  return foreignOptions.find( o=> o.value === value)?.label; 
}
export const GetForeignOptions:(ifield:IField) => IOption[] = (ifield:IField) => foreignOptions; 