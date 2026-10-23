// npm test: checks game/public-cases.js against what game/game.js can play, without a browser.
//
// A case with a typo in it (a `next` that names no question, a gauge the screen does not know, a
// room with no bed lamp) loads fine and breaks only when a player reaches that choice, so every
// one of those is caught here instead. At the end it draws a thousand days of each shift, the
// way startPublicNight does, and says how many cases a day gets from the ones listed.
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = new URL('..', import.meta.url);
const read = rel => readFileSync(fileURLToPath(new URL(rel, root)), 'utf8');
const data = await import(pathToFileURL(fileURLToPath(new URL('game/public-cases.js', root))).href);
const game = read('game/game.js'), page = read('index.html');
const { PUBLIC_CALLS, DEEP_CALLS, DAWN_CALLS, AFTER_PHONE, PUBLIC_CASES } = data;

const problems = [];
const fail = (where, what) => problems.push(`${where}：${what}`);
const isText = v => typeof v === 'string' && v.trim().length > 0;

// ---------- what game.js knows: the beds that can ring, the scenes for a small call walked to,
// the five gauges at a bed ----------
const caseRooms = game.match(/const CASE_ROOMS = \[([^\]]*)\]/);
if (!caseRooms) throw new Error('game.js 裡找不到 CASE_ROOMS');
const BEDS = new Set([...caseRooms[1].matchAll(/'(\d{2})'/g)].flatMap(m => ['A', 'B', 'C'].map(L => m[1] + L)));
const casesBlock = game.match(/const CASES = \{([\s\S]*?)\n {2}\};/);
if (!casesBlock) throw new Error('game.js 裡找不到 CASES');
const VISITS = new Set([...casesBlock[1].matchAll(/'(v-[\w-]+)': \{/g)].map(m => m[1]));
const gaugeBlock = game.match(/const GAUGES = \{([^}]*)\};/);
if (!gaugeBlock) throw new Error('game.js 裡找不到 GAUGES');
const GAUGES = new Set([...gaugeBlock[1].matchAll(/(\w+): '/g)].map(m => m[1]));
const LEVELS = new Set(['', 'warn', 'bad', 'na']);

// ---------- the small calls ----------
const smallIds = new Set();
for (const [list, name] of [[PUBLIC_CALLS, 'PUBLIC_CALLS'], [DEEP_CALLS, 'DEEP_CALLS'], [DAWN_CALLS, 'DAWN_CALLS']]) {
  if (!Array.isArray(list)) { fail(name, '要是一個陣列'); continue; }
  for (const c of list) {
    const at = `${name} ${c.id || '(沒有 id)'}`;
    if (!isText(c.id)) fail(at, '沒有 id');
    else if (smallIds.has(c.id)) fail(at, 'id 重複了'); else smallIds.add(c.id);
    if (!['none', 'phone'].includes(c.need)) fail(at, `need 要是 'none'（不用理也沒事）或 'phone'（電話交代就好），現在是 ${JSON.stringify(c.need)}`);
    if (!BEDS.has(c.bed)) fail(at, `床號 ${c.bed} 不在 game.js 的 CASE_ROOMS 裡（那一床沒有床頭燈和監視器）`);
    if (!VISITS.has(c.visit)) fail(at, `visit '${c.visit}' 在 game.js 的 CASES 裡找不到（社工跑去看時要演的那一幕）`);
    for (const k of ['short', 'text', 'phone', 'phoneReply', 'sleepNote']) if (!isText(c[k])) fail(at, `缺少 ${k}`);
    if (isText(c.text) && !c.text.includes('{bed}')) fail(at, 'text 裡要有 {bed}，遊戲會換成床號');
  }
}
if (PUBLIC_CALLS.filter(c => !c.night).length < 2) fail('PUBLIC_CALLS', '至少要有兩通沒有標 night 的小事（早上會響兩通）');
if (PUBLIC_CALLS.length < 4) fail('PUBLIC_CALLS', '至少要有四通（早上兩通、下午兩通）');
if (!DEEP_CALLS.length) fail('DEEP_CALLS', '至少要有一通');
if (DAWN_CALLS.length < 2) fail('DAWN_CALLS', '至少要有兩通');
if (!Array.isArray(AFTER_PHONE) || !AFTER_PHONE.length || !AFTER_PHONE.every(isText)) fail('AFTER_PHONE', '至少要有一句');

// ---------- the cases ----------
const GRADES = new Set(['best', 'ok', 'bad']);
function checkBed(c) {
  const at = c?.id || '(沒有 id 的個案)';
  const need = ['id', 'bed', 'nurse', 'name', 'who', 'short', 'call', 'again', 'phone', 'callWhy', 'intro', 'introLate', 'late'];
  for (const k of need) if (!isText(c[k])) fail(at, `缺少 ${k}`);
  if (!BEDS.has(c.bed)) fail(at, `床號 ${c.bed} 不在 game.js 的 CASE_ROOMS 裡（那一床沒有床頭燈）`);
  if (isText(c.call) && !c.call.includes('{bed}')) fail(at, 'call 裡要有 {bed}');
  if (isText(c.again) && !c.again.includes('{bed}')) fail(at, 'again 裡要有 {bed}');
  if (isText(c.call) && !c.call.startsWith('社工師')) fail(at, 'call 要用「社工師，」或「社工師！」開頭（電話卡和 call 欄會把它拿掉）');
  if (isText(c.again) && !/^社工師[！，]\{bed\} /.test(c.again)) fail(at, 'again 要用「社工師！{bed} 」開頭');
  const states = c.states || {}, steps = c.steps || {}, results = c.results || {};
  if (!states.start) fail(at, 'states 裡要有 start（社工剛到床邊時的樣子）');
  for (const k of GAUGES) if (!states.start?.[k]) fail(`${at} states.start`, `start 要寫齊五格，缺少 ${k}`);
  for (const [k, st] of Object.entries(states)) {
    for (const [g, v] of Object.entries(st)) {
      if (!GAUGES.has(g)) { fail(`${at} states.${k}`, `'${g}' 不是評估的一格，可以用：${[...GAUGES].join('、')}`); continue; }
      if (!Array.isArray(v) || !isText(v[0]) || !LEVELS.has(v[1])) fail(`${at} states.${k}.${g}`, "要寫成 [文字, 等級]，等級是 ''、'warn'、'bad' 或 'na'");
    }
  }
  if (!states[c.late]) fail(at, `late '${c.late}' 不在 states 裡`);
  if (!c.warn || !states[c.warn.state] || !isText(c.warn.line) || !isText(c.warn.log)) fail(at, 'warn 要有 state（在 states 裡）、line、log');
  if (!c.fail || !isText(c.fail.title) || !isText(c.fail.text)) fail(at, '要有 fail { title, text }（錯太多時怎麼結束）');
  if (!steps.first) fail(at, 'steps 裡要有 first（第一個問題）');
  if (!Object.keys(results).length) fail(at, 'results 至少要有一個結果');
  if (!c.labs || !Array.isArray(c.labs.rows) || !c.labs.rows.length || !isText(c.labs.note)) fail(at, 'labs 要有 rows 和 note');
  else c.labs.rows.forEach((r, i) => {
    if (!Array.isArray(r) || r.length < 3 || !isText(r[0]) || !isText(r[1]) || typeof r[2] !== 'string') fail(`${at} labs.rows[${i}]`, '要寫成 [查了什麼, 結果, 說明, 要不要留意]');
    if (r[3] !== undefined && r[3] !== '' && r[3] !== '!') fail(`${at} labs.rows[${i}]`, "第四格只能是 '!'、'' 或不寫");
  });
  if (!c.card || !isText(c.card.title) || !Array.isArray(c.card.points) || !c.card.points.length) fail(at, 'card 要有 title 和 points');
  // the family tree: every link names people on it, and every key a choice reveals is used on it
  const famKeys = new Set();
  if (!c.family || !Array.isArray(c.family.nodes) || !Array.isArray(c.family.links)) fail(at, 'family 要有 nodes 和 links（床邊的家系圖）');
  else {
    const ids = new Set();
    for (const n of c.family.nodes) {
      const w = `${at} family ${n.id || '(沒有 id)'}`;
      if (!isText(n.id)) fail(w, '每個人或資源都要有 id'); else ids.add(n.id);
      if (!['m', 'f', 'r'].includes(n.sex)) fail(w, "sex 要是 'm'、'f' 或 'r'（資源）");
      if (!(n.x >= 0 && n.x <= 300 && n.y >= 0 && n.y <= 180)) fail(w, 'x、y 要在 300×180 的框裡');
      if (!isText(n.label)) fail(w, '缺少 label');
      for (const k of [n.key, n.hide, n.alt?.key]) if (k) famKeys.add(k);
    }
    if (c.family.nodes.filter(n => n.ip && !n.key).length !== 1) fail(at, 'family 要有一個一開始就看得到、標 ip: true 的人（個案本人）');
    for (const l of c.family.links) {
      const w = `${at} family ${l.t} ${l.a}`;
      if (!['marry', 'child', 'violence', 'conflict', 'close', 'distant', 'res'].includes(l.t)) fail(w, `t '${l.t}' 不認得`);
      for (const id of [l.a, ...(l.t === 'child' ? l.from || [] : [l.b])]) if (!ids.has(id)) fail(w, `'${id}' 不在 nodes 裡`);
      if (l.t === 'child' && !(l.from?.length >= 1 && l.from.length <= 2)) fail(w, 'child 要寫 from: [一或兩位父母]');
      for (const k of [l.key, l.hide]) if (k) famKeys.add(k);
    }
  }
  const revealed = new Set();
  for (const [sk, step] of Object.entries(c.steps || {})) {
    if (!isText(step.hint)) fail(`${at} steps.${sk}`, '缺少 hint（打給督導時她會說的話）');
    for (const o of step.options || []) for (const k of o.reveal || []) { revealed.add(k); if (!famKeys.has(k)) fail(`${at} steps.${sk} ${o.id}`, `reveal 的 '${k}' 在 family 裡沒有用到`); }
  }
  for (const k of famKeys) if (!revealed.has(k)) fail(at, `family 的 key '${k}' 沒有任何選項會 reveal`);

  const usedOutcomes = new Set();
  for (const [sk, step] of Object.entries(steps)) {
    const where = `${at} steps.${sk}`;
    if (!isText(step.ask)) fail(where, '缺少 ask（問題）');
    if (!Array.isArray(step.options) || !step.options.length) { fail(where, '沒有選項'); continue; }
    if (step.options.length > 4) fail(where, '選項最多四個（鍵盤 1–4）');
    if (!step.options.some(o => o.grade === 'best')) fail(where, '至少要有一個 grade: best');
    for (const k of Object.keys(step.askBy || {})) if (!states[k]) fail(where, `askBy 的 '${k}' 不在 states 裡`);
    const ids = new Set();
    for (const o of step.options) {
      const w = `${where} ${o.id || '(沒有 id 的選項)'}`;
      if (!isText(o.id)) fail(w, '選項沒有 id'); else if (ids.has(o.id)) fail(w, '同一題裡 id 重複'); else ids.add(o.id);
      if (!isText(o.text)) fail(w, '缺少 text');
      if (!GRADES.has(o.grade)) fail(w, "grade 要是 'best'、'ok' 或 'bad'");
      if (typeof o.min !== 'number' || o.min < 0) fail(w, 'min（花幾分鐘）要是 0 以上的數字');
      if (o.state && !states[o.state]) fail(w, `state '${o.state}' 不在 states 裡`);
      if (o.next && o.next !== 'done' && o.next !== 'fail' && !steps[o.next]) fail(w, `next '${o.next}' 不在 steps 裡`);
      if (o.next === 'done') { if (!results[o.outcome]) fail(w, `outcome '${o.outcome}' 不在 results 裡`); else usedOutcomes.add(o.outcome); }
      if (o.grade !== 'best' && !o.death && o.next !== 'fail' && !isText(o.why)) fail(w, '不是 best 的選項要寫 why（為什麼不好），會劃掉顯示給玩家');
      if (o.death !== undefined && !isText(o.death)) fail(w, 'death 要是一段話');
      if (o.draw && !c.labs) fail(w, 'draw: true 的個案要有 labs');
      if (o.energy !== undefined && !(typeof o.energy === 'number' && o.energy < 0 && o.energy >= -40)) fail(w, 'energy 要是 -40 到 -1 的數字（被攻擊扣的精力）');
      if (o.hurt !== undefined && o.hurt !== true) fail(w, 'hurt 只能寫 true');
    }
  }
  for (const k of Object.keys(results)) if (!usedOutcomes.has(k)) fail(at, `results.${k} 沒有任何選項會走到（outcome: '${k}'）`);
  // following only the best choices, the bed can be finished
  const seen = new Set(), queue = ['first'];
  let finishes = false;
  while (queue.length) {
    const sk = queue.shift(); if (seen.has(sk) || !steps[sk]) continue; seen.add(sk);
    for (const o of steps[sk].options.filter(o => o.grade === 'best')) {
      if (o.next === 'done') finishes = true;
      else if (o.next) queue.push(o.next);
      else fail(`${at} steps.${sk} ${o.id}`, 'best 的選項要有 next（下一題，或 done 結束）');
    }
  }
  if (!finishes) fail(at, '從 first 一路選 best，走不到 done');
  for (const sk of Object.keys(steps)) {
    const reached = seen.has(sk) || Object.values(steps).some(s => s.options?.some(o => o.next === sk));
    if (!reached) fail(`${at} steps.${sk}`, '沒有任何選項會走到這一題');
  }
}

const bedIds = new Set();
if (!Array.isArray(PUBLIC_CASES) || !PUBLIC_CASES.length) fail('PUBLIC_CASES', '至少要有一個個案');
for (const c of PUBLIC_CASES) {
  if (bedIds.has(c?.id)) fail(c.id, 'id 和別床重複了'); else bedIds.add(c?.id);
  if (smallIds.has(c?.id)) fail(c.id, 'id 和某一通小事的 id 重複了');
  checkBed(c);
}
const rooms = new Map();
for (const c of PUBLIC_CASES) { if (rooms.has(c.bed)) fail(c.id, `床號 ${c.bed} 和 ${rooms.get(c.bed)} 重複了`); else rooms.set(c.bed, c.id); }

// ---------- the credit line the license asks for ----------
if (!/const CREDIT = \{ text: '[^']+', url: 'https?:\/\/[^']+' \}/.test(game)) fail('game.js', 'CREDIT 要有 text 和 url（授權要求保留出處）');
if ((page.match(/class="credit"/g) || []).length < 2) fail('index.html', '開始畫面和結算畫面都要有 <p class="credit"></p>（授權要求保留出處）');

// ---------- every portrait the game asks for has a file ----------
const ext = (game.match(/const IMG = n => `assets\/game\/char\/\$\{n\}(\.\w+)`/) || [])[1];
if (!ext) fail('game.js', '找不到 IMG（立繪的路徑）');
else {
  const chatter = read('game/chatter.js'), cases = read('game/public-cases.js');
  const wanted = new Set([
    ...[game, chatter, page].flatMap(src => [...src.matchAll(/['"/]((?:nurse|chief|akai|azhu)_[a-z_]+)(?:'|"|\.\w+)/g)].map(m => m[1])),
    ...[...game.matchAll(/\bME\('([a-z_]+)'\)/g)].flatMap(m => [`pgy_m_${m[1]}`, `pgy_f_${m[1]}`]),
    ...[...page.matchAll(/char\/(pgy_[mf]_[a-z_]+)\./g)].map(m => m[1]),
    ...[...cases.matchAll(/\bface: '([a-z_]+)'/g), ...casesBlock[1].matchAll(/\bface: '([a-z_]+)'/g)].map(m => `nurse_${m[1]}`),
  ]);
  for (const name of wanted) {
    if (!existsSync(fileURLToPath(new URL(`assets/game/char/${name}${ext}`, root)))) fail('立繪', `缺少 assets/game/char/${name}${ext}`);
  }
}

// ---------- a thousand days: how many cases the bank gives ----------
// NIGHT_SLOTS is read from game.js; the fill below mirrors startPublicNight's
const slotsSrc = game.match(/const NIGHT_SLOTS = (\[[\s\S]*?\n {2}\]);/);
if (!slotsSrc) throw new Error('game.js 裡找不到 NIGHT_SLOTS');
const NIGHT_SLOTS = Function(`return ${slotsSrc[1]};`)();
const shuffle = a => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(x => x[1]);
function draw(shift) {
  const want = (shift === 'hard' ? 6 : 4) + Math.floor(Math.random() * 3);
  const left = shuffle(PUBLIC_CASES), filled = [];
  for (const slot of NIGHT_SLOTS) {
    if (filled.length >= want) break;
    const fits = left.filter(c => slot.dark || !c.night);
    const c = (slot.dark && fits.find(x => x.night)) || fits[0];
    if (!c) continue;
    left.splice(left.indexOf(c), 1); filled.push({ ...slot, c });
  }
  return filled;
}
const summary = [];
for (const shift of ['normal', 'hard']) {
  const counts = new Map(); let noDinner = 0;
  for (let i = 0; i < 1000; i++) {
    const night = draw(shift);
    counts.set(night.length, (counts.get(night.length) || 0) + 1);
    if (!night.some(f => f.name === 'lunch')) noDinner++;
    for (const f of night) if (f.c.night && !f.dark) fail('抽個案', `${f.c.id} 標了 night，卻被排到午休前的 ${f.name}`);
  }
  summary.push(`${shift === 'hard' ? '大爛班' : '普通班'}：每天 ${[...counts.keys()].sort().join('、')} 個個案${noDinner ? `（${noDinner / 10}% 的日子沒有午餐那一個）` : ''}`);
}

if (problems.length) {
  console.error(`檢查到 ${problems.length} 個問題：\n` + [...new Set(problems)].map(p => `  ✗ ${p}`).join('\n'));
  process.exit(1);
}
console.log(`✓ public-cases.js 沒問題：${PUBLIC_CASES.length} 個個案、小事 ${smallIds.size} 通`);
console.log(`  ${summary.join('；')}`);
if (PUBLIC_CASES.length < 8) console.log(`  個案比班別想要的少：再加個案，一天就會更忙（大爛班最多排到 8 個）`);
