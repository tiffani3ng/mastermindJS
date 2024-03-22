let currentColor = null;
let currentGuess = [];
let correctCode = [1, 2, 3, 4]; // Modify this to the correct code

function guess(number) {
  if (currentColor !== null && number !== undefined) {
    document.getElementById('row' + (Math.floor((number - 1) / 4) + 1)).children[(number - 1) % 4].style.backgroundColor = currentColor;
    currentGuess[(number - 1) % 4] = getColorIndex(currentColor);
  }
}

function selectColor(color) {
  currentColor = color;
}

function checkGuess() {
  if (currentGuess.length === 4) {
    let hint = getHint(currentGuess);
    let row = document.getElementById('row' + (Math.floor((currentGuess.length - 1) / 4) + 1).toString());
    for (let i = 0; i < hint.length; i++) {
      let hintElement = row.children[i + 4].children[i];
      if (hint[i] === 1) {
        hintElement.style.backgroundColor = 'black'; // Correct color and position
      } else if (hint[i] === 2) {
        hintElement.style.backgroundColor = 'white'; // Correct color, wrong position
      }
    }
    if (hint.every(val => val === 1)) {
      alert('Congratulations! You won!');
    }
    currentGuess = [];
    currentColor = null;
  } else {
    alert('Please fill all circles before checking.');
  }
}

function getColorIndex(color) {
  switch (color) {
    case '#ff6347':
      return 1;
    case '#1e90ff':
      return 2;
    case '#32cd32':
      return 3;
    case '#ffff00':
      return 4;
    case '#ff69b4':
      return 5;
    case '#8a2be2':
      return 6;
    case '#000':
      return 7;
    default:
      return -1;
  }
}

function getHint(guess) {
  let hint = [];
  let unmatchedGuessIndices = [];
  let unmatchedCodeIndices = [];
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === correctCode[i]) {
      hint.push(1); // Correct color and position
    } else {
      unmatchedGuessIndices.push(i);
      unmatchedCodeIndices.push(correctCode.indexOf(guess[i]));
    }
  }
  for (let i = 0; i < unmatchedGuessIndices.length; i++) {
    let indexInCode = unmatchedCodeIndices.indexOf(unmatchedGuessIndices[i]);
    if (indexInCode !== -1) {
      hint.push(2); // Correct color, wrong position
      unmatchedCodeIndices.splice(indexInCode, 1);
    }
  }
  while (hint.length < 4) {
    hint.push(0); // Incorrect color
  }
  return hint;
}

function resetBoard() {
  // Reset guess circles
  let guessCircles = document.querySelectorAll('.circle');
  guessCircles.forEach(circle => {
    circle.style.backgroundColor = '';
  });

  // Reset hint circles
  let hintCircles = document.querySelectorAll('.hint');
  hintCircles.forEach(hint => {
    hint.style.backgroundColor = '';
  });

  // Clear current guess and color
  currentGuess = [];
  currentColor = null;
}
