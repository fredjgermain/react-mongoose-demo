import React, { useContext } from 'react'; 
import { useAdmin, IUseAdmin, TEditingState } from './useadmin.hook'; 
import { Arrx, Elements, Element } from '../../reusable/_arrx'; 
import { IsEmpty } from '../../reusable/_utils'; 


import {CollectionSelector} from './components/collectionselector.component'; 
import {Entry, Entry2} from './components/entry.component'; 
import {Header} from './components/header.component'; 

import '../../css/table.css'; 

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
  const {GetCollection, GetEntries} = useContext(AdminContext); 
  const values = GetEntries(); 
  const collectionLabel = GetCollection()?.label; 

  return <div> 
    <h3>{collectionLabel}</h3> 
    <EditingState/> 
    <table> 
      <Header/> 
      <tbody><Arrx {...{values}}> 
          <Elements><Entry2/></Elements> 
          
      </Arrx></tbody> 
    </table> 
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