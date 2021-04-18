import {IsEmpty, GetDefaultIEntry} from '../../_utils'; 


// COLLECTION ===================================
export class Collection { 
  public collection:ICollection = {} as ICollection; 

  constructor(collection:ICollection) { 
    if(collection) 
      this.collection = collection; 
  }

  // GET IFIELDS --------------------------------
  public GetIFields(ifieldAccessors?:string[]):IField[] { 
    if(!ifieldAccessors) 
      return this.collection.ifields ?? [] as IField[]; 
    const ifields = [] as IField[]; 
    ifieldAccessors.forEach(accessor => { 
      const ifield = this.collection.ifields.find(f=>f.accessor===accessor); 
      if(ifield) 
        ifields.push(ifield); 
    })
    return ifields; 
  } 

  // GET Default IEntry -----------------------------------
  public GetDefaultIEntry() { 
    return GetDefaultIEntry(this.collection.ifields); 
  } 

  // DOES NOT RETURN EMPTY ENTRY ANYMORE ... 
  // Same as READ ??? 
  // GET ENTRIES ----------------------------------------
  public GetIEntries(ids?:string[]):IEntry[] { 
    const entries = [] as IEntry[]; 
    ids?.forEach( id => { 
      const entry = this.collection?.entries.find(e=>e._id===id); 
      if(entry) 
        entries.push(entry); 
    }); 
    return entries; 
  } 

  // Find Entry index ---------------------------
  public FindIndex(entry:IEntry):number { 
    return this.collection.entries?.findIndex( e => e._id === entry._id) ?? -1; 
  }

  // Create -------------------------------------
  public Create(entries:IEntry[]) { 
    if(!this.collection?.entries) 
      return; 
    this.collection.entries = [...this.collection.entries, ...entries]; 
  } 

  // Read ---------------------------------------
  public Read(ids?:string[]):IEntry[] { 
    if(!this.collection?.entries) 
      return [] as IEntry[]; 
    if(IsEmpty(ids)) 
      return this.collection.entries; 
    return this.collection.entries.filter(e => ids?.includes(e._id) ) ?? [] as IEntry[]; 
  }

  // Update -------------------------------------
  public Update(entries:IEntry[]) { 
    entries?.forEach( e => { 
      const index = this.FindIndex(e); 
      if(index >= 0) 
        this.collection.entries[index] = {...e}; 
    }) 
  } 

  // Delete -------------------------------------
  public Delete(entries:IEntry[]) { 
    entries?.forEach( e => { 
      const index = this.FindIndex(e); 
      if(index >= 0) 
        this.collection.entries.splice(index,1); 
    })
  }
}
