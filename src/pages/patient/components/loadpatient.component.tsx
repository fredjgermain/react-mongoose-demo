import React, {useContext, useEffect, useState} from 'react'; 
import {DaoContext} from '../../../reusable/_dao'; 
import {FeedBack} from '../../../components/feedback/feedback.component'; 



// LOAD PATIENTS ================================
export function LoadPatients() { 
  const {setActiveCollection, Collections, GetCollections} = useContext(DaoContext); 

  async function GetPatient() { 
    await Collections(['patients']); 
    const collection = GetCollections().find( c => c.accessor==='patients'); 
    if(collection) 
      setActiveCollection(collection); 
  } 
  
  useEffect(() => { 
    GetPatient(); 
  }, []); 

  return <div> 
    <FeedBack/> 
  </div> 
}