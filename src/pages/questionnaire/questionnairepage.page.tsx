import React, {useState} from 'react'; 
import { IsEmpty } from '../../reusable/utils/_utils'; 
import { QuestionnaireLoader } from './components/questionnaireloader.component'; 
import { Questionnaire } from './components/questionnaireforms.component'; 

interface IQuestionnaireContext { 
  questions:ICollection; 
  setQuestions:any; 
  responses: ICollection; 
  setResponses: any; 
  answers: ICollection; 
  setAnswers: any; 
} 

export const QuestionnaireContext = React.createContext({} as IQuestionnaireContext); 
export default function QuestionnairePage() { 
  const [questions, setQuestions] = useState({} as ICollection); 
  const [responses, setResponses] = useState({} as ICollection); 
  const [answers, setAnswers] = useState({} as ICollection); 

  const context = {questions, setQuestions, responses, setResponses, answers, setAnswers}; 
  return <div> 
    <QuestionnaireContext.Provider value={context}> 
      <h1>Questionnaire</h1>
      {(IsEmpty(questions) || IsEmpty(responses)) && <QuestionnaireLoader /> } 
      {!(IsEmpty(questions) || IsEmpty(responses)) && <Questionnaire/> } 
    </QuestionnaireContext.Provider> 
  </div> 
}
