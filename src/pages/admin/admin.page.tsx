import React, {useContext} from 'react'; 
import { IUseAdmin, useAdmin } from './hooks/useadmin.hook'; 
import { IsEmpty } from '../../libs/_utils'; 

import { CollectionSelector } from './components/collectionselector.component'; 
import { AdminTable } from './components/admintable.component'; 

import '../../css/main.css'; 



/* Admin Pages ============================================
- title 
- CollectionSelector. 
- AdminTablr once a collection has been selected. 
*/ 
export const AdminContext = React.createContext({} as IUseAdmin); 
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

    {!IsEmpty(context.GetEditState(['collection'])) && <AdminTable/>} 
  </AdminContext.Provider> 
} 

function EditingState() { 
  const {GetEditState} = useContext(AdminContext); 
  const {collection, index, mode} = GetEditState(); 

  return <div> 
    Collection: {collection} <br/> 
    index: {JSON.stringify(index)} <br/> 
    Mode: {mode} <br/> 
  </div>
}
