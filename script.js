
const jokeCards = [
    {
        title: "The random conversations",
        description: "Somehow, we can talk about absolutely anything.",
        reveal: "Thank you for letting me yap about anything🥺"
    },
    {
        title: "The sleep schedule",
        description: "Sleep? What is that konje?",
        reveal: "Thank you for ruining my sleep schedule, I guess 😭"
    },
    {
        title: "Thank you for our little inside jokes",
        description: "Thank you for subscribing to the friendship premium",
        reveal: "Mcabuzi👀"
    }
];

const starMessages = [
    "Thank you for putting up with my nonsense 🤭",
    "Thank you for making me feel better when I'm sad🥺",
    "I'm grateful that you came into my life Nele , this is the happiest I've ever been in a while"
];

const cardsContainer = document.getElementById("cards");
const starsContainer = document.getElementById("stars-grid");
const progressText = document.getElementById("progress");
const letterUnlock = document.getElementById("letter-unlock");

let collectedStars = 0;

function createMemoryCards() {
    jokeCards.forEach((card, index) => {
        const article = document.createElement("article");
        article.className = "memory-card";

        const number = document.createElement("p");
        number.className = "card-number";
        number.textContent = `FILE 0${index + 1}`;

        const title = document.createElement("h3");
        title.textContent = card.title;

        const description = document.createElement("p");
        description.textContent = card.description;

        const button = document.createElement("button");
        button.textContent = "Open this file";

        const reveal = document.createElement("p");
        reveal.className = "reveal hidden";
        reveal.textContent = card.reveal;

        button.addEventListener("click", () => {
            const isHidden = reveal.classList.contains("hidden");
            reveal.classList.toggle("hidden");
            button.textContent = isHidden ? "Close file" : "Open this file";
        });

        article.append(number, title, description, button, reveal);
        cardsContainer.appendChild(article);
    });
}

function createStars() {
    starMessages.forEach((message, index) => {
        const wrapper = document.createElement("div");

        const button = document.createElement("button");
        button.className = "star-button";
        button.innerHTML = `✦<span>Star ${index + 1}</span>`;
        button.setAttribute("aria-label", `Reveal star ${index + 1}`);

        const messageElement = document.createElement("p");
        messageElement.className = "star-message hidden";
        messageElement.textContent = message;

        button.addEventListener("click", () => {
            if (button.classList.contains("collected")) {
                return;
            }

            button.classList.add("collected");
            button.innerHTML = `★<span>Collected!</span>`;
            messageElement.classList.remove("hidden");

            collectedStars++;
            progressText.textContent = `Stars collected: ${collectedStars} / ${starMessages.length}`;

            if (collectedStars === starMessages.length) {
                letterUnlock.classList.remove("hidden");
            }
        });

        wrapper.append(button, messageElement);
        starsContainer.appendChild(wrapper);
    });
}


const memoryButton = document.getElementById("memory-button");
const lastPhotos = document.getElementById("last-photos");

if (memoryButton && lastPhotos) {
    memoryButton.addEventListener("click", () => {
        const isHidden = lastPhotos.classList.toggle("hidden");

        memoryButton.textContent = isHidden
            ? "P.S. One more thing... ♡"
            : "Hide our memories ↑";

        if (!isHidden) {
            lastPhotos.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    });
}


document.querySelectorAll("[data-scroll]").forEach(button => {
    button.addEventListener("click", () => {
        const target = document.getElementById(button.dataset.scroll);

        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

document.getElementById("restart").addEventListener("click", () => {
    collectedStars = 0;
    progressText.textContent = `Stars collected: 0 / ${starMessages.length}`;
    letterUnlock.classList.add("hidden");

    document.querySelectorAll(".star-button").forEach((button, index) => {
        button.classList.remove("collected");
        button.innerHTML = `✦<span>Star ${index + 1}</span>`;
    });

    document.querySelectorAll(".star-message").forEach(message => {
        message.classList.add("hidden");
    });

    document.getElementById("home").scrollIntoView({ behavior: "smooth" });
});

createMemoryCards();
createStars();
