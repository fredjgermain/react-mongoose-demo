import { useState } from 'react'; 
import {Reader, IReader} from './reader.component'; 
import {Editor, IEditor} from './editor.component'; 
//import {Reader, Editor} from './renderer.component';

const stringField = {accessor:'', label:'', defaultValue:'', type:'string'} as IField; 
const numField = {accessor:'', label:'', defaultValue:0, type:'number'} as IField; 
const boolField = {accessor:'', label:'', defaultValue:false, type:'boolean'} as IField; 

// Options
const stringOptions = [ 
  {value:'a', label:'option 0'}, 
  {value:'b', label:'option 1'}, 
  {value:'c', label:'option 2'} 
] as IOption[]; 

const numOptions = [ 
  {value:0, label:'option 0'}, 
  {value:1, label:'option 1'}, 
  {value:2, label:'option 2'} 
] as IOption[]; 



const stringLabelArgs:{label:string, args:IReader}[] = [
  // One String 
  {label: 'Undefined string', args:{ifield: stringField, value:undefined}}, // undefined string 
  {label: 'Empty string', args:{ifield: stringField, value:''}}, // empty string 
  {label: 'Correct string', args:{ifield: stringField, value:'baba'}}, // none empty string 

  // One option String
  {label: 'Undefined string', args:{ifield: stringField, value:undefined, options:stringOptions}}, // undefined string 
  {label: 'Empty string', args:{ifield: stringField, value:''}}, // empty string 
  {label: 'a string', args:{ifield: stringField, value:'a', options:stringOptions}}, // some string
  {label: 'b string', args:{ifield: stringField, value:'b', options:stringOptions}}, // some string

  // Many String 
  {label: 'Undefined string[]', args:{ifield:{...stringField, isArray:true}, value:undefined}},  // undefined string[] 
  {label: 'Empty string[]', args:{ifield:{...stringField, isArray:true}, value:[]}},  // empty string[] 
  {label: 'Single string[]', args:{ifield:{...stringField, isArray:true}, value:['dada']}},  // one correct string[] 
  {label: 'Many string[]', args:{ifield:{...stringField, isArray:true}, value:['dada', 'fafa', 'gaga']}},  // many correct string[] 

  // Many options String 
  {label: 'Undefined option string[]', args:{ifield:{...stringField, isArray:true}, value:undefined, options:stringOptions}},  // undefined string[] 
  {label: 'Empty option string[]', args:{ifield:{...stringField, isArray:true}, value:[], options:stringOptions}},  // empty string[] 
  {label: 'One string[]', args:{ifield:{...stringField, isArray:true}, value:['a'], options:stringOptions}},  // one correct string[] 
  {label: 'Incorrect option string[]', args:{ifield:{...stringField, isArray:true}, value:['babaa'], options:stringOptions}},  // one incorrect string[] 
  {label: 'Many options string[]', args:{ifield:{...stringField, isArray:true}, value:['c', 'b', 'a'], options:stringOptions}},  // many correct string[] 
]

const numberLabelArgs:{label:string, args:IReader}[] = [
  // One Number 
  {label: 'Undefined number', args:{ifield: numField, value:undefined}}, // undefined number 
  {label: 'Number zero', args:{ifield: numField, value:0}}, // zero number 
  {label: 'Number 12', args:{ifield: numField, value:12}}, // some number 

  // One options number 
  {label: 'Undefined number[]', args:{ifield: numField, value:undefined, options:numOptions}}, // undefined number 
  {label: 'Zero options string[]', args:{ifield: numField, value:0, options:numOptions}}, // zero number 
  {label: 'Correct string[]', args:{ifield: numField, value:2, options:numOptions}}, // zero number 
  {label: 'Incorrect string[]', args:{ifield: numField, value:12, options:numOptions}}, // incorrect options value

  // Many Number
  {label: 'Undefined number[]', args:{ifield:{...numField, isArray:true}, value:undefined}},  // undefined number[] 
  {label: 'Empty number[]', args:{ifield:{...numField, isArray:true}, value:[]}},  // empty number[] 
  {label: 'Single number[]', args:{ifield:{...numField, isArray:true}, value:[2]}},  // single correct number[] 
  {label: 'Many number[]', args:{ifield:{...numField, isArray:true}, value:[1, 2, 0]}},  // many correct number[] 

  // Many options Number
  /*{ifield:{...numField, isArray:true}, value:undefined, options:numOptions},  // undefined number[] 
  {ifield:{...numField, isArray:true}, value:[], options:numOptions},  // empty number[] 
  {ifield:{...numField, isArray:true}, value:[2], options:numOptions},  // single correct number[] 
  {ifield:{...numField, isArray:true}, value:[1, 2, 0], options:numOptions},  // many correct number[] 
  {ifield:{...numField, isArray:true}, value:[12], options:numOptions},  // incorrect number[] */
]



export function TestRenderer() { 

  return <div> 
    <h3>Strings </h3>
    {stringLabelArgs.map( (arg, i) => { 
      const {label, args} = arg; 
      return <div key={i}>{label}: <Reader {...args} /><br/></div>
    })} 

    <h3>Numbers </h3>
    {numberLabelArgs.map( (arg, i) => { 
      const {label, args} = arg; 
      return <div key={i}>{label}: <Reader {...args} /><br/></div>
    })} 
    </div> 
} 

export function TestReader({args}:{args:IReader[]}) { 
  return <div> 
    {args.map( (arg, i) => { 
      return <div key={i}><Reader {...arg} /></div> 
    })} 
  </div> 
}