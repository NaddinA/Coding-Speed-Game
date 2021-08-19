// Initializing all tags
let time = document.querySelector("#time");
let counter = document.querySelector("#counter");
let start = document.querySelector("#start");

let result = document.querySelector("#result");

let words = document.querySelector("#words");
let characters = document.querySelector("#characters");
let typos = document.querySelector("#typos");

let typingText = document.querySelector("#typingText");
let userInput = document.querySelector("#userInput");

let timer = 0;
let interval = null;

let typoCount = 0;
let index = 0;

let user_time_selection = 0;

userInput.disabled = true;

start.addEventListener("click", () =>{
  if (document.getElementById('time-selection').value === '0')
  {
    throw alert("Please set the timer!");
  }
  else
  {
    userInput.value = "";
    start.innerText = `Start typing!`
    userInput.disabled = false;
  }
  
  // Appending Spans
  code.split("").forEach(characters =>{
    let spanTxt = document.createElement("span");
    spanTxt.innerHTML = characters;
    typingText.appendChild(spanTxt);
  })

  // Start Countdown
  interval = setInterval(Countdown, 1000);
  time.style.display = "grid";
  result.style.display = "none";
  start.style.pointerEvents = "none";
})

// Process user's time selection
function check() 
{
  var val = document.getElementById('time-selection').value;

  switch (val) 
  {
    case '1':
      return user_time_selection = 60;
    case '3':
      return user_time_selection = 180;
    case '5':
      return user_time_selection = 300;
    case '8':
      return user_time_selection = 480;
    case '10':
      return user_time_selection = 600;

    default:
      break;
  }
}

let Countdown = () =>{
  if (timer < user_time_selection)
  {
    timer++;
    counter.innerText = timer;
  }
  else
  {
    EndGame();
  }
}

// Character Checking
userInput.addEventListener("input", e =>{
  let userVal = userInput.value.split("");

  let generated_code = typingText.querySelectorAll("span");

  if (e.inputType === "deleteContentBackward")
  {
    index--;
    generated_code[index].classList.remove("correct");
    generated_code[index].classList.remove("incorrect");
  }

  else if (userVal[index] === generated_code[index].innerText)
  {
    generated_code[index].classList.add("correct");
    index++
  }

  else
  {
    generated_code[index].classList.add("incorrect");
    index++;
    typoCount++;
  }
});

// Detect user victory
userInput.addEventListener("input", () =>
{
  let user_input_length = userInput.value.split("").length;
  let generated_output_length = typingText.querySelectorAll("span").length;

  if (user_input_length === generated_output_length)
  {
    EndGame();
  }
});

// Restart game button logic
function eraseText()
{
  userInput.value = "";
  location.reload();
}

// On page refresh, return selection to default value
if (performance.type == performance.TYPE_RELOAD)
{
  userInput.value = "";
  document.getElementById('time-selection').value = '0';
}

function EndGame()
{
  userInput.disabled = true;
  time.style.display = "none";
  result.style.display = "flex";

  characters.innerText = Math.round((((index / 5) / timer) * 60) * 5);
  words.innerText = Math.round((((index / 5) / timer) * 60));
  typos.innerText = typoCount;

  // Stop timer and reset
  clearInterval(interval);
  timer = 0;
}