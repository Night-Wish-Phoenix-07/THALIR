(() => {
  const KEY = 'thalir_profile';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const css = document.createElement('style');
  css.textContent = `
  .pf{max-width:520px;margin:24px auto;padding:0 16px}
  .pf-box{background:#fff;border:1px solid #d5e2d8;border-radius:16px;padding:22px;display:grid;gap:14px}
  .pf-box h2{margin:0}
  .pf-box label{display:flex;flex-direction:column;gap:5px;font-weight:600;font-size:14px}
  .pf-box input,.pf-box select{font:inherit;font-weight:400;padding:10px 12px;border:1px solid #b9cbbd;border-radius:8px;background:#fff;color:inherit}
  .pf-box input:focus,.pf-box select:focus{outline:3px solid #3f8f55;outline-offset:1px}
  .pf-box button{font:inherit;padding:10px 18px;border:0;border-radius:8px;background:#3f8f55;color:#fff;cursor:pointer}
  .pf-msg{font-weight:600}.pf-msg.ok{color:#2d6b40}.pf-msg.bad{color:#d64933}`;
  document.head.appendChild(css);

  function render(app) {
    const d = load();
    app.innerHTML = `
    <section class="pf"><form class="pf-box" id="pf-form">
      <h2>My Profile / என் சுயவிவரம்</h2>
      <label>Name / பெயர்<input id="pf-name" value="${esc(d.name)}" required></label>
      <label>Age / வயது<input id="pf-age" type="number" min="3" max="100" value="${esc(d.age)}"></label>
      <label>Gender / பாலினம்
        <select id="pf-gender">
          ${['', 'Female', 'Male', 'Other'].map(g => `<option ${g === (d.gender || '') ? 'selected' : ''}>${g}</option>`).join('')}
        </select>
      </label>
      <label>School / College name / பள்ளி, கல்லூரி<input id="pf-school" value="${esc(d.school)}"></label>
      <label>City / ஊர்<input id="pf-city" value="${esc(d.city)}"></label>
      <button type="submit">Save / சேமி</button>
      <span class="pf-msg" id="pf-msg" role="status"></span>
    </form></section>`;

    const form = app.querySelector('#pf-form');
    const msg = app.querySelector('#pf-msg');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const g = id => form.querySelector('#pf-' + id).value.trim();
      const data = {
        id: d.id || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
        name: g('name'), age: g('age'), gender: g('gender'), school: g('school'), city: g('city')
      };
      if (!data.name) { msg.className = 'pf-msg bad'; msg.textContent = 'Please enter your name.'; return; }
      localStorage.setItem(KEY, JSON.stringify(data));
      msg.className = 'pf-msg ok'; msg.textContent = 'Saved ✅';
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
