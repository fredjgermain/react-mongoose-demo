import React, {useContext} from 'react'; 
import {AdminContext} from './adminsection'; 

import './table.css'; 

// INPUT TABLE 
import {InputTable, InputHeader, InputHeaderRow, 
  InputRows, InputRow, InputCells, InputCell, 
  UpdateDeleteBtn, CreateBtn} from '../custompackages'; 
  
// Page 
import {usePage, IPageHook} from '../custompackages'; 

// Crud 
import {useCrud} from '../custompackages'; 

// Column setting rules 
import {BuildColumnSetting, ColumnSetter, IColumnSetting} from '../custompackages'; 
import {icolrules} from '../businesslogic/columnrules'; 


// ADMIN TABLE ==================================
export default function AdminTable() { 
  const {dao, activeCollection} = useContext(AdminContext); 

  // CRUD functionality 
  const {entries, response, Create, Update, Delete} = useCrud(dao, activeCollection); 
  const createLabel = {action:'Create', confirm:'Confirm create', cancel:'Cancel create'}; 
  const onCreate = Create; 
  const updateLabel = {action:'Update', confirm:'Confirm update', cancel:'Cancel update'}; 
  const onUpdate = Update; 
  const deleteLabel = {action:'Delete', confirm:'Confirm delete', cancel:'Cancel delete'}; 
  const onDelete = Delete; 

  // column settings
  const iColumnSetting = BuildColumnSetting(dao, activeCollection.ifields, icolrules); 
  const colModifier = (col:IColumnSetting) => { 
    if(col.ifield.accessor[0] === '_') 
      col.show = false; 
  } 
  ColumnSetter(iColumnSetting, colModifier); 

  // paging
  const {pageIndex, setPageIndex, from, to, pageIndexes} = usePage(entries, 5); 
  const page = Array.from({length: to-from}, (v, k) => k+from); 


  // RENDER -------------------------------------
  return <div> 
    <h4>Input table:</h4> 
    <Response {...response} /> 
    <InputTable entries={entries} colsetting={iColumnSetting}> 
      <thead> 
        <InputHeaderRow> 
          <InputHeader/><th>BTN</th> 
        </InputHeaderRow> 
      </thead> 
      <tbody> 
        <InputRows rows={page}> 
          <InputCells/> 
          <UpdateDeleteBtn {...{updateLabel, deleteLabel, onUpdate, onDelete}}/> 
        </InputRows> 
      </tbody> 
      <tfoot> 
        <InputRow row={-1}> 
          <InputCells/> 
          <CreateBtn {...{createLabel, onCreate}}/> 
        </InputRow> 
      </tfoot> 
    </InputTable> 
    <Paging {...{pageIndex, setPageIndex, from, to, pageIndexes}}/> 
  </div> 
}

function Response({actionType,success,data,err}:IResponse) { 
  const {dao, activeCollection} = useContext(AdminContext); 
  if(success) 
    return <div className='feedback_green'>{activeCollection.label} successful {actionType}</div> 
  return <div className='feedback_red'>{err?.map( e => 
      {return <div>{e}</div>} 
    )}</div>; 
}

function Paging({from, to, pageIndex, setPageIndex, pageIndexes}:IPageHook) { 
  return <div>
    {pageIndexes.map( (p, i) => { 
      return <button key={i} onClick={() => setPageIndex(i)} disabled={pageIndex===i} >
          {i+1}
        </button> 
    })} 
  </div>
}