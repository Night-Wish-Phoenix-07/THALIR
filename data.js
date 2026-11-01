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
  ["Kanji II: People and Body", "காஞ்சி II: மனிதர்கள், உடல்"],
  ["Kanji III: Nature and Places", "காஞ்சி III: இயற்கை, இடங்கள்"],
  ["Vocabulary Revision", "சொற்களஞ்சிய மீள்பார்வை"],
  ["Reading Practice", "வாசிப்புப் பயிற்சி"],
  ["Listening Practice", "கேட்டல் பயிற்சி"],
  ["Mock Examination", "மாதிரித் தேர்வு"],
  ["Final Assessment", "இறுதி மதிப்பீடு"]
];

const pick = (set, idx) => idx.flatMap(i => set[i].items);
const all = rows => rows.flatMap(r => r.items);

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
      ["Read Katakana ア–ノ rows", "கடகானா ア–ノ வரிசைகளை வாசித்தல்"]
    ],
    intro: [
      "Katakana is used for foreign words, e.g. コーヒー (coffee), テレビ (TV). The sounds are the same as Hiragana, only the shapes differ. The long mark ー stretches a vowel.",
      "கடகானா வெளிநாட்டுச் சொற்களுக்குப் பயன்படுகிறது, எ.கா. コーヒー (காபி), テレビ (டிவி). ஒலிகள் ஹிரகானாவைப் போலவே; வடிவங்கள் மட்டும் வேறு. ー குறி உயிரை நீட்டும்."
    ],
    tips: kanaTips,
    kana: pick(KANA.kata, [0, 1, 2, 3, 4]),
    vocab: [
      { jp: "コーヒー", ro: "koohii", en: "coffee", ta: "காபி" },
      { jp: "テレビ", ro: "terebi", en: "television", ta: "தொலைக்காட்சி" },
      { jp: "カメラ", ro: "kamera", en: "camera", ta: "கேமரா" },
      { jp: "ケーキ", ro: "keeki", en: "cake", ta: "கேக்" }
    ]
  },
  7: {
    objectives: [
      ["Read the remaining Katakana rows", "மீதமுள்ள கடகானா வரிசைகளை வாசித்தல்"],
      ["Complete the Kana test", "கானா தேர்வை முடித்தல்"]
    ],
    intro: [
      "Finish Katakana: ハ–ン rows. Then take today's Kana test.",
      "கடகானாவை முடிப்போம்: ハ–ン வரிசைகள். பிறகு இன்றைய கானா தேர்வை எழுதுங்கள்."
    ],
    tips: kanaTips,
    kana: pick(KANA.kata, [5, 6, 7, 8, 9]),
    vocab: [
      { jp: "ホテル", ro: "hoteru", en: "hotel", ta: "ஹோட்டல்" },
      { jp: "パン", ro: "pan", en: "bread", ta: "ரொட்டி" },
      { jp: "ラジオ", ro: "rajio", en: "radio", ta: "வானொலி" },
      { jp: "ミルク", ro: "miruku", en: "milk", ta: "பால்" }
    ]
  },
  8: {
    objectives: [
      ["Use basic greetings", "அடிப்படை வாழ்த்துகளைப் பயன்படுத்துதல்"],
      ["Introduce yourself", "உங்களை அறிமுகப்படுத்துதல்"]
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
      { jp: "すみません", ro: "sumimasen", en: "Excuse me / Sorry", ta: "மன்னிக்கவும்" },
      { jp: "さようなら", ro: "sayounara", en: "Goodbye", ta: "போய் வருகிறேன்" },
      { jp: "はじめまして", ro: "hajimemashite", en: "Nice to meet you", ta: "அறிமுகமானதில் மகிழ்ச்சி" }
    ],
    sentences: [
      ["はじめまして。わたしは ○○です。", "Hajimemashite. Watashi wa ○○ desu.", "Nice to meet you. I am ○○.", "அறிமுகமானதில் மகிழ்ச்சி. நான் ○○."]
    ]
  },
  9: {
    objectives: [
      ["Count from 1 to 10 in Japanese", "ஜப்பானிய மொழியில் 1 முதல் 10 வரை எண்ணுதல்"]
    ],
    intro: [
      "Numbers 1–10. 4 and 7 have two readings: よん/し and なな/しち. Use よん and なな for counting; they are safer.",
      "எண்கள் 1–10. 4 மற்றும் 7-க்கு இரண்டு வாசிப்புகள் உண்டு: よん/し, なな/しち. எண்ணும்போது よん, なな பயன்படுத்துங்கள்."
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
      { jp: "十 (じゅう)", say: "じゅう", ro: "juu", en: "ten (10)", ta: "பத்து" }
    ]
  },
  10: {
    objectives: [
      ["Make sentences with Noun + です", "Noun + です வாக்கியங்களை அமைத்தல்"],
      ["Say “is not” with ではありません", "ではありません மூலம் மறுத்துக் கூறுதல்"]
    ],
    intro: [
      "です means “am / is / are”. Pattern: A は B です (A is B). Negative: A は B ではありません (A is not B). Question: add か at the end. Japanese puts the verb last, like Tamil.",
      "です என்றால் “ஆக இருக்கிறது”. அமைப்பு: A は B です (A என்பது B). எதிர்மறை: A は B ではありません. கேள்விக்கு இறுதியில் か சேர்க்கவும். தமிழைப் போலவே ஜப்பானிய மொழியிலும் வினை இறுதியில் வரும்."
    ],
    vocab: [
      { jp: "わたし", ro: "watashi", en: "I", ta: "நான்" },
      { jp: "がくせい", ro: "gakusei", en: "student", ta: "மாணவர்" },
      { jp: "せんせい", ro: "sensei", en: "teacher", ta: "ஆசிரியர்" },
      { jp: "にほんじん", ro: "nihonjin", en: "Japanese person", ta: "ஜப்பானியர்" },
      { jp: "ともだち", ro: "tomodachi", en: "friend", ta: "நண்பர்" }
    ],
    sentences: [
      ["わたしは がくせいです。", "Watashi wa gakusei desu.", "I am a student.", "நான் ஒரு மாணவர்."],
      ["わたしは せんせいでは ありません。", "Watashi wa sensei dewa arimasen.", "I am not a teacher.", "நான் ஆசிரியர் அல்ல."],
      ["あなたは がくせいですか。", "Anata wa gakusei desu ka.", "Are you a student?", "நீங்கள் மாணவரா?"]
    ],
    extra: [
      { q: ["Fill in the blank: わたし ___ がくせいです。", "நிரப்புக: わたし ___ がくせいです。"], opts: ["は", "を", "に", "で"], a: 0,
        e: ["は marks the topic of the sentence.", "は வாக்கியத்தின் தலைப்பைக் குறிக்கும்."] },
      { q: ["Which means “I am not a student”?", "“நான் மாணவர் அல்ல” எது?"],
        opts: ["わたしは がくせいです。", "わたしは がくせいでは ありません。", "わたしは がくせいですか。", "あなたは がくせいです。"], a: 1,
        e: ["ではありません makes a negative.", "ではありません எதிர்மறையாக்கும்."] }
    ]
  },
  12: {
    objectives: [
      ["Use これ, それ, あれ, どれ", "これ, それ, あれ, どれ பயன்படுத்துதல்"]
    ],
    intro: [
      "これ = this (near me), それ = that (near you), あれ = that over there (far from both), どれ = which one.",
      "これ = இது (எனக்கு அருகில்), それ = அது (உங்களுக்கு அருகில்), あれ = அதோ அது (இருவருக்கும் தொலைவில்), どれ = எது."
    ],
    vocab: [
      { jp: "これ", ro: "kore", en: "this (near me)", ta: "இது" },
      { jp: "それ", ro: "sore", en: "that (near you)", ta: "அது (உங்களருகில்)" },
      { jp: "あれ", ro: "are", en: "that over there", ta: "அதோ அது" },
      { jp: "どれ", ro: "dore", en: "which one", ta: "எது" }
    ],
    sentences: [
      ["これは ほんです。", "Kore wa hon desu.", "This is a book.", "இது ஒரு புத்தகம்."],
      ["あれは なんですか。", "Are wa nan desu ka.", "What is that over there?", "அதோ அது என்ன?"]
    ]
  }
};
