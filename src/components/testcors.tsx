import React, { useState, useEffect } from 'react'; 
import {crud} from '../mongoosedao/crudaxios'; 


export default function TesTCors() { 
  const [access, setAccess] = useState({}); 

  useEffect(() => { 
    Access(); 
  }, []); 

  async function Access() { 
    const result = await crud.Access(); 
    console.log(result); 
    //const read = await crud.Read("forms"); 
    setAccess(result); 
  } 

  if(access === JSON.stringify({})) 
    return <div>IsLoading</div>; 
  return <div>Loaded !! </div>; 
} 