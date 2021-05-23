import { useContext } from 'react'; 
import { InputSorter } from '../../../libs/_inputs'; 
import { AdminContext } from '../hooks/admin.hook'; 

import { THeads, Cols, InlineEntry, InlineCell } 
  from '../../../libs/table/_table'; 


export function AdminHeader() { 
  const {cols} = useContext(AdminContext); 
  return <thead> 
    <tr><THeads {...{cols}} > 
      <AdminHeadCell/> 
    </THeads><th>Btn</th></tr> 
  </thead> 
}

export function AdminHeadCell() { 
  const {GetHeadArgs, sorters:{SetSorters}} = useContext(AdminContext); 
  const {ifield} = GetHeadArgs(); 
  return <span>{ifield.label}
    <InputSorter {...{type:ifield.type, SetSorters, keys:[ifield.accessor]}} />
  </span>
}

export function AdminInlineEntry() {
  const {GetCellArgs, cols} = useContext(AdminContext); 
  return <InlineEntry> 
    <Cols {...{cols}} > 
      <InlineCell {...{GetCellArgs}} /> 
    </Cols> 
  </InlineEntry> 
}