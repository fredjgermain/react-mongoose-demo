import React, { useContext } from 'react'; 
import { IUseAdmin, useAdmin } from './hooks/useadmin.hook'; 
import { IsEmpty } from '../../reusable/_utils'; 

import { CollectionSelector } from './components/collectionselector.component'; 
import { Entry } from './components/entry.component'; 
import { Header } from './components/header.component'; 

import '../../css/table.css'; 
import { PagerFromTo, PageOfPages, PagerBtn } from '../../reusable/_pager';
import { DaoContext } from '../../reusable/_dao';

/* 
- title 
- CollectionSelector. 
- AdminTablr once a collection has been selected. 
*/ 
export const AdminContext = React.createContext({} as IUseAdmin); 
export default function AdminPage() { 
  const context = useAdmin(); 
  return <AdminContext.Provider value={context}> 
    <h2>Admin section</h2> 
    <CollectionSelector/> 
    {!IsEmpty(context.GetEditState(['collection'])) && <AdminTablr/>} 
  </AdminContext.Provider> 
} 


export function AdminTablr() { 
  console.log('admintablr'); 
  const {GetICollections} = useContext(DaoContext); 
  const {collectionAccessor, paging} = useContext(AdminContext); 
  const [collection] = GetICollections([collectionAccessor]); 
  const {label} = collection; 

  const Tbody = <tbody> 
      {paging.page.map( e => { 
        return <Entry key={e.i} {...{index:e.i}} /> 
      })} 
      <Entry index={-1} /> 
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


// Entries ================================================ 
/*function Entries({indexes}:{indexes:number[]}) { 
  const {GetCollection, GetEntries} = useContext(AdminContext); 
  const entries = Filter(GetEntries(), e => e._id); 



  return 
  
}*/


export function EditingState() {
  const {GetEditState} = useContext(AdminContext); 
  const {collection, index, mode} = GetEditState();

  return <div> 
    Collection: {collection} <br/> 
    index: {JSON.stringify(index)} <br/> 
    Mode: {mode} <br/> 
  </div>
}
