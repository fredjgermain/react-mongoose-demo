import React, { useContext } from 'react'; 

export interface IArrx { 
  type:string; 
  values:any[]; 
  defaultValue:any; 
} 

export const ArrxContext = React.createContext({} as IArrx); 
const ElementsContext = React.createContext({} as any); 
export const ElementContext = React.createContext({} as {index:number}); 

// ARRX =========================================
export function Arrx({children, ...props}:React.PropsWithChildren<IArrx>) { 
  //const context:IUseArrx = useArrx(props); 
  return <ArrxContext.Provider value={props} > 
    {children}
  </ArrxContext.Provider>
}


// ELEMENTS =====================================
export function Elements({indexes, children}:React.PropsWithChildren<{indexes?:number[]}>) { 
  const {values} = useContext(ArrxContext); 
  const elements = indexes ? indexes: values.map((v,i) => i ); 

  return <ElementsContext.Provider value={{}}> 
    {elements.map( (index:any) => { 
      return <Element key={index} {...{index}}>{children}</Element> 
    })} 
    </ElementsContext.Provider> 
}


// ELEMENT ======================================
export function Element({index, children}:React.PropsWithChildren<{index:number}>) {
  return <ElementContext.Provider key={index} value={{index}}> 
    {children} 
  </ElementContext.Provider> 
}


/*
test 

values.map( (value, i) => { ... 
  <element key={i} /> 
    vs 
  <element key={value} /> 
  ... } 
) 

if value changes ... will it creates a new element? and change hooks within <element>? 
*/ 


/* 
arrx  -> arrxContext 
  elements -> elementContext 
    element -> {index} 


objx  -> objxContext 
  fields -> fieldContext 
    field -> {field} 


ReadElement(value, index) => { 
  value[index] => 
} 


Copy(value) { 
  if(Array.IsArray(value)) 
    return [...value] 
  if(typeof value === 'object') 
    return {...value} 
} 

Update(prev, newValue, key) 
  const updated = Copy(value) 
  updated[key] = newValue 
  return updated 

Read(value, key) 
  return value[key] ?? defaultValue ??? 


setValue((prev) => { 
  return Update( 
    prev[index], 
    Update(
      prev[index][ifield.accessor], 
      newFieldValue, 
      field.accessor
    ), 
    index 
  ) 
}) 







Edit(newFieldValue, prev) // edit/update field 
  const newObj = Copy(value)     // from ObjxContext 
  newObj[ifield] = newFieldValue 
  return newObj 


Update(newElement, prev) // edit/update field 
  const newArray = [...prev]   // from ArrxContext 
  newArr[index] = newElement 
  return newArr 

*/