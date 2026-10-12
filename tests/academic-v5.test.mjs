import test from 'node:test';
import assert from 'node:assert/strict';
import {CLINICAL_CDP, ASSESSMENT_PLAN} from '../src/semester-plan.js';
import {MORPHOLOGY,cellSVG} from '../src/morphology.js';
import {CLINICAL_CASES,LAB_STATIONS,SEMESTER} from '../src/clinical-data.js';
import {clinicalPage,bindClinicalRender,handleClinicalClick,clinicalStats} from '../src/clinical.js';

const tracks=['N1','N2','N3'];
test('a trilha acadêmica corresponde às 21 datas do plano incluindo 17/12',()=>{
 assert.ok(['N1','N2','N3'].every(t=>CLINICAL_CASES.some(c=>c.track===t)));
 assert.equal(CLINICAL_CDP.length,21);assert.equal(SEMESTER.length,21);
 assert.equal(CLINICAL_CDP[0].date,'30/07');assert.equal(CLINICAL_CDP.at(-1).date,'17/12');
 assert.deepEqual(CLINICAL_CDP.map(x=>x.date),SEMESTER.map(x=>x[0]));
 for(const p of CLINICAL_CDP){assert.ok(p.connect&&p.develop&&p.practice);assert.ok(tracks.includes(p.track));assert.ok(LAB_STATIONS.some(x=>x.id===p.station));assert.ok(CLINICAL_CASES.some(c=>c.id===p.caseId));}
});
test('rubrica institucional é distinta do XP e preserva os pesos',()=>{
 for(const t of ['N1','N2']){const p=ASSESSMENT_PLAN[t];assert.equal(p.ptp,7);assert.equal(p.connect.reduce((n,x)=>n+x.value,0),1);assert.equal(p.practice.reduce((n,x)=>n+x.value,0),2);}
 assert.equal(ASSESSMENT_PLAN.N3.ptp,10);
});
test('ilustrações morfológicas têm núcleos e legendas conforme tipo, sem alegar fotomicrografia',()=>{
 assert.equal(MORPHOLOGY.length,10);
 for(const m of MORPHOLOGY){assert.ok(m.title&&m.label&&m.detail);const svg=cellSVG(m.id);assert.match(svg,/<svg/);assert.match(svg,/Ilustração esquemática/);}
 assert.match(cellSVG('neutrophil'),/ellipse/);assert.match(cellSVG('lymphocyte'),/circle/);
});
test('painel clínico e mapa de currículo são navegáveis por ações explícitas',()=>{
 let html=clinicalPage();assert.match(html,/Trilha semestral/);assert.match(html,/21 encontros/);
 bindClinicalRender(()=>{html=clinicalPage()});
 const act=(value)=>{const el={dataset:{clinicAction:value},closest:()=>el};handleClinicalClick({target:el});};
 act('tab:semester');assert.match(html,/CONECTAR/);assert.match(html,/DESENVOLVER/);assert.match(html,/PRATICAR/);
 act('term:N3');assert.match(html,/Devolutiva e revisão final/);
 act('tab:micro');assert.match(html,/Neutrófilo segmentado/);assert.match(html,/Esquizócito/);
 act('morph:monocyte');assert.match(html,/Núcleo reniforme/);
 act('tab:labs');assert.match(html,/Leucograma/);assert.match(html,/clinical-assay-visual/);
 assert.equal(clinicalStats().cases,11);
});
