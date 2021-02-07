import {ToArray, Filter, Indexes, Group, Sort, Union, Duplicates} from './utils/arrays2.utils';
import {Comparator, Predicate} from './utils/arrays2.utils';
import {IsNull, IsEmpty} from './utils/value.utils';

import {SetSize, SetWidth, IEvent, 
  OnPress, OnTab, OnEnter, 
  GetInputType, GetValueFromInput} from './utils/htmlelement.utils'; 

import {Copy, IsInRange, GetValueAt, SetValueAt, 
  GetDefaultValueByType, GetTypeByValue, GetDefaultValueFromIField} from './utils/valuetypetesting.utils'; 
//import {Field} from './utils/field/field.class'; 


export type {Comparator, Predicate, IEvent} 
export {ToArray, Filter, Indexes, Group, Sort, Union, Duplicates} 
export {IsNull, IsEmpty} 

export {SetSize, SetWidth, 
  OnPress, OnTab, OnEnter, 
  GetInputType, GetValueFromInput} 

export {Copy, IsInRange, GetValueAt, SetValueAt, 
  GetDefaultValueByType, GetTypeByValue, GetDefaultValueFromIField} 