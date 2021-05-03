import { useContext } from 'react'; 
import { Editor } from '../../../libs/editor_reader/_editor_reader'; 
import { AdminContext } from '../admin.hook'; 


// Collection Selector ====================================
export function CollectionSelector() { 
  const {collectionAccessor, SetCollectionAccessor, GetCollectionOptions} = useContext(AdminContext); 
  const value = collectionAccessor; 
  const editValue = (newValue:string) => SetCollectionAccessor(newValue); 
  const ifield:IField = {accessor:'', label:'', defaultValue:'', type:'string'}; 
  const options = GetCollectionOptions(); 

  return <Editor {...{value, editValue, ifield, options}} />
}