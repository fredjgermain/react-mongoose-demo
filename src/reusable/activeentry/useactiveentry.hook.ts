import React, {useState, useEffect} from 'react'; 
import {GetDefaultValueFromIField} from '../_utils';

export interface IUseActive { 
  active :IActive; 
  ResetActive: () => void; 
  SetActive: (row:number, mode:string) => void; 
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
  //const [active, setActive] = useState({data:FetchData(datas, ifields)} as IActive); 
  const [active, setActive] = useState(InitActive()); 

  function InitActive() {
    return {data:FetchData(datas, ifields), row:-1, mode:'read'} as IActive; 
  }

  useEffect(() => { 
    ResetActive(); 
  }, [JSON.stringify(ifields)]); 

  function ResetActive() { 
    if(JSON.stringify(active) !== JSON.stringify(InitActive())) 
      setActive(() => InitActive()); 
  } 
  
  //const GetActive = ():IActive => active; 
  function SetActive (row:number, mode:string) { 
    setActive((prev:any) => { 
      const data = FetchData(datas, ifields, row); 
      console.log(['SetActive', data]); 
      return {...prev, data:FetchData(datas, ifields, row), row, mode} 
      //return {data:FetchData(datas, ifields, row), row, mode}
    }); 
  } 
  //const IsActive = (row?:number):boolean => row !== undefined && active.row === row; 
  //const GetMode = (row:number):string => IsActive(row) ? active.mode ?? '' : ''; 

  // returns data with default values if not defined 
  /*const GetData = (row?:number):any => { 
    return IsActive(row) ? active.data : FetchData(datas, ifields, row); 
  } */
  function SetData (data:any):void { 
    setActive((prev:any) => { 
      //const data = FetchData(datas, ifields); 
      console.log(['SetData', data]); 
      return {...prev, data} 
    }); 
  } 
  return {active, ResetActive, SetActive, SetData}; 
} 


// FetchData from datas if it can find it and complete undefined data with their defaultvalue. 
function FetchData(datas:any, ifields:IField[],  row?:number) { 
  let data:any = (row !== undefined && row >= 0) ? datas[row]: {}; 
  ifields.forEach( f => { 
    if(data[f.accessor] === undefined) 
      data[f.accessor] = GetDefaultValueFromIField(f); 
  }); 
  return data; 
} 