const gameContainer = document.getElementById("game");
const modalEnd = document.querySelector(".modal-end");
const startBTN = document.querySelector("#playBTN");
const playAgain = document.querySelector("#againBTN");
const modalStart = document.querySelector(".modal-start");
const recordSpam = document.querySelector("#recordSpan");
const trySpam = document.querySelector("#tries");
let matchCount = 0;
let numOfTrys = 0;

const COLORS = [
  // "red",
  // "blue",
  // "green",
  // "orange",
  // "purple",
  // "red",
  // "blue",
  // "cyan",
  // "green",
  // "orange",
  // "purple",
  // "cyan",
];

// create random colors
const createColors = (numOfColor) => {
  let r;
  let g;
  let b;

  for (let i = 0; i < numOfColor; i++) {
    r = Math.floor(Math.random() * 266);
    g = Math.floor(Math.random() * 266);
    b = Math.floor(Math.random() * 266);
    COLORS.push(`rgb(${r},${g},${b})`);
    COLORS.push(`rgb(${r},${g},${b})`);
  }
};
// how many matches
createColors(6);

// add record
recordSpam.textContent = localStorage.getItem("trys");
// play game when button is clicked
startBTN.addEventListener("click", () => {
  modalStart.style.display = "none";
});

// restart the game when user clicks yes
playAgain.addEventListener("click", () => {
  window.location.reload(true);
});
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // add the color to the grid
    // newDiv.style.backgroundColor = color;
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
  // add all the div into a variable
  gameDiv = document.querySelectorAll("#game div");
}

let clickCount = 0;
let firstClick;
let secondClick;

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // add to click count
  clickCount++;
  // handle the  first clicked
  if (clickCount <= 1) {
    // first click will be equal to the target
    firstClick = event.target;
    //  add the color to to the event clicked
    event.target.style.backgroundColor = event.target.getAttribute("class");

    // remove the event listener from first click
    firstClick.removeEventListener("click", handleCardClick);
  }
  // handle the second click second click
  if (clickCount > 1 && clickCount <= 2) {
    // add event listener back to first click when it is not the same
    firstClick.addEventListener("click", handleCardClick);
    // add second click as an event target
    secondClick = event.target;
    //  add the color to the event click
    event.target.style.backgroundColor = event.target.getAttribute("class");

    // after both items are click ckeck for match
    // make sure item is not clicked twice
    if (
      firstClick.getAttribute("class") === secondClick.getAttribute("class")
    ) {
      // add to number of tries
      numOfTrys++;
      // show the number of tries
      trySpam.textContent = numOfTrys;

      matchCount++;

      setTimeout(function () {
        // remove functionality of matching cards
        firstClick.removeEventListener("click", handleCardClick);
        secondClick.removeEventListener("click", handleCardClick);
        clickCount = 0;
      }, 1000);
      // add to match count
    } else {
      // add to number of tries
      numOfTrys++;
      // show the number of tries
      trySpam.textContent = numOfTrys;

      // add timeout to show wrong match
      setTimeout(function () {
        //  remove style from item not matching
        firstClick.style.backgroundColor = "";
        secondClick.style.backgroundColor = "";
        // reset clickcount
        clickCount = 0;
      }, 1000);
    }
  }

  // if game is over do this
  setTimeout(function () {
    if (matchCount === COLORS.length / 2) {
      modalEnd.style.display = "block";

      // update local storage if numOfTrys is smaller
      if (numOfTrys < parseInt(localStorage.getItem("trys")))
        localStorage.setItem("trys", numOfTrys);
    }
  }, 250);
}
// when the DOM loads
createDivsForColors(shuffledColors);
