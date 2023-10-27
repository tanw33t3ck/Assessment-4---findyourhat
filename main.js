const prompt = require('prompt-sync')({ sigint: true }); // requires prompt sync node module

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

const OUTOFBOUNDS = 1;
const WIN = 2;
const LOSE = 3;
const SAFE = 4;
const QUIT = 5;

// defines a Field class
class Field {
    constructor(arr) {
        this.field = arr; // this.field takes a 2-dimensional array
        this.ylocation = 0; //initialises y-coordinate to 0;
        this.xlocation = 0; //initialises x-coordinate to 0;
    }// end of constructor


    // print method - prints current state of the field
    print() {
        for (let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join("")) // joins array and removes the commas and spaces
        }
    }// end of print method

    gameResult(decision) {
        switch (decision) {
            case WIN:
                console.log('You found your hat! Congratulations!');
                break;
            case LOSE:
                console.log('You fell into a hole! Game Over!');
                break;
            case SAFE:
                this.field[this.ylocation][this.xlocation] = pathCharacter; // check if player is safe and updates current position
                this.print() // updates current state of the field
                break;
            case OUTOFBOUNDS:
                console.log('You are out of the playing field. Game Over!');
                process.exit(); 
            default:
                console.log('You have quit the game!');
                process.exit();
         } // end of switch
    }// end of gameResult method
    
// playGame method
    playGame() {
        this.print(); // calls on print method to print current state of the field

        // while loop to check that initialised location (0, 0) is not a hat or a hole
        while (this.field[this.ylocation][this.xlocation] !== hat && this.field[this.ylocation][this.xlocation] !== hole) {
            const answer = prompt('which direction do you want to go? "w" = up, "s" = down, "a" = left, "d" = right: ').toLowerCase();
            
            switch (answer) {
                case 'w':
                    this.ylocation -= 1; // this.ylocation is reduced by 1 and continues to check if player is safe, won or lost
                    if (this.ylocation === -1) { // checks if player is out of bounds
                        this.gameResult(OUTOFBOUNDS);
                    }// end of if(out of bounds)
                    else if (this.field[this.ylocation][this.xlocation] === hat) { // checks if player has found his hat
                        this.gameResult(WIN);
                    }// end of if(hat)
                    else if (this.field[this.ylocation][this.xlocation] === hole) { // checks if player fell into a hole
                        this.gameResult(LOSE);
                    }// end of if(hole)
                    else {
                        this.gameResult(SAFE);
                        answer; // prompts player to make the next input
                    }
                    break;
                case 's':
                    this.ylocation += 1; // this.ylocation is increased by 1 and continues to check if player is safe, won or lost
                    if (this.ylocation === this.field.length) { // checks if player is out of bounds
                        this.gameResult(OUTOFBOUNDS);
                    }// end of if(out of bounds)
                    else if (this.field[this.ylocation][this.xlocation] === hat) { // checks if player has found his hat
                        this.gameResult(WIN);
                    }// end of if(hat)
                    else if (this.field[this.ylocation][this.xlocation] === hole) { // checks if player fell into a hole
                        this.gameResult(LOSE);
                    }// end of if(hole)
                    else {
                        this.gameResult(SAFE);
                        answer; // prompts player to make the next input
                    }
                    break;
                case 'a':
                    this.xlocation -= 1; // this.xlocation is reduced by 1 and continues to check if player is safe, won or lost
                    if (this.xlocation === -1) { // checks if player is out of bounds
                        this.gameResult(OUTOFBOUNDS);
                    }// end of if(out of bounds)
                    else if (this.field[this.ylocation][this.xlocation] === hat) { // checks if player has found his hat
                        this.gameResult(WIN);
                    }// end of if(hat)
                    else if (this.field[this.ylocation][this.xlocation] === hole) { // checks if player fell into a hole
                        this.gameResult(LOSE);
                    }// end of if(hole)
                    else {
                        this.gameResult(SAFE);
                        answer; // prompts player to make the next input
                    }
                    break;
                case 'd':
                    this.xlocation += 1; // this.xlocation is reduced by 1 and continues to check if player is safe, won or lost
                    if (this.xlocation === this.field[0].length) { // checks if player is out of bounds
                        this.gameResult(OUTOFBOUNDS);
                    }// end of if(out of bounds)
                    else if (this.field[this.ylocation][this.xlocation] === hat) { // checks if player has found his hat
                        this.gameResult(WIN);
                    }// end of if(hat)
                    else if (this.field[this.ylocation][this.xlocation] === hole) { // checks if player fell into a hole
                        this.gameResult(LOSE);
                    }// end of if(hole)
                    else {
                        this.gameResult(SAFE);
                        answer; // prompts player to make the next input
                    }
                    break;   
                default:
                    this.gameResult(QUIT);
                    break;       
            }
        }//end of while loop
    }// end of playGame method

    // static generateField method - initialises field with hat and holes
    static generateField(height, width) { // generateField takes 2 parameters, height and width of field
        let array = [];
        let randNum = () => {
            return Math.floor(Math.random() * 5); // create a random number from 0 to 4
        };// end of randNum
        let randPosition = () => { //randPosition populates a position with holes or field Character 
            if (randNum() === 4) { //randPosition is a hole of randNum is equal to 4
                return hole;
            } else {
                return fieldCharacter;
            }
        }; //end of randTile

        // generates a field with height and width from parameters
        for (let i = 0; i < height; i++) { // creates rows
            array.push([]);
            for (let j = 0; j < width; j++) {
                array[i].push(randPosition()); // populates the field with either a hole or fieldCharacter
            }// end of for(j) loop
        }// end of for(i) loop

        // randomly allocates location of hat
        let hatY = () => {
            return Math.floor(Math.random() * height) // randomly allocates y-coords of hat
        } // end of hatY
        let hatX = () => {
            return Math.floor(Math.random() * width) // randomly allocates x-coords of hat
        }; // end of hatX

        array[hatY()][hatX()] = hat; // allocates position of hat;
        if (array[0][0] === hat) { // checks if hat is in position 0 0
            array[1][0] = hat; // reallocates hat to new array location
        }// end of if

        array[0][0] = pathCharacter; // allocates position of player to 0, 0
        return array; // generateField returns populated array
    }// end of generateField

}; // end of Field class

const myField = new Field(Field.generateField(10, 10)); // creates a playing field of height 10 width 10
myField.playGame(); // calls playGame method