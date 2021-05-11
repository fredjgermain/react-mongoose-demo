import React, { useState } from 'react'; 
import { IsEmpty } from '../../libs/_utils'; 
import { CollectionSelector } from './components/collectionselector.component'; 
import { useAdmin, AdminContext } from './hooks/admin.hook'; 
import { AdminInlineTable } from './components/admininlinetable.component'; 


//import {} from '../../libs'

/* 
DaoContext 
  CollectionContext 


--- AdminInlineTable ---
  usePaging, 
  useFilter, 
  useSorter, 
  useColumn, 
  feedback = useStateReset 
  useInlineTable, 

  InlineTableContext 

*/

export default function AdminPage() { 
  const context = useAdmin(); 
  return <AdminContext.Provider value={context} > 
    <h1>Admin section</h1> 
    <br/> 
    <CollectionSelector/> 
    <ul> 
      <li>Use the selector above to select a data collection you wish to read and/or edit.</li> 
      <li>Use the "Create" at the bottom of table to create and add new entry in the selected data collection.</li> 
      <li>Use "Update" and "Delete" buttons on the right end side of each table row to update or delete the corresponding entry.</li> 
    </ul> 
    {!IsEmpty(context.collection) && <AdminInlineTable key={context.collection} />} 
  </AdminContext.Provider>
} 