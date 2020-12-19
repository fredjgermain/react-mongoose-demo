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
  public defaultFieldRendering:IFieldRendering = { 
    name:'Default', 
    predicate: (ifield:IField, handle:string) => true, 
    renderer: (ifield:IField) => (value:any, onSendValue:any) => <span>{JSON.stringify(value)}</span>, 
  } 

  // Build DEFAULT RENDERING ------------------------
  public DefaultFieldRendering(GetForeignOptions:TForeignOptions, GetForeignValue:TForeignValue) { 
    const renderers = GetDefaultRenderer(GetForeignOptions, GetForeignValue); 
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
  public GetFieldRendering(ifield:IField, handle:string = ''):IFieldRendering { 
    const found = this.fRenderings.find( fr => fr.predicate(ifield, handle));     
    if(found) 
      return found; 
    return this.defaultFieldRendering; 
  } 

  public GetRenderer(ifield:IField, handle:string = ''):(value:any, onSendValue:any)=>JSX.Element { 
    const fr = this.GetFieldRendering(ifield,handle); 
    console.log(fr.name); 
    return fr.renderer(ifield); 
  } 
}