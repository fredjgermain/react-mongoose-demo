import React from 'react'; 
import {ToArray, Filter, Indexes, Compare, Pick, Union} from '../../reusable/_utils2'; 
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
    <TestCompare /> <br/>
    <TestUnion  /> <br/>
    <TestFilter {...{testArgs}} /> <br/>
    <TestIndexes {...{testArgs}} /> <br/>
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


// TestCompare ============================================
function TestCompare() { 
  const T = [{id:'d'}, {id:'e'}, {id:'b'}, {id:'a'}, {id:'c'}]; 
  const U = ['a', 'b', 'c', 'd']; 
  const compare = (t:{id:string}, u:string) => { 
    return t.id === u; 
  }; 

  const {comparable, remainder} = Compare(T, U, compare); 
  return <div> 
    <div>Compare</div> 
    {JSON.stringify([T, U])} : 
      <br/> -- comparable: {JSON.stringify(comparable)} 
      <br/> -- remainder: {JSON.stringify(remainder)} 
  </div> 
} 


// Test Union ============================================= 
function TestUnion() { 
  const A = [12, 56, 4, 9, 7, 5, 566]; 
  const B = [15, 99, 54, 68]; 
  const predicate = (v:any) => v > 10; 

  return <div> 
    <div>Union</div> 
    {JSON.stringify(A)} : {JSON.stringify(predicate)} : {JSON.stringify(Union(A, B, predicate))} 
  </div> 
} 

// Test Indexes =========================================== 
function TestIndexes({testArgs}:{testArgs:{array:any[], predicate:Predicate<any>} []}) { 
  return <div> 
    <span>Indexes</span>
    {testArgs.map( ({array, predicate},i) => { 
      return <div key={i}> 
        {JSON.stringify(array)} : {JSON.stringify(predicate)} : {JSON.stringify(Indexes(array, predicate))}</div> 
    })} 
  </div> 
} 

// Test Filter ============================================ 
function TestFilter({testArgs}:{testArgs:{array:any[], predicate:Predicate<any>} []}) { 
  return <div> 
    <span>Filter</span>
    {testArgs.map( ({array, predicate},i) => { 
      return <div key={i}> 
        {JSON.stringify(array)} : {JSON.stringify(predicate)} : {JSON.stringify(Filter(array, predicate))}</div> 
    })} 
  </div> 
} 

// Tester ================================================= 
function Tester({values, func}:{values:any[], func:(value:any)=>any}) { 
  return <div> 
    {values.map( (value,i) => { 
      return <div key={i}> 
        {JSON.stringify(value)} : {func.name} : {JSON.stringify(func(value))}</div> 
    })} 
  </div> 
} 



