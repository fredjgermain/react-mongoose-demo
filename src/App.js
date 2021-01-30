import React, {useState, useEffect, useRef} from 'react'; 
import {Admin} from './pages/admin/admin.page'; 
import {Patient} from './pages/patient/patient.page'; 
import {Input} from './reusable/_input'; 
//import {TestToggle} from './reusable/components/toggle/toggle.component'; 
import {TestReader, TestEditors, TestSelect} from './experiments/testReaderEditor'; 

export default function App() { 
  //return <TestToggle/> 
  //return <TestSelect/> 
  return <Patient/> 
  //return <Admin/> 
  //return <TestSelect/> 
  //return <TestEffect/> 
} 

