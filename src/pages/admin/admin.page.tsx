import { IsEmpty } from '../../libs/_utils'; 
import { AdminContext, useAdmin } from './admin.hook'; 
import { CollectionSelector } from './components/collectionselector.component'; 
import { InlineTable } from './components/inlineadmintable.component'; 

import '../../css/main.css'; 

export default function AdminPage() { 
  const context = useAdmin(); 
  return <AdminContext.Provider value={context}> 
    <h1>Admin section</h1> 
    <br/> 
    <CollectionSelector/> 
    <ul> 
      <li>Use the selector above to select a collection you wish to read and/or edit.</li> 
      <li>In the table below use the "Create", "Update" and "Delete" button.</li> 
    </ul> 

    {!IsEmpty(context.collectionAccessor) && <InlineTable/>} 
  </AdminContext.Provider> 
} 
