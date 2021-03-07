import { useContext } from 'react'; 
import { Objx, Fields, FieldLabel } from '../../../reusable/_objx'; 
import { AdminContext } from '../admin.page'; 


export function Header() { 
  const { GetFields } = useContext(AdminContext); 
  const ifields = GetFields(); 
  const btn:IField = {accessor:'', defaultValue:'', label:'btn', type:''}; 

  return <thead><tr> 
    <Objx {...{value:{}, ifields:[...ifields, btn]}}> 
      <Fields><th><FieldLabel/></th></Fields> 
    </Objx> 
  </tr></thead> 
} 