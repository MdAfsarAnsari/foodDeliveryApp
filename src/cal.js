document.addEventListener("DOMContentLoaded", function () {

  let searchInput = document.querySelector(".search-box input");

  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      let query = searchInput.value.toLowerCase().trim();
      if (query !== "") {
        showResult(query);
        searchInput.value = "";
      }
    }
  });

});


// ❤️ FIXED START TIME
const baseYears = 4;
const baseMonths = 0;
const baseDays = 13;
const baseHours = 15;
const baseMinutes = 30;

let startDate = new Date(
  Date.now()
  - (baseYears * 365 * 24 * 60 * 60 * 1000)
  - (baseMonths * 30 * 24 * 60 * 60 * 1000)
  - (baseDays * 24 * 60 * 60 * 1000)
  - (baseHours * 60 * 60 * 1000)
  - (baseMinutes * 60 * 1000)
);


// ❤️ TIMER CONTROL
let timerStarted = false;

function startRelationshipTimer() {
  if (timerStarted) return;
  timerStarted = true;

  setInterval(() => {
    let timerBox = document.getElementById("loveTimer");
    if (!timerBox) return;

    let now = new Date();
    let diff = now - startDate;

    let seconds = Math.floor(diff / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    let years = Math.floor(days / 365);
    let months = Math.floor((days % 365) / 30);
    let remainingDays = (days % 365) % 30;

    timerBox.innerHTML = `
      ❤️ Together since:<br><br>
      <b>${years}</b> years 
      <b>${months}</b> months 
      <b>${remainingDays}</b> days <br>
      <b>${hours % 24}</b> hrs 
      <b>${minutes % 60}</b> min 
      <b>${seconds % 60}</b> sec
    `;
  }, 1000);
}


// 🎯 CREATE ROW FUNCTION
function createWikiRow(label, value) {
  return `
    <div class="wiki-row">
      <div class="wiki-label">${label}</div>
      <div class="wiki-value">${value}</div>
    </div>
  `;
}


// ❤️ RANDOM MESSAGES
let lastMessageIndex = {};

function openMessage(type) {
  let box = document.getElementById("specialMessage");

  let messages = {
    sad: [
      "Jab tum sad hoti ho… mujhe lagta hai sab thik kar du 😢❤️",
      "Tumhari smile hi meri duniya hai 😊 please sad mat ho ❤️",
      "Agar tum ro rahi ho… to main bhi khush nahi hu 😔❤️",
      "me hu na jaan ,phir tension kis baat ki  😔❤️",
      "Tu akeli nahi hai, main hamesha tere saath hoon. 😔❤️",
      "Tere face pe smile hi suit karti hai, sadness nahi",
      " Har problem temporary hoti hai, par tu permanent meri hai😢❤️",
      "Bas tu smile kar, baaki sab main handle kar lunga",
      "Tu jab bolti hai na ‘main kaabil nahi hu’, mujhe lagta hai tu khud ko nahi samajh rahi.",
      "Main tujhe kabhi girne nahi dunga, chahe kuch bhi ho.",
      "Tu akeli nahi hai.",
      "Tu important hai, bas yaad rakh.",
      "Tu deserve karti hai happy rehna.",
      "Smile kar, warna main naraz ho jaunga 😌",
      "Khud pe doubt mat kar, main karta hoon trust",
      "Tera dard mujhe feel hota hai.",
      "Smile pending hai tere face pe 🙂",
      "Tu sad hoti hai to duniya dull lagti hai",
      "Main tujhe kabhi akela feel nahi hone dunga",
      "Tu meri responsibility nahi, meri priority hai",
      "NEET tujhe define nahi karta… tu already strong hai ❤️",
      "NEET ek exam hai, tu usse kahin zyada hai.",
      "Result tera value decide nahi karta",
    ],
    miss: [
      "Agar tum mujhe miss kar rahi ho… main bhi kar raha hu ❤️",
      "Tum bina sab adhoora lagta hai 😘❤️",
      "Loading… Afsar in your thoughts 💭❤️",
      "Bas ek hug mil jaye to sab thik ho jaye 🤗❤️",
      "Miss karna mat… main hamesha tumhare paas hu 💖",
      " Ooo meri jaan ne mujhe miss kr rhi hai ❤️",
      "System detect: Someone is missing me badly ❤️",
      "Miss aur blush ek sath dikh rha hai mujhe ",
      "“Tere bina sab thoda empty lagta hai”",
      " itna hi miss kr rhi hai to call kar lo na suga mujhe",
      "tum mujhe miss krti hai ye soch kr me blush krta hu",
      "haa haa ji itna daati hai mujhe ab to miss karegi hi",
      "Click kiya matlab… tu mujhe miss kar rahi hai ❤️”",
      "miss kr rhi hai to ek hug ka emoji bhej dijiye me samjh jaunga",
      "kon tujhe yu pyar krega jitna me tumse karta ",
      "pahle sirf ek larki thi ek beti thi ek bahan thi kisi v par ab to meri JAAN MERI DUNIYA ban chuki ho",
      "Loading… Afsar in your thoughts 💭❤️”",
      "Raniganj wala baat to nhi yaad aa rha hai",
      "Har click me tera pyaar hai",
      "Tera miss sabse special hai ❤️”",
      "“Ab ek hug pending hai 🤗”",
      "tum sirf larki nhi meri jindagi ho",
      " we both lucky person",
      " door to hu par hu to aapke dil me hi na suga",
      "itni miss kr rhi hai to SHADI KAR LE KYA",
      "tumhari jagah jannat ki hoor v nhi le sakti",
      "Same feeling",
      "tum meri liye wo ho jo koi nhi ho sakta",
      "Status update: Someone is thinking about me",
      "Har click me tera pyaar dikh raha hai",
      " me sirf tumhara hu jaan aur hamesha rahunga aakhiri saans tak",
      "“Tu aur main = always ❤️",
      "apne pasandida mard se pyar ki hai to MISS  krna to banta hai",
      "aa jau kya BANKURA",
      "Tum meri jaan hai ❤️",
      "Tum yaad karti hai… main jeet jata hoon",
      "“Phir se yaad aa gaya na",
      "Tu meri smile hai",
      "Dil me main hi chal raha hoon na",
      
    ],
    angry: [
      "Gussa ho? 😡 thik hai… par pyaar kam nahi hoga ❤️",
      "Sorry… galti meri ho ya na ho, par tujhe udas dekhna mujhe bilkul achha nahi lagta",
      "Tumhara gussa bhi cute lagta hai 😏❤️",
      "Gussa thoda sa mujhpe nikaal le… par rona nhi jaan",
      "Thoda sa smile de de… baaki sab main theek kar dunga”",
      "Jaldi se mana lunga… bas thoda time do ❤️",
      "sara gussa mere pe nikal le ,me yahi hu",
      "“Sorry… tu hurt hui, bas ye hi matter karta hai ❤️",
      "“Main sunne ke liye ready hoon,",
      "Tu naraz hoti hai na… dil heavy ho jata hai",

    ]
  };

  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * messages[type].length);
  } while (newIndex === lastMessageIndex[type]);

  lastMessageIndex[type] = newIndex;

  box.innerHTML = `
    <div style="
      margin-top:10px;
      padding:15px;
      background:#fff0f0;
      border-radius:10px;
      box-shadow:0 2px 8px rgba(0,0,0,0.1);
    ">
      ${messages[type][newIndex]}
    </div>
  `;
}


// ❤️ MAIN SEARCH SYSTEM
function showResult(query) {
  document.getElementById("homePage").style.display = "none";
  document.getElementById("resultPage").style.display = "block";
  document.getElementById("resultInput").value = query;

  let aiText = document.getElementById("aiText");

  query = query.toLowerCase();

  // ❤️ LOVE CALCULATOR (UPDATED)
  if (
    query.includes("how much does afsar love muskan") ||
    (query.includes("afsar") && query.includes("muskan") && query.includes("how much"))
  ) {

    aiText.innerHTML = `
      <div style="text-align:center;">

        <h2>❤️ Love Calculator</h2>

        <p style="
          font-size:16px;
          background:black;
          padding:10px;
          border-radius:8px;
          margin-bottom:15px;
        ">
          👉 Step 1: Press <b>100 + 100</b><br>
          👉 Step 2: Then press <b>- 100</b><br>
          👉 Step 3: Then press <b>/ 0</b><br><br>
          💡 Go ahead… your result is waiting for you ❤️ 👇
        </p>

        <input id="display" readonly
          style="width:220px; padding:10px; font-size:18px; text-align:right; border-radius:5px; border:none;">

        <br><br>

        <div style="width:230px; margin:auto;">
          ${createCalcBtn("7")}${createCalcBtn("8")}${createCalcBtn("9")}${createCalcBtn("/")}<br>
          ${createCalcBtn("4")}${createCalcBtn("5")}${createCalcBtn("6")}${createCalcBtn("*")}<br>
          ${createCalcBtn("1")}${createCalcBtn("2")}${createCalcBtn("3")}${createCalcBtn("-")}<br>
          ${createCalcBtn("0")}${createCalcBtn("00")}${createCalcBtn("%")}${createCalcBtn("+")}<br>
          <button onclick="calculateResult()" style="width:100%; padding:10px;">=</button>
        </div>

        <p id="loveResult" style="margin-top:15px;"></p>

      </div>
    `;
  }

  // 💖 LOVE STORY
  else if (
    (query.includes("love") && query.includes("story")) ||
    (query.includes("muskan") && query.includes("afsar")) ||
    query.includes("afsar aur muskan") ||
    query.includes("muskan aur afsar") ||
    query.includes("afsar muskan") ||
    query.includes("muskan afsar")
  ) {

    aiText.innerHTML = `
      <h2>💖 Muskan aur Afsar ki Love Story</h2>
      <p>
        Muskan aur Afsar ki kahani ek simple si mulaqat se shuru hui thi ❤️ 
        aur jab shuru hua tha kisi ne ye nhi socha tha ki baat yH
      </p>
      <div id="loveTimer"></div>
    `;

    startRelationshipTimer();
  }

  // 🔥 BEAUTY SEARCH
  // 🔥 SPECIAL UNIVERSAL BEAUTY SEARCH FLOW
else if (
  query.includes("muskan") &&
  query.includes("beautiful")
) {

  document.getElementById("homePage").style.display = "none";
  document.getElementById("resultPage").style.display = "block";

  aiText.innerHTML = ""; // clear first

  // Step 1
  aiText.innerHTML += "<p>⏳ Processing...</p>";

  setTimeout(() => {

    // Step 2
    aiText.innerHTML += "<p>🌍 Searching whole universe...</p>";

    setTimeout(() => {

      // Step 3
      aiText.innerHTML += "<p>❌ Error 404 - Not Found</p>";

      setTimeout(() => {

        // Step 4 Final Result
        aiText.innerHTML += `
          <h2>💖 Final Result</h2>
          <p>Muskan se zyada sundar koi nahi hai is poore universe me ❤️</p>
          <p style="color:red;">⚠️ Alert: Aisi impossible cheez search na kare </p>
        `;

        startRelationshipTimer();

      }, 2000);

    }, 2000);

  }, 2000);
}
  // 👑 WHO IS MUSKAN
  else if (
    query.includes("who is muskan") ||
    query.includes("muskan kaun hai")
  ) {
    aiText.innerHTML = `
      <div style="max-width:700px; margin:20px auto; font-family:Arial;">
        <h2 style="color:#FFB6C1;">Muskan</h2>
        <p style="color:#e8eaed;">
          Muskan is a very sweet, caring and beautiful girl ❤️  
          She is also known as the future wife of Afsar 💍
        </p>
        ${createWikiRow("Nick Name", "Sunshine")}
        ${createWikiRow("Age", "19")}
        ${createWikiRow("Nature", "Cute, Caring, Loving ❤️")}
        ${createWikiRow("Status", "Afsar's future wife 💖")}
      </div>
    `;
  }
  // ❌ DEFAULT
  else {
    aiText.innerHTML = `
      <h2>No results found 😅</h2>
      <p>Try searching <b>muskan</b> ❤️</p>
    `;
  }
}
// ❤️ CALCULATOR FUNCTIONS
function createCalcBtn(val) {
  return `<button onclick="press('${val}')" style="width:50px; height:40px; margin:2px;">${val}</button>`;
}
function press(val) {
  document.getElementById("display").value += val;
}
function calculateResult() {
  let display = document.getElementById("display");
  let resultBox = document.getElementById("loveResult");

  try {
    let result = eval(display.value);
    display.value = undefined;

    if (!isFinite(result)) {
      resultBox.innerHTML = `
        ❤️ Yesss... this is true SUNSHINE afsar aapse itna pyar karta hai ki define kiya hi nhi ja sakta  ♾️💖 its totally impossible
      `;
    } else {
      resultBox.innerHTML = "please try again jaan...";
    }
  } catch {
    display.value = "Error";
  }
}
// 🔥 LOADING
function loadingAnimation(callback) {
  let aiText = document.getElementById("aiText");
  aiText.innerHTML = "Processing...";

  setTimeout(() => {
    callback();
  }, 1500);
}
// 🔙 BACK
function goBack() {
  document.getElementById("homePage").style.display = "block";
  document.getElementById("resultPage").style.display = "none";
}