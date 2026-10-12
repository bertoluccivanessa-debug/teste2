import test from 'node:test';
import assert from 'node:assert/strict';
import {drillById,orderedChoices} from '../src/curricular-drills.js';
import {fieldOptions,getFieldwork} from '../src/fieldwork.js';
const DOCTOR_KEY='immunoverse.doctor.v1';
test('fluxo formativo: 21 encontros → oficina CDP → aplicação → rubrica local sem XP duplicado', async()=>{
 const handlers={},memory=new Map([[DOCTOR_KEY,JSON.stringify({version:1,name:'Carla'})]]),root={innerHTML:'',addEventListener:(name,h)=>{handlers[name]=h},querySelector:()=>null};
 Object.defineProperty(globalThis,'document',{value:{getElementById:id=>id==='app'?root:null,querySelector:()=>null},configurable:true});
 Object.defineProperty(globalThis,'window',{value:{addEventListener:()=>{},scrollTo:()=>{}},configurable:true});
 Object.defineProperty(globalThis,'localStorage',{value:{getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)},configurable:true});
 Object.defineProperty(globalThis,'location',{value:{protocol:'http:',hostname:'example.org'},configurable:true});
 Object.defineProperty(globalThis,'navigator',{value:{},configurable:true});
 await import('../src/app.js?cdp54');
 const click=data=>{const target={dataset:data,closest:()=>target};handlers.click({target});};
 assert.match(root.innerHTML,/Doutor Carla/);
 click({clinicAction:'tab:semester'});assert.match(root.innerHTML,/21 encontros/);assert.match(root.innerHTML,/Iniciar desafio CDP/);
 click({clinicAction:'study:1'});assert.match(root.innerHTML,/Oficina|PRÁTICA FORMATIVA DO ENCONTRO/);
 const d=drillById('cdp-02');
 for(let phase=0;phase<3;phase++){
  const o=orderedChoices(d,phase).find(x=>x.correct);click({clinicAction:`study-answer:${o.index}`});
  assert.match(root.innerHTML,/Interpretação sustentada/);
  click({clinicAction:'study-next'});
 }
 assert.match(root.innerHTML,/45\/45 XP/);
 const saved=JSON.parse(memory.get('immunoverse.clinical.v1'));
 assert.equal(saved.exercise['cdp:cdp-02'],45);
 click({clinicAction:'study-restart'});for(let phase=0;phase<3;phase++){
  const o=orderedChoices(d,phase).find(x=>x.correct);click({clinicAction:`study-answer:${o.index}`});click({clinicAction:'study-next'});
 }
 assert.equal(JSON.parse(memory.get('immunoverse.clinical.v1')).exercise['cdp:cdp-02'],45);
 click({page:'expedition'});assert.match(root.innerHTML,/DESTINOS DISPONÍVEIS/);
 const field=getFieldwork('laboratorio',0);click({fieldAnswer:String(fieldOptions(field).find(o=>o.correct).index)});
 assert.match(root.innerHTML,/Interpretação registrada/);
 let progression=JSON.parse(memory.get('immunoverse.play.v2'));
 assert.equal(progression.rewards.bonusXP,6);
 click({fieldAnswer:String(fieldOptions(field).find(o=>o.correct).index)});
 progression=JSON.parse(memory.get('immunoverse.play.v2'));assert.equal(progression.rewards.bonusXP,6);
 click({page:'glossary'});assert.match(root.innerHTML,/Do termo ao/);assert.match(root.innerHTML,/Encadeamento mecanístico/);
 click({atlasTerm:'IgA'});assert.match(root.innerHTML,/IgA/);
});
