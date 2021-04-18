import {useState} from 'react'; 
import { Filter, Predicate } from '../../libs/_arrayutils'; 

type I<T> = {i:number, t:T} 

export function useSearch<T>(Ts:T[]) { 
  const [predicates, setPredicates] = useState([] as Predicate<T>[]); 
  const iTs = Ts?.map( (t,i) => {return {i,t}}); 
  const [results] = Filter(iTs, MapPredicates(predicates)); 
  return {results, setPredicates}; 
} 

function MapPredicates<T>(predicates:Predicate<T>[]):Predicate<I<T>>[] { 
  return predicates.map( predicate => { 
    return (it:I<T>, As:I<T>[], Bs:I<T>[], Cs:I<T>[]) => { 
      return predicate(it.t, As.map( a => a.t), Bs.map( b => b.t), Cs.map( c => c.t)); 
    } 
  }) 
} 
