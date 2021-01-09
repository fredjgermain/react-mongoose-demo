export interface IObjx { 
  value:any; 
  setValue:any; 
  ifields:IField[]; 
} 

export interface IUseObjx extends IObjx { 
  ReadField:(ifield:IField) => any; 
  EditField:(newValue:any, ifield:IField) => any; 
}

export function useObjx({value, setValue, ifields}:IObjx):IUseObjx { 
  function Read(ifield:IField) { 
    return value[ifield.accessor] ?? ifield.defaultValue; 
  } 

  function Edit(newFieldValue:any, ifield:IField) { 
    const newValue = {...value}; 
    newValue[ifield.accessor] = newFieldValue; 
    setValue(newValue); 
    //return newValue; 
    
    /*setValue((prev:any) => {
      const newValue = {...prev}; 
      newValue[ifield.accessor] = newFieldValue; 
      return newValue; 
    }) */
  }

  return {value, setValue, ifields, ReadField: Read, EditField: Edit}; 
}