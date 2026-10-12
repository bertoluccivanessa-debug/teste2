/** IMMUNOVERSE: recompensas formativas, locais e limitadas por atividade.
 * Pontuação não mede competência clínica. Nenhum ranking público ou telemetria.
 */
const DAY = /^\d{4}-\d{2}-\d{2}$/;
export const dayKey = (date = new Date()) => {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return dayKey(new Date());
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const hash = value => Array.from(String(value)).reduce((acc, c) => (Math.imul(acc ^ c.charCodeAt(0), 16777619) >>> 0), 2166136261);
const safeDates = value => Object.fromEntries(Object.entries(value && typeof value === 'object' && !Array.isArray(value) ? value : {}).filter(([d]) => DAY.test(d)).slice(-400));
export const baseRewards = () => ({bonusXP: 0, daily: {}, lab: {}, arena: {}, activity: {}, focusWorld: null});
export function normalizeRewards(raw) {
  const r = raw && typeof raw === 'object' ? raw : {};
  const clean = baseRewards();
  clean.bonusXP = Number.isFinite(r.bonusXP) ? Math.max(0, Math.min(100000, Math.round(r.bonusXP))) : 0;
  clean.daily = Object.fromEntries(Object.entries(safeDates(r.daily)).filter(([, x]) => typeof x === 'string' && x.length <= 60));
  clean.arena = Object.fromEntries(Object.entries(safeDates(r.arena)).filter(([, x]) => x && typeof x === 'object' && Number.isFinite(x.score)).map(([d, x]) => [d, {score: Math.max(0, Math.min(5, Math.round(x.score))), xp: Math.max(0, Math.min(40, Number(x.xp) || 0))}]));
  clean.lab = Object.fromEntries(Object.entries(r.lab && typeof r.lab === 'object' ? r.lab : {}).filter(([k,v]) => /^(phago|mhc|antibody):(normal|falha)$/.test(k) && v === true));
  clean.activity = Object.fromEntries(Object.entries(safeDates(r.activity)).map(([k, v]) => [k, !!v]));
  clean.focusWorld = typeof r.focusWorld === 'string' && r.focusWorld.length < 40 ? r.focusWorld : null;
  return clean;
}
export const dailyCase = (cases, date = new Date()) => cases.length ? cases[hash(dayKey(date)) % cases.length] : null;
export const levelThreshold = level => {
  const step = Math.max(0, Math.floor(level) - 1);
  return 80 * step + 35 * step * step;
};
const titles = ['Sentinela iniciante','Explorador celular','Investigador de mecanismos','Especialista em defesas','Guardião imunológico','Mestre das conexões','Cientista translacional','Lenda do Immunoverse'];
export function levelInfo(xp) {
  const total = Math.max(0, Number(xp) || 0);
  let level = 1;
  while (level < 200 && total >= levelThreshold(level + 1)) level++;
  const floor = levelThreshold(level), next = levelThreshold(level + 1);
  return {level, title: titles[Math.min(titles.length - 1, Math.floor((level - 1) / 2))], current: total - floor, needed: next - floor, next, progress: Math.min(100, Math.round((total - floor) / (next - floor) * 100))};
}
const today = date => dayKey(date);
const touch = (r, date) => {r.activity[today(date)] = true;};
export function claimDaily(progress, caseId, cases, date = new Date()) {
  const rewards = progress.rewards ||= baseRewards(), key = today(date), selected = dailyCase(cases, date);
  if (!selected || selected.id !== caseId || rewards.daily[key]) return 0;
  rewards.daily[key] = caseId;
  rewards.bonusXP += 30;
  touch(rewards, date);
  return 30;
}
export function claimLab(progress, labId, blocked, date = new Date()) {
  const rewards = progress.rewards ||= baseRewards(), key = `${labId}:${blocked?'falha':'normal'}`;
  if (!/^(phago|mhc|antibody):(normal|falha)$/.test(key) || rewards.lab[key]) return 0;
  rewards.lab[key] = true;
  rewards.bonusXP += 12;
  touch(rewards, date);
  return 12;
}
export function claimArena(progress, score, date = new Date()) {
  const rewards = progress.rewards ||= baseRewards(), key = today(date);
  if (rewards.arena[key]) return 0;
  const xp = Math.max(0, Math.min(40, 8 * Math.round(score)));
  rewards.arena[key] = {score:Math.round(score), xp};
  rewards.bonusXP += xp;
  touch(rewards, date);
  return xp;
}
export function touchActivity(progress, date = new Date()) {
  (progress.rewards ||= baseRewards()).activity[today(date)] = true;
}
export function selectArenaQuestions(cases, date = new Date(), count = 5) {
  const key = dayKey(date);
  const pool = cases.flatMap(c => ['decision','transfer'].map(kind => ({id:`${c.id}:${kind}`,world:c.world,caseTitle:c.title,question:c[kind]?.q,options:c[kind]?.options||[]})))
    .filter(q => q.question && q.options.length >= 3)
    .map(q => ({...q,rank:hash(`${key}:${q.id}`)}))
    .sort((a,b) => a.rank-b.rank || a.id.localeCompare(b.id));
  const selected = [], worlds = new Set();
  for(const q of pool){if(!worlds.has(q.world)){selected.push(q);worlds.add(q.world);}if(selected.length===count)break;}
  for(const q of pool){if(selected.length>=count)break;if(!selected.includes(q))selected.push(q);}
  return selected.map(q => ({...q, options:q.options.map((o,index) => ({...o, originalIndex:index, rank:hash(`${key}:${q.id}:opt:${index}`)})).sort((a,b)=>a.rank-b.rank || a.originalIndex-b.originalIndex)}));
}
export function currentStreak(activity, date = new Date()) {
  const marks = activity && typeof activity === 'object' ? activity : {};
  const d = new Date(date);
  if (!marks[dayKey(d)]) d.setDate(d.getDate() - 1);
  let count = 0;
  while (marks[dayKey(d)] && count < 400) {count++;d.setDate(d.getDate() - 1);}
  return count;
}
export function achievementList(progress, cases, worlds, date = new Date()) {
  const records = progress.records || {}, rewards = progress.rewards || baseRewards();
  const ids = Object.keys(records), scores = ids.map(k => records[k]?.score || 0);
  const worldsCompleted = worlds.filter(w => cases.some(c => c.world === w.id) && cases.filter(c=>c.world===w.id).every(c=>records[c.id]));
  const types = Object.values(rewards.lab).filter(Boolean).length;
  const days = Object.values(rewards.activity).filter(Boolean).length;
  const achievements = [
    ['first','🌟','Primeiro diagnóstico causal',ids.length>=1,'Conclua sua primeira missão'],
    ['five','🔬','Investigador persistente',ids.length>=5,'Conclua cinco missões diferentes'],
    ['ten','🧬','Dez investigações',ids.length>=10,'Conclua dez missões diferentes'],
    ['sharp','🎯','Raciocínio preciso',scores.some(s=>s>=90),'Obtenha pelo menos 90/100 em uma missão'],
    ['perfect','💎','Sequência impecável',scores.some(s=>s===100),'Conclua uma missão com 100 pontos'],
    ['world','🏝️','Guardião de um mundo',worldsCompleted.length>=1,'Conclua todas as missões de um mundo'],
    ['worlds','🌌','Conector de mundos',worlds.filter(w=>cases.some(c=>c.world===w.id&&records[c.id])).length>=5,'Investigue cinco mundos diferentes'],
    ['lab','🧫','Experimentador',types>=3,'Conclua três condições distintas no ImunoLab'],
    ['compare','⚗️','Cientista causal',['phago','mhc','antibody'].some(id=>rewards.lab[`${id}:normal`]&&rewards.lab[`${id}:falha`]),'Compare controle e falha no mesmo experimento'],
    ['daily','📅','Desafio do dia',Object.keys(rewards.daily).length>=1,'Conclua uma missão do dia'],
    ['arena','⚡','Raciocínio relâmpago',Object.values(rewards.arena).some(x=>x.score>=4),'Acerte quatro de cinco questões na Ronda'],
    ['consistent','🌱','Aprendiz consistente',days>=3,'Pratique em três dias diferentes'],
    ['all','🏆','Guardião do Immunoverse',ids.length===cases.length,'Conclua todas as missões'],
  ];
  return achievements.map(([id,icon,label,unlocked,description])=>({id,icon,label,unlocked,description}));
}
