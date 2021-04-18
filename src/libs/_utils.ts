import {IsNull, IsEmpty, Copy, GetValueAt, SetValueAt, HasKey} from './utils/value.utils'; 

import {DefaultWidth, IEvent, 
  OnPress, OnTab, OnEnter, 
  GetInputType, GetValueFromInput} from './utils/htmlelement.utils'; 

import {IsInRange, GetDefaultValueByType, GetTypeByValue, GetSelectedValuesFromOptions, GetDefaultValueFromIField, GetDefaultIEntry} 
  from './utils/valuetypetesting.utils'; 

import {ParseDate, DaysPerMonth, IsLeapYear, IsToday} from './utils/date.utils'; 


export type {IEvent} 
export {IsNull, IsEmpty, Copy, GetValueAt, SetValueAt, HasKey} 

export {DefaultWidth, 
  OnPress, OnTab, OnEnter, 
  GetInputType, GetValueFromInput} 

export {IsInRange, GetDefaultValueByType, GetTypeByValue, GetSelectedValuesFromOptions, GetDefaultValueFromIField, GetDefaultIEntry} 
export {ParseDate, DaysPerMonth, IsLeapYear, IsToday} 
