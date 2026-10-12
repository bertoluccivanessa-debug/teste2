export const CAUSAL_STORAGE_KEY = 'immunoverse.play.causal.v55';
export function causalSummary(){
  try{const x=JSON.parse(localStorage.getItem(CAUSAL_STORAGE_KEY)||'{}');return {xp:Object.values(x.claimed||{}).reduce((s,v)=>s+(Number(v)||0),0),completed:Object.values(x.complete||{}).filter(Boolean).length,runs:Array.isArray(x.runs)?x.runs.length:0};}catch{return {xp:0,completed:0,runs:0};}
}
/* IMMUNOVERSE · Laboratório Causal v1.0
 * Simulador qualitativo educacional; sem inferência clínica individual.
 * Sem dependências externas. Os dados experimentais estão neste arquivo.
 */
export function mountCausalLab({onEarn=()=>{},initialStation='c3'}={}) {
  const STORAGE_KEY = CAUSAL_STORAGE_KEY;
  const experiments = [
    {
      id:'c3', label:'C3', short:'O invasor sem marca', subtitle:'Complemento e opsonização', icon:'shield', compartment:'Sangue · superfície bacteriana', system:'Complemento',
      intro:'Uma bactéria encapsulada entra na circulação. Compare a capacidade de deposição de C3b e a interação com fagócitos quando a disponibilidade de C3 é alterada.',
      variable:'Concentração/atividade funcional de C3',
      interventions:[
        {id:'partial',label:'Reduzir C3',detail:'Disponibilidade parcial; outras vias continuam presentes.',title:'C3 reduzido',state:'partial',description:'A deposição de C3b e a amplificação do complemento podem ficar diminuídas. A IgG continua capaz de contribuir para a opsonização, e o efeito final depende do contexto.',readouts:['Reduzida','Menos eficiente','Preservada','Potencialmente menor']},
        {id:'off',label:'Retirar C3',detail:'Deficiência funcional completa, como cenário idealizado.',title:'C3 ausente',state:'off',description:'A ausência de C3 compromete intensamente a opsonização por C3b/iC3b e a convergência das vias. Isso não significa abolição absoluta da fagocitose: receptores não dependentes de C3 e anticorpos podem atuar.',readouts:['Ausente','Comprometida','Preservada','Comprometida']}
      ],
      metrics:['Deposição de C3b','Opsonofagocitose por C3','Opsonização por IgG','Amplificação para C5'],baseline:['Funcional','Favorecida','Possível','Funcional'],
      prediction:'Qual função será mais diretamente afetada pela intervenção?',options:[
        ['Marcação por C3b e eficiência da opsonofagocitose','Correto: C3b/iC3b favorecem o reconhecimento de alvos pelos receptores do complemento nos fagócitos.'],
        ['Produção de anticorpos pelos plasmócitos','Incorreto: a produção de anticorpos não depende diretamente de C3 plasmático como sua maquinaria secretora; interações do complemento podem modular respostas B.'],
        ['Expressão do TCR em todos os linfócitos T','Incorreto: a expressão do TCR não depende diretamente da deposição plasmática de C3b.']
      ],correct:0,chain:['Ativação de C3','C3b deposita-se no alvo','Reconhecimento por receptores de complemento','Fagocitose favorecida'],breakAt:1,
      clinical:{title:'Transferência: infecções por encapsulados',prompt:'Criança com infecções pneumocócicas piogênicas recorrentes, C3 praticamente indetectável e redução de CH50 e AH50. Qual mecanismo melhor explica a suscetibilidade?',choices:['Prejuízo da opsonização por C3b/iC3b','Ausência necessária de todos os linfócitos B','Incapacidade seletiva de eosinófilos liberarem grânulos'],correct:0,explanations:['A deficiência de C3 compromete a opsonização e aumenta o risco de infecções piogênicas graves, particularmente por bactérias encapsuladas.','Contagens de B podem ser preservadas em deficiência de C3.','Eosinófilos não são o principal mecanismo protetor no cenário descrito.']},
      source:'https://www.ncbi.nlm.nih.gov/books/NBK557581/'
    },
    {
      id:'cd40l',label:'CD40L',short:'A conversa interrompida',subtitle:'Cooperação Tfh–linfócito B',icon:'network',compartment:'Folículo linfoide · centro germinativo',system:'Imunidade adaptativa',
      intro:'Um linfócito B apresenta um peptídeo em MHC II a um Tfh previamente ativado. Teste o que acontece à resposta dependente de T quando o sinal CD40–CD40L é reduzido ou bloqueado.',
      variable:'Sinal coestimulatório CD40L–CD40',
      interventions:[
        {id:'partial',label:'Reduzir CD40L',detail:'Menor sinal de cooperação T–B.',title:'Sinal CD40L enfraquecido',state:'partial',description:'A ajuda T dependente de CD40 pode ficar menos eficiente; a magnitude da perda da reação de centro germinativo e da troca de classe depende da função residual e de outros sinais.',readouts:['Enfraquecida','Reduzida','Prejudicada','Possível']},
        {id:'off',label:'Bloquear CD40L',detail:'Ausência do sinal CD40L no encontro representado.',title:'CD40L bloqueado',state:'off',description:'A formação de centros germinativos e a troca de classe em respostas dependentes de T ficam gravemente comprometidas. IgM pode estar presente; não significa que todos os linfócitos B desapareceram.',readouts:['Interrompida','Muito reduzida','Gravemente prejudicada','Possível']}
      ],
      metrics:['Sinal CD40–CD40L','Reação de centro germinativo','Troca de classe dependente de T','Produção de IgM'],baseline:['Ativo','Eficiente','Possível','Possível'],
      prediction:'Qual mudança é mais diretamente esperada após perda do sinal CD40L?',options:[
        ['Desaparecimento obrigatório de todos os neutrófilos','Incorreto: CD40L não é o mecanismo geral responsável por manter a contagem de neutrófilos. Algumas imunodeficiências associadas a CD40L podem cursar com neutropenia, mas não universalmente.'],
        ['Comprometimento da troca de classe e da reação de centro germinativo','Correto: CD40L de T auxiliares liga-se a CD40 em B e atua na diferenciação e troca de isótipos em respostas dependentes de T.'],
        ['Bloqueio direto da formação do fagossomo','Incorreto: o mecanismo primário estudado é a cooperação T–B, não a internalização fagocítica.']
      ],correct:1,chain:['B reconhece antígeno','B apresenta peptídeo–MHC II','Tfh fornece CD40L','Centro germinativo e troca de classe'],breakAt:2,
      clinical:{title:'Transferência: padrão hiper-IgM',prompt:'Menino apresenta infecções recorrentes, IgG e IgA baixas, IgM normal/elevada e contagens de linfócitos B preservadas. Qual hipótese mecanística deve ser investigada?',choices:['Deficiência isolada de C9','Defeito na interação CD40L–CD40','Deficiência obrigatória de todos os anticorpos'],correct:1,explanations:['C9 prejudica a via terminal, não explica diretamente o padrão típico de troca de classe.','Deficiências de CD40L podem produzir o fenótipo hiper-IgM; são necessárias investigação imunológica e confirmação molecular.','IgM pode estar normal ou aumentada nessa condição, portanto não há ausência de todos os anticorpos.']},
      source:'https://www.ncbi.nlm.nih.gov/books/NBK1402/'
    },
    {
      id:'nox',label:'NADPH oxidase',short:'Engoliu, mas não matou',subtitle:'Fagocitose e explosão respiratória',icon:'flame',compartment:'Neutrófilo · compartimento fagossomal',system:'Imunidade inata',
      intro:'O neutrófilo reconheceu e internalizou a bactéria. Agora a investigação muda para o interior do fagossomo. O que se altera se a produção de superóxido falhar?',
      variable:'Atividade do complexo NADPH oxidase fagocitário',
      interventions:[
        {id:'partial',label:'Reduzir atividade',detail:'Defeito hipomórfico com atividade residual.',title:'Explosão respiratória reduzida',state:'partial',description:'A produção oxidativa diminui e a eficiência microbicida pode ficar prejudicada. A ingestão do patógeno pode permanecer possível; o fenótipo depende de atividade residual e do microrganismo.',readouts:['Preservada','Reduzida','Possivelmente diminuída','Reduzida']},
        {id:'off',label:'Desativar oxidase',detail:'Defeito completo no mecanismo representado.',title:'NADPH oxidase inativa',state:'off',description:'Reconhecimento e internalização podem ocorrer, mas a produção normal de superóxido pela oxidase falha. A destruição de vários microrganismos fica menos eficaz; vias microbicidas não oxidativas não desaparecem.',readouts:['Preservada','Ausente pelo complexo','Prejudicada','Muito reduzida']}
      ],
      metrics:['Internalização por fagocitose','Produção de superóxido','Atividade microbicida oxidativa','Sinal funcional DHR'],baseline:['Possível','Funcional','Funcional','Adequado'],
      prediction:'Qual etapa pode estar preservada mesmo com defeito da NADPH oxidase?',options:[
        ['Ativação normal do burst oxidativo','Incorreto: a oxidase é central à geração de superóxido; o burst está justamente comprometido.'],
        ['Produção de C3 por todos os linfócitos T','Incorreto: a questão é a maquinaria intracelular do fagócito.'],
        ['Reconhecimento e internalização do microrganismo','Correto: fagocitose e capacidade de destruição intracelular são etapas relacionadas, mas distintas.']
      ],correct:2,chain:['Reconhecimento / opsonização','Englobamento e fagossomo','NADPH oxidase produz superóxido','Destruição oxidativa'],breakAt:2,
      clinical:{title:'Transferência: doença granulomatosa crônica',prompt:'Criança com abscessos bacterianos, infecções por Aspergillus e neutrófilos numericamente normais. Qual exame funcional é mais informativo?',choices:['Citometria com teste de di-hidrorrodamina (DHR)','Anti-HBs isolado','Contagem de eosinófilos exclusivamente'],correct:0,explanations:['DHR avalia a função oxidativa dos neutrófilos estimulados e é um teste inicial para DGC clássica; determinadas variantes podem exigir investigação complementar.','Anti-HBs avalia resposta imune contra antígeno de superfície do HBV.','Contagem de eosinófilos não avalia diretamente a NADPH oxidase dos neutrófilos.']},
      source:'https://www.ncbi.nlm.nih.gov/books/NBK99496/'
    },
    {
      id:'epitope',label:'Epítopo',short:'Uma mudança no alvo',subtitle:'Especificidade epítopo–parátopo',icon:'puzzle',compartment:'Superfície de patógeno · anticorpo',system:'Reconhecimento molecular',
      intro:'Um anticorpo monoclonal reconhece uma região conformacional exposta de uma proteína de superfície. Altere esse epítopo específico e observe se o parátopo ainda se liga.',
      variable:'Integridade do epítopo reconhecido pelo anticorpo selecionado',
      interventions:[
        {id:'partial',label:'Alterar afinidade',detail:'Mutação que reduz a complementaridade específica.',title:'Afinidade reduzida',state:'partial',description:'Uma alteração no epítopo pode diminuir a afinidade de um determinado anticorpo. Outros anticorpos direcionados a epítopos diferentes podem permanecer funcionais.',readouts:['Reduzida','Possivelmente reduzida','Não determinado','Possível']},
        {id:'off',label:'Eliminar ligação',detail:'Mutação idealizada que impede esse anticorpo específico.',title:'Epítopo não reconhecido',state:'off',description:'O anticorpo escolhido não se liga de modo eficaz ao epítopo alterado. Isso não prova escape de toda a resposta policlonal nem elimina automaticamente a apresentação por MHC.',readouts:['Não detectável para este par','Comprometida para este anticorpo','Não determinado','Possível']}
      ],
      metrics:['Ligação deste parátopo','Neutralização por este anticorpo','Reconhecimento por outros clones','Apresentação de outros peptídeos'],baseline:['Compatível','Potencial','Pode ocorrer','Pode ocorrer'],
      prediction:'Qual é a conclusão mais rigorosa quando se perde a ligação deste anticorpo?',options:[
        ['Todos os linfócitos T perdem obrigatoriamente a capacidade de reconhecer o patógeno','Incorreto: BCR/anticorpos e TCR convencionais reconhecem antígenos de maneiras distintas; um epítopo alterado não extingue todas as respostas T.'],
        ['Pode existir escape ao anticorpo específico, sem provar escape completo à imunidade','Correto: especificidade molecular não equivale a ausência universal de reconhecimento por outros anticorpos ou células T.'],
        ['A molécula C3 torna-se geneticamente ausente','Incorreto: uma alteração no epítopo não causa, por si só, deficiência de C3.']
      ],correct:1,chain:['Epítopo exposto','Parátopo complementar','Ligação anticorpo–antígeno','Função efetora possível'],breakAt:1,
      clinical:{title:'Transferência: reconhecimento cruzado',prompt:'Uma variante altera um epítopo de superfície e deixa de ser neutralizada por um anticorpo monoclonal. Qual inferência é válida?',choices:['A vacinação anterior nunca produziu memória','Pode ocorrer perda de reconhecimento por esse anticorpo, sem excluir outros epítopos e clones','A mutação desliga universalmente o MHC I'],correct:1,explanations:['A perda de ligação de um clone não demonstra ausência de memória prévia.','A resposta policlonal pode reconhecer vários epítopos e manter algum nível de proteção.','A expressão de MHC I não depende universalmente desse epítopo de superfície.']},
      source:'https://pmc.ncbi.nlm.nih.gov/articles/PMC3792396/'
    },
    {
      id:'car',label:'CD3ζ',short:'O CAR-T sem resposta',subtitle:'Reconhecimento × sinalização celular',icon:'circuit-board',compartment:'Sinapse CAR-T · célula-alvo CD19⁺',system:'Imunoterapia celular',
      intro:'Uma célula CAR-T anti-CD19 encontra uma célula-alvo que expressa CD19. Preserve o scFv e altere especificamente a sinalização intracelular por CD3ζ.',
      variable:'Integridade dos motivos sinalizadores do CD3ζ no CAR',
      interventions:[
        {id:'partial',label:'Atenuar sinal',detail:'Sinalização de CD3ζ reduzida no modelo.',title:'Sinalização atenuada',state:'partial',description:'A ligação ao antígeno pode permanecer preservada, mas a amplitude de ativação, degranulação e citotoxicidade dependentes daquele CAR pode diminuir.',readouts:['Preservada','Reduzida','Possivelmente reduzida','Não excluída']},
        {id:'off',label:'Interromper CD3ζ',detail:'Ausência de sinal ativador funcional pelo CAR.',title:'CAR sem sinal de CD3ζ',state:'off',description:'O scFv pode continuar reconhecendo CD19, mas o CAR perde sua sinalização ativadora essencial. Não significa desligar todas as funções da célula T por outros receptores, incluindo seu TCR endógeno.',readouts:['Preservada','Comprometida pelo CAR','Comprometida pelo CAR','Pode persistir via TCR']}
      ],
      metrics:['Ligação scFv–CD19','Sinalização via CAR','Citotoxicidade via CAR','Sinalização por TCR endógeno'],baseline:['Compatível','Funcional','Possível','Independente do CAR'],
      prediction:'Qual dissociação funcional é esperada ao interromper CD3ζ, preservando o scFv?',options:[
        ['A célula perde obrigatoriamente toda a expressão de CD19','Incorreto: CD19 é o antígeno na célula-alvo; não é determinado pela sinalização intracelular da CAR-T.'],
        ['O complexo C3bBb torna-se o único mecanismo de ativação T','Incorreto: C3bBb é uma convertase da via alternativa do complemento.'],
        ['Reconhecimento do alvo pode permanecer, mas a ativação por esse CAR é prejudicada','Correto: ligação do antígeno e transdução de sinal são etapas distintas de funcionamento do CAR.']
      ],correct:2,chain:['scFv reconhece CD19','Sinapse com célula-alvo','CD3ζ transmite sinal pelo CAR','Citotoxicidade mediada pelo CAR'],breakAt:2,
      clinical:{title:'Transferência: falha funcional da CAR-T',prompt:'CAR-T anti-CD19 mantém expressão de scFv e liga CD19, porém o domínio CD3ζ do receptor foi inativado no modelo. Qual resultado é mais plausível?',choices:['Ativação e degranulação induzidas pelo CAR comprometidas','Conversão espontânea do linfócito T em plasmócito','Eliminação automática de todas as funções do TCR nativo'],correct:0,explanations:['O sinal via CD3ζ é fundamental para a ativação mediada pelo CAR convencional.','O CAR não transforma uma célula T em uma célula produtora de imunoglobulinas.','A perda do sinal do CAR não implica necessariamente perda de funções do TCR endógeno.']},
      source:'https://pmc.ncbi.nlm.nih.gov/articles/PMC7314561/'
    }
  ];
  const initialIndex=Math.max(0,experiments.findIndex(x=>x.id===initialStation));
  const ui={station:initialIndex,intervention:'off',prediction:null,ran:false,clinicalChoice:null,clinicalCorrect:false,lastWrong:false};
  let ledger={claimed:{},runs:[],complete:{}};
  try {const existing=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null'); if(existing&&typeof existing==='object')ledger={claimed:existing.claimed||{},runs:Array.isArray(existing.runs)?existing.runs:[],complete:existing.complete||{}};}catch(e){/* armazenamento desabilitado */}
  const el=(selector)=>document.querySelector(selector);
  function persist(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(ledger));}catch(e){}}
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function setXP(points,key){if(ledger.claimed[key]!==undefined)return 0;ledger.claimed[key]=points;persist();onEarn(points, key);return points;}
  function totalLabXP(){return Object.values(ledger.claimed).reduce((a,b)=>a+(Number(b)||0),0);}
  function chooseStation(index){ui.station=index;ui.intervention='off';ui.prediction=null;ui.ran=false;ui.clinicalChoice=null;ui.clinicalCorrect=false;ui.lastWrong=false;draw();}
  function current(){return experiments[ui.station];}
  function variant(){return current().interventions.find(v=>v.id===ui.intervention);}
  function renderStations(){el('#lab-stations').innerHTML=experiments.map((x,i)=>`<button type="button" class="lab-station ${i===ui.station?'active':''}" data-lab-station="${i}" aria-pressed="${i===ui.station}"><span class="lab-station-top"><span>ESTAÇÃO 0${i+1}</span><i data-lucide="${x.icon}" width="17"></i></span><span class="st-name">${esc(x.label)}</span><span class="st-sub">${esc(x.short)}</span><span class="st-done">${ledger.complete[x.id]?'✓ Competência concluída':x.system}</span></button>`).join('');
    el('#lab-progress-chip').textContent=`${Object.keys(ledger.complete).filter(k=>ledger.complete[k]).length}/5 concluídos`;
    el('#lab-stations').querySelectorAll('[data-lab-station]').forEach(b=>b.addEventListener('click',()=>chooseStation(Number(b.dataset.labStation))));
  }
  function statusClass(v){return /ausente|comprometid|interrompid|muito reduzid|não detectável/i.test(v)?'danger':/reduzid|menor|enfraquecid|possivelmente|prejudicad|não determinado/i.test(v)?'warn':'ok';}
  function readout(e,v){return `<div class="lab-readout-labels"><span>Mecanismo</span><span>Controle</span><span>Intervenção</span></div>`+e.metrics.map((label,i)=>`<div class="lab-readout"><strong>${esc(label)}</strong><span class="lab-pill ok">${esc(e.baseline[i])}</span><span class="lab-pill ${statusClass(v.readouts[i])}">${esc(v.readouts[i])}</span></div>`).join('');}
  function draw(){
    renderStations();
    const e=current(),v=variant();
    el('#lab-workspace').innerHTML=`<div class="lab-core"><div class="lab-core-inner">
      <div class="lab-core-head"><div><span class="lab-phase"><i data-lucide="flask-conical" width="15"></i> Estação ${String(ui.station+1).padStart(2,'0')} / 05 · ${esc(e.system)}</span><h2>${esc(e.short)}</h2><p>${esc(e.intro)}</p></div><span class="lab-molecule-chip">${esc(e.label)}</span></div>
      <div class="lab-divider"></div>
      <div class="lab-step-title"><span class="lab-step-index">1</span><h3>Altere uma variável molecular</h3></div><p class="lab-step-lead">Variável independente: <strong>${esc(e.variable)}</strong>. O controle permanece inalterado.</p>
      <div class="lab-interventions">${e.interventions.map(it=>`<button type="button" class="lab-intervention ${ui.intervention===it.id?'active':''}" data-intervention="${it.id}" aria-pressed="${ui.intervention===it.id}"><span class="radio-dot"></span><span><strong>${esc(it.label)}</strong><span class="note">${esc(it.detail)}</span></span></button>`).join('')}</div>
      <div class="lab-divider"></div>
      <div class="lab-step-title"><span class="lab-step-index">2</span><h3>Preveja antes de executar</h3></div><p class="lab-step-lead">${esc(e.prediction)}</p>
      <div class="lab-choice-list" role="radiogroup" aria-label="Previsão do resultado">${e.options.map((o,i)=>`<label class="lab-choice"><input type="radio" name="lab-prediction" value="${i}" ${ui.prediction===i?'checked':''} ${ui.ran?'disabled':''}><span>${esc(o[0])}</span></label>`).join('')}</div>
      <div class="lab-action-bar"><span class="lab-small">Um fator de cada vez · Compare com controle</span><button type="button" class="btn primary" id="lab-run" ${ui.prediction===null||ui.ran?'disabled':''}><i data-lucide="play" width="17"></i> Executar experimento →</button></div>
      ${ui.ran?renderResult(e,v):''}
      </div></div>
      <aside class="lab-side-stack"><div class="lab-aside-card"><div class="eyebrow">Perfil de pesquisa</div><h3>Seu progresso</h3><div class="lab-side-stat">${totalLabXP()} XP</div><p>O XP mede participação e raciocínio na bancada. Não representa avaliação acadêmica.</p><div class="lab-side-progress"><i style="width:${Math.min(100,Object.keys(ledger.complete).filter(k=>ledger.complete[k]).length/5*100)}%"></i></div><p style="margin-top:8px">${Object.keys(ledger.complete).filter(k=>ledger.complete[k]).length} de 5 competências concluídas</p></div><div class="lab-aside-card"><h3>Protocolo de investigação</h3><ol><li>Selecione a intervenção.</li><li>Registre sua hipótese causal.</li><li>Execute e compare os resultados.</li><li>Explique o elo funcional comprometido.</li><li>Resolva um caso clínico inédito.</li></ol></div><div class="lab-aside-card"><h3>Pergunta central</h3><p><strong>O que se mantém funcionando apesar da falha?</strong> Diferenciar etapas preservadas e interrompidas vale mais do que decorar o nome da molécula.</p></div></aside>`;
    const workspace=el('#lab-workspace');
    workspace.querySelectorAll('[data-intervention]').forEach(b=>b.addEventListener('click',()=>{ui.intervention=b.dataset.intervention;ui.prediction=null;ui.ran=false;ui.clinicalChoice=null;ui.clinicalCorrect=false;ui.lastWrong=false;draw();}));
    workspace.querySelectorAll('[name="lab-prediction"]').forEach(r=>r.addEventListener('change',()=>{ui.prediction=Number(r.value);const button=el('#lab-run');if(button)button.disabled=false;}));
    workspace.querySelector('#lab-run').addEventListener('click',run);
    if(ui.ran){workspace.querySelectorAll('[name="lab-clinical"]').forEach(r=>r.addEventListener('change',()=>{ui.clinicalChoice=Number(r.value);el('#lab-check-clinical').disabled=false;}));workspace.querySelector('#lab-check-clinical')?.addEventListener('click',submitClinical);workspace.querySelector('#lab-repeat')?.addEventListener('click',()=>{ui.prediction=null;ui.ran=false;ui.clinicalChoice=null;ui.clinicalCorrect=false;ui.lastWrong=false;draw();});workspace.querySelector('#lab-next')?.addEventListener('click',()=>chooseStation((ui.station+1)%experiments.length));}
    // SVG nativo; ícones textuais funcionam sem bibliotecas adicionais.
  }
  function run(){if(ui.ran||ui.prediction===null)return;ui.ran=true;const e=current(),v=variant();const correct=ui.prediction===e.correct;const firstKey=`predict:${e.id}:${v.id}`;setXP(correct?80:20,firstKey);ledger.runs.push({experiment:e.id,intervention:v.id,correct,at:new Date().toISOString()});if(ledger.runs.length>70)ledger.runs=ledger.runs.slice(-70);persist();draw();el('#lab-output').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}
  function renderResult(e,v){const predictionOK=ui.prediction===e.correct;const c=e.clinical;const quizKey=`clinical:${e.id}`;
    return `<section class="lab-result" id="lab-output" aria-label="Resultados do experimento"><span class="lab-result-kicker">03 · Resultado da simulação</span><h3>Controle × ${esc(v.title)}</h3><p class="lab-step-lead">Você modificou somente <strong>${esc(e.variable)}</strong>. Observe quais funções se alteraram e quais podem permanecer ativas.</p>
    <div class="lab-compare"><div class="lab-compare-panel"><div class="lab-compare-heading"><span>Controle</span><span>Sem intervenção</span></div>${makeScene(e.id,'control')}</div><div class="lab-compare-panel after"><div class="lab-compare-heading"><span>Intervenção</span><span>${esc(v.title)}</span></div>${makeScene(e.id,v.state)}</div></div>
    <div class="lab-readouts"><div class="lab-step-title"><span class="lab-step-index">4</span><h3>Compare os desfechos qualitativos</h3></div>${readout(e,v)}</div>
    <div class="lab-explanation"><h4>${predictionOK?'✓ Previsão mecanisticamente consistente':'↗ Revise sua previsão'}</h4><p>${esc(v.description)}</p></div>
    <div class="lab-why"><details><summary>Por que cada alternativa está certa ou errada?</summary>${e.options.map((o,i)=>`<p><strong>${i===e.correct?'✓':'✕'} ${esc(o[0])}:</strong> ${esc(o[1])}</p>`).join('')}</details><details><summary>Qual ligação da cadeia causal foi comprometida?</summary><p>${e.chain.map((s,i)=>`${i===e.breakAt?'→ [PONTO CRÍTICO] ':i?' → ':''}${esc(s)}`).join('')}</p></details></div>
    <section class="lab-transfer" id="lab-transfer-anchor" aria-label="Desafio de transferência clínica"><div class="lab-transfer-head"><i data-lucide="stethoscope" width="17"></i> 05 · Transferência clínica</div><h3>${esc(c.title)}</h3><p>${esc(c.prompt)}</p><div class="lab-choice-list" role="radiogroup" aria-label="Selecione a interpretação clínica">${c.choices.map((answer,i)=>`<label class="lab-choice"><input type="radio" name="lab-clinical" value="${i}" ${ui.clinicalChoice===i?'checked':''} ${ui.clinicalCorrect?'disabled':''}><span>${esc(answer)}</span></label>`).join('')}</div><div class="lab-action-bar"><span class="lab-small">Bônus por interpretação de um caso clínico</span><button type="button" class="btn primary" id="lab-check-clinical" ${ui.clinicalChoice===null||ui.clinicalCorrect?'disabled':''}>Verificar interpretação →</button></div>${ui.clinicalChoice!==null&&ui.clinicalCorrect?`<div class="lab-clinical-feedback"><strong>✓ Mecanismo confirmado</strong><p>${esc(c.explanations[c.correct])}</p><details class="lab-clinical-details"><summary>Por que as outras opções estão incorretas?</summary>${c.explanations.map((txt,i)=>i!==c.correct?`<p><b>Alternativa ${i+1}:</b> ${esc(txt)}</p>`:'').join('')}</details>${ledger.complete[e.id]?'<p class="lab-status" style="margin-top:9px">Conquista: Investigador Causal</p>':''}</div>`:ui.lastWrong&&ui.clinicalChoice!==null?`<div class="lab-clinical-feedback"><strong>Essa interpretação não explica o mecanismo.</strong><p>${esc(c.explanations[ui.clinicalChoice])}</p><p style="margin-top:5px">Reavalie os resultados e tente novamente.</p></div>`:''}</section>
    <div class="lab-end-actions"><button type="button" class="btn secondary" id="lab-repeat"><i data-lucide="rotate-ccw" width="17"></i> Testar outra condição</button><button type="button" class="btn secondary" id="lab-next">Próxima estação <i data-lucide="arrow-right" width="17"></i></button></div>
    <p class="lab-small" style="margin-top:14px">Fonte científica: <a href="${esc(e.source)}" target="_blank" rel="noopener noreferrer">consultar referência ↗</a>. Resultados esquemáticos, não probabilidades ou valores laboratoriais medidos.</p></section>`;
  }
  function submitClinical(){const e=current();if(ui.clinicalChoice===null||ui.clinicalCorrect)return;const correct=ui.clinicalChoice===e.clinical.correct;if(correct){ui.clinicalCorrect=true;setXP(ui.lastWrong?30:70,`clinical:${e.id}`);ledger.complete[e.id]=true;persist();draw();el('#lab-transfer-anchor')?.scrollIntoView({behavior:'smooth',block:'nearest'});}else{ui.lastWrong=true;const p=el('#lab-output');p?.querySelectorAll('[name="lab-clinical"]').forEach(x=>{x.checked=false;});const feedback=document.createElement('div');feedback.className='lab-clinical-feedback';feedback.innerHTML=`<strong>Hipótese não sustentada</strong><p>${esc(e.clinical.explanations[ui.clinicalChoice])}</p><p>Escolha outra alternativa e reavalie a cadeia causal.</p>`;const existing=p.querySelector('.lab-clinical-feedback');if(existing)existing.remove();p.querySelector('.lab-transfer').appendChild(feedback);ui.clinicalChoice=null;el('#lab-check-clinical').disabled=true;}
  }
  function label(x,y,s,col='#98bcb7',size=13){return `<text x="${x}" y="${y}" text-anchor="middle" fill="${col}" font-weight="600" font-size="${size}">${esc(s)}</text>`;}
  function particles(cx,cy,n,r=56,color='#e4b266') {return Array.from({length:n},(_,i)=>{const a=2*Math.PI*i/n;return `<circle cx="${(cx+r*Math.cos(a)).toFixed(2)}" cy="${(cy+r*Math.sin(a)).toFixed(2)}" r="5" fill="${color}" stroke="#8d6b31" stroke-width="1.3"/>`;}).join('');}
  function antibody(cx,cy,opacity=1){return `<g opacity="${opacity}" stroke="#83c4e4" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M${cx} ${cy+33}V${cy-6}L${cx-24} ${cy-33}M${cx} ${cy-6}L${cx+24} ${cy-33}"/></g>`;}
  function makeScene(id,condition){const off=condition==='off',partial=condition==='partial',active=!off;let body='';
    if(id==='c3'){
      const n=off?0:partial?4:11;
      body=`<path d="M50 110C20 160 60 229 142 232C226 233 238 161 205 110C179 65 86 66 50 110Z" fill="#be7865" stroke="#e2a08b" stroke-width="4"/><g stroke="#f6d4af" stroke-width="4">${Array.from({length:8},(_,i)=>{let a=i*Math.PI/4;let x=129+48*Math.cos(a),y=154+48*Math.sin(a);return `<path d="M${x} ${y}l${Math.cos(a)*11} ${Math.sin(a)*11}"/>`;}).join('')}</g><ellipse cx="375" cy="153" rx="93" ry="78" fill="#5a9fba" fill-opacity=".64" stroke="#82c9dc" stroke-width="3"/><path d="M340 110 Q380 82 404 119 Q447 130 419 159 Q436 205 393 211 Q340 223 325 182 Q294 152 340 110" fill="#405d91" opacity=".8"/>${particles(129,154,n,69)}<path d="M240 154L278 154" stroke="${active?'#64c4b3':'#a0a9af'}" stroke-width="3" stroke-dasharray="${active?'0':'5 6'}"/><path d="M269 149l9 5-9 5" fill="none" stroke="#64c4b3" stroke-width="2"/>${label(129,265,'Bactéria encapsulada')}${label(375,265,'Fagócito')}${label(255,112,off?'Sem C3b':partial?'Menos C3b':'C3b depositado','#e8cc93')}`;
    }else if(id==='cd40l'){
      body=`<circle cx="149" cy="158" r="79" fill="#397d89" stroke="#73c4c9" stroke-width="3"/><circle cx="149" cy="158" r="40" fill="#1d525f"/><circle cx="375" cy="158" r="79" fill="#9c658a" stroke="#ce97b8" stroke-width="3"/><circle cx="375" cy="158" r="41" fill="#6b3c6a"/><path d="M226 157h${off?'21':'70'}" stroke="${off?'#cc7c7c':partial?'#d6ba74':'#62c3b5'}" stroke-width="${off?3:6}" stroke-dasharray="${off?'6 8':'0'}"/><circle cx="234" cy="157" r="9" fill="#7dd0ba"/><rect x="285" y="147" width="15" height="20" rx="5" fill="${off?'#6c6d73':'#7dd0ba'}"/>${off?'<path d="M247 143l25 29m0-29l-25 29" stroke="#ed8a8a" stroke-width="5"/>':''}${label(149,263,'Tfh (CD4⁺)')}${label(375,263,'Linfócito B')}${label(259,117,off?'CD40L ausente':partial?'Sinal menor':'CD40L–CD40','#e7cf96')}`;
    }else if(id==='nox'){
      const n=off?0:partial?5:15;
      body=`<ellipse cx="258" cy="152" rx="152" ry="109" fill="#488e9e" fill-opacity=".45" stroke="#7ac8ca" stroke-width="4"/><path d="M172 118Q183 69 242 92Q281 55 307 105Q363 116 338 157Q360 198 315 215Q273 248 237 204Q170 219 154 164Q145 138 172 118" fill="#36598a"/><ellipse cx="254" cy="157" rx="50" ry="43" fill="#1b343d" stroke="#b5d4cb" stroke-width="3"/><ellipse cx="254" cy="157" rx="27" ry="24" fill="#bd806f"/>${particles(254,157,n,61,'#e9be65')}${label(260,278,off?'Sem superóxido':partial?'Produção reduzida de ROS':'Explosão respiratória','#e8ce90')}${label(260,33,'Fagossomo dentro do neutrófilo','#98c8c8')}`;
    }else if(id==='epitope'){
      body=`<circle cx="152" cy="155" r="75" fill="#805774" stroke="#ca97bb" stroke-width="4"/>${Array.from({length:9},(_,i)=>{const a=2*Math.PI*i/9;return `<circle cx="${152+64*Math.cos(a)}" cy="${155+64*Math.sin(a)}" r="9" fill="#c58aa7"/>`;}).join('')}<path d="M204 103l14-9 12 14-6 14-17-2Z" fill="${off?'#cb7676':partial?'#d7b26e':'#63c6ae'}" stroke="#d9e3e0" stroke-width="2"/>${antibody(318,166,1)}<path d="M224 109Q254 78 288 117" stroke="${off?'#db8989':partial?'#e0b861':'#6ad3b8'}" stroke-width="4" fill="none" stroke-dasharray="${off?'7 9':'0'}"/>${off?'<path d="M248 98l22 25m0-25l-22 25" stroke="#f28d8d" stroke-width="4"/>':''}${label(148,268,'Antígeno de superfície')}${label(330,268,'Anticorpo específico')}${label(257,47,off?'Sem encaixe':partial?'Menor afinidade':'Epítopo–parátopo','#e6d5a8')}`;
    }else{
      body=`<ellipse cx="142" cy="160" rx="85" ry="81" fill="#3e899a" stroke="#79d1d5" stroke-width="3"/><circle cx="142" cy="160" r="43" fill="#28515d"/><ellipse cx="381" cy="160" rx="88" ry="82" fill="#94556c" stroke="#db91a1" stroke-width="3"/><circle cx="381" cy="160" r="40" fill="#6c334e"/>${antibody(239,151,.92)}<path d="M275 150h36" stroke="#65c8b4" stroke-width="3"/><g>${Array.from({length:off?0:partial?3:8},(_,i)=>{let y=85+i*17;return `<path d="M166 ${y}l${partial?10:19} -4" stroke="#e8bd66" stroke-width="3" class="lab-signal"/>`;}).join('')}</g>${off?'<path d="M184 117l30 30m0-30l-30 30" stroke="#ec9292" stroke-width="4"/>':''}${label(140,268,'Linfócito CAR-T')}${label(382,268,'Célula CD19⁺')}${label(259,47,off?'CD3ζ sem sinal':partial?'Sinal reduzido':'Sinalização via CD3ζ','#e8d0a1')}`;
    }
    return `<svg class="lab-scene" role="img" aria-label="Esquema qualitativo de ${esc(id)} na condição ${esc(condition)}" viewBox="0 0 520 290" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="${id}-${condition}-glow"><stop stop-color="#2e6866" stop-opacity=".32"/><stop offset="1" stop-color="#152527" stop-opacity="0"/></radialGradient></defs><circle cx="260" cy="150" r="148" fill="url(#${id}-${condition}-glow)"/>${body}</svg>`;
  }
  function init(){
    const workspace=el('#lab-workspace');if(!workspace)return;

    // O XP desta bancada também é incorporado ao perfil geral via onEarn().
    draw();
  }
  init();
}

