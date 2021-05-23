import React, { useState } from 'react'; 
import { IsEmpty } from '../../libs/_utils'; 
import { CollectionSelector } from './components/collectionselector.component'; 
import { useAdmin, AdminContext } from './hooks/admin.hook'; 
import { AdminInlineTable } from './components/admininlinetable.component'; 
import { RoundBox } from '../../components/roundbox.component';
import { ColumnsSelector } from './components/colsselector.component'; 


export default function AdminPage() { 
  const context = useAdmin(); 
  return <AdminContext.Provider value={context} > 
    <h1>Admin section</h1> 
    <RoundBox>
      <CollectionSelector/> 
      <br/>
      {!IsEmpty(context.collection) && <ColumnsSelector/>} 
    </RoundBox>
    {!IsEmpty(context.collection) && <AdminInlineTable key={context.collection} />} 
  </AdminContext.Provider>
} 