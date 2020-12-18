import {BuildDefaultFieldRenderings} from './defaultFieldRendering'; 
import InputObject, {InputObjectContext} from './object'; 
import * as Fields from './fields'; 
import * as Rows from './rows'; 
import Table, {TableContext} from './table'; 

export {BuildDefaultFieldRenderings, InputObject, InputObjectContext, Fields, Rows, Table, TableContext}; 

export type Renderer = (ifield:IField) => (value:any, onSendValue:any) => any; 

export interface IFieldRendering { 
  predicate: (ifield:IField, handle:string) => boolean; 
  renderer: Renderer; 
} 

export interface IForeignValues { 
  GetForeignOptions: (ifield:IField) => IOption[]; 
  GetForeignValue: (ifield:IField, id:string) => any|undefined; 
} 

