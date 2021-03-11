import { useContext } from 'react'; 
import {Pager} from './pager.component'; 
import {QuestionnnaireContext} from '../questionnaire.page'; 
import {QuestionItem} from './questionitem.component'; 
import { useQuestionnaireItem } from '../hooks/usequestionnaireitem.hook'; 

// QUESTION PAGE ======================================================
export function QuestionPage() { 
  const {paging} = useContext(QuestionnnaireContext); 
  const page = paging.pages[paging.pageIndex]; 
  //console.log(page[0]); 
  const {form, instructions} = useQuestionnaireItem(page[0]?.i); 

  return <div>
    <h2>{form && form.titles[0]}</h2> 
    {instructions && instructions.map( p => { 
      return <h3 key={p._id} >{p.labels[0]}</h3> 
    })}

    <div> 
      {page.map( p => { 
        return <QuestionItem key={p.i} {...{index:p.i}} /> 
      })} 
    </div> 
    <Pager/> 
  </div>
} 
