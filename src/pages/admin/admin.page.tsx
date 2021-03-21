import React, {useContext} from 'react'; 
import { IUseAdmin, useAdmin } from './hooks/useadmin.hook'; 
import { IsEmpty } from '../../reusable/_utils'; 

import { CollectionSelector } from './components/collectionselector.component'; 
import { AdminTable } from './components/admintable.component'; 

import '../../css/table.css'; 
//import { Feedback } from '../../components/feedback/feedback.component'; 


/* Admin Pages ============================================
- title 
- CollectionSelector. 
- AdminTablr once a collection has been selected. 
*/ 
export const AdminContext = React.createContext({} as IUseAdmin); 
export default function AdminPage() { 
  const context = useAdmin(); 
  return <AdminContext.Provider value={context}> 
    <EditingState/> 
    <h1>Admin section</h1> 
    <br/> 
    <CollectionSelector/> 
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
