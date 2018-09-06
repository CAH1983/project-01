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
  const $endScreenIcon =  $('#end-screen-icon');



  const $numberOfPointsEarned = $endScreen.find('span');

  const $playPauseBtn = $('.play-pause');

  let gameIsPlaying = false;

  // sounds
  const $popSound = $('#pop-sound');
  const $chineseGong = $('#chinese-gong');
  const $gameOverSound = $('#game-over-sound');
  const $wrongKeySound = $('#wrong-key');
  // const $endGameSound = $('#president-intro');


  // $('main').hide();
  // ======================== LAUNCH GAME, START SCREEN, END SCREEN ==========================
  $endScreen.hide(); // hides the final screen
  $playBtn.on('click', () => { //what happens when user clicks START
    $chineseGong[0].play();
    $startScreen.hide();
    clockTimer = setInterval(() => {
      currentTime--;
      $displayTime.text(currentTime);
      if(currentTime === 0) endGame();
    }, 1000);
    charTimer = setInterval(insertChar, 1000);
    // startGame();
  });


  function endGame() {  // END GAME function
    console.log('endGame called...');
    $chineseGong[0].play();
    $endScreen.show();
    clearInterval(clockTimer);
    clearInterval(charTimer);
    $numberOfPointsEarned.text(score);
    console.log('Game Over');

    if (score < 5) {
      $gameOverSound[0].play();
      $endScreenText.text('OMG! Try again!');
      $endScreenIcon.hide();
      $endScreen.find('h1').text('GAME OVER');

    } else {
      $endScreen.find('h1').text('TIME UP!');
      $endScreenText.text('Great Score! Another game?');
    }
  }

  $playAgainBtn.on('click', () => {  // PLAY AGAIN Button
    $chineseGong[0].play();
    gameIsPlaying = false;
    $endScreen.hide();
    startGame();

  });

  // RESET function
  function reset() {
    console.log('reset game');
    currentTime = 60; // reset time
    score = 0;       // reset score
    $squares.text('');  // reset square boxes
    $displayTime.text(currentTime);  // count time
    $scoreCount.text(score); // count score
    charactersDisplayed = []; // store characters into the empty array
  }

  // Start the game function
  function startGame() {
    console.log('starting game...');
    reset();
    toggleTimers();
    insertChar();
  }


  // ===== Insert a random character in a random square ===

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
    if(!gameIsPlaying) { // if game is not playing, LAUNCH
      clockTimer = setInterval(() => {
        currentTime--;
        $displayTime.text(currentTime);
        if(currentTime === 0) endGame();
      }, 1000);
      charTimer = setInterval(insertChar, 1000);

    } else {     // if game is playing, PAUSE
      clearInterval(clockTimer); // stops the counter seconds
      clearInterval(charTimer); // stops producing characters
    }
    gameIsPlaying = !gameIsPlaying;
  }

  $playPauseBtn.on('click', toggleTimers);


  // ============= what happens when the user press a key ===================
  $(document).on('keyup', (e) => {
    if(['Shift', 'Tab', 'Meta', 'Alt'].includes(e.key)) return false;

    if (charactersDisplayed.includes(e.key)) {
      score++;
      console.log('SCORE ==========>', score);
      $popSound[0].play();
      $scoreCount.text(score);
      $squares.filter(`:contains('${e.key}')`).empty();
      charactersDisplayed = charactersDisplayed.filter(character => character !== e.key);

    } else {
      $wrongKeySound[0].play();
    }
  });

});
