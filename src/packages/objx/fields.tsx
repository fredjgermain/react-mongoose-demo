import React, {useContext} from 'react'; 
import {ObjxContext} from './objx'; 
import {FieldRendering} from '../_fieldrendering'; 

/*
  const fr = fieldRendering ? fieldRendering : new FieldRendering(); 
  const Renderer = fr.GetRenderer(ifield, ''); 
*/

// Context 
export interface IFieldContext { 
  ifield:IField; 
  obj:any; 
  setObj:any; 
  renderer:(value:any, onSendValue:any) => JSX.Element; 
} 
export const FieldContext = React.createContext({} as IFieldContext); 

// Fields =======================================
export function Fields({children}:React.PropsWithChildren<any>) { 
  const {obj, setObj, fieldRendering, columnSettings} = useContext(ObjxContext); 

  const fr = fieldRendering ? fieldRendering : new FieldRendering(); 
  const handle = ''; 
  
  // RENDER -------------------------------------
  return <div> 
    {columnSettings.map( (ifield, i) => { 
      const renderer = fr.GetRenderer(ifield, handle); 
      const context:IFieldContext = {ifield, obj, setObj, renderer}; 
      return <FieldContext.Provider key={i} value={context}><div> 
        {children} 
      </div></FieldContext.Provider> 
    })} 
  </div> 
} 



// FieldLabel ===================================
export function FieldLabel() { 
  const {ifield} = useContext(FieldContext); 
  return <span>{ifield.label}: </span> 
}



// FieldRenderer =====================================
export function FieldRenderer() { 
  const {obj, ifield, setObj, renderer} = useContext(FieldContext); 

  const value = obj[ifield.accessor]; 
  const onSendValue = (newValue:any) => { 
    const newObj = {...obj}; 
    newObj[ifield.accessor] = newValue; 
    setObj(newObj); 
  } 
  // Render -------------------------------------
  return <span>{renderer(value, onSendValue)}</span>
} 