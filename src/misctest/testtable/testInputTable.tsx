// INPUT TABLE
import React from 'react'; 
import {Package_InputTable} from '../../custompackages'; 
import {Package_MongooseDao} from '../../custompackages'; 
const {
  Header:{InputHeader, InputHeaderRow},
  Rows:{InputRow, InputRows},
  Cells:{InputCells},
  useCrud,
  Table:{default:InputTable},
  BuildColumnSetting, 
  Btn:{CreateBtn, UpdateDeleteBtn} 
} = Package_InputTable;
//import {Package_Input} from '../../custompackages'; 

//const {InputArray, InputData, InputSelect} = Package_Input; 
const Field = Package_MongooseDao.Field; 
type IDao = Package_InputTable.IDao; 
type IColumnSettingRule = Package_InputTable.IColumnSettingRule; 
import '../inputtable/table.css'; 

// PAGE 
import {usePage, IPageHook} from '../../packages/customhooks/customhooks'; 

// MOCK DATA 
import {dao} from './data'; 
import {icolrules} from './columnrules';


// TEST INPUT TABLE
export default function TestInputTable() { 
  const activeCollection = dao.GetICollection('collection1') as ICollection; 
  const {entries, Create, Update, Delete} = useCrud(dao, activeCollection); 
  const {ifields} = activeCollection; 
  const iColumnSetting = BuildColumnSetting(dao, ifields, icolrules); 

  const {pageIndex, setPageIndex, from, to, pageIndexes} = usePage(entries, 5); 
  const page = Array.from({length: to-from}, (v, k) => k+from); 

  // CRUD functionality 
  const createLabel = {action:'Create', confirm:'Confirm create', cancel:'Cancel create'}; 
  const onCreate = Create; 
  const updateLabel = {action:'Update', confirm:'Confirm update', cancel:'Cancel update'}; 
  const onUpdate = Update; 
  const deleteLabel = {action:'Delete', confirm:'Confirm delete', cancel:'Cancel delete'}; 
  const onDelete = Delete; 

  // 
  return <div> 
    <h4>Input table:</h4> 
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


function Paging({from, to, pageIndex, setPageIndex, pageIndexes}:IPageHook) { 
  return <div>
    {pageIndexes.map( (p, i) => { 
      return <button key={i} onClick={() => setPageIndex(i)} disabled={pageIndex===i} >
          {i+1}
        </button> 
    })} 
  </div>
}
