var timeoutID;
var intervalID;
var minutesInput = document.querySelector("#minutesIn");
var secondsInput = document.querySelector("#secondsIn");
var minutes = document.querySelector("#minutes");
var seconds = document.querySelector("#seconds");
minutesInput.oninput = function () {
  var value = Number(this.value);
  var errorMin = document.querySelector("#errorMin");

  if (value < 0) {
    errorMin.innerHTML = "<i class='ico'>&#9888;</i>The number must be bigger than 0";
  } else {
    errorMin.textContent = "";
    var minutes = document.querySelector("#minutes");
    minutes.textContent = fixNum(value);
  }
};

secondsInput.oninput = function () {
  var value = Number(this.value);
  var errorSec = document.querySelector("#errorSec");

  if (value > 59 || value < 0) {
    errorSec.innerHTML = "<i class='ico'>&#9888;</i>The number must be between 0 to 59";
  } else {
    errorSec.textContent = "";
    var seconds = document.querySelector("#seconds");
    seconds.textContent = fixNum(value);
  }
};
function start(event) {
  event.target.disabled = true;
  var ms = (Number(minutes.textContent) * 60 + Number(seconds.textContent)) * 1000;
  minutesInput.disabled = true;
  secondsInput.disabled = true;
  timeoutID = setTimeout(async function () {
    restart();
    document.querySelector("#load").innerHTML =
      "<div class='lds-default'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>";

    var res = await fetch("https://aws.random.cat/meow");
    var img = (await res.json()).file;
    imgDiv = document.querySelector("#cat");
    imgDiv.src = img;
  }, ms);
  intervalID = setInterval(function () {
    if (Number(seconds.textContent) === 0) {
      seconds.textContent = 59;
      minutes.textContent = fixNum(Number(minutes.textContent) - 1);
    } else {
      seconds.textContent = fixNum(Number(seconds.textContent) - 1);
    }
  }, 1000);
}
function stop() {
  clearTimeout(timeoutID);
  restart();
}
function restart() {
  var startButton = document.querySelector("#startButton");
  startButton.disabled = false;
  clearInterval(intervalID);
  minutesInput.disabled = false;
  secondsInput.disabled = false;
  minutesInput.oninput();
  secondsInput.oninput();
}
function fixNum(num) {
  if (num < 10) {
    return "0" + num;
  }
  return num;
}
function loaded() {
  imgDiv = document.querySelector("#cat");

  document.querySelector("#load").innerHTML = "";
  imgDiv.hidden = false;
  setTimeout(function () {
    document.querySelector("#cat").hidden = true;
  }, 5000);
}
