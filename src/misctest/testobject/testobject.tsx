import React, { useState } from 'react'; 
import {PackageObject} from '../../custompackages'; 

const {InputObject, 
  Fields:{Fields, FieldLabel, FieldRenderer}, 
  Table, Rows, 
  FieldRendering:{BuildDefaultFieldRenderings} 
} = PackageObject; 

// colsettings
const colSettings:{ifield:IField}[] = [
  {ifield:{accessor:'a', label:'A', type:'', subtype:'', modeltype:'', options:{}, defaultValue:0, format:''}}
]
// 
const mockForeignOptions = [
  {value:'0', label:'mock foreign value 0'},
  {value:'1', label:'mock foreign value 1'},
  {value:'2', label:'mock foreign value 2'}
]
const GetForeignOptions = (ifield:IField):IOption[] => mockForeignOptions; 
const GetForeignValue = (ifield:IField, id:string) => mockForeignOptions.find(o=>o.value===id); 
const fieldRenderings = BuildDefaultFieldRenderings({GetForeignOptions, GetForeignValue}); 

export default function TestObject () { 
  const obj = 12
  //const [obj, setObj] = useState({a:12}); 


  return <div>
    {JSON.stringify(obj)}
    
  </div>;
}

/*
<Object obj={obj} setObj={setObj} columnSettings={colSettings} >
      <Fields >
        <FieldLabel/><FieldRenderer fieldRenderings={fieldRenderings}/>
      </Fields>
    </Object>

*/