$(() => {
  const characters = ['{','}','[', ']', '<', '>', '/', '*', '#', '@'];
  const $squares = $('div.box');
  const $displayTime = $('aside#timer');
  let charactersDisplayed = [];
  const $scoreCount = $('#scoreCount');

  let clockTimer = 0;
  let charTimer = 0;
  let score = 0;
  let currentTime = 60;

  const $startScreen = $('.start-screen');
  const $endScreen = $('.end-screen');
  const $endScreenText = $endScreen.find('#end-screen-text');
  const $playBtn = $startScreen.find('button');
  const $playAgainBtn = $endScreen.find('button');

  const $numberOfPointsEarned = $endScreen.find('span');

  const $playPauseBtn = $('.play-pause');

  let gameIsPlaying = false;


  // // ======================== LAUNCH GAME, START SCREEN, END SCREEN ==========================
  $endScreen.hide();

  $playBtn.on('click', () => {
    $startScreen.hide();
    startGame();
  });

  // END GAME function
  function endGame() {
    console.log('endGame called...');
    $endScreen.show();
    clearInterval(clockTimer);
    clearInterval(charTimer);
    $numberOfPointsEarned.text(score);
    console.log('Game Over');
    $endScreen.find('h1').text('Game Over');

    if (score < 5) {
      $endScreenText.text('OMG! Try again!');
    } else {
      $endScreenText.text('Great Score! Another game?');
    }
  }
  // PLAY AGAIN Button
  $playAgainBtn.on('click', () => {
    $endScreen.hide();
    startGame();
  });

  // RESET function
  function reset() {
    console.log('reset game');
    currentTime = 60;
    score = 0;
    $squares.text('');
    $displayTime.text(currentTime);
    $scoreCount.text(score);
    charactersDisplayed = [];
  }


  function startGame() {
    console.log('starting game...');
    reset();
    toggleTimers();
    insertChar();
  }


  // ===== Display a random character inside a  random square, store this character inside an array ====

  function insertChar () {
    console.log('inserting char...');
    const $emptySquares = $squares.filter(':empty');
    // generate a random square index
    const randomSqIdx = Math.floor(Math.random() * $emptySquares.length);
    // select the index of a $squares
    const $randomSq = $emptySquares.eq(randomSqIdx);

    // generate a random character randomSqIndex
    const randomCharIdx = Math.floor(Math.random() * characters.length);

    // select the index of $characters
    const randomChar = characters[randomCharIdx];
    // display the character
    $randomSq.text(randomChar);
    // store the character into an array
    charactersDisplayed.push(randomChar);
    // if GAME OVER
    if (charactersDisplayed.length === $squares.length) {
      endGame();
    }
  }

  // ===================== Play / Pause button ==========================

  function toggleTimers () {
    if(!gameIsPlaying) {
      clockTimer = setInterval(() => {
        currentTime--;
        $displayTime.text(currentTime);
        if(currentTime === 0) endGame();
      }, 1000);
      charTimer = setInterval(insertChar, 1000);

    } else {
      clearInterval(clockTimer);
      clearInterval(charTimer);
    }
    gameIsPlaying = !gameIsPlaying;
  }

  $playPauseBtn.on('click', toggleTimers);


  // ============= what happens when the user press a key ===================
  $(document).on('keyup', (e) => {
    if (charactersDisplayed.includes(e.key)) score++;
    console.log('SCORE ==========>', score);
    $scoreCount.text(score);

    $squares.filter(`:contains('${e.key}')`).empty();

    charactersDisplayed = charactersDisplayed.filter(character => character !== e.key);
  });


});
