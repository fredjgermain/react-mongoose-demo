import React, {useContext, useState, useEffect} from 'react'; 
import { Arrx } from '../../../reusable/_arrx'; 
import {DaoContext} from '../../../reusable/_dao'; 
import {Input} from '../../../reusable/_input'; 
import {Objx, ObjxContext, Fields, Field, FieldContext, FieldLabel} from '../../../reusable/_objx'; 
import {Reader, Editor} from '../../../reusable/_input'; 
import {useUpdate} from '../../../reusable/_useupdate'; 


// RAMQ IDENTIFICATION ==========================
export function RamqIdentification() { 
  const {activeEntry, setActiveEntry, activeCollection} = useContext(DaoContext); 
  const {entries, ifields} = activeCollection; 
  const [value, setValue] = useState(''); 
  const [ided, setIded] = useState(false); 

  function IdentifyPatient(ramq:string) { 
    // test if Ramq respect RegEx 
    const found = entries.find( e => { 
      const e_ramq = (e['ramq'] as string);
      return e_ramq.toLowerCase() === ramq.toLowerCase(); 
    }); 
    if(found) 
      setActiveEntry(found); 
    setIded(true); 
  } 

  const onEnterUp = () => { 
    IdentifyPatient(value); 
  }; 

  // {ided && <PatientProfile {...{ramq:value}}/> } 
  
  return <div> 
    <Arrx {...{values:entries}} /> 
    <br/>
    {!ided && <div> Ramq : <Input {...{value, setValue, onEnterUp}} /></div> } 
    
  </div> 
} 




// FIELD RENDERER ===============================
/*export function FieldRenderer ({renderers}:{renderers:IRenderers}) { 
  const {activeEntry} = useContext(DaoContext); 
  const {ifield} = useContext(FieldContext); 
  const value = activeEntry[ifield.accessor]; 

  const handler = `${IFieldToHandler(ifield)}${'Edit'}`; 
  const renderer = (renderers[handler] ?? renderers['Default'])(ifield); 
  return <ValueRenderer {...{value, ifield, renderer}} /> 
} */


// Value Renderer =================================
function ValueRenderer({...props}:{value:any, ifield:IField, renderer:(value: any, setValue: any) => JSX.Element}) { 
  const {setActiveEntry} = useContext(DaoContext); 
  const ifield = props.ifield; 
  const [value, setValue] = useState(props.value); 

  // synchronize hook with "parent value". 
  useEffect(() => { 
    if(props.value !== value) 
      setValue(props.value) 
  }, [props.value]); 

  // synchronize activeEntry with any changes made to value. 
  useUpdate(() => {
    setActiveEntry((prev:any) => { 
      const copy = {...prev}; 
      copy[ifield.accessor] = value; 
      return copy; 
    })
  }, value); 
  
  return <span>{props.renderer(value, setValue)}</span> 
}