import React from 'react'; 
import {Comparator, Predicate, ToArray, Intersect, Filter, Union, Group, Sort, Duplicates} 
  from '../../reusable/_arrayutils'; 
import {IsEmpty, IsNull} from '../../reusable/_utils'; 


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
    <TestAccumulator/> <br/> 
    
    <TestGroup2/> <br/> 
  </div>
    
    /*<TestDuplicates /> <br/> 
    <TestIntersect/> <br/> 
    <TestPicker /> <br/> 
    <TestUnion  /> <br/> 
    <TestFilter {...{testArgs}} /> <br/> 
    <TestIndexes {...{testArgs}} /> <br/> 
    <TestSort /> 
  </div> */
} 



// GROUP ==============================================
function TestAccumulator() { 
  type T = {id:string}; 
  type U = string; 
  const ts:T[] = [{id:'b'}, {id:'b'}, {id:'a'}, {id:'d'}, {id:'a'}, {id:'c'}]; 

  const takeHalfPredicate = (value:T, i:number, accumulator:T[], remainder:T[]) => 
    accumulator.length < remainder.length; 
  const [firstHalf, secondHalf] = Filter(ts, takeHalfPredicate); 

  const takeFourPredicate = (value:T, i:number, accumulator:T[], remainder:T[]) => 
    accumulator.length < 4; 
  const [firstFour, minusFour] = Filter(ts, takeFourPredicate); 

  const lastFourPredicate = (value:T, i:number, accumulator:T[], remainder:T[]) => 
    remainder.length >= 4; 
  const [firstMinusFour, rest] = Filter(ts, lastFourPredicate); 

  return <div>
    <div>Group</div> 
    {JSON.stringify([ts])} <br/> 
    -- halves : {JSON.stringify([firstHalf, ' ............ ' , secondHalf])} <br/> 
    -- firstFour : {JSON.stringify([firstFour, ' ............ ' , minusFour])} <br/> 
    -- lastFour : {JSON.stringify([firstMinusFour, ' ............ ' , rest])} <br/> 
  </div>
} 


// GROUP ==============================================
function TestGroup1() { 
  type T = {id:string}; 
  type U = string; 
  const ts:T[] = [{id:'b'}, {id:'b'}, {id:'a'}, {id:'d'}, {id:'a'}, {id:'c'}]; 
  const predicate = (value:T, i:number, filtered:T[], remainder:T[]) => { 
    const [first] = remainder; 
    return !IsEmpty(first) && value.id === first?.id; 
  }

  const groups = Group(ts, predicate) 

  return <div>
    <div>Group</div> 
    {JSON.stringify([ts])} <br/>
    -- grouped : {groups.map( (group,i) => {
        return <div key={i}>{JSON.stringify(group)}</div>
      })}
  </div>
} 



function TestGroup2() { 
  type T = {id:string}; 
  type U = string; 
  const ts:T[] = [ 
    {id:'b'}, {id:'a'}, {id:'b'}, {id:'c'}, {id:'b'}, {id:'d'}, 
    {id:'a'}, {id:'d'}, {id:'a'}, {id:'d'}, {id:'a'}, {id:'d'}, 
    {id:'a'}, {id:'c'}, {id:'a'}, {id:'c'}, {id:'a'}, {id:'c'} 
  ]; 

  const predicate = (value:T, i:number, filtered:T[], remainder:T[]) => { 
    const [pivot] = filtered; 
    //const [shift] = remainder; 
    const test = filtered.length < 5 && (pivot?.id === value.id || IsEmpty(filtered)); 
    console.log('Filtered :  ' + JSON.stringify(filtered)) 
    console.log('Remainder:  ' +JSON.stringify(remainder)) 
    console.log('value....:  ' + JSON.stringify([value, pivot, test])) 
    return test; 
  }

  const groups = Group(ts, predicate) 

  return <div>
    <div>Group</div> 
    {JSON.stringify([ts])} <br/>
    -- grouped : {groups.map( (group,i) => {
        return <div key={i}>{JSON.stringify(group)}</div>
      })}
  </div>
} 

// INTERSECT ==========================================
function TestIntersect() { 
  type T = {id:string}; 
  type U = string; 
  const ts:T[] = [{id:'b'}, {id:'b'}, {id:'a'}, {id:'d'}, {id:'a'}, {id:'c'}]; 
  const us:U[] = ['b','c']; 
  const compare = (t:T, u:U) => t.id === u; 

  const [intersect, excluded] = Intersect(ts, us, compare); 

  return <div>
    <div>Intersect</div> 
    {JSON.stringify([ts])} : 
    {JSON.stringify([us])} : 
      <br/> -- intersect: {JSON.stringify(intersect)} 
      <br/> -- excluded: {JSON.stringify(excluded)} 
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



// PICKER ===============================================
function TestPicker() { 
  type T = {id:string}; 
  const array = [{id:'b'}, {id:'b'}, {id:'a'}, {id:'d'}, {id:'a'}, {id:'c'}]; 
  //const comparator = (t:T,u:string) => t.id === (u as string); 
  const pickingOrder = ['a', 'c']; 

  const predicate = (t:T) => pickingOrder.includes(t.id); 

  const sorter = (t:T,pivot:T) => { 
    const pivotIndex = pickingOrder.indexOf(pivot.id); 
    const index = pickingOrder.indexOf(t.id); 
    return index >= 0 && index >= pivotIndex; 
  }; 

  //const grouped = Group<T, string>(array,  comparator); 
  const [inclusion, exclusion] = Filter(array, predicate); 
  const picked = Sort<T>(inclusion,  sorter); 

  return <div> 
    <div>Picker</div> 
    {JSON.stringify([array])} : 
      <br/> -- picked: {JSON.stringify(picked)} 
  </div> 
} 

// SORT =================================================
function TestSort() { 
  const array = [{id:11}, {id:2}, {id:1}, {id:5}, {id:4}, {id:7}]; 
  const sorted = Sort(array, (t, pivot) => t.id > pivot.id); 

  const sort1 = <div><br/> {JSON.stringify(array)} : 
    <br/> -- sorted: {JSON.stringify(sorted)} 
  </div>


  const array2 = [{id:'b'}, {id:'b'}, {id:'a'}, {id:'d'}, {id:'a'}, {id:'c'}]; 
  const sorted2 = Sort(array2, (t, pivot) => t.id > pivot.id); 

  const sort2 = <div><br/> {JSON.stringify(array2)} : 
  <br/> -- sorted: {JSON.stringify(sorted2)} </div>
  
  return <div> 
    <div>Sort</div> 
      {sort1}
      {sort2}
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



