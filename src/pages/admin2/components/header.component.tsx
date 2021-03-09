import { useContext } from 'react'; 
import { AdminContext } from '../admin.page'; 


export function Header() { 
  const { columns } = useContext(AdminContext); 
  const cols = [...columns, 'btn']; 

  return <thead><tr> 
    {cols.map( c => <th key={c}>{c}</th> )}
  </tr></thead> 
} 