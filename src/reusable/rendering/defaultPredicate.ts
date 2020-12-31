import {Field} from '../_field'; 

// DEFAULT PREDICATE ###############################
const Edit = (handle:string):boolean => ['update', 'create'].includes(handle); 
//const Edit = (handle:string):boolean => handle === 'edit; 

export const defaultPredicate = {
  // primitives
  ReadOnePrimitive: (ifield:IField, handle:string) => new Field(ifield).OnePrimitive() && !Edit(handle), 
  EditOnePrimitive: (ifield:IField, handle:string) => new Field(ifield).OnePrimitive() && Edit(handle), 
  ReadManyPrimitive: (ifield:IField, handle:string) => new Field(ifield).ManyPrimitive() && !Edit(handle), 
  EditManyPrimitive: (ifield:IField, handle:string) => new Field(ifield).ManyPrimitive() && Edit(handle), 

  // mixed

  // enums
  ReadOneEnum: (ifield:IField, handle:string) => new Field(ifield).OneEnum()  && !Edit(handle), 
  EditOneEnum: (ifield:IField, handle:string) => new Field(ifield).OneEnum() && Edit(handle), 
  ReadManyEnum: (ifield:IField, handle:string) => new Field(ifield).ManyEnum() && !Edit(handle), 
  EditManyEnum: (ifield:IField, handle:string) => new Field(ifield).ManyEnum() && Edit(handle), 

  // foreigns
  ReadOneForeign: (ifield:IField, handle:string) => new Field(ifield).OneForeign() && !Edit(handle), 
  EditOneForeign: (ifield:IField, handle:string) => new Field(ifield).OneForeign() && Edit(handle), 
  ReadManyForeign: (ifield:IField, handle:string) => new Field(ifield).ManyForeign() && !Edit(handle), 
  EditManyForeign: (ifield:IField, handle:string) => new Field(ifield).ManyForeign() && Edit(handle), 
  // default 
  Default: (ifield:IField, handle:string) => true, 
}