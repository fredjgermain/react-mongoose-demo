import {useState, useEffect} from 'react'; 
import {IColumnSetting} from '../colsetting/columnsetting'; 


export function ColumnSetter(cols:IColumnSetting[], setter:(col:IColumnSetting)=>void) { 
  cols.map( c => setter(c) ); 
} 

// useColumnSetting ===========================
export function useColumnSetting(defaultColumnSetting:IColumnSetting[]) { 
  const [columnSettings, setColumnSettings] = useState(defaultColumnSetting); 

  useEffect(() => { 
    setColumnSettings(defaultColumnSetting); 
  },[JSON.stringify(defaultColumnSetting)]); 

  // Get Column Settings ------------------------
  function GetColumnSettings(handle?:string):IColumnSetting[] { 
    const ifields = GetFields(); 
    return ifields.map( f => { 
      return GetIColumnSetting(f, handle); 
    }); 
  } 

  function GetIColumnSetting(ifield:IField, handle?:string):IColumnSetting { 
    const defaultCol = columnSettings.find( c => c.ifield.accessor === ifield.accessor && !c.predicate); 
    const activeCol = columnSettings.find( c => c.ifield.accessor === ifield.accessor && c.predicate && c.predicate(handle)); 
    return activeCol ?? defaultCol ?? {} as IColumnSetting; 
  } 

  function GetFields():IField[] { 
    const ifields:IField[] = []; 
    columnSettings.forEach( c => { 
      if(c.show && ifields.every(f => f.accessor != c.ifield.accessor)) 
        ifields.push(c.ifield); 
    }); 
    return ifields; 
  } 

  // FilterColumnSetting
  function FilterColumns(columns:string[]) { 
    const filtered:(IColumnSetting|undefined)[] = columns.map( (c,i) => { 
      const found = defaultColumnSetting.find( cs => cs.ifield.accessor === c); 
      if(found) 
        found.order = i; 
      return found; 
    }); 
    if(filtered === undefined || filtered.length ===0) 
      return; 
    setColumnSettings(filtered as IColumnSetting[]); 
  } 

  function SortBy() {} 

  return {GetColumnSettings, FilterColumns}; 
}
