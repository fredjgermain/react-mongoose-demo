import React from 'react'; 
import {Filter, Combine, Duplicates, IsEmpty, CommonPredicates, Order} from '../../reusable/utils/_utils'; 
const {ByIndexes, Intersect, Exclusion, Compare} = CommonPredicates; 


// EXPERIMENTS ==================================
export function TestArrayUtils() { 
  const strings = [{name:'a'}, {name:'b'}, {name:'b'}, {name:'c'}, {name:'d'}, {name:'e'}, {name:'d'}]; 
  const ordering = ['e','a', 'c']; 
  const intersect = ['a','b','d']; 

  const intersects = Filter(ordering, Intersect(intersect)); 
  const exclusions = Filter(ordering, Exclusion(intersect)); 
  const ordered = Order(strings, ordering, (a:any, b:any) => a['name']===b ); 

  /*const ordered = Filter(ordering, Compare(strings, (a:any,b:any) => { 
    console.log(a,b); 
    return a['name']===b; 
  })); */

  const combine = Combine(ordering, strings, (a,b) => a===b.name).map(([a,b]) => b); 

  const test = Filter(strings, ByIndexes([5,4,1])); 

  const {duplicates, unics} = Duplicates(strings, (a:any, b:any) => JSON.stringify(a) === JSON.stringify(b) ); 

  return <div> 
    {JSON.stringify(duplicates)} 
    <br/>
    {JSON.stringify(unics)} 
    <br/>
    {JSON.stringify(test)} 
    <br/>
    {JSON.stringify(intersects)} 
    <br/>
    {JSON.stringify(exclusions)} 
    <br/>
    {JSON.stringify(ordered)} 
  </div> 
} 


