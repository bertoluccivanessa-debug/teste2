import test from 'node:test';
import assert from 'node:assert/strict';
import {LABS,newLabState,advanceLab,toggleLabBlock,renderLabExperience} from '../src/simulations.js';
import {CASES} from '../src/content.js';
import {loadProgress,STORAGE_KEY} from '../src/engine.js';

test('todos os três microssimuladores têm etapas cientificamente explicadas e completáveis',()=>{
 assert.deepEqual(Object.keys(LABS),['phago','mhc','antibody']);
 for(const id of Object.keys(LABS)){
  let state=newLabState(id);
  assert.match(renderLabExperience(state),/data-lab-action="advance"/);
  for(let step=0;step<3;step++){state=advanceLab(state);assert.equal(state.step,step+1);}
  assert.equal(state.complete,true);assert.match(state.feedback,/Resultado:/);
  assert.match(renderLabExperience(state),/Concluído/);
 }
});
test('uma perturbação altera o desfecho, mas não avança quando bloqueia um passo causal',()=>{
 for(const id of Object.keys(LABS)){
  let state=toggleLabBlock(newLabState(id));
  assert.equal(state.blocked,true);
  while(state.step<LABS[id].blockIndex)state=advanceLab(state);
  const stuck=advanceLab(state);
  assert.equal(stuck.complete,false);assert.equal(stuck.step,LABS[id].blockIndex);
  assert.match(stuck.feedback,/não|impedir|sem|pode/i);
  const restored=toggleLabBlock(stuck);
  assert.equal(restored.blocked,false);assert.equal(restored.step,0);
 }
});
test('o progresso de versões anteriores carrega com os novos registros de tentativas',()=>{
 const c=CASES[0];const old={version:2,session:{id:c.id,phase:'decision',links:{},ordered:[],hints:2,errors:1}};
 const x=loadProgress(old,CASES.map(c=>c.id));
 assert.deepEqual(x.session.wrongLinks,[]);
 assert.deepEqual(x.session.wrongSteps,[]);
 assert.deepEqual(x.session.hintPhases,[]);
 assert.deepEqual(x.session.wrongAttempts,{decision:[],strategy:[],transfer:[]});
});
test('interface: teste de troca de missão com confirmação e laboratório com retorno',async()=>{
 const handlers={},stored=new Map();
 const root={innerHTML:'',addEventListener:(t,h)=>handlers[t]=h,querySelector:()=>null};
 Object.defineProperty(globalThis,'document',{value:{getElementById:id=>id==='app'?root:null,querySelector:()=>null},configurable:true});
 Object.defineProperty(globalThis,'window',{value:{addEventListener:()=>{},scrollTo:()=>{}},configurable:true});
 Object.defineProperty(globalThis,'localStorage',{value:{getItem:key=>stored.get(key)||null,setItem:(key,v)=>stored.set(key,v)},configurable:true});
 Object.defineProperty(globalThis,'location',{value:{protocol:'http:',hostname:'example.org'},configurable:true});
 Object.defineProperty(globalThis,'navigator',{value:{},configurable:true});
 stored.set('immunoverse.doctor.v1',JSON.stringify({version:1,name:'Aluno Teste'}));
 await import('../src/app.js?ux-regression');
 const click=d=>{const el={dataset:d,closest:()=>el};handlers.click({target:el});};
 click({world:CASES[0].world});click({case:CASES[0].id});
 click({action:'next'}); // investigação começada
 const current=JSON.parse(stored.get(STORAGE_KEY)).session.id;
 click({page:'home'});click({world:CASES[1].world});click({case:CASES[1].id});
 assert.match(root.innerHTML,/Trocar de investigação/);
 assert.equal(JSON.parse(stored.get(STORAGE_KEY)).session.id,current);
 click({action:'cancel-modal'});
 assert.equal(JSON.parse(stored.get(STORAGE_KEY)).session.id,current);
 click({action:'play-next'});
 click({action:'experiment-lab'});
 assert.match(root.innerHTML,/ImunoLab: teste o mecanismo/);
 assert.match(root.innerHTML,/Retomar missão/);
 click({labSelect:'mhc'});assert.match(root.innerHTML,/Sinapse Imunológica/);
 click({labAction:'advance'});assert.match(root.innerHTML,/internaliza proteínas/);
 click({action:'return-to-mission'});assert.match(root.innerHTML,/Laboratório de conexões/);
 // desafio de repetição incorreta em etapa de evidências
 const c=CASES.find(x=>x.id===current); const ev=c.evidence[0]; const bad=c.mechanisms.find(x=>x.id!==ev.mechanism);
 click({evidence:ev.id});click({mechanism:bad.id});click({mechanism:bad.id});
 assert.equal(JSON.parse(stored.get(STORAGE_KEY)).session.errors,1);
});
