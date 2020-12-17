import React from 'react'; 
import {Package_ColumnSetting} from '../../custompackages'; 
const {useColumnSetting} = Package_ColumnSetting; 


export default function TestColumnSetting() { 
  const field = {accessor:'a', label:'A', type:'string', defaultValue:'', subtype:'', modeltype:'', format:'', options:{}}; 

  const ifields:IField[] = [ 
    {...field, accessor:'a', label:'A', type:'string', defaultValue:''}, 
    {...field, accessor:'b', label:'B', type:'number'}, 
    {...field, accessor:'c', label:'C', type:'number'}, 
    {...field, accessor:'d', label:'D', type:'number'} 
  ] 

  const {cols, Order} = useColumnSetting(ifields); 

  Order(['c', '*', 'a']); 

  return <div>{ 
    cols.map( (c,i) => { 
      return <div key={i}>{c.accessor}</div> 
    }) 
    }</div> 
} 