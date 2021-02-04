import React, {useContext, useEffect} from 'react'; 
import {CrudContext} from '../../reusable/_crud'; 
import {FeedBack} from '../../components/feedback/feedback.component'; 
import {IsEmpty} from '../../reusable/_utils'; 

import {CollectionSelector} from './components/collectionselector.component'; 
import {AdminTablr} from './components/admintablr.component'; 

import '../../css/table.css'; 




// ADMIN PAGE ====================================
export default function Admin() { 
  const {state, activeCollection, setActiveCollection} = useContext(CrudContext); 

  useEffect(() => { 
    setActiveCollection({} as ICollection); 
  }, []); 

  return <div> 
    <h2>Admin</h2> 
    <FeedBack/> 
    {state.ready && state.success && <CollectionSelector /> } 
    {!IsEmpty(activeCollection) && <AdminTablr/>} 
  </div> 
}

//{!IsEmpty(activeCollection) && <AdminTablr/>} 

