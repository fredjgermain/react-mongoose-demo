import React, {useContext, useEffect, useState} from 'react'; 
import { IsEmpty, SetValueAt } from '../../utils/value.utils';
import { GetValueAt } from '../../_utils';


export interface IObjx { 
  value:any; 
} 

export const ObjxContext = React.createContext({} as IObjx); 
export const KeysContext = React.createContext({} as {keys: IKeys}); 
export const KeyContext = React.createContext({} as {k: number|string}); 

// ARRX =========================================
export function Objx({value, children}:React.PropsWithChildren<IObjx>) { 
  return <ObjxContext.Provider value={{value}} > 
    {children} 
  </ObjxContext.Provider> 
} 

type IKeys = (number|string)[][]; 

export function Keys({keys, children}:React.PropsWithChildren<{keys:IKeys}>) { 
  const {value} = useContext(ObjxContext); 
  const [firstKeys, ...remaining] = keys; 

  if(!IsEmpty(remaining)) { 
    return <KeysContext.Provider value={{keys:[firstKeys] as IKeys}}> 
      {firstKeys.map( k => { 
        const _value = value[k]; 
        return <Objx key={k} value={_value}> 
          <Keys keys={remaining}>{children}</Keys> 
        </Objx> 
      })} 
    </KeysContext.Provider> 
  } 

  return <KeysContext.Provider value={{keys:[firstKeys] as IKeys}}> 
    {firstKeys.map( k => {       
      return <KeyContext.Provider key={k} value={{k}}> 
        {children} 
      </KeyContext.Provider> 
    })} 
  </KeysContext.Provider> 
} 


interface IKey { 
  k: number|string; 
} 
export function Key({k, children}:React.PropsWithChildren<IKey>) { 
  return <KeyContext.Provider value={{k}}> 
    {children} 
  </KeyContext.Provider> 
} 

export function Label() { 
  const {k} = useContext(KeyContext); 
  return <div>{k}: </div> 
} 

export function Value() { 
  const {value} = useContext(ObjxContext); 
  const {k} = useContext(KeyContext); 
  return <div>{value[k]}</div> 
} 

export function Test() { 
  const obj = [ 
    {a:12, b:'as'}, 
    {a:13, b:'bs'}
  ]
  return <Objx value={obj}> 
    <Keys keys={[[0, 1], ['a','b']]} > 
      <Label/><Value/> <br/>
    </Keys> 
  </Objx> 
} 


/*
export function ElementEdit({...props}:{setValue:React.Dispatch<React.SetStateAction<any>> }) { 
  const {value:_value} = useContext(ObjxContext); 
  const {k} = useContext(ElementContext); 
  const [value, setValue] = useState(GetValueAt(_value, [k])); 

  useEffect(() => { 
    const prev = GetValueAt(_value, [k]); 
    if(JSON.stringify(prev) !== JSON.stringify(value)) { 
      props.setValue((prev:any) => { 
        return SetValueAt(prev, value, [k]); 
      }); 
    } 
  }, [value]) 

  return <TestEditor {...{k, value, setValue}} /> 
} 

interface ITestEditor {
  k:string|number, 
  value:any, 
  setValue:React.Dispatch<React.SetStateAction<any>>
}

function TestEditor({k, value, setValue}:ITestEditor) { 
  return <div>
    {k} : {value} <br/> 
    <button onClick={() => setValue((prev:any) => { 
      return prev + prev; 
    })} >Increment</button> 
  </div>
}


export function Test() { 
  const obj = {a:12, b:'adas'}; 
  const [value, setValue] = useState(obj); 

  return <Objx {...{value, keys:['a', 'b']}} > 
    <ElementEdit {...{setValue}}/> 
  </Objx> 
}
*/