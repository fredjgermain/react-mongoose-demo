import {useState, useEffect} from 'react'; 
import {IInput, EnumType, InputAction} from '../inputcommon'; 

// IEvent ---------------------------------------
export interface IEvent { 
  target:{ 
    type:string, 
    value:string, 
    valueAsDate: Date | null, 
    valueAsNumber: number, 
    checked: boolean | null, 
  } 
  code?:any, 
}

// InputHook -----------------------------------
export interface IInputHook<T> extends IInput<T> { 
  value: T; 
  setValue: React.Dispatch<React.SetStateAction<T>>; 
  type: EnumType; 
  //type?: EnumType; 
  //size?: any; 

  // Formatting .........
  formatter?: (value:T) => T; 
  
  // Editing ............
  onSendValue: (value:T) => void;   // defined by parent component 
  onChange: InputAction;      // called when <input> changes 
  onBlur: InputAction;        // called when <input> blurs 
  onPressEnter: InputAction;  // called when <input> press enter 
} 
export function useInputHook<T>(props:IInput<T>):IInputHook<T> { 
  const [value, setValue] = useState<T>(props.value as T); 
  // To synchronize with parent changes (page changes). 
  useEffect(() => { 
    if (props.value != value) { 
      setValue(props.value); 
  } 
  },[JSON.stringify(props.value)]); 
  
  // Allows access to child component 
  const type = props.type ? props.type: EnumType.ANY; 
  const onSendValue = props.onSendValue; 
  const args = {value, setValue, type, onSendValue}; 

  const onChange = props.onChange? props.onChange : DefaultOnChange({...args} as IInputHook<T>); 
  const onPressEnter = DefaultOnPressEnter({...args, onPressEnter:props.onPressEnter } as IInputHook<T>); 
  const onBlur = props.onBlur ? props.onBlur : DefaultOnBlur({...args} as IInputHook<T>); 
  const inputHook = {...args, onChange, onBlur, onPressEnter}; 
  // gives parent component access to these values and methods
  if(props.useref) 
    props.useref.current = {...props, ...inputHook}; 

  //console.log(value); 
  return {...inputHook} as IInputHook<T>; 
} 

// default onBlur method ...............................
function DefaultOnBlur<T>(inputHook:IInputHook<T>):InputAction { 
  const {value, onSendValue} = inputHook; 
  return (event:any) => onSendValue(value as any as T); 
} 

// default onPressEnter .........................
const IsPressEnter = (event:any):boolean => { 
  const {code} = event as IEvent; 
  return code === 'Enter' || code === 'NumpadEnter'; 
}

function DefaultOnPressEnter<T>(inputHook:IInputHook<T>):InputAction { 
  const {value, onSendValue, onPressEnter} = inputHook; 
  if(onPressEnter) { 
    return (event:any) => { 
      if(IsPressEnter(event) && onPressEnter) 
        onPressEnter(event); 
    } 
  } 
  else { 
    return (event:any) => { 
      if(IsPressEnter(event)) 
        onSendValue(value as any as T); 
    } 
  } 
} 


// default ONCHANGE methods .....................
function DefaultOnChange<T>(inputHook:IInputHook<T>):InputAction { 
  if(inputHook.type === EnumType.NUMBER) 
    return DefaultOnChangeNumber(inputHook); 

  else if(inputHook.type === EnumType.BOOLEAN) 
    return DefaultOnChangeBool(inputHook); 

  else if(inputHook.type === EnumType.STRING) 
    return DefaultOnChangeString(inputHook); 
  return (event:any) => console.log(event); 
}

function DefaultOnChangeNumber<T>(inputHook:IInputHook<T>):InputAction { 
  const {setValue} = inputHook; 
  return (event:any) => {
    const {target} = (event as IEvent); 
    const newValue = target.valueAsNumber as any as T; 
    setValue(newValue); 
  }
}

function DefaultOnChangeBool<T>(inputHook:IInputHook<T>):InputAction { 
  const {setValue, onSendValue} = inputHook; 
  return (event:any) => { 
    const {target} = (event as IEvent); 
    const newValue = target.checked as any as T; 
    setValue(newValue); 
    onSendValue(newValue); 
  }; 
}

function DefaultOnChangeString<T>(inputHook:IInputHook<T>):InputAction { 
  const {setValue} = inputHook; 
  return (event:any) => { 
    const {target} = (event as IEvent); 
    const newValue = target.value as any as T; 
    setValue(newValue); 
  }; 
}

/*function DeepCompare(a:any, b:any):boolean { 
  JSON.stringify(a) === JSON.stringify(b); 
  return false; 
}*/
