import React, { useState } from 'react'; 
import {Package_Object} from '../../custompackages'; 



const {InputObject, 
  Fields:{Fields, FieldLabel, FieldRenderer}, 
  BuildDefaultFieldRenderings
} = Package_Object; 

// colsettings
const colSettings:{ifield:IField, order:number}[] = [
  {ifield:{accessor:'a', label:'A', type:'number', subtype:'', modeltype:'', options:{}, defaultValue:0, format:''}, order:1 },
  {ifield:{accessor:'b', label:'B', type:'number', subtype:'', modeltype:'', options:{}, defaultValue:0, format:''}, order:2 }
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
  //const obj = 12
  const [obj, setObj] = useState({a:12, b:14}); 

  return <div>
    {JSON.stringify(obj)}
    
  </div>;
}

/*

<InputObject obj={obj} setObj={setObj} columnSettings={colSettings} >
      <Fields >
        <FieldLabel/>
          <FieldRenderer fieldRenderings={fieldRenderings}/>
      </Fields>
    </InputObject>
*/