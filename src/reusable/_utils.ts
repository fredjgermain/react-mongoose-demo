import {IsNull, IsEmpty, Copy, GetValueAt, SetValueAt, HasKey} from './utils/value.utils'; 

import {SetSize, SetWidth, IEvent, 
  OnPress, OnTab, OnEnter, 
  GetInputType, GetValueFromInput} from './utils/htmlelement.utils'; 

import {IsInRange, GetDefaultValueByType, GetTypeByValue, GetDefaultValueFromIField, GetDefaultIEntry} 
  from './utils/valuetypetesting.utils'; 

import {ParseDate, DaysPerMonth, IsLeapYear, IsToday} from './utils/date.utils'; 


export type {IEvent} 
export {IsNull, IsEmpty, Copy, GetValueAt, SetValueAt, HasKey} 

export {SetSize, SetWidth, 
  OnPress, OnTab, OnEnter, 
  GetInputType, GetValueFromInput} 

export {IsInRange, GetDefaultValueByType, GetTypeByValue, GetDefaultValueFromIField, GetDefaultIEntry} 
export {ParseDate, DaysPerMonth, IsLeapYear, IsToday} 
