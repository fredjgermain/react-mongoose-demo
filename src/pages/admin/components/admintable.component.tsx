import { useContext } from 'react'; 
import { AdminRow } from './adminrow.component'; 
import { Header } from './header.component'; 
import { AdminFeedback } from './admin.feedback'; 
import { PagerFromTo, PageOfPages, PagerBtn } from '../../../reusable/_pager'; 
import { AdminContext } from '../admin.page'; 


/* Admin tabler ============================================ */
export function AdminTable() { 
  console.log('admintablr'); 
  //const dao = useContext(DaoContext); 
  const {dao, collectionAccessor, paging, feedbackRef} = useContext(AdminContext); 
  const [collection] = dao.GetICollections([collectionAccessor]); 
  const {label} = collection; 

  const Tbody = <tbody> 
    {paging.page.map( e => { 
      return <AdminRow key={e.i} {...{index:e.i}} /> 
    })} 
    <AdminRow index={-1} /> 
  </tbody> 

  return <div> 
    <AdminFeedback {...{feedbackRef:feedbackRef}} /> 
    <h2>{label}</h2> 
    <table>
      <Header/> 
      {Tbody} 
      <tfoot>
        TAble footer
      </tfoot>
    </table> 
    <div> 
      <PagerFromTo {...{paging}} /> <br/> 
      <PageOfPages {...{paging}} /> <br/> 
      <PagerBtn {...{paging}}/> 
    </div> 
  </div> 
} 
