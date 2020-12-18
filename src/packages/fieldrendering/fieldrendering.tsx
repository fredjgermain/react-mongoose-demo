import React from 'react'; 
import {defaultPredicate} from './defaultPredicate'; 
import {GetDefaultRenderer} from './defaultRenderer'; 

export interface IFieldRendering { 
  name:string; 
  predicate: (ifield:IField, handle:string) => boolean; 
  renderer: (ifield:IField) => (value:any, onSendValue:any) => any; 
} 

type TForeignValue = (ifield:IField, id:string) => any|undefined; 
type TForeignOptions = (ifield:IField) => IOption[]; 

// FIELD RENDERING ##############################
export default class FieldRendering { 
  // PROPERTIES ------------------------------------
  public fRenderings:IFieldRendering[] = []; 
  public defaultRenderer:(ifield: IField) => (value: any, onSendValue: any) => JSX.Element 
    = (ifield: IField) => (value: any, onSendValue: any) => <div>{JSON.stringify(value)}</div>; 

  // Build DEFAULT RENDERING ------------------------
  public DefaultFieldRendering(GetForeignOptions:TForeignOptions, GetForeignValue:TForeignValue) { 
    const {DefaultRenderer, ...renderers} = GetDefaultRenderer(GetForeignOptions, GetForeignValue); 
    this.defaultRenderer = DefaultRenderer; 
    this.fRenderings = Object.keys(renderers).map( k => { 
      const name = k; 
      const predicate = (defaultPredicate as any)[k]; 
      const renderer = (renderers as any)[k]; 
      return {name, predicate, renderer} as IFieldRendering; 
    }) 
    return this.fRenderings; 
  } 

  // GetRenderer
  /*
  to be called by component needing to render using IFieldRendering rules. 
  */
  public GetRenderer(ifield:IField, handle:string):(value: any, onSendValue: any) => JSX.Element { 
    const found = this.fRenderings.find( fr => fr.predicate(ifield, handle)); 
    if(found) 
      return found.renderer(ifield); 
    return this.defaultRenderer(ifield); 
  }
}