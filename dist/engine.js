import {baseRewards,normalizeRewards,levelInfo,achievementList,currentStreak} from './gamification.js';
export const STORAGE_KEY='immunoverse.play.v2';
export const PHASES=['briefing','investigate','cascade','decision','strategy','transfer','debrief'];
export const PHASE_NAMES=['Missão','Laboratório','Cascata','Decisão','Simulação','Transferência','Relatório'];
export const blankProgress=()=>({version:2,nickname:'Explorador(a)',records:{},sound:false,companion:'Maco',session:null,rewards:baseRewards(),lastReward:null});
export const freshSession=id=>({id,phase:'briefing',links:{},selectedEvidence:null,ordered:[],errors:0,hints:0,feedback:null,finished:false,decisionAnswer:null,strategyAnswer:null,transferAnswer:null,wrongAttempts:{},wrongLinks:[],wrongSteps:[],hintPhases:[],guideUsed:false,consultHistory:[]});
export const escapeHTML=value=>String(value??'').replace(/[&<>"']/g, ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
export function validateContent(cases,worlds,glossary){
 const errors=[], ids=new Set(), worldIds=new Set(worlds.map(w=>w.id));
 if(worldIds.size!==worlds.length)errors.push('IDs de mundos duplicados');
 if(cases.length<10) errors.push('Conteúdo insuficiente para a edição completa');
 for(const c of cases){
  if(ids.has(c.id))errors.push(`${c.id}: duplicado`); ids.add(c.id);
  if(!worldIds.has(c.world))errors.push(`${c.id}: mundo não existe`);
  if(c.evidence?.length!==3||c.mechanisms?.length!==3)errors.push(`${c.id}: esperadas 3 evidências e 3 mecanismos`);
  const mids=new Set(c.mechanisms?.map(m=>m.id));
  if(mids.size!==3)errors.push(`${c.id}: mecanismos duplicados`);
  if(new Set(c.evidence?.map(e=>e.id)).size!==3)errors.push(`${c.id}: evidências duplicadas`);
  if(c.evidence?.some(e=>!mids.has(e.mechanism)))errors.push(`${c.id}: correspondência inválida`);
  if(c.pathway?.length!==4||new Set(c.pathway).size!==4)errors.push(`${c.id}: cascata requer 4 passos distintos`);
  for(const key of ['decision','transfer']){
    const opts=c[key]?.options;
    if(!c[key]?.q||!opts||opts.length<3||opts.filter(o=>o.correct).length!==1||opts.some(o=>!o.why))errors.push(`${c.id}: questão ${key} inválida`);
  }
  if(!c.teaching||!c.patient||!c.context||!c.indicators?.length)errors.push(`${c.id}: dados pedagógicos incompletos`);
 }
 if(glossary?.length<10)errors.push('Glossário insuficiente');
 return errors;
}
export function loadProgress(raw,caseIds=[]){
 const empty=blankProgress(); if(!raw||typeof raw!=='object')return empty;
 const valid=new Set(caseIds);
 const records={};
 for(const [id,r] of Object.entries(raw.records||{})){
  if(valid.has(id)&&r&&Number.isFinite(r.score)&&r.score>=0&&r.score<=100){records[id]={score:Math.round(r.score),xp:Math.max(0,Math.min(300,Number(r.xp)||0)),errors:Math.max(0,Number(r.errors)||0),hints:Math.max(0,Number(r.hints)||0),at:String(r.at||'')};}
 }
 let session=null;
 if(raw.session&&valid.has(raw.session.id)&&PHASES.includes(raw.session.phase)){
  const s=raw.session;session={...freshSession(s.id),phase:s.phase,
   links:s.links&&typeof s.links==='object'?s.links:{},ordered:Array.isArray(s.ordered)?s.ordered:[],
   errors:Math.max(0,Math.min(100,Number(s.errors)||0)),hints:Math.max(0,Math.min(20,Number(s.hints)||0)),finished:!!s.finished,guideUsed:!!s.guideUsed,consultHistory:Array.isArray(s.consultHistory)?s.consultHistory.filter(item=>item&&typeof item==='object'&&typeof item.body==='string').slice(-20):[],decisionAnswer:s.decisionAnswer===true?true:null,strategyAnswer:s.strategyAnswer===true?true:null,transferAnswer:s.transferAnswer===true?true:null,wrongAttempts:Object.fromEntries(['decision','strategy','transfer'].map(k=>[k,Array.isArray(s.wrongAttempts?.[k])?s.wrongAttempts[k].filter(i=>Number.isInteger(i)&&i>=0&&i<=4):[]])),wrongLinks:Array.isArray(s.wrongLinks)?s.wrongLinks.filter(x=>typeof x==='string').slice(0,100):[],wrongSteps:Array.isArray(s.wrongSteps)?s.wrongSteps.filter(x=>typeof x==='string').slice(0,100):[],hintPhases:Array.isArray(s.hintPhases)?s.hintPhases.filter(p=>PHASES.includes(p)):[]};
 }
 return {rewards:normalizeRewards(raw.rewards),lastReward:raw.lastReward&&typeof raw.lastReward==='object'?{caseId:String(raw.lastReward.caseId||''),xp:Math.max(0,Number(raw.lastReward.xp)||0),daily:Math.max(0,Number(raw.lastReward.daily)||0),score:Math.max(0,Number(raw.lastReward.score)||0)}:null,version:2,nickname:typeof raw.nickname==='string'?raw.nickname.slice(0,36):empty.nickname,records,sound:!!raw.sound,companion:typeof raw.companion==='string'?raw.companion.slice(0,32):'Maco',session};
}
export function calculateReward(session,difficulty){
 const deduction=session.errors*6+session.hints*9;
 const score=Math.max(40,Math.min(100,100-deduction));
 const xp=Math.max(35,Math.round((80+Number(difficulty)*25)*(score/100)));
 const mastery=score>=90?'Avançado':score>=75?'Proficiente':score>=60?'Em desenvolvimento':'Revisão recomendada';
 return {score,xp,mastery};
}
export function summarize(progress,cases,worlds){
 const completed=cases.filter(c=>progress.records[c.id]);
 const scores=completed.map(c=>progress.records[c.id].score);
 const xp=Object.values(progress.records).reduce((sum,r)=>sum+(r.xp||0),0)+(progress.rewards?.bonusXP||0);
 const average=scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):0;
 const byWorld=worlds.map(w=>({id:w.id,name:w.title,done:cases.filter(c=>c.world===w.id&&progress.records[c.id]).length,total:cases.filter(c=>c.world===w.id).length}));
 const achievements=achievementList(progress,cases,worlds);
 const level=levelInfo(xp);
 const streak=currentStreak(progress.rewards?.activity);
 return {completed:completed.length,total:cases.length,xp,average,byWorld,achievements,level,streak};
}
export function reportCSV(progress,cases,worlds){
 const rows=[['Missão','Mundo','Nota (0-100)','XP','Erros','Dicas','Concluído em']];
 for(const c of cases){const r=progress.records[c.id];if(r)rows.push([c.title,worlds.find(w=>w.id===c.world)?.title||'',r.score,r.xp,r.errors,r.hints,r.at]);}
 return '\uFEFF'+rows.map(row=>row.map(x=>'"'+String(x??'').replaceAll('"','""')+'"').join(';')).join('\r\n');
}
