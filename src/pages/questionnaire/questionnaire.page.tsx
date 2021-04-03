import React, {useContext} from 'react'; 
import { useQuestionnaire, IUseQuestionnaire } from './hooks/usequestionnaire.hook'; 
import { QuestionItem } from './components/questionitem.component'; 
import { useQuestionnaireItem } from './hooks/usequestionnaireitem.hook'; 
import { Pager } from './components/pager.component'; 
import { QuestionnaireFeedback }  from './components/questionnaire.feedback';
import { Session } from '../../reusable/_session';
import { IsEmpty } from '../../reusable/_utils'; 
import { Redirection } from '../../components/redirector/redicrector.component'; 


export const QuestionnaireContext = React.createContext({} as IUseQuestionnaire); 
export default function QuestionnairePage() { 
  const patient = Session.Get('profile') as IEntry; 
  const patientNull = IsEmpty(patient?._id); 

  const context = useQuestionnaire(patient); 
  const {paging, feedbackRef} = context; 
  const page = paging.pages[paging.pageIndex]; 
  
  return <QuestionnaireContext.Provider value={context}> 
    <h1>Questionnaires</h1> 
    <QuestionnaireFeedback {...{feedbackRef}}/> 
    <br/> 
    <FormTitleInstructions/> 
    <br/> 
    <QuestionMap {...{page}} /> 
    <Redirection {...{condition:patientNull, destination:'patient'}}/> 
  </QuestionnaireContext.Provider> 
} 


function FormTitle({page}:{page:{i:number, t:IAnswer}[]}) { 
  const {form} = useQuestionnaireItem(page[0]?.i); 
  return <div> 
    <h2>{form && form.titles[0]}</h2> 
  </div> 
} 


// ---------------------------------------
function FormTitleInstructions() { 
  const {paging} = useContext(QuestionnaireContext); 
  const page = paging.pages[paging.pageIndex]; 
  const {form, instructions} = useQuestionnaireItem(page[0]?.i); 
  
  return <div> 
    <h2>{form && form.titles[0]}</h2> 
    <br/> 
    {!IsEmpty(instructions) && <ul className={'borderedform'}> 
      {instructions.map( p => { 
        return <li className={'warning'} key={p._id} >{p.labels[0]}</li> 
      })} 
    </ul>} 
  </div> 
} 


// ---------------------------------------
function QuestionMap({page}:{page:{i:number, t:IAnswer}[]}) { 
  return <div className={'borderedform'}> 
    {page.map( p => { 
      return <QuestionItem key={p.i} {...{index:p.i}} /> 
    })} 
    <br/> 
    <Pager/> 
  </div> 
} 

