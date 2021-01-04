import React from 'react'; 
/*
import {defaultPredicate} from './defaultPredicate'; 
import {GetDefaultRenderer, Default} from './defaultRenderer'; 

export interface IRendering { 
  name:string; 
  predicate: (ifield:IField, handle:string) => boolean; 
  renderer: (ifield:IField) => (value:any, onSendValue:any) => any; 
} 

// FIELD RENDERING ##############################
export class Rendering { 
  // PROPERTIES ------------------------------------
  public fRenderings:IRendering[] = []; 
  public defaultFieldRendering:IRendering = { 
    name:'Default', 
    predicate: (ifield:IField, handle:string) => true, 
    renderer: (ifield:IField) => (value:any, onSendValue:any) => Default, 
  } 

  // Build DEFAULT RENDERING ------------------------
  public DefaultFieldRendering(GetForeignOptions:(ifield:IField) => IOption[], GetForeignValue:(ifield:IField, id:string) => any|undefined) { 
    const renderers = GetDefaultRenderer(GetForeignOptions, GetForeignValue); 
    this.fRenderings = Object.keys(renderers).map( k => { 
      const name = k; 
      const predicate = (defaultPredicate as any)[k]; 
      const renderer = (renderers as any)[k]; 
      return {name, predicate, renderer} as IRendering; 
    }) 
    return this.fRenderings; 
  } 

  // GetRenderer
  to be called by component needing to render using IFieldRendering rules. 
  public GetFieldRendering(ifield:IField, handle:string = ''):IRendering { 

    const found = this.fRenderings.find( fr => { 
      return fr.predicate(ifield, handle); 
    }); 
    if(found) 
      return found; 
    return this.defaultFieldRendering; 
  } 

  public GetRenderer(ifield:IField, handle:string = ''):(value:any, onSendValue:any)=>JSX.Element { 
    const fr = this.GetFieldRendering(ifield, handle); 
    return fr.renderer(ifield); 
  } 
}*/