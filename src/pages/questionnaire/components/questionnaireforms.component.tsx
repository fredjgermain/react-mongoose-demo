import React, {useContext, useState} from 'react'; 
import {Arrx, Elements, ArrxContext, ElementContext, ElementIndex} from '../../../reusable/components/arrx/_arrx'; 
import {Input, Select, Options, InputArray} from '../../../reusable/components/input/_input'; 
import {CrudContext, PatientContext} from '../../patient/patient.page'; 
import {QuestionnaireContext} from '../questionnairepage.page'; 

import {usePage, IPageHook} from '../../../reusable/hooks/usepage/usePage'; 



export function Questionnaire() { 
  const {answers, setAnswers} = useBlankForm(); 

  const {pageIndex, setPageIndex, pageIndexes, from, to} = usePage(answers, 5); 
  const indexes = answers.map((v,i) => i).filter((i) => i >=from && i<=to); 

  console.log(indexes);

  return <div> 
    <h3> 
      FORM ... 
    </h3> 
    <Arrx {...{values:answers}} > 
      <Elements {...{indexes}} > 
        <QuestionEdit {...{setValues:setAnswers}} /> 
      </Elements> 
    </Arrx> 
    <Paging {...{pageIndex, setPageIndex, pageIndexes, from, to}} />
  </div> 
} 

function QuestionEdit({setValues}:{setValues:any}) { 
  const {values} = useContext(ArrxContext); 
  const {index} = useContext(ElementContext); 
  const {labels, optional, answer, responseType} = (values[index] as IAnswer); 
  
  const [value, setValue] = useState(answer); 
  const {type, defaultValue} = {type:'number', defaultValue:0}; 

  const onEnterUp = () => { 
    setValues((prev:any) => { return value; }); 
  } 

  const options:IOption[] = responseType.enum ? 
    responseType.enum.map( (v,i) => {
      return {value:i, label:v}
    }) : 
    []; 

  const input = <Input {...{value, setValue, type, defaultValue, onEnterUp}} />
  const select = <Select {...{value, setValue, type, defaultValue, onEnterUp}} >
      <Options {...{options}} />
    </Select>

  return <div> 
    [<ElementIndex /><span>{labels[0]}: </span> ] 
    <span>{!responseType.enum ? input : select} </span> 
  </div> 
} 



function Paging({pageIndex, setPageIndex, pageIndexes}:IPageHook) { 
  return <div>
    {pageIndexes.map( (p, i) => { 
      return <button key={i} onClick={() => setPageIndex(i)} disabled={pageIndex===i} >
          {i+1}
        </button> 
    })} 
  </div>
}

//

/*function ResponseType() {

  <Input {...{value, setValue, type, defaultValue, onEnterUp}} />
}*/
/*

function QuestionnaireInput({setDatas}:{setDatas:React.Dispatch<any>}) { 
  const {values} = useContext(ArrxContext); 
  //const {type, defaultValue} = ifield; 

  const [value, setValue] = useState(_value); 
  
  const onEnterUp = () => { 
    setDatas((prev:any) => { 
      const newElement = {...prev[row]}; 
      newElement[ifield.accessor] = value; 
      prev[row] = newElement; 
      return [...prev]; 
    }); 
  }

  return <Input {...{value, setValue, type, defaultValue, onEnterUp}} /> 
} 


function Paging({pageIndex, setPageIndex, pageIndexes}:IPageHook) { 
  return <div>
    {pageIndexes.map( (p, i) => { 
      return <button key={i} onClick={() => setPageIndex(i)} disabled={pageIndex===i} >
          {i+1}
        </button> 
    })} 
  </div>
}
*/

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

function useBlankForm() { 
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


/*
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
  const {values} = useContext(ArrxContext); 
  const {index} = useContext(ElementContext); 
  const {labels} = values[index] as IAnswer; 

  return <span>{labels[0]}:</span> 
} 

function QValue() { 
  const {values} = useContext(ArrxContext); 
  const {index} = useContext(ElementContext); 
  const {answer} = values[index] as IAnswer; 
  return <span> {JSON.stringify(answer)}</span> 
} 

function QAnswer() { 
  //console.log('QAnswer'); 
  const {values} = useContext(ArrxContext); 
  const {index} = useContext(ElementContext); 
  const entry = values[index] as IAnswer 
  const {responseType, answer} = entry; 

  const [value, setValue] = useState(answer); 
  
  if(responseType.enum) { 
    const options:IOption[] = responseType.enum.map( (o,i) => { 
      return {value:i, label:o} as IOption; 
    }); 
    return <Select {...{value:answer, setValue}} > 
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