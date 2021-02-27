import React, { useContext } from 'react'; 
import { Arrx, Elements, Element, ElementContext } from '../../reusable/_arrx';
import { DaoContext } from '../../reusable/_dao2';
import { Editor } from '../../reusable/_input';
import { useQuestionnaire, IUseQuestionnaire } from './usequestionnaire.hook'; 

export const QuestionnnaireContext = React.createContext({} as IUseQuestionnaire); 
export function Questionnaire() { 
  const context = useQuestionnaire(); 
  const {questionnaire} = context; 


  return <QuestionnnaireContext.Provider value={context} > 
    <h2>Questionnaire </h2> 
    <div> 
      Questionnaire: {JSON.stringify(questionnaire.map(q => q.answer))} 
      <QuestionPage answers={questionnaire} /> 
    </div> 
  </QuestionnnaireContext.Provider> 
} 

export function QuestionPage({answers}:{answers:IAnswer[]}) { 
  const {questionnaire, GetQuestionnaireItem} = useContext(QuestionnnaireContext); 

  const [first] = questionnaire; 
  const {form, instructions, question, response} = GetQuestionnaireItem(first); 
    
  return <div> 
    <h2>{form && form.titles[0]}</h2> 
    {instructions && instructions.map( p => { 
      return <h3 key={p._id} >{p.labels[0]}</h3> 
    })}
    <Arrx values={questionnaire}>
      <Elements>
        <QuestionnaireItem /> <ResponseItem />
        <br/>
      </Elements>
    </Arrx>
  </div> 
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