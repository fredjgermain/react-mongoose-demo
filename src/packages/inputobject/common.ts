import {BuildDefaultFieldRenderings, IForeignValues} from './components/defaultFieldRendering'; 
import {Collection, Field, Crud, crud, Dao} from '../mongoosedao/common'; 

export {Collection, Field, Crud, crud, Dao} 

export {BuildDefaultFieldRenderings as BuildFieldRendering}; 
export type {IForeignValues}; 

export type Renderer = (ifield:IField) => (value:any, onSendValue:any) => any; 

export interface IColumnSetting { 
  ifield: IField; 
  order?: number;     // < 0 are hidden, > 0 are shown. 
  //sort?: ; 
} 

export interface IFieldRendering { 
  predicate: (ifield:IField, handle:string) => boolean; 
  renderer: Renderer; 
} 