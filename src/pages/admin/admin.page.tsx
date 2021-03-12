import React, { useContext } from 'react'; 
import { IUseAdmin, useAdmin } from './hooks/useadmin.hook'; 
import { IsEmpty } from '../../reusable/_utils'; 

import { CollectionSelector } from './components/collectionselector.component'; 
import { AdminRow } from './components/adminrow.component'; 
import { Header } from './components/header.component'; 

import '../../css/table.css'; 
import { PagerFromTo, PageOfPages, PagerBtn } from '../../reusable/_pager';
import { DaoContext } from '../../reusable/_dao';
import { Feedback } from '../../components/feedback/feedback.component';


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
    <Feedback/>
    <CollectionSelector/> 
    {!IsEmpty(context.GetEditState(['collection'])) && <AdminTablr/>} 
  </AdminContext.Provider> 
} 

/* Admin tabler ============================================ 
*/
export function AdminTablr() { 
  console.log('admintablr'); 
  const {GetICollections} = useContext(DaoContext); 
  const {collectionAccessor, paging} = useContext(AdminContext); 
  const [collection] = GetICollections([collectionAccessor]); 
  const {label} = collection; 

  const Tbody = <tbody> 
      {paging.page.map( e => { 
        return <AdminRow key={e.i} {...{index:e.i}} /> 
      })} 
      <AdminRow index={-1} /> 
    </tbody> 

  return <div> 
    <h3>{label}</h3> 
    <EditingState/> 
    <table><Header/> 
      {Tbody} 
    </table> 
    <div> 
      <PagerFromTo {...{paging}} /> <br/> 
      <PageOfPages {...{paging}} /> <br/> 
      <PagerBtn {...{paging}}/> 
    </div> 
  </div> 
} 



export function EditingState() {
  const {GetEditState} = useContext(AdminContext); 
  const {collection, index, mode} = GetEditState();

  return <div> 
    Collection: {collection} <br/> 
    index: {JSON.stringify(index)} <br/> 
    Mode: {mode} <br/> 
  </div>
}
