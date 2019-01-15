var playing;
var score = 0;
var scoreText = document.querySelector('.score');
var lastThroneHit = null;
var playButton = document.querySelector('.play');
var joffreys = document.querySelectorAll('.joffrey');

// Starts the game.
function play () {
  playing = true;
  setTimeout(function () {
    showHideJoffrey(getThrone());
  }, 0);
  setTimeout(function () {
    playing = false;
  }, 20000);
}

// Stops the game.
function stop () {
  playing = false;
}

/**
 * Generates a random number between the given max and min inclusive.
 *
 * @param   {Number}  min  The minimum number to return.
 * @param   {Number}  max  The maximum number to return.
 *
 * @return  {Number}       The random number between the given max and min.
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  return Math.floor(Math.random() * (Math.floor(max) - min)) + min;
}

/**
 * Shows and hides an instance of Joffrey.
 *
 * @param   {HTMLElement}  throne  The throne with the Joffrey to show and hide.
 */
function showHideJoffrey (throne) {
  var joffrey = throne.childNodes[1];

  if (playing) {
    joffrey.classList.add('up');
    setTimeout(function () {
      hideJoffrey(joffrey);
      showHideJoffrey(getThrone());
    }, getRandomInt(500, 1500));
  }
}

/**
 * Hides the given instance of Joffrey.
 *
 * @param  {HTMLElement}  joffrey  The given instance of Joffrey.
 */
function hideJoffrey (joffrey) {
  joffrey.classList.remove('up');
}

/**
 * Gets one of the 'throne' DOM elements at random.
 *
 * @return  {HTMLElement}  The 'throne' DOM element.
 */
function getThrone () {
  var throneNumber = getRandomInt(1, 9);
  if (lastThroneHit) {
    while (throneNumber === parseInt(lastThroneHit)) {
      throneNumber = getRandomInt(1, 9);
    }
  }
  return document.querySelector('.joffrey-throne' + throneNumber);
}

/**
 * Gets the 'throne' number from the given DOM element.
 *
 * @return  {String}  The 'throne' number.
 */
function getLastThroneHit (throne) {
  return throne.classList[1].slice(-1);
}

// Updates the score.
function updateScore () {
  score += 1;
  scoreText.innerText = score;
}

// Adds a click event listener to each joffrey DOM element.
for (var i = 0; i < joffreys.length; i += 1) {
  joffreys[i].addEventListener('click', function (e) {
    var joffrey = e.target;

    if (getLastThroneHit(joffrey.parentNode) === lastThroneHit) {
      return;
    } else {
      updateScore();
      hideJoffrey(joffrey);
      lastThroneHit = getLastThroneHit(joffrey.parentNode);
    }
  });
}

// Adds a click event listener to the 'play' button to start the game.
playButton.addEventListener('click', function () {
  if (!playing) {
    play();
  }
});

// Adds a click event listener to the 'stop' button to stop the game.
document.querySelector('.stop').addEventListener('click', function () {
  stop();
});

// Adds a click event listener to 'reset' the score.
document.querySelector('.reset').addEventListener('click', function () {
  score = 0;
  scoreText.innerText = 0;
});
