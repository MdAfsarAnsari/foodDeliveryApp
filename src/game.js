let optionTimer = null;
let heartTimer = null;
let rainInterval = null;

function stopAllTimers() {
    clearTimeout(optionTimer);
    clearTimeout(heartTimer);
    clearInterval(rainInterval);
}

function startHeartRain() {
    clearInterval(rainInterval);

    rainInterval = setInterval(() => {
        const heart = document.createElement("div");

        heart.className = "floating-heart";
        heart.innerHTML = "❤️";

        heart.style.left = Math.random() * 100 + "%";
        heart.style.animationDuration = (4 + Math.random() * 3) + "s";

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);

    }, 200);
}

function startLevel2() {

    stopAllTimers();

    document
        .querySelectorAll(".floating-heart")
        .forEach(h => h.remove());

    const message = document.getElementById("message");
    const gameArea = document.getElementById("gameArea");

    gameArea.innerHTML = "";

    message.innerHTML = "Level 2 unlocked 🔓 Good luck Muskan ❤️";

    setTimeout(() => {

        message.innerHTML = "";

        const box = document.createElement("div");
        box.id = "level2Box";
        gameArea.appendChild(box);

        const optionBoard = document.createElement("div");
        optionBoard.className = "optionBoard";
        optionBoard.innerText = " Option ";
        gameArea.appendChild(optionBoard);

        const optionsContainer = document.createElement("div");
        optionsContainer.id = "optionsContainer";

        const letters = ["S", "U", "N", "S", "H", "I", "N", "E"];

        letters.forEach(letter => {

            const tile = document.createElement("button");

            tile.className = "optionTile";
            tile.innerText = letter;

            tile.onclick = () => {

                if (letter === "E") {

                    stopAllTimers();

                    box.innerHTML = `
                        <div class="successMessage">
                            🎉 Congratulations Muskan 🎉
                            <br><br>
                           Na chaand chahiye, na sitaron ka jahaan chahiye 🌙✨<br>
Mujhe bas har pal tera saath chahiye ❤️<br><br>

Aur agar pooche koi meri sabse keemti cheez kya hai... 🥰<br>
To bina soche tera naam chahiye 🌹💕<br><br>

Ab tumhare liye ek khaas surprise 🎁❤️
                        </div>
                    `;

                    for (let i = 0; i < 25; i++) {

                        const heart = document.createElement("div");

                        heart.className = "floating-heart";
                        heart.innerHTML = "❤️";

                        heart.style.left =
                            Math.random() * 90 + "%";

                        heart.style.animationDuration =
                            (4+ Math.random() * 3) + "s";

                        document.body.appendChild(heart);

                        setTimeout(() => {
                            heart.remove();
                        }, 5000);
                    }

                } else {

                    box.innerHTML = `
                        <div class="wrongMessage">
                            ❌ Galat Option
                            <br><br>
                           <br>💕 Hint:</br>

Main shuruaat nahi,
Main anjaam hu...

Jo sabke baad aata hai,
Wahi khaas hu ❤️
                            <br><br>
                            <button id="tryAgainBtn">
                                Try Again
                            </button>
                        </div>
                    `;

                    document.getElementById("tryAgainBtn").onclick = () => {
                        startLevel2();
                    };
                }
            };

            optionsContainer.appendChild(tile);
        });

        gameArea.appendChild(optionsContainer);

        const heartData = [
            { letter: "S", 
    msg: `Mujhe nhi chunegi?
    <br>
    Kya me itna bura hu 😞`
},

            { letter: "U", msg: "kasam meri marijo ki me hu yaar asli" },
            { letter: "N", msg: "afsar ne mujhe bheja hai aapke liye sachhi dadi kasam " },
            { letter: "S", msg: "Are ye log to Amittabh bachhapn ko v natu natu kahta hai mujhe chuno yaar" },
            { letter: "H", msg: "hello Muskan ji mujhe choose kro aur game khatam kro" },
            { letter: "I", msg: "chup be H ,muski mujhe choose ki ❤️" },
            { letter: "N", msg: "gali de dunga I <br> confuse kr rhi hai meri muskan ko dekhna abhi mujhe select karegi ❤️" },
           { letter:"E",msg: `

Kundi na khatkhao Rani...<br>
Itna bhi na sharmao Rani <br><br>
Galat-sahi sab baad ki baat hai,<br>
Pehle option dabao Rani 👑💕`},
        ];

        let current = 0;

        function showHeart() {

            if (current >= heartData.length) {

                box.innerHTML = `
                    <div style="
                        font-size:22px;
                        font-weight:bold;
                        text-align:center;
                    ">
                         🥺 Kya tum mujhe dhoond paogi?
                    </div>
                `;

                optionTimer = setTimeout(showRestartButton, 1000);
                return;
            }

            const data = heartData[current];

            box.innerHTML = `
                <div class="heart ${data.letter === "E" ? "correctHeart" : ""}">
                    ❤️
                </div>

                <div class="letter">
                    ${data.letter}
                </div>

                <div class="msg">
                    ${data.msg}
                </div>
            `;

            current++;

            heartTimer = setTimeout(showHeart, 4000);
        }

        startHeartRain();
        showHeart();

    }, 3000);
}

function showRestartButton() {

    if (document.getElementById("restartBtn")) return;

    const gameArea = document.getElementById("gameArea");

    const btn = document.createElement("button");

    btn.id = "restartBtn";
    btn.innerText = "Restart";

    btn.onclick = () => {
        startLevel2();
    };

    gameArea.appendChild(btn);
}=