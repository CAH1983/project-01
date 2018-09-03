$(() => {
  const characters = ['{','}','[', ']', '<', '>', '/', '*', '#', '@'];
  const $squares = $('div.box');
  const $displayTime = $('aside#timer');
  let charactersDisplayed = [];
  const $scoreCount = $('#scoreCount');

  let timerId = 0;
  let score = 0;
  let currentTime = 60;

  const $startScreen = $('.start-screen');
  const $endScreen = $('.end-screen');
  const $gameOverScreen = $('.game-over-screen');
  const $playBtn = $startScreen.find('button');
  const $playAgainBtn = $endScreen.find('button');
  const $numberOfPointsEarned = $endScreen.find('span');


  // ======================== LAUNCH GAME, START SCREEN, END SCREEN ==========================
  $endScreen.hide();
  $gameOverScreen.hide();

  $playBtn.on('click', () => {
    $startScreen.hide();
    startGame();
  });

  function endGame() {
    $endScreen.show();
    clearInterval(timerId);
    $numberOfPointsEarned.text(`${score}`);

    if (score <5) {
      $endScreen.text('You can do better! Try again?');
    } else {
      $endScreen.text('Great Score! Another game?')
    };
  }

  $playAgainBtn.on('click', () => {
    startGame();


  function startGame() {
    timerId = setInterval(() => {
      currentTime--;
      if(currentTime === 0) endGame();
    }, 1000);



  // ===== Display a random character inside a  random square, store this character inside an array ====

  function insertChar () {
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
    // if screen gets full, Game Over page launches
    if (charactersDisplayed.length === $squares.length) {
      console.log('Game Over');
      $gameOverScreen.show();
      clearInterval(timerId);
    }
  }

  insertChar();
  //  a random character will appear every second in a square
  setInterval(insertChar, 1000);

  // ============= what happens when the user press a key ===================
  $(document).on('keyup', (e) => {
    if (charactersDisplayed.includes(e.key)) score++;
    console.log('SCORE ==========>', score);
    $scoreCount.text(score);

    $squares.filter(`:contains('${e.key}')`).empty();

    charactersDisplayed = charactersDisplayed.filter(character => character !== e.key);
  });

  // ============= Run the 60 seconds timer =============
  function decrease () {
    currentTime--;
    $displayTime.text(currentTime);
  }

  function timerCount() {
    timerId = setInterval(()=>{
      console.log('Current time ======>', currentTime);
      decrease();
      if (currentTime === 0) {
        clearInterval(timerId);
      }
    }, 1000);
  }

  timerCount();

});
