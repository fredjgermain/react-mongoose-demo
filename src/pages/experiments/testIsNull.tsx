import {IsNull} from '../../reusable/utils/_utils'; 

export function TestIsNull () {
  const valueUndef = undefined; 
  const valueNull = null; 
  const value0 = 0; 
  const valueStringEmpty = ''; 
  const valueFalse = false; 

  return <div> 
    valueUndef: {valueUndef ?? 'is undefined'} 
    {JSON.stringify(IsNull(valueUndef))}
    <br/> 
    valueNull: {valueNull ?? 'is null'} 
    {JSON.stringify(IsNull(valueNull))}
    <br/> 
    value0: {value0 ?? 'is zero'} 
    {JSON.stringify(IsNull(value0))}
    <br/> 
    valueStringEmpty: {valueStringEmpty ?? 'is string empty'} 
    {JSON.stringify(IsNull(valueStringEmpty))}
    <br/> 
    valueFalse: {valueFalse ?? 'is false'} 
    {JSON.stringify(IsNull(valueFalse))}
    <br/> 
  </div> 
}
