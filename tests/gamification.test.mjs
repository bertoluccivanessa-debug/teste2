import test from 'node:test';
import assert from 'node:assert/strict';
import {CASES,WORLDS} from '../src/content.js';
import {blankProgress, loadProgress, summarize} from '../src/engine.js';
import {dayKey,dailyCase,claimDaily,claimLab,claimArena,levelInfo,selectArenaQuestions,achievementList,currentStreak,normalizeRewards} from '../src/gamification.js';
const date=new Date(2026,9,10,12,0,0);
test('níveis escalam com XP e barreiras crescentes',()=>{
 assert.equal(levelInfo(0).level,1);
 assert.equal(levelInfo(114).level,1);
 assert.equal(levelInfo(115).level,2);
 assert.equal(levelInfo(300).level,3);
 assert.ok(levelInfo(300).needed>0);
 assert.equal(levelInfo(115).progress,0);
});
test('missão diária é determinística e XP não se duplica em repetições',()=>{
 const progress=blankProgress();const choice=dailyCase(CASES,date);
 assert.equal(choice.id,dailyCase(CASES,date).id);
 assert.equal(claimDaily(progress,CASES.find(c=>c.id!==choice.id).id,CASES,date),0);
 assert.equal(claimDaily(progress,choice.id,CASES,date),30);
 assert.equal(claimDaily(progress,choice.id,CASES,date),0);
 assert.equal(progress.rewards.bonusXP,30);
});
test('prática experimental credita somente controle e perturbação inéditos',()=>{
 const progress=blankProgress();assert.equal(claimLab(progress,'phago',false,date),12);
 assert.equal(claimLab(progress,'phago',false,date),0);
 assert.equal(claimLab(progress,'phago',true,date),12);
 assert.equal(claimLab(progress,'phago',true,date),0);
 assert.equal(claimLab(progress,'nope',false,date),0);
 assert.equal(progress.rewards.bonusXP,24);
 assert.equal(achievementList(progress,CASES,WORLDS,date).find(x=>x.id==='compare').unlocked,true);
});
test('ronda: cinco questões de cinco mundos, somente um prêmio por dia',()=>{
 const q=selectArenaQuestions(CASES,date),progress=blankProgress();
 assert.equal(q.length,5);assert.equal(new Set(q.map(x=>x.world)).size,5);
 assert.ok(q.every(x=>x.options.filter(o=>o.correct).length===1));
 assert.deepEqual(q.map(x=>x.id),selectArenaQuestions(CASES,date).map(x=>x.id));
 assert.equal(claimArena(progress,4,date),32);
 assert.equal(claimArena(progress,5,date),0);
 assert.equal(progress.rewards.arena[dayKey(date)].score,4);
 assert.equal(achievementList(progress,CASES,WORLDS,date).find(x=>x.id==='arena').unlocked,true);
});
test('progresso v3.2 é migrado sem perder resultados e sem XP artificial',()=>{
 const c=CASES[0];const old={version:2,nickname:'Estudante',records:{[c.id]:{score:93,xp:88,errors:1,hints:0,at:'2026-10-09'}},session:{id:c.id,phase:'cascade',guideUsed:true}};
 const migrated=loadProgress(old,CASES.map(c=>c.id));const totals=summarize(migrated,CASES,WORLDS);
 assert.equal(totals.xp,88);assert.equal(totals.completed,1);assert.equal(totals.level.level,1);
 assert.equal(migrated.session.guideUsed,true);assert.deepEqual(migrated.rewards.daily,{});
 assert.equal(migrated.records[c.id].score,93);
});
test('streak reconhece dias consecutivos sem penalidade nem coerção',()=>{
 const activity={'2026-10-08':true,'2026-10-09':true,'2026-10-10':true};
 assert.equal(currentStreak(activity,date),3);
 assert.equal(currentStreak({'2026-10-09':true},date),1);
 assert.equal(currentStreak({},date),0);
});
test('entrada antiga ou inválida de recompensas é sanitizada',()=>{
 const r=normalizeRewards({bonusXP:-50,daily:{'invalid':'x','2026-10-10':'c'},lab:{'phago:normal':true,'phago:what':true},arena:{'2026-10-10':{score:999,xp:123}},focusWorld:'valid'});
 assert.equal(r.bonusXP,0);
 assert.deepEqual(r.daily,{'2026-10-10':'c'});
 assert.equal(r.lab['phago:what'],undefined);
 assert.equal(r.arena['2026-10-10'].score,5);
 assert.equal(r.arena['2026-10-10'].xp,40);
});
test('navegação permite executar uma ronda completa e a premiação não se repete',async()=>{
 const handlers={}, stored=new Map(),root={innerHTML:'',addEventListener:(t,fn)=>handlers[t]=fn,querySelector:()=>null};
 Object.defineProperty(globalThis,'document',{value:{getElementById:id=>id==='app'?root:null,querySelector:()=>null},configurable:true});
 Object.defineProperty(globalThis,'window',{value:{addEventListener:()=>{},scrollTo:()=>{}},configurable:true});
 Object.defineProperty(globalThis,'localStorage',{value:{getItem:key=>stored.get(key)||null,setItem:(key,value)=>stored.set(key,value)},configurable:true});
 Object.defineProperty(globalThis,'location',{value:{protocol:'http:',hostname:'test.example'},configurable:true});
 Object.defineProperty(globalThis,'navigator',{value:{},configurable:true});
 stored.set('immunoverse.doctor.v1',JSON.stringify({version:1,name:'Aluno Teste'}));
 await import('../src/app.js?gamification-regression');
 const click=data=>{const el={dataset:data,closest:()=>el};handlers.click({target:el});};
 assert.match(root.innerHTML,/Trilha semestral/);
 click({page:'home'}); assert.match(root.innerHTML,/Sua próxima descoberta/);
 click({page:'arena'});assert.match(root.innerHTML,/Ronda/);
 click({action:'arena-start'});
 const questions=selectArenaQuestions(CASES);
 for(let i=0;i<questions.length;i++){
  assert.match(root.innerHTML,/SITUAÇÃO-PROBLEMA/);
  const right=questions[i].options.findIndex(o=>o.correct);
  click({arenaAnswer:String(right)});
  assert.match(root.innerHTML,/Boa interpretação/);
  click({action:'arena-next'});
 }
 assert.match(root.innerHTML,/Ronda concluída/);
 const current=JSON.parse(stored.get('immunoverse.play.v2'));
 assert.equal(current.rewards.arena[dayKey()].score,5);
 assert.equal(current.rewards.bonusXP,40);
 click({action:'arena-restart'});
 for(let i=0;i<questions.length;i++){
  click({arenaAnswer:String(questions[i].options.findIndex(o=>o.correct))});click({action:'arena-next'});
 }
 const again=JSON.parse(stored.get('immunoverse.play.v2'));
 assert.equal(again.rewards.bonusXP,40);
});
