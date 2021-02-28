import React from 'react'; 
import {Comparator, Predicate, Sorter, Pick, ToArray, Intersect, Filter, Union, Group, Sort} 
  from '../../reusable/_arrayutils'; 
import {IsEmpty, IsNull} from '../../reusable/_utils'; 


function Grouping<T>(array:T[] = [], predicates:Predicate<T>[]):T[][] { 
  const [predicate, ..._predicates] = predicates; 
  if(!predicate) 
    return [array]; 
  
  let grouped = [] as T[][]; 
  const groups = Group(array, predicate); 
  groups.forEach( group => { 
    const _grouped = Grouping(group, _predicates); 
    grouped = [...grouped, ..._grouped]; 
  }); 
  return grouped; 
} 



const nul = undefined; 
const empty:any[] = []; 
const nums = [5, 3, 7, 9, 6, 7, 8]; 
const strs = ['a', 'bf', 'hf', 'l']; 

type ObjId = {id:string}; 
const objs = [{id:'b'}, {id:'c'}, {id:'d'}, {id:'c'}, {id:'d'}, {id:'a'}]; 
type ObjIdNumStr = {id:string, num:number, str:string}; 
const objIdVal:ObjIdNumStr[] = [ 
  {id:'a', num:1, str: 'b'}, 
  {id:'a', num:2, str: 'f'}, 
  {id:'c', num:1, str: 'g'}, 
  {id:'a', num:3, str: 'l'}, 
  {id:'c', num:2, str: 'f'}, 
  {id:'a', num:3, str: 'l'}, 
  {id:'c', num:1, str: 'd'}, 
]; 


// Test Util ====================================
export function TestArrayUtil() { 
  const groupById = (v:ObjIdNumStr, i:number, As:ObjIdNumStr[]) => { 
    const [pivot] = As; 
    return IsNull(pivot) || pivot.id === v.id; 
  } 
  const groupByNum = (v:ObjIdNumStr, i:number, As:ObjIdNumStr[]) => { 
    const [pivot] = As; 
    return IsNull(pivot) || pivot.num === v.num; 
  } 

  console.log(Grouping(objIdVal, [groupById, groupByNum])); 

  return <div> 
    <TestSorts/> 
  </div> 
} 


// SORT =================================================== 
function TestSorts() {
  const ascending = (t:any, pivot:any) => t > pivot; 
  const descending = (t:any, pivot:any) => t < pivot; 

  const ascendingId = (t:ObjId, pivot:ObjId) => t.id > pivot.id; 
  const descendingId = (t:ObjId, pivot:ObjId) => t.id < pivot.id; 

  return <div>
    <TestSort {...{data:nums, sorter:ascending}} /> <br/>
    <TestSort {...{data:nums, sorter:descending}} /> <br/>

    <TestSort {...{data:strs, sorter:ascending}} /> <br/>
    <TestSort {...{data:strs, sorter:descending}} /> <br/>

    <TestSort {...{data:objs, sorter:ascendingId}} /> <br/>
    <TestSort {...{data:objs, sorter:descendingId}} /> <br/>
  </div>
}

function TestSort<T>({data, sorter}:{data:T[], sorter:Sorter<T>}) { 
  const sorted = Sort(data, sorter); 

  return <div>
    <b>{JSON.stringify(sorter.name)}</b> <br/> 
    <div>Unsorted: {JSON.stringify(data)}</div> 
    <div>Sorted: {JSON.stringify(sorted)}</div> 
  </div>
}

// GROUP ==================================================
function TestGroups() { 
  const groupOf3 = (v:any, i:number, As:any[], Bs:any[], Cs:any[]) => As.length < 3;  
  const groupById = (v:ObjId, i:number, As:ObjId[]) => { 
    const [pivot] = As; 
    return IsNull(pivot) || pivot.id === v.id; 
  } 
  
  return <div> 
    <TestGroup {...{data:empty, predicate:groupById}} /> <br/>
    <TestGroup {...{data:objs, predicate:groupById}} /> <br/>
    <TestGroup {...{data:objs, predicate:groupOf3}} /> <br/>
  </div> 
} 


function TestGroup<T>({data = [], predicate}:{data:T[], predicate:Predicate<T>}) { 
  const groups = Group(data, predicate); 

  return <div> 
    <b>{JSON.stringify(predicate.name)}</b> <br/> 
    data: {JSON.stringify(data)} <br/> 
    {groups.map( (group,i) => { 
      return <div key={i}><span>{i}:</span> 
        {JSON.stringify(group)} 
      </div> 
    })} 
  </div> 
}



// Filter =================================================
function TestFilters() {

  

  const even = (value:number) => value % 2 === 0; 
  const half = (v:any, i:number, a:any[], b:any[], c:any[]) => a.length < b.length; 
  const first4 = (v:any, i:number, a:any[], b:any[], c:any[]) => a.length < 4; 
  const last4 = (v:any, i:number, a:any[], b:any[], c:any[]) => c.length < 4; 
  const duplicate = (v:any, i:number, As:any[], Bs:any[], Cs:any[]) => { 
    return As.some( a => a === v ) || Cs.some( c => c === v); 
  } 
  const idC = (v:ObjId) => v.id === 'c'; 
  const duplicateId = (v:ObjId, i:number, As:ObjId[], Bs:ObjId[], Cs:ObjId[]) => { 
    return As.some( a => a.id === v.id ) || Cs.some( c => c.id === v.id); 
  } 

  return <div>
    <TestFilter {...{data:strs, predicate:half}}/> <br/> 
    <TestFilter {...{data:nums, predicate:duplicate}}/> <br/> 
    <TestFilter {...{data:objs, predicate:duplicateId}}/> <br/> 

    <TestFilter {...{data:objs, predicate:idC}}/> <br/> 

    <TestFilter {...{data:nums, predicate:even}}/> <br/> 
    <TestFilter {...{data:nums, predicate:half}}/> <br/> 
    <TestFilter {...{data:nums, predicate:first4}}/> <br/> 
    <TestFilter {...{data:nums, predicate:last4}}/> <br/> 
  </div>
}

function TestFilter<T>({data, predicate}:{data:T[], predicate:Predicate<T>}) { 
  const [positive, negative] = Filter(data, predicate); 

  return <div> 
    {JSON.stringify(predicate.name)} <br/> 
    data: {JSON.stringify(data)} <br/> 
    positive: {JSON.stringify(positive)} <br/> 
    negative: {JSON.stringify(negative)} <br/> 
  </div> 
}

