import React, {useContext} from 'react'; 
import { useQuestionnaire, IUseQuestionnaire } from './hooks/usequestionnaire.hook'; 
import { QuestionItem } from './components/questionitem.component'; 
import { useQuestionnaireItem } from './hooks/usequestionnaireitem.hook'; 
import { Pager } from './components/pager.component'; 
import { QuestionnaireFeedback }  from './components/questionnaire.feedback';
import { Session } from '../../reusable/_session';
import { SessionDebug } from '../../components/sessiondebug/sessiondebug.component';


export const QuestionnaireContext = React.createContext({} as IUseQuestionnaire); 
export default function QuestionnairePage() { 
  const patient = Session.Get('profile'); 
  

  const context = useQuestionnaire(patient); 
  const {paging, feedbackRef} = context; 
  const page = paging.pages[paging.pageIndex]; 
  
  return <QuestionnaireContext.Provider value={context} > 
    <QuestionnaireFeedback {...{feedbackRef}}/> 
    <FormTitleInstructions/> 
    <div> 
      {page.map( p => { 
        return <QuestionItem key={p.i} {...{index:p.i}} /> 
      })} 
    </div> 
    <Pager/> 
  </QuestionnaireContext.Provider> 
} 

function FormTitleInstructions() { 
  const {paging} = useContext(QuestionnaireContext); 
  const page = paging.pages[paging.pageIndex]; 
  const {form, instructions} = useQuestionnaireItem(page[0]?.i); 
  
  return <div><h2>{form && form.titles[0]}</h2> 
    {instructions && instructions.map( p => { 
      return <h3 key={p._id} >{p.labels[0]}</h3> 
    })}
  </div>
}


function ResetQuestionnaire() { 
  const {TestResetSession} = useContext(QuestionnaireContext); 

  return <div>
    <button onClick={TestResetSession} >Reset Questionnaire</button>
  </div>
}

