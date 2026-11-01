// ===== Course content. Add or edit lessons here: no other file needs to change. =====

const toKata = s => [...s].map(ch => {
  const n = ch.charCodeAt(0);
  return n >= 0x3041 && n <= 0x3096 ? String.fromCharCode(n + 0x60) : ch;
}).join("");

// [id, hiragana string, romaji list, pairs?]
const H = [
  ["a", "あいうえお", ["a","i","u","e","o"]],
  ["ka", "かきくけこ", ["ka","ki","ku","ke","ko"]],
  ["sa", "さしすせそ", ["sa","shi","su","se","so"]],
  ["ta", "たちつてと", ["ta","chi","tsu","te","to"]],
  ["na", "なにぬねの", ["na","ni","nu","ne","no"]],
  ["ha", "はひふへほ", ["ha","hi","fu","he","ho"]],
  ["ma", "まみむめも", ["ma","mi","mu","me","mo"]],
  ["ya", "やゆよ", ["ya","yu","yo"]],
  ["ra", "らりるれろ", ["ra","ri","ru","re","ro"]],
  ["wa", "わをん", ["wa","wo","n"]]
];
const V = [
  ["ga", "がぎぐげご", ["ga","gi","gu","ge","go"]],
  ["za", "ざじずぜぞ", ["za","ji","zu","ze","zo"]],
  ["da", "だぢづでど", ["da","ji","zu","de","do"]],
  ["ba", "ばびぶべぼ", ["ba","bi","bu","be","bo"]],
  ["pa", "ぱぴぷぺぽ", ["pa","pi","pu","pe","po"]]
];
const C = [
  ["ky", "きゃきゅきょ", ["kya","kyu","kyo"], true],
  ["sh", "しゃしゅしょ", ["sha","shu","sho"], true],
  ["ch", "ちゃちゅちょ", ["cha","chu","cho"], true],
  ["ny", "にゃにゅにょ", ["nya","nyu","nyo"], true],
  ["hy", "ひゃひゅひょ", ["hya","hyu","hyo"], true],
  ["my", "みゃみゅみょ", ["mya","myu","myo"], true],
  ["ry", "りゃりゅりょ", ["rya","ryu","ryo"], true]
];

function build(rows, kata) {
  return rows.map(([id, s, r, pair]) => {
    const str = kata ? toKata(s) : s;
    const chars = pair ? r.map((_, i) => str.slice(i * 2, i * 2 + 2)) : [...str];
    return { id, label: chars[0] + " row", items: chars.map((c, i) => ({ c, r: r[i] })) };
  });
}

export const KANA = {
  hira: build(H, false), kata: build(H, true),
  hiraV: build(V, false), kataV: build(V, true),
  hiraC: build(C, false), kataC: build(C, true)
};

export const UNITS = [
  { n: 1, en: "Japanese Foundation", ta: "ஜப்பானிய அடிப்படை", days: [1, 7] },
  { n: 2, en: "Beginner Japanese", ta: "தொடக்க ஜப்பானிய மொழி", days: [8, 14] },
  { n: 3, en: "Grammar and Sentence Building", ta: "இலக்கணமும் வாக்கிய அமைப்பும்", days: [15, 22] },
  { n: 4, en: "N5 Exam Preparation", ta: "N5 தேர்வுத் தயாரிப்பு", days: [23, 30] }
];

export const ROADMAP = [
  ["Introduction to Japanese", "ஜப்பானிய மொழி அறிமுகம்"],
  ["Hiragana I (か さ た)", "ஹிரகானா I (か さ た)"],
  ["Hiragana II (な は ま)", "ஹிரகானா II (な は ま)"],
  ["Hiragana III (や ら わ ん)", "ஹிரகானா III (や ら わ ん)"],
  ["Hiragana Mastery", "ஹிரகானா தேர்ச்சி"],
  ["Katakana I", "கடகானா I"],
  ["Katakana II + Kana test", "கடகானா II + தேர்வு"],
  ["Greetings", "வாழ்த்துகள்"],
  ["Numbers and Time", "எண்கள் மற்றும் நேரம்"],
  ["Basic Sentences (です)", "அடிப்படை வாக்கியங்கள் (です)"],
  ["Particles I (は の も)", "துகள்கள் I (は の も)"],
  ["Demonstratives (これ それ あれ)", "சுட்டுச் சொற்கள் (これ それ あれ)"],
  ["Places (ここ そこ あそこ)", "இடங்கள் (ここ そこ あそこ)"],
  ["Questions", "கேள்விகள்"],
  ["Verbs", "வினைச்சொற்கள்"],
  ["Present and Negative (ます / ません)", "நிகழ்காலமும் எதிர்மறையும்"],
  ["Past Tense (ました)", "இறந்தகாலம் (ました)"],
  ["Particles II (を に で へ)", "துகள்கள் II (を に で へ)"],
  ["I-Adjectives", "இ-பெயரடைகள்"],
  ["Na-Adjectives", "நா-பெயரடைகள்"],
  ["Existence (あります / います)", "இருப்பு (あります / います)"],
  ["Te-Form and Requests", "தெ-வடிவமும் வேண்டுகோளும்"],
  ["Kanji I: Numbers and Days", "காஞ்சி I: எண்கள், நாட்கள்"],
  ["Kanji II: People, Body and Actions", "காஞ்சி II: மனிதர்கள், உடல், செயல்கள்"],
  ["Kanji III: Nature, Places and Descriptions", "காஞ்சி III: இயற்கை, இடங்கள், விளக்கங்கள்"],
  ["Vocabulary Revision", "சொற்களஞ்சிய மீள்பார்வை"],
  ["Reading Practice", "வாசிப்புப் பயிற்சி"],
  ["Listening Practice", "கேட்டல் பயிற்சி"],
  ["Mock Examination", "மாதிரித் தேர்வு"],
  ["Final Assessment", "இறுதி மதிப்பீடு"]
];

const pick = (set, idx) => idx.flatMap(i => set[i].items);
const all = rows => rows.flatMap(r => r.items);

const v = (jp, ro, en, ta, say) => (say ? { jp, say, ro, en, ta } : { jp, ro, en, ta });
const qz = (qEn, qTa, opts, a, eEn, eTa) => ({ q: [qEn, qTa], opts, a, e: [eEn, eTa] });

const kanaTips = [
  "Click any character to hear it. Write each one 5 times on paper or on the Kana page writing pad.",
  "எந்த எழுத்தையும் அழுத்தினால் ஒலி கேட்கும். ஒவ்வொன்றையும் 5 முறை எழுதிப் பழகுங்கள்."
];

// LESSONS: full set 1–30
export const LESSONS = {
  1: { /* vowels, writing systems */ objectives:[["Understand the three Japanese writing systems","மூன்று ஜப்பானிய எழுத்து முறைகளைப் புரிந்துகொள்ளுதல்"],["Recognise and read the five vowels あ い う え お","ஐந்து உயிரொலிகளை அடையாளம் காணுதல்"],["Learn basic pronunciation","அடிப்படை உச்சரிப்பைக் கற்றல்"]], intro:["Japanese uses three scripts: Hiragana (basic sounds and grammar), Katakana (foreign words) and Kanji (characters with meaning, borrowed from Chinese). Japanese vowels are short and clear, just like Tamil: あ ≈ அ, い ≈ இ, う ≈ உ, え ≈ எ, お ≈ ஒ.","ஜப்பானிய மொழியில் மூன்று எழுத்து முறைகள் உள்ளன..."], kana:pick(KANA.hira,[0]) },
  2: { /* Hiragana rows か さ た */ objectives:[["Read and write the か, さ, た rows","か, さ, た வரிசைகளை வாசித்து எழுதுதல்"],["Notice special sounds: し = shi, ち = chi, つ = tsu","சிறப்பு ஒலிகள்: し = shi, ち = chi, つ = tsu"]], intro:["Today: ka, sa and ta rows. Careful: し is “shi”, ち is “chi”, つ is “tsu”.","இன்று: ka, sa, ta வரிசைகள்..."], tips:kanaTips, kana:pick(KANA.hira,[1,2,3]) },
  3: { /* Hiragana rows な は ま */ objectives:[["Read and write the な, は, ま rows","な, は, ま வரிசைகளை வாசித்து எழுதுதல்"]], intro:["Today: na, ha and ma rows. ふ is “fu”. When は is a particle it is read “wa”.","இன்று: na, ha, ma வரிசைகள்..."], tips:kanaTips, kana:pick(KANA.hira,[4,5,6]) },
  4: { /* Hiragana rows や ら わ ん */ objectives:[["Read and write the や, ら, わ rows and ん","や, ら, わ வரிசைகளையும் ん-ஐயும் கற்றல்"]], intro:["Today: ya, ra, wa rows and ん (n).","இன்று: ya, ra, wa வரிசைகள்..."], tips:kanaTips, kana:pick(KANA.hira,[7,8,9]) },
  5: { /* Dakuten, combo sounds */ objectives:[["Add voiced sounds with dakuten ( ゛) and handakuten ( ゜)","゛ மற்றும் ゜ குறிகளுடன் ஒலிகளைக் கற்றல்"],["Read combination sounds like きゃ, しゅ, ちょ","きゃ, しゅ, ちょ போன்ற இணை ஒலிகள்"]], intro:["Two small marks change the sound...","இரண்டு சிறிய புள்ளிகள் ஒலியை மாற்றும்..."], tips:kanaTips, kana:[...all(KANA.hiraV),...all(KANA.hiraC)] },
  6: { /* Katakana I */ objectives:[["Read Katakana ア–ノ rows","கடகானா ア–ノ வரிசைகளை வாசித்தல்"],["Read voiced Katakana","゛ ゜ குறிகளுடன் கடகானா ஒலிகளை வாசித்தல்"]], intro:["Katakana is used for foreign words...","கடகானா வெளிநாட்டுச் சொற்களுக்குப் பயன்படுகிறது..."], tips:kanaTips, kana:[...pick(KANA.kata,[0,1,2,3,4]),...all(KANA.kataV)], vocab:[v("コーヒー","koohii","coffee","காபி"),v("テレビ","terebi","television","டிவி"),v("カメラ","kamera","camera","கேமரா")] },
  7: { /* Katakana II */ objectives:[["Read remaining Katakana rows","மீதமுள்ள கடகானா வரிசைகளை வாசித்தல்"],["Complete the Kana test","கானா தேர்வை முடித்தல்"]], intro:["Finish Katakana: ハ–ン rows...","கடகானாவை முடிப்போம்..."], tips:kanaTips, kana:[...pick(KANA.kata
