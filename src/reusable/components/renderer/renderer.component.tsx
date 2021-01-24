import {IRenderers, IFieldToHandler} from '../../_rendering'; 
import {GetDefaultValueFromIField } from '../../_utils'; 



// Renderer =====================================
interface IRenderer { 
  value: any; 
  setValue: any; 
  ifield: IField; 
  mode: string; 
  renderers: IRenderers; 
} 
export function Renderer({setValue, ifield, mode, renderers, ...props}:IRenderer) { 
  const value = props.value ?? GetDefaultValueFromIField(ifield); // make sure value is never null 
  const handler = `${IFieldToHandler(ifield)}${mode}`; 
  const renderer = (renderers[handler] ?? renderers['Default'])(ifield); 
  return <span>{renderer(value, setValue)}</span> 
} 


function CellRenderer({renderers}:{renderers:IRenderer}) { 
  /*const {activeEntry, activeMode} = useContext(DaoContext); 
  const {datas} = useContext(TablrContext); 
  const {row, ifield} = useContext(CellContext); 
  const data = datas[row]; 
  const id = data ? data._id: ''; 

  const isEdit = activeEntry._id === id && (activeMode === EActionType.CREATE || activeMode === EActionType.UPDATE); 
  const value = isEdit ? activeEntry[ifield.accessor] : (data ? data[ifield.accessor] : GetDefaultValueFromIField(ifield)); */
  //const [value, setValue] = useState(props.value); 

  /*
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

  return <Renderer {...{value, setValue, ifield, mode, renderers}} /> 
  */ 

} 

/*

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
*/