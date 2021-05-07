export type Indexed<T> = { 
  [key: string]: T; 
} 

export function IndexDatasByKey<T>(indexKey:string, datas:T[]): Indexed<T> { 
  let indexedDatas = {} as {[key:string]: T}; 
  datas.forEach( (d:any) => indexedDatas[ d[indexKey] ] = d as T); 
  return indexedDatas; 
} 