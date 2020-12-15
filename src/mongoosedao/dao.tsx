//import {LoadCollections} from './mongooseparser'; 
import {crud} from './crudaxios'; 
import Collection from './collection'; 
import Field from './field'; 

export {Collection, Field}; 


// DataAcessObject ==============================
export default class DataAccessObject { 
  public iCollections:ICollection[] = []; 
  //public response?:IResponse = {} as IResponse; 

  // Load Collections
  /*public async LoadCollections(collectionAccessors:string[]) { 
    const loadedCollections = await LoadCollections(collectionAccessors); 
    this.collections = loadedCollections; 
  } */ 

  public GetEmptyEntry(icollection:ICollection):IEntry { 
    return new Collection(icollection).GetDefaultEntry(); 
  } 

  public GetICollection(accessor:string):ICollection|void { 
    if(!accessor) 
      return; 
    return this.iCollections.find( ic => ic.accessor === accessor); 
  } 

  private GetCollection(accessor:string):Collection|void { 
    const iCollection = this.GetICollection(accessor); 
    if(!iCollection) 
      return; 
    return new Collection(iCollection); 
  } 

  // CREATE .....................................  
  public async Create(accessor:string, entry:IEntry):Promise<IResponse> { 
    const [response] = (await crud.Create(accessor, [entry])).data as IResponse[]; 
    const selectedCollection = this.GetCollection(accessor); 
    if(response.success && selectedCollection) 
      selectedCollection.Create(response.data); 
    return response; 
  } 

  public async Read(accessor:string, entry?:IEntry):Promise<IEntry[]> { 
    //const results = (await crud.Read(accessor, [entry])).data as IResponse[]; 
    //const selectedCollection = this.GetCollection(accessor); 
    /*if(selectedCollection) 
      selectedCollection.Create(response.data); */
    return [] as IEntry[]; 
  } 

  // UPDATE .....................................
  public async Update(accessor:string, entry:IEntry):Promise<IResponse> {     
    const [response] = (await crud.Update(accessor, [entry])).data as IResponse[]; 
    const selectedCollection = this.GetCollection(accessor); 
    if(response.success && selectedCollection) 
      selectedCollection.Update(entry); 
    return response; 
  } 

  // DELETE .....................................
  public async Delete(accessor:string, entry:IEntry):Promise<IResponse> { 
    const [response] = (await crud.Delete(accessor, [entry])).data as IResponse[]; 
    const selectedCollection = this.GetCollection(accessor); 
    if(response.success && selectedCollection) 
      selectedCollection.Delete(entry); 
    return response; 
  } 

  // GET FOREIGN INFO -----------------------------
  public GetForeignValue(ifield:IField, id:string):any|undefined { 
    const [foreignCollection, foreignField] = this.GetForeignElements(ifield); 
    const foreignEntry = foreignCollection?.entries.find( e => e._id === id); 
    if(foreignEntry && foreignField) 
      return foreignEntry[foreignField.accessor]; 
    return; 
  }

  public GetForeignOptions(ifield:IField):IOption[] { 
    const [foreignCollection, foreignField] = this.GetForeignElements(ifield); 
    if(!foreignCollection || !foreignField) 
      return [] as IOption[]; 
    return foreignCollection.entries?.map( e => { 
      return {value:e._id, label:e[foreignField.accessor]} as IOption; 
    }); 
  } 

  public GetForeignElements(ifield:IField): [ICollection, IField] | [] { 
    const foreignCollection = this.GetCollection(ifield.modeltype); 
    const foreignField = foreignCollection? foreignCollection.GetAbbreviateField(): null; 
    if(!foreignCollection || !foreignField) 
      return []; 
    return [foreignCollection.icollection, foreignField]; 
  } 

} 
