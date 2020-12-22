import React, {useContext} from 'react'; 
import {Tablr, TablrContext, 
  Rows, Row,
  Cells, Cell, 
  CreateBtn, UpdateDeleteBtns
} from '../../packages/_tablr'; 

import {FieldRendering} from '../../packages/_fieldrendering';

import '../../table.css'; 

interface IData { 
  _id: string, 
  str: string, 
  strs: string[], 
  num: number,
  nums: number[]
}
const datas:IData[] = [
  {_id:'0', str:'caca', strs:['a', 'b', 'c'], num:12, nums:[1,2,3,4]}, 
  {_id:'1', str:'vava', strs:['b', 'c'], num:14, nums:[3,4]}, 
  {_id:'2', str:'baba', strs:['c'], num:16, nums:[1,4]}, 
]

const ifield = {accessor:'_id', label:'ID', type:'string', defaultValue:'', format:'', modeltype:'', options:{}, subtype:''};

const columns:IField[] = [
  {...ifield}, 
  {...ifield, accessor:'str', label:'Str'}, 
  {...ifield, accessor:'strs', label:'Strs', type:'array', subtype:'string', defaultValue:[]}, 
  {...ifield, accessor:'num', label:'Num', type:'number', defaultValue:0}, 
  {...ifield, accessor:'nums', label:'Nums', type:'array', subtype:'number', defaultValue:[]}, 
] 


const updateBtn = {
  labels:['Update', 'Confirm Update', 'Cancel Update'], 
  ConfirmFunc:async (data:any):Promise<Boolean> => { 
    console.log('Update');
    return true; 
  }
}

const createBtn = {
  labels:['Create', 'Confirm Create', 'Cancel Create'], 
  ConfirmFunc:async (data:any):Promise<Boolean> => { 
    console.log('Create');
    return true; 
  }
}

const deleteBtn = {
  labels:['Delete', 'Confirm Delete', 'Cancel Delete'], 
  ConfirmFunc:async (data:any):Promise<Boolean> => { 
    console.log('Delete');
    return true; 
  }
}


const mockForeignOptions = [ 
  {value:'0', label:'mock foreign value 0'}, 
  {value:'1', label:'mock foreign value 1'}, 
  {value:'2', label:'mock foreign value 2'} 
] 
const GetForeignOptions = (ifield:IField):IOption[] => mockForeignOptions; 
const GetForeignValue = (ifield:IField, id:string) => mockForeignOptions.find(o=>o.value===id); 
const fieldRendering = new FieldRendering(); 
fieldRendering.DefaultFieldRendering(GetForeignOptions, GetForeignValue); 

// TestTablr ====================================
export default function TesTablr() { 
  return <div>
    <Tablr {...{datas, columnSettings:columns, fieldRendering}} > 
      <DisplayContext/>
      <tbody>
        <Rows>
          <Cells/>
          <td><UpdateDeleteBtns {...{updateBtn, deleteBtn}} /></td>
        </Rows>
        <Row row={-1}> 
          <Cells/> 
          <td><CreateBtn {...createBtn} /></td> 
        </Row> 
      </tbody>
    </Tablr>
  </div>
}



function DisplayContext() {
  const {UseTablr} = useContext(TablrContext); 
  const {activeData, activeMode, activeRow} = UseTablr; 

  return <caption>
      {JSON.stringify(activeData)}
      <br/>
      {JSON.stringify([activeMode, activeRow])}
    </caption>
}