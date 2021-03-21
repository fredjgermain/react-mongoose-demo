import { useContext } from 'react'; 
import { Editor } from '../../../components/editor_reader/_editor_reader'; 
import { AdminContext } from '../admin.page'; 


// Collection Selector ====================================
export function CollectionSelector() { 
  const {GetEditState, SetEditState, GetCollectionOptions} = useContext(AdminContext); 
  const value = GetEditState(['collection']); 
  const editValue = (newValue:string) => SetEditState(newValue, ['collection']); 
  const ifield:IField = {accessor:'', label:'', defaultValue:'', type:'string'}; 
  const options = GetCollectionOptions(); 

  return <Editor {...{value, editValue, ifield, options}} />
}