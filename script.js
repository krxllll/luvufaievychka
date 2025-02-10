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
        return;
    }
    yesButton.style.width = `${yesButton.offsetWidth * 1.75}px`;
    yesButton.style.height = `${yesButton.offsetHeight * 1.75}px`;
    yesButton.style.fontSize = `${parseInt(window.getComputedStyle(yesButton).fontSize) * 1.75}px`;
    noButton.style.width = `${noButton.offsetWidth * 0.66}px`;
    noButton.style.height = `${noButton.offsetHeight * 0.66}px`;
    noButton.style.fontSize = `${parseInt(window.getComputedStyle(noButton).fontSize) * 0.66}px`;
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
}

