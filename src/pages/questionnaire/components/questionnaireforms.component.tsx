import React, {useContext, useState} from 'react'; 
import {Objx, ObjxContext, Fields, FieldLabel, FieldContext, FieldValue} from '../../../reusable/objx/_objx'; 
import {Select, Options, InputArray} from '../../../reusable/input/_input'; 
import {CrudContext, PatientContext} from '../../patient/patient.page'; 
import {QuestionnaireContext} from '../questionnairepage.page'; 
import {Arrx, Element, ArrxContext, ElementContext} from '../../../reusable/arrx/_arrx'; 

interface IResponseType { 
  type: string; 
  enum?: any[]; 
  range?: any; 
} 

interface IAnswer { 
  pid:string; 
  qid:string; 
  optional:boolean; 
  labels: string[]; 
  responseType: IResponseType; 
  //date: ; 
  answer:any; 
} 

function useAnswers() { 
  const {crud} = useContext(CrudContext); 
  const {patient:{_id:pid}} = useContext(PatientContext); 
  const {questions, responses} = useContext(QuestionnaireContext); 
  
  const GetResponseType = (id:string) => { 
    const response = responses.entries.find(r=>r._id===id); 
    if(response) 
      return response['responseType']; 
    return 'no responses'; 
  }

  const blankAnswers:IAnswer[] = questions.entries.map( q => { 
    return {pid, 
      qid:q._id, 
      labels:q['labels'], 
      optional: q['optional'], 
      responseType: GetResponseType(q['responseType']), 
      answer:null, 
    } as IAnswer; 
  }); 
  const [answers, setAnswers] = useState<IAnswer[]>(blankAnswers); 
  return {answers, setAnswers}; 
} 

export const AnswersContext = React.createContext({} as {answers:any[], setAnswers:any}); 
// QUESTIONNAIRE ================================
export function Questionnaire() { 
  const {answers:values, setAnswers} = useAnswers(); 
  const setValues = (newValues:any) => {
    console.log(newValues);
    setAnswers(newValues); 
    return newValues; 
  } 

  return <div> 
    <Arrx {...{values, setValues}}> 
      <QLabel/> 
      <QValue/> 
      <QAnswer/> 
      <br/>
    </Arrx>
  </div> 
} 

function QLabel() { 
  const {value} = useContext(ElementContext); 
  const {labels, answer} = value as IAnswer; 

  return <span>{labels[0]}:</span> 
} 

function QValue() { 
  const {value, setValue, index} = useContext(ElementContext); 
  const {responseType, answer} = value as IAnswer; 

  return <span> 
    {JSON.stringify(answer)}; 
  </span> 
} 

function QAnswer() { 
  //console.log('QAnswer'); 
  const {value, setValue, index} = useContext(ElementContext); 
  const {responseType, answer} = value as IAnswer; 
  //console.log(answer); 

  //const [Answer, SetAnswer] = useState(answer); 

  const SetValue = (newAnswer:any) => { 
    const newValue = {...(value as IAnswer)}; 
    newValue.answer = newAnswer; 
    setValue(newValue); 
  } 
  
  if(responseType.enum) { 
    const options:IOption[] = responseType.enum.map( (o,i) => { 
      return {value:i, label:o} as IOption; 
    }); 
    return <Select {...{value:answer, setValue:SetValue}} > 
      <Options {...{options}}/> 
    </Select> 
  } 
  return <span>{JSON.stringify(answer)}</span> 
} 



/*
const AnswerContext = React.createContext({} as {answer:any, setAnswer:any}); 
function Answers({children}:React.PropsWithChildren<any>) { 
  const {answers, setAnswers} = useAnswers(); 

  return <AnswersContext.Provider value={{answers, setAnswers}}> 
    {answers.map(a => { 
      <AnswerContext.Provider value={} > 

      </AnswerContext.Provider> 
    })}
  </AnswersContext.Provider> 
} 


function DisplayQuestion({entry}:{entry:any}) { 
  const [obj, setObj] = useState(entry); 
  const {}
  const fieldsToDisplay = ['labels', 'responseType']; 
  const IFields = ifields.filter(f => fieldsToDisplay.includes(f.accessor)); 

  return <Objx {...{obj, setObj, ifields:IFields}}> 
    -------------------------------------
    <Fields> 
      <FieldLabel/> 
      <FieldValue /> 
      <br/> 
      ... 
    </Fields> 
    ------------------------------------- 
  </Objx> 
}

function QuestionLabel() { 
  const {obj, setObj, ifields} = useContext(ObjxContext); 
  const {value, setValue, ifield} = useContext(FieldContext); 

  return <div> 

  </div> 
} 

function ResponseChoice() { 
  const {obj, setObj, ifields} = useContext(ObjxContext); 
  const {value, setValue, ifield} = useContext(FieldContext); 



  return <div> 

  </div> 
}
*/