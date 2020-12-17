import React, {useState} from 'react'; 
import {IInput, InputData, InputNumber, InputBool, InputString, InputSelect, InputArray, EnumType} from '../../input/inputcommon'; 
import {usePage, IPageHook} from '../../packages/customhooks/usePage'; 

export default function TestInput() { 
  const data = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]; 
  const [entries, setEntries] = useState(data); 
  const {pageIndex, setPageIndex, from, to, pageIndexes} = usePage(entries, 5); 
  const page = entries.slice(from, to); 

  // 
  const onChangeEntries = (newValue:number, index:number) => { 
    const newEntries = [...entries]; 
    newEntries[index] = newValue; 
    setEntries(newEntries); 
  } 

  //<span key={i}>{v},</span>; 
  return <div>
    <div>[ 
      {page.map((v,i) => { 
        return <span key={i} >{v}</span>; 
      })} 
    ]</div>
    <div>[ 
      {page.map((v,i) => { 
        return <InputNumber key={i} value={v} onSendValue={(newValue:number) => {onChangeEntries(newValue, i)}} /> 
      })} 
    ]</div> 
    <Paging {...{pageIndex, setPageIndex, from, to, pageIndexes}} />
  </div>
}

function Paging({from, to, pageIndex, setPageIndex, pageIndexes}:IPageHook) { 
  return <div>
    {pageIndexes.map( (p, i) => { 
      return <button key={i} onClick={() => setPageIndex(i)}>{i+1}</button> 
    })} 
  </div>
}