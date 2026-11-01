import { KANA, UNITS, ROADMAP, LESSONS } from "./course.js";

// ===== 45 step-by-step lessons built from course.js =====
const SRC = { ...LESSONS };
const cut = (d, k, a, b) => ((SRC[d] && SRC[d][k]) || []).slice(a, b);
const O = (en, ta) => [[en, ta]];
const X = (en, ta) => [en, ta];

// t = title, i = source day(s) for intro/objectives/tips, p = parts [day, key, from, to]
const SPEC = [
  // ---------- UNIT 1: KANA ----------
  { t: ["Introduction & あいうえお", "அறிமுகம் & あいうえお"], i: [1], p: [[1, "kana", 0, 5]] },
  { t: ["Hiragana: か and さ rows", "ஹிரகானா: か, さ வரிசைகள்"], i: [2], p: [[2, "kana", 0, 10]],
    o: O("Read and write the か and さ rows", "か, さ வரிசைகளை வாசித்து எழுதுதல்"),
    x: X("Today: ka and sa rows. Careful: し is “shi”.", "இன்று: ka, sa வரிசைகள். கவனம்: し = “shi”.") },
  { t: ["Hiragana: た and な rows", "ஹிரகானா: た, な வரிசைகள்"], i: [2], p: [[2, "kana", 10, 15], [3, "kana", 0, 5]],
    o: O("Read and write the た and な rows", "た, な வரிசைகளை வாசித்து எழுதுதல்"),
    x: X("Today: ta and na rows. Careful: ち is “chi”, つ is “tsu”.", "இன்று: ta, na வரிசைகள். கவனம்: ち = “chi”, つ = “tsu”.") },
  { t: ["Hiragana: は and ま rows", "ஹிரகானா: は, ま வரிசைகள்"], i: [3], p: [[3, "kana", 5, 15]] },
  { t: ["Hiragana: や ら わ ん", "ஹிரகானா: や ら わ ん"], i: [4], p: [[4, "kana", 0, 11]] },
  { t: ["Hiragana: Dakuten and Handakuten", "ஹிரகானா: ゛ ゜ குறிகள்"], i: [5], p: [[5, "kana", 0, 25]],
    o: O("Add voiced sounds with ゛ and ゜", "゛ ゜ குறிகளுடன் ஒலிகளைக் கற்றல்"),
    x: X("Two small marks change the sound: か ka → が ga. A small circle on the は row gives ぱ pa.", "இரண்டு சிறிய குறிகள் ஒலியை மாற்றும்: か ka → が ga. は வரிசையில் சிறு வட்டம் ぱ pa தரும்.") },
  { t: ["Hiragana: Combinations and small っ", "ஹிரகானா: இணை ஒலிகள், சிறிய っ"], i: [5], p: [[5, "kana", 25, 46]],
    o: O("Read combination sounds like きゃ, しゅ, ちょ", "きゃ, しゅ, ちょ போன்ற இணை ஒலிகளை வாசித்தல்"),
    x: X("Small ゃ ゅ ょ join the previous kana: き + ゃ = きゃ (kya). A small っ doubles the next consonant: きって (kitte).", "சிறிய ゃ ゅ ょ முன் எழுத்துடன் சேரும்: き + ゃ = きゃ (kya). சிறிய っ அடுத்த மெய்யை இரட்டிக்கும்: きって (kitte).") },
  { t: ["Katakana I", "கடகானா I"], i: [6], p: [[6, "kana", 0, 25], [6, "vocab", 0, 4]],
    o: O("Read Katakana ア–ノ rows", "கடகானா ア–ノ வரிசைகளை வாசித்தல்"),
    x: X("Katakana is used for foreign words, e.g. コーヒー (coffee). The sounds are the same as Hiragana; only the shapes differ. The long mark ー stretches a vowel.", "கடகானா வெளிநாட்டுச் சொற்களுக்குப் பயன்படுகிறது, எ.கா. コーヒー (காபி). ஒலிகள் ஹிரகானாவைப் போலவே; வடிவங்கள் மட்டும் வேறு. ー குறி உயிரை நீட்டும்.") },
  { t: ["Katakana: Voiced Sounds", "கடகானா: ゛ ゜ ஒலிகள்"], i: [6], p: [[6, "kana", 25, 50], [6, "vocab", 4, 7]],
    o: O("Read voiced Katakana (ガ ザ ダ バ パ)", "゛ ゜ குறிகளுடன் கடகானா ஒலிகளை வாசித்தல்"),
    x: X("The same two marks work here: カ → ガ, ハ → パ. You need them for ギター (guitar) and ジュース (juice).", "அதே இரண்டு குறிகள் இங்கும் வேலை செய்யும்: カ → ガ, ハ → パ. ギター, ジュース போன்ற சொற்களுக்கு இவை தேவை.") },
  { t: ["Katakana II", "கடகானா II"], i: [7], p: [[7, "kana", 0, 21], [7, "vocab", 0, 4]],
    o: O("Read the remaining Katakana rows ハ–ン", "மீதமுள்ள கடகானா வரிசைகளை (ハ–ン) வாசித்தல்"),
    x: X("Finish the basic Katakana: ハ, マ, ヤ, ラ, ワ rows and ン.", "அடிப்படை கடகானாவை முடிப்போம்: ハ, マ, ヤ, ラ, ワ வரிசைகள் மற்றும் ン.") },
  { t: ["Katakana Combinations + Kana Test", "கடகானா இணை ஒலிகள் + தேர்வு"], i: [7], p: [[7, "kana", 21, 42], [7, "vocab", 4, 7]],
    o: O("Read Katakana combinations and complete the Kana test", "கடகானா இணை ஒலிகளை வாசித்து கானா தேர்வை முடித்தல்"),
    x: X("Combination sounds such as シャ (sha) and チョ (cho). Then take today's Kana test.", "シャ (sha), チョ (cho) போன்ற இணை ஒலிகள். பிறகு இன்றைய கானா தேர்வை எழுதுங்கள்.") },

  // ---------- UNIT 2: GREETINGS, NUMBERS, TIME ----------
  { t: ["Greetings I", "வாழ்த்துகள் I"], i: [8], p: [[8, "vocab", 0, 9]] },
  { t: ["Greetings II and Home Phrases", "வாழ்த்துகள் II, வீட்டுச் சொற்றொடர்கள்"], i: [8], p: [[8, "vocab", 9, 20], [8, "sentences", 0, 2], [8, "extra", 0, 1]] },
  { t: ["Numbers 1–10 + Kanji", "எண்கள் 1–10 + காஞ்சி"], i: [9, 23], p: [[9, "vocab", 0, 11], [23, "vocab", 0, 10]],
    o: O("Count 0–10 and read the kanji 一 to 十", "0–10 எண்ணி 一 முதல் 十 வரை காஞ்சியை வாசித்தல்"),
    x: X("Learn each number in hiragana and kanji together. 4 and 7 have two readings: よん/し and なな/しち; use よん and なな. Kanji have on-yomi (Chinese-style, in compounds) and kun-yomi (Japanese-style, alone). Write each kanji 5 times.", "ஒவ்வொரு எண்ணையும் ஹிரகானா, காஞ்சி இரண்டிலும் சேர்த்துக் கற்கவும். 4, 7-க்கு இரண்டு வாசிப்புகள்: よん/し, なな/しち; よん, なな பயன்படுத்துங்கள். காஞ்சிக்கு on-yomi (சீனப் பாணி; கூட்டுச் சொற்களில்), kun-yomi (ஜப்பானியப் பாணி; தனியாக) உண்டு. ஒவ்வொரு காஞ்சியையும் 5 முறை எழுதுங்கள்.") },
  { t: ["Bigger Numbers and Money + Kanji", "பெரிய எண்கள், பணம் + காஞ்சி"], i: [9, 23], p: [[9, "vocab", 11, 16], [23, "vocab", 10, 14], [23, "sentences", 2, 3]],
    o: O("Make numbers up to 10,000 and read 百 千 万 円", "10,000 வரை எண்களை அமைத்து 百 千 万 円 வாசித்தல்"),
    x: X("Bigger numbers are built from these: 11 = じゅう + いち, 20 = に + じゅう. 百 hyaku, 千 sen, 万 man, 円 en (yen).", "பெரிய எண்கள் இவற்றிலிருந்து அமையும்: 11 = じゅう + いち, 20 = に + じゅう. 百 hyaku, 千 sen, 万 man, 円 en (யென்).") },
  { t: ["Telling Time + Kanji", "நேரம் கூறுதல் + காஞ்சி"], i: [9, 23], p: [[9, "vocab", 16, 27], [9, "sentences", 0, 3], [9, "extra", 0, 2], [23, "vocab", 24, 30], [25, "vocab", 30, 31], [23, "sentences", 1, 2], [25, "extra", 2, 3]],
    o: O("Tell the time and read 今 毎 何 時 分 半 午", "நேரம் கூறி 今 毎 何 時 分 半 午 வாசித்தல்"),
    x: X("Add じ after the number (さんじ = 3 o'clock) and はん for half past (さんじはん = 3:30). Special: 4 o'clock = よじ, 7 = しちじ, 9 = くじ.", "எண்ணுக்குப் பின் じ சேருங்கள் (さんじ = 3 மணி); அரைக்கு はん (さんじはん = 3:30). சிறப்பு: 4 மணி = よじ, 7 = しちじ, 9 = くじ.") },
  { t: ["Days of the Week + Kanji", "வாரநாட்கள் + காஞ்சி"], i: [23], p: [[17, "vocab", 17, 24], [23, "vocab", 14, 24], [23, "sentences", 0, 1], [23, "sentences", 3, 4], [23, "extra", 0, 3]],
    o: O("Read the weekdays and the kanji 日 月 火 水 木 金 土 曜 週 年", "வாரநாட்களையும் 日 月 火 水 木 金 土 曜 週 年 காஞ்சியையும் வாசித்தல்"),
    x: X("Each weekday uses a sun, moon or element kanji + 曜日: 月曜日 = Monday, 水曜日 = Wednesday.", "ஒவ்வொரு வாரநாளும் சூரியன், நிலவு அல்லது மூலப்பொருள் காஞ்சி + 曜日: 月曜日 = திங்கள், 水曜日 = புதன்.") },

  // ---------- UNIT 3: FIRST SENTENCES ----------
  { t: ["Noun + です", "Noun + です"], i: [10], p: [[10, "vocab", 0, 7], [10, "sentences", 0, 5], [10, "extra", 0, 3]] },
  { t: ["Family and People + Kanji", "குடும்பம், மனிதர்கள் + காஞ்சி"], i: [24], p: [[26, "vocab", 0, 10], [24, "vocab", 0, 13], [26, "extra", 1, 2], [24, "extra", 2, 3]],
    o: O("Name family members and read 人 子 女 男 父 母 友 先 生 学 校 語 本", "குடும்ப உறுப்பினர்களைக் குறிப்பிட்டு 人 子 女 男 父 母 友 先 生 学 校 語 本 வாசித்தல்"),
    x: X("For your own family use ちち, はは, あに, あね. For someone else's family use おとうさん, おかあさん, おにいさん, おねえさん. The kanji for people and school are shown alongside.", "உங்கள் குடும்பத்துக்கு ちち, はは, あに, あね; பிறர் குடும்பத்துக்கு おとうさん, おかあさん, おにいさん, おねえさん. மனிதர், பள்ளிக்கான காஞ்சியும் உடன் உள்ளது.") },
  { t: ["Particles は の も", "துகள்கள் は の も"], i: [11], p: [[11, "vocab", 0, 8], [11, "sentences", 0, 4], [11, "extra", 0, 2]] },
  { t: ["これ それ あれ + Things", "これ それ あれ + பொருள்கள்"], i: [12], p: [[12, "vocab", 0, 8], [26, "vocab", 20, 28], [12, "sentences", 0, 3], [12, "extra", 0, 2]] },
  { t: ["More Things Around You", "உங்களைச் சுற்றியுள்ள பொருள்கள்"], i: [12], p: [[26, "vocab", 28, 38]],
    o: O("Name classroom and home items", "வகுப்பறை, வீட்டுப் பொருள்களின் பெயர்களைக் கற்றல்"),
    x: X("More everyday words. Many are Katakana, so practise reading them aloud.", "மேலும் அன்றாடச் சொற்கள். பல கடகானாவில் உள்ளன; உரக்க வாசித்துப் பழகுங்கள்.") },
  { t: ["Places (ここ そこ あそこ) + Kanji", "இடங்கள் + காஞ்சி"], i: [13], p: [[13, "vocab", 0, 15], [25, "vocab", 23, 30], [13, "sentences", 0, 4], [13, "extra", 0, 2], [25, "extra", 1, 2]] },
  { t: ["Question Words", "கேள்விச் சொற்கள்"], i: [14], p: [[14, "vocab", 0, 10], [14, "sentences", 0, 4], [14, "extra", 0, 2]] },

  // ---------- UNIT 4: VERBS AND DAILY LIFE ----------
  { t: ["Verbs I + Food and Drink", "வினைகள் I + உணவு, பானம்"], i: [15], p: [[15, "vocab", 0, 8], [26, "vocab", 10, 20], [15, "extra", 0, 2]] },
  { t: ["Verbs II + Kanji", "வினைகள் II + காஞ்சி"], i: [15], p: [[15, "vocab", 8, 16], [24, "vocab", 21, 23], [24, "vocab", 32, 34], [24, "extra", 0, 2]],
    o: O("Learn 8 more verbs and the kanji 出 入 休 立", "மேலும் 8 வினைகளையும் 出 入 休 立 காஞ்சியையும் கற்றல்"),
    x: X("Finish the verb list. Remember: かえる looks like Group 2 but is Group 1; する and くる are irregular. Verb kanji come with their hiragana ending, e.g. 食べる.", "வினைப் பட்டியலை முடிப்போம். நினைவில் கொள்ளுங்கள்: かえる குழு 2 போலத் தெரியும்; ஆனால் குழு 1; する, くる ஒழுங்கற்றவை. வினைக் காஞ்சியுடன் ஹிரகானா முடிவு வரும், எ.கா. 食べる.") },
  { t: ["Kanji: The Body", "காஞ்சி: உடல்"], i: [24], p: [[24, "vocab", 13, 19]],
    o: O("Read 目 耳 口 手 足 力", "目 耳 口 手 足 力 வாசித்தல்"),
    x: X("A short kanji lesson: body parts. Write each one 5 times and say it aloud.", "சிறு காஞ்சிப் பாடம்: உடல் உறுப்புகள். ஒவ்வொன்றையும் 5 முறை எழுதி உரக்கச் சொல்லுங்கள்.") },
  { t: ["Present Tense (ます / ません)", "நிகழ்காலம் (ます / ません)"], i: [16], p: [[16, "vocab", 0, 12], [16, "sentences", 0, 4], [16, "extra", 0, 2]] },
  { t: ["Past Tense (ました)", "இறந்தகாலம் (ました)"], i: [17], p: [[17, "vocab", 0, 8], [17, "sentences", 0, 3], [17, "extra", 0, 2]] },
  { t: ["Week, Month and Year Words", "வாரம், மாதம், ஆண்டுச் சொற்கள்"], i: [17], p: [[17, "vocab", 8, 17]],
    o: O("Say last / this / next week, month and year", "கடந்த / இந்த / அடுத்த வாரம், மாதம், ஆண்டு எனக் கூறுதல்"),
    x: X("Pattern: せん = last, こん = this, らい = next. せんしゅう, こんしゅう, らいしゅう.", "அமைப்பு: せん = கடந்த, こん = இந்த, らい = அடுத்த. せんしゅう, こんしゅう, らいしゅう.") },
  { t: ["Particles II (を に で へ と)", "துகள்கள் II"], i: [18], p: [[18, "vocab", 0, 8], [18, "sentences", 0, 6], [18, "extra", 0, 4]] },

  // ---------- UNIT 5: DESCRIBING THINGS AND PLACES ----------
  { t: ["Existence (あります / います)", "இருப்பு"], i: [21], p: [[21, "vocab", 0, 2], [21, "vocab", 12, 17], [21, "sentences", 1, 2], [21, "extra", 0, 1]],
    o: O("Say what exists with あります and います", "あります, います கொண்டு இருப்பைக் கூறுதல்"),
    x: X("Place に Thing が あります. Use います for people and animals: にわに ねこが います = there is a cat in the garden.", "இடம் に பொருள் が あります. மனிதர், விலங்குகளுக்கு います: にわに ねこが います = தோட்டத்தில் ஒரு பூனை இருக்கிறது.") },
  { t: ["Positions + Kanji", "இட நிலைகள் + காஞ்சி"], i: [21], p: [[21, "vocab", 2, 12], [25, "vocab", 15, 23], [21, "sentences", 0, 1], [21, "sentences", 2, 4], [21, "extra", 1, 2]],
    o: O("Use うえ, した, なか… and read 上 下 左 右 中 外 前 後", "うえ, した, なか… பயன்படுத்தி 上 下 左 右 中 外 前 後 வாசித்தல்"),
    x: X("Position words go between の and に: つくえの うえに ほんが あります = there is a book on the desk. The kanji for these words are shown alongside.", "நிலைச் சொற்கள் の, に-க்கு இடையில் வரும்: つくえの うえに ほんが あります = மேசை மேல் புத்தகம் உள்ளது. இச்சொற்களுக்கான காஞ்சியும் உடன் உள்ளது.") },
  { t: ["I-Adjectives I + Kanji", "இ-பெயரடைகள் I + காஞ்சி"], i: [19], p: [[19, "vocab", 0, 12], [25, "vocab", 31, 38], [19, "sentences", 0, 1], [19, "sentences", 2, 3], [25, "extra", 0, 1]] },
  { t: ["I-Adjectives II + Kanji", "இ-பெயரடைகள் II + காஞ்சி"], i: [19], p: [[19, "vocab", 12, 27], [25, "vocab", 38, 49], [19, "sentences", 1, 2], [19, "extra", 0, 3]],
    o: O("Learn weather, colour and quantity adjectives, and the irregular いい → よく", "வானிலை, நிறம், அளவு பெயரடைகளையும் ஒழுங்கற்ற いい → よく-வையும் கற்றல்"),
    x: X("More い-adjectives. Negative: drop い + くないです. Past: drop い + かったです. Exception: いい becomes よく.", "மேலும் い-பெயரடைகள். எதிர்மறை: い நீக்கி + くないです. இறந்தகாலம்: い நீக்கி + かったです. விதிவிலக்கு: いい → よく.") },
  { t: ["Na-Adjectives", "நா-பெயரடைகள்"], i: [20], p: [[20, "vocab", 0, 17], [20, "sentences", 0, 4], [20, "extra", 0, 2]] },
  { t: ["Kanji: Nature and Directions", "காஞ்சி: இயற்கை, திசைகள்"], i: [25], p: [[25, "vocab", 0, 15], [25, "extra", 3, 4]],
    o: O("Read 山 川 田 花 空 雨 天 気 電 風 魚 東 西 南 北", "山 川 田 花 空 雨 天 気 電 風 魚 東 西 南 北 வாசித்தல்"),
    x: X("Some of these (風, 田, 空) are often counted as N4, so they are a bonus. Learn 山 川 雨 東 西 南 北 first.", "இவற்றில் சில (風, 田, 空) பெரும்பாலும் N4-ஆகக் கருதப்படுகின்றன; அவை கூடுதல். முதலில் 山 川 雨 東 西 南 北 கற்கவும்.") },

  // ---------- UNIT 6: REQUESTS AND EXAM PRACTICE ----------
  { t: ["Te-Form", "தெ-வடிவம்"], i: [22], p: [[22, "vocab", 0, 12], [22, "extra", 0, 3]] },
  { t: ["Te-Form Requests and Permission", "தெ-வடிவ வேண்டுகோள்கள்"], i: [22], p: [[28, "vocab", 1, 2], [22, "sentences", 0, 5], [22, "extra", 3, 4]],
    o: O("Use てください, ています, てもいいです, てはいけません, ないでください", "てください, ています, てもいいです, てはいけません, ないでください பயன்படுத்துதல்"),
    x: X("Patterns: 〜てください (please do), 〜ています (doing now), 〜てもいいです (may), 〜てはいけません (must not), 〜ないでください (please do not).", "அமைப்புகள்: 〜てください (செய்யுங்கள்), 〜ています (செய்துகொண்டிருக்கிறேன்), 〜てもいいです (செய்யலாம்), 〜てはいけません (செய்யக்கூடாது), 〜ないでください (செய்யாதீர்கள்).") },
  { t: ["Counters", "எண்ணுச் சொற்கள்"], i: [26], p: [[26, "vocab", 38, 45], [26, "extra", 0, 1], [26, "extra", 2, 3]],
    o: O("Count things, people, long items, flat items, books and ages", "பொருள்கள், மனிதர்கள், நீளமான, தட்டையான பொருள்கள், புத்தகங்கள், வயதை எண்ணுதல்"),
    x: X("Counters change their sound: いっぽん, にほん, さんぼん. 2 people is ふたり (irregular).", "எண்ணுச் சொற்கள் ஒலி மாறும்: いっぽん, にほん, さんぼん. 2 நபர் = ふたり (ஒழுங்கற்றது).") },
  { t: ["Useful Daily Verbs", "பயனுள்ள அன்றாட வினைகள்"], i: [15], p: [[26, "vocab", 45, 59]],
    o: O("Learn 14 more everyday verbs", "மேலும் 14 அன்றாட வினைகளைக் கற்றல்"),
    x: X("More verbs for daily life. Try making each one into ます and て forms.", "அன்றாட வாழ்வுக்கான மேலும் வினைகள். ஒவ்வொன்றையும் ます, て வடிவங்களாக மாற்றிப் பாருங்கள்.") },
  { t: ["Reading Practice", "வாசிப்புப் பயிற்சி"], i: [27], p: [[27, "vocab", 0, 5], [27, "sentences", 0, 10], [27, "extra", 0, 4]] },
  { t: ["Listening Practice", "கேட்டல் பயிற்சி"], i: [28], p: [[28, "vocab", 0, 5], [28, "sentences", 0, 8], [28, "extra", 0, 4]] },
  { t: ["Mock Examination", "மாதிரித் தேர்வு"], i: [29], p: [[29, "extra", 0, 15]] },
  { t: ["Final Assessment", "இறுதி மதிப்பீடு"], i: [30], p: [[30, "extra", 0, 11]] }
];

function makeLesson(sp) {
  const L = {};
  ["kana", "vocab", "sentences", "extra"].forEach(k => {
    const arr = sp.p.filter(p => p[1] === k).flatMap(p => cut(p[0], k, p[2], p[3]));
    if (arr.length) L[k] = arr;
  });
  const fix = s => s.replace("Day 11", "Lesson 20").replace("நாள் 11-ல்", "பாடம் 20-ல்");
  L.objectives = sp.o || SRC[sp.i[0]].objectives;
  L.intro = (sp.x || [0, 1].map(n => sp.i.map(d => SRC[d].intro[n]).join(" "))).map(fix);
  const tipDay = sp.i.find(d => SRC[d].tips);
  if (tipDay) L.tips = SRC[tipDay].tips;
  return L;
}

// Replace the old 30-day structure with the 45 small lessons
Object.keys(LESSONS).forEach(k => delete LESSONS[k]);
SPEC.forEach((sp, i) => { LESSONS[i + 1] = makeLesson(sp); });
ROADMAP.length = 0; SPEC.forEach(sp => ROADMAP.push(sp.t));
UNITS.length = 0;
UNITS.push(
  { n: 1, en: "Kana: Reading and Writing", ta: "கானா: வாசிப்பும் எழுத்தும்", days: [1, 11] },
  { n: 2, en: "Greetings, Numbers and Time", ta: "வாழ்த்துகள், எண்கள், நேரம்", days: [12, 17] },
  { n: 3, en: "First Sentences", ta: "முதல் வாக்கியங்கள்", days: [18, 24] },
  { n: 4, en: "Verbs and Daily Life", ta: "வினைகளும் அன்றாட வாழ்வும்", days: [25, 31] },
  { n: 5, en: "Describing Things and Places", ta: "பொருள்களையும் இடங்களையும் விவரித்தல்", days: [32, 37] },
  { n: 6, en: "Requests and Exam Practice", ta: "வேண்டுகோளும் தேர்வுப் பயிற்சியும்", days: [38, 45] }
);

export { KANA, UNITS, ROADMAP, LESSONS };
