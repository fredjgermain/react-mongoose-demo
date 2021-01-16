import {useContext} from 'react'; 
import {CellContext} from '../../../reusable/components/tablr/_tablr'; 
import {ValueRenderer} from '../../../components/rendering/valuerenderer.component'; 
import {IRenderers} from '../../../components/rendering/renderers.utils'; 
import {ActiveContext} from './crudtablr.component'; 


// CELL RENDERER ================================ 
export function CellRenderer({renderers}:{renderers:IRenderers}) { 
  const {value, row, ifield} = useContext(CellContext); 
  const {active, SetData} = useContext(ActiveContext); 
  const isActive = active.row === row; 
  const isEdit = (active.mode === 'create' || active.mode === 'update') && isActive; 
  const _value = isActive ? active.data[ifield.accessor]: value; 

  return <ValueRenderer {...{value:_value, data:active.data, setData:SetData, isEdit, ifield, renderers}} />
}