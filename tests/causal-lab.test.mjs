import test from 'node:test';
import assert from 'node:assert/strict';
import {causalView} from '../src/causal-view.js';
import {mountCausalLab,causalSummary,CAUSAL_STORAGE_KEY} from '../src/causal-lab.js';

function fakeBrowser(){
 const storage=new Map();
 globalThis.localStorage={getItem(k){return storage.get(k)||null},setItem(k,v){storage.set(k,v)},removeItem(k){storage.delete(k)}};
 globalThis.window={matchMedia:()=>({matches:false})};
 const nodes={};
 function node(name){return nodes[name]??={innerHTML:'',textContent:'',disabled:false,value:null,checked:false,callbacks:{},addEventListener(type,fn){this.callbacks[type]=fn},scrollIntoView(){},querySelector(sel){return node(name+' '+sel)},querySelectorAll(sel){if(sel==='[data-lab-station]')return Array.from({length:5},(_,i)=>node('station'+i));if(sel==='[name="lab-prediction"]')return Array.from({length:3},(_,i)=>{const item=node('prediction'+i);item.value=String(i);return item});if(sel==='[name="lab-clinical"]')return Array.from({length:3},(_,i)=>{const item=node('clinical'+i);item.value=String(i);return item});return [];}};
 }
 globalThis.document={querySelector:(sel)=>node(sel)};
 return {node,storage};
}

test('visão causal integra cinco estações, comparação experimental e créditos',()=>{
 const html=causalView();
 for(const key of ['causal-lab','lab-stations','lab-workspace','lab-progress-chip','lab-hero','lab-footnote'])assert.ok(html.includes(key),key);
 assert.match(html,/O que acontece se/);
});

test('Laboratório Causal executa previsão, comparação, transferência e recompensa uma vez',()=>{
 const {node}=fakeBrowser();const earned=[];
 mountCausalLab({onEarn:(points,key)=>earned.push({points,key})});
 assert.match(node('#lab-stations').innerHTML,/ESTAÇÃO 01/);
 assert.match(node('#lab-stations').innerHTML,/ESTAÇÃO 05/);
 assert.match(node('#lab-workspace').innerHTML,/Preveja antes de executar/);
 node('prediction0').callbacks.change();
 assert.equal(node('#lab-run').disabled,false);
 node('#lab-workspace #lab-run').callbacks.click();
 assert.match(node('#lab-workspace').innerHTML,/Controle ×/);
 assert.match(node('#lab-workspace').innerHTML,/Transferência clínica/);
 assert.equal(causalSummary().xp,80);
 node('clinical0').callbacks.change();
 node('#lab-workspace #lab-check-clinical').callbacks.click();
 assert.equal(causalSummary().xp,150);
 assert.equal(causalSummary().completed,1);
 assert.match(node('#lab-progress-chip').textContent,/1\/5/);
 assert.equal(earned.length,2);
 // A pontuação não pode ser duplicada ao revisitar a estação.
 mountCausalLab({onEarn:(points,key)=>earned.push({points,key})});
 node('prediction0').callbacks.change();
 node('#lab-workspace #lab-run').callbacks.click();
 assert.equal(causalSummary().xp,150);
 assert.equal(earned.length,2);
 assert.equal(CAUSAL_STORAGE_KEY,'immunoverse.play.causal.v55');
});
