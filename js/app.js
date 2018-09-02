$(() => {
  const characters = ['{','}','[', ']', '<', '>', '/', '*', '#', '@'];
  const $squares = $('div.box');
  const $displayTime = $('aside.timer');
  const charactersDisplayed = [];
  let timerId = 0;
  let score = 0;
  let currentTime = 60;


  // ~~~~~ Function to display a random character inside a  random square, store this character inside an array~~~

  function insertChar () {
    // generate a random square index
    const randomSqIdx = Math.floor(Math.random() * $squares.length);
    // select the index of a $squares
    const $randomSq = $squares.eq(randomSqIdx);

    // generate a random character randomSqIndex
    const randomCharIdx = Math.floor(Math.random() * characters.length);

    // select the index of $characters
    const randomChar = characters[randomCharIdx];
    // display the character
    $randomSq.text(randomChar);
    // store the character into an array
    charactersDisplayed.push(randomChar);
  }
  insertChar();
  // ~~~~~~~~~~~~ a random character will appear every second in a square ~~~~~~~~~~~~
  setInterval(insertChar, 1000);

  // ~~~~~~~~~~~~~~ create a function to score points ~~~~~~~~~~~~~
  $(document).on('keyup', (e) => {
    if (charactersDisplayed.includes(e.key)) score++;
    console.log('SCORE ==========>', score);
    score.text(score);
    //remove the character typed from the array characterDisplayed
    // ??? characterDisplayed.??(e.key.value); ???

    const i = charactersDisplayed.indexOf(randomChar);
    if (keyPressed = randomChar) {
      charactersDisplayed.splice(i,)
    }

  }
  );

  // ~~~~~~~~~~~~~~ create a timer set up to 60s ~~~~~~~~~~~~~~~~~
  function timerCount() {
    timerId = setInterval(()=>{
      currentTime--;
      $displayTime.text(currentTime);
      if(currentTime === 0) {
        clearInterval(timerId);
      }
    }, 1000);
    console.log('Current time ======>', currentTime);
  }

  timerCount();
  function speak (message) {
    var msg = new SpeechSynthesisUtterance(message);
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[0];
    window.speechSynthesis.speak(msg);
  }
  speak('Help the turtle to code, type as fast as you can, each correct answer scores 1 point, each combo scores 5');
});
