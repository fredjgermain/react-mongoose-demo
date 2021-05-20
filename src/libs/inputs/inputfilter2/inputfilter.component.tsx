import { useState } from 'react'; 
import { IUseFilter } from './inputfilter.type'; 
import { Input, InputSelect } from '../../_inputs'; 
import { IsEmpty, ReduceToString } from '../../_utils'; 



/* Similar to Editor ?? 
setFilter, ifield, options?, 
key = ifield.accessor ... 
'options' access the same as with Cell ?? 

GetHeadArgs 
  => options, SetFilter 
*/
interface IInputFilter<T> { 
  filter: IUseFilter<T> 
  ifield:IField; 
  options?:IOption[]; 

  placeholder?: string; 
  sizeFunc?: (value:any) => number; 
  inputAttribute?: React.InputHTMLAttributes<HTMLInputElement>; 
} 

export function InputFilter<T>({ ...props}:IInputFilter<T>) { 
  const hasOptions = !IsEmpty(props.options); 
  if(hasOptions) 
    return <FilterSelect {...props} /> 
  if(props.ifield.type === 'boolean') 
    return <FilterBoolean {...props} /> 
  if(props.ifield.type === 'string') 
    return <FilterString {...props} /> 
  if(props.ifield.type === 'number') 
    return <FilterLambda {...props} /> 
  
  return <div>No filter</div>; 
} 


function FilterString<T>({ filter, ifield, options, ...props}:IInputFilter<T>) { 
  const type = ifield.type; 
  const keys = [ifield.accessor]; 
  const [value, setValue] = useState(''); 
  const onSetValue = (newValues:string) => { 
    setValue(newValues); 
  } 
  const onPressEnter = () => { 
    filter.SetFilters(value, type, keys); 
  } 

  const args = {value, onSetValue, onPressEnter, type, options, ...props}; 
  return <Input {...args} /> 
} 


function FilterBoolean<T>({ filter, ifield, ...props }:IInputFilter<T>) {
  const type = ifield.type; 
  const keys = [ifield.accessor]; 
  const [value, setValue] = useState<any>(undefined); 
  const onSetValue = (newValue:any) => { 
    setValue(newValue); 
    filter.SetFilters(ReduceToString(newValue), type, keys); 
  } 
  
  const options = [ 
    {value:true, label:'true'}, 
    {value:false, label:'false'} 
  ] as IOption[]; 
  props.options = options; 

  const args = {value, onSetValue, options, ...props}; 

  return <div>
    {JSON.stringify(value)} 
    <InputSelect {...args} /> 
  </div>
}


function FilterSelect<T>({ filter, ifield, options = [], ...props }:IInputFilter<T>) { 
  const type = ifield.type; 
  const keys = [ifield.accessor]; 
  const [value, setValue] = useState<string[]>([]); 
  const onSetValue = (newValue:string[]) => { 
    setValue(newValue); 
    filter.SetFilters(ReduceToString(newValue, '|'), 'array', keys); 
  } 

  const args = {value, onSetValue, options, multiple:true, ...props}; 

  return <div>
    {JSON.stringify(value)} 
    <InputSelect {...args} />
  </div>
} 


function FilterLambda<T>({ filter, ifield, options, ...props }:IInputFilter<T>) { 
  const keys = [ifield.accessor]; 
  const [value, setValue] = useState(''); 
  const onSetValue = (newValues:string) => { 
    setValue(newValues); 
  } 
  const onPressEnter = () => { 
    filter.SetFilters(value, ifield.type, keys); 
  } 

  const args = {value, onSetValue, onPressEnter, type:'string', options, ...props}; 
  return <Input {...args} /> 
} 

/*export function InputFilter<T>({keys, ifield, usefilter}:IInputFilter<T>) { 
  const [strFilter, setStrFilter] = useState(['']); 
  const value = strFilter; 
  const onSetValue = (newValue:string[]) => { 
    setStrFilter(newValue); 
  }; 
  const onPressEnter = () => { 
    usefilter.SetFilters(strFilter, ifield.type, keys); 
  } 
  const options = usefilter.values; 
} */

/* 
boolean ... multi select [ true, false ] 
  display (N) 
array ... multi select from existing unic values 
  display (N) 

string ... single input string

lambda ... 
  or use a single input string with Regex?? 

  Select [ -- , <operator> ] 
  input <type> 
  
  if operator selected is NOT a comparator add an other 
  Select [ -- , <operator> ] 
  input <type> 




*/