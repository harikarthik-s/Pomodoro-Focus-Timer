let start_stop = document.querySelector("#start_stop");
let reset = document.querySelector("#reset");
let break_length = document.querySelector("#break-length");
let session_length = document.querySelector("#session-length");
let timer_label = document.querySelector("#timer-label");
let clock = document.querySelector("#time-left");
let timeleft = 1500,
  state = "STOPPED",
  timer;

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

