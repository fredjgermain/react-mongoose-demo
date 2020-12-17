import React, {useState, useMemo} from 'react'; 
import {Package_MongooseDao, Package_CustomHooks, Package_Input} from '../../custompackages'; 
import AdminTable from './admintable'; 
//import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"; 


interface IAdminContext { 
  dao: Package_MongooseDao.Dao; 
  activeCollection: ICollection; 
} 
export const AdminContext = React.createContext({} as IAdminContext); 
// ADMIN SECTION =================================
export default function AdminSection() { 
  const dao = useMemo(() => new Package_MongooseDao.Dao(), []); 
  const [selected, setSelected] = useState<string>(''); 
  
  const {status, Reload} = Package_CustomHooks.useLoad(async () => { 
    const loadedCollection = await Package_MongooseDao.LoadMongooseCollections(['responses', 'questions', 'instructions', 'forms']); 
    dao.iCollections = loadedCollection; 
  }); 
  // RENDER ------------------------------------- 
  if(!status.success) 
    return <LoadingBtn/>; 

  // options 
  const options:IOption[] = dao.iCollections.map( c => { 
    return {value: c.accessor, label: c.label} 
  }); 

  // Context 
  const adminContext = {dao:dao, activeCollection:dao.GetICollection(selected)} as IAdminContext; 

  // render 
  const adminTable = selected ? <AdminTable /> : <p>Please choose a collection from the selector above.</p>; 
  return <AdminContext.Provider value={adminContext}> 
    <p>this is the correct version ... </p>
    <h2>Admin Section</h2> 
    <p>Choose a collection to create/read/update/delete items from it.</p> 
    <Package_Input.InputSelect value={selected} onSendValue={setSelected} options={options} /> 
    {adminTable} 
  </AdminContext.Provider> 
} 


function LoadingBtn() { 
  return <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      </link>
      <button className="buttonload">
      <i className="fa fa-spinner fa-spin"></i>Loading
    </button>
  </div>
}