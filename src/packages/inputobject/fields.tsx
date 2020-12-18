import React, {useContext} from 'react'; 
import {InputObjectContext} from './object'; 
import {IFieldRendering} from './_common'; 
//import {IFieldRendering} from './defaultFieldRendering'; 

interface IContext { 
  ifield: IField; 
} 
export const FieldContext = React.createContext({} as IContext); 

export function Fields({children}:React.PropsWithChildren<any>) { 
  const {columnSettings} = useContext(InputObjectContext); 
  
  // RENDER -------------------------------------
  return <div> 
    {columnSettings.map( (col, i) => { 
      const context:IContext = {ifield:col} 
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

interface IProps { 
  fieldRenderings:IFieldRendering[]; 
} 
// FieldRenderer =====================================
export function FieldRenderer({fieldRenderings}:IProps) { 
  const {obj, setObj} = useContext(InputObjectContext); 
  const {ifield} = useContext(FieldContext); 

  const fieldRendering = fieldRenderings.find( f => f.predicate(ifield, '') ); 
  const defaultRenderer = (value:any, onSendValue:any) => <span>{JSON.stringify(value)}</span>; 
  const Renderer = fieldRendering? fieldRendering.renderer(ifield): defaultRenderer; 

  const value = obj[ifield.accessor]; 
  const onSendValue = (newValue:any) => { 
    const newObj = {...obj}; 
    newObj[ifield.accessor] = newValue; 
    setObj(newObj); 
  } 
  // Render -------------------------------------
  return <span>{Renderer(value, onSendValue)}</span>
} 