import {useColumnSetting} from '../../packages/_hooks'; 
import {FieldRendering} from '../../packages/_fieldrendering'; 

const data = [ 
  {a:'test0', b:0, c:1, d:2}, 
  {a:'test1', b:1, c:2, d:3}, 
  {a:'test2', b:2, c:3, d:4}, 
  {a:'test3', b:3, c:4, d:5}, 
  {a:'test4', b:4, c:5, d:6} 
]; 

const field = {accessor:'a', label:'A', type:'string', defaultValue:'', subtype:'', modeltype:'', format:'', options:{}}; 
const ifields:IField[] = [ 
  {...field, accessor:'a', label:'A', type:'string', defaultValue:''}, 
  {...field, accessor:'b', label:'B', type:'number'}, 
  {...field, accessor:'c', label:'C', type:'number'}, 
  {...field, accessor:'d', label:'D', type:'number'} 
] 

const options:IOption[] = [ 
  {value:'0', label:'value 0'}, 
  {value:'1', label:'value 1'}, 
  {value:'2', label:'value 2'} 
] 
const GetForeignOptions = (ifields:IField) => options; 
const GetForeignvalue = (ifields:IField, id:string) => options.find( o => o.value === id); 

const frender = new FieldRendering(); 
frender.DefaultFieldRendering(GetForeignOptions, GetForeignvalue); 



// TEST COLUMN SETTING ############################
export default function TestColumnSetting() { 
  const {cols, Order} = useColumnSetting(ifields); 
  const fr = frender.GetFieldRendering(ifields[0], 'update'); 

  Order(['c', '*', 'a']); 

  return <div>
    {cols.map( (c,i) => { 
      return <div key={i}>{c.accessor}</div> 
    })} 
  </div> 
} 