import {IsEmpty, GetDefaultValueFromIField} from '../_utils'; 


export interface ICrud { 
  Collection:(accessor:string) => Promise<ICrudResponse>; 
  Create: (accessor:string, toCreate?:IEntry|IEntry[]) => Promise<ICrudResponse>; 
  Read: (accessor:string, id?:string[]) => Promise<ICrudResponse>; 
  Update: (accessor:string, toUpdate:IEntry|IEntry[]) => Promise<ICrudResponse>; 
  Delete: (accessor:string, toDelete?:IEntry|IEntry[]) => Promise<ICrudResponse>; 
} 

// DataAcessObject ==============================
export class DataAccessObject { 
  public collections:Collections = new Collections(); 

  private crud:ICrud = {} as ICrud; 
  
  constructor(crud:ICrud) { 
    this.crud = crud; 
  } 

  public GetCollections(accessors?:string[]):ICollection[] { 
    return this.collections.GetCollections(accessors); 
  } 

  public GetEntry(accessor:string, id?:string) { 
    return this.collections.GetEntry(accessor, id); 
  }

  public GetIFields(accessor:string, ifieldAccessors?:string[]):IField[] { 
    return this.collections.GetIFields(accessor, ifieldAccessors); 
  }


  // COLLECTION .................................
  public async Collections(accessors:string[]):Promise<ICrudResponse[]> { 
    const responses = [] as ICrudResponse[]; 
    for(let i=0; i<accessors.length; i++) { 
      const response = await this.Collection(accessors[i]); 
      responses.push(response); 
    } 
    return responses; 
  } 

  public async Collection(accessors:string):Promise<ICrudResponse> { 
    const response = await this.crud.Collection(accessors); 
    if(response.success) 
      this.collections.collections.push(response.data); 
    return response; 
  }

  // CREATE .....................................  
  public async Create(accessor:string, entry:IEntry):Promise<ICrudResponse> { 
    const [response] = (await this.crud.Create(accessor, entry)).data as ICrudResponse[]; 
    if(response.success) { 
      this.collections.Create(accessor, response.data); 
    }
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
  public async Update(accessor:string, entry:IEntry):Promise<ICrudResponse> { 
    const [response] = (await this.crud.Update(accessor, [entry])).data as ICrudResponse[]; 
    if(response.success) {
      this.collections.Update(accessor, response.data); 
    }
    return response; 
  } 

  // DELETE .....................................
  public async Delete(accessor:string, entry?:IEntry):Promise<ICrudResponse> { 
    const [response] = (await this.crud.Delete(accessor, entry)).data as ICrudResponse[]; 
    if(response.success) {
      this.collections.Delete(accessor, response.data); 
    }
    return response; 
  } 

  // GET FOREIGN ELEMENTS -----------------------------
  public GetForeignElements(ifield:IField) 
    : {foreignCollection:ICollection|undefined, abbrevField:IField|undefined} 
  { 
    return this.collections.GetForeignElements(ifield); 
  } 

  public GetForeignOptions(ifield:IField) : IOption[] { 
    const {foreignCollection, abbrevField} = this.GetForeignElements(ifield);
    if(!foreignCollection || !abbrevField)
      return [] as IOption[]; 
    return foreignCollection.entries?.map( e => { 
      return {value:e._id, label:e[abbrevField.accessor]} as IOption; 
    }); 
  } 
} 




// Collections ===================================
class Collections { 
  public collections:ICollection[] = [] as ICollection[]; 

  public GetEntry(accessor:string, id?:string):IEntry { 
    const [collection] = this.GetCollections([accessor]).map(c=>new Collection(c)); 
    return collection?.GetEntry(id) ?? {} as IEntry; 
  }

  public GetIFields(accessor:string, ifieldAccessors?:string[]) { 
    const [collection] = this.GetCollections([accessor]).map(c=>new Collection(c)); 
    return collection.GetIFields(ifieldAccessors); 
  }

  public GetCollections(accessors?:string[]) { 
    if(!accessors) 
      return this.collections; 
    return this.collections.filter(c=> accessors.includes(c.accessor)) ?? []; 
  } 

  public Create(accessor:string, entry:IEntry) { 
    const collection = new Collection(this.collections.find(c=> c.accessor===accessor)); 
    return collection.Create(entry); 
  } 

  public Read(accessor:string, ids?:string[]) { 
    const collection = new Collection(this.collections.find(c=> c.accessor===accessor)); 
    return collection.Read(ids); 
  } 

  public Update(accessor:string, entry:IEntry) { 
    const collection = new Collection(this.collections.find(c=> c.accessor===accessor)); 
    return collection.Update(entry); 
  } 

  public Delete(accessor:string, entry:IEntry) {
    const collection = new Collection(this.collections.find(c=> c.accessor===accessor)); 
    return collection.Delete(entry); 
  }
  
  // GET FOREIGN INFO -----------------------------
  public GetForeignElements(ifield:IField) 
      :{foreignCollection:ICollection|undefined, abbrevField:IField|undefined} { 
    const foreignCollection = this.collections.find(c => c.accessor === ifield.type); 
    const abbrevField = new Collection(foreignCollection).GetAbbrevField(); 
    return {foreignCollection, abbrevField}; 
  }
}



// COLLECTION ===================================
class Collection { 
  public collection:ICollection|undefined; 

  constructor(collection:ICollection|undefined) { 
    if(collection) 
      this.collection = collection; 
  }

  public GetIFields(ifieldAccessors?:string[]):IField[] { 
    if(!ifieldAccessors) 
      return this.collection?.ifields ?? [] as IField[]; 
    const ifields = [] as IField[]; 
    ifieldAccessors.forEach(accessor => { 
      const ifield = this.collection?.ifields.find(f=>f.accessor===accessor); 
      if(ifield) 
        ifields.push(ifield); 
    })
    return ifields; 
  } 

  public GetEmptyEntry() { 
    const ifields = this.collection?.ifields; 
    let entry = {} as IEntry; 
    ifields?.forEach( f => { 
      entry[f.accessor] = GetDefaultValueFromIField(f); 
    }); 
    return entry; 
  } 

  public GetEntry(id?:string):IEntry { 
    if(!this.collection) 
      return {} as IEntry; 
    if(!id) 
      return this.GetEmptyEntry(); 
    return this.collection?.entries.find(e=>e._id === id) ?? this.GetEmptyEntry(); 
  } 

  // Create -------------------------------------
  public Create(entry:IEntry) { 
    if(!this.collection?.entries) 
      return false; 
    this.collection.entries.push(entry); 
    return true;
  }

  // Read ---------------------------------------
  public Read(ids?:string[]) { 
    if(!this.collection?.entries) 
      return []; 
    if(IsEmpty(ids) ) 
      return this.collection.entries; 
    return this.collection.entries.filter(e => ids?.includes(e._id) ); 
  }

  // Update 
  public Update(entry:IEntry) { 
    if(!this.collection?.entries) 
      return false; 
    const index = this.collection.entries?.findIndex( e => e._id === entry._id ); 
    if(index < 0) 
      return false; 
    this.collection.entries[index] = {...entry}; 
    return true; 
  }

  // Delete
  public Delete(entry:IEntry) {
    if(!this.collection?.entries) 
      return false;
    const index = this.collection?.entries.findIndex( e => e._id === entry._id ); 
    if(index < 0) 
      return false; 
    this.collection?.entries.splice(index, 1); 
    return true; 
  }

  public GetAbbrevField():IField|undefined { 
    const abbrevField = this.collection?.ifields.find(f => f.isAbbrev) 
      //?? this.collection?.ifields.find( f => (f.type === 'string' || f.type === 'number') && !f.isArray); 
    return abbrevField; 
  } 
}


