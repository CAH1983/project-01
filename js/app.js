$(() => {
  const characters = ['{','}','[', ']', '<', '>', '/', '*', '#', '%^*', '@'];
  const $squares = $('div.box');
  let timer = 0;
  let score = 0;


  // ~~~~~ function to insert a random character inside a  random square ~~~

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
    return $randomSq.text(randomChar);
  }

  insertChar();
// ~~~~~~~~~~~~ 
  setInterval(insertChar, 1000);


// ~~~~~~~~~~~~~~ create a function to score points ~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~ create a timer set up to 60s ~~~~~~~~~~~~~~~~~
});
