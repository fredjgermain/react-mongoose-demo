import React, { useContext } from 'react'; 
import { ToArray, Union } from '../../_arrayutils';
import {GetValueAt, IsNull, SetValueAt} from '../../_utils'; 
//import { FieldLabel, FieldValue } from './field.component'; 

type TKey = string|number; 
type TKeys = TKey|TKey[]; 

export const ObjxContext = React.createContext({} as {value:any}); 
const KeysContext = React.createContext({} as any); 
export const KeyContext = React.createContext({} as {k:TKeys}); 

// OBJX =================================================== 
export function Objx({value, children}:React.PropsWithChildren<{value:any}>) { 
  return <ObjxContext.Provider value={{value}}> 
    {children ?? <Keys/>} 
  </ObjxContext.Provider> 
} 

// Keys =================================================== 
export function Keys({keys, children}:React.PropsWithChildren<{keys?:TKeys[]}>) { 
  const {value} = useContext(ObjxContext); 
  const _keys = keys ?? Object.keys(value) ?? []; 

  return <KeysContext.Provider value={{keys}}> 
    {_keys?.map( _k => { 
      return <Key key={JSON.stringify(_k)} {...{k: _k}}>{children}</Key> 
    })} 
  </KeysContext.Provider> 
} 

// Key ==================================================== 
export function Key({k, children}:React.PropsWithChildren<{k:TKeys}>) { 
  let {k:_k} = useContext(KeyContext); 
  _k = !IsNull(_k) ? Union(_k, k) as TKeys: k; 
  console.log(_k); 

  return <KeyContext.Provider value={{k:_k}} > 
    {children ?? <KeyValue/>} 
  </KeyContext.Provider> 
} 

// KeyString ============================================== 
export function KeyString() { 
  const {k} = useContext(KeyContext); 
  return <span>{JSON.stringify(k)} : </span> 
} 

// KeyValue =============================================== 
export function KeyValue() { 
  const {value} = useContext(ObjxContext); 
  const {k} = useContext(KeyContext); 
  return <span>{JSON.stringify(GetValueAt(value, ToArray(k)))}</span> 
} 








export function TestsObjx() { 
  const value = [0,['a', 'b','d'],5,65,['a', 'b','d']]; 
  const keys = [['4', 2], 1]; 

  return <TestObjx {...{ value, keys }} /> 
} 

export function TestObjx({value, keys}:{value:any, keys:TKeys[]}) { 
  return <Objx value={value}> 
    <Keys keys={keys}> 
      <KeyString/><KeyValue/> <br/> 
    </Keys> 
  </Objx> 
} 


export function TestsNestedObjx() { 
  const value = [0,['a', 'b','d'],5,65,['a', 'b','d']]; 
  const keys = ['4', 1]; 
  const keys2= ['2', '0']; 
  return <TestNestedObjx {...{value, keys, keys2 }} /> 
} 

export function TestNestedObjx({value, keys, keys2}:{value:any, keys:TKeys[], keys2:TKeys[]}) { 

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