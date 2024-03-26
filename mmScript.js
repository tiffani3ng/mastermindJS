class Code {
  constructor() {
    this.code = []; // constructor, creates an empty array
  } // end constructor

  genCode() {
    this.code = [];
    for (let i = 0; i < 4; i++) {
      this.code.push(Math.floor(Math.random() * 7) + 1);
      // generates a random 4-digit code and stores it in the array
      // of the code object
    }
  } // end genCode

  getCode() {
    return this.code; // accessor for the code
  } // end getCode
} // end Code class

class Board {

  constructor() {
    // sets all variables to default empty values
    this.currentGuess = []; // array to store user guess
    this.circles = []; // array to store circles choices
    this.currentGuessNum = 1; // guess number
    this.code = new Code(); // new code object to hold code key
    this.code.genCode(); // generates a new code
    this.correctCode = this.code.getCode(); // array to store code key
    this.playerScore = 0; // setting scores to zero
    this.compScore = 0;
  } // end constructor

  resetBoard() {
    const guessCircles = document.querySelectorAll('.circle'); // selecting all circles
    guessCircles.forEach(circle => {
      circle.style.backgroundColor = '#f8f8f8'; // reset colors
      circle.style.border = '2px solid #000'; // reset hint borders
    });
    // resetting values that store user input
    this.currentGuess = [];
    this.currentGuessNum = 1;
    this.circles = [];
    // resetting scores
    this.playerScore = 0;
    this.compScore = 0;
    // choosing a new code
    this.correctCode.
  } // end resetBoard

  guess(number) {
    // guess function takes number as a parameter
    if ((Math.floor((number - 1) / 4) + 1) == this.currentGuessNum) {
      // if the circle is in a valid row
      if (!this.circles.includes(number)) {
        // pushes the circle number into the circles array
        this.circles.push(number);
      }
      if (this.currentColor !== null && number !== undefined) {
        // if a color is selected and there is no error
        document.getElementById('row' + (Math.floor((number - 1) / 4) + 1)).children[(number - 1) % 4].style.backgroundColor = this.currentColor;
        // change the color of the circle to the color selected
        this.currentGuess[(number - 1) % 4] = this.getColorIndex(this.currentColor);
        // add the guess to the guess array
      }
    }
  } // end guess

  getColorIndex(color) {
    // converting color hex codes to a number
    switch (color) {
      case '#FFADAD':
        return 1;
      case '#FFD6A5':
        return 2;
      case '#FDFFB6':
        return 3;
      case '#CAFFBF':
        return 4;
      case '#9BF6FF':
        return 5;
      case '#A0C4FF':
        return 6;
      case '#BDB2FF':
        return 7;
      case '#FFC6FF':
        return 8;
      default:
        return -1;
    }
  } // end getColorIndex

  checkGuess() {
    if (this.currentGuess.length === 4) {
      // if the guess is a complete guess
      const hint = this.getHint(this.currentGuess);
      // get a hint code array
      this.circles.sort((a, b) => a - b);
      // sorts the circles array in case user chose out of order
      for (let i = 0; i < 4; i++) {
        // for each code in array
        const hintElement = document.getElementById('hint' + this.circles[i].toString());
        // get hint element to change color
        if (hint[i] === 1) {
          // if right color, right position, change to green
          hintElement.style.border = '3px solid #08c017';
        } else if (hint[i] === 2) {
          // if right color, wrong position, change to yellow
          hintElement.style.border = '3px solid #FFEE00';
        } else if (hint[i] === 0) {
          // if wrong color, change to gray
          hintElement.style.border = '3px solid gray';
        }
      }
      if (hint.every(val => val === 1)) {
        // winning message if every color is correct
        alert('Congratulations! You won!');
        // increment player score
        this.playerScore += 1;
        // reflect new score on screen
        document.getElementById('scoreP').innerText = this.playerScore.toString();
      } else if (this.currentGuessNum === 10) {
        // losing message if you ran out of guesses
        alert('You ran out of guesses. The computer wins!');
        // increment computer score
        this.compScore += 1;
        // reflect new score on screen
        document.getElementById('scoreC').innerText = this.compScore.toString();
      }
      // reset variables for user input for new guesses
      this.currentGuess = [];
      this.circles = [];
      this.currentColor = null;
      // increment guess number
      this.currentGuessNum += 1;
    } else {
      // error message if guess is incomplete
      alert('Please fill all circles before checking.');
    }
  } // end checkGuess

  getHint(guess) {
    const hint = [];
    // empty hint array
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === this.correctCode[i]) {
        // if right color, right position
        hint.push(1);
      } else if (this.correctCode.includes(guess[i])) {
        // if right color, wrong place
        hint.push(2);
      } else {
        // if wrong color
        hint.push(0);
      }
    }
    return hint; // return hint key array
  } // end getHint

  selectColor(color) {
    this.currentColor = color; // sets currentColor
  } // end selectColor

} // end Board class

class MastermindGame {
  constructor() {
    // constructor sets variables to default values
    this.code = new Code(); // new code object to hold code key
    this.code.genCode(); // generates a new code
    this.board = new Board(); // creates new board for game
  } // end constructor

  instructions() {
    // function to print instructions
    alert('The computer generates a secret code of 4 colors. The player has 10 attempts to guess the code before losing. \n\nChecking the guess tells the player if each peg is either \n\n1) the right color in the right slot [green], \n2) the right color in the wrong slot [yellow], or \n3) the wrong color entirely [gray]. \n\nSelecting a new round resets the pegboard and generates a new code, and resetting the game also resets the scoreboard.');
  } // end instructions

  resetGame() {
    this.board.resetBoard(); // reset board
    // set scores to zero
    this.board.playerScore = 0;
    this.board.compScore = 0;
    // reflect score change on screen
    document.getElementById('scoreP').innerText = 0;
    document.getElementById('scoreC').innerText = 0;
  } // end resetgame
}

const game = new MastermindGame(); // create new game
