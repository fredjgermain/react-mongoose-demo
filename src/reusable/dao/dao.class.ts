import {Pick, Filter} from '../_arrayutils'; 
import { IsEmpty } from '../_utils';
import {Collection} from './collection.class'; 

export interface ICrud { 
  Collections:(accessors?:string[]) => Promise<ICrudResponse[]>; 
  Create: (accessor:string, toCreate:IEntry[]) => Promise<ICrudResponse[]>; 
  Read: (accessor:string, id?:string[]) => Promise<ICrudResponse[]>; 
  Update: (accessor:string, toUpdate:IEntry[]) => Promise<ICrudResponse[]>; 
  Delete: (accessor:string, toDelete:IEntry[]) => Promise<ICrudResponse[]>; 
} 


// DAO #############################################
export class DAO { 
  public collections:ICollection[] = [] as ICollection[]; 

  private crud:ICrud = {} as ICrud; 

  constructor(crud:ICrud) { 
    this.crud = crud; 
  } 

  // Get ICollections ----------------------------- 
  public GetICollections(accessors?:string[]):ICollection[] { 
    if(!accessors) 
      return this.collections; 
    const compare = (t:ICollection, accessor:string) => {return t.accessor === accessor}; 
    return Pick(this.collections, accessors, compare); 
  } 

  // Get IFields -----------------------------------
  public GetIFields(accessor:string, fields?:string[]):IField[] { 
    const [collection] = this.GetICollections([accessor]); 
    if(!fields) 
      return collection?.ifields ?? []; 
    const compare = (f:IField, accessor:string) => {return f.accessor === accessor}; 
    return Pick(collection?.ifields, fields, compare); 
  }

  // Get Entries --------------------------------------
  public GetIEntries(accessor:string, ids?:string[]):IEntry[] { 
    const [collection] = this.GetICollections([accessor]); 
    if(!ids)
      return collection?.entries ?? []; 
    const compare = (e:IEntry, id:string) => {return e._id === id}; 
    return Pick(collection?.entries, ids, compare); 
  }

  // Get Default IEntry ----------------------------------
  public GetDefaultIEntry(accessor:string):IEntry { 
    const [collection] = this.GetICollections([accessor]); 
    return new Collection(collection).GetDefaultIEntry(); 
  } 
  
  // GET FOREIGN ELEMENTS -----------------------------
  public GetForeignElements(ifield:IField) 
    : {foreignCollection:ICollection|undefined, abbrevField:IField|undefined} 
  { 
    const foreignCollection = this.collections.find(c => c.accessor === ifield.type); 
    const abbrevField = foreignCollection?.ifields.find(f=>f.isAbbrev); 
    return {foreignCollection, abbrevField}; 
  } 

  // Get Options ----------------------------------------
  public GetIOptions(ifield:IField):IOption[] { 
    if(ifield.isEnum)
      return ifield.enums?.map(e => {return {value:e, label:e}}) ?? [] as IOption[];  
    if(!ifield.isModel) 
      return [] as IOption[]; 
    const {foreignCollection, abbrevField} = this.GetForeignElements(ifield); 
    if(!foreignCollection || !abbrevField) 
      return [] as IOption[]; 
    return foreignCollection.entries?.map( e => { 
      return {value:e._id, label:e[abbrevField.accessor]} as IOption; 
    }); 
  } 

  // COLLECTIONS -------------------------------------------
  public async Collections(accessors?:string[]):Promise<ICrudResponse[]> { 
    const responses = (await this.crud.Collections(accessors)) as ICrudResponse[]; 
    const icollections = responses.filter(r => r.success).map(r => r.data as ICollection); 
    this.PushUpdateCollection(icollections); 
    return responses; 
  } 

  private PushUpdateCollection(icollections:ICollection[]) { 
    icollections.forEach( newCol => { 
      const index = this.collections.findIndex(col => col.accessor === newCol.accessor); 
      if(index >=0) 
        this.collections[index] = newCol; 
      else 
        this.collections.push(newCol); 
    }) 
  } 


  /*Create Or Update ---------------------------------- 
  Create entries satisfying a given predicate. 
  Or else update entries. 
  */
  public async CreateUpdate(accessor:string, entries:IEntry[], predicate?:(entry:IEntry)=>boolean):Promise<ICrudResponse[]> { 
    const defaultPredicate = (entry:IEntry):boolean => IsEmpty(entry._id); 
    const {inclusion:toCreate, exclusion:toUpdate} = Filter(entries, predicate ?? defaultPredicate); 
    const createResponses = !IsEmpty(toCreate) ? await this.Create(accessor, toCreate) : []; 
    const updateResponses = !IsEmpty(toUpdate) ? await this.Update(accessor, toUpdate) : []; 
    return [...createResponses, ...updateResponses]; 
  } 

  /* Create -------------------------------------------
  Local and remote Collection might become inconsistent if 'collection' is not found. 
  */
  public async Create(accessor:string, entries:IEntry[]):Promise<ICrudResponse[]> { 
    const [collection] = this.GetICollections([accessor]); 
    // risk inconsistencies 
    const responses = (await this.crud.Create(accessor, entries)) as ICrudResponse[]; 
    const created = responses.filter(r=>r.success).map(r=>r.data as IEntry); 
    new Collection(collection).Create(created); 
    return responses; 
  } 

  /* Read -------------------------------------------
  Local and remote Collection might become inconsistent if 'collection' is not found. 
  Create/Update read data to local. 
  */
  public async Read(accessor:string, ids?:string[]):Promise<ICrudResponse[]> { 
    const [collection] = this.GetICollections([accessor]); 
    // risk inconsistencies 
    const responses = (await this.crud.Read(accessor, ids)) as ICrudResponse[]; 
    const read = responses.filter(r=>r.success).map(r=>r.data as IEntry); 
    return responses; 
  } 

  /* Update -------------------------------------------
  Local and remote Collection might become inconsistent if 'collection' is not found. 
  */
  public async Update(accessor:string, entries:IEntry[]):Promise<ICrudResponse[]> { 
    const [collection] = this.GetICollections([accessor]); 
    // risk inconsistencies 
    const responses = (await this.crud.Update(accessor, entries)) as ICrudResponse[]; 
    const updated = responses.filter(r=>r.success).map(r=>r.data as IEntry); 
    new Collection(collection).Update(updated); 
    return responses; 
  } 

  /* Delete -------------------------------------------
  Local and remote Collection might become inconsistent if 'collection' is not found. 
  */
  public async Delete(accessor:string, entries:IEntry[]):Promise<ICrudResponse[]> { 
    const [collection] = this.GetICollections([accessor]); 
    // risk inconsistencies 
    const responses = (await this.crud.Delete(accessor, entries)) as ICrudResponse[]; 
    const deleted = responses.filter(r=>r.success).map(r=>r.data as IEntry); 
    new Collection(collection).Delete(deleted); 
    return responses; 
  } 
} 
