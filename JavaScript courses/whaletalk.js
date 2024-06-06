let input = 'a whale of a deal!';
const vowels = ['a', 'e', 'i', 'o', 'u']
let resultArray = [];

for (let inputIndex = 0; inputIndex < input.length; inputIndex++) {
  //console.log('inputIndex is' + inputIndex);
  
  if (input[inputIndex] === 'e'){
    resultArray.push(input[inputIndex]);
  }

  if (input[inputIndex] === 'u'){
    resultArray.push(input[inputIndex]);
  }

  for (let vowelIndex = 0; vowelIndex < vowels.length; vowelIndex++) {
    //console.log('vowelIndex is' + vowelIndex);
    if (input[inputIndex] === vowels[vowelIndex]) {
      resultArray.push(input[inputIndex]);
      //console.log(resultArray);
    }
  }
}

//console.log(resultArray);
let resultString = resultArray.join('').toUpperCase();
console.log(resultString);


