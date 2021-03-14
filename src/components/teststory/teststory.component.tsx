

export default function TestStory({...props}:{name:string, age:number}) { 
  const { name = 'No name', age = 0 } = props; 

  return <div>{name} is {age} years old</div> 
} 