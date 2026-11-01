import { firebaseConfig } from "./firebase-config.js";
import { KANA, UNITS, ROADMAP, LESSONS } from "./data.js";

const KEY = "n5academy.v2";
const TOTAL = ROADMAP.length;
const $ = s => document.querySelector(s);
const app = $("#app");
const defaults = () => ({ lang: "en", prog: {}, xp: 0, streak: 0, last: "", unlockAll: false });
const flat = rows => rows.flatMap(r => r.items);

let state = load();
function load() {
  try {
    const s = { ...defaults(), ...JSON.parse(localStorage.getItem(KEY) || "{}") };
    if (s.lang !== "ta") s.lang = "en";
    return s;
  } catch { return defaults(); }
}

// ---------- Cloud (Google login + Firestore) ----------
const configured = !firebaseConfig.apiKey.startsWith("PASTE");
let fb = null, user = null, timer = null;

function save() {
  localStorage.setItem(KEY, JSON.stringify(state));
  if (fb && user) { clearTimeout(timer); timer = setTimeout(pushCloud, 800); }
}
async function pushCloud() {
  try { await fb.setDoc(fb.doc(fb.db, "users", user.uid), { ...state, name: user.displayName || "", updated: Date.now() }); }
  catch (e) { console.warn(e); }
}
async function pullCloud() {
  try {
    const snap = await fb.getDoc(fb.doc(fb.db, "users", user.uid));
    if (snap.exists()) merge(snap.data());
    localStorage.setItem(KEY, JSON.stringify(state));
    await pushCloud();
  } catch (e) { console.warn(e); }
}
function merge(r) {
  const prog = { ...(r.prog || {}) };
  for (const [d, s] of Object.entries(state.prog)) prog[d] = Math.max(prog[d] ?? 0, s);
  const base = (r.xp || 0) > state.xp ? r : state;
  state = { ...state, prog, xp: Math.max(state.xp, r.xp || 0), streak: base.streak || 0,
            last: base.last || "",
            lang: (r.lang === "ta" || r.lang === "en") ? r.lang : state.lang,
            unlockAll: state.unlockAll || !!r.unlockAll };
}
async function initFirebase() {
  if (!configured) return;
  try {
    const V = "10.14.1", B = "https://www.gstatic.com/firebasejs/" + V + "/";
    const [a, au, fs] = await Promise.all([
      import(B + "firebase-app.js"), import(B + "firebase-auth.js"), import(B + "firebase-firestore.js")
    ]);
    const appF = a.initializeApp(firebaseConfig);
    const auth = au.getAuth(appF), db = fs.getFirestore(appF);
    fb = { auth, db, GoogleAuthProvider: au.GoogleAuthProvider, signInWithPopup: au.signInWithPopup,
           signOut: au.signOut, doc: fs.doc, getDoc: fs.getDoc, setDoc: fs.setDoc };
    au.onAuthStateChanged(auth, async u => { user = u; if (u) await pullCloud(); route(); });
  } catch (e) { console.warn("Firebase failed to load", e); }
}

// ---------- Helpers ----------
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const T = p => {
  if (typeof p === "string") return p;
  return state.lang === "ta" ? p[1] : p[0];
};
function speak(text) {
  if (!("speechSynthesis" in window)) return alert("Your browser cannot play speech.");
  const u = new SpeechSynthesisUtterance(text); u.lang = "ja-JP"; u.rate = 0.8;
  speechSynthesis.cancel(); speechSynthesis.speak(u);
}
const dstr = d => d.toLocaleDateString("en-CA");
const today = () => dstr(new Date());
const yesterday = () => { const d = new Date(); d.setDate(d.getDate() - 1); return dstr(d); };
const streakNow = () => (state.last === today() || state.last === yesterday() ? state.streak : 0);
function touch() {
  const t = today(); if (state.last === t) return;
  state.streak = state.last === yesterday() ? state.streak + 1 : 1; state.last = t;
}
const isOpen = d => state.unlockAll || d === 1 || state.prog[d - 1] !== undefined;
const nextLesson = () => { for (let d = 1; d <= TOTAL; d++) if (state.prog[d] === undefined) return d; return TOTAL; };
const bindSpeak = () => app.querySelectorAll("[data-say]").forEach(b => b.onclick = () => speak(b.dataset.say));

// ---------- Quiz ----------
function kanaQuiz(items) {
  const pool = [...new Set(KANA.hira.flatMap(r => r.items.map(i => i.r)))];
  return shuffle(items).slice(0, 6).map(it => {
    const opts = shuffle([it.r, ...shuffle(pool.filter(x => x !== it.r)).slice(0, 3)]);
    return { big: it.c, q: ["What is the reading of this character?", "இந்த எழுத்தை எப்படி வாசிப்பது?"],
      opts, a: opts.indexOf(it.r),
      e: [`${it.c} is read “${it.r}”.`, `${it.c} என்பது “${it.r}” என்று வாசிக்கப்படும்.`] };
  });
}
function vocabQuiz(v) {
  if (v.length < 2) return [];
  return shuffle(v).slice(0, 6).map(w => {
    const opts = shuffle([w, ...shuffle(v.filter(x => x !== w)).slice(0, 3)]);
    return { big: w.jp, q: [`What does this mean? (${w.ro})`, `இதன் பொருள் என்ன? (${w.ro})`],
      opts: opts.map(o => [o.en, o.ta]), a: opts.indexOf(w),
      e: [`${w.jp} (${w.ro}) = ${w.en}`, `${w.jp} (${w.ro}) = ${w.ta}`] };
  });
}
const buildQuiz = L => {
  const qs = [...(L.kana ? kanaQuiz(L.kana) : []), ...(L.vocab ? vocabQuiz(L.vocab) : []), ...(L.extra || [])];
  return qs.length ? qs : [{ q: ["Did you read this lesson?", "இந்தப் பாடத்தைப் படித்தீர்களா?"], opts: [["Yes", "ஆம்"], ["Not yet", "இன்னும் இல்லை"]], a: 0 }];
};

function runQuiz(box, qs, onDone, lesson) {
  let i = 0, right = 0;
  const show = () => {
    const q = qs[i];
    box.innerHTML = `<h3>${T(["Question", "கேள்வி"])} ${i + 1}/${qs.length}</h3>
      ${q.big ? `<div class="big">${q.big}</div>` : ""}<p>${T(q.q)}</p>
      <div class="opts">${q.opts.map((o, k) => `<button class="opt" data-k="${k}">${T(o)}</button>`).join("")}</div>
      <div id="fb"></div>`;
    const btns = box.querySelectorAll(".opt");
    btns.forEach(b => b.onclick = () => {
      const k = +b.dataset.k; btns.forEach(x => x.disabled = true);
      const ok = k === q.a; if (ok) right++;
      b.classList.add(ok ? "good" : "bad"); btns[q.a].classList.add("good");
      box.querySelector("#fb").innerHTML = `<p><b>${ok ? "✅ " + T(["Correct!", "சரி!"]) : "❌ " + T(["Not quite.", "சரியில்லை."])}</b></p>
        ${q.e ? `<p>${T(q.e)}</p>` : ""}
        <button class="btn" id="nx">${i + 1 < qs.length ? T(["Next", "அடுத்தது"]) : T(["Finish", "முடி"])}</button>`;
      box.querySelector("#nx").onclick = () => { i++; i < qs.length ? show() : finish(); };
    });
  };
  const finish = () => {
    const pct = Math.round(right / qs.length * 100);
    const msg = pct >= 90 ? ["Excellent!", "அருமை!"] : pct >= 70 ? ["Completed!", "முடிந்தது!"]
      : pct >= 50 ? ["Needs revision", "மீண்டும் படியுங்கள்"] : ["Retry recommended", "மீண்டும் முயலுங்கள்"];
    onDone(pct);
    box.innerHTML = `<h2>${pct}% (${right}/${qs.length})</h2><p><b>${T(msg)}</b></p>
      <p>${pct >= 70 ? T(["Next lesson unlocked.", "அடுத்த பாடம் திறக்கப்பட்டது."]) : T(["You need 70% to unlock the next lesson.", "அடுத்த பாடத்துக்கு 70% தேவை."])}</p>
      <div class="row"><button class="btn ghost" id="again">${T(["Try again", "மீண்டும்"])}</button>
      ${pct >= 70 && lesson < TOTAL ? `<a class="btn" href="#/lesson/${lesson + 1}">${T(["Next lesson", "அடுத்த பாடம்"])}</a>` : ""}</div>`;
    box.querySelector("#again").onclick = () => runQuiz(box, buildQuiz(LESSONS[lesson]), onDone, lesson);
  };
  show();
}
function complete(lesson, pct) {
  const prev = state.prog[lesson]; touch();
  if (pct >= 70) {
    if (prev === undefined) state.xp += 20;
    if (pct === 100 && prev !== 100) state.xp += 30;
    state.prog[lesson] = Math.max(prev ?? 0, pct);
  }
  save(); renderHeader();
}

// ---------- Views ----------
function banner() {
  if (user) return "";
  return `<div class="banner">${configured
    ? T(["Sign in with Google (top right) to save your progress on every device.", "எல்லா சாதனங்களிலும் முன்னேற்றம் சேமிக்க மேலே Google மூலம் உள்நுழையுங்கள்."])
    : T(["Progress is saved on this device only.", "முன்னேற்றம் இந்த சாதனத்தில் மட்டும் சேமிக்கப்படும்."])}</div>`;
}
function lessonCard(d) {
  const [en, ta] = ROADMAP[d - 1], done = state.prog[d] !== undefined, open = isOpen(d);
  return `<a class="day ${done ? "done" : ""} ${open ? "" : "lock"}" href="#/lesson/${d}">
    <small>${T(["Lesson", "பாடம்"])} ${d}</small><b>${T([en, ta])}</b><span class="tag">${done ? "✅" : open ? "" : "🔒"}</span></a>`;
}
function viewHome() {
  const n = Object.keys(state.prog).length, next = nextLesson(), [en, ta] = ROADMAP[next - 1];
  app.innerHTML = `
    <section class="hero"><div class="jp">日本語 N5</div>
      <h1>${T(["Learn Japanese step by step", "படிப்படியாக ஜப்பானிய மொழி கற்போம்"])}</h1>
      <p>${T([`${TOTAL} small lessons. Kanji, vocabulary and grammar side by side. Free for everyone.`, `${TOTAL} சிறு பாடங்கள். காஞ்சி, சொற்கள், இலக்கணம் ஒன்றாக. அனைவருக்கும் இலவசம்.`])}</p>
      <a class="btn" href="#/lesson/${next}">${T(["Continue: Lesson " + next, "தொடர்க: பாடம் " + next])}</a></section>
    ${banner()}
    <div class="stats">
      <div class="stat"><b>${n}/${TOTAL}</b>${T(["Lessons completed", "முடிந்த பாடங்கள்"])}</div>
      <div class="stat"><b>${state.xp}</b>XP</div>
      <div class="stat"><b>${streakNow()} 🔥</b>${T(["Day streak", "தொடர் நாட்கள்"])}</div>
    </div>
    <div class="card"><div class="bar"><i style="width:${Math.round(n / TOTAL * 100)}%"></i></div>
      <p>${T(["Up next", "அடுத்து"])}: <b>${T(["Lesson", "பாடம்"])} ${next} – ${T([en, ta])}</b></p></div>`;
}
function viewRoadmap() {
  app.innerHTML = `<h1>${T([`Learning Path (${TOTAL} lessons)`, `கற்றல் பாதை (${TOTAL} பாடங்கள்)`])}</h1>` + UNITS.map(u => {
    let h = "";
    for (let d = u.days[0]; d <= u.days[1]; d++) h += lessonCard(d);
    return `<section class="unit"><h2>Unit ${u.n}: ${T([u.en, u.ta])}</h2><div class="days">${h}</div></section>`;
  }).join("");
}
function viewLesson(d) {
  if (!(d >= 1 && d <= TOTAL)) return viewHome();
  const [en, ta] = ROADMAP[d - 1], L = LESSONS[d];
  if (!isOpen(d)) {
    app.innerHTML = `<h1>🔒 ${T(["Lesson", "பாடம்"])} ${d}</h1><div class="card">${T(["Complete the previous lesson (70% or more) to unlock this one.", "இதைத் திறக்க முந்தைய பாடத்தை (70% அல்லது அதற்கு மேல்) முடியுங்கள்."])}</div>
      <a class="btn" href="#/lesson/${nextLesson()}">${T(["Go to my current lesson", "என் தற்போதைய பாடத்துக்குச் செல்"])}</a>`;
    return;
  }
  let h = `<p><a href="#/roadmap">← ${T(["Learning Path", "கற்றல் பாதை"])}</a></p><h1>${T(["Lesson", "பாடம்"])} ${d}: ${T([en, ta])}</h1>`;
  if (!L) {
    h += `<div class="card">${T(["This lesson is coming soon. You can study it from your textbook, then mark it as done to continue.", "இந்த பாடம் விரைவில் வரும். பாடப்புத்தகத்தில் படித்துவிட்டு, தொடர ‘முடிந்தது’ என குறிக்கலாம்."])}</div>
      <button class="btn" id="mark">${T(["Mark as done", "முடிந்தது என குறி"])}</button>`;
    app.innerHTML = h;
    $("#mark").onclick = () => { touch(); state.prog[d] = state.prog[d] ?? 0; save(); location.hash = d < TOTAL ? "#/lesson/" + (d + 1) : "#/roadmap"; };
    return;
  }
  h += `<div class="card"><h3>${T(["Objectives", "நோக்கங்கள்"])}</h3><ul>${L.objectives.map(o => `<li>${T(o)}</li>`).join("")}</ul></div>`;
  h += `<div class="card"><p>${T(L.intro)}</p>${L.tips ? `<p><i>${T(L.tips)}</i></p>` : ""}</div>`;
  if (L.kana) h += `<div class="card"><h3>${T(["Characters", "எழுத்துகள்"])}</h3><div class="grid">${
    L.kana.map(k => `<button class="kana" data-say="${k.c}"><span class="c">${k.c}</span><span class="r">${k.r}</span></button>`).join("")}</div></div>`;
  if (L.vocab) h += `<div class="card"><h3>${T(["Vocabulary and Kanji", "சொற்கள் மற்றும் காஞ்சி"])}</h3><table>${
    L.vocab.map(w => `<tr><td class="jp">${w.jp}</td><td>${w.ro}</td><td>${T([w.en, w.ta])}</td><td><button class="speak" data-say="${w.say || w.jp}">🔊</button></td></tr>`).join("")}</table></div>`;
  if (L.sentences) h += `<div class="card"><h3>${T(["Example sentences", "எடுத்துக்காட்டு வாக்கியங்கள்"])}</h3>${
    L.sentences.map(s => `<p><span class="jp" style="font-size:1.2rem">${s[0]}</span> <button class="speak" data-say="${s[0]}">🔊</button><br>${s[1]}<br>${T([s[2], s[3]])}</p>`).join("")}</div>`;
  h += `<div class="card" id="quizbox"><h3>${T(["Lesson quiz", "பாட வினாடி வினா"])}</h3>
    <p>${T(["Score 70% or more to unlock the next lesson.", "அடுத்த பாடத்தைத் திறக்க 70% அல்லது அதற்கு மேல் பெறுங்கள்."])}</p>
    <button class="btn" id="startq">${T(["Start quiz", "தொடங்கு"])}</button></div>`;
  app.innerHTML = h; bindSpeak();
  $("#startq").onclick = () => runQuiz($("#quizbox"), buildQuiz(L), pct => complete(d, pct), d);
}

let kanaTab = "hira";
const TABS = [["hira", "Hiragana"], ["kata", "Katakana"], ["hiraV", "Hiragana ゛゜"], ["kataV", "Katakana ゛゜"], ["hiraC", "Hiragana きゃ"], ["kataC", "Katakana キャ"]];
function viewKana() {
  app.innerHTML = `<h1>${T(["Kana Studio", "கானா ஸ்டுடியோ"])}</h1>
    <div class="tabs">${TABS.map(([k, n]) => `<button data-t="${k}" class="${k === kanaTab ? "on" : ""}">${n}</button>`).join("")}</div>
    <div class="card"><div class="grid">${flat(KANA[kanaTab]).map(k => `<button class="kana" data-say="${k.c}"><span class="c">${k.c}</span><span class="r">${k.r}</span></button>`).join("")}</div></div>
    <div class="card"><h3>${T(["Writing pad", "எழுதிப் பழகும் பலகை"])}</h3>
      <canvas id="pad" width="320" height="320"></canvas>
      <div class="row"><button class="btn ghost" id="clr">${T(["Clear", "அழி"])}</button></div></div>`;
  app.querySelectorAll("[data-t]").forEach(b => b.onclick = () => { kanaTab = b.dataset.t; viewKana(); });
  bindSpeak();
  const c = $("#pad"), x = c.getContext("2d"); let on = false;
  x.lineWidth = 8; x.lineCap = "round"; x.strokeStyle = "#1d2b4f";
  const pos = e => { const r = c.getBoundingClientRect(); return [(e.clientX - r.left) * c.width / r.width, (e.clientY - r.top) * c.height / r.height]; };
  c.onpointerdown = e => { on = true; x.beginPath(); x.moveTo(...pos(e)); };
  c.onpointermove = e => { if (!on) return; x.lineTo(...pos(e)); x.stroke(); };
  c.onpointerup = c.onpointerleave = () => { on = false; };
  $("#clr").onclick = () => x.clearRect(0, 0, c.width, c.height);
}

let flashScript = "hira";
function viewFlash() {
  const items = flat(flashScript === "hira" ? KANA.hira : KANA.kata);
  let cur = items[Math.floor(Math.random() * items.length)], shown = false;
  app.innerHTML = `<h1>${T(["Flashcards", "ஃபிளாஷ் கார்டுகள்"])}</h1>
    <div class="tabs"><button data-s="hira" class="${flashScript === "hira" ? "on" : ""}">Hiragana</button>
    <button data-s="kata" class="${flashScript === "kata" ? "on" : ""}">Katakana</button></div>
    <div class="flash" id="fc"></div>
    <div class="row"><button class="btn ghost" id="snd">🔊</button><button class="btn" id="nx">${T(["Next card", "அடுத்த அட்டை"])}</button></div>`;
  const draw = () => $("#fc").innerHTML = `<div><div class="big">${cur.c}</div>${shown ? `<div class="rom">${cur.r}</div>`
    : `<small>${T(["Tap to reveal", "பதிலைக் காண அழுத்துங்கள்"])}</small>`}</div>`;
  draw();
  $("#fc").onclick = () => { shown = !shown; draw(); };
  $("#snd").onclick = () => speak(cur.c);
  $("#nx").onclick = () => { cur = items[Math.floor(Math.random() * items.length)]; shown = false; draw(); };
  app.querySelectorAll("[data-s]").forEach(b => b.onclick = () => { flashScript = b.dataset.s; viewFlash(); });
}

function viewProfile() {
  app.innerHTML = `<h1>${T(["Profile", "சுயவிவரம்"])}</h1>
    <div class="card"><p>${user ? `✅ ${T(["Signed in as", "உள்நுழைந்தவர்"])}: <b>${user.displayName || ""}</b> (${user.email})` : T(["Not signed in.", "உள்நுழையவில்லை."])}</p>
      <p>XP: <b>${state.xp}</b> · ${T(["Lessons completed", "முடிந்த பாடங்கள்"])}: <b>${Object.keys(state.prog).length}/${TOTAL}</b> · ${T(["Streak", "தொடர்"])}: <b>${streakNow()}</b></p></div>
    <div class="card"><label><input type="checkbox" id="ua" ${state.unlockAll ? "checked" : ""}> ${T(["Unlock all lessons (revision mode)", "எல்லா பாடங்களையும் திற"])}</label></div>
    <div class="card"><button class="btn ghost" id="rs">${T(["Reset my progress", "என் முன்னேற்றத்தை அழி"])}</button></div>`;
  $("#ua").onchange = e => { state.unlockAll = e.target.checked; save(); };
  $("#rs").onclick = () => { if (confirm("Reset all progress? This cannot be undone.")) { state = defaults(); save(); route(); } };
}

// ---------- Header + router ----------
function renderHeader(page) {
  if (page === undefined) page = (location.hash.slice(1).split("/")[1]) || "";
  document.querySelectorAll("#nav a").forEach(a => a.classList.toggle("on", a.dataset.r === page));
  $("#lang").value = state.lang;
  $("#auth").textContent = user ? "Sign out" : "Sign in with Google";
}
function route() {
  const [, page, arg] = location.hash.slice(1).split("/");
  const p = page || "";
  renderHeader(p);
  const views = { "": viewHome, roadmap: viewRoadmap, kana: viewKana, flash: viewFlash, profile: viewProfile, lesson: () => viewLesson(+arg) };
  (views[p] || viewHome)();
  window.scrollTo(0, 0);
}
$("#lang").onchange = e => { state.lang = e.target.value; save(); route(); };
$("#auth").onclick = async () => {
  if (!configured) return alert("Google sign-in is not set up yet. Fill in firebase-config.js first. Your progress is saved on this device in the meantime.");
  if (!fb) return alert("Still loading, please try again in a moment.");
  try {
    if (user) await fb.signOut(fb.auth);
    else await fb.signInWithPopup(fb.auth, new fb.GoogleAuthProvider());
  } catch (e) { alert("Sign-in failed: " + e.message); }
};
window.addEventListener("hashchange", route);
route();
initFirebase();
