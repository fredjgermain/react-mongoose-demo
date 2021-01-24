import React, {useContext} from 'react'; 
import {DaoContext} from '../../reusable/_dao'; 
import {Tablr, Header, Heads, } from '../../reusable/_tablr'; 
import {BuildDefaultRenderingFunc} from '../../reusable/_rendering'; 
import {usePage} from '../../reusable/_usepage'; 
import {Paging} from './paging.component'; 
import {useUpdate} from '../../reusable/_useupdate'; 
import {InlineCreate, InlineUpdateDelete} from './linecrud.component';


// ADMIN TABLR ===================================
export function AdminTablr() { 
  const {activeEntry, activeCollection, GetForeignElements, GetForeignOptions, GetForeignValues} = useContext(DaoContext); 
  const {entries, ifields} = activeCollection; 
  const {pageIndex, setPageIndex, pages} = usePage(entries, 5); 
  const page = pages[pageIndex]; 

  useUpdate(() => { 
    setPageIndex(0); 
  }, activeCollection.accessor); 

  const renderers = BuildDefaultRenderingFunc(GetForeignElements, GetForeignOptions, GetForeignValues); 

  const cols = ifields.filter(f=>f.label); 
  const colBtn = {label:'Btn', accessor:'', defaultValue:'', options:{}, type:''} as IField; 

  return <div>
    {JSON.stringify(activeEntry)} 
    <Tablr key={activeCollection.accessor} {...{datas:entries}}> 
      <Header><Heads {...{ifields:[...cols, colBtn]}} /></Header>
      <tbody>
      <InlineUpdateDelete {...{page, cols, colBtn, renderers}}/> 
      <InlineCreate {...{cols, colBtn, renderers}}/> 
      </tbody> 
    </Tablr> 
    <Paging {...{pageIndex, setPageIndex, pages}} /> 
  </div>
}
