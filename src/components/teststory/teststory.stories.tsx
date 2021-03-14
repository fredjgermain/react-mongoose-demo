import React from 'react'; 
import TestStory from './teststory.component'; 

export default { 
  title: 'form/TestStory', 
  component: TestStory 
} 

export const FirstTest = () => <TestStory {...{name:'fred', age:37}} /> 
export const SecondTest = () => <TestStory {...{name:'helene', age:73}} /> 
export const ThirdTest = () => <TestStory {...{name:'judith', age:35}} /> 

