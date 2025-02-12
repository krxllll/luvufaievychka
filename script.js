const LOG_URL = "https://script.google.com/macros/s/AKfycbxCuiIlZmoyLK4Dz3FMmohqa2Yxnj9B7yBjxyaJrCWHi_Pp2RhBt1BPgBkZax4qVYhV/exec";

const deviceInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    vendor: navigator.vendor
};

async function logEvent(event, user, extra = {}) {
    const query = new URLSearchParams({ event, user, extra: JSON.stringify(extra) }).toString();
    const url = `${LOG_URL}?${query}`;

    try {
        const response = await fetch(url, { method: "GET" });
        console.log("Log sent via GET:", response);
    } catch (err) {
        console.error("Log error:", err);
    }
}


let heartSymbol = "💗";

function createHeart() {
    const heartContainer = document.querySelector(".heart-container");
    const heart = document.createElement("div");
    heart.innerHTML = heartSymbol;
    heart.classList.add("heart");
    heartContainer.appendChild(heart);

    const randomX = Math.random() * window.innerWidth;
    heart.style.left = `${randomX}px`;

    const randomSize = Math.random() * 35 + 15; // 10-30px
    heart.style.fontSize = `${randomSize}px`;

    const randomDuration = Math.random() * 2 + 5; // 3-5 сек
    heart.style.animationDuration = `${randomDuration}s`;

    setTimeout(() => {
        heart.remove();
    }, randomDuration * 1000);
}

setInterval(createHeart, 100);

let textArr = ["Ти впевнена?", "Точно??", "Можливо передумаєш?"]
let i = 0;

function noButton() {
    const yesButton = document.querySelector(".yes");
    const noButton = document.querySelector(".no");
    const text = document.querySelector(".text");
    if (i === 3) {
        const buttons = document.querySelector(".buttons");
        const img = document.createElement("img");
        img.src = "img/no.gif";
        buttons.appendChild(img);
        yesButton.remove();
        noButton.remove();
        text.innerHTML = "Шкода, але я все одно тебе кохаю 💔";
        heartSymbol = "💔";
        fetch("https://api64.ipify.org?format=json")
            .then(res => res.json())
            .then(data => {
                logEvent("no", data.ip || "unknown", deviceInfo);
            })
            .catch(err => {
                console.error("IP fetch failed:", err);
                logEvent("no", "unknown", deviceInfo);
            });
        return;
    }
    yesButton.style.width = `${yesButton.offsetWidth * 1.75}px`;
    yesButton.style.height = `${yesButton.offsetHeight * 1.75}px`;
    yesButton.style.fontSize = `${parseInt(window.getComputedStyle(yesButton).fontSize) * 1.75}px`;
    noButton.style.width = `${noButton.offsetWidth * 0.75}px`;
    noButton.style.height = `${noButton.offsetHeight * 0.75}px`;
    noButton.style.fontSize = `${parseInt(window.getComputedStyle(noButton).fontSize) * 0.75}px`;
    text.innerHTML = textArr[i];
    i++;
}

function yesButton() {
    const yesButton = document.querySelector(".yes");
    const noButton = document.querySelector(".no");
    const text = document.querySelector(".text");
    const buttons = document.querySelector(".buttons");
    yesButton.remove();
    noButton.remove();
    text.innerHTML = "Ура!  Кохаю тебе 😽";
    const img = document.createElement("img");
    img.src = "img/yes.gif";
    buttons.appendChild(img);
    fetch("https://api64.ipify.org?format=json")
        .then(res => res.json())
        .then(data => {
            logEvent("yes", data.ip || "unknown", deviceInfo);
        })
        .catch(err => {
            console.error("IP fetch failed:", err);
            logEvent("yes", "unknown", deviceInfo);
        });
}

