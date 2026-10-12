import test from 'node:test';
import assert from 'node:assert/strict';
import {ADVANCED_LABS,freshAdvancedLab,advanceAdvancedLab,chooseAdvancedMode,answerAdvancedLab,advancedLabXP,advancedGraphic,renderAdvancedLab} from '../src/immunolab-v52.js';
import {normalizeDoctorName,doctorLabel,writeDoctorProfile,readDoctorProfile,DOCTOR_PROFILE_KEY} from '../src/doctor-profile.js';
import {clinicalPage,handleClinicalClick,bindClinicalRender,clinicalStats} from '../src/clinical.js';

test('cadastro pergunta nome e trata usuário como Doutor + nome fornecido, sem HTML injetado',()=>{
 const map=new Map(),store={getItem:key=>map.get(key)||null,setItem:(k,v)=>map.set(k,v)};
 assert.equal(readDoctorProfile(store),'');
 assert.equal(writeDoctorProfile('  Sofia  ',store),true);
 assert.equal(doctorLabel(readDoctorProfile(store)),'Doutor Sofia');
 assert.equal(normalizeDoctorName('<img src=x onerror=1>  Ana'),'img src=x onerror=1 Ana');
 assert.ok(map.has(DOCTOR_PROFILE_KEY));
 assert.equal(writeDoctorProfile('  ',store),false);
});
test('nove estações possuem trilha clínica, três etapas e alternativas de inferência não triviais',()=>{
 assert.equal(ADVANCED_LABS.length,9);
 assert.equal(new Set(ADVANCED_LABS.map(x=>x.id)).size,9);
 for(const l of ADVANCED_LABS){
  assert.ok(['N1','N2','N3'].includes(l.track));assert.equal(l.steps.length,3);
  assert.ok(l.objective&&l.observe&&l.mechanism&&l.failure&&l.application&&l.error&&l.why);
  assert.ok(l.options.length===3 && Number.isInteger(l.correct));
  const s=freshAdvancedLab(l.id);
  assert.match(advancedGraphic(s),/<svg/);
  assert.match(renderAdvancedLab(s,'Doutor Sofia'),/Doutor Sofia/);
  assert.match(renderAdvancedLab(s,'<script>'),/&lt;script&gt;/);
 }
});
test('avanço bloqueia resposta antecipada e libera interpretação ao final',()=>{
 let s=freshAdvancedLab('hemato');
 s=answerAdvancedLab(s,0);assert.equal(s.completed,false);assert.equal(advancedLabXP(s),0);
 for(let i=0;i<3;i++)s=advanceAdvancedLab(s);
 assert.equal(s.step,3);assert.equal(advanceAdvancedLab(s).step,3);
 s=answerAdvancedLab(s,1);assert.equal(s.wrong,1);
 s=answerAdvancedLab(s,0);assert.equal(s.completed,true);assert.equal(advancedLabXP(s),30);
 assert.equal(answerAdvancedLab(s,0),s);
});
test('experimentos perturbados mudam esquemas e feedback sem alterar resposta fundamentada',()=>{
 for(const l of ADVANCED_LABS){let s=freshAdvancedLab(l.id);for(let i=0;i<3;i++)s=advanceAdvancedLab(s);
  const control=advancedGraphic(s);s=chooseAdvancedMode(s,'abnormal');assert.equal(s.step,0);
  for(let i=0;i<3;i++)s=advanceAdvancedLab(s);
  assert.notEqual(advancedGraphic(s),control,`visual deve mudar para ${l.id}`);
  s=answerAdvancedLab(s,l.correct);assert.equal(s.completed,true);
  assert.equal(advancedLabXP(s),35);
 }
});
test('leucograma calcula corretamente 600 neutrófilos/µL, sorologia e imunoensaios têm controles',()=>{
 assert.match(ADVANCED_LABS.find(x=>x.id==='hemato').why,/600/);
 assert.match(ADVANCED_LABS.find(x=>x.id==='latex').why,/identificação/);
 assert.match(ADVANCED_LABS.find(x=>x.id==='elisa').failure,/controle/);
 assert.match(ADVANCED_LABS.find(x=>x.id==='abo').normal,/B RhD negativo/);
});
test('clínica expõe navegação ImunoLab 5.2 e mantém progresso antigo',()=>{
 let output=clinicalPage();assert.match(output,/ImunoLab 5.2/);
 bindClinicalRender(()=>{output=clinicalPage()});
 const click=action=>{const el={dataset:{clinicAction:action},closest:()=>el};return handleClinicalClick({target:el})};
 click('tab:advanced');assert.match(output,/imunolab/i);assert.match(output,/Executar próxima etapa/);
 click('advanced-select:abo');assert.match(output,/Anti-B/);
 click('advanced-next');click('advanced-next');click('advanced-next');
 click('advanced-answer:1');assert.match(output,/Interpretação/);
 click('advanced-reset');assert.match(output,/Executar próxima etapa/);
 assert.equal(clinicalStats().advancedStations,9);
});
