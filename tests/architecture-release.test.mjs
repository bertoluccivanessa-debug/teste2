import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {CELL_ATLAS,ATLAS_FOUNDATIONS,ATLAS_EXAMS,ATLAS_TERMS,HEMATOPOIESIS_MODULE} from '../src/consultation.js';
import {MORPHOLOGY,cellSVG} from '../src/morphology.js';
const contents=async f=>readFile(new URL(f,import.meta.url),'utf8');
test('Atlas avançado preserva hematopoiese e caminhos de exame',async()=>{
 assert.ok(CELL_ATLAS.length>=14);
 assert.ok(ATLAS_FOUNDATIONS.length>=4);
 assert.ok(ATLAS_EXAMS.length>=6);
 assert.ok(ATLAS_TERMS.length>=20);
 assert.match(HEMATOPOIESIS_MODULE.intro,/hematopoiese/i);
 for (const k of ['concepts','stages','primaryOrgans','secondaryOrgans','lymphFlow','clinicalLinks']) assert.ok(HEMATOPOIESIS_MODULE[k].length>=2,k);
 const app=await contents('../src/app.js');
 assert.match(app,/function hematopoiesisSection\(/);
 assert.match(app,/\$\{hematopoiesisSection\(\)\}/);
 assert.match(app,/id="atlas-hematopoiese"/);
 assert.match(app,/href="#atlas-hematopoiese"/);
});
test('Figuras vetoriais do atlas possuem identificação e funcionam para todos os leucócitos',()=>{
 for(const c of MORPHOLOGY){const svg=cellSVG(c.id);assert.match(svg,/role="img"/);assert.match(svg,/viewBox=/);assert.match(svg,/aria-label=/);}
});
test('Projeto usa uma única raiz para build Vercel e ignora dist no Git',async()=>{
 const pkg=JSON.parse(await contents('../package.json'));
 const vercel=JSON.parse(await contents('../vercel.json'));
 const gitignore=await contents('../.gitignore');
 assert.equal(pkg.engines.node,'22.x');
 assert.equal(pkg.scripts.build,'node tools/build.mjs');
 assert.equal(vercel.outputDirectory,'dist');
 assert.equal(vercel.buildCommand,'npm run build');
 assert.match(gitignore,/^dist\//m);
});
