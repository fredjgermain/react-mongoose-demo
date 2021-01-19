import { useEffect, useState } from 'react';
import {IRenderers, BuildDefaultRenderingFunc, IFieldToHandler} from '../components/rendering/renderers.utils'; 
import { Tablr, Rows, Cells, Header, Heads } from '../reusable/components/tablr/_tablr';
//import {ValueRenderer} from '../components/rendering/valuerenderer.component'; 
import {IsEmpty} from '../reusable/utils/_utils'; 


const MockCollection1:ICollection = { 
  accessor:'main', 
  label:'main', 
  ifields: [
    {accessor:'_id', label:'Id', type:'objectid', options:{}, defaultValue:''}, 
    {accessor:'str', label:'String', type:'string', options:{}, defaultValue:'', isAbbrev:true}, 
    {accessor:'num', label:'Number', type:'number', options:{}, defaultValue:0}, 
    {accessor:'foreign', label:'Foreign', type:'foreign', options:{}, defaultValue:'', isModel:true}, 
    {accessor:'foreigns', label:'Foreigns', type:'foreign', options:{}, defaultValue:'', isArray:true, isModel:true}, 
  ], 
  entries: [ 
    {_id:'0', str:'value 0', num:12, foreign:'0', foreigns:['0'] }, 
    {_id:'1', str:'value 1', num:13, foreign:'2', foreigns:['0', '1'] }, 
    {_id:'2', str:'value 2', num:14, foreign:'0', foreigns:[] }, 
  ], 
}

const MockCollection2:ICollection = { 
  accessor:'foreign', 
  label:'Foreign', 
  ifields: [
    {accessor:'_id', label:'Id', type:'objectid', options:{}, defaultValue:''}, 
    {accessor:'str', label:'String', type:'string', options:{}, defaultValue:'', isAbbrev:true}, 
    {accessor:'num', label:'Number', type:'number', options:{}, defaultValue:0}, 
  ], 
  entries: [
    {_id:'0', str:'foreign value 0', num:12 }, 
    {_id:'1', str:'foreign value 1', num:13 }, 
    {_id:'2', str:'foreign value 2', num:14 }, 
  ], 
}

function DefaultGetForeignElements(ifield:IField):{foreignCollection:ICollection|undefined, abbrevField:IField|undefined} {
  const foreignCollection = MockCollection2; 
  const abbrevField = MockCollection2.ifields.find( f => f.isAbbrev ); 
  if(!ifield.isModel) 
    return {foreignCollection, abbrevField}; 
  return {foreignCollection, abbrevField}; 
} 

function DefaultGetForeignOptions(ifield:IField) : IOption[] { 
  const {foreignCollection, abbrevField} = DefaultGetForeignElements(ifield);
  if(!foreignCollection || !abbrevField)
    return [] as IOption[]; 
  return foreignCollection.entries?.map( e => { 
    return {value:e._id, label:e[abbrevField.accessor]} as IOption; 
  }); 
} 

function DefaultGetForeignValues(ifield:IField, ids:string[]):any[] { 
  const {foreignCollection, abbrevField} = DefaultGetForeignElements(ifield); 
  if(!ids || IsEmpty(ids)) 
    return []; 
  if(!foreignCollection || !abbrevField) 
    return [] as IOption[]; 
  return foreignCollection.entries
    ?.filter(e => ids.includes(e._id) )
    ?.map( e => e[abbrevField.accessor] );
} 


// TestRenderer =====================================
export function TestRenderer() { 
  const renderers = BuildDefaultRenderingFunc(DefaultGetForeignElements, DefaultGetForeignOptions, DefaultGetForeignValues); 

  const {accessor, entries, ifields, label} = MockCollection1; 
  const [entry, setEntry] = useState(entries[0]); 
  
  return <div> 
    <h3>{label}</h3> 
    <Tablr {...{datas:entries}}> 
      <Header> 
        <Heads {...{ifields}} /> 
      </Header> 
      <tbody> 
      <Rows> 
        <Cells {...{ifields}}> 

          <ValueRenderer />
        </Cells> 
      </Rows>
      </tbody> 
    </Tablr> 
  </div> 
} 


function ValueRenderer({value, setValue, ifield, isEdit, renderers} 
:{ 
  value:any; 
  setValue:any; 
  ifield:IField; 
  isEdit:boolean; 
  renderers:IRenderers; 
}) { 
  const [renderValue, setRenderValue] = useState(value); 

  useEffect(() => { 
    console.log('brand new'); 
  }, []) 

  const handler = `${IFieldToHandler(ifield)}${isEdit?'Edit':'Read'}`; 
  const renderer = renderers[handler] ?? renderers['Default']; 
  
  return <span>{renderer(ifield)(renderValue, setRenderValue)}</span> 
}

/*function () { 

} */