export interface IUseAdmin { 
  collectionAccessor: string; 
  SetCollectionAccessor: (newCollectionAccessor: string) => void; 
  GetCollectionOptions(): IOption[]; 
  GetCollection(): ICollection; 
} 