

// Mock data
// Ifields
const ifield = {type:'', accessor:'', defaultValue:'', label:'', options:{}} as IField; 
export const ifields:IField[] = [ 
  {...ifield, type:'string', accessor:'_id', label:'Id'}, 
  {...ifield, type:'number', accessor:'age', label:'Age', defaultValue:0}, 
  {...ifield, type:'string', accessor:'firstName', label:'First name'}, 
  {...ifield, type:'string', accessor:'lastName', label:'Last name'}, 
  {...ifield, type:'string', accessor:'title', label:'Title'}, 
]; 

// Data
export const Datas = [ 
  {_id:'id1', age:12, firstName:'a', lastName:'last name a', title:'title a'}, 
  {_id:'id2', age:13, firstName:'b', lastName:'last name b', title:'title b'}, 
  {_id:'id3', age:14, firstName:'c', lastName:'last name c', title:'title c'}, 
  {_id:'id4', age:15, firstName:'d', lastName:'last name d', title:'title d'}, 
  {_id:'id5', age:16, firstName:'e', lastName:'last name e', title:'title e'}, 
  {_id:'id6', age:17, firstName:'f', lastName:'last name f', title:'title f'}, 
  {_id:'id7', age:18, firstName:'g', lastName:'last name g', title:'title g'}, 
  {_id:'id8', age:15, firstName:'h', lastName:'last name h', title:'title h'}, 
  {_id:'id9', age:16, firstName:'i', lastName:'last name i', title:'title i'}, 
  {_id:'id10', age:17, firstName:'j', lastName:'last name j', title:'title j'}, 
  {_id:'id11', age:18, firstName:'k', lastName:'last name k', title:'title k'} 
]; 
