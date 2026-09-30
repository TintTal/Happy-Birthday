// ==========================================
// 💗 CUSTOMIZE YOUR BIRTHDAY WEBSITE HERE
// ==========================================
// Change any text between the quotes. Keep the quotes and commas!
// Never type his real name; the site only shows the names below.

// --- How you address him ---
const boyfriendDisplayName = "My Love";   // opening + final title
const nameLetter = "Mi Amore";            // love letter
const nameCute   = "Sweetie";             // little message
const nameFinal  = "Sweetheart";          // cake + final message

// --- Welcome + little message ---
const welcomeText = "I can't be beside you on your birthday yet, so I made this little world for you instead. Take your time. Open everything slowly.";
const cuteMessage = "You make my days softer and my nights brighter. Even from far away, you feel close to me. I hope you feel that today.";

// --- Love letter (one string = one paragraph) ---
const loveLetter = [
  "I've been thinking about how to tell you what you mean to me, and the simplest way is this: you're really special to me.",
  "I'm so grateful to have you. Talking to you has become my favourite part of the day, and somehow you make even ordinary conversations feel important.",
  "Distance can't erase what we have. I feel connected to you every time we talk, and that doesn't stop just because we're in different places.",
  "I wish I could celebrate beside you today. Since I can't, I hope this birthday brings you lots of happiness, laughter and people who love you.",
  "And someday, I'm looking forward to all the things we'll get to experience together. I'm already smiling about it."
];
const letterSignature = "Always yours ❤️";

// --- Things I adore (title, icon, message) ---
const adoreCards = [
  { icon: "😊", title: "Your smile", msg: "Even through a screen, it can fix my whole mood." },
  { icon: "🎧", title: "Your voice", msg: "I could listen to it for hours. Please never doubt that." },
  { icon: "😂", title: "The way you make me laugh", msg: "You have a talent for it and you don't even try." },
  { icon: "🤍", title: "The way you care", msg: "You notice the small things. That means the world to me." },
  { icon: "🌙", title: "Your little habits", msg: "The tiny quirks that make you, you. I love every one." },
  { icon: "💬", title: "The way you talk to me", msg: "Soft, honest, and so easy. I feel at home in our chats." },
  { icon: "✨", title: "Ordinary conversations", msg: "You turn a normal day into something I look forward to." },
  { icon: "💗", title: "Simply... you", msg: "No list is long enough. I just adore you." }
];

// --- Photos (put files in the images folder; caption shows in the lightbox) ---
const photos = [
  { src: "images/photo1.jpg", caption: "🤍" },
  { src: "images/photo2.jpg", caption: "One of my favorite memories. ❤️" },
  { src: "images/photo3.jpg", caption: "💗" },
  { src: "images/photo4.jpg", caption: "Us, always. 💖" }
];

// --- Birthday wish (after blowing out candles) ---
const birthdayMessage = "Whatever you wished for today,\nI hope life brings you even more than you asked for.";

// --- Final message (each line is typed out one by one) ---
const finalLines = [
  "I wish I could be beside you today.",
  "I wish I could celebrate your birthday with you in person.",
  "But until that day comes, I wanted to give you this little piece of my heart.",
  "The distance may separate us physically, but it doesn't stop me from caring about you, thinking about you, and wishing the best for you."
];
const finalClosing = "Happy Birthday, " + nameFinal + ". ❤️";
const finalFrom = "From your girl, with all my love.";

// --- Hidden secret ---
const secretMessage = "Just so you know: you're on my mind more often than you'd guess. 💗";

// ==========================================
// ✨ Everything below makes the website work.
// You don't need to edit it.
// ==========================================
const $ = (s) => document.querySelector(s);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* Typing animation: writes text into an element letter by letter */
function typeText(el, text, speed = 35) {
  return new Promise((resolve) => {
    if (reduceMotion) { el.textContent = text; return resolve(); }
    let i = 0;
    (function step() {
      el.textContent = text.slice(0, ++i);
      i < text.length ? setTimeout(step, speed) : resolve();
    })();
  });
}

/* ---------- Fill in text & build sections ---------- */
function names() {
  const map = { display: boyfriendDisplayName, letter: nameLetter, cute: nameCute, final: nameFinal };
  document.querySelectorAll("[data-name]").forEach((el) => {
    el.textContent = map[el.dataset.name] + (el.dataset.suffix || "");
  });
}

function build() {
  names();
  $("#welcomeText").textContent = welcomeText;
  $("#messageText").textContent = cuteMessage;
  $("#letterSign").textContent = letterSignature;
  $("#letterBody").innerHTML = loveLetter.map((p) => "<p></p>").join("");
  document.querySelectorAll("#letterBody p").forEach((p, i) => (p.textContent = loveLetter[i]));

  // Adore cards
  adoreCards.forEach((c, i) => {
    const b = document.createElement("button");
    b.className = `card glass a${i % 4} m${i % 3}`;
    b.innerHTML = `<span class="ico">${c.icon}</span><span class="ttl"></span><span class="msg"></span>`;
    b.querySelector(".ttl").textContent = c.title;
    b.querySelector(".msg").textContent = c.msg;
    b.addEventListener("click", () => { b.classList.toggle("open"); if (b.classList.contains("open")) sparkleAt(b); });
    $("#adoreCards").appendChild(b);
  });

  // Gallery (if an image is missing, a soft gradient tile shows instead)
  photos.forEach((p, i) => {
    const b = document.createElement("button");
    b.className = "photo";
    b.innerHTML = `<img alt=""><span></span>`;
    const img = b.querySelector("img");
    img.src = p.src;
    img.alt = p.caption;
    img.onerror = () => { img.style.display = "none"; };
    b.querySelector("span").textContent = p.caption;
    b.addEventListener("click", () => openLightbox(i));
    $("#gallery").appendChild(b);
  });

  $("#secretText").textContent = secretMessage;
}

/* Fade-in items as they scroll into view (currently unused, safe to ignore) */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.2 });
function watchReveals() { document.querySelectorAll(".reveal").forEach((el) => io.observe(el)); }

/* ---------- Opening transition + step-by-step reveal ---------- */
function openSurprise() {
  $("#openBtn").disabled = true;
  // Start the music. This click counts as the "permission" browsers require.
  $("#audio").play().then(() => $("#musicBtn").classList.add("playing")).catch(() => {});
  $("#flash").classList.add("go");
  setTimeout(() => $("#intro").classList.add("leave"), 500);
  setTimeout(() => {
    $("#intro").classList.add("hidden");
    $("#main").classList.remove("hidden");
    $("#musicBtn").classList.remove("hidden");
    $("#c-welcome").classList.add("show");
    window.scrollTo(0, 0);
  }, 1400);
}

function revealChapter(id) {
  const ch = document.getElementById(id);
  ch.classList.remove("hidden");
  ch.classList.add("show");
  ch.scrollIntoView({ behavior: "smooth", block: "start" });
  if (id === "c-letter") document.querySelectorAll("#letterBody p").forEach((p, i) => setTimeout(() => p.classList.add("in"), 500 + i * 900));
  watchReveals();
}

/* ---------- Lightbox ---------- */
let lbIndex = 0;
function openLightbox(i) { lbIndex = i; showLb(); $("#lightbox").classList.remove("hidden"); }
function showLb() {
  const p = photos[lbIndex];
  $("#lbImg").src = p.src; $("#lbImg").alt = p.caption; $("#lbCap").textContent = p.caption;
}
function stepLb(d) { lbIndex = (lbIndex + d + photos.length) % photos.length; showLb(); }
const closeLb = () => $("#lightbox").classList.add("hidden");

/* ---------- Cake ---------- */
async function makeWish() {
  const cake = $("#cake");
  $("#wishBtn").classList.add("hidden");
  cake.classList.add("wishing");
  await wait(2200);
  cake.classList.remove("wishing");
  cake.classList.add("out");
  for (let i = 0; i < 14; i++) sparkleAt(cake);
  await wait(1200);
  $("#wishText").textContent = birthdayMessage;
  $("#wishText").classList.remove("hidden");
  await wait(1800);
  $("#surpriseBtn").classList.remove("hidden");
}

/* ---------- Final surprise ---------- */
async function startFinal() {
  $("#surpriseBtn").classList.add("hidden");
  revealChapter("c-final");
  const body = $("#finalBody");
  await wait(2000);
  for (const line of finalLines) {
    const p = document.createElement("p"); body.appendChild(p);
    await typeText(p, line, 30);
    await wait(900);
  }
  const c = document.createElement("p"); c.className = "closing"; body.appendChild(c);
  await typeText(c, finalClosing, 70);
  await wait(900);
  const f = document.createElement("p"); f.className = "from"; body.appendChild(f);
  await typeText(f, finalFrom, 50);
  await wait(800);
  startHeart();
}

/* ---------- Music ---------- */
function toggleMusic() {
  const a = $("#audio"), b = $("#musicBtn");
  if (a.paused) {
    a.play().then(() => b.classList.add("playing")).catch(() => alert("Add your song at audio/birthday-song.mp3 to hear music 🎵"));
  } else { a.pause(); b.classList.remove("playing"); }
}

/* ---------- Background: stars, particles, floating hearts ---------- */
const bg = $("#bg"), bx = bg.getContext("2d");
let stars = [], hearts = [];
function sizeBg() {
  bg.width = innerWidth; bg.height = innerHeight;
  const n = Math.min(140, Math.floor(innerWidth * innerHeight / 9000));
  stars = Array.from({ length: n }, () => ({ x: Math.random() * bg.width, y: Math.random() * bg.height, r: Math.random() * 1.4 + .3, p: Math.random() * 6.28, s: Math.random() * .02 + .005 }));
  hearts = Array.from({ length: 14 }, () => newHeart(true));
}
function newHeart(anywhere) {
  return { x: Math.random() * bg.width, y: anywhere ? Math.random() * bg.height : bg.height + 20, s: Math.random() * 10 + 8, v: Math.random() * .4 + .15, o: Math.random() * .4 + .2, w: Math.random() * 6.28 };
}
function drawBg() {
  bx.clearRect(0, 0, bg.width, bg.height);
  stars.forEach((s) => {
    s.p += s.s;
    bx.globalAlpha = .4 + Math.sin(s.p) * .4;
    bx.fillStyle = "#fff";
    bx.beginPath(); bx.arc(s.x, s.y, s.r, 0, 6.28); bx.fill();
  });
  hearts.forEach((h, i) => {
    h.y -= h.v; h.w += .015;
    if (h.y < -20) hearts[i] = newHeart(false);
    bx.globalAlpha = h.o; bx.font = h.s + "px serif"; bx.fillStyle = "#ff9bd6";
    bx.shadowColor = "#ff7ac8"; bx.shadowBlur = 10;
    bx.fillText("♥", h.x + Math.sin(h.w) * 14, h.y);
    bx.shadowBlur = 0;
  });
  if (!reduceMotion) requestAnimationFrame(drawBg);
}

/* Little sparkle hearts that pop from an element */
function sparkleAt(el) {
  const r = el.getBoundingClientRect();
  const s = document.createElement("span");
  s.textContent = ["✨", "💗", "♥"][Math.floor(Math.random() * 3)];
  s.style.cssText = `position:fixed;left:${r.left + Math.random() * r.width}px;top:${r.top + Math.random() * r.height}px;z-index:45;pointer-events:none;transition:all 1.4s ease-out;opacity:1;font-size:18px`;
  document.body.appendChild(s);
  requestAnimationFrame(() => { s.style.transform = `translateY(-70px) scale(1.4)`; s.style.opacity = 0; });
  setTimeout(() => s.remove(), 1500);
}

/* ---------- Final glowing particle heart ---------- */
function startHeart() {
  const cv = $("#heartCanvas"), ctx = cv.getContext("2d");
  const size = cv.clientWidth, dpr = Math.min(devicePixelRatio || 1, 2);
  cv.width = cv.height = size * dpr; ctx.scale(dpr, dpr);
  cv.classList.add("on");
  const N = 500, pts = [];
  for (let i = 0; i < N; i++) {
    const t = Math.random() * 6.28, k = i < N * .45 ? 1 : Math.sqrt(Math.random()); // 45% outline, rest fills inside
    const hx = 16 * Math.pow(Math.sin(t), 3), hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    pts.push({ tx: hx * k, ty: hy * k, x: (Math.random() - .5) * 40, y: (Math.random() - .5) * 40, r: Math.random() * 1.8 + .6, ph: Math.random() * 6.28 });
  }
  let t0 = performance.now();
  (function frame(now) {
    const time = (now - t0) / 1000, pulse = 1 + Math.sin(time * 2.2) * .04;
    const sc = (size / 40) * pulse, cx = size / 2, cy = size / 2 + size * .02;
    ctx.clearRect(0, 0, size, size);
    ctx.globalCompositeOperation = "lighter";
    pts.forEach((p) => {
      p.x += (p.tx - p.x) * .02; p.y += (p.ty - p.y) * .02;    // slowly drift into place
      const a = .5 + Math.sin(time * 2 + p.ph) * .3;
      ctx.fillStyle = `rgba(255,${130 + Math.floor(p.ph * 15)},210,${a})`;
      ctx.beginPath(); ctx.arc(cx + p.x * sc, cy + p.y * sc, p.r, 0, 6.28); ctx.fill();
    });
    ctx.globalCompositeOperation = "source-over";
    if (!reduceMotion) requestAnimationFrame(frame);
  })(performance.now());
}

/* ---------- Wire up all buttons ---------- */
build();
sizeBg(); drawBg();
addEventListener("resize", sizeBg);
if (!reduceMotion) typeText($("#introSub"), "Today, I made a little world just for you...", 55);

$("#openBtn").addEventListener("click", openSurprise);
document.querySelectorAll(".next").forEach((b) => b.addEventListener("click", () => { revealChapter(b.dataset.next); b.classList.add("hidden"); }));
$("#wishBtn").addEventListener("click", makeWish);
$("#surpriseBtn").addEventListener("click", startFinal);
$("#musicBtn").addEventListener("click", toggleMusic);
$("#lbClose").addEventListener("click", closeLb);
$("#lbPrev").addEventListener("click", () => stepLb(-1));
$("#lbNext").addEventListener("click", () => stepLb(1));
$("#lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") closeLb(); });
$("#secretBtn").addEventListener("click", () => $("#secretModal").classList.remove("hidden"));
$("#secretClose").addEventListener("click", () => $("#secretModal").classList.add("hidden"));
addEventListener("keydown", (e) => {
  if ($("#lightbox").classList.contains("hidden")) return;
  if (e.key === "Escape") closeLb();
  if (e.key === "ArrowLeft") stepLb(-1);
  if (e.key === "ArrowRight") stepLb(1);
});