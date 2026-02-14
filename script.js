// --- simple screen router ---
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
}

// --- Screen 1 buttons ---
const btnYes = document.getElementById("btnYes");
const btnNo  = document.getElementById("btnNo");
const noHint = document.getElementById("noHint");

let noCount = 0;

btnYes.addEventListener("click", () => {
  showScreen("screen-gifts");
});

btnNo.addEventListener("click", () => {
  noCount++;
  const messages = [
    "Are you suuuure? 🥺",
    "Prah please… try again 😭",
    "Wrong button 😌",
    "Nope. Not allowed. 😤",
    "Okay okay… but YES is cuter 💗"
  ];
  noHint.textContent = messages[(noCount - 1) % messages.length];

  // playful "run away" effect after a couple clicks
  if (noCount >= 2) {
    const x = Math.random() * 140 - 70;
    const y = Math.random() * 70 - 35;
    btnNo.style.transform = `translate(${x}px, ${y}px)`;
  }
});

// --- Gift navigation + restart hearts ---
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-goto]");
  if (!btn) return;
  const target = btn.getAttribute("data-goto");
  showScreen(target);

  // reset the NO button position when restarting
  if (target === "screen-ask") {
    btnNo.style.transform = "";
    noCount = 0;
    noHint.textContent = "";
  }
});

// --- QR code screen ---
let qr;

function makeQR(text) {
  const holder = document.getElementById("qrcode");
  holder.innerHTML = "";
  qr = new QRCode(holder, {
    text,
    width: 220,
    height: 220
  });
}

const qrText = document.getElementById("qrText");
const btnMakeQR = document.getElementById("btnMakeQR");

// default link (change this to your real surprise link)
const defaultLink = "/Users/stuti/Desktop/valentines site/Gmail - Your tickets for Tu Yaa Main (Hindi) at Vue Westfield Stratford.pdf";
makeQR(defaultLink);
qrText.value = defaultLink;

btnMakeQR.addEventListener("click", () => {
  const val = (qrText.value || "").trim();
  if (!val) return;
  makeQR(val);
});
