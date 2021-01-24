import React, { useState } from 'react'; 
import {Reader, Editor} from '../reusable/_input'; 


  const numField:IField = {accessor:'num', label:'Accessor', type:'number', defaultValue:0, options:{}} as IField; 
  const strField:IField = {accessor:'str', label:'Accessor', type:'string', defaultValue:'', options:{}} as IField; 
  const boolField:IField = {accessor:'bool', label:'Accessor', type:'boolean', defaultValue:false, options:{}} as IField; 

  const numOptions:IOption[] = [ 
    {value: 0, label:'value 0'}, 
    {value: 1, label:'value 1'}, 
    {value: 2, label:'value 2'}, 
    {value: 3, label:'value 3'}, 
  ] 

  const strOptions:IOption[] = [ 
    {value: 'a', label:'value a'}, 
    {value: 'b', label:'value b'}, 
    {value: 'c', label:'value c'}, 
    {value: 'd', label:'value d'}, 
  ] 

  const boolOptions:IOption[] = [ 
    {value: false, label:'female'}, 
    {value: true, label:'male'}, 
  ] 

  const testRead:{value:any, ifield:IField, options?:IOption[]}[] = [ 
    {value: 12, ifield: {...numField}}, 
    {value: [12, 15], ifield:{...numField, isArray:true} }, 
    {value: 'bababa', ifield:{...strField} }, 
    {value: ['cacaca', 'dadadad'], ifield:{...strField, isArray:true} }, 
    {value: false, ifield:{...boolField} }, 
    {value: [false, true], ifield:{...boolField, isArray:true} }, 

    // options
    {value: 2, ifield:{...numField}, options:numOptions }, 
    {value: [3,2], ifield:{...numField, isArray:true}, options:numOptions }, 
    {value: 'b', ifield:{...strField}, options:strOptions}, 
    {value: ['b', 'c'], ifield:{...strField, isArray:true}, options:strOptions}, 
    {value: false, ifield:{...boolField, options:strOptions} }, 
    {value: [false, true], ifield:{...boolField, isArray:true}, options:boolOptions}, 
  ] 

  /*const testEditor:{value:any, ifield:IField, options?:IOption[]}[] = [ 
    {value: 12, ifield: {...numField}}, 
    {value: [12, 15], ifield:{...numField, isArray:true} }, 
    {value: 'bababa', ifield:{...strField} }, 
    {value: ['cacaca', 'dadadad'], ifield:{...strField, isArray:true} }, 
    {value: false, ifield:{...boolField} }, 
    {value: [false, true], ifield:{...boolField, isArray:true} }, 

    // options
    {value: 2, ifield:{...numField}, options:numOptions }, 
    {value: [3,2], ifield:{...numField, isArray:true}, options:numOptions }, 
    {value: 'b', ifield:{...strField}, options:strOptions}, 
    {value: ['b', 'c'], ifield:{...strField, isArray:true}, options:strOptions}, 
    {value: false, ifield:{...boolField, options:strOptions} }, 
    {value: [false, true], ifield:{...boolField, isArray:true}, options:boolOptions}, 
  ] */



export function TestEditors() {
  
  return <div>
    {testRead.map( (e,i) => { 
      return <div key={i}>{e.ifield.accessor} : <TestEditor {...e} /></div> 
    })} 
    <br/>
    asdsadsadas
    <br/>
  </div> 
}


export function TestEditor({ifield, options, ...props}:{value:any, ifield:IField, options?:IOption[]}) { 
  const [value, setValue] = useState(props.value); 
  return <div> 
    <div>{JSON.stringify(value)}</div> 
    <Editor {...{ifield, value, setValue, options}} /> 
    <br/>
  </div>
}


export function TestReader() { 
  return <div>
    {testRead.map( (e,i) => { 
      return <div key={i}>{e.ifield.accessor} : <Reader {...e} /></div> 
    })} 
  </div> 
} 