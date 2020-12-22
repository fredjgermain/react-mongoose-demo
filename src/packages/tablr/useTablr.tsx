import {useEffect, useState, useContext} from 'react'; 
import { FieldRendering } from '../_fieldrendering'; 
import {TablrContext} from './tablr';

export interface IUseTablr{ 
  activeData:any; 
  setActiveData:any; 
  activeRow:number; 
  activeMode:string; 
  SetUseActive: (mode?:string, row?:number, data?:any)=>void; 
  GetActiveMode: (row?:number)=>string; 
  GetRenderer: (ifield:IField, row?:number) => (value: any, onSendValue: any) => JSX.Element;
  GetEmptyData: ()=>any 
}

// useActiveData ========================================
export function useTablr(datas:any[], fieldRendering?:FieldRendering):IUseTablr { 
  const [activeData, setActiveData] = useState({} as any); 
  const [activeRow, setActiveRow] = useState(-1); 
  const [activeMode, setActiveMode] = useState('read'); 

  /*
    When datas has changed, if useActiveData has not been reset, then resetActive
  */
  useEffect(() => { 
    if(activeMode !== 'read' || activeRow !== -1) 
      ResetUseActiveData(); 
  },[datas]); 

  // ResetUseActiveData
  const ResetUseActiveData = () => SetUseActive(); 

  function SetUseActive(mode?:string, row?:number, data?:any) { 
    const Data = data ?? (row !== undefined ? datas[row]: {}); 
    setActiveMode(mode ?? 'read'); 
    setActiveRow(row ?? -1); 
    setActiveData(Data); 
  } 

  function GetActiveMode(row?:number):string { 
    if(row !== undefined && activeRow === row) 
      return activeMode; 
    return ''; 
  } 

  function GetRenderer(ifield:IField, row?:number):(value: any, onSendValue: any) => JSX.Element { 
    const handle = GetActiveMode(row); 
    const fr = fieldRendering ? fieldRendering : new FieldRendering(); 
    return fr.GetRenderer(ifield, GetActiveMode(row)); 
  } 

  function GetEmptyData():any { 
    const {UseColumnSettings:{ifields}} = useContext(TablrContext); 
    const emptyData:any = {}; 
    ifields.forEach( f => {
      emptyData[f.accessor] = f.defaultValue;
    }); 
    return emptyData; 
  } 

  /*function SetActiveDataField(newValue:any, k:string) { 
    const newData = {...activeData}; 
    newData[k] = newValue; 
    setActiveData(k); 
  }*/

  return {activeData, setActiveData, activeRow, activeMode, SetUseActive, GetActiveMode, GetRenderer, GetEmptyData} as IUseTablr; 
}