import React, { useState } from 'react'; 
import {FieldRendering} from '../../packages/_fieldrendering'; 
import {Objx, Fields, FieldLabel, FieldRenderer} from '../../packages/_objx'; 


const mockObj = { 
  string: 'cacaca', 
  strings: ['cacaca', 'babababa'], 
  num:12, 
  nums:[14, 45], 
  special:13, 
  c:15, 
}; 
// colsettings 
const columnSettings:IField[] = [ 
  {accessor:'string', label:'String Var', type:'string', subtype:'', modeltype:'', options:{}, defaultValue:'', format:''}, 
  {accessor:'strings', label:'StringS', type:'array', subtype:'string', modeltype:'', options:{}, defaultValue:[], format:''}, 
  {accessor:'num', label:'Num', type:'number', subtype:'', modeltype:'', options:{}, defaultValue:0, format:''}, 
  {accessor:'nums', label:'NumS', type:'array', subtype:'number', modeltype:'', options:{}, defaultValue:0, format:''}, 
  {accessor:'special', label:'Spooky !', type:'number', subtype:'', modeltype:'', options:{}, defaultValue:0, format:''}, 
  {accessor:'c', label:'C', type:'number', subtype:'', modeltype:'', options:{}, defaultValue:0, format:''}, 
] 
// 
const mockForeignOptions = [ 
  {value:'0', label:'mock foreign value 0'}, 
  {value:'1', label:'mock foreign value 1'}, 
  {value:'2', label:'mock foreign value 2'} 
] 
const GetForeignOptions = (ifield:IField):IOption[] => mockForeignOptions; 
const GetForeignValue = (ifield:IField, id:string) => mockForeignOptions.find(o=>o.value===id); 
const fieldRendering = new FieldRendering(); 
fieldRendering.DefaultFieldRendering(GetForeignOptions, GetForeignValue); 
const specialFieldRendering = { 
  name:'special field', 
  predicate:(ifield:IField, handle:string) => ifield.accessor==='special', 
  renderer: (ifield:IField) => (value:any, onSendValue:any) => <span>SPECIAL !!! {value}</span> 
}; 
fieldRendering.fRenderings = [specialFieldRendering, ...fieldRendering.fRenderings]; 


// TEST OBJECT ===================================
export default function TestObject () { 
  const [obj, setObj] = useState(mockObj); 

  return <div>
    {JSON.stringify(obj)} 
    <Objx {...{obj, setObj, columnSettings, fieldRendering}} > 
      <Fields> 
        <FieldLabel /> <FieldRenderer/> 
      </Fields>
    </Objx>
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