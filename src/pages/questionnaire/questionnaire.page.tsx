import React, {useContext} from 'react'; 
import { useQuestionnaire, IUseQuestionnaire, IQItem } from './hooks/usequestionnaire.hook'; 
import { Pager } from './components/pager.component'; 
import { RoundBox } from '../../components/roundbox.component'; 
import { Editor } from '../../libs/editor_reader/_editor_reader'; 
import { RedirectBtn } from '../../components/redirector/redirectbtn.component';

import '../../css/main.css'; 



export const QuestionnaireContext = React.createContext({} as IUseQuestionnaire); 
export default function QuestionnairePage() { 
  const context = useQuestionnaire(); 
  const success = context.feedBack.every(r => r.success); 

  return <QuestionnaireContext.Provider value={context}> 
    <h1>Questionnaire</h1> 
    <br/> 
    <RoundBox> 
      <FormTitleInstructions /> 
      <QuestionMap /> 
    </RoundBox> 
    <Pager /> 
    <RedirectBtn {...{condition:!success, target:"thankyou"}} /> 
  </QuestionnaireContext.Provider> 
} 



function FormTitleInstructions() { 
  const {paging} = useContext(QuestionnaireContext); 
  const [title] = paging.page.map(p=>p.form.titles[0]); 
  const [instructions] = paging.page.map(p=>p.instructions.map(i=>i.labels[0])); 

  return <div> 
    <h2>{JSON.stringify(title)}</h2> 
    <ul> 
      {instructions.map( i => { 
        return <li>{i}</li>; 
      })} 
    </ul> 
  </div> 
} 


function QuestionMap() { 
  const {paging} = useContext(QuestionnaireContext); 

  return <div> 
    {paging.page.map( qitem => { 
      return <QuestionItem {...{qitem}} /> 
    })} 
  </div> 
} 

function QuestionItem({qitem}:{qitem:IQItem}) { 
  const {questionnaire, SetQuestionnaire, AnswersAreComplete} = useContext(QuestionnaireContext); 
  const enums = qitem.response.values; 
  const value = qitem.answer; 
  const editValue = (newAnswer:number) => { 
    const copy = [...questionnaire]; 
    const index = copy.findIndex( q => q.question._id === qitem.question._id); 
    if(index < 0) 
      return; 
    copy[index].answer = newAnswer; 
    SetQuestionnaire(copy); 
  } 
  const options = enums?.map( (e:any, i:number) => { 
    return {value:i, label:e}; 
  }); 
  const ifield = {accessor:'', label:'', type:'number', defaultValue:-1, 
    enums, isEnum:!!enums} as IField; 

  const success = {className:'success', symbol:'✓'}; 
  const failure = {className:'failure', symbol:'x'}; 
  const display = AnswersAreComplete([qitem]) ? success: failure; 


  return <div> 
    <hr/> 
    <h4>{qitem.question.labels[0]}</h4> 
    <Editor {...{value, editValue, ifield, options}} /> 
    <span className={display.className}> {display.symbol} {qitem.question?.optional && '?'}</span> 
  </div> 
} 


  /*
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
    <RedirectBtn {...{condition:patientNull, target:'patient'}}/> 
  </QuestionnaireContext.Provider> */





// ---------------------------------------
// function FormTitleInstructions() { 
//   const {paging} = useContext(QuestionnaireContext); 
//   const page = paging.pages[paging.pageIndex]; 
//   const {form, instructions} = useQuestionnaireItem(page[0]?.i); 
  
//   return <div> 
//     <h2>{form && form.titles[0]}</h2> 
//     <br/> 
//     {!IsEmpty(instructions) && <ul className={'borderedform'}> 
//       {instructions.map( p => { 
//         return <li className={'warning'} key={p._id} >{p.labels[0]}</li> 
//       })} 
//     </ul>} 
//   </div> 
// } 


// // ---------------------------------------
// function QuestionMap({page}:{page:{i:number, t:IAnswer}[]}) { 
//   return <div className={'borderedform'}> 
//     {page.map( p => { 
//       return <QuestionItem key={p.i} {...{index:p.i}} /> 
//     })} 
//     <br/> 
//     <Pager/> 
//   </div> 
// } 

