import {IDao} from '../hook/useCrud';

// Interface Render Func ========================
export type Renderer = (value:any, onSendValue:any) => any; 

// ColumnSetting ================================
export interface IColumnSetting { 
  ifield: IField; 
  order?: number; 
  sort?: number; 
  show?: boolean; 
  predicate?: (handle?:string) => boolean; 
  renderer: Renderer; 
}

export interface IColumnSettingRule { 
  ifieldPredicate: (ifield:IField) => boolean; 
  order?: number; 
  sort?: number; 
  show: boolean; 
  predicate?: (handle?:string) => boolean; 
  buildRenderer: (ifield:IField, foreign:IDao) => Renderer; 
} 

export function BuildColumnSetting(dao:IDao, ifields:IField[], icolrules:IColumnSettingRule[]) : IColumnSetting[] { 
  function byIField(ifield:IField):IColumnSetting[] { 
    const filtered = icolrules.filter( fr => fr.ifieldPredicate(ifield) ); 
    return filtered.map( fr => { 
      return { 
        ifield, 
        order: fr.order, 
        sort: fr.sort, 
        show: fr.show, 
        predicate: fr.predicate, 
        renderer: fr.buildRenderer(ifield, dao), 
      } as IColumnSetting; 
    }); 
  } 
  return (ifields.map( f => byIField(f) )).flat(); 
}