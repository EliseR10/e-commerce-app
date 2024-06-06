let secretMessage = ['Learning', 'is', 'not', 'about', 'what', 'you', 'get', 'easily', 'the', 
'first', 'time,', 'it', 'is', 'about', 'what', 'you', 'can', 'figure', 
'out.', '-2015,', 'Chris', 'Pine,', 'Learn', 'JavaScript'];
console.log(secretMessage.length);
//check the length

//Remove the last string of the array and check the length
secretMessage.pop();
console.log(secretMessage.length);

//Add two words at the end of the array
secretMessage.push('to', 'Program');
console.log(secretMessage);

//Change the word easily to right
secretMessage[7] = 'right';
console.log(secretMessage);

//Remove the first string of the array;
secretMessage.shift();
console.log(secretMessage);

//Add a word at the beginning of the array;
secretMessage.unshift('Programming');
console.log(secretMessage);

//Delete few words and change it for one
secretMessage.splice(6, 5, 'know');
//console.log(secretMessage);
console.log(secretMessage.join());
