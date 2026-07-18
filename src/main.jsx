let score = 0;
let time = 15;
let speed = 800;
let gameOver = false;

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const message = document.getElementById("message");

let hearts = [];
let timer;

// ---------------- GAME 1 ----------------
function startGame1() {
  score = 0;
  time = 15;
  gameOver = false;
  scoreEl.innerText = score;
  timeEl.innerText = time;

  for (let i = 0; i < 10; i++) {
    createHeart();
  }

  timer = setInterval(() => {
    time--;
    timeEl.innerText = time;

    if (time <= 0) endGame1(false);
  }, 1000);
}

function createHeart() {
  let heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "❤️";

  moveHeart(heart);

  heart.onclick = () => {
    if (gameOver) return;

    score++;
    scoreEl.innerText = score;
    heart.remove();

    if (score === 10) endGame1(true);
  };

  document.body.appendChild(heart);
  hearts.push(heart);

  setInterval(() => {
    if (!gameOver) moveHeart(heart);
  }, speed);
}

function endGame1(win) {
  gameOver = true;
  clearInterval(timer);
  hearts.forEach(h => h.remove());

  message.style.display = "block";

  if (win) {
    message.innerHTML = `
      😏 Abhi kaha madam ji…<br><br>
      Abhi ek aur game khelna hai ❤️<br><br>
      Ready? 😉
    `;

    setTimeout(() => {
      message.style.display = "none";
      hearts = [];
      startGame2();
    }, 4000);

  } else {
    message.innerHTML = "Time up 😭 but I still love you ❤️";
  }
}

// ---------------- GAME 2 ----------------

function startGame2() {
  let lines = [
    "Main hu asli wala heart ❤️",
    "Mujhe pakdo jaan 😜",
    "Aapka husband ne bheja hai 😏",
    "Wrong choice baby 😂",
    "Try harder 😈",
    "Main nahi hu 😝",
    "Almost mil gaya 😍"
  ];

  for (let i = 0; i < 7; i++) {
    let heart = document.createElement("div");
    heart.className = "heart";

    heart.innerHTML = `
      ❤️<br><small>${lines[i]}</small>
    `;

    heart.style.fontSize = "40px";

    moveHeart(heart);

    setInterval(() => {
      moveHeart(heart);
    }, 700);

    if (i === 0) {
      heart.style.textShadow = "0 0 15px white";
      heart.onclick = () => finalWin();
    } else {
      heart.onclick = () => showTempMsg("😂 Ye wala nahi tha!");
    }

    document.body.appendChild(heart);
  }
}

// ---------------- COMMON ----------------

function moveHeart(el) {
  let x = Math.random() * (window.innerWidth - 100);
  let y = Math.random() * (window.innerHeight - 100);

  el.style.left = x + "px";
  el.style.top = y + "px";
}

function showTempMsg(text) {
  message.style.display = "block";
  message.innerHTML = text;

  setTimeout(() => {
    message.style.display = "none";
  }, 1500);
}

function finalWin() {
  document.querySelectorAll(".heart").forEach(h => h.remove());

  message.style.display = "block";
  message.innerHTML = `
    🎉 Finally mil gaya ❤️<br><br>
    Jaise tumne is heart ko dhunda…<br>
    waise hi tum meri life me aayi 💖<br><br>
    Happy Birthday Muskan 🎂❤️
  `;
}

// START
startGame1();