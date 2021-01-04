//import {IOption} from '../input/_input'; 
import {Field} from '../utils/_utils'; 


export interface ICrud { 
  Collection:(accessor:string) => Promise<IResponse>; 
  Create: (accessor:string, toCreate?:IEntry|IEntry[]) => Promise<IResponse>; 
  Read: (accessor:string, id?:string[]) => Promise<IResponse>; 
  Update: (accessor:string, toUpdate:IEntry|IEntry[]) => Promise<IResponse>; 
  Delete: (accessor:string, toDelete?:IEntry|IEntry[]) => Promise<IResponse>; 
} 

// DataAcessObject ==============================
export class DataAccessObject { 
  public collections:Collections = new Collections(); 
  public errors:any[] = [] as any[]; 

  private crud:ICrud = {} as ICrud; 
  constructor(crud:ICrud) { 
    this.crud = crud; 
  } 

  public GetCollections(accessors?:string[]):ICollection[] { 
    return this.collections.GetCollections(accessors); 
  } 

  // COLLECTION .................................
  public async Collections(accessors:string[]):Promise<IResponse[]> { 
    const responses = [] as IResponse[]; 
    for(let i=0; i<accessors.length; i++) { 
      const response = await this.crud.Collection(accessors[i]); 
      if(response.success) 
        this.collections.PushCollection(response.data); 
      else 
        this.errors.push(response.err); 
      responses.push(response); 
    } 
    return responses; 
  } 

  // CREATE .....................................  
  public async Create(accessor:string, entry:IEntry):Promise<IResponse> { 
    const [response] = (await this.crud.Create(accessor, [entry])).data as IResponse[]; 
    if(response.success) 
      this.collections.Create(accessor, response.data); 
    else 
      this.errors = [response.err]; 
    return response; 
  } 

  // READ .......................................
  public async Read(accessor:string, entry?:string[]):Promise<IEntry[]> { 
    //const results = (await crud.Read(accessor, [entry])).data as IResponse[]; 
    //const selectedCollection = this.GetCollection(accessor); 
    /*if(selectedCollection) 
      selectedCollection.Create(response.data); */ 
    return [] as IEntry[]; 
  } 

  // UPDATE .....................................
  public async Update(accessor:string, entry:IEntry):Promise<IResponse> { 
    const [response] = (await this.crud.Update(accessor, [entry])).data as IResponse[]; 
    if(response.success) 
      this.collections.Update(accessor, response.data); 
    else 
      this.errors = [response.err]; 
    return response; 
  } 

  // DELETE .....................................
  public async Delete(accessor:string, entry?:IEntry):Promise<IResponse> { 
    const [response] = (await this.crud.Delete(accessor, entry)).data as IResponse[]; 
    if(response.success) 
      this.collections.Delete(accessor, response.data); 
    else 
      this.errors = [response.err]; 
    return response; 
  } 

  // GET FOREIGN INFO -----------------------------
  public GetForeignValue(ifield:IField, id:string):any|undefined { 
    return this.collections.GetForeignValue(ifield, id); 
  } 

  public GetForeignOptions(ifield:IField):IOption[] { 
    return this.collections.GetForeignOptions(ifield); 
  } 

  public GetErrors () { 
    return this.errors; 
  } 
} 



// Collections ===================================
class Collections { 
  public collections:ICollection[] = [] as ICollection[]; 

  public GetCollections(accessors?:string[]):ICollection[] { 
    if(!accessors) 
      return this.collections; 
    return this.collections.filter(c=> accessors.includes(c.accessor)); 
  } 

  // replace former collection with the same accessor. 
  public PushCollection(collection:ICollection) { 
    const duplicateAt = this.collections.findIndex(c=>c.accessor===collection.accessor); 
    if(duplicateAt >=0) 
      this.collections.splice(duplicateAt, 1); 
    this.collections.push(collection); 
  } 

  public Create(accessor:string, entry:IEntry) { 
    const collection = this.collections.find(c=> c.accessor===accessor); 
    if(collection) 
      collection.entries.push(entry); 
    return !collection; 
  } 

  public Update(accessor:string, entry:IEntry) { 
    const collection = this.collections.find(c=> c.accessor===accessor); 
    if(!collection) 
      return false; 
    const index = collection.entries.findIndex( e => e._id === entry._id ); 
    if(index < 0) 
      return false; 
    collection.entries[index] = {...entry}; 
  } 

  public Delete(accessor:string, entry:IEntry) {
    const collection = this.collections.find(c => c.accessor === accessor); 
    if(!collection) 
      return false;
    const index = collection.entries.findIndex( e => e._id === entry._id ); 
    if(index < 0) 
      return false; 
      collection.entries.splice(index, 1); 
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

  private GetForeignElements(ifield:IField): [ICollection, IField] | [] { 
    if(!ifield.isModel) 
      return []; 
    const foreignCollection = this.collections.find(c => c.accessor === ifield.type); 
    const foreignField = foreignCollection? this.GetAbbreviateField(foreignCollection): null; 
    if(!foreignCollection || !foreignField) 
      return []; 
    return [foreignCollection, foreignField]; 
  } 
  
  private GetAbbreviateField(collection:ICollection):IField { 
    let foundAbvField = collection.ifields.find(c => c.options['abbreviate']); 
    if(foundAbvField) 
      return foundAbvField; 
    foundAbvField = collection.ifields.find( f => new Field(f).IsAbbreviable() ); 
    return foundAbvField as IField; 
  } 
}