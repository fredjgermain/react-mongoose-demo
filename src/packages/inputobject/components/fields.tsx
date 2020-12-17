import React, {useContext} from 'react'; 
import {InputObjectContext} from './inputobject'; 
import {IColumnSetting, IFieldRendering, Renderer} from '../common'; 

interface IContext { 
  ifield: IField; 
} 
export const FieldContext = React.createContext({} as IContext); 

export function Fields({children}:React.PropsWithChildren<any>) { 
  const {columnSettings:cs} = useContext(InputObjectContext); 

  const columnSettings = cs.filter( c => c.order && c.order > 0)
    .sort( (a, b) => (a.order ?? 0) - (b.order ?? 0) ); 
  
  // RENDER -------------------------------------
  return <div> 
    {columnSettings.map( (col, i) => { 
      const context:IContext = {ifield:col.ifield} 
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