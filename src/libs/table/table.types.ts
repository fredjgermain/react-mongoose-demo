import type { Indexed } from './utils/utils'; 

export interface IUseInlineEntry { 
  entry: IEntry; 
  SetEntry: (newEntry:IEntry) => void; 
  isSelected: boolean; 
  isEditing: boolean; 
} 

export type IInlineState = {row:string, mode:string}; 

export interface IInlineTable { 
  indexedDatas:Indexed<IEntry>, 
  defaultEntry:IEntry, 

  Create: (entry: IEntry) => Promise<ICrudResponse>; 
  Update: (entry: IEntry) => Promise<ICrudResponse>; 
  Delete: (entry: IEntry) => Promise<ICrudResponse>; 
} 


export interface IUseInlineTable extends IInlineTable { 
  GetEntry: (row?:string) => IEntry; 

  inlineState: IInlineState; 
  SetInlineState: (newValue: IInlineState) => void; 
  ResetInlineState: () => void; 
}