

interface IPatient extends IEntry {
  
}

interface IAnswer extends IEntry { 
  pid: string; 
  qid: string; 
  answer: number; 
} 

interface IForm extends IEntry { 
  fId: string; 
  titles: string[]; 
} 

interface IInstruction extends IEntry { 
  iId: string; 
  labels: string[]; 
} 

interface IResponse extends IEntry { 
  rId: string; 
  responseType: any; 
} 

interface IQuestion extends IEntry{ 
  form: string; 
  instructions: string[]; 
  labels: string[]; 
  optional: boolean; 
  order: number; 
  qId: string; 
  responseType: string; 
  section: string; 
}
