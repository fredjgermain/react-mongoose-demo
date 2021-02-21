import React, {useContext, useEffect, useState} from 'react'; 
import { SetValueAt } from '../../utils/value.utils';
import { GetValueAt } from '../../_utils';


export interface IObjx { 
  value:any; 
  keys:string[]; 
} 

export const ObjxContext = React.createContext({} as IObjx); 
export const ElementContext = React.createContext({} as {k:string|number}); 

// ARRX =========================================
export function Objx({value, keys = [], children}:React.PropsWithChildren<IObjx>) { 
  const context = {value, keys}; 

  //const context:IUseArrx = useArrx(props); 
  return <ObjxContext.Provider value={context} > 
    {keys.map( (k) => { 
      return <ElementContext.Provider key={k} value={{k}} > 
        {children} 
      </ElementContext.Provider> 
    })} 
  </ObjxContext.Provider> 
} 

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
