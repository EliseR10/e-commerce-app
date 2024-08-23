const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  //initialize the field property 
  constructor(field) {
    this.field = field;
    this.playerX = 0; //initialize horizontal position
    this.playerY = 0; //initialize vertical position
  }

  //when you don't want to bond a method with an object as you can't bond one method with two objects simultaneously
  static generateField(height, width, percentage) {
   //used to built the two dimensional array. This will contain sub-arrays, each representing a row in the field
   const field = [];

   //Create the field with neutral background characters
   /*A for loop runs from 0 to height. Each iteration represents a row. Inside this loop, another loop runs from 0 to width, creating each row filled with fieldCharacter. Each created row is then added to the field array.*/
   for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push(fieldCharacter);
    } 
      field.push(row);
   }

   //Randomly place the hat
   /*A do while loop is used because it guarantees that the code inside runs at least once before checking the condition. This is useful for generating random positions and validating them. */
   let hatX, hatY;
    do {
      hatX = Math.floor(Math.random() * width);
      hatY = Math.floor(Math.random() * height);
    } while (hatX === 0 && hatY === 0);
    //ensure the hat is not at the starting position
    field[hatY][hatX] = hat;

    //Randomly places holes based on the percentage
    //calculate the total number of cells in the field
    const totalCells = height * width;
    //determine the number of holes based on the percentage
    const numHoles = Math.floor(totalCells * percentage);
      //for each hole, it generates random position and ensures these positions are not already occupied by the hat or the starting position
      for (let i = 0; i < numHoles; i++) {
        let holeX, holeY;
        do {
          holeX = Math.floor(Math.random() * width);
          holeY = Math.floor(Math.random() * height);
        } while ((holeX === 0 && holeY === 0) || field[holeY][holeX] === hat);
        
        //assign the hole character to these positions in the field array
        field [holeY][holeX] = hole;
      }
      
      //starts by putting the user in the top-left corner
      field [0][0] = pathCharacter;

      return field;
    }

  /*to print and inspect the field property
  define a method in the class property and loop through
  each row of the field and print it.
  .join() method creates and returns a new string by concatenating all of the elements in this array, separated by commas or a specified separator string*/
  print() {
    for (let row of this.field) {
      console.log(row.join(''));
    }
  }

  //Method to handle input and update position
  //prompt is a function used to get user input from the terminal
  movePlayer() {
    const direction = prompt('Which way? (u = up, d = down, l = left, r = right): ').toLowerCase();
    switch(direction){
      case 'u':
        this.playerY += 1;
        break;
      case 'd':
        this.playerY -= 1;
        break;
      case 'l':
        this.playerX += 1;
        break;
      case 'r':
        this.playerX -= 1;
        break;
      default:
        console.log("Wrong input. Please choose from up: u, down: d, left: l or right: r");
        return;
    }

    //Check if the position is out of bounds
    //Due to 2D array (array of array), this.field represents a number of row and this.field[0] represent the number of columns in the selected row (0 index)
  if (this.playerY < 0 || this.playerY >= this.field.length || this.playerX < 0 || this.playerX >= this.field[0].length) {
    console.log("You came out of the field, you loose");
    process.exit();
  }

  //Check if the position is a hole
  //this.field[this.playerY][this.playerX] because updating the 2D array and to know the specific element in the field array at the player's current position
  if (this.field[this.playerY][this.playerX] === hole) {
    console.log("You felt in a hole. You loose");
    process.exit();
  }
  

  //Check if the position is a hat
  if (this.field[this.playerY][this.playerX] === hat) {
    console.log("You found the hat. Well done");
    process.exit();
  }
  
  //Update the field with the player's position
  //update the field precisely to mark the user's position
  this.field[this.playerY][this.playerX] = pathCharacter;
  }
  
}

//new instance of the Field class.
const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

myField.print();