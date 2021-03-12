import React from 'react'; 
import { useQuestionnaire, IUseQuestionnaire } from './hooks/usequestionnaire.hook'; 
import {QuestionPage} from './components/questionpage.component'; 

export const QuestionnnaireContext = React.createContext({} as IUseQuestionnaire); 
export function Questionnaire() { 
  const context = useQuestionnaire(); 

  // Questionnaire: {JSON.stringify(questionnaire.map(q => q.answer))} 
  // <button onClick={TestResetSession}>Reset sessions</button> 
  return <QuestionnnaireContext.Provider value={context} > 
    <h1>Questionnaire </h1> 
    <QuestionPage /> 
  </QuestionnnaireContext.Provider> 
} 
