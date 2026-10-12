import test from 'node:test';
import assert from 'node:assert/strict';
import {CLINICAL_CASES,LAB_STATIONS,SEMESTER,MOLECULAR_ASSEMBLY} from '../src/clinical-data.js';

test('onze casos sintéticos progressivos e decisões únicas por etapa',()=>{
 assert.equal(CLINICAL_CASES.length,11);
 for(const c of CLINICAL_CASES){
  assert.equal(c.tests.length,4);assert.equal(c.tests.filter(x=>x[2]).length,3);
  for(const k of ['triage','interpret','hypothesis','mechanism','conduct']){
    assert.ok(c[k].why.length>40);assert.ok(c[k].options.length>=3);
    assert.ok(Number.isInteger(c[k].correct) && c[k].correct<c[k].options.length);
  }
  assert.ok(c.history.length>=3);
 }
});

test('laboratório e trilha semestral cobrem N1 N2 e N3',()=>{
 assert.ok(LAB_STATIONS.length>=9);
 assert.ok(['N1','N2','N3'].every(n=>SEMESTER.some(row=>row[1]===n)));
 assert.ok(['elisa','vdrl','hemacruzi','imunolatex','abo','leuco','dat'].every(n=>LAB_STATIONS.some(l=>l.id===n)));
 assert.equal(MOLECULAR_ASSEMBLY.length,6);
});

test('jornada clínica integral persiste a melhor pontuação, sem duplicar XP',async()=>{
 const mem=new Map();globalThis.localStorage={getItem:k=>mem.get(k)||null,setItem:(k,v)=>mem.set(k,v)};
 const mod=await import('../src/clinical.js?clinical-journey');
 const click=x=>{assert.equal(mod.handleClinicalClick({target:{closest:()=>({dataset:{clinicAction:x}})}}),true);};
 const input=(x,v)=>mod.handleClinicalInput({target:{dataset:{clinicInput:x},value:v}});
 let html='';mod.bindClinicalRender(()=>{html=mod.clinicalPage();});
 click('open:hemo');assert.match(html,/Hemólise na enfermaria/);
 click('next');assert.match(html,/TRIAGEM|triagem/i);
 click('answer:triage:0');click('next');
 click('history:0');click('history:1');click('next');
 click('test:0');click('test:1');click('test:2');click('next');
 click('answer:interpret:0');click('next');
 click('answer:hypothesis:0');click('next');
 click('answer:mechanism:0');input('justification','DAT positivo e LDH alta indicam hemólise imune, e o FcγR permite remoção por macrófagos.');click('next');
 click('answer:conduct:0');click('next');
 assert.match(html,/Relatório final/);
 const d=JSON.parse(mem.get('immunoverse.clinical.v1'));
 assert.equal(d.records.hemo.score,90);
 assert.ok(d.records.hemo.xp>0);
 const xp=d.records.hemo.xp;
 click('open:hemo');click('answer:triage:1');click('next');click('history:0');click('history:1');click('next');click('test:0');click('test:3');click('next');click('answer:interpret:1');click('next');click('answer:hypothesis:1');click('next');click('answer:mechanism:1');input('justification','Investigação de hipótese alternativa e mecanismos associados, com evidências compatíveis ou não.');click('next');click('answer:conduct:1');click('next');
 const after=JSON.parse(mem.get('immunoverse.clinical.v1'));
 assert.equal(after.records.hemo.score,90);
 assert.equal(after.records.hemo.xp,xp);
});

test('estações laboratoriais e montagem não concedem XP repetido',async()=>{
 const mem=new Map();globalThis.localStorage={getItem:k=>mem.get(k)||null,setItem:(k,v)=>mem.set(k,v)};
 const mod=await import('../src/clinical.js?clinical-exercise');
 mod.bindClinicalRender(()=>mod.clinicalPage());
 const click=x=>mod.handleClinicalClick({target:{closest:()=>({dataset:{clinicAction:x}})}});
 click('station:elisa');click('labanswer:0');
 let d=JSON.parse(mem.get('immunoverse.clinical.v1'));assert.equal(d.exercise['lab:elisa'],15);
 click('station:elisa');click('labanswer:0');d=JSON.parse(mem.get('immunoverse.clinical.v1'));assert.equal(d.exercise['lab:elisa'],15);
 for(const x of MOLECULAR_ASSEMBLY){click('piece:'+x.id);click('slot:'+x.id);}
 d=JSON.parse(mem.get('immunoverse.clinical.v1'));assert.equal(d.exercise.assembly,20);
});
