(() => {
  const KEY = 'thalir_profile';
  const FIELDS = [
    ['name', 'Full name / முழு பெயர்', 'text'],
    ['nickname', 'Nickname / செல்லப் பெயர்', 'text'],
    ['age', 'Age / வயது', 'number'],
    ['email', 'Email / மின்னஞ்சல்', 'email'],
    ['phone', 'Phone (optional) / தொலைபேசி', 'tel'],
    ['city', 'City & Country / ஊர், நாடு', 'text'],
    ['education', 'School / College / Work / படிப்பு, வேலை', 'text'],
    ['mother', 'Mother tongue / தாய்மொழி', 'text'],
    ['level', 'Japanese level / ஜப்பானிய நிலை', 'select',
      ['Complete beginner', 'Know Hiragana', 'Know Hiragana & Katakana', 'Revising for N5']],
    ['goal', 'Why are you learning Japanese? / ஏன் கற்கிறீர்கள்?', 'textarea'],
    ['target', 'Daily study target (minutes) / தினசரி இலக்கு (நிமிடம்)', 'number'],
    ['exam', 'JLPT exam date (if any) / தேர்வு தேதி', 'date'],
    ['about', 'About me / என்னைப் பற்றி', 'textarea']
  ];

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const store = d => localStorage.setItem(KEY, JSON.stringify(d));

  const css = document.createElement('style');
  css.textContent = `
  .pf{max-width:760px;margin:24px auto;padding:0 16px}
  .pf-head{display:flex;align-items:center;gap:16px;background:#eaf4ec;border-radius:16px;padding:18px;margin-bottom:18px}
  .pf-av{width:64px;height:64px;border-radius:50%;background:#3f8f55;color:#fff;display:flex;align-items:center;justify-content:center;font:700 26px "Noto Sans Tamil",Inter,sans-serif;flex:none}
  .pf-head h2{margin:0;font-size:22px}.pf-head p{margin:2px 0 0;color:#5b6b60}
  .pf-form{display:grid;grid-template-columns:1fr 1fr;gap:14px;background:#fff;border:1px solid #d5e2d8;border-radius:16px;padding:20px}
  .pf-form label{display:flex;flex-direction:column;gap:5px;font-size:14px;font-weight:600}
  .pf-form .wide{grid-column:1/-1}
  .pf-form input,.pf-form select,.pf-form textarea{font:inherit;font-weight:400;padding:9px 11px;border:1px solid #b9cbbd;border-radius:8px;background:#fff;color:inherit}
  .pf-form input:focus,.pf-form select:focus,.pf-form textarea:focus{outline:3px solid #3f8f55;outline-offset:1px}
  .pf-form textarea{min-height:80px;resize:vertical}
  .pf-act{grid-column:1/-1;display:flex;gap:10px;align-items:center;flex-wrap:wrap}
  .pf-act button{font:inherit;padding:9px 18px;border-radius:8px;border:1px solid #14213d;background:#fff;cursor:pointer}
  .pf-act .pf-save{background:#3f8f55;border-color:#3f8f55;color:#fff}
  .pf-msg{font-weight:600}.pf-msg.ok{color:#2d6b40}.pf-msg.bad{color:#d64933}
  @media(max-width:620px){.pf-form{grid-template-columns:1fr}}`;
  document.head.appendChild(css);

  function field([id, label, type, opts], d) {
    const v = d[id] ?? '';
    const wide = type === 'textarea' ? ' class="wide"' : '';
    let input;
    if (type === 'select') {
      input = `<select id="pf-${id}">${opts.map(o =>
        `<option ${o === v ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>`;
    } else if (type === 'textarea') {
      input = `<textarea id="pf-${id}">${esc(v)}</textarea>`;
    } else {
      const extra = id === 'age' ? ' min="3" max="100"' : id === 'target' ? ' min="5" max="600"' : '';
      input = `<input id="pf-${id}" type="${type}" value="${esc(v)}"${extra}>`;
    }
    return `<label${wide}>${esc(label)}${input}</label>`;
  }

  function render(app) {
    const d = load();
    const shown = d.nickname || d.name || '';
    const initial = shown ? shown.trim()[0].toUpperCase() : 'த';
    app.innerHTML = `
    <section class="pf">
      <div class="pf-head">
        <div class="pf-av">${esc(initial)}</div>
        <div>
          <h2>${shown ? 'Hello, ' + esc(shown) + '!' : 'My Profile / என் சுயவிவரம்'}</h2>
          <p>${d.level ? esc(d.level) : 'Fill in your details below.'}${d.target ? ' · ' + esc(d.target) + ' min/day' : ''}</p>
        </div>
      </div>
      <form class="pf-form" id="pf-form">
        ${FIELDS.map(f => field(f, d)).join('')}
        <div class="pf-act">
          <button type="submit" class="pf-save">Save / சேமி</button>
          <button type="button" id="pf-clear">Clear / அழி</button>
          <span class="pf-msg" id="pf-msg" role="status"></span>
        </div>
      </form>
    </section>`;

    const form = app.querySelector('#pf-form');
    const msg = app.querySelector('#pf-msg');

    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = {};
      FIELDS.forEach(([id]) => { data[id] = form.querySelector('#pf-' + id).value.trim(); });
      if (!data.name) { msg.className = 'pf-msg bad'; msg.textContent = 'Please enter your name.'; return; }
      if (data.age && (data.age < 3 || data.age > 100)) { msg.className = 'pf-msg bad'; msg.textContent = 'Please enter a valid age.'; return; }
      store(data);
      render(app);
      const m = document.getElementById('pf-msg');
      m.className = 'pf-msg ok'; m.textContent = 'Saved ✅';
    });

    form.querySelector('#pf-clear').addEventListener('click', () => {
      if (confirm('Clear all profile details?')) { localStorage.removeItem(KEY); render(app); }
    });
  }

  function show() {
    if (location.hash !== '#/profile') return;
    const app = document.getElementById('app');
    if (app && !app.querySelector('#pf-form')) render(app);
  }
  const run = () => [0, 80, 250].forEach(t => setTimeout(show, t));

  addEventListener('hashchange', run);
  addEventListener('DOMContentLoaded', run);
  run();
})();
