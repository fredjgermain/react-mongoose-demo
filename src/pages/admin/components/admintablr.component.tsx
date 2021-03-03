import React, {useContext} from 'react'; 
import {Tablr, Header, Heads, } from '../../../reusable/_tablr'; 
//import {BuildDefaultRenderingFunc} from '../../../reusable/_rendering'; 
import {usePage} from '../../../reusable/_customhooks'; 
import {Paging} from '../../../components/paging.component'; 
import {useUpdate} from '../../../reusable/_customhooks'; 
import {InlineCreate, InlineUpdateDelete} from './linecrud.component'; 


// ADMIN TABLR ===================================
export function AdminTablr() { 
  return <div> ADMIN TABLR </div>
  /*const {activeEntry, activeCollection} = useContext(CrudContext); 
  const {entries, ifields} = activeCollection; 
  const {pageIndex, setPageIndex, page, pages} = usePage(entries, 5); 
  const _page = pages[pageIndex].map( e => e.i); 
  
  useUpdate(() => { 
    setPageIndex(0); 
  }, activeCollection.accessor); 

  const cols = ifields.filter(f=>f.label); 
  const colBtn = {label:'Btn', accessor:'', defaultValue:'', options:{}, type:''} as IField; 

  return <div>
    {JSON.stringify(activeEntry)} 
    <Tablr key={activeCollection.accessor} {...{datas:entries}}> 
      <Header><Heads {...{ifields:[...cols, colBtn]}} /></Header>
      <tbody>
      <InlineUpdateDelete {...{page: _page, cols, colBtn}}/> 
      <InlineCreate {...{cols, colBtn}}/> 
      </tbody> 
    </Tablr> 
    <Paging {...{pageIndex, setPageIndex, page, pages}} /> 
  </div>*/
}
