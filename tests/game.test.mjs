import test from 'node:test';
import assert from 'node:assert/strict';
import {CASES,WORLDS,GLOSSARY} from '../src/content.js';
import {validateContent,calculateReward,freshSession,blankProgress,loadProgress,summarize,escapeHTML,reportCSV} from '../src/engine.js';
test('currículo tem 10 mundos e 42 missões válidas',()=>{
 assert.equal(WORLDS.length,10);assert.equal(CASES.length,42);
 assert.deepEqual(validateContent(CASES,WORLDS,GLOSSARY),[]);
 for(const w of WORLDS)assert.ok(CASES.filter(c=>c.world===w.id).length>=2);
 assert.equal(CASES.filter(c=>c.world==='hepatites').length,9);
 assert.equal(CASES.filter(c=>c.world==='hiv').length,5);
 assert.equal(CASES.filter(c=>c.world==='mucosas').length,5);
 assert.equal(CASES.filter(c=>c.world==='vacinas').length,5);
});
test('feedback e penalizações têm limites previsíveis',()=>{
 const perfect=calculateReward(freshSession('sent-01'),1);
 assert.equal(perfect.score,100);assert.equal(perfect.mastery,'Avançado');
 assert.ok(calculateReward({...freshSession('sent-01'),errors:3,hints:2},2).score<100);
 assert.equal(calculateReward({...freshSession('sent-01'),errors:200,hints:20},3).score,40);
});
test('progressão: importação ignora IDs desconhecidos',()=>{
 const p=loadProgress({nickname:'Aluno',records:{'sent-01':{score:88,xp:90},hacker:{score:100,xp:999}}},CASES.map(c=>c.id));
 assert.equal(Object.keys(p.records).length,1);assert.equal(p.nickname,'Aluno');
 const stats=summarize(p,CASES,WORLDS);assert.equal(stats.completed,1);assert.equal(stats.xp,90);
 assert.match(reportCSV(p,CASES,WORLDS),/O invasor que não morreu/);
});
test('saída HTML neutraliza conteúdo inserido',()=>assert.equal(escapeHTML('<img onerror="x">'),'&lt;img onerror=&quot;x&quot;&gt;'));
test('novo perfil começa sem conquistas',()=>{const stats=summarize(blankProgress(),CASES,WORLDS);assert.equal(stats.completed,0);assert.equal(stats.xp,0);});

test('marcadores de hepatites e HIV estão cobertos no conteúdo',()=>{
 const txt=JSON.stringify(CASES)+JSON.stringify(GLOSSARY);
 for(const term of ['HAV','HBV','HCV','HDV','HBsAg','Anti-HBs','Anti-HBc','HCV RNA','p24','IgA','IgG','Epítopo','Parátopo','Célula dendrítica','T CD8+','T CD4+','IgA secretora','Adjuvante','Imunização passiva'])assert.ok(txt.includes(term),term);
});
test('sessão parcialmente concluída é recuperável após atualização',()=>{
 const saved={...blankProgress(),session:{...freshSession('hep-03'),phase:'decision',decisionAnswer:true,links:{a:'b'},ordered:['passo 1'],errors:2}};
 const restored=loadProgress(saved,CASES.map(c=>c.id));
 assert.equal(restored.session.decisionAnswer,true);
 assert.equal(restored.session.errors,2);
 assert.equal(restored.session.phase,'decision');
});

import {SCENES,SCENE_BY_WORLD,CAST_IMAGES,STRATEGIES} from '../src/adventure.js';
import {INCIDENT_CASES} from '../src/incidents.js';
test('oito cenários navegáveis com três pontos de investigação cada',()=>{
 assert.equal(SCENES.length,8);
 const ids=new Set(CASES.map(c=>c.id));
 for(const scene of SCENES){assert.equal(scene.hotspots.length,3);for(const spot of scene.hotspots){assert.ok(ids.has(spot.caseId),`${scene.name} → ${spot.caseId}`);assert.ok(spot.x>0&&spot.x<100&&spot.y>0&&spot.y<100);}}
 for(const w of WORLDS)assert.ok(SCENES.some(s=>s.id===SCENE_BY_WORLD[w.id]));
});
test('dez simuladores de decisão têm uma resposta correta e explicações',()=>{
 for(const world of WORLDS){const x=STRATEGIES[world.id];assert.ok(x?.intro);assert.equal(x.options.filter(o=>o.correct).length,1);assert.equal(x.options.length,3);assert.ok(x.options.every(o=>o.why));}
 assert.equal(INCIDENT_CASES.length,10);
});
test('progresso antigo migra sem apagar registros e inclui novos guias',()=>{
 const restored=loadProgress({nickname:'Pesquisador',records:{'sent-01':{score:90,xp:100}},session:{...freshSession('sent-01'),phase:'decision',decisionAnswer:true}},CASES.map(c=>c.id));
 assert.equal(restored.records['sent-01'].score,90);assert.equal(restored.session.strategyAnswer,null);assert.equal(restored.companion,'Maco');
 const switched=loadProgress({...restored,companion:'Dendi',session:{...restored.session,phase:'strategy',strategyAnswer:true}},CASES.map(c=>c.id));
 assert.equal(switched.companion,'Dendi');assert.equal(switched.session.strategyAnswer,true);
});
