import {useState, useEffect} from 'react'; 
import {IEvent, IInput, GetValueFromInput, IsPressEnter} from '../input.utils'; 


// Return interface -----------------------------
interface IUseInput { 
  value:any; 
  type: string; 
  setValue:React.Dispatch<React.SetStateAction<any>>; 
  useref?: any; 

  returnValue:(value:any) => any; 

  // Event
  onChange: (event:any) => void; 
  onBlur: (event:any) => void; 
  onPressEnter: (event:any) => void; 
  [key:string]:any; 
} 
// useInput =====================================
export function useInput(props:IInput):IUseInput { 
  const [value, setValue] = useState(props.value); 
  
  // Synchronize value with parent's value. 
  useEffect(() => { 
    if (props.value !== value) { 
      setValue(props.value); 
  } 
  }, [JSON.stringify(props.value)]); 
  const {type, useref, returnValue} = props; 
  const onChange = props.onChange? props.onChange : DefaultOnChange(type, setValue); 
  const onPressEnter = DefaultOnPressEnter(value, returnValue, props.onPressEnter); 
  const onBlur = props.onBlur ? props.onBlur : DefaultOnBlur(value, returnValue); 

  return {...props, value, type, setValue, useref, returnValue, onChange, onBlur, onPressEnter}; 
} 


// DEFAULT ON BLUR ==============================
function DefaultOnBlur(value:any, returnValue:any):(event:any) => void { 
  return (event:any) => returnValue(value); 
}

// DEFAULT ON PRESS ENTER =======================
function DefaultOnPressEnter(value:any, returnValue:any, onPressEnter?:(event:any) => void):(event:any) => void {
  return (event:any) => { 
    if(IsPressEnter((event as IEvent).code) ) 
      onPressEnter? onPressEnter(event) : returnValue(value); 
  } 
} 

// DEFAULT OnCHANGE =============================
function DefaultOnChange(type:string, setValue:any):(event:any) => void {
  return (event:any) => 
    setValue( () => GetValueFromInput(event as IEvent, type)); 
}

