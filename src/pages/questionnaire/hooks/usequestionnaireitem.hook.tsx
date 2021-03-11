import { useContext } from 'react'; 
import { DaoContext } from '../../../reusable/_dao'; 
import { IEditor } from '../../../reusable/_input'; 
import { QuestionnnaireContext } from '../questionnaire.page'; 




export interface IUseQuestionnaireItem { 
  answer: IAnswer; 
  question: IQuestion; 
  form: IForm; 
  instructions: IInstruction[]; 
  response: IResponse; 
  isOptional: boolean; 
  IEditorArgs: IEditor; 
}

export function useQuestionnaireItem(index:number) : IUseQuestionnaireItem { 
  const {questionnaire, setQuestionnaire} = useContext(QuestionnnaireContext); 
  const {GetIEntries} = useContext(DaoContext); 

  const answer = questionnaire[index]; 
  if(!answer) 
    return {} as IUseQuestionnaireItem; 

  const [question] = GetIEntries('questions', [answer.question]) as IQuestion[]; 
  const [form] = GetIEntries('forms', [question?.form]) as IForm[]; 
  const instructions = GetIEntries('instructions', question?.instructions) as IInstruction[]; 
  const [response] = GetIEntries('responses', [question?.responseType]) as IResponse[]; 
  const isOptional = question?.optional; 

  const enums = response?.responseType['enum'] as string[]; 
  const value = answer.answer; 
  const setValue = (newAnswer:number) => setQuestionnaire(newAnswer, [index, 'answer']); 
  const options = enums?.map( (e, i) => { 
    return {value:i, label:e}; 
  }); 
  const ifield = {accessor:'', label:'', type:'number', defaultValue:-1, 
    enums, isEnum:!!enums} as IField; 

  const IEditorArgs = {value, setValue, options, ifield} as IEditor; 


  return {answer, question, form, instructions, response, isOptional, IEditorArgs} 
}
