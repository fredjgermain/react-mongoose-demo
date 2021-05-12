import React, { useState } from 'react'; 
import { IsEmpty } from '../../libs/_utils'; 
import { CollectionSelector } from './components/collectionselector.component'; 
import { useAdmin, AdminContext } from './hooks/admin.hook'; 
import { AdminInlineTable } from './components/admininlinetable.component'; 
import { RoundBox } from '../../components/roundbox.component';



export default function AdminPage() { 
  const context = useAdmin(); 
  return <AdminContext.Provider value={context} > 
    <h1>Admin section</h1> 
    <RoundBox>
      <CollectionSelector/> 
      <br/> 
      <ul>
        <li>Use the selector above to select a data collection you wish to read and/or edit.</li>
      </ul>
    </RoundBox>
    {!IsEmpty(context.collection) && <AdminInlineTable key={context.collection} />}     
  </AdminContext.Provider>
} 