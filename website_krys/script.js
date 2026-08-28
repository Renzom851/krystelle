const anniversary = "2026-08-21T00:00:00";

const body = document.body;
const openSeal = document.getElementById("openSeal");
const letterPaper = document.getElementById("letterPaper");
const confettiLayer = document.getElementById("confettiLayer");
const sparkleLayer = document.getElementById("sparkleLayer");
const burstLayer = document.getElementById("burstLayer");
const heartField = document.getElementById("heartField");
const particleField = document.getElementById("particleField");
const hugButton = document.getElementById("hugButton");
const loveModal = document.getElementById("loveModal");
const closeModal = document.getElementById("closeModal");
const heartCursor = document.getElementById("heartCursor");

const heartSymbols = ["♡", "♥", "💗", "💕", "💖", "🩷"];
const sparkleSymbols = ["✦", "♡", "✧", "💗"];
const romanticColors = ["#ff69b4", "#ff8ec8", "#ffd6e7", "#ff3f9f", "#ffd36e"];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function createAmbientHearts() {
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < 38; index += 1) {
    const heart = document.createElement("span");
    heart.className = "float-heart";
    heart.textContent = randomItem(heartSymbols);
    heart.style.setProperty("--left", `${randomBetween(0, 100)}vw`);
    heart.style.setProperty("--size", `${randomBetween(1.1, 3.2)}rem`);
    heart.style.setProperty("--duration", `${randomBetween(12, 24)}s`);
    heart.style.setProperty("--delay", `${randomBetween(-24, 2)}s`);
    heart.style.setProperty("--sway", `${randomBetween(-90, 90)}px`);
    heart.style.setProperty("--spin", `${randomBetween(-70, 70)}deg`);
    heart.style.setProperty("--color", randomItem(romanticColors));
    fragment.appendChild(heart);
  }

  heartField.appendChild(fragment);
}

function createParticles() {
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < 72; index += 1) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.setProperty("--left", `${randomBetween(0, 100)}vw`);
    particle.style.setProperty("--top", `${randomBetween(0, 100)}vh`);
    particle.style.setProperty("--size", `${randomBetween(2, 5)}px`);
    particle.style.setProperty("--duration", `${randomBetween(2.6, 6.4)}s`);
    particle.style.setProperty("--delay", `${randomBetween(-6, 1)}s`);
    fragment.appendChild(particle);
  }

  particleField.appendChild(fragment);
}

function launchHeartConfetti() {
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < 92; index += 1) {
    const confetti = document.createElement("span");
    confetti.className = "confetti-heart";
    confetti.textContent = randomItem(heartSymbols);
    confetti.style.setProperty("--left", `${randomBetween(0, 100)}vw`);
    confetti.style.setProperty("--size", `${randomBetween(0.9, 1.9)}rem`);
    confetti.style.setProperty("--duration", `${randomBetween(2.6, 4.8)}s`);
    confetti.style.setProperty("--delay", `${randomBetween(0, 0.85)}s`);
    confetti.style.setProperty("--sway", `${randomBetween(-130, 130)}px`);
    confetti.style.setProperty("--spin", `${randomBetween(-360, 360)}deg`);
    confetti.style.setProperty("--color", randomItem(romanticColors));
    fragment.appendChild(confetti);
  }

  confettiLayer.appendChild(fragment);
  window.setTimeout(() => {
    confettiLayer.replaceChildren();
  }, 5600);
}

function openLetter() {
  if (body.classList.contains("letter-open")) {
    return;
  }

  body.classList.add("letter-open");
  launchHeartConfetti();

  window.setTimeout(() => {
    body.classList.add("letter-settled");
    letterPaper.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 1900);
}

function updateLoveTimer() {
  const start = new Date(anniversary).getTime();
  const now = Date.now();
  let difference = Math.max(0, now - start);

  const days = Math.floor(difference / 86400000);
  difference %= 86400000;

  const hours = Math.floor(difference / 3600000);
  difference %= 3600000;

  const minutes = Math.floor(difference / 60000);
  difference %= 60000;

  const seconds = Math.floor(difference / 1000);

  document.querySelector('[data-time="days"]').textContent = String(days);
  document.querySelector('[data-time="hours"]').textContent = String(hours).padStart(2, "0");
  document.querySelector('[data-time="minutes"]').textContent = String(minutes).padStart(2, "0");
  document.querySelector('[data-time="seconds"]').textContent = String(seconds).padStart(2, "0");
}

function createSparkle(x, y) {
  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.textContent = randomItem(sparkleSymbols);
  sparkle.style.setProperty("--x", `${x}px`);
  sparkle.style.setProperty("--y", `${y}px`);
  sparkle.style.setProperty("--size", `${randomBetween(0.8, 1.35)}rem`);
  sparkle.style.setProperty("--drift-x", `${randomBetween(-28, 28)}px`);
  sparkle.style.setProperty("--drift-y", `${randomBetween(-38, -12)}px`);
  sparkle.style.setProperty("--sparkle-color", randomItem(romanticColors));
  sparkleLayer.appendChild(sparkle);

  window.setTimeout(() => {
    sparkle.remove();
  }, 900);
}

let lastSparkle = 0;

function handlePointerSparkle(event) {
  const now = performance.now();
  if (now - lastSparkle < 42) {
    return;
  }

  lastSparkle = now;
  createSparkle(event.clientX, event.clientY);
}

function explodeHearts(x, y) {
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < 74; index += 1) {
    const angle = (Math.PI * 2 * index) / 74 + randomBetween(-0.18, 0.18);
    const distance = randomBetween(90, 290);
    const burst = document.createElement("span");
    burst.className = "burst-heart";
    burst.textContent = randomItem(heartSymbols);
    burst.style.setProperty("--x", `${x}px`);
    burst.style.setProperty("--y", `${y}px`);
    burst.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    burst.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
    burst.style.setProperty("--spin", `${randomBetween(-240, 240)}deg`);
    burst.style.setProperty("--size", `${randomBetween(1, 2.3)}rem`);
    burst.style.setProperty("--color", randomItem(romanticColors));
    fragment.appendChild(burst);
  }

  burstLayer.appendChild(fragment);
  window.setTimeout(() => {
    burstLayer.replaceChildren();
  }, 1200);
}

function openLoveModal() {
  loveModal.classList.add("is-open");
  loveModal.setAttribute("aria-hidden", "false");
  closeModal.focus();
}

function closeLoveModal() {
  loveModal.classList.remove("is-open");
  loveModal.setAttribute("aria-hidden", "true");
  hugButton.focus();
}

function triggerHug(event) {
  const rect = hugButton.getBoundingClientRect();
  const x = event?.clientX || rect.left + rect.width / 2;
  const y = event?.clientY || rect.top + rect.height / 2;

  explodeHearts(x, y);
  body.classList.add("hug-zoom");

  window.setTimeout(() => {
    body.classList.remove("hug-zoom");
    openLoveModal();
  }, 520);
}

function setupSecretNotes() {
  document.querySelectorAll(".note-heart").forEach((note) => {
    note.addEventListener("click", () => {
      note.classList.toggle("is-flipped");
    });
  });
}

function setupHeartCursor() {
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (!finePointer) {
    return;
  }

  document.addEventListener("pointermove", (event) => {
    heartCursor.style.left = `${event.clientX}px`;
    heartCursor.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll("button, a, .romantic-trigger").forEach((item) => {
    item.addEventListener("pointerenter", () => heartCursor.classList.add("is-visible"));
    item.addEventListener("pointerleave", () => heartCursor.classList.remove("is-visible"));
  });
}

createAmbientHearts();
createParticles();
setupSecretNotes();
setupHeartCursor();
updateLoveTimer();
window.setInterval(updateLoveTimer, 1000);

openSeal.addEventListener("click", openLetter);
document.addEventListener("pointermove", handlePointerSparkle);
hugButton.addEventListener("click", triggerHug);
closeModal.addEventListener("click", closeLoveModal);

loveModal.addEventListener("click", (event) => {
  if (event.target === loveModal) {
    closeLoveModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && loveModal.classList.contains("is-open")) {
    closeLoveModal();
  }
});
