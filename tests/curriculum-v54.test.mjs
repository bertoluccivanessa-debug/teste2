import test from 'node:test';
import assert from 'node:assert/strict';
import {CLINICAL_CDP} from '../src/semester-plan.js';
import {DRILLS,validateDrills,drillById,orderedChoices,newDrillSession,answerDrill,advanceDrill,drillScore} from '../src/curricular-drills.js';
import {SCENES} from '../src/adventure.js';
import {FIELDWORK,getFieldwork,fieldOptions,validateFieldwork} from '../src/fieldwork.js';
import {GLOSSARY} from '../src/content.js';
import {atlasContext,WORLD_CONTEXT} from '../src/atlas-context.js';
test('21 oficinas CDP: três decisões e quatro camadas de explicação por encontro',()=>{
 assert.equal(DRILLS.length,21);assert.deepEqual(validateDrills(CLINICAL_CDP.map(x=>x.id)),[]);
 for(const drill of DRILLS){assert.equal(drill.qs.length,3);assert.equal(drill.notes.length,4);for(let p=0;p<3;p++){const options=orderedChoices(drill,p);assert.equal(options.filter(o=>o.correct).length,1);assert.equal(new Set(options.map(o=>o.choice)).size,3);}}
});
test('oficinas CDP: acerto na primeira tentativa dá 45 XP ao final',()=>{
 let state=newDrillSession('cdp-02');const d=drillById(state.id);
 for(let p=0;p<3;p++){const option=orderedChoices(d,p).find(x=>x.correct);const r=answerDrill(state,option.index);assert.equal(r.correct,true);state=advanceDrill(r.state);}
 assert.equal(state.finished,true);assert.equal(drillScore(state),45);
});
test('oficinas CDP: erro não bloqueia e reduz XP de forma leve',()=>{
 let s=newDrillSession('cdp-06');const d=drillById(s.id);const bad=orderedChoices(d,0).find(x=>!x.correct);let result=answerDrill(s,bad.index);assert.equal(result.correct,false);s=result.state;
 const duplicate=answerDrill(s,bad.index);assert.equal(duplicate.accepted,false);assert.equal(duplicate.state.mistakes[0],1);
 s=answerDrill(s,orderedChoices(d,0).find(x=>x.correct).index).state;s=advanceDrill(s);
 for(let p=1;p<3;p++){s=advanceDrill(answerDrill(s,orderedChoices(d,p).find(x=>x.correct).index).state);}
 assert.equal(s.finished,true);assert.equal(drillScore(s),36);
});
test('Exploração: 8 destinos preservados com 24 decisões contextualizadas',()=>{
 assert.equal(Object.keys(FIELDWORK).length,24);assert.deepEqual(validateFieldwork(SCENES),[]);
 for(const scene of SCENES)for(let i=0;i<3;i++){const task=getFieldwork(scene.id,i);assert.ok(task);assert.equal(fieldOptions(task).filter(x=>x.correct).length,1);assert.equal(fieldOptions(task).length,3);}
});
test('Atlas: todos os 82+ termos possuem explicação contextual e ponte para missão, ImunoLab e programa',()=>{
 assert.ok(GLOSSARY.length>=82);for(const term of GLOSSARY){const ctx=atlasContext(term);for(const field of ['question','mechanism','clinical','pitfall','lab','caseId','cdp','specific'])assert.ok(ctx[field],`${term.term}: ${field}`);}
 assert.ok(Object.keys(WORLD_CONTEXT).length>=10);
});
test('Atlas: interpretações de anti-HBs, anti-HCV, IgA, MHC e CAR-T fazem distinções fisiológicas',()=>{
 for(const [name,world,match] of [['anti-HBs','hepatites',/vacinal|resolução/i],['anti-HCV','hepatites',/RNA/i],['IgA','mucosas',/secretora/i],['MHC II','adaptativa',/CD4/i],['CAR-T','cart',/quimérico/i]])assert.match(atlasContext({term:name,world,description:name}).specific,match);
});
