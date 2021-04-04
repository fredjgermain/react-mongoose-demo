import React, { useContext } from 'react'; 
import { ToArray, Union } from '../../_arrayutils'; 
import { IReaderComponent, IEditorComponent } from '../../_input'; 
import { GetValueAt, IsNull } from '../../_utils'; 


// GET SET AT ==============================================
interface IGetSetAt {
  Get:(keys?: TKey[]|undefined) => any; 
  Set:(newValue: any, keys?: TKey[]|undefined) => void; 
  Args:(keys:TKey[]) => any; 
}
export const GetSetAtContext = React.createContext({} as IGetSetAt); 
export function GetSetAt({Get, Set, Args, children}:React.PropsWithChildren<IGetSetAt>) { 
  return <GetSetAtContext.Provider value={{Get, Set, Args}}> 
    {children}
  </GetSetAtContext.Provider> 
} 

type ReaderFunc = ({...props}:IReaderComponent) => JSX.Element; 
export function ReaderAt({...props}:{readerFunc:ReaderFunc}) { 
  const {Get, Args} = useContext(GetSetAtContext); 
  const {k} = useContext(KeyContext); 
  const value = Get(k); 
  const {ifield, options} = Args(k) as {ifield:IField, options:IOption[]}; 
  return <props.readerFunc {...{value, ifield, options}} /> 
} 


type EditorFunc = ({...props}:IEditorComponent) => JSX.Element; 
export function EditorAt({...props}:{editorFunc:EditorFunc}) { 
  const {Get, Set, Args} = useContext(GetSetAtContext); 
  const {k} = useContext(KeyContext); 
  const value = Get(k); 
  const setValue = (newValue:any) => Set(newValue, k); 
  const {ifield, options} = Args(k) as {ifield:IField, options:IOption[]}; 

  return <props.editorFunc {...{value, setValue, ifield, options}} /> 
} 





export const ObjxContext = React.createContext({} as {value:any}); 
const KeysContext = React.createContext({} as any); 
export const KeyContext = React.createContext({} as {k:TKey[]}); 

// OBJX =================================================== 
export function Objx({value, children}:React.PropsWithChildren<{value:any}>) { 
  return <ObjxContext.Provider value={{value}}> 
    {children} 
  </ObjxContext.Provider> 
} 

// Keys =================================================== 
export function Keys({keys, nested = false, children}:React.PropsWithChildren<{keys:TKey[][], nested?:boolean}>) { 
  //const {value} = useContext(ObjxContext); 
  return <KeysContext.Provider value={{}}> 
    {keys?.map( k => { 
      return <Key key={JSON.stringify(k)} {...{k, nested}} > 
        {children} 
      </Key> 
    })} 
  </KeysContext.Provider> 
} 

// Key ==================================================== 
export function Key({k, nested = false, children}:React.PropsWithChildren<{k:TKey[], nested?:boolean}>) { 
  let {k:_k} = useContext(KeyContext); 
  _k = !IsNull(_k) && nested ? Union(_k, k) as TKey[]: k; 
  
  return <KeyContext.Provider value={{k:_k}} > 
    {children ?? <KeyValue/>} 
  </KeyContext.Provider> 
} 

// KeyString ============================================== 
export function KeyString() { 
  const {k} = useContext(KeyContext); 
  return <div>{JSON.stringify(k)} : </div> 
} 

// KeyValue =============================================== 
export function KeyValue() { 
  const {value} = useContext(ObjxContext); 
  const {k} = useContext(KeyContext); 
  return <div>{JSON.stringify(GetValueAt(value, ToArray(k)))}</div> 
} 






export function TestsObjx() { 
  const value = [0,['a', 'b','d'],5,65,['a', 'b','d']]; 
  const keys = [['4', 2], [1]]; 

  return <TestObjx {...{ value, keys }} /> 
} 

export function TestObjx({value, keys}:{value:any, keys:TKey[][]}) { 
  return <Objx value={value}> 
    <Keys keys={keys}> 
      <KeyString/><KeyValue/> <br/> 
    </Keys> 
  </Objx> 
} 


export function TestsNestedObjx() { 
  const value = [0,['a', 'b','d'],5,65,['a', 'b','d']]; 
  const keys = [['4'], [1]]; 
  const keys2= [['2'], ['0']]; 
  return <TestNestedObjx {...{value, keys, keys2 }} /> 
} 

export function TestNestedObjx({value, keys, keys2}:{value:any, keys:TKey[][], keys2:TKey[][]}) { 

  return <Objx value={value}> 
    <Keys keys={keys}> 
      <KeyString/><KeyValue/><br/> 
      -----
        <Keys keys={keys2}> 
          // <KeyString/><KeyValue/><br/> 
        </Keys> 
    </Keys> 
  </Objx> 
} 

/*

*/