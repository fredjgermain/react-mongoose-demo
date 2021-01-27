import React, {useContext, useState} from 'react'; 
import {PatientProfileContext} from '../patient/patient.page'; 
import {DaoContext, EActionType} from '../../reusable/_dao'; 
import {LoadQuestionnaire} from './components/loadquestionnaire.component'; 
import {IsEmpty} from '../../reusable/_utils'; 
import {Arrx, ArrxContext, Elements, ElementContext} from '../../reusable/_arrx'; 
import {usePage} from '../../reusable/_usepage'; 
import {Paging} from '../../components/paging.component'; 


interface IAnswersContext { 
  answers: IAnswer[]; 
  setAnswers: React.Dispatch<IAnswer[]>; 
} 
export const AnswersContext = React.createContext({} as IAnswersContext); 
// Questionnaire ================================ 
export function Questionnaire() { 
  const {patientProfile} = useContext(PatientProfileContext); 
  const [answers, setAnswers] = useState([] as IAnswer[]); 

  const context = {answers, setAnswers}; 
  return <AnswersContext.Provider value={context}> 
    <h1>Patient questionnaire</h1> 
    <div>patient: {JSON.stringify(patientProfile['ramq'])}</div> 
    <h2>Questionnaire form ...</h2> 
    {IsEmpty(answers) && <LoadQuestionnaire/>} 
    {!IsEmpty(answers) && <DisplayQuestions/>} 
  </AnswersContext.Provider> 
} 


export function DisplayQuestions() { 
  const {GetCollections} = useContext(DaoContext); 
  const {answers, setAnswers} = useContext(AnswersContext); 
  const {pageIndex, setPageIndex, pages} = usePage(answers, 5); 
  const page = pages[pageIndex]; 
  //const {question, instructions, response} = GetQuestionInfos(answer, GetCollections()); 

  
  return <div> 
    <FormTitle {...{page}} /> 
    <Arrx {...{values:answers}} > 
      <Elements {...{indexes:page}}> 
        <DisplayQuestion/>
      </Elements> 
    </Arrx> 
    <Paging {...{pageIndex, setPageIndex, pages}} /> 
  </div> 
} 


function FormTitle({page}:{page:number[]}) { 
  const {GetIFields, GetEntry} = useContext(DaoContext); 
  const {answers, setAnswers} = useContext(AnswersContext); 
  const [index] = page; 
  const answer = answers[index] as IAnswer; 

  const [formField, labelsField] = GetIFields('questions', ['form', 'labels']); 
  const [titlesField] = GetIFields('forms', ['titles']); 

  const question = GetEntry('questions', answer.qid) as IQuestion; 
  const form = GetEntry('forms', question.form) as IForm; 

  return <h3>{form.titles[0]}</h3> 
} 

export function DisplayQuestion() { 
  const {GetIFields, GetEntry} = useContext(DaoContext); 
  const {answers, setAnswers} = useContext(AnswersContext); 
  const {index} = useContext(ElementContext); 
  const answer = answers[index] as IAnswer; 

  const [formField, labelsField] = GetIFields('questions', ['form', 'labels']); 
  const [titlesField] = GetIFields('forms', ['titles']); 
  const [responseTypeField] = GetIFields('responses', ['responseType']); 

  const question = GetEntry('questions', answer.qid) as IQuestion; 
  const form = GetEntry('forms', question.form) as IForm; 
  const response = GetEntry('responses', question.responseType) as IResponse; 
  
  return <div> 
    <div>{titlesField.label}: {form.titles[0]}</div> 
    <div>{labelsField.label} {question.labels[0]}</div> 
    <div>{responseTypeField.label} {JSON.stringify(response.responseType)}</div> 
  </div> 
} 



/*



function GetQuestionInfos({qid}:IAnswer, collections:ICollection[]) { 
  const {entries:qEntries, ifields:qFields} = collections.find( c => c.accessor==='questions') as ICollection; 
  const {entries:fEntries, ifields:fFields} = collections.find( c => c.accessor==='forms') as ICollection; 
  const {entries:iEntries, ifields:iFields} = collections.find( c => c.accessor==='instructions') as ICollection; 
  const {entries:rEntries, ifields:rFields} = collections.find( c => c.accessor==='responses') as ICollection; 
  
  const question = qEntries.find(q => q._id === qid) as IQuestion; 
  const form = fEntries.find(f => f._id === question?.form) as IForm; 
  const instructions = iEntries.filter(i => question?.instructions?.includes(i._id) ) as IInstruction[]; 
  const response = rEntries.find(r => question?.responseType === r._id ) as IResponse; 
  return {question, qFields, form, fFields, instructions, iFields, response, rFields}; 
} 
_id: Schema.Types.ObjectId, 
patientid: { 
  type: Schema.Types.ObjectId, 
  ref: 'patients', 
  label: 'Patient', 
}, 
questionid: { 
  type: Schema.Types.ObjectId, 
  ref: 'questions', 
  label: 'Question', 
}, 
answer: { 
  type: Number, 
  label: 'Answer', 
} 
*/
