const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const messageContainer = document.querySelector(".message-container");
const psContainer = document.querySelector(".ps-container");
const photo = document.querySelector(".photo");
const wrapper = document.querySelector(".wrapper");
const confettiContainer = document.querySelector(".confetti-container");

const messages = [
  { text: "Ahahaha! You thought!", delay: 1500 },
  { text: "I was gonna give you the Rose!🫵", delay: 1500 },
  { text: "Eeeeeeeeeeeeeeeeeeee", delay: 1500 },
  { text: "You got Rose Eeeed, Roji!", delay: 1500 },
  { text: "Nah! I'm kidding.", delay: 1500 },
  { text: "But seriously... if you want real flowers 💐", delay: 2000 },
  { text: "Let's go somewhere special!", delay: 2000 },
  {
    text: "Unless you're happy with just the photo of the rose! 📱...",
    delay: 2000,
  },
  {
    text: "Even so, I can send over the photo for you to download.",
    delay: 2000,
  },
  {
    text: "But as a sus manche, I don't think you are gonna be happy with just the photo!",
    delay: 2500,
  },
  { text: "So let's make it banger! 🎉", delay: 2000 },
  {
    text: "I've got an extra VIP ticket for the Sushant KC concert! Dance karne chalogi?",
    delay: 3000,
  },
  {
    text: "(P.S. I feel like I know so much about you, yet somehow nothing at all. Please tell me you're not a serial killer! 🙏",
    delay: 3000,
  },
];

let isFinalQuestion = false;

yesBtn.addEventListener("click", () => {
  if (!isFinalQuestion) {
    yesBtn.classList.add("btn-clicked");
    // Confetti for initial "Yes" click
    createConfetti(50); // Less confetti for initial click
    setTimeout(() => {
      yesBtn.classList.remove("btn-clicked");
      startMessageSequence();
    }, 500);
  } else {
    yesBtn.classList.add("final-btn-clicked");
    // Bigger confetti explosion for final "Hell Yes!"
    createConfetti(150, true); // More confetti, and isExplosion = true
    setTimeout(() => {
      yesBtn.classList.remove("final-btn-clicked");
      showFinalMessage();
    }, 500);
  }
});

function startMessageSequence() {
  yesBtn.disabled = true;
  messages.forEach((msg, index) => {
    setTimeout(() => {
      const messageDiv = document.createElement("div");
      messageDiv.className = "message fade-in";
      messageDiv.innerHTML = msg.text;
      if (index === 12) {
        psContainer.appendChild(messageDiv);
      } else {
        messageContainer.appendChild(messageDiv);
      }
      if (index === 11) {
        setTimeout(() => {
          isFinalQuestion = true;
          yesBtn.disabled = false;
          yesBtn.textContent = "Hell Yes! 🎉";
        }, msg.delay);
      }
    }, index * 2500);
  });
}

function showFinalMessage() {
  const finalMessage = document.createElement("div");
  finalMessage.className = "message final-message";
  finalMessage.innerHTML =
    "Yay!!! 🥳 I'll pick you up in taxi at 5:30ish 🚖 from your place. See ya!! 💐";
  messageContainer.appendChild(finalMessage);
  yesBtn.style.display = "none";
  noBtn.style.display = "none";
}

noBtn.addEventListener("mousemove", () => {
  noBtn.style.position = "fixed"; // Add this line
  const containerRect = messageContainer.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const maxX = containerRect.width - btnRect.width;
  const maxY = containerRect.height - btnRect.height;
  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  // Smoothly update position using CSS transition (noBtn style is updated directly)
  noBtn.style.left = containerRect.left + randomX + "px";
  noBtn.style.top = containerRect.top + randomY + "px";
});

noBtn.addEventListener("click", (e) => {
  e.preventDefault();
});

function createHearts() {
  const heartsContainer = document.querySelector(".hearts");
  for (let i = 0; i < 20; i++) {
    const flower = document.createElement("div");
    flower.className = "heart";
    flower.innerHTML = "🌸";
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.animationDelay = Math.random() * 2 + "s";
    heartsContainer.appendChild(flower);
  }
}
createHearts();

function createConfetti(numConfetti, isExplosion = false) {
  for (let i = 0; i < numConfetti; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw"; // Random horizontal position
    confetti.style.animationDelay = Math.random() * 0.5 + "s"; // Staggered animation start
    confetti.style.setProperty(
      "--confetti-drift",
      (Math.random() - 0.5) * 400 + "px"
    ); // Random drift left/right

    if (isExplosion) {
      confetti.style.animationDuration = "1.5s"; // Shorter duration for explosion
      confetti.style.transform = "scale(0.5)"; // Smaller starting size for explosion effect
      confetti.style.opacity = "0.8";
      confetti.style.animationName = "confetti-explosion-fall, confetti-rotate"; // Different fall animation for explosion
      confetti.style.setProperty(
        "--explosion-distance",
        Math.random() * 300 + "px"
      ); // Explosion distance
    }
    confettiContainer.appendChild(confetti);
  }
  // Remove confetti after animation completes
  setTimeout(() => {
    confettiContainer.innerHTML = ""; // Clear the container
  }, 3000); // Remove after animation duration + buffer
}

// Optional: Explosion specific animation - Add to your CSS if you want explosion to be distinct
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
@keyframes confetti-explosion-fall {
  0% {
    top: 0%;
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(var(--explosion-distance)) scale(0.8); /* Expand and fall */
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
    transform: translateY(var(--explosion-distance)) scale(0.3); /* Shrink as it disappears */
  }
}
`;
document.head.appendChild(styleSheet);
