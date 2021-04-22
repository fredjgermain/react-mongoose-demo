import { useContext } from 'react'; 
import { DaoContext } from '../../../libs/_dao'; 
import { IEditor } from '../../../libs/editor_reader/_editor_reader'; 
import { QuestionnaireContext } from '../questionnaire.page'; 

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
  const {questionnaire, setQuestionnaire} = useContext(QuestionnaireContext); 
  const dao = useContext(DaoContext); 
  
  const answer = questionnaire[index]; 
  if(!answer) 
    return {} as IUseQuestionnaireItem; 

  const [question] = dao.GetIEntries('questions', [answer.question]) as IQuestion[]; 
  const [form] = dao.GetIEntries('forms', [question?.form]) as IForm[]; 
  const instructions = dao.GetIEntries('instructions', question?.instructions) as IInstruction[]; 
  const [response] = dao.GetIEntries('responses', [question?.responseType]) as IResponse[]; 
  const isOptional = question?.optional; 
  
  const enums = response?.values as string[]; 
  const value = answer.answer; 
  const editValue = (newAnswer:number) => setQuestionnaire(newAnswer, [index, 'answer']); 
  
  const options = enums?.map( (e, i) => { 
    return {value:i, label:e}; 
  }); 
  const ifield = {accessor:'', label:'', type:'number', defaultValue:-1, 
    enums, isEnum:!!enums} as IField; 
  const IEditorArgs = {value, editValue, options, ifield} as IEditor; 


  return {answer, question, form, instructions, response, isOptional, IEditorArgs} 
}
