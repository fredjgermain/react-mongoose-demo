import React, {useState, useEffect, useRef} from 'react'; 
import {Admin} from './pages/admin/admin.page'; 
import {Input} from './reusable/_input';
//import {TestToggle} from './reusable/components/toggle/toggle.component'; 
import {TestSelect} from './reusable/components/select/select.component';



export default function App() { 
  //return <TestToggle/> 
  //return <TestSelect/> 
  return <Admin/>
  //return <TestEffect/> 
} 


function TestEffect() {
  const [value, setValue] = useState(12); 
  const firstRender = useRef(true); 

  console.log(value); 
  useEffect(() => { 
    console.log('first '+value); 
  }, []); 
  
  useEffect(() => { 
    if(firstRender.current) {
      firstRender.current = false; 
      return; 
    }
    console.log('changing '+value); 
  }, [value]) 

  return <div>
    {value} <br/>
    <Input {...{value, setValue}} /> 
  </div>
}




function TestHook ({value, setValue}) {
  
}
