import React, { useContext } from 'react'; 
import { useAdmin, IUseAdmin, TEditingState } from './useadmin.hook'; 
import { Objx, Keys, Key } from '../../reusable/_objx2'; 
import { IsEmpty } from '../../reusable/_utils'; 

import {CollectionSelector} from './components/collectionselector.component'; 
import {Entry} from './components/entry.component'; 
import {Header} from './components/header.component'; 

import '../../css/table.css'; 
import { PagerFromTo, PageOfPages, PagerBtn } from '../../reusable/_pager';

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
    {!IsEmpty(context.GetCollection()) && <AdminTablr/>} 
  </AdminContext.Provider> 
} 


export function AdminTablr() { 
  console.log('admintablr'); 
  const {GetCollection, GetEntries, paging} = useContext(AdminContext); 
  const value = GetEntries(); 
  const collectionLabel = GetCollection()?.label; 
  const indexes = paging.page.map( item => [item.i]); 

  return <div> 
    <h3>{collectionLabel}</h3> 
    <EditingState/> 
    <table><Header/><tbody> 
      <Objx {...{value}}> 
        <Keys {...{keys:indexes}}><Entry/></Keys> 
      </Objx> 
      <Entry/> 
    </tbody></table> 
    <div> 
      <PagerFromTo {...{paging}} /> <br/>
      <PageOfPages {...{paging}} /> <br/>
      <PagerBtn {...{paging}}/> 
    </div>
  </div> 
} 

export function EditingState() {
  const {Get} = useContext(AdminContext); 
  const {collection, entry, mode} = Get() as TEditingState; 

  return <div> 
    Collection: {collection} <br/> 
    Entry: {JSON.stringify(entry)} <br/> 
    Mode: {mode} <br/> 
  </div>
}