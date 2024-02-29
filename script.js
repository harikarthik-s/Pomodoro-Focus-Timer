let start_stop = document.querySelector("#start_stop");
let reset = document.querySelector("#reset");
let break_length = document.querySelector("#break-length");
let session_length = document.querySelector("#session-length");
let timer_label = document.querySelector("#timer-label");
let clock = document.querySelector("#time-left");
let timeleft = 1500,
  state = "STOPPED",
  timer;

//Progress bar
let progress_bar = new ldBar("#ldBar");

function toggleTimerLabel() {
  let label = timer_label.innerHTML;
  timer_label.innerHTML = label == "SESSION" ? "BREAK" : "SESSION";
}

function updateTimeleft() {
  if (timer_label.innerHTML == "SESSION") {
    timeleft = session_length.innerHTML * 60;
  }
  if (timer_label.innerHTML == "BREAK") {
    timeleft = break_length.innerHTML * 60;
  }
}

function updateProgressBar() {
  let percentage;
  let one_percent;

  if (timer_label.innerHTML == "SESSION") {
    one_percent = (Number(session_length.innerHTML) * 60) / 100;
    percentage =
      (Number(session_length.innerHTML) * 60 - timeleft) / one_percent;
  }
  if (timer_label.innerHTML == "BREAK") {
    one_percent = (Number(break_length.innerHTML) * 60) / 100;
    percentage = (Number(break_length.innerHTML) * 60 - timeleft) / one_percent;
  }
  progress_bar.set(percentage);
}

//Timer clock
function updateClock(timeleft) {
  let minutes = Math.floor(timeleft / 60);
  let seconds = timeleft - minutes * 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  clock.innerHTML = `${minutes}:${seconds}`;
}

function timerCountDown() {
  timer = setInterval(() => {
    if (timeleft > 0) {
      timeleft -= 1;
    } else {
      toggleTimerLabel();
      updateTimeleft();
    }
    updateClock(timeleft);
    updateProgressBar();
  }, 1000);
}

//start-pause-reset
function startPauseResume() {
  start_stop.addEventListener("click", function () {
    if (start_stop.classList.contains("ion-play")) {
      //icon change
      start_stop.classList.remove("ion-play");
      start_stop.classList.add("ion-pause");

      timerCountDown();
      state = "RUNNING";
    } else {
      start_stop.classList.remove("ion-pause");
      start_stop.classList.add("ion-play");

      clearInterval(timer);
      state = "STOPPED";
    }
  });
}
startPauseResume();

function handleReset() {
  reset.addEventListener("click", function () {
    clearInterval(timer);
    timeleft = 1500;
    updateClock(timeleft);
    progress_bar.set(0);
    state = "STOPPED";

    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }

    session_length.innerHTML = "25";
    break_length.innerHTML = "5";
    timer_label.innerHTML = "SESSION";

    //turn on play icon
    if (start_stop.classList.contains("ion-pause")) {
      start_stop.classList.remove("ion-pause");
      start_stop.classList.add("ion-play");
    }
  });
}
handleReset();

//session-break
function decrease() {
  if (this.id == "break-decrement" && state == "STOPPED") {
    let numb = Number(break_length.innerHTML); // avoid type problems
    if (numb > 1) {
      break_length.innerHTML = numb - 1;

      if (timer_label.innerHTML == "BREAK") {
        timeleft = (numb - 1) * 60;
        updateClock(timeleft);
        updateProgressBar();
      }
    }
  }
  if (this.id == "session-decrement" && state == "STOPPED") {
    let numb = Number(session_length.innerHTML); // avoid type problems
    if (numb > 1) {
      session_length.innerHTML = numb - 1;

      if (timer_label.innerHTML == "SESSION") {
        timeleft = (numb - 1) * 60;
        updateClock(timeleft);
        updateProgressBar();
      }
    }
  }
}

function handleDecrease() {
  let break_decrement = document.getElementById("break-decrement");
  let session_decrement = document.getElementById("session-decrement");

  break_decrement.addEventListener("click", decrease);
  session_decrement.addEventListener("click", decrease);
}
handleDecrease();


function increase() {
  if (this.id == "break-increment" && state == "STOPPED") {
    let numb = Number(break_length.innerHTML); 
    if (numb < 60) {
      break_length.innerHTML = numb + 1;

      if (timer_label.innerHTML == "BREAK") {
        timeleft = (numb + 1) * 60;
        updateClock(timeleft);
        updateProgressBar();
      }
    }
  }
  if (this.id == "session-increment" && state == "STOPPED") {
    let numb = Number(session_length.innerHTML); 
    if (numb < 60) {
      session_length.innerHTML = numb + 1;

      if (timer_label.innerHTML == "SESSION") {
        timeleft = (numb + 1) * 60;
        updateClock(timeleft);
        updateProgressBar();
      }
    }
  }
}

// function increase task or break time
function handleIncrease() {
  let break_increment = document.getElementById("break-increment");
  let session_increment = document.getElementById("session-increment");

  break_increment.addEventListener("click", increase);
  session_increment.addEventListener("click", increase);
}
handleIncrease();