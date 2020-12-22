import React, {useContext, useEffect, useState} from 'react'; 
import { useColumnSetting, IUseColumnSetting } from '../customhooks/usecolumnsetting';
import { FieldRendering } from '../_fieldrendering'; 
import {useTablr, IUseTablr} from './useTablr'; 

// TABLR ========================================
interface ITablrContext { 
  datas:any[]; 
  UseTablr: IUseTablr; 
  UseColumnSettings: IUseColumnSetting; 
  fieldRendering?: FieldRendering; 
} 
export const TablrContext = React.createContext({} as ITablrContext); 

interface ITablr { 
  datas:any[]; 
  columnSettings: IField[]; 
  fieldRendering?: FieldRendering; 
} 
export default function Tablr({datas, columnSettings, fieldRendering, children}: React.PropsWithChildren<ITablr>) { 
  const UseColumnSettings = useColumnSetting(columnSettings); 
  const UseTablr = useTablr(datas, fieldRendering); 

  const context:ITablrContext = {datas, UseTablr, UseColumnSettings, fieldRendering} 

  return <TablrContext.Provider value={context} > 
    <table>
      {children}
    </table>
  </TablrContext.Provider>
} 


