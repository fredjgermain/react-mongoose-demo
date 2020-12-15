import React, {useState, useRef} from 'react'; 
import {IInput, InputData, InputNumber, InputBool, 
  InputString, InputSelect, InputArray, EnumType} from '../input/inputcommon'; 
//import InputTable, {IColumnSetting} from './inputtable/inputtable'; 
/*import InputRows from './inputtable/inputrow'; 
import InputCells from './inputtable/inputcells'; 
import InputRowBtn from './inputtable/inputbtn/inputrowbtn'; */

export default function TestInput() { 

  const ifield = {} as IField; 

  const userefNum = useRef<any>(null); 

  // single num
  const [num, setNum] = useState(0.5); 
  // single string
  const [str, setStr] = useState(''); 
  // single bool
  const [bool, setBool] = useState(false); 
  // array num
  const [nums, setNums] = useState<number[]>([]); 
  // array string
  const [strs, setStrs] = useState<string[]>([]); 
  // array bool
  const [bools, setBools] = useState<boolean[]>([]); 
  // Selection
  const options:IOption[] = [
    {value:0, label:'option 0'}, 
    {value:1, label:'option 1'}, 
    {value:2, label:'option 2'}, 
    {value:3, label:'option 3'}, 
    {value:4, label:'option 4'}, 
  ]
  const [numSelect, setSelect] = useState(); 
  const [numSelects, setSelects] = useState([0]); 

  const tableData = [
    {_id:1, v1:1, v2:2},
    {_id:2, v1:5, v2:9},
    {_id:3, v1:4, v2:8},
    {_id:4, v1:6, v2:10},
    {_id:5, v1:3, v2:12},
  ]; 
  const [tableNum, setTableNum] = useState(tableData); 

  const [activeRow, setActiveRow] = useState(0); 

  
  const ref = useRef<any>(null); 

  const inputNum = <div> 
    <h4>Input num:</h4> 
    <div>|{num}|</div> 
    <InputData value={num} onSendValue={setNum} /> 
  </div> 

  const inputStr = <div> 
    <h4>Input str:</h4> 
    <div>|{str}|</div> 
    <InputData value={'str'} onSendValue={setStr} /> 
  </div> 

  const inputBool = <div> 
    <h4>Input bool:</h4> 
    <div>|{JSON.stringify(bool)}|</div> 
    <InputData value={bool} onSendValue={setBool} /> 
  </div> 

  const inputNums = <div> 
    <h4>Input nums:</h4> 
    <div>|{JSON.stringify(nums)}|</div> 
    <InputArray<number> value={nums} onSendValue={setNums} type={EnumType.NUMBER} defaultValue={0 as any} /> 
  </div> 

  const inputStrs = <div> 
    <h4>Input strs:</h4> 
    <div>|{JSON.stringify(strs)}|</div> 
    <InputArray<string> type={EnumType.STRING} value={strs} onSendValue={setStrs} defaultValue={''} /> 
  </div> 

  const inputBools = <div> 
    <h4>Input bools:</h4> 
    <div>|{JSON.stringify(bools)}|</div> 
    <InputArray<boolean> value={bools} onSendValue={setBools} type={EnumType.BOOLEAN} defaultValue={false} /> 
  </div>

  const select = <div> 
    <h4>Input select:</h4> 
    <div>|{JSON.stringify(numSelect)}|</div> 
    <InputSelect value={numSelect} onSendValue={setSelect} options={options} /> 
  </div> 

  const selects = <div> 
    <h4>Input selects:</h4> 
    <div>|{JSON.stringify(numSelects)}|</div> 
    <InputSelect value={numSelects} onSendValue={setSelects} options={options} isMulti/> 
  </div> 

/*
    {inputStr}
    {inputBool}
    {inputNums}
    {inputStrs}
    {inputBools}
*/
  // RENDER -------------------------------------
  return <div> 
    {inputNum} 
    {inputStr} 
    {select} 
    {selects} 
  </div> 
} 
