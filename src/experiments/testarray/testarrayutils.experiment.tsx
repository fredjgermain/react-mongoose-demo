import React from 'react'; 
import {ToArray, Filter, Indexes, Union, Group, Sort, Duplicates} from '../../reusable/_utils2'; 
import {Comparator, Predicate} from '../../reusable/_utils2'; 
import {IsEmpty, IsNull} from '../../reusable/_utils2'; 


// Test Util ====================================
export function TestArrayUtil() { 
  const values:any[] = [
    undefined, 
    '', 
    0, 
    [] as any[], 
    {}, 
    null, 
  ] 

  const testArgs = [ 
    {array:[12,56,4,9,7,5,566], predicate: v => v > 10}, 
    {array:[12,56,4,9,7,5,566], predicate: (v,i) => i < 5} 
  ] as { array:any[], predicate:Predicate<any> } []; 
  

  return <div> 
    <TestDuplicates /> <br/>
    <TestGroup /> <br/>
    <TestUnion  /> <br/>
    <TestFilter {...{testArgs}} /> <br/> 
    <TestIndexes {...{testArgs}} /> <br/> 
    <TestSort /> 
  </div> 


  return <div> 
    <h1>ArrayTest</h1> 
    <h3>test 'IsNull'</h3> 
    <Tester {...{values, func:IsNull}} /> 
    <br/> 
    <h3>test 'IsEmpty'</h3> 
    <Tester {...{values, func:IsEmpty}} /> 
  </div> 
} 




// DUPLICATES =========================================
function TestDuplicates() { 
  const ts = [{id:'b'}, {id:'b'}, {id:'a'}, {id:'d'}, {id:'a'}, {id:'c'}]; 
  const {duplicates, unics} = Duplicates(ts, (t,u) => t.id === u.id); 

  return <div> 
    <div>Duplicates / Unics</div> 
    {JSON.stringify([ts])} : 
      <br/> -- duplicates: {JSON.stringify(duplicates)} 
      <br/> -- unics: {JSON.stringify(unics)} 
  </div> 
} 


// GROUP ===============================================
function TestGroup() { 
  type T = {id:string}; 
  const array = [{id:'b'}, {id:'b'}, {id:'a'}, {id:'d'}, {id:'a'}, {id:'c'}]; 
  const comparator = (t:T,u:string) => t.id === (u as string); 
  const comparator2 = (t:T,u:T) => t.id === (u as T).id; 

  const grouped = Group<T, string>(array,  comparator, ['a']); 
  const grouped2 = Group<T, T>(array,  comparator2); 

  return <div> 
    <div>Group</div> 
    {JSON.stringify([array])} : 
      <br/> -- grouped: {JSON.stringify(grouped)} 
      <br/> -- grouped: {JSON.stringify(grouped2)} 
  </div> 
} 

// SORT =================================================
function TestSort() { 
  const ts = [{id:11}, {id:2}, {id:1}, {id:5}, {id:4}, {id:7}]; 
  const sorted = Sort(ts, (t, pivot) => t.id > pivot.id); 
  
  return <div> 
    <div>Sort</div> 
    {JSON.stringify([ts])} : 
      <br/> -- sorted: {JSON.stringify(sorted)} 
  </div> 
} 


// Test Union ============================================= 
function TestUnion() { 
  const A = [12, 56, 4, 9, 7, 5, 566]; 
  const B = [15, 99, 54, 68]; 
  const predicate = (v:any) => v > 10; 

  return <div> 
    <div>Union</div> 
    {JSON.stringify(A)} : 
    {JSON.stringify(B)} : 
    {JSON.stringify(Union(A, B, predicate))} 
  </div> 
} 

// Test Indexes =========================================== 
function TestIndexes({testArgs}:{testArgs:{array:any[], predicate:Predicate<any>} []}) { 
  return <div> 
    <span>Indexes</span>
    {testArgs.map( ({array, predicate},i) => { 
      return <div key={i}> 
        {JSON.stringify(array)} : 
        {JSON.stringify(predicate)} : 
        {JSON.stringify(Indexes(array, predicate))} 
      </div> 
    })} 
  </div> 
} 

// Test Filter ============================================ 
function TestFilter({testArgs}:{testArgs:{array:any[], predicate:Predicate<any>} []}) { 
  return <div> 
    <span>Filter</span>
    {testArgs.map( ({array, predicate},i) => { 
      return <div key={i}> 
        {JSON.stringify(array)} : 
        {JSON.stringify(predicate)} : 
        {JSON.stringify(Filter(array, predicate))} 
      </div> 
    })} 
  </div> 
} 

// Tester ================================================= 
function Tester({values, func}:{values:any[], func:(value:any)=>any}) { 
  return <div> 
    {values.map( (value,i) => { 
      return <div key={i}> 
        {JSON.stringify(value)} : 
        {func.name} : 
        {JSON.stringify(func(value))} 
      </div> 
    })} 
  </div> 
} 



