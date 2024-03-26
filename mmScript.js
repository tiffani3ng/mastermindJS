class Code {
  constructor() {
    this.code = [];
  }

  genCode() {
    this.code = [];
    for (let i = 0; i < 4; i++) {
      this.code.push(Math.floor(Math.random() * 7) + 1);
    }
  }

  getCode() {
    return this.code;
  }
}

class Board {
  constructor(code) {
    this.currentGuess = [];
    this.circles = [];
    this.currentGuessNum = 1;
    this.correctCode = code;
    this.playerScore = 0;
    this.compScore = 0;
  }

  resetBoard() {
    const guessCircles = document.querySelectorAll('.circle');
    guessCircles.forEach(circle => {
      circle.style.backgroundColor = '';
      circle.style.border = '2px solid #000';
    });
    this.currentGuess = [];
    this.currentGuessNum = 1;
    this.circles = [];
    this.playerScore = 0;
    this.compScore = 0;
  }

  guess(number, currentColor) {
    if ((Math.floor((number - 1) / 4) + 1) == this.currentGuessNum) {
      if (!this.circles.includes(number)) {
        this.circles.push(number);
      }
      if (currentColor !== null && number !== undefined) {
        document.getElementById('row' + (Math.floor((number - 1) / 4) + 1)).children[(number - 1) % 4].style.backgroundColor = currentColor;
        this.currentGuess[(number - 1) % 4] = this.getColorIndex(currentColor);
      }
    }
  }

  getColorIndex(color) {
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
  }

  checkGuess() {
    if (this.currentGuess.length === 4) {
      const hint = this.getHint(this.currentGuess);
      this.circles.sort((a, b) => a - b);
      for (let i = 0; i < 4; i++) {
        const hintElement = document.getElementById('hint' + this.circles[i].toString());
        if (hint[i] === 1) {
          hintElement.style.border = '3px solid #08c017';
        } else if (hint[i] === 2) {
          hintElement.style.border = '3px solid #FFEE00';
        } else if (hint[i] === 0) {
          hintElement.style.border = '3px solid gray';
        }
      }
      if (hint.every(val => val === 1)) {
        alert('Congratulations! You won!');
        this.playerScore += 1;
        document.getElementById('scoreP').innerText = this.playerScore.toString();
        this.resetBoard();
      } else if (this.currentGuessNum === 10) {
        alert('You ran out of guesses. The computer wins!');
        this.compScore += 1;
        document.getElementById('scoreC').innerText = this.compScore.toString();
        this.resetBoard();
      }
      this.currentGuess = [];
      this.circles = [];
      currentColor = null;
      this.currentGuessNum += 1;
    } else {
      alert('Please fill all circles before checking.');
    }
  }

  getHint(guess) {
    const hint = [];
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === this.correctCode[i]) {
        hint.push(1);
      } else if (this.correctCode.includes(guess[i])) {
        hint.push(2);
      } else {
        hint.push(0);
      }
    }
    return hint;
  }

  selectColor(color) {
    currentColor = color;
  }

}

class MastermindGame {
  constructor() {
    this.code = new Code();
    this.code.genCode();
    this.board = new Board(this.code.getCode());
  }

  instructions() {
    alert('The computer generates a secret code of 4 colors. The player has 10 attempts to guess the code before losing. \n\nChecking the guess tells the player if each peg is either \n\n1) the right color in the right slot [green], \n2) the right color in the wrong slot [yellow], or \n3) the wrong color entirely [gray]. \n\nSelecting a new round resets the pegboard and generates a new code, and resetting the game also resets the scoreboard.');
  }

  resetGame() {
    this.board.resetBoard();
    this.board.playerScore = 0;
    this.board.compScore = 0;
    document.getElementById('scoreP').innerText = 0;
    document.getElementById('scoreC').innerText = 0;
    this.code.genCode();
  }
}

const game = new MastermindGame();