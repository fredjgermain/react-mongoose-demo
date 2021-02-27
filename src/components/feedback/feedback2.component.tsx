import { useState } from 'react'; 

export const feedback = { 
  value: () => [] as ICrudResponse[], 
  setValue:(responses:ICrudResponse[]) => console.log(responses) 
}; 

export function Feedback() { 
  const [value, setValue] = useState([] as ICrudResponse[]); 
  feedback.value = () => value; 
  feedback.setValue = (responses:ICrudResponse[]) => setValue(responses); 

  return <div> 
    Feedback !! : {JSON.stringify(value)} <br/> 
  </div> 
} 
