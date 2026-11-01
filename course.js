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

// Short helpers used by the newer lessons.
// v(...)  = one vocabulary word. "say" is optional: the hiragana the speaker should read aloud.
// qz(...) = one quiz question. "a" is the index (0 = first option) of the correct answer.
const v = (jp, ro, en, ta, say) => (say ? { jp, say, ro, en, ta } : { jp, ro, en, ta });
let qzCount = 0;
const qz = (qEn, qTa, opts, a, eEn, eTa) => {
  // Put the right answer in a different button position each time (not always the first one).
  const right = opts[a];
  const rest = opts.filter((_, i) => i !== a);
  const pos = qzCount++ % opts.length;
  rest.splice(pos, 0, right);
  return { q: [qEn, qTa], opts: rest, a: pos, e: [eEn, eTa] };
};

const kanaTips = [
  "Click any character to hear it. Write each one 5 times on paper or on the Kana page writing pad.",
  "எந்த எழுத்தையும் அழுத்தினால் ஒலி கேட்கும். ஒவ்வொன்றையும் 5 முறை எழுதிப் பழகுங்கள்."
];

// LESSONS: kana = characters to learn, vocab = words, sentences = examples, extra = hand-written quiz questions
export const LESSONS = {
  1: {
    objectives: [
      ["Understand the three Japanese writing systems", "மூன்று ஜப்பானிய எழுத்து முறைகளைப் புரிந்துகொள்ளுதல்"],
      ["Recognise and read the five vowels あ い う え お", "ஐந்து உயிரொலிகளை அடையாளம் காணுதல்"],
      ["Learn basic pronunciation", "அடிப்படை உச்சரிப்பைக் கற்றல்"]
    ],
    intro: [
      "Japanese uses three scripts: Hiragana (basic sounds and grammar), Katakana (foreign words) and Kanji (characters with meaning, borrowed from Chinese). Japanese vowels are short and clear, just like Tamil: あ ≈ அ, い ≈ இ, う ≈ உ, え ≈ எ, お ≈ ஒ.",
      "ஜப்பானிய மொழியில் மூன்று எழுத்து முறைகள் உள்ளன: ஹிரகானா (அடிப்படை ஒலிகள், இலக்கணம்), கடகானா (வெளிநாட்டுச் சொற்கள்), காஞ்சி (பொருள் கொண்ட சீன வடிவ எழுத்துகள்). ஜப்பானிய உயிரொலிகள் தமிழைப் போலவே குறுகியவை: あ ≈ அ, い ≈ இ, う ≈ உ, え ≈ எ, お ≈ ஒ."
    ],
    kana: pick(KANA.hira, [0])
  },
  2: {
    objectives: [
      ["Read and write the か, さ, た rows", "か, さ, た வரிசைகளை வாசித்து எழுதுதல்"],
      ["Notice special sounds: し = shi, ち = chi, つ = tsu", "சிறப்பு ஒலிகள்: し = shi, ち = chi, つ = tsu"]
    ],
    intro: [
      "Today: ka, sa and ta rows. Careful: し is “shi”, ち is “chi”, つ is “tsu”.",
      "இன்று: ka, sa, ta வரிசைகள். கவனம்: し = “shi”, ち = “chi”, つ = “tsu”."
    ],
    tips: kanaTips,
    kana: pick(KANA.hira, [1, 2, 3])
  },
  3: {
    objectives: [
      ["Read and write the な, は, ま rows", "な, は, ま வரிசைகளை வாசித்து எழுதுதல்"]
    ],
    intro: [
      "Today: na, ha and ma rows. ふ is “fu”. When は is a particle it is read “wa” (you will see this in Day 11).",
      "இன்று: na, ha, ma வரிசைகள். ふ = “fu”. は ஒரு துகளாக வந்தால் “wa” என வாசிக்கப்படும் (நாள் 11-ல் காண்போம்)."
    ],
    tips: kanaTips,
    kana: pick(KANA.hira, [4, 5, 6])
  },
  4: {
    objectives: [
      ["Read and write the や, ら, わ rows and ん", "や, ら, わ வரிசைகளையும் ん-ஐயும் கற்றல்"]
    ],
    intro: [
      "Today: ya, ra, wa rows and ん (n). The “r” sound is between r and l, similar to the Tamil ர/ள blend.",
      "இன்று: ya, ra, wa வரிசைகள் மற்றும் ん (n). “r” ஒலி r மற்றும் l-க்கு இடைப்பட்டது."
    ],
    tips: kanaTips,
    kana: pick(KANA.hira, [7, 8, 9])
  },
  5: {
    objectives: [
      ["Add voiced sounds with dakuten ( ゛) and handakuten ( ゜)", "゛ மற்றும் ゜ குறிகளுடன் ஒலிகளைக் கற்றல்"],
      ["Read combination sounds like きゃ, しゅ, ちょ", "きゃ, しゅ, ちょ போன்ற இணை ஒலிகள்"]
    ],
    intro: [
      "Two small marks change the sound: か ka → が ga. A small circle on the は row gives ぱ pa. Small ゃ ゅ ょ join the previous kana: き + ゃ = きゃ (kya). A small っ doubles the next consonant: きって (kitte).",
      "இரண்டு சிறிய புள்ளிகள் ஒலியை மாற்றும்: か ka → が ga. は வரிசையில் சிறு வட்டம் ぱ pa தரும். சிறிய ゃ ゅ ょ முன் எழுத்துடன் சேரும்: き + ゃ = きゃ (kya). சிறிய っ அடுத்த மெய்யை இரட்டிக்கும்: きって (kitte)."
    ],
    tips: kanaTips,
    kana: [...all(KANA.hiraV), ...all(KANA.hiraC)]
  },
  6: {
    objectives: [
      ["Read Katakana ア–ノ rows", "கடகானா ア–ノ வரிசைகளை வாசித்தல்"],
      ["Read voiced Katakana (ガ ザ ダ バ パ)", "゛ ゜ குறிகளுடன் கடகானா ஒலிகளை வாசித்தல்"]
    ],
    intro: [
      "Katakana is used for foreign words, e.g. コーヒー (coffee), テレビ (TV). The sounds are the same as Hiragana, only the shapes differ. The long mark ー stretches a vowel. The same two marks work here: カ → ガ, ハ → パ. You need them for words like ギター (guitar) and ジュース (juice).",
      "கடகானா வெளிநாட்டுச் சொற்களுக்குப் பயன்படுகிறது, எ.கா. コーヒー (காபி), テレビ (டிவி). ஒலிகள் ஹிரகானாவைப் போலவே; வடிவங்கள் மட்டும் வேறு. ー குறி உயிரை நீட்டும். அதே இரண்டு குறிகள் இங்கும் வேலை செய்யும்: カ → ガ, ハ → パ. ギター (கிடார்), ジュース (பழச்சாறு) போன்ற சொற்களுக்கு இவை தேவை."
    ],
    tips: kanaTips,
    kana: [...pick(KANA.kata, [0, 1, 2, 3, 4]), ...all(KANA.kataV)],
    vocab: [
      { jp: "コーヒー", ro: "koohii", en: "coffee", ta: "காபி" },
      { jp: "テレビ", ro: "terebi", en: "television", ta: "தொலைக்காட்சி" },
      { jp: "カメラ", ro: "kamera", en: "camera", ta: "கேமரா" },
      { jp: "ケーキ", ro: "keeki", en: "cake", ta: "கேக்" },
      { jp: "ギター", ro: "gitaa", en: "guitar", ta: "கிடார்" },
      { jp: "ジュース", ro: "juusu", en: "juice", ta: "பழச்சாறு" },
      { jp: "ベッド", ro: "beddo", en: "bed", ta: "படுக்கை" }
    ]
  },
  7: {
    objectives: [
      ["Read the remaining Katakana rows ハ–ン", "மீதமுள்ள கடகானா வரிசைகளை (ハ–ン) வாசித்தல்"],
      ["Read Katakana combination sounds (キャ, シュ, チョ)", "கடகானா இணை ஒலிகளை (キャ, シュ, チョ) வாசித்தல்"],
      ["Complete the Kana test", "கானா தேர்வை முடித்தல்"]
    ],
    intro: [
      "Finish Katakana: ハ–ン rows, then the combination sounds such as シャ (sha) and チョ (cho). Then take today's Kana test.",
      "கடகானாவை முடிப்போம்: ハ–ン வரிசைகள், பிறகு シャ (sha), チョ (cho) போன்ற இணை ஒலிகள். பிறகு இன்றைய கானா தேர்வை எழுதுங்கள்."
    ],
    tips: kanaTips,
    kana: [...pick(KANA.kata, [5, 6, 7, 8, 9]), ...all(KANA.kataC)],
    vocab: [
      { jp: "ホテル", ro: "hoteru", en: "hotel", ta: "ஹோட்டல்" },
      { jp: "パン", ro: "pan", en: "bread", ta: "ரொட்டி" },
      { jp: "ラジオ", ro: "rajio", en: "radio", ta: "வானொலி" },
      { jp: "ミルク", ro: "miruku", en: "milk", ta: "பால்" },
      { jp: "シャツ", ro: "shatsu", en: "shirt", ta: "சட்டை" },
      { jp: "タクシー", ro: "takushii", en: "taxi", ta: "டாக்சி" },
      { jp: "シャワー", ro: "shawaa", en: "shower", ta: "குளியல் (ஷவர்)" }
    ]
  },
  8: {
    objectives: [
      ["Use basic greetings", "அடிப்படை வாழ்த்துகளைப் பயன்படுத்துதல்"],
      ["Introduce yourself", "உங்களை அறிமுகப்படுத்துதல்"],
      ["Use everyday phrases at home and at meals", "வீட்டிலும் உணவு நேரத்திலும் தினசரி சொற்றொடர்களைப் பயன்படுத்துதல்"]
    ],
    intro: [
      "Greetings are the first words you will use. Click 🔊 to hear each one.",
      "வாழ்த்துகள் நீங்கள் முதலில் பயன்படுத்தும் சொற்கள். ஒவ்வொன்றின் ஒலியைக் கேட்க 🔊 அழுத்துங்கள்."
    ],
    vocab: [
      { jp: "おはようございます", ro: "ohayou gozaimasu", en: "Good morning", ta: "காலை வணக்கம்" },
      { jp: "こんにちは", ro: "konnichiwa", en: "Hello / Good afternoon", ta: "வணக்கம்" },
      { jp: "こんばんは", ro: "konbanwa", en: "Good evening", ta: "மாலை வணக்கம்" },
      { jp: "おやすみなさい", ro: "oyasuminasai", en: "Good night", ta: "இனிய இரவு" },
      { jp: "ありがとうございます", ro: "arigatou gozaimasu", en: "Thank you", ta: "நன்றி" },
      { jp: "どういたしまして", ro: "douitashimashite", en: "You are welcome", ta: "பரவாயில்லை, வரவேற்கிறேன்" },
      { jp: "すみません", ro: "sumimasen", en: "Excuse me / Sorry", ta: "மன்னிக்கவும்" },
      { jp: "ごめんなさい", ro: "gomennasai", en: "I am sorry", ta: "மன்னித்துவிடுங்கள்" },
      { jp: "さようなら", ro: "sayounara", en: "Goodbye", ta: "பிரியாவிடை" },
      { jp: "はじめまして", ro: "hajimemashite", en: "Nice to meet you", ta: "அறிமுகமானதில் மகிழ்ச்சி" },
      { jp: "どうぞ よろしく おねがいします", ro: "douzo yoroshiku onegaishimasu", en: "Pleased to meet you (please treat me well)", ta: "அறிமுகமானதில் மகிழ்ச்சி; ஆதரவு தாருங்கள்" },
      { jp: "おねがいします", ro: "onegaishimasu", en: "Please (I request)", ta: "தயவுசெய்து" },
      { jp: "いただきます", ro: "itadakimasu", en: "Said before eating", ta: "உண்ணத் தொடங்கும் முன் கூறுவது" },
      { jp: "ごちそうさまでした", ro: "gochisousama deshita", en: "Said after eating", ta: "உண்டு முடித்த பின் கூறுவது" },
      { jp: "いってきます", ro: "ittekimasu", en: "I am leaving (and will come back)", ta: "போய் வருகிறேன்" },
      { jp: "いってらっしゃい", ro: "itterasshai", en: "Have a good day (reply to いってきます)", ta: "போய் வாருங்கள்" },
      { jp: "ただいま", ro: "tadaima", en: "I am home", ta: "வந்துவிட்டேன்" },
      { jp: "おかえりなさい", ro: "okaerinasai", en: "Welcome home", ta: "வருக, வீடு திரும்பியதற்கு வரவேற்கிறேன்" },
      { jp: "はい", ro: "hai", en: "Yes", ta: "ஆம்" },
      { jp: "いいえ", ro: "iie", en: "No", ta: "இல்லை" }
    ],
    sentences: [
      ["はじめまして。わたしは ○○です。", "Hajimemashite. Watashi wa ○○ desu.", "Nice to meet you. I am ○○.", "அறிமுகமானதில் மகிழ்ச்சி. நான் ○○."],
      ["どうぞ よろしく おねがいします。", "Douzo yoroshiku onegaishimasu.", "Pleased to meet you.", "அறிமுகமானதில் மகிழ்ச்சி; ஆதரவு தாருங்கள்."]
    ],
    extra: [
      qz("What do you say before you start eating?", "சாப்பிடத் தொடங்கும் முன் என்ன சொல்வீர்கள்?",
        ["いただきます", "ごちそうさまでした", "ただいま", "さようなら"], 0,
        "いただきます is said before a meal; ごちそうさまでした after it.", "いただきます உணவுக்கு முன்; ごちそうさまでした உணவுக்குப் பின்.")
    ]
  },
  9: {
    objectives: [
      ["Count from 0 to 100 and beyond", "0 முதல் 100 மற்றும் அதற்கு மேல் எண்ணுதல்"],
      ["Tell the time (〜じ, 〜ふん, はん)", "நேரத்தைக் கூறுதல் (〜じ, 〜ふん, はん)"]
    ],
    intro: [
      "Numbers 1–10. 4 and 7 have two readings: よん/し and なな/しち. Use よん and なな for counting; they are safer. Bigger numbers are built from these: 11 = じゅう + いち, 20 = に + じゅう, 35 = さん + じゅう + ご. Time: add じ after the number (さんじ = 3 o'clock) and はん for half past (さんじはん = 3:30). Three hours are special: 4 o'clock = よじ, 7 = しちじ, 9 = くじ.",
      "எண்கள் 1–10. 4 மற்றும் 7-க்கு இரண்டு வாசிப்புகள் உண்டு: よん/し, なな/しち. எண்ணும்போது よん, なな பயன்படுத்துங்கள். பெரிய எண்கள் இவற்றிலிருந்து அமையும்: 11 = じゅう + いち, 20 = に + じゅう, 35 = さん + じゅう + ご. நேரம்: எண்ணுக்குப் பின் じ சேருங்கள் (さんじ = 3 மணி); அரைக்கு はん (さんじはん = 3:30). மூன்று மணிகள் சிறப்பானவை: 4 மணி = よじ, 7 = しちじ, 9 = くじ."
    ],
    vocab: [
      { jp: "一 (いち)", say: "いち", ro: "ichi", en: "one (1)", ta: "ஒன்று" },
      { jp: "二 (に)", say: "に", ro: "ni", en: "two (2)", ta: "இரண்டு" },
      { jp: "三 (さん)", say: "さん", ro: "san", en: "three (3)", ta: "மூன்று" },
      { jp: "四 (よん)", say: "よん", ro: "yon", en: "four (4)", ta: "நான்கு" },
      { jp: "五 (ご)", say: "ご", ro: "go", en: "five (5)", ta: "ஐந்து" },
      { jp: "六 (ろく)", say: "ろく", ro: "roku", en: "six (6)", ta: "ஆறு" },
      { jp: "七 (なな)", say: "なな", ro: "nana", en: "seven (7)", ta: "ஏழு" },
      { jp: "八 (はち)", say: "はち", ro: "hachi", en: "eight (8)", ta: "எட்டு" },
      { jp: "九 (きゅう)", say: "きゅう", ro: "kyuu", en: "nine (9)", ta: "ஒன்பது" },
      { jp: "十 (じゅう)", say: "じゅう", ro: "juu", en: "ten (10)", ta: "பத்து" },
      v("ゼロ", "zero", "zero (0)", "பூஜ்யம்"),
      v("十一 (じゅういち)", "juuichi", "eleven (11)", "பதினொன்று", "じゅういち"),
      v("二十 (にじゅう)", "nijuu", "twenty (20)", "இருபது", "にじゅう"),
      v("百 (ひゃく)", "hyaku", "one hundred (100)", "நூறு", "ひゃく"),
      v("千 (せん)", "sen", "one thousand (1,000)", "ஆயிரம்", "せん"),
      v("一万 (いちまん)", "ichiman", "ten thousand (10,000)", "பத்தாயிரம்", "いちまん"),
      v("一時 (いちじ)", "ichiji", "1 o'clock", "1 மணி", "いちじ"),
      v("三時 (さんじ)", "sanji", "3 o'clock", "3 மணி", "さんじ"),
      v("四時 (よじ)", "yoji", "4 o'clock (not よんじ)", "4 மணி", "よじ"),
      v("七時 (しちじ)", "shichiji", "7 o'clock (not ななじ)", "7 மணி", "しちじ"),
      v("九時 (くじ)", "kuji", "9 o'clock (not きゅうじ)", "9 மணி", "くじ"),
      v("何時 (なんじ)", "nanji", "what time?", "எத்தனை மணி?", "なんじ"),
      v("半 (はん)", "han", "half past", "அரை (மணி)", "はん"),
      v("五分 (ごふん)", "gofun", "5 minutes", "5 நிமிடம்", "ごふん"),
      v("十分 (じゅっぷん)", "juppun", "10 minutes", "10 நிமிடம்", "じゅっぷん"),
      v("午前 (ごぜん)", "gozen", "a.m. (morning)", "முற்பகல்", "ごぜん"),
      v("午後 (ごご)", "gogo", "p.m. (afternoon)", "பிற்பகல்", "ごご")
    ],
    sentences: [
      ["いま なんじですか。", "Ima nanji desu ka.", "What time is it now?", "இப்போது மணி என்ன?"],
      ["いま さんじはんです。", "Ima sanji han desu.", "It is 3:30 now.", "இப்போது மணி 3:30."],
      ["ごご よじです。", "Gogo yoji desu.", "It is 4 p.m.", "பிற்பகல் 4 மணி."]
    ],
    extra: [
      qz("How do you say “4 o'clock”?", "“4 மணி” என்பதை எப்படிச் சொல்வது?",
        ["よじ", "よんじ", "しじ", "よんふん"], 0,
        "4, 7 and 9 o'clock are special: よじ, しちじ, くじ.", "4, 7, 9 மணிகள் சிறப்பு: よじ, しちじ, くじ."),
      qz("Which means “3:30”?", "“3:30” எது?",
        ["さんじはん", "さんぷん", "さんじゅう", "ごじはん"], 0,
        "はん means half past.", "はん என்றால் அரை மணி.")
    ]
  },
  10: {
    objectives: [
      ["Make sentences with Noun + です", "Noun + です வாக்கியங்களை அமைத்தல்"],
      ["Say “is not” with ではありません", "ではありません மூலம் மறுத்துக் கூறுதல்"],
      ["Say “was” with でした", "でした மூலம் இறந்தகாலத்தில் கூறுதல்"]
    ],
    intro: [
      "です means “am / is / are”. Pattern: A は B です (A is B). Negative: A は B ではありません (A is not B). Question: add か at the end. Past: でした (was) and ではありませんでした (was not). Japanese puts the verb last, like Tamil.",
      "です என்றால் “ஆக இருக்கிறது”. அமைப்பு: A は B です (A என்பது B). எதிர்மறை: A は B ではありません. கேள்விக்கு இறுதியில் か சேர்க்கவும். இறந்தகாலம்: でした (இருந்தது), ではありませんでした (இருக்கவில்லை). தமிழைப் போலவே ஜப்பானிய மொழியிலும் வினை இறுதியில் வரும்."
    ],
    vocab: [
      { jp: "わたし", ro: "watashi", en: "I", ta: "நான்" },
      { jp: "あなた", ro: "anata", en: "you", ta: "நீங்கள்" },
      { jp: "がくせい", ro: "gakusei", en: "student", ta: "மாணவர்" },
      { jp: "せんせい", ro: "sensei", en: "teacher", ta: "ஆசிரியர்" },
      { jp: "にほんじん", ro: "nihonjin", en: "Japanese person", ta: "ஜப்பானியர்" },
      { jp: "ともだち", ro: "tomodachi", en: "friend", ta: "நண்பர்" },
      v("かいしゃいん", "kaishain", "office worker", "நிறுவன ஊழியர்")
    ],
    sentences: [
      ["わたしは がくせいです。", "Watashi wa gakusei desu.", "I am a student.", "நான் ஒரு மாணவர்."],
      ["わたしは せんせいでは ありません。", "Watashi wa sensei dewa arimasen.", "I am not a teacher.", "நான் ஆசிரியர் அல்ல."],
      ["あなたは がくせいですか。", "Anata wa gakusei desu ka.", "Are you a student?", "நீங்கள் மாணவரா?"],
      ["わたしは がくせいでした。", "Watashi wa gakusei deshita.", "I was a student.", "நான் மாணவராக இருந்தேன்."],
      ["ともだちは せんせいでは ありませんでした。", "Tomodachi wa sensei dewa arimasen deshita.", "My friend was not a teacher.", "என் நண்பர் ஆசிரியராக இருக்கவில்லை."]
    ],
    extra: [
      { q: ["Fill in the blank: わたし ___ がくせいです。", "நிரப்புக: わたし ___ がくせいです。"], opts: ["は", "を", "に", "で"], a: 0,
        e: ["は marks the topic of the sentence.", "は வாக்கியத்தின் தலைப்பைக் குறிக்கும்."] },
      { q: ["Which means “I am not a student”?", "“நான் மாணவர் அல்ல” எது?"],
        opts: ["わたしは がくせいです。", "わたしは がくせいでは ありません。", "わたしは がくせいですか。", "あなたは がくせいです。"], a: 1,
        e: ["ではありません makes a negative.", "ではありません எதிர்மறையாக்கும்."] },
      qz("Which means “I was a student”?", "“நான் மாணவராக இருந்தேன்” எது?",
        ["わたしは がくせいでした。", "わたしは がくせいです。", "わたしは がくせいでは ありません。", "わたしは がくせいですか。"], 0,
        "でした is the past of です.", "でした என்பது です-ன் இறந்தகாலம்.")
    ]
  },
  11: {
    objectives: [
      ["Use は, の and も correctly", "は, の, も ஆகிய துகள்களைச் சரியாகப் பயன்படுத்துதல்"],
      ["Say “my …” and “also”", "“என்னுடைய …” மற்றும் “…வும்” எனக் கூறுதல்"]
    ],
    intro: [
      "Particles are small words that show the job of a word. は marks the topic and is read “wa”. の joins two nouns: わたしの ほん = my book. も means “also” and replaces は: わたしも がくせいです = I am a student too.",
      "துகள்கள் ஒரு சொல்லின் பணியைக் காட்டும் சிறு சொற்கள். は தலைப்பைக் குறிக்கும்; “wa” என வாசிக்கப்படும். の இரு பெயர்ச்சொற்களை இணைக்கும்: わたしの ほん = என் புத்தகம். も என்றால் “…வும்”; は-க்குப் பதிலாக வரும்: わたしも がくせいです = நானும் மாணவன்."
    ],
    vocab: [
      v("ほん", "hon", "book", "புத்தகம்"),
      v("かばん", "kaban", "bag", "பை"),
      v("くるま", "kuruma", "car", "கார்"),
      v("えんぴつ", "enpitsu", "pencil", "பென்சில்"),
      v("なまえ", "namae", "name", "பெயர்"),
      v("くに", "kuni", "country", "நாடு"),
      v("にほん", "nihon", "Japan", "ஜப்பான்"),
      v("インド", "indo", "India", "இந்தியா")
    ],
    sentences: [
      ["わたしの なまえは ラヴィです。", "Watashi no namae wa Ravi desu.", "My name is Ravi.", "என் பெயர் ரவி."],
      ["これは わたしの ほんです。", "Kore wa watashi no hon desu.", "This is my book.", "இது என் புத்தகம்."],
      ["わたしも がくせいです。", "Watashi mo gakusei desu.", "I am a student too.", "நானும் மாணவர்."],
      ["あなたも インドじんですか。", "Anata mo indojin desu ka.", "Are you Indian too?", "நீங்களும் இந்தியரா?"]
    ],
    extra: [
      qz("Fill in the blank: ともだちは がくせいです。わたし ___ がくせいです。", "நிரப்புக: ともだちは がくせいです。わたし ___ がくせいです。",
        ["も", "の", "を", "か"], 0, "も means “also”.", "も என்றால் “…வும்”."),
      qz("Fill in the blank: これは わたし ___ かばんです。", "நிரப்புக: これは わたし ___ かばんです。",
        ["の", "は", "も", "を"], 0, "の joins two nouns (my bag).", "の இரு பெயர்ச்சொற்களை இணைக்கும் (என் பை).")
    ]
  },
  12: {
    objectives: [
      ["Use これ, それ, あれ, どれ", "これ, それ, あれ, どれ பயன்படுத்துதல்"],
      ["Use この, その, あの + noun", "この, その, あの + பெயர்ச்சொல் பயன்படுத்துதல்"]
    ],
    intro: [
      "これ = this (near me), それ = that (near you), あれ = that over there (far from both), どれ = which one. When a noun follows, use この, その, あの, どの: この ほん = this book.",
      "これ = இது (எனக்கு அருகில்), それ = அது (உங்களுக்கு அருகில்), あれ = அதோ அது (இருவருக்கும் தொலைவில்), どれ = எது. பெயர்ச்சொல் தொடர்ந்தால் この, その, あの, どの: この ほん = இந்தப் புத்தகம்."
    ],
    vocab: [
      { jp: "これ", ro: "kore", en: "this (near me)", ta: "இது" },
      { jp: "それ", ro: "sore", en: "that (near you)", ta: "அது (உங்களருகில்)" },
      { jp: "あれ", ro: "are", en: "that over there", ta: "அதோ அது" },
      { jp: "どれ", ro: "dore", en: "which one", ta: "எது" },
      v("この", "kono", "this … (before a noun)", "இந்த …"),
      v("その", "sono", "that … (before a noun)", "அந்த … (உங்களருகில்)"),
      v("あの", "ano", "that … over there", "அதோ அந்த …"),
      v("どの", "dono", "which …", "எந்த …")
    ],
    sentences: [
      ["これは ほんです。", "Kore wa hon desu.", "This is a book.", "இது ஒரு புத்தகம்."],
      ["あれは なんですか。", "Are wa nan desu ka.", "What is that over there?", "அதோ அது என்ன?"],
      ["この ほんは わたしのです。", "Kono hon wa watashi no desu.", "This book is mine.", "இந்தப் புத்தகம் என்னுடையது."]
    ],
    extra: [
      qz("Something is far from both of you. Which word do you use?", "இருவருக்கும் தொலைவில் உள்ள பொருளுக்கு எந்தச் சொல்?",
        ["あれ", "これ", "それ", "どれ"], 0, "あれ points to things far from both speakers.", "あれ இருவருக்கும் தொலைவில் உள்ளதைக் குறிக்கும்."),
      qz("Which is correct before a noun?", "பெயர்ச்சொல்லுக்கு முன் எது சரி?",
        ["この ほん", "これ ほん", "これの ほん", "この の ほん"], 0, "Use この, not これ, directly before a noun.", "பெயர்ச்சொல்லுக்கு நேர் முன் この பயன்படுத்துங்கள்.")
    ]
  },
  13: {
    objectives: [
      ["Point to places with ここ, そこ, あそこ, どこ", "ここ, そこ, あそこ, どこ மூலம் இடங்களைச் சுட்டுதல்"],
      ["Name common places in town", "நகரில் உள்ள பொதுவான இடங்களின் பெயர்கள்"]
    ],
    intro: [
      "ここ = here (near me), そこ = there (near you), あそこ = over there, どこ = where. Ask “Where is A?” with A は どこですか。 and answer A は ここです。",
      "ここ = இங்கே, そこ = அங்கே (உங்களருகில்), あそこ = அதோ அங்கே, どこ = எங்கே. “A எங்கே?” = A は どこですか。; பதில்: A は ここです。"
    ],
    vocab: [
      v("ここ", "koko", "here", "இங்கே"),
      v("そこ", "soko", "there (near you)", "அங்கே (உங்களருகில்)"),
      v("あそこ", "asoko", "over there", "அதோ அங்கே"),
      v("どこ", "doko", "where", "எங்கே"),
      v("がっこう", "gakkou", "school", "பள்ளி"),
      v("えき", "eki", "station", "ரயில் நிலையம்"),
      v("びょういん", "byouin", "hospital", "மருத்துவமனை"),
      v("ぎんこう", "ginkou", "bank", "வங்கி"),
      v("こうえん", "kouen", "park", "பூங்கா"),
      v("みせ", "mise", "shop", "கடை"),
      v("レストラン", "resutoran", "restaurant", "உணவகம்"),
      v("デパート", "depaato", "department store", "பல்பொருள் அங்காடி"),
      v("トイレ", "toire", "toilet", "கழிப்பறை"),
      v("うち", "uchi", "home / house", "வீடு"),
      v("へや", "heya", "room", "அறை")
    ],
    sentences: [
      ["ここは がっこうです。", "Koko wa gakkou desu.", "This is a school.", "இது ஒரு பள்ளி."],
      ["トイレは どこですか。", "Toire wa doko desu ka.", "Where is the toilet?", "கழிப்பறை எங்கே?"],
      ["トイレは あそこです。", "Toire wa asoko desu.", "The toilet is over there.", "கழிப்பறை அதோ அங்கே."],
      ["えきは どこですか。", "Eki wa doko desu ka.", "Where is the station?", "ரயில் நிலையம் எங்கே?"]
    ],
    extra: [
      qz("What does どこ mean?", "どこ என்றால் என்ன?", ["where", "what", "who", "when"], 0, "どこ = where.", "どこ = எங்கே."),
      qz("Choose the sentence for “The station is over there.”", "“ரயில் நிலையம் அதோ அங்கே” என்பதற்குச் சரியான வாக்கியம்?",
        ["えきは あそこです。", "えきは だれです。", "えきは どれですか。", "えきは いつです。"], 0,
        "あそこ = over there.", "あそこ = அதோ அங்கே.")
    ]
  },
  14: {
    objectives: [
      ["Ask questions with なに, だれ, どこ, いつ, いくら", "なに, だれ, どこ, いつ, いくら கொண்டு கேள்விகள் கேட்டல்"],
      ["Make a yes/no question with か", "か கொண்டு ஆம்/இல்லை கேள்வி அமைத்தல்"]
    ],
    intro: [
      "A Japanese question keeps the same word order. Just add か at the end: これは ほんです → これは ほんですか。 For information, replace the unknown part with a question word: これは なんですか。 (What is this?). 何 is read なん before です, ですか and numbers.",
      "ஜப்பானிய மொழியில் கேள்வியிலும் சொல் வரிசை மாறாது; இறுதியில் か சேர்த்தால் போதும்: これは ほんですか。 தகவல் கேட்க, தெரியாத பகுதியைக் கேள்விச் சொல்லால் மாற்றுங்கள்: これは なんですか。 (இது என்ன?). なん என்பது です, ですか, எண்களுக்கு முன் வரும்."
    ],
    vocab: [
      v("なに / なん", "nani / nan", "what", "என்ன"),
      v("だれ", "dare", "who", "யார்"),
      v("どこ", "doko", "where", "எங்கே"),
      v("いつ", "itsu", "when", "எப்போது"),
      v("いくら", "ikura", "how much (price)", "எவ்வளவு (விலை)"),
      v("いくつ", "ikutsu", "how many / how old", "எத்தனை"),
      v("どう", "dou", "how", "எப்படி"),
      v("どうして", "doushite", "why", "ஏன்"),
      v("なんさい", "nansai", "how old", "எத்தனை வயது"),
      v("たんじょうび", "tanjoubi", "birthday", "பிறந்தநாள்")
    ],
    sentences: [
      ["これは なんですか。", "Kore wa nan desu ka.", "What is this?", "இது என்ன?"],
      ["あの ひとは だれですか。", "Ano hito wa dare desu ka.", "Who is that person?", "அந்த நபர் யார்?"],
      ["たんじょうびは いつですか。", "Tanjoubi wa itsu desu ka.", "When is your birthday?", "பிறந்தநாள் எப்போது?"],
      ["これは いくらですか。", "Kore wa ikura desu ka.", "How much is this?", "இது எவ்வளவு?"]
    ],
    extra: [
      qz("Which word asks “who”?", "“யார்” என்று கேட்கும் சொல் எது?", ["だれ", "いつ", "どこ", "いくら"], 0, "だれ = who.", "だれ = யார்."),
      qz("Which sentence asks the price?", "விலை கேட்கும் வாக்கியம் எது?",
        ["これは いくらですか。", "これは どこですか。", "これは いつですか。", "これは だれですか。"], 0,
        "いくら = how much.", "いくら = எவ்வளவு.")
    ]
  },
  15: {
    objectives: [
      ["Learn 16 key verbs", "16 முக்கிய வினைச்சொற்களைக் கற்றல்"],
      ["Know the three verb groups", "மூன்று வினைக் குழுக்களை அறிதல்"]
    ],
    intro: [
      "The form in the dictionary (たべる, のむ) is the dictionary form. Verbs have 3 groups. Group 1 (u-verbs): のむ, かく, はなす. Group 2 (ru-verbs): end in いる or える: たべる, みる, ねる. Group 3 (irregular): する and くる. Careful: かえる (go home) looks like Group 2 but is Group 1.",
      "அகராதியில் உள்ள வடிவம் (たべる, のむ) அகராதி வடிவம். வினைகளுக்கு 3 குழுக்கள்: குழு 1 (u-வினை): のむ, かく, はなす. குழு 2 (ru-வினை): いる/える-ல் முடிவது: たべる, みる, ねる. குழு 3 (ஒழுங்கற்றவை): する, くる. கவனம்: かえる (வீடு திரும்பு) குழு 2 போலத் தெரியும்; ஆனால் குழு 1."
    ],
    vocab: [
      v("食べる (たべる)", "taberu", "to eat (Group 2)", "உண்ணு", "たべる"),
      v("飲む (のむ)", "nomu", "to drink (Group 1)", "குடி", "のむ"),
      v("見る (みる)", "miru", "to see / watch (Group 2)", "பார்", "みる"),
      v("聞く (きく)", "kiku", "to listen / ask (Group 1)", "கேள்", "きく"),
      v("読む (よむ)", "yomu", "to read (Group 1)", "படி", "よむ"),
      v("書く (かく)", "kaku", "to write (Group 1)", "எழுது", "かく"),
      v("行く (いく)", "iku", "to go (Group 1)", "போ", "いく"),
      v("来る (くる)", "kuru", "to come (Group 3)", "வா", "くる"),
      v("帰る (かえる)", "kaeru", "to return home (Group 1)", "வீடு திரும்பு", "かえる"),
      v("寝る (ねる)", "neru", "to sleep / go to bed (Group 2)", "தூங்கு", "ねる"),
      v("起きる (おきる)", "okiru", "to wake up (Group 2)", "எழு", "おきる"),
      v("話す (はなす)", "hanasu", "to speak (Group 1)", "பேசு", "はなす"),
      v("買う (かう)", "kau", "to buy (Group 1)", "வாங்கு", "かう"),
      v("会う (あう)", "au", "to meet (Group 1)", "சந்தி", "あう"),
      v("待つ (まつ)", "matsu", "to wait (Group 1)", "காத்திரு", "まつ"),
      v("する", "suru", "to do (Group 3)", "செய்")
    ],
    extra: [
      qz("Which verb is Group 2?", "எது குழு 2 வினை?", ["たべる", "のむ", "かく", "はなす"], 0,
        "たべる ends in える, so it is a ru-verb.", "たべる, える-ல் முடிவதால் ru-வினை."),
      qz("Which group is かえる (to return home)?", "かえる எந்தக் குழு?", ["Group 1", "Group 2", "Group 3", "None"], 0,
        "かえる is a Group 1 exception.", "かえる குழு 1 விதிவிலக்கு.")
    ]
  },
  16: {
    objectives: [
      ["Make the polite form with ます", "ます கொண்டு மரியாதை வடிவம் அமைத்தல்"],
      ["Make the negative with ません", "ません கொண்டு எதிர்மறை அமைத்தல்"]
    ],
    intro: [
      "Polite present: Group 1 change the last sound to the い-row + ます (のむ → のみます, かく → かきます). Group 2 drop る + ます (たべる → たべます). Group 3: します, きます. Negative: ます → ません. Question: add か. ます covers present and future: あした いきます = I will go tomorrow.",
      "மரியாதை நிகழ்காலம்: குழு 1 – கடைசி ஒலியை い-வரிசைக்கு மாற்றி + ます (のむ → のみます, かく → かきます). குழு 2 – る நீக்கி + ます (たべる → たべます). குழு 3: します, きます. எதிர்மறை: ます → ません. கேள்வி: か சேர்க்கவும். ます நிகழ்காலத்தையும் எதிர்காலத்தையும் குறிக்கும்: あした いきます = நாளை போவேன்."
    ],
    vocab: [
      v("のむ → のみます", "nomu → nomimasu", "drink", "குடி → குடிக்கிறேன்", "のみます"),
      v("かく → かきます", "kaku → kakimasu", "write", "எழுது → எழுதுகிறேன்", "かきます"),
      v("まつ → まちます", "matsu → machimasu", "wait", "காத்திரு → காத்திருக்கிறேன்", "まちます"),
      v("はなす → はなします", "hanasu → hanashimasu", "speak", "பேசு → பேசுகிறேன்", "はなします"),
      v("かう → かいます", "kau → kaimasu", "buy", "வாங்கு → வாங்குகிறேன்", "かいます"),
      v("かえる → かえります", "kaeru → kaerimasu", "return home", "திரும்பு → திரும்புகிறேன்", "かえります"),
      v("たべる → たべます", "taberu → tabemasu", "eat", "உண்ணு → உண்கிறேன்", "たべます"),
      v("おきる → おきます", "okiru → okimasu", "wake up", "எழு → எழுகிறேன்", "おきます"),
      v("する → します", "suru → shimasu", "do", "செய் → செய்கிறேன்", "します"),
      v("くる → きます", "kuru → kimasu", "come", "வா → வருகிறேன்", "きます"),
      v("たべません", "tabemasen", "do not eat", "உண்ண மாட்டேன்", "たべません"),
      v("いきません", "ikimasen", "do not go", "போக மாட்டேன்", "いきません")
    ],
    sentences: [
      ["まいにち ごはんを たべます。", "Mainichi gohan o tabemasu.", "I eat rice every day.", "தினமும் சாதம் சாப்பிடுகிறேன்."],
      ["コーヒーを のみません。", "Koohii o nomimasen.", "I do not drink coffee.", "நான் காபி குடிப்பதில்லை."],
      ["あした がっこうへ いきます。", "Ashita gakkou e ikimasu.", "I will go to school tomorrow.", "நாளை பள்ளிக்குப் போவேன்."],
      ["なにを たべますか。", "Nani o tabemasu ka.", "What will you eat?", "என்ன சாப்பிடுவீர்கள்?"]
    ],
    extra: [
      qz("What is the polite form of よむ?", "よむ-ன் மரியாதை வடிவம்?", ["よみます", "よます", "よむます", "よんます"], 0,
        "Group 1: む → み + ます.", "குழு 1: む → み + ます."),
      qz("What is the negative of みます?", "みます-ன் எதிர்மறை?", ["みません", "みます", "みませんでした", "みない"], 0,
        "ます → ません.", "ます → ません.")
    ]
  },
  17: {
    objectives: [
      ["Make the past with ました / ませんでした", "ました / ませんでした கொண்டு இறந்தகாலம் அமைத்தல்"],
      ["Learn days of the week and time words", "வாரநாட்கள், நேரச் சொற்கள் கற்றல்"]
    ],
    intro: [
      "Past: ます → ました (did), ません → ませんでした (did not). Example: きのう ほんを よみました = I read a book yesterday. Learn the time words below, they appear in many exam questions.",
      "இறந்தகாலம்: ます → ました (செய்தேன்), ません → ませんでした (செய்யவில்லை). எ.கா: きのう ほんを よみました = நேற்று புத்தகம் படித்தேன். கீழுள்ள நேரச் சொற்கள் தேர்வில் அடிக்கடி வரும்."
    ],
    vocab: [
      v("きのう", "kinou", "yesterday", "நேற்று"),
      v("きょう", "kyou", "today", "இன்று"),
      v("あした", "ashita", "tomorrow", "நாளை"),
      v("おととい", "ototoi", "the day before yesterday", "நேற்று முன் தினம்"),
      v("あさって", "asatte", "the day after tomorrow", "நாளை மறுநாள்"),
      v("まいにち", "mainichi", "every day", "தினமும்"),
      v("まいあさ", "maiasa", "every morning", "ஒவ்வொரு காலையும்"),
      v("まいばん", "maiban", "every night", "ஒவ்வொரு இரவும்"),
      v("せんしゅう", "senshuu", "last week", "கடந்த வாரம்"),
      v("こんしゅう", "konshuu", "this week", "இந்த வாரம்"),
      v("らいしゅう", "raishuu", "next week", "அடுத்த வாரம்"),
      v("せんげつ", "sengetsu", "last month", "கடந்த மாதம்"),
      v("こんげつ", "kongetsu", "this month", "இந்த மாதம்"),
      v("らいげつ", "raigetsu", "next month", "அடுத்த மாதம்"),
      v("きょねん", "kyonen", "last year", "கடந்த ஆண்டு"),
      v("ことし", "kotoshi", "this year", "இந்த ஆண்டு"),
      v("らいねん", "rainen", "next year", "அடுத்த ஆண்டு"),
      v("げつようび", "getsuyoubi", "Monday", "திங்கட்கிழமை"),
      v("かようび", "kayoubi", "Tuesday", "செவ்வாய்க்கிழமை"),
      v("すいようび", "suiyoubi", "Wednesday", "புதன்கிழமை"),
      v("もくようび", "mokuyoubi", "Thursday", "வியாழக்கிழமை"),
      v("きんようび", "kinyoubi", "Friday", "வெள்ளிக்கிழமை"),
      v("どようび", "doyoubi", "Saturday", "சனிக்கிழமை"),
      v("にちようび", "nichiyoubi", "Sunday", "ஞாயிற்றுக்கிழமை")
    ],
    sentences: [
      ["きのう ほんを よみました。", "Kinou hon o yomimashita.", "I read a book yesterday.", "நேற்று புத்தகம் படித்தேன்."],
      ["きのう がっこうへ いきませんでした。", "Kinou gakkou e ikimasen deshita.", "I did not go to school yesterday.", "நேற்று பள்ளிக்குப் போகவில்லை."],
      ["にちようびに ともだちに あいました。", "Nichiyoubi ni tomodachi ni aimashita.", "I met a friend on Sunday.", "ஞாயிற்றுக்கிழமை நண்பரைச் சந்தித்தேன்."]
    ],
    extra: [
      qz("What is the past negative of いきます?", "いきます-ன் இறந்தகால எதிர்மறை?",
        ["いきませんでした", "いきました", "いきません", "いきます"], 0, "ません → ませんでした.", "ません → ませんでした."),
      qz("Which word means “yesterday”?", "“நேற்று” என்பதன் சொல்?", ["きのう", "あした", "きょう", "おととい"], 0,
        "きのう = yesterday.", "きのう = நேற்று.")
    ]
  },
  18: {
    objectives: [
      ["Use を, に, で, へ, と, から, まで, が", "を, に, で, へ, と, から, まで, が பயன்படுத்துதல்"]
    ],
    intro: [
      "を marks what you do the action to. に marks time and the place you arrive. で marks where you do something or the tool you use. へ marks direction. と = “with / and”. から / まで = “from / until”. が marks the subject, and is used with すき, あります, います.",
      "を செயலுக்குள்ளாகும் பொருளைக் குறிக்கும். に நேரத்தையும் சென்றடையும் இடத்தையும் குறிக்கும். で செயல் நடக்கும் இடம் அல்லது கருவியைக் குறிக்கும். へ திசையைக் குறிக்கும். と = “உடன் / மற்றும்”. から / まで = “இருந்து / வரை”. が எழுவாயைக் குறிக்கும்; すき, あります, います உடன் வரும்."
    ],
    vocab: [
      v("を", "o (wo)", "marks the object", "செயப்படுபொருள் குறி"),
      v("に", "ni", "time / destination / target", "நேரம் / சேருமிடம்"),
      v("で", "de", "place of action / tool", "செயல் இடம் / கருவி"),
      v("へ", "e", "direction (read “e”)", "திசை (“e” என வாசிக்கவும்)"),
      v("と", "to", "with / and", "உடன் / மற்றும்"),
      v("から", "kara", "from / because", "இருந்து / ஏனெனில்"),
      v("まで", "made", "until / up to", "வரை"),
      v("が", "ga", "subject marker", "எழுவாய் குறி")
    ],
    sentences: [
      ["みずを のみます。", "Mizu o nomimasu.", "I drink water.", "தண்ணீர் குடிக்கிறேன்."],
      ["しちじに おきます。", "Shichiji ni okimasu.", "I wake up at 7.", "7 மணிக்கு எழுகிறேன்."],
      ["バスで がっこうへ いきます。", "Basu de gakkou e ikimasu.", "I go to school by bus.", "பேருந்தில் பள்ளிக்குப் போகிறேன்."],
      ["ともだちと はなします。", "Tomodachi to hanashimasu.", "I talk with a friend.", "நண்பருடன் பேசுகிறேன்."],
      ["くじから ごじまで はたらきます。", "Kuji kara goji made hatarakimasu.", "I work from 9 to 5.", "9 மணி முதல் 5 மணி வரை வேலை செய்கிறேன்."],
      ["りんごが すきです。", "Ringo ga suki desu.", "I like apples.", "எனக்கு ஆப்பிள் பிடிக்கும்."]
    ],
    extra: [
      qz("Fill in the blank: コーヒー ___ のみます。", "நிரப்புக: コーヒー ___ のみます。", ["を", "に", "で", "と"], 0,
        "を marks the thing you drink.", "を குடிக்கும் பொருளைக் குறிக்கும்."),
      qz("Fill in the blank: バス ___ いきます。 (by bus)", "நிரப்புக: バス ___ いきます。 (பேருந்தில்)", ["で", "を", "が", "も"], 0,
        "で marks the means of transport.", "で வாகனத்தைக் குறிக்கும்."),
      qz("Fill in the blank: しちじ ___ おきます。", "நிரப்புக: しちじ ___ おきます。", ["に", "を", "と", "の"], 0,
        "に marks a clock time.", "に மணி நேரத்தைக் குறிக்கும்."),
      qz("Fill in the blank: ともだち ___ はなします。 (with a friend)", "நிரப்புக: ともだち ___ はなします。 (நண்பருடன்)", ["と", "を", "で", "が"], 0,
        "と means “with”.", "と என்றால் “உடன்”.")
    ]
  },
  19: {
    objectives: [
      ["Learn common い-adjectives", "பொதுவான い-பெயரடைகளைக் கற்றல்"],
      ["Make present, negative and past forms", "நிகழ்கால, எதிர்மறை, இறந்தகால வடிவங்கள் அமைத்தல்"]
    ],
    intro: [
      "い-adjectives end in い. takai (expensive): たかいです → たかくないです (is not) → たかかったです (was) → たかくなかったです (was not). Before a noun: たかい いえ. Exception: いい (good) becomes よく: よくないです, よかったです.",
      "い-பெயரடைகள் い-ல் முடியும். takai (விலை உயர்ந்த): たかいです → たかくないです (இல்லை) → たかかったです (இருந்தது) → たかくなかったです (இருக்கவில்லை). பெயர்ச்சொல்லுக்கு முன்: たかい いえ. விதிவிலக்கு: いい (நல்ல) → よく: よくないです, よかったです."
    ],
    vocab: [
      v("おおきい", "ookii", "big", "பெரிய"),
      v("ちいさい", "chiisai", "small", "சிறிய"),
      v("たかい", "takai", "expensive / tall / high", "விலை உயர்ந்த / உயரமான"),
      v("やすい", "yasui", "cheap", "மலிவான"),
      v("ひくい", "hikui", "low", "தாழ்வான"),
      v("あたらしい", "atarashii", "new", "புதிய"),
      v("ふるい", "furui", "old (not for people)", "பழைய"),
      v("おいしい", "oishii", "delicious", "சுவையான"),
      v("まずい", "mazui", "bad tasting", "சுவையற்ற"),
      v("たのしい", "tanoshii", "fun / enjoyable", "மகிழ்ச்சியான"),
      v("つまらない", "tsumaranai", "boring", "சலிப்பான"),
      v("おもしろい", "omoshiroi", "interesting / funny", "சுவாரசியமான"),
      v("あつい", "atsui", "hot (weather)", "வெப்பமான"),
      v("さむい", "samui", "cold (weather)", "குளிரான"),
      v("すずしい", "suzushii", "cool (weather)", "குளிர்ச்சியான"),
      v("むずかしい", "muzukashii", "difficult", "கடினமான"),
      v("やさしい", "yasashii", "easy / kind", "எளிதான / கனிவான"),
      v("ながい", "nagai", "long", "நீளமான"),
      v("みじかい", "mijikai", "short", "குட்டையான"),
      v("あかい", "akai", "red", "சிவப்பு"),
      v("あおい", "aoi", "blue", "நீலம்"),
      v("しろい", "shiroi", "white", "வெள்ளை"),
      v("くろい", "kuroi", "black", "கருப்பு"),
      v("おおい", "ooi", "many / much", "அதிகமான"),
      v("すくない", "sukunai", "few / little", "குறைவான"),
      v("いい", "ii", "good", "நல்ல"),
      v("わるい", "warui", "bad", "கெட்ட")
    ],
    sentences: [
      ["この りんごは おいしいです。", "Kono ringo wa oishii desu.", "This apple is delicious.", "இந்த ஆப்பிள் சுவையானது."],
      ["きのうは あつくなかったです。", "Kinou wa atsukunakatta desu.", "Yesterday was not hot.", "நேற்று வெப்பமாக இல்லை."],
      ["あたらしい くるまは たかいです。", "Atarashii kuruma wa takai desu.", "The new car is expensive.", "புதிய கார் விலை உயர்ந்தது."]
    ],
    extra: [
      qz("What is the negative of たかいです?", "たかいです-ன் எதிர்மறை?",
        ["たかくないです", "たかないです", "たかいじゃないです", "たかくありません です"], 0,
        "Drop い and add くないです.", "い நீக்கி くないです சேர்க்கவும்."),
      qz("What is the past of おいしいです?", "おいしいです-ன் இறந்தகாலம்?",
        ["おいしかったです", "おいしいでした", "おいしくなかったです", "おいしでした"], 0,
        "Drop い and add かったです.", "い நீக்கி かったです சேர்க்கவும்."),
      qz("What is the negative of いいです?", "いいです-ன் எதிர்மறை?",
        ["よくないです", "いくないです", "いいくないです", "わるいです"], 0,
        "いい is irregular: it becomes よく.", "いい ஒழுங்கற்றது: よく ஆகும்.")
    ]
  },
  20: {
    objectives: [
      ["Learn common な-adjectives", "பொதுவான な-பெயரடைகளைக் கற்றல்"],
      ["Make present, negative and past forms", "நிகழ்கால, எதிர்மறை, இறந்தகால வடிவங்கள் அமைத்தல்"]
    ],
    intro: [
      "な-adjectives work like nouns. しずか (quiet): しずかです → しずかじゃありません → しずかでした → しずかじゃありませんでした. Before a noun add な: しずかな へや. Careful: きれい and きらい end in い but are な-adjectives.",
      "な-பெயரடைகள் பெயர்ச்சொற்கள் போலவே செயல்படும். しずか (அமைதியான): しずかです → しずかじゃありません → しずかでした → しずかじゃありませんでした. பெயர்ச்சொல்லுக்கு முன் な சேர்க்கவும்: しずかな へや. கவனம்: きれい, きらい い-ல் முடிந்தாலும் な-பெயரடைகள்."
    ],
    vocab: [
      v("きれい", "kirei", "beautiful / clean", "அழகான / சுத்தமான"),
      v("しずか", "shizuka", "quiet", "அமைதியான"),
      v("にぎやか", "nigiyaka", "lively / busy", "கலகலப்பான"),
      v("げんき", "genki", "healthy / energetic", "ஆரோக்கியமான / உற்சாகமான"),
      v("ゆうめい", "yuumei", "famous", "புகழ்பெற்ற"),
      v("しんせつ", "shinsetsu", "kind / helpful", "அன்பான / உதவும்"),
      v("すき", "suki", "liked", "பிடித்த"),
      v("きらい", "kirai", "disliked", "பிடிக்காத"),
      v("だいすき", "daisuki", "very liked", "மிகவும் பிடித்த"),
      v("じょうず", "jouzu", "good at", "திறமையான"),
      v("へた", "heta", "bad at", "திறமையற்ற"),
      v("べんり", "benri", "convenient", "வசதியான"),
      v("ふべん", "fuben", "inconvenient", "வசதியற்ற"),
      v("ひま", "hima", "free (not busy)", "ஓய்வான"),
      v("たいせつ", "taisetsu", "important", "முக்கியமான"),
      v("だいじょうぶ", "daijoubu", "OK / all right", "பரவாயில்லை / சரி"),
      v("いろいろ", "iroiro", "various", "பலவிதமான")
    ],
    sentences: [
      ["この へやは しずかです。", "Kono heya wa shizuka desu.", "This room is quiet.", "இந்த அறை அமைதியானது."],
      ["きのうは ひまでした。", "Kinou wa hima deshita.", "I was free yesterday.", "நேற்று ஓய்வாக இருந்தேன்."],
      ["しずかな こうえんです。", "Shizuka na kouen desu.", "It is a quiet park.", "இது அமைதியான பூங்கா."],
      ["ともだちは しんせつです。", "Tomodachi wa shinsetsu desu.", "My friend is kind.", "என் நண்பர் அன்பானவர்."]
    ],
    extra: [
      qz("What is the negative of しずかです?", "しずかです-ன் எதிர்மறை?",
        ["しずかじゃありません", "しずかくないです", "しずかないです", "しずかでした"], 0,
        "な-adjectives use じゃありません.", "な-பெயரடைகள் じゃありません பயன்படுத்தும்."),
      qz("Which is correct before a noun?", "பெயர்ச்சொல்லுக்கு முன் எது சரி?",
        ["きれいな はな", "きれいい はな", "きれいの はな", "きれい はなな"], 0,
        "な-adjective + な + noun.", "な-பெயரடை + な + பெயர்ச்சொல்.")
    ]
  },
  21: {
    objectives: [
      ["Say what exists with あります and います", "あります, います கொண்டு இருப்பைக் கூறுதல்"],
      ["Use position words (うえ, した, なか…)", "இட நிலைச் சொற்களைப் (うえ, した, なか…) பயன்படுத்துதல்"]
    ],
    intro: [
      "Place に Thing が あります. Use います for people and animals. Position words: うえ (on), した (under), なか (in). Example: つくえの うえに ほんが あります = there is a book on the desk. To ask: なにが ありますか。 or だれが いますか。",
      "இடம் に பொருள் が あります. மனிதர், விலங்குகளுக்கு います. நிலைச் சொற்கள்: うえ (மேலே), した (கீழே), なか (உள்ளே). எ.கா: つくえの うえに ほんが あります = மேசை மேல் புத்தகம் உள்ளது. கேட்க: なにが ありますか。, だれが いますか。"
    ],
    vocab: [
      v("あります", "arimasu", "there is (things)", "உள்ளது (பொருள்)"),
      v("います", "imasu", "there is (people / animals)", "இருக்கிறார் / இருக்கிறது (உயிர்)"),
      v("うえ", "ue", "on / above", "மேலே"),
      v("した", "shita", "under / below", "கீழே"),
      v("なか", "naka", "inside", "உள்ளே"),
      v("そと", "soto", "outside", "வெளியே"),
      v("まえ", "mae", "front / before", "முன்"),
      v("うしろ", "ushiro", "behind", "பின்"),
      v("となり", "tonari", "next to", "அடுத்து"),
      v("ちかく", "chikaku", "nearby", "அருகில்"),
      v("みぎ", "migi", "right", "வலது"),
      v("ひだり", "hidari", "left", "இடது"),
      v("つくえ", "tsukue", "desk", "மேசை"),
      v("いす", "isu", "chair", "நாற்காலி"),
      v("ねこ", "neko", "cat", "பூனை"),
      v("いぬ", "inu", "dog", "நாய்"),
      v("にわ", "niwa", "garden", "தோட்டம்")
    ],
    sentences: [
      ["つくえの うえに ほんが あります。", "Tsukue no ue ni hon ga arimasu.", "There is a book on the desk.", "மேசை மேல் ஒரு புத்தகம் உள்ளது."],
      ["にわに ねこが います。", "Niwa ni neko ga imasu.", "There is a cat in the garden.", "தோட்டத்தில் ஒரு பூனை இருக்கிறது."],
      ["えきの ちかくに ぎんこうが あります。", "Eki no chikaku ni ginkou ga arimasu.", "There is a bank near the station.", "ரயில் நிலையம் அருகில் ஒரு வங்கி உள்ளது."],
      ["かばんの なかに なにが ありますか。", "Kaban no naka ni nani ga arimasu ka.", "What is in the bag?", "பையில் என்ன உள்ளது?"]
    ],
    extra: [
      qz("Fill in the blank: いぬが ___。", "நிரப்புக: いぬが ___。", ["います", "あります", "いきます", "ありません"], 0,
        "Use います for animals and people.", "உயிருள்ளவற்றுக்கு います."),
      qz("Fill in the blank: つくえの ___ に ほんが あります。 (on the desk)", "நிரப்புக: つくえの ___ に ほんが あります。 (மேசை மேல்)", ["うえ", "した", "なか", "うしろ"], 0,
        "うえ = on / above.", "うえ = மேலே.")
    ]
  },
  22: {
    objectives: [
      ["Make the te-form of verbs", "வினைகளின் て-வடிவம் அமைத்தல்"],
      ["Use てください, ています, てもいいです, てはいけません, ないでください", "てください, ています, てもいいです, てはいけません, ないでください பயன்படுத்துதல்"]
    ],
    intro: [
      "Te-form rules. Group 2: drop る + て (たべる → たべて). Group 1: う, つ, る → って (かう → かって); む, ぶ, ぬ → んで (のむ → のんで); く → いて (かく → かいて); ぐ → いで; す → して (はなす → はなして). Exception: いく → いって. Group 3: して, きて. Patterns: 〜てください (please do), 〜ています (doing now), 〜てもいいです (may), 〜てはいけません (must not), 〜ないでください (please do not).",
      "て-வடிவ விதிகள். குழு 2: る நீக்கி + て (たべる → たべて). குழு 1: う, つ, る → って (かう → かって); む, ぶ, ぬ → んで (のむ → のんで); く → いて (かく → かいて); ぐ → いで; す → して (はなす → はなして). விதிவிலக்கு: いく → いって. குழு 3: して, きて. அமைப்புகள்: 〜てください (செய்யுங்கள்), 〜ています (செய்துகொண்டிருக்கிறேன்), 〜てもいいです (செய்யலாம்), 〜てはいけません (செய்யக்கூடாது), 〜ないでください (செய்யாதீர்கள்)."
    ],
    vocab: [
      v("たべて", "tabete", "eat → te-form", "உண்ணு → て-வடிவம்"),
      v("のんで", "nonde", "drink → te-form", "குடி → て-வடிவம்"),
      v("みて", "mite", "see → te-form", "பார் → て-வடிவம்"),
      v("きいて", "kiite", "listen → te-form", "கேள் → て-வடிவம்"),
      v("よんで", "yonde", "read → te-form", "படி → て-வடிவம்"),
      v("かいて", "kaite", "write → te-form", "எழுது → て-வடிவம்"),
      v("いって", "itte", "go → te-form (exception)", "போ → て-வடிவம் (விதிவிலக்கு)"),
      v("かって", "katte", "buy → te-form", "வாங்கு → て-வடிவம்"),
      v("まって", "matte", "wait → te-form", "காத்திரு → て-வடிவம்"),
      v("はなして", "hanashite", "speak → te-form", "பேசு → て-வடிவம்"),
      v("して", "shite", "do → te-form", "செய் → て-வடிவம்"),
      v("きて", "kite", "come → te-form", "வா → て-வடிவம்")
    ],
    sentences: [
      ["ゆっくり はなして ください。", "Yukkuri hanashite kudasai.", "Please speak slowly.", "மெதுவாகப் பேசுங்கள்."],
      ["いま ほんを よんで います。", "Ima hon o yonde imasu.", "I am reading a book now.", "இப்போது புத்தகம் படித்துக்கொண்டிருக்கிறேன்."],
      ["ここで しゃしんを とっても いいです。", "Koko de shashin o tottemo ii desu.", "You may take photos here.", "இங்கே புகைப்படம் எடுக்கலாம்."],
      ["ここに はいっては いけません。", "Koko ni haitte wa ikemasen.", "You must not enter here.", "இங்கே நுழையக் கூடாது."],
      ["ここで しゃしんを とらないで ください。", "Koko de shashin o toranaide kudasai.", "Please do not take photos here.", "இங்கே புகைப்படம் எடுக்காதீர்கள்."]
    ],
    extra: [
      qz("What is the te-form of のむ?", "のむ-ன் て-வடிவம்?", ["のんで", "のみて", "のって", "のいて"], 0,
        "む → んで.", "む → んで."),
      qz("What is the te-form of いく?", "いく-ன் て-வடிவம்?", ["いって", "いいて", "いくて", "いんで"], 0,
        "いく is an exception: いって.", "いく விதிவிலக்கு: いって."),
      qz("What is the te-form of たべる?", "たべる-ன் て-வடிவம்?", ["たべて", "たべって", "たべで", "たびて"], 0,
        "Group 2: drop る, add て.", "குழு 2: る நீக்கி て சேர்க்கவும்."),
      qz("Which means “You must not enter here”?", "“இங்கே நுழையக் கூடாது” எது?",
        ["ここに はいっては いけません。", "ここに はいって ください。", "ここに はいっても いいです。", "ここに はいります。"], 0,
        "〜ては いけません = must not.", "〜ては いけません = செய்யக்கூடாது.")
    ]
  },
  23: {
    objectives: [
      ["Read and recognise the kanji for numbers, days and time", "எண்கள், நாட்கள், நேரத்துக்கான காஞ்சியை வாசித்து அடையாளம் காணுதல்"],
      ["Read days of the week in kanji", "வாரநாட்களைக் காஞ்சியில் வாசித்தல்"]
    ],
    intro: [
      "Kanji have two kinds of readings: on-yomi (Chinese-style, used in compounds like 月曜日) and kun-yomi (Japanese-style, used alone like ひ). Learn 5 kanji a day and write each one 5 times. Today: numbers, days, years and time. The two readings are shown as “on / kun”.",
      "காஞ்சிக்கு இரு வாசிப்புகள்: on-yomi (சீனப் பாணி; 月曜日 போன்ற கூட்டுச் சொற்களில்) மற்றும் kun-yomi (ஜப்பானியப் பாணி; தனியாக வரும்போது, எ.கா. ひ). தினமும் 5 காஞ்சி கற்று, ஒவ்வொன்றையும் 5 முறை எழுதுங்கள். இன்று: எண்கள், நாட்கள், ஆண்டு, நேரம். இரு வாசிப்புகளும் “on / kun” எனக் காட்டப்படுகின்றன."
    ],
    tips: [
      "Do not try to memorise all 30 in one sitting. Review 10, rest, then 10 more.",
      "30-ஐயும் ஒரே நேரத்தில் மனப்பாடம் செய்ய வேண்டாம். 10 படித்து, ஓய்வெடுத்து, மீண்டும் 10 படியுங்கள்."
    ],
    vocab: [
      v("一", "ichi / hito(tsu)", "one", "ஒன்று", "いち"),
      v("二", "ni / futa(tsu)", "two", "இரண்டு", "に"),
      v("三", "san / mit(tsu)", "three", "மூன்று", "さん"),
      v("四", "shi, yon / yot(tsu)", "four", "நான்கு", "よん"),
      v("五", "go / itsu(tsu)", "five", "ஐந்து", "ご"),
      v("六", "roku / mut(tsu)", "six", "ஆறு", "ろく"),
      v("七", "shichi, nana / nana(tsu)", "seven", "ஏழு", "なな"),
      v("八", "hachi / yat(tsu)", "eight", "எட்டு", "はち"),
      v("九", "kyuu, ku / kokono(tsu)", "nine", "ஒன்பது", "きゅう"),
      v("十", "juu / too", "ten", "பத்து", "じゅう"),
      v("百", "hyaku", "hundred", "நூறு", "ひゃく"),
      v("千", "sen", "thousand", "ஆயிரம்", "せん"),
      v("万", "man", "ten thousand", "பத்தாயிரம்", "まん"),
      v("円", "en / maru(i)", "yen / circle", "யென் (ஜப்பானிய நாணயம்) / வட்டம்", "えん"),
      v("日", "nichi, jitsu / hi", "day / sun", "நாள் / சூரியன்", "にち"),
      v("月", "getsu, gatsu / tsuki", "month / moon", "மாதம் / நிலவு", "げつ"),
      v("火", "ka / hi", "fire", "நெருப்பு", "か"),
      v("水", "sui / mizu", "water", "தண்ணீர்", "すい"),
      v("木", "moku / ki", "tree / wood", "மரம்", "もく"),
      v("金", "kin / kane", "gold / money", "தங்கம் / பணம்", "きん"),
      v("土", "do / tsuchi", "earth / soil", "மண்", "ど"),
      v("曜", "you", "day of the week", "வாரநாள்", "よう"),
      v("週", "shuu", "week", "வாரம்", "しゅう"),
      v("年", "nen / toshi", "year", "ஆண்டு", "ねん"),
      v("今", "kon / ima", "now", "இப்போது", "いま"),
      v("毎", "mai", "every", "ஒவ்வொரு", "まい"),
      v("何", "ka / nani, nan", "what", "என்ன", "なに"),
      v("時", "ji / toki", "time / hour", "நேரம் / மணி", "じ"),
      v("分", "fun, bun / wa(karu)", "minute / understand", "நிமிடம் / புரிந்துகொள்", "ふん"),
      v("半", "han / naka(ba)", "half", "பாதி", "はん")
    ],
    sentences: [
      ["今日は 月曜日です。", "Kyou wa getsuyoubi desu.", "Today is Monday.", "இன்று திங்கட்கிழமை."],
      ["今 何時ですか。", "Ima nanji desu ka.", "What time is it now?", "இப்போது மணி என்ன?"],
      ["これは 三百円です。", "Kore wa sanbyaku en desu.", "This is 300 yen.", "இது 300 யென்."],
      ["毎日 九時に おきます。", "Mainichi kuji ni okimasu.", "I wake up at 9 every day.", "தினமும் 9 மணிக்கு எழுகிறேன்."]
    ],
    extra: [
      qz("How do you read 三百?", "三百-ஐ எப்படி வாசிப்பது?", ["さんびゃく", "さんひゃく", "みっぴゃく", "さんぴゃく"], 0,
        "300 is irregular: さんびゃく.", "300 ஒழுங்கற்றது: さんびゃく."),
      qz("How do you read 水曜日?", "水曜日-ஐ எப்படி வாசிப்பது?", ["すいようび", "みずようび", "もくようび", "どようび"], 0,
        "水 = すい in the weekday word.", "வாரநாட்பெயரில் 水 = すい."),
      qz("Which kanji means “week”?", "“வாரம்” என்பதன் காஞ்சி எது?", ["週", "年", "時", "分"], 0,
        "週 = week (今週 this week).", "週 = வாரம் (今週 = இந்த வாரம்).")
    ]
  },
  24: {
    objectives: [
      ["Read kanji for people, school and the body", "மனிதர், பள்ளி, உடலுக்கான காஞ்சியை வாசித்தல்"],
      ["Read kanji for common actions", "பொதுவான செயல்களுக்கான காஞ்சியை வாசித்தல்"]
    ],
    intro: [
      "Today: people, school, body parts and the kanji of the verbs you already know (行く, 食べる, 読む…). Verb kanji are shown with the part written in hiragana, e.g. 食べる: 食 is the kanji and べる is hiragana (okurigana).",
      "இன்று: மனிதர், பள்ளி, உடல் உறுப்புகள் மற்றும் நீங்கள் அறிந்த வினைகளின் காஞ்சி (行く, 食べる, 読む…). வினைக் காஞ்சியுடன் ஹிரகானா பகுதியும் (okurigana) வரும், எ.கா. 食べる: 食 காஞ்சி, べる ஹிரகானா."
    ],
    tips: [
      "Write the verb with its ending: 行く, 来る, 食べる. This is how it appears in the exam.",
      "வினையை அதன் முடிவுடன் எழுதுங்கள்: 行く, 来る, 食べる. தேர்வில் இப்படித்தான் வரும்."
    ],
    vocab: [
      v("人", "jin, nin / hito", "person", "நபர்", "ひと"),
      v("子", "shi, su / ko", "child", "குழந்தை", "こ"),
      v("女", "jo / onna", "woman", "பெண்", "おんな"),
      v("男", "dan / otoko", "man", "ஆண்", "おとこ"),
      v("父", "fu / chichi", "father", "தந்தை", "ちち"),
      v("母", "bo / haha", "mother", "தாய்", "はは"),
      v("友", "yuu / tomo", "friend", "நண்பர்", "とも"),
      v("先", "sen / saki", "previous / ahead", "முந்தைய / முன்", "さき"),
      v("生", "sei, shou / i(kiru), u(mareru)", "life / birth", "வாழ்க்கை / பிறப்பு", "せい"),
      v("学", "gaku / mana(bu)", "study", "படிப்பு", "がく"),
      v("校", "kou", "school", "பள்ளி", "こう"),
      v("語", "go / kata(ru)", "language / word", "மொழி / சொல்", "ご"),
      v("本", "hon / moto", "book / origin", "புத்தகம் / மூலம்", "ほん"),
      v("目", "moku / me", "eye", "கண்", "め"),
      v("耳", "ji / mimi", "ear", "காது", "みみ"),
      v("口", "kou / kuchi", "mouth", "வாய்", "くち"),
      v("手", "shu / te", "hand", "கை", "て"),
      v("足", "soku / ashi", "leg / foot", "கால்", "あし"),
      v("力", "ryoku / chikara", "power", "வலிமை", "ちから"),
      v("行く", "kou / i(ku)", "to go", "போ", "いく"),
      v("来る", "rai / ku(ru)", "to come", "வா", "くる"),
      v("出る", "shutsu / de(ru)", "to go out", "வெளியே போ", "でる"),
      v("入る", "nyuu / hai(ru)", "to enter", "உள்ளே நுழை", "はいる"),
      v("食べる", "shoku / ta(beru)", "to eat", "உண்ணு", "たべる"),
      v("飲む", "in / no(mu)", "to drink", "குடி", "のむ"),
      v("見る", "ken / mi(ru)", "to see", "பார்", "みる"),
      v("聞く", "bun / ki(ku)", "to hear / ask", "கேள்", "きく"),
      v("書く", "sho / ka(ku)", "to write", "எழுது", "かく"),
      v("読む", "doku / yo(mu)", "to read", "படி", "よむ"),
      v("話す", "wa / hana(su)", "to speak", "பேசு", "はなす"),
      v("買う", "bai / ka(u)", "to buy", "வாங்கு", "かう"),
      v("会う", "kai / a(u)", "to meet", "சந்தி", "あう"),
      v("休む", "kyuu / yasu(mu)", "to rest", "ஓய்வெடு", "やすむ"),
      v("立つ", "ritsu / ta(tsu)", "to stand", "நில்", "たつ")
    ],
    sentences: [
      ["先生は 日本語を 話します。", "Sensei wa nihongo o hanashimasu.", "The teacher speaks Japanese.", "ஆசிரியர் ஜப்பானிய மொழி பேசுகிறார்."],
      ["毎日 本を 読みます。", "Mainichi hon o yomimasu.", "I read books every day.", "தினமும் புத்தகம் படிக்கிறேன்."],
      ["父は 毎日 水を 飲みます。", "Chichi wa mainichi mizu o nomimasu.", "My father drinks water every day.", "அப்பா தினமும் தண்ணீர் குடிக்கிறார்."],
      ["友だちに 会いました。", "Tomodachi ni aimashita.", "I met a friend.", "நண்பரைச் சந்தித்தேன்."]
    ],
    extra: [
      qz("How do you read 読む?", "読む-ஐ எப்படி வாசிப்பது?", ["よむ", "のむ", "かく", "みる"], 0,
        "読 = yo(mu), to read.", "読 = よむ, படித்தல்."),
      qz("Which kanji means “to eat”?", "“உண்ணு” என்பதன் காஞ்சி எது?", ["食", "飲", "見", "買"], 0,
        "食べる = to eat.", "食べる = உண்ணுதல்."),
      qz("How do you read 先生?", "先生-ஐ எப்படி வாசிப்பது?", ["せんせい", "さきなま", "せんしょう", "さきせい"], 0,
        "先生 (せんせい) = teacher.", "先生 (せんせい) = ஆசிரியர்.")
    ]
  },
  25: {
    objectives: [
      ["Read kanji for nature, places and directions", "இயற்கை, இடங்கள், திசைகளுக்கான காஞ்சியை வாசித்தல்"],
      ["Read kanji for common adjectives", "பொதுவான பெயரடைகளுக்கான காஞ்சியை வாசித்தல்"]
    ],
    intro: [
      "This is the biggest kanji day (49 kanji). Split it over two sittings if you need. Some of these (風, 暗, 遠, 明, 空, 田) are often counted as N4, so they are a bonus: learn the common ones first (山, 川, 駅, 店, 車, 大, 小, 高, 安, 新, 古).",
      "இது மிகப்பெரிய காஞ்சி நாள் (49 காஞ்சி). தேவைப்பட்டால் இரண்டு அமர்வாகப் பிரியுங்கள். இவற்றில் சில (風, 暗, 遠, 明, 空, 田) பெரும்பாலும் N4-ஆகக் கருதப்படுகின்றன; அவை கூடுதல். முதலில் பொதுவானவற்றைக் கற்கவும் (山, 川, 駅, 店, 車, 大, 小, 高, 安, 新, 古)."
    ],
    vocab: [
      v("山", "san / yama", "mountain", "மலை", "やま"),
      v("川", "sen / kawa", "river", "ஆறு", "かわ"),
      v("田", "den / ta", "rice field", "நெல் வயல்", "た"),
      v("花", "ka / hana", "flower", "பூ", "はな"),
      v("空", "kuu / sora", "sky / empty", "வானம் / வெறுமை", "そら"),
      v("雨", "u / ame", "rain", "மழை", "あめ"),
      v("天", "ten", "heaven / sky", "வானம்", "てん"),
      v("気", "ki", "spirit / air", "உணர்வு / காற்று", "き"),
      v("電", "den", "electricity", "மின்சாரம்", "でん"),
      v("風", "fuu / kaze", "wind", "காற்று", "かぜ"),
      v("魚", "gyo / sakana", "fish", "மீன்", "さかな"),
      v("東", "tou / higashi", "east", "கிழக்கு", "ひがし"),
      v("西", "sei / nishi", "west", "மேற்கு", "にし"),
      v("南", "nan / minami", "south", "தெற்கு", "みなみ"),
      v("北", "hoku / kita", "north", "வடக்கு", "きた"),
      v("上", "jou / ue", "up / above", "மேலே", "うえ"),
      v("下", "ka / shita", "down / below", "கீழே", "した"),
      v("左", "sa / hidari", "left", "இடது", "ひだり"),
      v("右", "u, yuu / migi", "right", "வலது", "みぎ"),
      v("中", "chuu / naka", "middle / inside", "நடு / உள்ளே", "なか"),
      v("外", "gai / soto", "outside", "வெளியே", "そと"),
      v("前", "zen / mae", "front / before", "முன்", "まえ"),
      v("後", "go / ushiro, ato", "behind / after", "பின் / பிறகு", "うしろ"),
      v("国", "koku / kuni", "country", "நாடு", "くに"),
      v("駅", "eki", "station", "ரயில் நிலையம்", "えき"),
      v("道", "dou / michi", "road / way", "சாலை / வழி", "みち"),
      v("店", "ten / mise", "shop", "கடை", "みせ"),
      v("社", "sha / yashiro", "company / shrine", "நிறுவனம் / கோயில்", "しゃ"),
      v("車", "sha / kuruma", "car / vehicle", "கார் / வாகனம்", "くるま"),
      v("物", "butsu / mono", "thing", "பொருள்", "もの"),
      v("午", "go", "noon", "நண்பகல்", "ご"),
      v("大きい", "dai / oo(kii)", "big", "பெரிய", "おおきい"),
      v("小さい", "shou / chii(sai)", "small", "சிறிய", "ちいさい"),
      v("高い", "kou / taka(i)", "high / expensive", "உயரமான / விலை உயர்ந்த", "たかい"),
      v("安い", "an / yasu(i)", "cheap", "மலிவான", "やすい"),
      v("新しい", "shin / atara(shii)", "new", "புதிய", "あたらしい"),
      v("古い", "ko / furu(i)", "old", "பழைய", "ふるい"),
      v("長い", "chou / naga(i)", "long", "நீளமான", "ながい"),
      v("多い", "ta / oo(i)", "many", "அதிகமான", "おおい"),
      v("少ない", "shou / suku(nai)", "few", "குறைவான", "すくない"),
      v("白い", "haku / shiro(i)", "white", "வெள்ளை", "しろい"),
      v("黒い", "koku / kuro(i)", "black", "கருப்பு", "くろい"),
      v("赤い", "seki / aka(i)", "red", "சிவப்பு", "あかい"),
      v("青い", "sei / ao(i)", "blue", "நீலம்", "あおい"),
      v("近い", "kin / chika(i)", "near", "அருகிலுள்ள", "ちかい"),
      v("遠い", "en / too(i)", "far", "தொலைவிலுள்ள", "とおい"),
      v("明るい", "mei / akaru(i)", "bright", "பிரகாசமான", "あかるい"),
      v("暗い", "an / kura(i)", "dark", "இருண்ட", "くらい"),
      v("間", "kan / aida", "between / interval", "இடையில்", "あいだ")
    ],
    sentences: [
      ["今日は いい 天気です。", "Kyou wa ii tenki desu.", "The weather is nice today.", "இன்று வானிலை நன்றாக உள்ளது."],
      ["駅は 右です。", "Eki wa migi desu.", "The station is on the right.", "ரயில் நிலையம் வலது பக்கம்."],
      ["あの 山は 高いです。", "Ano yama wa takai desu.", "That mountain is high.", "அந்த மலை உயரமானது."],
      ["新しい 車は 高いです。", "Atarashii kuruma wa takai desu.", "The new car is expensive.", "புதிய கார் விலை உயர்ந்தது."],
      ["あの 店は 駅の 前に あります。", "Ano mise wa eki no mae ni arimasu.", "That shop is in front of the station.", "அந்தக் கடை ரயில் நிலையத்தின் முன் உள்ளது."]
    ],
    extra: [
      qz("How do you read 新しい?", "新しい-ஐ எப்படி வாசிப்பது?", ["あたらしい", "あらたしい", "しんしい", "にいしい"], 0,
        "新しい = あたらしい (new).", "新しい = あたらしい (புதிய)."),
      qz("Which kanji means “station”?", "“ரயில் நிலையம்” என்பதன் காஞ்சி எது?", ["駅", "店", "国", "道"], 0,
        "駅 = えき, station.", "駅 = えき."),
      qz("How do you read 午後?", "午後-ஐ எப்படி வாசிப்பது?", ["ごご", "うまご", "ごうご", "ごがく"], 0,
        "午後 = ごご (p.m.).", "午後 = ごご (பிற்பகல்)."),
      qz("Which kanji means “east”?", "“கிழக்கு” என்பதன் காஞ்சி எது?", ["東", "西", "南", "北"], 0,
        "東 = ひがし, east.", "東 = ひがし, கிழக்கு.")
    ]
  },
  26: {
    objectives: [
      ["Learn family, food and everyday-object words", "குடும்பம், உணவு, அன்றாடப் பொருள்களின் சொற்களைக் கற்றல்"],
      ["Learn counters for people, long items and ages", "மனிதர்கள், நீளமான பொருள்கள், வயதுக்கான எண்ணுச் சொற்களைக் கற்றல்"],
      ["Revise more N5 verbs", "மேலும் N5 வினைகளை மீள்பார்த்தல்"]
    ],
    intro: [
      "Revision day with the word groups the exam uses most. For your own family use ちち, はは, あに, あね. For someone else's family use おとうさん, おかあさん, おにいさん, おねえさん. Counters change their sound: いっぽん, にほん, さんぼん.",
      "தேர்வில் அதிகம் வரும் சொற்குழுக்களின் மீள்பார்வை நாள். உங்கள் குடும்பத்துக்கு ちち, はは, あに, あね; பிறர் குடும்பத்துக்கு おとうさん, おかあさん, おにいさん, おねえさん. எண்ணுச் சொற்கள் ஒலி மாறும்: いっぽん, にほん, さんぼん."
    ],
    vocab: [
      v("かぞく", "kazoku", "family", "குடும்பம்"),
      v("ちち / おとうさん", "chichi / otousan", "father (my / someone's)", "தந்தை (என் / பிறரின்)", "ちち"),
      v("はは / おかあさん", "haha / okaasan", "mother (my / someone's)", "தாய் (என் / பிறரின்)", "はは"),
      v("あに / おにいさん", "ani / oniisan", "older brother", "அண்ணன்", "あに"),
      v("あね / おねえさん", "ane / oneesan", "older sister", "அக்கா", "あね"),
      v("おとうと", "otouto", "younger brother", "தம்பி"),
      v("いもうと", "imouto", "younger sister", "தங்கை"),
      v("おじいさん", "ojiisan", "grandfather / old man", "தாத்தா"),
      v("おばあさん", "obaasan", "grandmother / old woman", "பாட்டி"),
      v("こども", "kodomo", "child", "குழந்தை"),
      v("ごはん", "gohan", "cooked rice / meal", "சாதம் / உணவு"),
      v("みず", "mizu", "water", "தண்ணீர்"),
      v("おちゃ", "ocha", "tea", "தேநீர்"),
      v("にく", "niku", "meat", "இறைச்சி"),
      v("さかな", "sakana", "fish", "மீன்"),
      v("やさい", "yasai", "vegetables", "காய்கறிகள்"),
      v("たまご", "tamago", "egg", "முட்டை"),
      v("くだもの", "kudamono", "fruit", "பழம்"),
      v("りんご", "ringo", "apple", "ஆப்பிள்"),
      v("ぎゅうにゅう", "gyuunyuu", "milk", "பால்"),
      v("かさ", "kasa", "umbrella", "குடை"),
      v("とけい", "tokei", "watch / clock", "கடிகாரம்"),
      v("くつ", "kutsu", "shoes", "காலணி"),
      v("でんわ", "denwa", "telephone", "தொலைபேசி"),
      v("じてんしゃ", "jitensha", "bicycle", "மிதிவண்டி"),
      v("めがね", "megane", "glasses", "கண்ணாடி"),
      v("てがみ", "tegami", "letter", "கடிதம்"),
      v("しゃしん", "shashin", "photograph", "புகைப்படம்"),
      v("ノート", "nooto", "notebook", "குறிப்பேடு"),
      v("ペン", "pen", "pen", "பேனா"),
      v("アパート", "apaato", "apartment", "அடுக்குமாடி வீடு"),
      v("エレベーター", "erebeetaa", "elevator", "மின்தூக்கி"),
      v("テーブル", "teeburu", "table", "மேசை"),
      v("ドア", "doa", "door", "கதவு"),
      v("テスト", "tesuto", "test", "தேர்வு"),
      v("スポーツ", "supootsu", "sports", "விளையாட்டு"),
      v("ズボン", "zubon", "trousers", "கால்சட்டை"),
      v("ネクタイ", "nekutai", "necktie", "கழுத்துப்பட்டை"),
      v("ひとつ・ふたつ・みっつ", "hitotsu, futatsu, mittsu", "1, 2, 3 things", "1, 2, 3 பொருள்கள்", "ひとつ、ふたつ、みっつ"),
      v("ひとり・ふたり・さんにん", "hitori, futari, sannin", "1, 2, 3 people", "1, 2, 3 நபர்கள்", "ひとり、ふたり、さんにん"),
      v("いっぽん・にほん・さんぼん", "ippon, nihon, sanbon", "1, 2, 3 long items (pens, bottles)", "1, 2, 3 நீளமான பொருள்கள் (பேனா, பாட்டில்)", "いっぽん、にほん、さんぼん"),
      v("いちまい・にまい", "ichimai, nimai", "1, 2 flat items (paper, shirts)", "1, 2 தட்டையான பொருள்கள் (தாள், சட்டை)", "いちまい、にまい"),
      v("いっさつ・にさつ", "issatsu, nisatsu", "1, 2 books", "1, 2 புத்தகங்கள்", "いっさつ、にさつ"),
      v("いっかい・にかい", "ikkai, nikai", "once, twice", "ஒருமுறை, இருமுறை", "いっかい、にかい"),
      v("いっさい・にさい・はたち", "issai, nisai, hatachi", "1, 2 years old, 20 years old", "1, 2 வயது, 20 வயது", "いっさい、にさい、はたち"),
      v("あける", "akeru", "to open (something)", "திற"),
      v("しめる", "shimeru", "to close (something)", "மூடு"),
      v("つかう", "tsukau", "to use", "பயன்படுத்து"),
      v("つくる", "tsukuru", "to make", "செய் / உருவாக்கு"),
      v("はたらく", "hataraku", "to work", "வேலை செய்"),
      v("やすむ", "yasumu", "to rest / be absent", "ஓய்வெடு / விடுப்பெடு"),
      v("ならう", "narau", "to learn", "கற்றுக்கொள்"),
      v("おしえる", "oshieru", "to teach / tell", "கற்றுக்கொடு / சொல்"),
      v("わかる", "wakaru", "to understand", "புரிந்துகொள்"),
      v("あるく", "aruku", "to walk", "நட"),
      v("およぐ", "oyogu", "to swim", "நீந்து"),
      v("あそぶ", "asobu", "to play", "விளையாடு"),
      v("のる", "noru", "to ride / board", "ஏறு / பயணம் செய்"),
      v("おりる", "oriru", "to get off", "இறங்கு")
    ],
    extra: [
      qz("How do you say “two people”?", "“இரண்டு பேர்” எப்படிச் சொல்வது?", ["ふたり", "ににん", "ふたつ", "にほん"], 0,
        "2 people is ふたり (irregular).", "2 நபர் = ふたり (ஒழுங்கற்றது)."),
      qz("Which word is “older sister” when talking about someone else's?", "பிறரின் அக்காவைக் குறிக்கும் சொல் எது?", ["おねえさん", "あね", "いもうと", "おかあさん"], 0,
        "おねえさん is used for another person's older sister.", "おねえさん பிறரின் அக்காவுக்கு."),
      qz("Which counter is for pens and bottles?", "பேனா, பாட்டிலுக்கான எண்ணுச் சொல் எது?", ["〜ほん (ぼん・ぽん)", "〜まい", "〜にん", "〜かい"], 0,
        "Long, thin things use 本.", "நீளமான பொருள்களுக்கு 本.")
    ]
  },
  27: {
    objectives: [
      ["Read a short passage about someone's day", "ஒருவரின் நாளைப் பற்றிய சிறு பகுதியை வாசித்தல்"],
      ["Understand simple notices and signs", "எளிய அறிவிப்புகள், பலகைகளைப் புரிந்துகொள்ளுதல்"]
    ],
    intro: [
      "N5 reading uses short notices, memos and a passage of a few lines. Strategy: 1) find the times, places and numbers first, 2) read the question before the passage, 3) do not stop at one unknown word. Read Ravi's day below, then answer the questions.",
      "N5 வாசிப்பில் சிறு அறிவிப்புகள், குறிப்புகள், சில வரிகள் கொண்ட பகுதி வரும். உத்தி: 1) நேரம், இடம், எண்களை முதலில் தேடுங்கள், 2) பகுதிக்கு முன் கேள்வியைப் படியுங்கள், 3) தெரியாத ஒரு சொல்லில் நின்றுவிடாதீர்கள். கீழே ரவியின் நாளைப் படித்து, கேள்விகளுக்குப் பதில் சொல்லுங்கள்."
    ],
    vocab: [
      v("まいあさ", "maiasa", "every morning", "ஒவ்வொரு காலையும்"),
      v("よる", "yoru", "night", "இரவு"),
      v("やすみ", "yasumi", "holiday / day off", "விடுமுறை"),
      v("あるいて", "aruite", "on foot (walking)", "நடந்து"),
      v("うち", "uchi", "home", "வீடு")
    ],
    sentences: [
      ["わたしの なまえは ラヴィです。", "Watashi no namae wa Ravi desu.", "My name is Ravi.", "என் பெயர் ரவி."],
      ["わたしは がくせいです。", "Watashi wa gakusei desu.", "I am a student.", "நான் ஒரு மாணவர்."],
      ["まいあさ ろくじに おきます。", "Maiasa rokuji ni okimasu.", "I wake up at 6 every morning.", "தினமும் காலை 6 மணிக்கு எழுகிறேன்."],
      ["しちじに がっこうへ いきます。", "Shichiji ni gakkou e ikimasu.", "I go to school at 7.", "7 மணிக்குப் பள்ளிக்குப் போகிறேன்."],
      ["ともだちと ごはんを たべます。", "Tomodachi to gohan o tabemasu.", "I eat with my friends.", "நண்பர்களுடன் சாப்பிடுகிறேன்."],
      ["ごご ごじに うちへ かえります。", "Gogo goji ni uchi e kaerimasu.", "I go home at 5 p.m.", "பிற்பகல் 5 மணிக்கு வீடு திரும்புகிறேன்."],
      ["よる ほんを よみます。", "Yoru hon o yomimasu.", "At night I read a book.", "இரவில் புத்தகம் படிக்கிறேன்."],
      ["にちようびは がっこうへ いきません。", "Nichiyoubi wa gakkou e ikimasen.", "I do not go to school on Sunday.", "ஞாயிற்றுக்கிழமை பள்ளிக்குப் போவதில்லை."],
      ["ここで しゃしんを とらないで ください。", "Koko de shashin o toranaide kudasai.", "Notice: Please do not take photos here.", "அறிவிப்பு: இங்கே புகைப்படம் எடுக்காதீர்கள்."],
      ["えきまで あるいて じゅっぷんです。", "Eki made aruite juppun desu.", "Notice: It is 10 minutes on foot to the station.", "அறிவிப்பு: ரயில் நிலையம் நடந்து 10 நிமிடம்."]
    ],
    extra: [
      qz("What time does Ravi wake up?", "ரவி எத்தனை மணிக்கு எழுகிறார்?", ["6:00", "7:00", "5:00", "9:00"], 0,
        "まいあさ ろくじに おきます = 6 o'clock.", "ろくじ = 6 மணி."),
      qz("What does Ravi do at night?", "ரவி இரவில் என்ன செய்கிறார்?",
        ["He reads a book.", "He goes to school.", "He eats with friends.", "He goes to the station."], 0,
        "よる ほんを よみます.", "よる ほんを よみます."),
      qz("What does the sign “ここで しゃしんを とらないで ください” mean?", "“ここで しゃしんを とらないで ください” பலகையின் பொருள்?",
        ["Do not take photos here.", "You may take photos here.", "Photos are sold here.", "Please take a photo of me."], 0,
        "〜ないで ください = please do not.", "〜ないで ください = தயவுசெய்து செய்யாதீர்கள்."),
      qz("Does Ravi go to school on Sunday?", "ரவி ஞாயிற்றுக்கிழமை பள்ளிக்குப் போகிறாரா?",
        ["No", "Yes", "Only in the morning", "Every second week"], 0,
        "いきません = does not go.", "いきません = போவதில்லை.")
    ]
  },
  28: {
    objectives: [
      ["Listen for numbers, times and places", "எண்கள், நேரம், இடங்களைக் கவனித்துக் கேட்டல்"],
      ["Follow short everyday conversations", "சிறு அன்றாட உரையாடல்களைப் பின்தொடர்தல்"]
    ],
    intro: [
      "Listening is 30 minutes in the exam. Practice: click 🔊 on each line first and try to understand before you read the English. Listen for numbers, times and places. In the exam each recording is played twice. You can replay as many times as you like here.",
      "தேர்வில் கேட்டல் 30 நிமிடம். பயிற்சி: ஆங்கிலத்தைப் படிக்கும் முன் ஒவ்வொரு வரியிலும் 🔊 அழுத்திக் கேட்டுப் புரிந்துகொள்ள முயலுங்கள். எண்கள், நேரம், இடங்களுக்குக் கவனம் செலுத்துங்கள். தேர்வில் ஒவ்வொரு ஒலிப்பதிவும் இருமுறை ஒலிக்கும். இங்கே எத்தனை முறையும் கேட்கலாம்."
    ],
    vocab: [
      v("いらっしゃいませ", "irasshaimase", "Welcome (said by shop staff)", "வரவேற்கிறோம் (கடைக்காரர் கூறுவது)"),
      v("ください", "kudasai", "please give me", "தாருங்கள்"),
      v("じゃ", "ja", "well then", "அப்படியானால்"),
      v("まっすぐ", "massugu", "straight ahead", "நேராக"),
      v("ゆっくり", "yukkuri", "slowly", "மெதுவாக")
    ],
    sentences: [
      ["いらっしゃいませ。", "Irasshaimase.", "Dialogue 1 (shop). Staff: Welcome.", "உரையாடல் 1 (கடை). கடைக்காரர்: வரவேற்கிறோம்."],
      ["これは いくらですか。", "Kore wa ikura desu ka.", "Customer: How much is this?", "வாடிக்கையாளர்: இது எவ்வளவு?"],
      ["ごひゃくえんです。", "Gohyaku en desu.", "Staff: It is 500 yen.", "கடைக்காரர்: 500 யென்."],
      ["じゃ、これを ください。", "Ja, kore o kudasai.", "Customer: Then I will take this.", "வாடிக்கையாளர்: அப்படியானால் இதைத் தாருங்கள்."],
      ["いま なんじですか。", "Ima nanji desu ka.", "Dialogue 2 (time). A: What time is it now?", "உரையாடல் 2 (நேரம்). A: இப்போது மணி என்ன?"],
      ["さんじはんです。", "Sanji han desu.", "B: It is 3:30.", "B: மணி 3:30."],
      ["すみません、えきは どこですか。", "Sumimasen, eki wa doko desu ka.", "Dialogue 3 (directions). A: Excuse me, where is the station?", "உரையாடல் 3 (வழி). A: மன்னிக்கவும், ரயில் நிலையம் எங்கே?"],
      ["あの こうえんの うしろです。", "Ano kouen no ushiro desu.", "B: It is behind that park.", "B: அந்தப் பூங்காவின் பின்னால்."]
    ],
    extra: [
      qz("Dialogue 1: How much is it?", "உரையாடல் 1: விலை எவ்வளவு?", ["500 yen", "50 yen", "300 yen", "1000 yen"], 0,
        "ごひゃくえん = 500 yen.", "ごひゃくえん = 500 யென்."),
      qz("Dialogue 2: What time is it?", "உரையாடல் 2: மணி என்ன?", ["3:30", "4:30", "3:00", "2:30"], 0,
        "さんじはん = 3:30.", "さんじはん = 3:30."),
      qz("Dialogue 3: Where is the station?", "உரையாடல் 3: ரயில் நிலையம் எங்கே?",
        ["Behind the park", "In front of the park", "Next to the bank", "Far away"], 0,
        "うしろ = behind.", "うしろ = பின்னால்."),
      qz("What does じゃ、これを ください mean?", "じゃ、これを ください என்றால்?",
        ["Then I will take this, please.", "Where is this?", "I do not like this.", "How much is this?"], 0,
        "ください = please give me.", "ください = தாருங்கள்.")
    ]
  },
  29: {
    objectives: [
      ["Practise in the style of the JLPT N5 exam", "JLPT N5 தேர்வு பாணியில் பயிற்சி செய்தல்"],
      ["Find your weak days and revise them", "பலவீனமான நாட்களைக் கண்டறிந்து மீள்பார்த்தல்"]
    ],
    intro: [
      "This is an original practice test written for THALIR in the style of the JLPT N5. It is not copied from any real exam. As far as we know, the real N5 has three parts: Vocabulary (25 min), Grammar and Reading (50 min) and Listening (30 min), and you need 80 of 180 points with at least 19 in each part. Check jlpt.jp for the latest rules, and also try the official free sample questions at https://www.jlpt.jp/e/samples/forlearners.html",
      "இது THALIR-க்காக JLPT N5 பாணியில் எழுதப்பட்ட சொந்தப் பயிற்சித் தேர்வு. உண்மையான தேர்விலிருந்து நகலெடுக்கப்பட்டது அல்ல. எங்களுக்குத் தெரிந்தவரை உண்மையான N5-ல் மூன்று பகுதிகள்: சொற்களஞ்சியம் (25 நிமிடம்), இலக்கணம் & வாசிப்பு (50 நிமிடம்), கேட்டல் (30 நிமிடம்); 180 மதிப்பெண்ணில் 80 தேவை, ஒவ்வொரு பகுதியிலும் குறைந்தது 19. சமீபத்திய விதிகளுக்கு jlpt.jp பாருங்கள்; அதிகாரபூர்வ இலவச மாதிரி வினாக்களையும் முயலுங்கள்: https://www.jlpt.jp/e/samples/forlearners.html"
    ],
    extra: [
      qz("[Vocabulary] How do you read 学校?", "[சொற்கள்] 学校-ஐ எப்படி வாசிப்பது?", ["がっこう", "がくこう", "がっこ", "かっこう"], 0,
        "学校 = がっこう (school).", "学校 = がっこう (பள்ளி)."),
      qz("[Vocabulary] How do you read 来週?", "[சொற்கள்] 来週-ஐ எப்படி வாசிப்பது?", ["らいしゅう", "らいしゅ", "くるしゅう", "きしゅう"], 0,
        "来週 = らいしゅう (next week).", "来週 = らいしゅう (அடுத்த வாரம்)."),
      qz("[Vocabulary] Which kanji is read みせ?", "[சொற்கள்] みせ என வாசிக்கப்படும் காஞ்சி எது?", ["店", "駅", "国", "道"], 0,
        "店 = みせ (shop).", "店 = みせ (கடை)."),
      qz("[Vocabulary] Choose the best word: まいあさ コーヒーを ___。", "[சொற்கள்] சரியான சொல்: まいあさ コーヒーを ___。",
        ["のみます", "たべます", "よみます", "ききます"], 0,
        "You drink coffee: のみます.", "காபி குடிப்பது: のみます."),
      qz("[Vocabulary] Which word means “tomorrow”?", "[சொற்கள்] “நாளை” என்பதன் சொல் எது?", ["あした", "きのう", "きょう", "おととい"], 0,
        "あした = tomorrow.", "あした = நாளை."),
      qz("[Vocabulary] How do you read 日曜日?", "[சொற்கள்] 日曜日-ஐ எப்படி வாசிப்பது?", ["にちようび", "ひようび", "にちようひ", "げつようび"], 0,
        "日曜日 = にちようび (Sunday).", "日曜日 = にちようび (ஞாயிறு)."),
      qz("[Grammar] わたしは にほん ___ いきます。", "[இலக்கணம்] わたしは にほん ___ いきます。", ["へ", "を", "が", "と"], 0,
        "へ shows direction of movement.", "へ இயக்கத்தின் திசையைக் காட்டும்."),
      qz("[Grammar] これは ___ ほんです。 (my book)", "[இலக்கணம்] これは ___ ほんです。 (என் புத்தகம்)", ["わたしの", "わたしを", "わたしが", "わたしで"], 0,
        "の joins two nouns.", "の இரு பெயர்ச்சொற்களை இணைக்கும்."),
      qz("[Grammar] きのうは ___。 (It was hot.)", "[இலக்கணம்] きのうは ___。 (வெப்பமாக இருந்தது)",
        ["あつかったです", "あついでした", "あつくないでした", "あつだったです"], 0,
        "い-adjective past: かったです.", "い-பெயரடை இறந்தகாலம்: かったです."),
      qz("[Grammar] You must not take photos here. ここで しゃしんを とって ___。", "[இலக்கணம்] இங்கே புகைப்படம் எடுக்கக் கூடாது. ここで しゃしんを とって ___。",
        ["はいけません", "ください", "もいいです", "ます"], 0,
        "〜ては いけません = must not.", "〜ては いけません = செய்யக்கூடாது."),
      qz("[Grammar] へやに ねこ ___ います。", "[இலக்கணம்] へやに ねこ ___ います。", ["が", "を", "で", "へ"], 0,
        "が marks what exists.", "が இருப்பதைக் குறிக்கும்."),
      qz("[Grammar] タクシー ___ えきへ いきます。", "[இலக்கணம்] タクシー ___ えきへ いきます。", ["で", "を", "に", "と"], 0,
        "で marks the means of transport.", "で வாகனத்தைக் குறிக்கும்."),
      qz("[Grammar] ここに なまえを ___ ください。", "[இலக்கணம்] ここに なまえを ___ ください。", ["かいて", "かきて", "かって", "かんで"], 0,
        "かく → かいて.", "かく → かいて."),
      qz("[Reading] あしたは にちようびです。わたしは うちで ほんを よみます。 What will the speaker do tomorrow?",
        "[வாசிப்பு] あしたは にちようびです。わたしは うちで ほんを よみます。 நாளை பேசுபவர் என்ன செய்வார்?",
        ["Read a book at home", "Go to school", "Meet a friend", "Go shopping"], 0,
        "うちで ほんを よみます = read a book at home.", "うちで ほんを よみます = வீட்டில் புத்தகம் படிப்பார்."),
      qz("[Reading] いま くじはんです。 What time is it?", "[வாசிப்பு] いま くじはんです。 மணி என்ன?", ["9:30", "4:30", "9:00", "7:30"], 0,
        "くじ = 9 o'clock, はん = half.", "くじ = 9 மணி, はん = அரை.")
    ]
  },
  30: {
    objectives: [
      ["Check what you have learned in 30 days", "30 நாட்களில் கற்றதைச் சோதித்தல்"],
      ["Plan your next steps", "அடுத்த படிகளைத் திட்டமிடுதல்"]
    ],
    intro: [
      "Final assessment: 11 questions from the whole course. Aim for 80% or more. If you miss a question, go back to that day and review. Next steps: repeat the mock test, practise with the official sample questions at jlpt.jp, and keep reviewing flashcards a little every day. Congratulations on finishing the 30-day path! 頑張ってください (ganbatte kudasai: do your best).",
      "இறுதி மதிப்பீடு: முழுப் பாடத்திலிருந்து 11 கேள்விகள். 80% அல்லது அதற்கு மேல் இலக்காகக் கொள்ளுங்கள். தவறினால் அந்த நாளுக்குச் சென்று மீள்பார்வை செய்யுங்கள். அடுத்த படிகள்: மாதிரித் தேர்வை மீண்டும் எழுதுங்கள், jlpt.jp-ன் அதிகாரபூர்வ மாதிரி வினாக்களைப் பயிலுங்கள், தினமும் சிறிது நேரம் ஃபிளாஷ் கார்டுகளை மீள்பாருங்கள். 30 நாள் பாதையை முடித்ததற்கு வாழ்த்துகள்! 頑張ってください (ganbatte kudasai: உங்களால் முடிந்ததைச் செய்யுங்கள்)."
    ],
    extra: [
      qz("Which kana is “shi”?", "“shi” என்பது எந்த எழுத்து?", ["し", "ち", "つ", "さ"], 0, "し = shi.", "し = shi."),
      qz("What does コーヒー mean?", "コーヒー என்றால் என்ன?", ["coffee", "tea", "milk", "juice"], 0, "コーヒー = coffee.", "コーヒー = காபி."),
      qz("Which number is なな?", "なな என்பது எந்த எண்?", ["7", "4", "9", "10"], 0, "なな = 7.", "なな = 7."),
      qz("What is the polite negative of たべる?", "たべる-ன் மரியாதை எதிர்மறை?", ["たべません", "たべない", "たべませんでした", "たべます"], 0,
        "たべる → たべません.", "たべる → たべません."),
      qz("Fill in the blank: ともだちは がくせいです。わたし ___ がくせいです。", "நிரப்புக: ともだちは がくせいです。わたし ___ がくせいです。", ["も", "の", "を", "で"], 0,
        "も = also.", "も = …வும்."),
      qz("What is the past of たのしいです?", "たのしいです-ன் இறந்தகாலம்?", ["たのしかったです", "たのしいでした", "たのしくないです", "たのしです"], 0,
        "い-adjective past: かったです.", "い-பெயரடை இறந்தகாலம்: かったです."),
      qz("Fill in the blank: しずか ___ へや", "நிரப்புக: しずか ___ へや", ["な", "の", "い", "は"], 0,
        "な-adjective + な + noun.", "な-பெயரடை + な + பெயர்ச்சொல்."),
      qz("What is the te-form of よむ?", "よむ-ன் て-வடிவம்?", ["よんで", "よみて", "よって", "よいて"], 0,
        "む → んで.", "む → んで."),
      qz("Fill in the blank: ちかくに ぎんこう ___ あります。", "நிரப்புக: ちかくに ぎんこう ___ あります。", ["が", "を", "で", "へ"], 0,
        "が marks what exists.", "が இருப்பதைக் குறிக்கும்."),
      qz("How do you read 山?", "山-ஐ எப்படி வாசிப்பது?", ["やま", "かわ", "うみ", "そら"], 0, "山 = やま (mountain).", "山 = やま (மலை)."),
      qz("Which means “Please do not enter here”?", "“இங்கே நுழையாதீர்கள்” எது?",
        ["ここに はいらないで ください。", "ここに はいって ください。", "ここに はいっても いいです。", "ここに はいります。"], 0,
        "〜ないで ください = please do not.", "〜ないで ください = தயவுசெய்து செய்யாதீர்கள்.")
    ]
  }
};
