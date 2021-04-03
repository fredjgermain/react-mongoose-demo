import { useContext } from 'react'; 
import { AdminRow } from './adminrow.component'; 
import { Header } from './header.component'; 
import { AdminFeedback } from './admin.feedback'; 
import { PagerFromTo, PageOfPages, PagerBtn } from '../../../reusable/_pager'; 
import { AdminContext } from '../admin.page'; 


/* Admin tabler ============================================ */
export function AdminTable() { 
  //const dao = useContext(DaoContext); 
  const {dao, collectionAccessor, paging, feedbackRef} = useContext(AdminContext); 
  const [collection] = dao.GetICollections([collectionAccessor]); 
  const {label} = collection; 

  const Tbody = <tbody> 
    {paging.page.map( e => { 
      return <AdminRow key={e.i} {...{index:e.i}} /> 
    })} 
  </tbody> 


  return <div> 
  <AdminFeedback {...{feedbackRef:feedbackRef}} /> 
  <h2>{label}</h2> 
  <br/>
  <table>
    <caption>You may read, update, delete and create new entries in the collection {label}</caption>
    <Header/> 
    {Tbody} 
    <tfoot> 
      <AdminRow index={-1} /> 
    </tfoot> 
  </table> 
  <div> 
    <PagerFromTo {...{paging}} /> <br/> 
    <PageOfPages {...{paging}} /> <br/> 
    <PagerBtn {...{paging}}/> 
  </div> 
  </div> 


  /*return <div> 
    <AdminFeedback {...{feedbackRef:feedbackRef}} /> 
    <h2>{label}</h2> 
    <br/>
    <table>
      <caption>You may read, update, delete and create new entries in the collection {label}</caption>
      <Header/> 
      {Tbody} 
      <tfoot> 
        <AdminRow index={-1} /> 
      </tfoot> 
    </table> 
    <div> 
      <PagerFromTo {...{paging}} /> <br/> 
      <PageOfPages {...{paging}} /> <br/> 
      <PagerBtn {...{paging}}/> 
    </div> 
  </div> */
} 
