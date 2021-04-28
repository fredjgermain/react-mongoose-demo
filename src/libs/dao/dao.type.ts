

export interface ICrud { 
  Collections:(accessors?:string[]) => Promise<ICrudResponse[]>; 
  Create: (accessor:string, toCreate:IEntry[]) => Promise<ICrudResponse[]>; 
  Read: (accessor:string, id?:string[]) => Promise<ICrudResponse[]>; 
  Update: (accessor:string, toUpdate:IEntry[]) => Promise<ICrudResponse[]>; 
  Delete: (accessor:string, toDelete:IEntry[]) => Promise<ICrudResponse[]>; 
} 

export interface IDao { 
  GetICollections(accessors?: string[] | undefined): ICollection[] 
  GetIFields(accessor: string, fields?: string[] | undefined): IField[] 
  GetIEntries(accessor: string, ids?: string[] | undefined): IEntry[] 
  GetDefaultIEntry(accessor: string): IEntry
  GetForeignElements(ifield: IField): {
    foreignCollection: ICollection | undefined;
    abbrevField: IField | undefined;
  }
  GetIOptions(ifield: IField): IOption[]
  
  Validate(collection: string, value: {
    [key: string]: any; 
  }): boolean[]

  Collections(accessors?: string[] | undefined): Promise<ICrudResponse[]>

  CreateUpdate(accessor: string, entries: IEntry[], 
    predicate?: ((entry: IEntry) => boolean) | undefined
  ): Promise<ICrudResponse[]>
  Create(accessor: string, entries: IEntry[]): Promise<ICrudResponse[]>
  Read(accessor: string, ids?: string[] | undefined): Promise<ICrudResponse[]>
  Update(accessor: string, entries: IEntry[]): Promise<ICrudResponse[]>
  Delete(accessor: string, entries: IEntry[]): Promise<ICrudResponse[]>
}


export interface IDaoContexter { 
  crud: ICrud; 
  accessors: string[]; 
  loadingComponent?: JSX.Element; 
} 
