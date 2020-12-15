import { reverse } from 'dns';
import React from 'react'; 

// #1 How do you find the missing number in a given integer array of 1 to 100? 

function Make_1to100_1missing() { 
  const numbers = []; 
  for(let i=1; i<=100; i++) 
    numbers.push(i); 
  // removeOneRandomNumber 
  const toRemove = Randomer(99); 
  numbers.splice(toRemove,1); 
  return numbers; 
} 

/*const array1Missing = Make_1to100_1missing(); 
const found = array1Missing.findIndex( (v,i) => i != v-1)+1; 
console.log([found, array1Missing]); */


//#2 How do you find the duplicate number on a given integer array?
function FindDuplicate() { 
  const numbers = RandomerArray(100, 50); 
  const duplicates:number[] = []; 
  numbers.forEach( (v,i) => { 
    const rest = numbers.slice(i+1); 
    if(rest.includes(v)) 
      duplicates.push(v); 
  }) 
  return duplicates; 
}
//console.log(FindDuplicate()); 


// #3 How do you find the largest and smallest number in an unsorted integer array?
function FindMinMax() { 
  const numbers = RandomerArray(20, 100); 
  let min = numbers[0]; 
  let max = numbers[0]; 

  numbers.forEach( (v) => {
    if(min > v) 
      min = v; 
    if(max < v)
      max = v; 
  }) 
  return [min, max]; 
} 
//console.log(FindMinMax()); 


// #4 How do you find all pairs of an integer array whose sum is equal to a given number?
function FindPairEqualTo(toEqual:number) { 
  const numbers = RandomerArray(20, 20); 
  const pairs:number[][] = []; 
  numbers.forEach( (v,i) => { 
    const rest = numbers.slice(i+1); 
    const found = numbers.find( r => { 
      return v+r === toEqual; 
    }); 
    if(found)
      pairs.push([v,found]); 
  }) 
  return pairs; 
} 
//console.log(FindPairEqualTo(10)); 



// #5 How do you find duplicate numbers in an array if it contains multiple duplicates?
// see #2


// #6How are duplicates removed from a given array in Java?
function RemoveDuplicates(array:number[]) { 
  const unics:number[] = []; 
  array.forEach( v => { 
    if(!unics.includes(v)) 
      unics.push(v); 
  }); 
  return unics; 
}
//console.log(RemoveDuplicates(RandomerArray(50,50)));


// #7 How is an integer array sorted in place using the quicksort algorithm?


// #8 How do you reverse an array in place in Java?
function ReverseArray(array:any[]) { 
  const reversed = []; 
  for(let i=array.length-1; i>=0; i--) 
    reversed.push(array[i]); 
  return reversed; 
} 

const q8Array = RandomerArray(10,10); 
/*console.log(q8Array);
console.log(ReverseArray(q8Array));*/


// #9 How are duplicates removed from an array without using any library?
// see #6



// LINKED LIST ----------------------------------
// #10 How do you find the middle element of a singly linked list in one pass? 
// #11 How do you check if a given linked list contains a cycle? How do you find the starting node of the cycle? 

// #12 How do you reverse a linked list?
// #13 How do you reverse a singly linked list without recursion?

// #14 How are duplicate nodes removed in an unsorted linked list?
// #15 How do you find the length of a singly linked list?
// #16 How do you find the third node from the end in a singly linked list?
// #17 How do you find the sum of two linked lists using Stack?
// -----------------------------------------------


// STRINGS --------------------------------------
// #1 How do you check if two strings are anagrams of each other?
function StringToChars(str:string):string[] { 
  const chars:string[] = []; 
  for(let i =0; i < str.length;i++) 
    chars.push(str[i]); 
  return chars; 
}

function AreAnagrams(stra:string, strb:string) { 
  if(stra.length != strb.length)
    return false;

  const charsA:string[] = StringToChars(stra); 
  const charsB:string[] = StringToChars(strb); 

  for(let i=0; i<stra.length; i++) { 
    const c = charsA.pop(); 
    const index = charsB.findIndex( e => e === c); 
    if(index < 0) 
      return false; 
    charsB.splice(index,1); 
  } 
  return true; 
}
//console.log(AreAnagrams('capo', 'asda')); 


// #2 How do you print the first non-repeated character from a string?
function FindNonDuplicateInString(str:string) { 
  const nonDuplicates:string[] = []; 
  const chars = StringToChars(str); 
  chars.forEach( (c,i) => { 
    const before = chars.slice(0,i); 
    const after = chars.slice(i+1); 
    if(!before.includes(c) && !after.includes(c)) 
      nonDuplicates.push(c); 
  }) 
  return nonDuplicates; 
}
//console.log(FindNonDuplicateInString('asdasddzfgfgrt'))


// #3 How can a given string be reversed using recursion?
function ReverseString(str:string):string { 
  const char = str.substring(0,1); 
  const rest = str.substring(1); 
  /*if(!char || char.length === 0) 
    return ''; */
  if(!rest || rest.length === 0) 
    return char ?? ''; 
  return ReverseString(rest) + char; 
}
//console.log(ReverseString('abcdefghijk'));


// #4 How do you check if a string contains only digits?
// #5 How do you check if a string contains only digits?
function CountDigits(str:string):number { 
  const digits = StringToChars('0123456789'); 
  let nDigits = 0; 

  for(let i=0; i<str.length; i++) { 
    if(digits.includes(str[i])) 
      nDigits+=1; 
  }
  return nDigits; 
}

/*console.log(CountDigits('asdas6') >= 2); 
console.log(CountDigits('asdas66666') === 5); */


// # 6 How are duplicate characters found in a string?
function FindDuplicateChars(str:string) { 
  const chars = StringToChars(str); 
  const duplicates:string[] = []; 
  
  chars.forEach( (v,i) => { 
    const rest = chars.slice(i+1); 
    if(rest.includes(v) && !duplicates.includes(v)) 
      duplicates.push(v); 
  }) 
  return duplicates; 
}
//console.log(FindDuplicateChars('asdasdfdgtzsgdfoger'));


// #7 How do you count a number of vowels and consonants in a given string?
function CountVowels(str:string) {
  const vowels = StringToChars('aeiouy'); 
  let nVowels = 0; 

  for(let i=0; i<str.length; i++) { 
    if(vowels.includes(str[i])) 
      nVowels+=1; 
  }
  return nVowels; 
}
//console.log(CountVowels('aeiouyjdjd'));

// #8 How do you count the occurrence of a given character in a string?
function CountChar(str:string, charToFind:string) {
  const chars = StringToChars(str); 
  return chars.filter( c => c === charToFind).length ?? 0;
}
//console.log(CountChar('asdfsdgaaresaa', 'a'));


// #9 How do you reverse words in a given sentence without using any library method?
function ParseWords(str:string):string[] {
  return str.split(' ');
}

function ReverseWords(str:string) { 
  const words = ParseWords(str); 
  const reversed:string[] = []; 
  for(let i=words.length-1; i>=0; i--) 
    reversed.push(words[i]);
  return reversed;
} 
//console.log(ReverseWords('mot1 mot2 mot3'));

// #10 How do you check if two strings are a rotation of each other?
function IsReversed(strA:string, strB:string) { 
  const strBReversed = ReverseString(strB); 
  return strA === strBReversed; 
}
console.log(IsReversed('abcdef', 'fedcba')); 

// #11 How do you check if a given string is a palindrome?
// See below ... 

/*
How do you find all permutations of a string?




How is a binary search tree implemented?
How do you perform preorder traversal in a given binary tree?
How do you traverse a given binary tree in preorder without recursion?
How do you perform an inorder traversal in a given binary tree?
How do you print all nodes of a given binary tree using inorder traversal without recursion?
How do you implement a postorder traversal algorithm?
How do you traverse a binary tree in postorder traversal without recursion?
How are all leaves of a binary search tree printed?
How do you count a number of leaf nodes in a given binary tree?
How do you perform a binary search in a given array?

How is a bubble sort algorithm implemented?
How is an iterative quicksort algorithm implemented?
How do you implement an insertion sort algorithm?
How is a merge sort algorithm implemented?
How do you implement a bucket sort algorithm?
How do you implement a counting sort algorithm?
How is a radix sort algorithm implemented?
How do you swap two numbers without using the third variable?
How do you check if two rectangles overlap with each other?
How do you design a vending machine?
*/

const string0 = 'asdsa'; 





// SORT NUMBERS -------------------------------------4
function Randomer(factor:number) { 
  return Math.floor(Math.random() * factor); 
} 

function RandomerArray(n:number, factor:number) {
  const randoms = []; 
  while(n-- > 0) 
    randoms.push(Randomer(factor)); 
  return randoms; 
}

const array = RandomerArray(100, 100); 
let iteration = 0; 

function CutMidWay(array:any[]):[number[],number[]] { 
  if(array.length === 0) 
    return [[],[]]; 
  if(array.length === 1) 
    return [array,[]]; 
  const midIndex = Math.floor((array.length)/2); 
  const firstHalf = array.slice(0,midIndex); 
  const secondHalf = array.slice(midIndex); 
  return [firstHalf, secondHalf]; 
} 

function Last(array:any[]):any { 
  return array[array.length-1]; 
} 

function Sorting(toSort:number, sorted:number[]):number[] { 
  const [firstHalf, secondHalf] = CutMidWay(sorted); 
  iteration++; 
  //console.log([toSort, sorted]); 

  if(firstHalf.length===0) 
    return [toSort]; 
  if(toSort <= firstHalf[0]) 
    return [toSort, ...firstHalf, ...secondHalf]; 
  if(secondHalf.length===0) 
    return [...firstHalf, toSort]; 
  if(firstHalf[0] < toSort && toSort < secondHalf[0]) 
    return [...Sorting(toSort, firstHalf), ...secondHalf]; 
  if(toSort === secondHalf[0]) 
    return [...firstHalf, toSort, ...secondHalf]; 
  if(toSort >= Last(secondHalf)) 
    return [...firstHalf, ...secondHalf, toSort]; 
  return [...firstHalf, ...Sorting(toSort, secondHalf)]; 
}

/*const [first, ...rest] = array; 
console.log(array); 
console.log( Sortin(first, rest) ); */



function Sort(toSort:number[], sorted:number[]=[]):number[] { 
  if(toSort.length===0) 
    return sorted; 
  const [first, ...rest] = toSort; 
  if(rest.length===0) 
    return Sorting(first, sorted); 
  return Sort(rest, Sorting(first, sorted)); 
} 

/*function Sort(toSort:number[], sorted:number[]=[]):number[] { 
  if(toSort.length===0) 
    return sorted; 
  const [first, ...rest] = toSort; 
  if(rest.length===0) 
    return [first, ...sorted]; 
  return Sort(rest, [first, ...sorted]); 
} */

/*console.log(array); 
console.log(Sort(array, [])); 
console.log(iteration/array.length); */

/*
// O(n)
function Sort(unsorted:number[]):number[] { 
  const sorted:number[] = []; 
  

  /*for(let i=0, j=unsorted.length, k=Math.floor(j/2); i <= j; i++, --j) { 
    console.log(k); 
    const a = unsorted[i] < unsorted[j]? [unsorted[i], unsorted[j]]: [unsorted[j], unsorted[i]]; 
    sorted.push(a[0]); 
  } 
  console.log(sorted); 
  return [];
}*/
//console.log(Sort());




// REMOVE WHITE SPACE -------------------------------
// O(n)
function RmWhiteSpace(str:string):string { 
  let cleanStr = ''; 
  for(let i = 0; i<str.length; i++) { 
    if(str[i] != ' ') 
      cleanStr += str[i]; 
  } 
  return cleanStr; 
}


// PALINDROME -----------------------------------
// O(n)
function IsPalindrome(str:string):boolean { 
  for(let i=0, j=str.length-1; i < j; i++, j--) { 
    if(str[i] != str[j]) 
      return false; 
    //console.log([str[i], str[j]]); 
  } 
  return true; 
} 
/*console.log(RmWhiteSpace('asds  a')); 
console.log(IsPalindrome(RmWhiteSpace('asds  a'))); */


export default function TestMisc(props:{value?:string}) { 
  return <div></div>; 
}