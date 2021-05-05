
export type InlineState = {row?:number, mode:string}; 
export interface IUseInlineTable { 
  collection: string; 
  datas:IEntry[]; 

  rows: number[]; 
  cols: string[]; 

  inlineState: InlineState; 
  SetInlineState: (newValue: InlineState) => void; 
  ResetInlineState: () => void; 

  inlineFeedback: ICrudResponse; 
  SetInlineFeedback: (newValue: ICrudResponse) => void; 
  ResetInlineFeedback: () => void; 

  Create(entry: IEntry): Promise<ICrudResponse>
  Update(entry: IEntry): Promise<ICrudResponse>
  Delete(entry: IEntry): Promise<ICrudResponse>
} 

export interface IUseInlineEntry { 
  entry: IEntry; 
  SetEntry: (newEntry: any) => void; 
}