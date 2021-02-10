import {useState} from 'react'; 
import {Reader, IReader, Editor, IEditor} from '../../reusable/_input'; 


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



// One String 
const strOne:{label:string, args:IReader}[] = [
  {label: 'Undefined string', args:{ifield: stringField, value:undefined}}, // undefined string 
  {label: 'Empty string', args:{ifield: stringField, value:''}}, // empty string 
  {label: 'Correct string', args:{ifield: stringField, value:'baba'}}, // none empty string 
]

// One option String
const strOneOptions:{label:string, args:IReader}[] = [
  
  {label: 'Undefined string option', args:{ifield: stringField, value:undefined, options:stringOptions}}, // undefined string 
  {label: 'Empty string option', args:{ifield: stringField, value:''}}, // empty string 
  {label: 'a string option', args:{ifield: stringField, value:'a', options:stringOptions}}, // some string
  {label: 'b string option', args:{ifield: stringField, value:'b', options:stringOptions}}, // some string
]


// Many String 
const strMany:{label:string, args:IReader}[] = [
  {label: 'Undefined string[]', args:{ifield:{...stringField, isArray:true}, value:undefined}},  // undefined string[] 
  {label: 'Empty string[]', args:{ifield:{...stringField, isArray:true}, value:[]}},  // empty string[] 
  {label: 'Single string[]', args:{ifield:{...stringField, isArray:true}, value:['dada']}},  // one correct string[] 
  {label: 'Many string[]', args:{ifield:{...stringField, isArray:true}, value:['dada', 'fafa', 'gaga']}},  // many correct string[] 
]

  // Many options String 
const strManyOptions:{label:string, args:IReader}[] = [
  {label: 'Undefined option string[]', args:{ifield:{...stringField, isArray:true}, value:undefined, options:stringOptions}},  // undefined string[] 
  {label: 'Empty option string[]', args:{ifield:{...stringField, isArray:true}, value:[], options:stringOptions}},  // empty string[] 
  {label: 'One string[]', args:{ifield:{...stringField, isArray:true}, value:['a'], options:stringOptions}},  // one correct string[] 
  {label: 'Incorrect option string[]', args:{ifield:{...stringField, isArray:true}, value:['babaa'], options:stringOptions}},  // one incorrect string[] 
  {label: 'Many options string[]', args:{ifield:{...stringField, isArray:true}, value:['c', 'b', 'a'], options:stringOptions}},  // many correct string[] 
]

const numOne:{label:string, args:IReader}[] = [
  // One Number 
  {label: 'Undefined number', args:{ifield: numField, value:undefined}}, // undefined number 
  {label: 'Number zero', args:{ifield: numField, value:0}}, // zero number 
  {label: 'Number 12', args:{ifield: numField, value:12}}, // some number 
]

// One options number 
const numOneOptions:{label:string, args:IReader}[] = [  
  {label: 'Undefined number[] option', args:{ifield: numField, value:undefined, options:numOptions}}, // undefined number 
  {label: 'Zero options string[] option', args:{ifield: numField, value:0, options:numOptions}}, // zero number 
  {label: 'Correct string[] option', args:{ifield: numField, value:2, options:numOptions}}, // zero number 
  {label: 'Incorrect string[] option', args:{ifield: numField, value:12, options:numOptions}}, // incorrect options value
]

// Many Number
const numMany:{label:string, args:IReader}[] = [
  {label: 'Undefined number[]', args:{ifield:{...numField, isArray:true}, value:undefined}},  // undefined number[] 
  {label: 'Empty number[]', args:{ifield:{...numField, isArray:true}, value:[]}},  // empty number[] 
  {label: 'Single number[]', args:{ifield:{...numField, isArray:true}, value:[2]}},  // single correct number[] 
  {label: 'Many number[]', args:{ifield:{...numField, isArray:true}, value:[1, 2, 0]}},  // many correct number[] 
]
  // Many options Number
const numManyOptions:{label:string, args:IReader}[] = [
  {label: 'Undefined option number[]', args:{ifield:{...numField, isArray:true}, value:undefined, options:numOptions}},  // undefined number[] 
  {label: 'Empty option number[]', args:{ifield:{...numField, isArray:true}, value:[], options:numOptions}},  // empty number[] 
  {label: 'Single option number[]', args:{ifield:{...numField, isArray:true}, value:[2], options:numOptions}},  // single correct number[] 
  {label: 'Many option number[]', args:{ifield:{...numField, isArray:true}, value:[1, 2, 0], options:numOptions}},  // many correct number[] 
  {label: 'Single incorrect number[]', args:{ifield:{...numField, isArray:true}, value:[12], options:numOptions}},  // incorrect number[] 
]


export function ReaderFuncSpecial({ifield, value}:IReader) { 
  return <div>SPECIAL :{JSON.stringify(value)}</div> 
} 

export function TestReader() { 
  const strs = [...strOne, ...strOneOptions, ...strMany, ...strManyOptions]; 
  const nums = [...numOne, ...numOneOptions, ...numMany, ...numManyOptions]; 

  return <div> 
    <h3>Strings</h3> 
    {strs.map( (arg, i) => { 
      const {label, args} = arg; 
      return <div key={i}>{label}: <Reader {...{...args}} /><br/></div> 
    })} 

    <h3>Numbers </h3>
    {nums.map( (arg, i) => { 
      const {label, args} = arg; 
      return <div key={i}>{label}: <Reader {...args} /><br/></div> 
    })} 
    </div> 
} 


export function TestEditors() { 
  return <div>
    <h3>Strings </h3>
    {strOne.map( (arg, i) => { 
      const {label, args} = arg; 
      return <div key={i}>{label}: <TestEditor {...args} /><br/></div>
    })} 

    <h3>Numbers </h3>
    {numOne.map( (arg, i) => { 
      const {label, args} = arg; 
      return <div key={i}>{label}: <TestEditor {...args} /><br/></div>
    })} 
    </div> 
} 


export function TestEditor({...args}:IReader) { 
  const [value, setValue] = useState(args.value); 
  const {ifield, options} = args; 
  return <div>
    {value} :
    <Editor {...{value, setValue, ifield, options}} /> 
  </div>
} 