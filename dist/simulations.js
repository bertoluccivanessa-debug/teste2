/** Microsimuladores didáticos; cenas esquemáticas, não modelos quantitativos de biologia. */
export const LABS={
 phago:{title:'Operação Fagocitose',icon:'🟢',setting:'Tecido lesionado',role:'Macrófago',short:'Da captura à destruição',
  steps:['Reconhecer o patógeno','Emitir pseudópodes e internalizar','Fundir fagossomo e lisossomo'],
  descriptions:[
   'Receptores do fagócito e/ou opsoninas favorecem reconhecimento e adesão. Reconhecimento isolado ainda não é ingestão.',
   'A membrana envolve o alvo e constitui um fagossomo. Estar internalizado não garante que o microrganismo tenha sido eliminado.',
   'A maturação do fagossomo e a ação do compartimento fagolisossomal favorecem a degradação. Alguns patógenos podem escapar desses mecanismos.'
  ],
  blockIndex:2,blockLabel:'Bloquear a fusão fagolisossomal',blockWhy:'A bactéria pode permanecer em um compartimento intracelular sem destruição eficaz. Isso demonstra por que fagocitose e atividade microbicida não são sinônimos.',
  takeaway:'Resultado: reconhecimento → internalização → processamento microbicida. A eficácia depende de cada etapa.'},
 mhc:{title:'Missão Sinapse Imunológica',icon:'🟣',setting:'Linfonodo',role:'Célula dendrítica + T CD4+',short:'Da captura à ativação T',
  steps:['Capturar e processar antígeno','Exibir peptídeo em MHC II','Fornecer coestimulação ao T CD4+'],
  descriptions:[
   'A célula dendrítica internaliza proteínas e as processa em fragmentos peptídicos.',
   'O complexo peptídeo–MHC II pode ser reconhecido pelo TCR de um T CD4+ específico. O TCR convencional não reconhece o antígeno solúvel como um BCR.',
   'A interação coestimuladora (como CD80/CD86–CD28), com sinais apropriados, contribui para a ativação; apresentação antigênica isolada pode ser insuficiente.'
  ],
  blockIndex:2,blockLabel:'Remover a coestimulação',blockWhy:'Mesmo com TCR reconhecendo peptídeo–MHC II, a ausência de coestimulação adequada pode impedir ativação plena e favorecer tolerância/anergia conforme o contexto.',
  takeaway:'Resultado: TCR reconhece peptídeo–MHC II; coestimulação e contexto orientam a resposta T.'},
 antibody:{title:'Encaixe Epítopo–Parátopo',icon:'🟩',setting:'Corrente sanguínea',role:'IgG + antígeno',short:'Da afinidade à neutralização',
  steps:['Localizar o epítopo viral','Selecionar um parátopo complementar','Testar bloqueio de ligação viral'],
  descriptions:[
   'Epítopo é a região do antígeno reconhecida especificamente pelo anticorpo. Nem todos os epítopos estão igualmente acessíveis.',
   'O parátopo, na região variável dos braços Fab, liga-se ao epítopo compatível. A região Fc não constitui o parátopo.',
   'Neste modelo, a ligação ao epítopo funcional bloqueia o acesso do vírus ao receptor da célula e exemplifica neutralização. Outras ligações podem não neutralizar.'
  ],
  blockIndex:1,blockLabel:'Trocar por parátopo incompatível',blockWhy:'Sem complementaridade suficiente, não há ligação específica estável. A IgG não neutraliza este antígeno apenas por estar presente.',
  takeaway:'Resultado: afinidade específica é requisito de ligação; proteção funcional exige testar a consequência da ligação.'}
};
export const LAB_IDS=Object.keys(LABS);
export const newLabState=(id='phago')=>({id:LABS[id]?id:'phago',step:0,blocked:false,feedback:'',complete:false});
export function advanceLab(state){
 const lab=LABS[state.id];
 if(state.complete)return {...state,feedback:'A simulação está completa. Reinicie para comparar condições.'};
 const next=state.step+1;
 if(state.blocked && state.step===lab.blockIndex){return {...state,feedback:lab.blockWhy};}
 const complete=next===lab.steps.length;
 return {...state,step:next,complete,feedback:complete?lab.takeaway:lab.descriptions[next-1]};
}
export function toggleLabBlock(state){return {...newLabState(state.id),blocked:!state.blocked,feedback:!state.blocked?'Perturbação ativada. Observe até onde o mecanismo funciona.':'Controle restabelecido. Compare os resultados.'};}
const h=x=>String(x).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
function svgPhago(state){const level=state.step;return `<svg viewBox="0 0 620 280" role="img" aria-label="Animação esquemática: macrófago, bactéria, fagossomo e lisossomo"><defs><linearGradient id="cell-grad" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#7bf7b7"/><stop offset="1" stop-color="#22bbad"/></linearGradient></defs>
 <rect width="620" height="280" rx="24" fill="#15324a"/><g opacity=".3" fill="#77eac7"><circle cx="57" cy="56" r="5"/><circle cx="556" cy="80" r="7"/><circle cx="490" cy="239" r="4"/></g>
 <g class="phago-cell ${level>=2?'engulfed':''}"><path d="M255 56Q342 50 370 132Q402 196 322 229Q268 253 188 212Q105 191 129 123Q143 61 255 56Z" fill="url(#cell-grad)" stroke="#c6fff0" stroke-width="5"/><ellipse cx="222" cy="124" rx="36" ry="23" fill="#418bbb" opacity=".65"/><g fill="#29476a"><circle cx="226" cy="162" r="7"/><circle cx="271" cy="164" r="7"/></g><path d="M229 181Q248 198 268 181" fill="none" stroke="#29476a" stroke-width="5" stroke-linecap="round"/>
 ${level>=2?'<circle cx="319" cy="118" r="45" fill="#143a6b" stroke="#f3dd92" stroke-width="5" stroke-dasharray="7 4"/>':''}</g>
 <g class="phago-target ${level>=2?'target-inside':''}" transform="translate(${level>=2?291:454},${level>=2?117:143})"><ellipse rx="33" ry="21" fill="#b88fff" stroke="#f1dbff" stroke-width="4"/><g stroke="#e0baff" stroke-width="5" stroke-linecap="round"><path d="M-24 -23l-9 -11M10 -22l6 -12M32 -5l14 -6M-30 15l-10 11M18 21l8 11"/></g><circle cx="-8" cy="-3" r="3" fill="#3a235c"/><circle cx="9" cy="-3" r="3" fill="#3a235c"/></g>
 ${level>=1&&level<2?'<path d="M372 140C395 106 414 115 432 138" fill="none" stroke="#ffe98b" stroke-width="7" stroke-dasharray="8 8"/>':''}
 ${level===3&&!state.blocked?'<g class="phago-lysis" fill="#ffe69b"><circle cx="305" cy="102" r="7"/><circle cx="325" cy="130" r="6"/><circle cx="294" cy="135" r="5"/><path d="M351 58L366 39M347 84L378 80" stroke="#ffe69b" stroke-width="6"/></g>':''}
 <g fill="#e9f9ff" font-family="system-ui" font-size="15" font-weight="700"><text x="26" y="255">Macrófago</text><text x="436" y="255">Microrganismo</text></g></svg>`;}
function svgMhc(state){const level=state.step;return `<svg viewBox="0 0 620 280" role="img" aria-label="Célula dendrítica com peptídeo–MHC II interagindo com linfócito T CD4 e coestimulação"><rect width="620" height="280" rx="24" fill="#222650"/><g class="dendritic-anim"><circle cx="192" cy="145" r="68" fill="#a587fa" stroke="#e9dcff" stroke-width="5"/><g stroke="#b89fff" stroke-width="22" stroke-linecap="round"><path d="M139 100L97 53M141 183L81 207M207 83L220 34M245 156L290 135M199 205L216 252"/></g><circle cx="169" cy="144" r="6" fill="#241b59"/><circle cx="209" cy="144" r="6" fill="#241b59"/><path d="M175 163Q189 177 205 163" fill="none" stroke="#241b59" stroke-width="5"/></g>
 <g class="tcell-anim ${level===3?'activated':''}"><circle cx="447" cy="143" r="76" fill="#50b7f6" stroke="#d9f4ff" stroke-width="5"/><circle cx="429" cy="134" r="8" fill="#193e68"/><circle cx="468" cy="134" r="8" fill="#193e68"/><path d="M427 163Q446 178 465 162" fill="none" stroke="#193e68" stroke-width="5"/></g>
 ${level>=2?'<g><path d="M284 113L321 113L334 128L321 145L284 145" fill="#e6d5ff" stroke="#fff" stroke-width="3"/><rect x="308" y="106" width="10" height="17" rx="4" fill="#ffcd72"/><path d="M344 113L358 130L344 145" fill="none" stroke="#79fcf0" stroke-width="8" stroke-linecap="round"/></g>':''}
 ${level>=3&&!state.blocked?'<g><circle cx="335" cy="179" r="10" fill="#ffe491"/><path d="M323 179L350 179" stroke="#fff" stroke-width="5"/><path d="M447 43l9 -16M477 53l19 -14M511 88l25 -7" stroke="#8ff4ce" stroke-width="6" stroke-linecap="round"/></g>':''}
 <g fill="#e5eaff" font-family="system-ui" font-weight="700" font-size="16"><text x="74" y="265">Dendrítica</text><text x="398" y="265">T CD4+</text>${level>=2?'<text x="291" y="86" font-size="13">pMHC II · TCR</text>':''}</g></svg>`;}
function svgAntibody(state){const level=state.step;return `<svg viewBox="0 0 620 280" role="img" aria-label="Anticorpo IgG em Y com braço Fab reconhecendo epítopo da superfície de um vírus"><rect width="620" height="280" rx="24" fill="#16435c"/>
 <g class="antigen-virus"><circle cx="184" cy="137" r="68" fill="#ff8d8b" stroke="#ffd8b3" stroke-width="5"/><g fill="#f8c878" stroke="#ffeec7" stroke-width="2"><circle cx="156" cy="108" r="10"/><circle cx="217" cy="164" r="12"/><circle cx="177" cy="188" r="9"/><circle cx="137" cy="147" r="9"/></g><path d="M225 88Q240 95 244 111L229 120L216 105Z" fill="#a8e7f5" stroke="#fff" stroke-width="4"/></g>
 <g class="igg-anim ${level>=2?'igg-fit':''}"><path d="M410 225L410 148L367 104M410 148L453 104" stroke="#9bffb5" stroke-width="26" fill="none" stroke-linejoin="round" stroke-linecap="round"/><path d="M352 92l-20 -19M468 89l22 -17" fill="none" stroke="#e4fdaf" stroke-width="27" stroke-linecap="round"/><circle cx="408" cy="137" r="6" fill="#336a78"/></g>
 ${level>=3&&!state.blocked?'<g stroke="#a8ffb9" stroke-width="6" fill="none"><path d="M241 95Q270 87 298 85" stroke-dasharray="7 8"/><circle cx="522" cy="84" r="24"/><path d="M508 83l10 10 17 -21"/></g>':''}
 <g fill="#e9f9ff" font-family="system-ui" font-size="16" font-weight="700"><text x="110" y="254">Antígeno viral</text><text x="378" y="254">IgG · sítio Fab</text>${level>=1?'<text x="176" y="45" font-size="13">Epítopo</text>':''}${level>=2?'<text x="390" y="52" font-size="13">Parátopo</text>':''}</g></svg>`;}
const GRAPHICS={phago:svgPhago,mhc:svgMhc,antibody:svgAntibody};
export function renderLabExperience(state){const lab=LABS[state.id];return `<section class="bio-playground" id="bio-playground" aria-label="Microssimuladores de imunologia"><div class="bio-header"><div><span class="mini-label">EXPERIMENTO INTERATIVO · APRENDER FAZENDO</span><h2>ImunoLab: teste o mecanismo</h2><p>Escolha uma simulação e execute cada etapa. Ative uma falha para comparar o que muda na resposta biológica.</p></div><span class="bio-chip">Esquemático · não quantitativo</span></div>
 <div class="bio-tabs" role="group" aria-label="Selecionar simulação">${LAB_IDS.map(id=>`<button data-lab-select="${id}" aria-pressed="${state.id===id}" class="${state.id===id?'selected':''}">${LABS[id].icon} ${LABS[id].title}</button>`).join('')}</div>
 <div class="bio-stage"><div class="bio-graphic">${GRAPHICS[state.id](state)}</div><div class="bio-console"><span class="mini-label">${h(lab.setting.toUpperCase())} · ${h(lab.role)}</span><h3>${h(lab.short)}</h3><p class="bio-explainer">${state.feedback?h(state.feedback):'Clique em “Executar etapa” para iniciar. Não confunda observação, reconhecimento e efeito final.'}</p>
 <div class="bio-checkpoints" aria-label="Etapas do mecanismo">${lab.steps.map((step,i)=>`<div class="${i<state.step?'done':i===state.step?'next':''}"><span>${i<state.step?'✓':i+1}</span><p>${h(step)}</p></div>`).join('')}</div>
 <label class="bio-toggle"><input type="checkbox" data-lab-block="1" ${state.blocked?'checked':''}><span>${h(lab.blockLabel)}</span></label>
 <div class="bio-actions"><button class="btn primary" data-lab-action="advance" ${state.complete?'disabled':''}>${state.complete?'✓ Concluído':state.blocked&&state.step===lab.blockIndex?'⚠ Testar falha':'▶ Executar etapa'}</button><button class="btn soft" data-lab-action="reset">↺ Reiniciar</button></div>
 <small>Controle guiado: as animações representam relações causais simplificadas. A atividade não simula taxas de reação nem substitui observações laboratoriais.</small></div></div></section>`;}
