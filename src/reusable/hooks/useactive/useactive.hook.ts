import React, {useState} from 'react'; 

export interface IUseActive { 
  active :IActive; 
  SetActive: (row?:number, mode?:string) => void; 
  SetData: (data:any) => void; 
  /*GetActive: () => IActive; 
  IsActive: (row:number) => boolean; 
  GetMode: (row:number) => string; 
  GetData: (row:number) => any; */ 
} 
interface IActive { 
  data:any; 
  row?:number; 
  mode?:string; 
} 

// UseActive ====================================
export function useActive(datas:any[], ifields:IField[]):IUseActive { 
  const [active, setActive] = useState({data:FetchData(datas, ifields)} as IActive); 
  
  //const GetActive = ():IActive => active; 
  const SetActive = (row?:number, mode?:string) => { 
    setActive(() => {return {data:FetchData(datas, ifields, row), row, mode}} ); 
  } 
  //const IsActive = (row?:number):boolean => row !== undefined && active.row === row; 
  //const GetMode = (row:number):string => IsActive(row) ? active.mode ?? '' : ''; 

  // returns data with default values if not defined 
  /*const GetData = (row?:number):any => { 
    return IsActive(row) ? active.data : FetchData(datas, ifields, row); 
  } */
  const SetData = (data:any):void => { 
    setActive((prev:any) => { 
      return {...prev, data}} 
    ); 
  } 
  return {active, SetActive, SetData}; 
} 

// FetchData from datas if it can find it and complete undefined data with their defaultvalue. 
function FetchData(datas:any, ifields:IField[],  row?:number) { 
  let data:any = (row !== undefined && row >= 0) ? datas[row]: {}; 
  ifields.forEach(f => { 
    if(data[f.accessor] === undefined) 
      data[f.accessor] = DefaultValue(f); 
  }); 
  return data; 
}

function DefaultValue(ifield:IField) { 
  if(ifield.isArray) 
    return []; 
  if(ifield.isModel) 
    return ''; // return an null id value ?? 
  return ifield.defaultValue; 
}