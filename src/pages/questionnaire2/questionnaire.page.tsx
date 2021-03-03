import React, { useContext } from 'react'; 
import { Arrx, Elements, Element, ElementContext } from '../../reusable/_arrx'; 
import { DaoContext } from '../../reusable/_dao2'; 
import { Editor } from '../../reusable/_input'; 
import { useQuestionnaire, IUseQuestionnaire } from './usequestionnaire.hook'; 


export const QuestionnnaireContext = React.createContext({} as IUseQuestionnaire); 
export function Questionnaire() { 
  const context = useQuestionnaire(); 
  const {questionnaire, TestResetSession} = context; 

  return <QuestionnnaireContext.Provider value={context} > 
    <h2>Questionnaire </h2> 
    <button onClick={TestResetSession}>Reset sessions</button> 
    <div> 
      Questionnaire: {JSON.stringify(questionnaire.map(q => q.answer))} 
      <QuestionPage answers={questionnaire} /> 
    </div> 
  </QuestionnnaireContext.Provider> 
} 

export function Pager() { 
  const {paging, AnswersAreComplete, SubmitQuestionnaire} = useContext(QuestionnnaireContext); 
  const {page, pageIndex, pages, setPageIndex} = paging; 
  const pageIsComplete = AnswersAreComplete(page.map(ia => ia.t)); 
  const formIsComplete = AnswersAreComplete(); 

  console.log([pageIsComplete, formIsComplete]); 

  async function SubmitAnswersAndNextPage () { 
    await SubmitQuestionnaire(page.map(ia => ia.t)) 
    setPageIndex(pageIndex+1) 
  }

  return <div> 
    {pages.map( (p,i) => { 
      return <button key={i} onClick={() => setPageIndex(i)} disabled={i===pageIndex}>{i+1}</button> 
    })} 
    <BtnSubmitAnswers/> 
  </div>
}

export function BtnSubmitAnswers() { 
  const {paging, AnswersAreComplete, SubmitQuestionnaire} = useContext(QuestionnnaireContext); 
  const {page, pageIndex, pages, setPageIndex} = paging; 
  const pageIsComplete = AnswersAreComplete(page.map(ia => ia.t)); 
  const formIsComplete = AnswersAreComplete(); 

  async function SubmitAnswersAndNextPage () { 
    await SubmitQuestionnaire(page.map(ia => ia.t)) 
    setPageIndex(pageIndex+1) 
  }

  return <div> 
    {formIsComplete ? 
      <button onClick={() => SubmitQuestionnaire()} disabled={!formIsComplete}>Submit</button>: 
      <button onClick={() => SubmitAnswersAndNextPage()} disabled={!pageIsComplete} >Next</button> 
    } 
  </div> 
}


export function QuestionPage({answers}:{answers:IAnswer[]}) { 
  const {questionnaire, GetQuestionnaireItem, paging} = useContext(QuestionnnaireContext); 
  const page = paging.pages[paging.pageIndex]; 
  const indexes = page.map(e => e.i); 
  const [first] = page.map(e => e.t); 
  const {form, instructions, question, response} = GetQuestionnaireItem(first); 
  
  return <div> 
    <h2>{form && form.titles[0]}</h2> 
    {instructions && instructions.map( p => { 
      return <h3 key={p._id} >{p.labels[0]}</h3> 
    })}
    <Arrx values={questionnaire}> 
      <Elements indexes={indexes}> 
        <QuestionnaireItem /> <ResponseItem /> <ItemIsComplete/> 
        <br/>
      </Elements>
    </Arrx> 
    <Pager/> 
  </div> 
} 


export function ItemIsComplete() {
  const {questionnaire, GetQuestionnaireItem, AnswersAreComplete} = useContext(QuestionnnaireContext); 
  const {index} = useContext(ElementContext); 
  const answer = questionnaire[index]; 
  const {question} = GetQuestionnaireItem(answer); 

  const success = {className:'success', symbol:'✓'}; 
  const failure = {className:'failure', symbol:'x'}; 
  //const optional = {className:'optional', symbol:'?'}; 

  const display = AnswersAreComplete([answer]) ? success: failure; 
  console.log(question?.optional);
  
  return <span className={display.className}>{display.symbol} {question?.optional && '?'}</span>
}


export function QuestionnaireItem() { 
  const {questionnaire, GetQuestionnaireItem} = useContext(QuestionnnaireContext); 
  const {index} = useContext(ElementContext); 
  const answer = questionnaire[index]; 
  const {question} = GetQuestionnaireItem(answer); 
  const label = question?.labels[0]; 

  return <span>{label}</span>
}


export function ResponseItem() { 
  const {GetIFields, GetIOptions} = useContext(DaoContext); 
  const {questionnaire, setQuestionnaire, GetQuestionnaireItem, } = useContext(QuestionnnaireContext); 
  const {index} = useContext(ElementContext); 
  const answer = questionnaire[index] as IAnswer; 
  const {response} = GetQuestionnaireItem(answer); 
  const value = answer.answer; 

  const setValue = (newAnswer:number) => { 
    setQuestionnaire(newAnswer, [index, 'answer']); 
  } 

  const type = response?.responseType['type'] 
  const defaultValue = ''; 
  const options = (response?.responseType['enum'] as string[]).map( (e, i) => { 
    return {value:i, label:e}; 
  });
  const ifield = {accessor:'', label:'', type, defaultValue} as IField;
  
  //return <span>{JSON.stringify(response)}</span> 
  return <Editor {...{value, setValue, ifield, options}} />
} 