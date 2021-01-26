import React, {useState, useEffect, useRef} from 'react'; 
import {Admin} from './pages/admin/admin.page'; 
import {Patient} from './pages/patient/patient.page'; 
import {Input} from './reusable/_input'; 
//import {TestToggle} from './reusable/components/toggle/toggle.component'; 
import {TestSelect} from './reusable/components/select/select.component'; 
import {TestReader, TestEditors} from './experiments/testReaderEditor'; 



export default function App() { 
  //return <TestToggle/> 
  //return <TestSelect/> 
  return <Patient/> 
  //return <Admin/> 
  //return <TestEffect/> 
} 

