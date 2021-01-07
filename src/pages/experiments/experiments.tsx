import React from 'react'; 
import {TestInputs} from './testinputs'; 
import {TestInputArrays} from './testinputarrays'; 
import {TestSelects} from './testselect'; 
import {TestIsNull} from './testIsNull'; 
import {TestArrayUtils} from './testarrayutils'; 
import {TestArrx} from './testarrx'; 



// EXPERIMENTS ==================================
export default function Experiments() { 

  const arr = [1,2,3,4,5]; 
  const obj = {a:12, b:13, c:'a'}; 
  const keys = Object.keys(obj); 
  console.log(keys);

  return <div> 
    <h1>EXPERIMENTS</h1> 
    <TestArrx /> 
  </div> 
} 


