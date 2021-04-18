import {useState, useEffect} from 'react'; 
import {GetValueAt, SetValueAt} from '../_utils'; 


interface IUseStateAt { 
  getValueAt: (keys:string[]) => any; 
  setValueAt: (keys:string[]) => (newValue:any) => any; 
}

export function useStateAt(Value:any) { 
  const [value, setValue] = useState(Value); 

  const getValueAt = (keys?:string[]) => GetValueAt(value, keys); 
  
  //type arg = T | ((prevState: T) => T); 
  const setValueAt = (keys?:string[]) => { 
    return (newValue:any) => { 
      setValue((prev:any) => { 
        return SetValueAt(prev, newValue, keys); 
      }); 
    } 
  }
  return {getValueAt, setValueAt}; 
}


interface IUseGetSet { 
  value: any; 
  setValue: React.Dispatch<React.SetStateAction<any>>; 
  accessor: string; 
} 

export function useGetSet(Value:any, SetValue:React.Dispatch<React.SetStateAction<any>>, accessor:string):IUseGetSet { 
  const [value, setValue] = useState(GetValueAt(Value, [accessor])); 

  useEffect(() => { 
    const prev = GetValueAt(Value, [accessor]); 
    if(JSON.stringify(prev) !== JSON.stringify(value)) { 
      SetValue((prev:any) => { 
        return SetValueAt(prev, value, [accessor]); 
      }); 
    } 
  }, [value]) 

  return {value, setValue, accessor}; 
}
