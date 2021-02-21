import {useState, useEffect} from 'react'; 
import {GetValueAt, SetValueAt} from '../_utils'; 


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
