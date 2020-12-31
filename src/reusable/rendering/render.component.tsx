import React, {useContext} from 'react'; 
import {Rendering} from './rendering.class'; 
import {IOption} from '../_input'; 


// Mock interface ... 
/*interface FieldRenderer { 
  GetFieldRendering: IFieldRendering[]; 
  GetRenderer:(ifield:IField, handle:string) => (value:any, onSendValue:any) => JSX.Element 
}*/ 

interface IRenderContexter { 
  GetForeignOptions: (ifield: IField) => IOption[], 
  GetForeignValue: (ifield: IField, id: string) => any, 
} 
const RenderContext = React.createContext({} as Rendering); 
export function RenderContexter({GetForeignOptions, GetForeignValue, children}:React.PropsWithChildren<IRenderContexter>) { 
  const rendering = new Rendering(); 
  rendering.DefaultFieldRendering(GetForeignOptions, GetForeignValue); 
  return <RenderContext.Provider value={rendering}> 
    {children} 
  </RenderContext.Provider> 
} 

// Field ================================== 
interface IRenderer { 
  value: any; 
  setValue: (newValue:any) => void; 
  ifield:IField; 
  handle: string; 
} 
export function Renderer({value, setValue, ifield, handle}:IRenderer) { 
  const fr = useContext(RenderContext); 
  const renderer = fr.GetRenderer(ifield, handle); 
  return <span>{renderer(value, setValue)}</span>; 
} 