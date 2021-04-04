import {IEditor} from '../../_input'; 


export function Radio({ifield, value, setValue, options}:IEditor) { 

  const onclick = (value:any) => console.log(value); 

  return <div> 
      {options?.map( o => { 
        const id = o.value; 
        const value = o.value; 
        return <div onClick={onclick}> 
            {o.label} 
          </div> 
      })} 
  </div> 
} 



/*
<input type="radio" id="male" name="gender" value="male">
<label for="male">Male</label><br>
<input type="radio" id="female" name="gender" value="female">
<label for="female">Female</label><br>
<input type="radio" id="other" name="gender" value="other">
<label for="other">Other</label>
*/