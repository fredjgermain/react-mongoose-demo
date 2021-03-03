import React from 'react'; 
import { useQuestionnaire, IUseQuestionnaire } from './usequestionnaire.hook'; 
import {QuestionPage} from './components/questionpage.component'; 


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
