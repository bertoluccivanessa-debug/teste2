import {EXTRA_WORLDS, EXTRA_CASES, EXTRA_GLOSSARY} from './addons.js';
import {INCIDENT_CASES, INCIDENT_GLOSSARY} from './incidents.js';
// IMMUNOVERSE v2 — casos fictícios. Objetivos educacionais, não protocolos de assistência.
const CORE_WORLDS = [
 {id:'sentinelas',number:'01',title:'Cidade das Sentinelas',short:'Imunidade inata',emoji:'🛡️',mascot:'Maco, o Macrófago',tagline:'Detectar não é o mesmo que destruir.',color:'#61e8d3',description:'Barreiras, receptores de reconhecimento, fagocitose e maquinaria microbicida.'},
 {id:'complemento',number:'02',title:'Cascata Cósmica',short:'Complemento & inflamação',emoji:'💥',mascot:'C3, o Cometa',tagline:'Um sinal pode amplificar toda a defesa.',color:'#f8b76b',description:'Opsonização, quimiotaxia, inflamação e lise por complexo de ataque à membrana.'},
 {id:'adaptativa',number:'03',title:'Academia das Células T',short:'Apresentação & linfócitos',emoji:'🧬',mascot:'Dendi, a Dendrítica',tagline:'A resposta depende do contexto da apresentação.',color:'#b5a3ff',description:'MHC I/II, CD4+, CD8+, coestimulação e coordenação das respostas.'},
 {id:'anticorpos',number:'04',title:'Fábrica de Anticorpos',short:'Antígenos & imunoglobulinas',emoji:'🧪',mascot:'Bibi, a Célula B',tagline:'Reconhecer, neutralizar e marcar são funções distintas.',color:'#ff9fbd',description:'Epítopos, especificidade, isotipos, neutralização e cooperação T–B.'},
 {id:'memoria',number:'05',title:'Jardim da Memória',short:'Vacinas & regulação',emoji:'🌱',mascot:'Memo, a Célula de Memória',tagline:'Aprender biologicamente é responder melhor depois.',color:'#b8e87c',description:'Resposta primária/secundária, tolerância, alergia e imunopatologia.'},
 {id:'cart',number:'06',title:'Estação CAR-T',short:'Imunoterapia translacional',emoji:'🚀',mascot:'Tiko, o Linfócito CAR-T',tagline:'A engenharia redireciona o reconhecimento celular.',color:'#92cbff',description:'Receptores quiméricos, alvos CD19, escape tumoral e toxicidades imunes.'}
];
const E=(label,detail,mechanism)=>({id:label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-'),label,detail,mechanism});
const M=(id,label,detail)=>({id,label,detail});
const O=(label,correct,why)=>({label,correct,why});
const CORE_CASES = [
 {
 id:'sent-01',world:'sentinelas',title:'O invasor que não morreu',difficulty:1,minutes:7,
 patient:'Theo, 8 anos',context:'Infecções bacterianas e fúngicas invasivas recorrentes. Neutrófilos chegam ao foco infeccioso e conseguem fagocitar os microrganismos.',
 indicators:['Fagocitose preservada','Explosão respiratória reduzida','Infecções recorrentes'],
 evidence:[E('Microrganismo internalizado','Microscopia revela patógenos dentro de fagócitos.','ingestao'),E('ROS muito baixos','Ensaio funcional sugere baixa produção de espécies reativas de oxigênio após estímulo.','morte'),E('Recrutamento preservado','Neutrófilos atingem o tecido inflamado.','quimiotaxia')],
 mechanisms:[M('ingestao','Fagocitose','Englobamento do microrganismo em um fagossomo.'),M('morte','Defeito microbicida','A internalização não garante morte; o burst oxidativo depende da NADPH oxidase.'),M('quimiotaxia','Quimiotaxia','Migração orientada por gradientes quimiotáticos.')],
 pathway:['Reconhecimento do patógeno','Internalização em fagossomo','Fusão e ativação do compartimento microbicida','Destruição intracelular'],
 pathwayWhy:'A falha pode ocorrer depois do reconhecimento e da ingestão. Em doença granulomatosa crônica, defeitos no complexo NADPH oxidase prejudicam a produção de ROS.',
 decision:{q:'Qual mecanismo é o candidato mais coerente para investigar?',options:[O('Defeito na NADPH oxidase',true,'O burst respiratório reduzido, com fagocitose preservada, direciona para a maquinaria microbicida.'),O('Ausência completa de receptores de antígeno',false,'O agente foi internalizado; há reconhecimento e captura.'),O('Produção excessiva de IgE',false,'Não explica diretamente o fenótipo funcional do neutrófilo.'),O('Falha exclusiva de migração neutrofílica',false,'O recrutamento foi descrito como preservado.')]},
 transfer:{q:'Se houver C3b depositado na superfície bacteriana, isso prova eliminação do patógeno?',options:[O('Não. Opsonização favorece reconhecimento, mas a morte intracelular pode falhar.',true,'C3b aumenta a captura por fagócitos; a etapa microbicida é distinta.'),O('Sim, C3b sempre promove lise direta.',false,'Opsonização por C3b não é sinônimo de lise pelo MAC.'),O('Sim, anticorpos e C3b corrigem qualquer falha de ROS.',false,'Eles não restauram automaticamente a atividade da NADPH oxidase.')]},
 teaching:'Reconhecer → ingerir → matar: etapas causais distintas.',concepts:['Fagocitose','NADPH oxidase','Opsonização']
 },
 {
 id:'sent-02',world:'sentinelas',title:'O alarme da muralha',difficulty:1,minutes:6,
 patient:'Lia, 22 anos',context:'Uma infecção localizada desencadeia rápida resposta inflamatória antes da expansão clonal de linfócitos específicos.',
 indicators:['Resposta em horas','Liberação de mediadores','Padrões microbianos detectados'],
 evidence:[E('Padrões conservados','Componentes microbianos são reconhecidos por receptores de reconhecimento de padrões.','prr'),E('Citocinas iniciais','Células sentinelas liberam IL-1, TNF e outros mediadores de inflamação.','alarme'),E('Infiltrado neutrofílico','Neutrófilos deixam a circulação e migram para o foco.','recrutamento')],
 mechanisms:[M('prr','Reconhecimento inato','PRRs detectam PAMPs e sinais de dano.'),M('alarme','Sinalização inflamatória','Mediadores alteram endotélio e recrutam efetores.'),M('recrutamento','Extravasamento','Adesão e migração de células para o tecido.')],
 pathway:['Detecção por PRR','Ativação da célula sentinela','Produção de mediadores','Recrutamento celular'],pathwayWhy:'A detecção inata precede a cascata de mediadores e o recrutamento de leucócitos.',
 decision:{q:'O que distingue essa resposta inicial da adaptativa?',options:[O('Reconhecimento rápido por receptores codificados na linhagem germinativa',true,'PRRs detectam padrões compartilhados sem expansão clonal antígeno-específica prévia.'),O('Necessidade de seleção clonal antes de qualquer sinal',false,'A resposta inata não depende da expansão clonal inicial.'),O('Produção obrigatória de anticorpos de alta afinidade em minutos',false,'A maturação de afinidade envolve resposta adaptativa e tempo.'),O('Ausência de comunicação com os linfócitos',false,'A imunidade inata condiciona a resposta adaptativa.')]},
 transfer:{q:'Bloquear o recrutamento neutrofílico significa que o patógeno não foi reconhecido?',options:[O('Não. Reconhecimento e recrutamento são etapas separáveis.',true,'PRRs podem sinalizar apesar de um defeito no tráfego celular.'),O('Sim. Não há reconhecimento sem neutrófilo no tecido.',false,'Diversas células sentinelas reconhecem padrões antes da chegada dos neutrófilos.'),O('Sim, todo PRR está apenas no neutrófilo.',false,'PRRs são expressos por múltiplas populações celulares.')]},
 teaching:'A defesa inicia com detecção de padrões, não com anticorpos pré-formados.',concepts:['PRR','PAMP','Citocinas']
 },
 {
 id:'comp-01',world:'complemento',title:'A bactéria de armadura',difficulty:2,minutes:8,
 patient:'Clara, 4 anos',context:'Infecções por pneumococo. A cápsula polissacarídica da bactéria dificulta a remoção por fagócitos quando falta opsonização eficiente.',
 indicators:['Cápsula espessa','Deposição de C3b variável','Fagocitose dependente de opsoninas'],
 evidence:[E('C3b na superfície','Fragmentos de C3 se ligam à bactéria e facilitam captura.','opsonizacao'),E('Cápsula bacteriana','A cápsula interfere com fagocitose direta e torna opsonização importante.','evasao'),E('C5a no tecido','Anáfilatoxina contribui para ativação e recrutamento de leucócitos.','inflamacao')],
 mechanisms:[M('opsonizacao','Opsonização','C3b marca a superfície para receptores em fagócitos.'),M('evasao','Evasão pela cápsula','A cápsula dificulta o acesso e a fagocitose.'),M('inflamacao','Quimiotaxia por C5a','C5a amplifica a resposta inflamatória.')],
 pathway:['Ativação do complemento','Clivagem de C3','Deposição de C3b','Fagocitose facilitada'],pathwayWhy:'Opsonização favorece ingestão, mas não substitui todas as etapas efetoras.',
 decision:{q:'Qual é a principal contribuição do C3b neste cenário?',options:[O('Opsonizar a bactéria para aumentar a fagocitose',true,'C3b é uma opsonina central na resposta a bactérias encapsuladas.'),O('Reconhecer peptídeos no MHC I',false,'MHC I é componente da apresentação antigênica a T CD8+.'),O('Produzir IgA por conta própria',false,'C3b é fragmento proteico do complemento, não célula B.'),O('Garantir morte intracelular mesmo com oxidase defeituosa',false,'A função microbicida pode continuar comprometida.')]},
 transfer:{q:'Qual afirmação sobre Streptococcus pneumoniae é mais adequada?',options:[O('A cápsula favorece evasão, e opsonização é importante para removê-lo.',true,'O reconhecimento opsônico ajuda a superar a barreira antifagocítica.'),O('A cápsula elimina a necessidade de anticorpos.',false,'Anticorpos anticapsulares têm relevância protetora.'),O('É sempre destruído apenas por MAC.',false,'A fagocitose opsônica é essencial na defesa contra pneumococos.'),O('É um vírus intracelular obrigatório.',false,'S. pneumoniae é uma bactéria.')]},
 teaching:'C3b ≠ C5a ≠ MAC: funções diferentes dentro da mesma cascata.',concepts:['C3b','C5a','Pneumococo']
 },
 {
 id:'comp-02',world:'complemento',title:'O cometa perfurador',difficulty:2,minutes:7,
 patient:'Nina, 17 anos',context:'História de infecções recorrentes por Neisseria. A investigação demonstra função reduzida dos componentes terminais do complemento.',
 indicators:['Suspeita de deficiência de C5–C9','Recorrência por Neisseria','Opsonização parcial preservada'],
 evidence:[E('C5b detectado','C5b inicia a montagem terminal do complexo de ataque à membrana.','inicio'),E('Poros insuficientes','A montagem C5b–9 está comprometida.','mac'),E('C3b presente','A etapa de opsonização pode continuar operando.','opsonizacao')],
 mechanisms:[M('inicio','Iniciação terminal','C5b recruta componentes posteriores.'),M('mac','Complexo de ataque à membrana','C5b–9 forma poros em membranas suscetíveis.'),M('opsonizacao','Opsonização distinta','C3b pode ser formado antes da via terminal.')],
 pathway:['Formação de C5 convertase','Clivagem de C5','Montagem de C5b–9','Dano à membrana-alvo'],pathwayWhy:'A via terminal está downstream da clivagem de C5 e é particularmente relevante contra Neisseria.',
 decision:{q:'Qual componente funcional merece atenção prioritária?',options:[O('Montagem de C5b–9',true,'A deficiência terminal está associada a maior suscetibilidade a infecções por Neisseria.'),O('Seleção tímica de linfócitos B',false,'Não é a etapa terminal do complemento.'),O('Reconhecimento de antígeno por CAR',false,'CAR é receptor de linfócitos T geneticamente modificados.'),O('Somente produção de IgE',false,'Não explica o perfil de deficiência terminal.') ]},
 transfer:{q:'Uma deficiência de C8 elimina necessariamente toda a deposição de C3b?',options:[O('Não. A deposição de C3b ocorre a montante da via terminal.',true,'Falhas distais podem preservar eventos proximais.'),O('Sim. C8 ativa diretamente todas as C3 convertases.',false,'C8 atua na formação do MAC, não como C3 convertase.'),O('Sim. C3b e MAC são a mesma molécula.',false,'São entidades e funções distintas.')]},
 teaching:'Vias proximais e terminais podem falhar de modo independente.',concepts:['MAC','C3b','C5b–9']
 },
 {
 id:'adap-01',world:'adaptativa',title:'A mensagem na vitrine',difficulty:2,minutes:7,
 patient:'Davi, 26 anos',context:'Uma infecção viral intracelular exige reconhecimento de peptídeos virais em células nucleadas infectadas.',
 indicators:['Peptídeos citosólicos','MHC classe I','Resposta citotóxica'],
 evidence:[E('Proteínas citosólicas','Peptídeos endógenos são processados para apresentação.','processamento'),E('MHC I na membrana','Complexos peptídeo–MHC I são exibidos a células T.','apresentacao'),E('T CD8 ativado','Linfócitos citotóxicos reconhecem células-alvo apropriadas.','citotoxicidade')],
 mechanisms:[M('processamento','Processamento endógeno','Proteassoma e transporte associado a apresentação por MHC I.'),M('apresentacao','Peptídeo–MHC I','Exibição de peptídeo para TCR de T CD8+.'),M('citotoxicidade','Efetor CD8+','Mecanismos citotóxicos podem eliminar a célula infectada.')],
 pathway:['Processamento de proteína viral','Carregamento de peptídeo em MHC I','Reconhecimento por TCR de CD8+','Resposta citotóxica'],pathwayWhy:'O TCR de T convencional reconhece peptídeo apresentado em MHC compatível.',
 decision:{q:'Qual combinação é mais típica do reconhecimento de célula infectada por vírus?',options:[O('Peptídeo–MHC I com linfócito T CD8+',true,'É a via clássica de vigilância citotóxica.'),O('Peptídeo–MHC II com hemácia madura',false,'Hemácias maduras não apresentam antígenos por MHC II.'),O('IgE com receptor CAR anti-CD19',false,'São modalidades diferentes de reconhecimento.'),O('C5b–9 como receptor de antígeno no TCR',false,'Complemento e TCR não são intercambiáveis.')]},
 transfer:{q:'Células T convencionais reconhecem, em geral, antígeno livre dissolvido sem MHC?',options:[O('Não. O TCR clássico costuma reconhecer complexo peptídeo–MHC.',true,'Essa dependência contrasta com CARs direcionados a antígenos de superfície.'),O('Sim. Todo TCR é equivalente a um anticorpo solúvel.',false,'TCR e imunoglobulinas possuem modos de reconhecimento distintos.'),O('Sim, mas apenas na medula óssea.',false,'O requisito não é determinado pelo órgão.')]},
 teaching:'A origem do antígeno e a via de apresentação condicionam a resposta.',concepts:['MHC I','CD8+','TCR']
 },
 {
 id:'adap-02',world:'adaptativa',title:'Dendi pede reforços',difficulty:2,minutes:7,
 patient:'Sofia, 21 anos',context:'Após vacinação, células dendríticas migram para linfonodos e iniciam resposta de linfócitos T auxiliares virgens.',
 indicators:['APC madura','Peptídeo–MHC II','Sinais coestimulatórios'],
 evidence:[E('Antígeno extracelular captado','Material internalizado entra na via endossômica de processamento.','processamento'),E('Peptídeo no MHC II','A APC apresenta peptídeos a linfócitos T CD4+ apropriados.','mhc'),E('CD80 e CD86','Ligantes coestimulatórios interagem com CD28 na ativação inicial.','coestimulo')],
 mechanisms:[M('processamento','Via exógena','Processamento endossômico típico para MHC II.'),M('mhc','Apresentação ao CD4+','TCR reconhece peptídeo–MHC II.'),M('coestimulo','Coestimulação','Sinal adicional favorece ativação de T virgens.')],
 pathway:['Captação do antígeno','Processamento em compartimentos endossômicos','Apresentação em MHC II','Ativação de T CD4+ com coestimulação'],pathwayWhy:'O encontro antígeno–MHC/TCR e a coestimulação integram a ativação inicial de T virgens.',
 decision:{q:'Por que expressar peptídeo–MHC II pode ser insuficiente para ativar T virgem?',options:[O('Pode faltar sinal coestimulatório adequado',true,'O reconhecimento pelo TCR é necessário, mas a ativação inicial depende de contexto e coestimulação.'),O('Porque MHC II apresenta apenas RNA livre',false,'MHC II apresenta principalmente peptídeos.'),O('Porque células dendríticas não migram para linfonodos',false,'APCs dendríticas podem migrar e ativar T.'),O('Porque CD4+ reconhece exclusivamente C3b',false,'CD4+ convencional reconhece antígenos via TCR–MHC II.') ]},
 transfer:{q:'Um linfócito B pode apresentar antígeno a T CD4+?',options:[O('Sim, B também pode atuar como APC em contextos apropriados.',true,'Células B expressam MHC II e processam antígenos captados.'),O('Não, apenas macrófagos têm MHC II.',false,'Dendríticas e B também expressam MHC II.'),O('Não, a função de B é exclusivamente fagocitar neutrófilos.',false,'Células B têm diversas funções, inclusive produção de anticorpos e apresentação.')]},
 teaching:'Antígeno + apresentação + coestimulação formam uma lógica integrada.',concepts:['MHC II','CD4+','CD28']
 },
 {
 id:'anti-01',world:'anticorpos',title:'A chave e a fechadura',difficulty:2,minutes:7,
 patient:'Iris, 19 anos',context:'Após exposição a um vírus respiratório, anticorpos neutralizantes reconhecem uma região específica da proteína viral que medeia a entrada celular.',
 indicators:['Epítopo exposto','IgG de ligação específica','Entrada viral reduzida'],
 evidence:[E('Região do antígeno','Um epítopo é reconhecido de maneira específica por um parátopo.','especificidade'),E('Ligação em proteína de entrada','O anticorpo se liga a uma estrutura que participa da entrada viral.','ligacao'),E('Menor infectividade','A ligação interfere funcionalmente na entrada do vírus.','neutralizacao')],
 mechanisms:[M('especificidade','Epítopo–parátopo','Determinante antigênico interage com sítio de ligação do anticorpo.'),M('ligacao','Ligação antigênica','Reconhecimento molecular não implica neutralização por si só.'),M('neutralizacao','Neutralização','Anticorpo impede etapa funcional necessária à infecção.')],
 pathway:['Encontro antígeno–anticorpo','Ligação ao epítopo','Bloqueio da interação viral necessária','Redução da entrada na célula'],pathwayWhy:'Nem todo anticorpo ligante é neutralizante; a consequência depende do epítopo e do mecanismo.',
 decision:{q:'O que distingue um anticorpo neutralizante de um apenas ligante?',options:[O('Bloqueia uma função crítica do agente',true,'Neutralização é uma consequência funcional, não apenas uma medida de afinidade.'),O('Sempre pertence à classe IgE',false,'Neutralização pode ser mediada por diversos isotipos.'),O('Só reconhece antígenos apresentados por MHC I',false,'Anticorpos normalmente reconhecem estruturas antigênicas diretamente.'),O('É capaz de sintetizar complemento',false,'Imunoglobulinas não sintetizam componentes do complemento.') ]},
 transfer:{q:'Um teste de ligação positivo demonstra automaticamente proteção clínica?',options:[O('Não. Ligação não equivale necessariamente a neutralização ou proteção.',true,'É preciso considerar função, concentração, contexto e correlatos de proteção.'),O('Sim, qualquer ligação garante proteção total.',false,'Anticorpos não neutralizantes também se ligam a antígenos.'),O('Sim, desde que a proteína tenha massa molecular elevada.',false,'A massa não define proteção funcional.')]},
 teaching:'Antígeno, epítopo, parátopo, afinidade e função são conceitos relacionados, mas não equivalentes.',concepts:['Antígeno','Epítopo','Anticorpo']
 },
 {
 id:'anti-02',world:'anticorpos',title:'A troca de uniforme',difficulty:3,minutes:8,
 patient:'Caio, 24 anos',context:'Após estímulo antigênico dependente de T, células B passam por diferenciação e podem trocar o isotipo da imunoglobulina produzida.',
 indicators:['IgM inicial','Sinais de T folicular auxiliar','IgG de maior afinidade mais tarde'],
 evidence:[E('Resposta inicial','Linfócitos B virgens com frequência expressam IgM e IgD de membrana.','inicio'),E('Contato T–B','Sinais como CD40–CD40L e citocinas participam da resposta dependente de T.','cooperacao'),E('IgG predominante depois','Troca de classe e seleção de clones podem modificar funções efetoras e afinidade.','maturacao')],
 mechanisms:[M('inicio','Resposta B inicial','IgM é típica de fases iniciais da resposta humoral.'),M('cooperacao','Ajuda T–B','Interações em centros germinativos sustentam troca de classe e maturação.'),M('maturacao','Troca de classe','Mudança de região constante preservando a especificidade básica da região variável.')],
 pathway:['Reconhecimento de antígeno por B','Ajuda de T folicular','Recombinação de troca de classe','Plasmócitos e células de memória'],pathwayWhy:'A troca de classe altera funções efetoras, sem precisar mudar o epítopo reconhecido.',
 decision:{q:'Na troca de classe IgM → IgG, qual componente muda principalmente?',options:[O('A região constante da cadeia pesada',true,'A especificidade básica do sítio variável é preservada durante a recombinação de classe.'),O('O DNA de todos os macrófagos',false,'O processo ocorre em linfócitos B.'),O('O receptor TCR do linfócito T',false,'Não corresponde ao mecanismo de troca de isotipo em B.'),O('Todos os epítopos do microrganismo',false,'O antígeno não é reescrito pela célula B.') ]},
 transfer:{q:'Aumento de afinidade e troca de isotipo são exatamente o mesmo processo?',options:[O('Não. Hipermutação/seleção e troca de classe são processos distintos.',true,'Ambos podem ocorrer em centros germinativos, com mecanismos e consequências diferentes.'),O('Sim. Ambos significam apenas mudar IgM para IgE.',false,'O aumento de afinidade não se reduz à troca de isotipo.'),O('Sim. Um necessariamente impede o outro.',false,'Podem coexistir na resposta humoral.')]},
 teaching:'A classe determina possibilidades efetoras; a afinidade depende da seleção e da região variável.',concepts:['IgM','IgG','Troca de classe']
 },
 {
 id:'memo-01',world:'memoria',title:'O segundo encontro',difficulty:2,minutes:7,
 patient:'Elena, 30 anos',context:'Após esquema vacinal com reforço, uma exposição subsequente ao mesmo antígeno produz resposta mais rápida e robusta.',
 indicators:['Células de memória','Latência de resposta reduzida','Maior resposta de anticorpos'],
 evidence:[E('Primeira dose','Priming promove ativação e diferenciação de clones específicos.','priming'),E('Linfócitos persistentes','Células B e T de memória podem permanecer após a fase efetora.','memoria'),E('Dose de reforço','Reexposição recruta memória e amplia a resposta.','recall')],
 mechanisms:[M('priming','Resposta primária','Expansão clonal e diferenciação iniciais.'),M('memoria','Persistência imunológica','Compartimentos de memória mantêm capacidade de resposta.'),M('recall','Resposta secundária','Ativação mais rápida de clones selecionados.')],
 pathway:['Reconhecimento na imunização primária','Expansão e diferenciação clonal','Formação de memória','Resposta acelerada ao reforço'],pathwayWhy:'Imunização prepara clones que podem ser recrutados em exposições posteriores.',
 decision:{q:'Qual evidência funcional favorece memória imunológica?',options:[O('Resposta específica mais rápida ao reencontro',true,'Memória imunológica é definida funcionalmente por alteração da resposta após exposição anterior.'),O('Ausência completa de linfócitos',false,'Memória depende de células e/ou produtos persistentes.'),O('Ativação de PRRs sem contribuição adaptativa',false,'PRRs são importantes, mas não demonstram memória adaptativa antígeno-específica.'),O('Presença exclusiva de neutrófilos no sangue',false,'Contagem de neutrófilos não prova memória específica.') ]},
 transfer:{q:'Uma concentração elevada de anticorpos, isoladamente, mede toda a proteção vacinal?',options:[O('Não. Proteção pode envolver funções e respostas celulares adicionais.',true,'Correlatos de proteção variam por patógeno e vacina.'),O('Sim, independentemente do agente e da função do anticorpo.',false,'Títulos isolados podem não capturar qualidade e outras vias protetoras.'),O('Sim, anticorpos substituem a memória T em todas as infecções.',false,'Componentes celulares são importantes em muitos cenários.')]},
 teaching:'Memória é uma propriedade funcional de respostas adaptativas, não um número único.',concepts:['Memória imunológica','Vacina','Resposta secundária']
 },
 {
 id:'memo-02',world:'memoria',title:'O alarme exagerado',difficulty:3,minutes:8,
 patient:'Bruna, 16 anos',context:'Após contato com um alérgeno previamente sensibilizante, surgem urticária e broncoconstrição de instalação rápida. Cenário fictício para estudo de hipersensibilidade imediata.',
 indicators:['Sensibilização anterior','IgE em mastócitos','Degranulação rápida'],
 evidence:[E('IgE na superfície','FcεRI mantém IgE ligada a mastócitos.','sensibilizacao'),E('Alérgeno multivalente','Ligação cruzada de IgE de superfície ativa mastócitos sensibilizados.','ativacao'),E('Histamina liberada','Mediadores contribuem para permeabilidade vascular e broncoconstrição.','efetores')],
 mechanisms:[M('sensibilizacao','Sensibilização IgE','IgE específica pode permanecer ligada ao FcεRI.'),M('ativacao','Agregação de FcεRI','Alérgeno promove entrecruzamento de receptores.'),M('efetores','Degranulação','Liberação de mediadores vasoativos e inflamatórios.')],
 pathway:['Sensibilização e produção de IgE','IgE ligada ao FcεRI','Reexposição e ligação cruzada','Degranulação e sintomas'],pathwayWhy:'A sensibilização prepara mastócitos; reexposição apropriada pode desencadear resposta imediata.',
 decision:{q:'Qual modalidade imunopatológica é ilustrada?',options:[O('Hipersensibilidade tipo I mediada por IgE',true,'A sequência IgE–FcεRI–degranulação é característica.'),O('Citotoxicidade por T CD8+ obrigatoriamente',false,'Não é o mecanismo predominante descrito.'),O('Imunodeficiência isolada por falta de C8',false,'Não corresponde à cascata IgE/mastócito.'),O('Somente formação de imunocomplexos tipo III',false,'O padrão descrito é de resposta imediata dependente de IgE.') ]},
 transfer:{q:'Toda resposta inflamatória rápida é necessariamente alérgica?',options:[O('Não. Vias inatas e outros mecanismos também provocam inflamação rápida.',true,'Tempo de início não define, sozinho, mecanismo etiológico.'),O('Sim, inflamação sempre requer IgE.',false,'Há muitas vias inflamatórias independentes de IgE.'),O('Sim, o complemento nunca participa de inflamação.',false,'C3a e C5a possuem ações inflamatórias.')]},
 teaching:'Resposta imune intensa não significa resposta protetora; pode gerar dano.',concepts:['IgE','Mastócitos','Hipersensibilidade I']
 },
 {
 id:'cart-01',world:'cart',title:'Tiko ganha um receptor',difficulty:3,minutes:9,
 patient:'Caso simulado: doença de células B CD19+',context:'Uma equipe estuda o mecanismo de linfócitos T modificados com receptor quimérico anti-CD19 no contexto de neoplasias B selecionadas.',
 indicators:['Alvo de superfície CD19','Receptor CAR engenheirado','Atividade citotóxica redirecionada'],
 evidence:[E('Domínio de ligação externo','A região de reconhecimento deriva tipicamente de um fragmento ligante de anticorpo.','reconhecimento'),E('Domínios intracelulares','Sinais como CD3ζ e módulos coestimulatórios ativam a célula T.','ativacao'),E('Célula B CD19 positiva','Expressão do antígeno-alvo viabiliza reconhecimento por CAR anti-CD19.','alvo')],
 mechanisms:[M('reconhecimento','Reconhecimento pelo CAR','A ligação é direcionada a antígenos acessíveis na superfície.'),M('ativacao','Sinalização do CAR','Domínios intracelulares traduzem ligação em ativação efetora.'),M('alvo','Seleção de alvo','A expressão de CD19 orienta a especificidade do produto anti-CD19.')],
 pathway:['Expressão do CAR na célula T','Encontro com célula CD19+','Ligação CAR–CD19','Ativação e resposta citotóxica'],pathwayWhy:'O CAR combina módulo extracelular de reconhecimento e módulos intracelulares de sinalização.',
 decision:{q:'Qual diferença clássica entre CAR anti-CD19 e TCR convencional?',options:[O('CAR pode reconhecer antígeno superficial sem apresentação por MHC clássico',true,'Diferentemente do TCR típico, CARs anti-CD19 reconhecem alvos de superfície diretamente.'),O('CAR é exclusivamente uma imunoglobulina secretada',false,'É um receptor expresso na membrana da célula T.'),O('CAR identifica apenas peptídeos intracelulares apresentados por MHC I',false,'Essa é a lógica típica do TCR convencional, não de CAR anti-CD19.'),O('CAR significa componente do complemento C3',false,'CAR é receptor quimérico de antígeno.') ]},
 transfer:{q:'CAR anti-CD19 reconheceria automaticamente uma célula que perdeu a expressão de CD19?',options:[O('Não. A perda do alvo pode favorecer escape antigênico.',true,'A expressão do antígeno-alvo é uma condição importante para reconhecimento.'),O('Sim, porque CD19 não influencia o reconhecimento.',false,'CD19 é precisamente o alvo da construção descrita.'),O('Sim, desde que haja IgE na superfície.',false,'IgE não substitui o alvo do CAR anti-CD19.') ]},
 teaching:'Anticorpos e CAR-T compartilham lógica de ligação antigênica, mas não são a mesma entidade.',concepts:['CAR-T','CD19','TCR']
 },
 {
 id:'cart-02',world:'cart',title:'A tempestade de sinais',difficulty:3,minutes:9,
 patient:'Caso simulado: após infusão CAR-T',context:'Após uma terapia celular, surge febre com sinais de resposta inflamatória sistêmica. O objetivo é reconhecer mecanismos, não conduzir atendimento.',
 indicators:['Ativação imunológica intensa','Citocinas circulantes elevadas','Risco de síndrome de liberação de citocinas'],
 evidence:[E('CAR-T ativadas','A ligação ao alvo pode produzir citocinas e recrutar outras células.','ativacao'),E('IL-6 e outros mediadores','Monócitos/macrófagos e redes inflamatórias contribuem para o processo.','amplificacao'),E('Febre e hipotensão','Sinais podem ocorrer em síndrome de liberação de citocinas.','manifestacao')],
 mechanisms:[M('ativacao','Ativação efetora','Interação CAR–alvo inicia resposta celular.'),M('amplificacao','Amplificação inflamatória','Citocinas e células mieloides participam da rede.'),M('manifestacao','Toxicidade sistêmica','Excesso de resposta imune pode produzir manifestações clínicas graves.')],
 pathway:['Reconhecimento do alvo por CAR-T','Ativação de células efetoras e mieloides','Amplificação de citocinas','Sinais inflamatórios sistêmicos'],pathwayWhy:'Toxicidades não são sinônimo de falha antitumoral; são eventos biológicos que requerem avaliação clínica especializada.',
 decision:{q:'Qual interpretação mecanística melhor explica o cenário?',options:[O('Amplificação de mediadores inflamatórios após ativação imune',true,'A síndrome de liberação de citocinas envolve ativação celular e rede de citocinas.'),O('Ausência completa de resposta imune',false,'O quadro sugere ativação excessiva, não ausência de ativação.'),O('Somente deficiência de C3b',false,'Não descreve primariamente a toxicidade após CAR-T.'),O('Todos os anticorpos tornam-se receptores TCR',false,'As entidades biológicas são distintas.') ]},
 transfer:{q:'Sinais de toxicidade sistêmica após CAR-T devem ser interpretados apenas como prova de eficácia terapêutica?',options:[O('Não. Toxicidade e eficácia precisam de avaliações independentes e atenção clínica imediata.',true,'A síndrome pode ser grave e não é um marcador isolado confiável de benefício.'),O('Sim. Quanto maior a febre, maior necessariamente o benefício.',false,'Essa inferência não é cientificamente justificada e pode ser perigosa.'),O('Sim, independentemente da avaliação médica.',false,'Acompanhamento especializado é indispensável.') ]},
 teaching:'A força da resposta imune tem custo biológico: controle de toxicidade é parte da terapia.',concepts:['CAR-T','IL-6','CRS']
 }
];
const CORE_GLOSSARY = [
 ['Antígeno','Molécula ou estrutura reconhecida por componentes específicos da imunidade adaptativa. Nem todo antígeno induz resposta robusta em qualquer contexto.','anticorpos'],
 ['Epítopo','Região ou determinante do antígeno reconhecido por anticorpo, BCR ou, após processamento e apresentação, por TCR.','anticorpos'],
 ['Parátopo','Região do anticorpo/BCR responsável pela ligação ao epítopo.','anticorpos'],
 ['Anticorpo','Imunoglobulina secretada por plasmócitos, capaz de se ligar a antígenos e mediar efeitos específicos.','anticorpos'],
 ['PRR','Receptor de reconhecimento de padrões conservados de microrganismos ou sinais de dano.','sentinelas'],
 ['PAMP','Padrão molecular associado a patógenos, reconhecível por determinados PRRs.','sentinelas'],
 ['Fagocitose','Internalização de partículas por células fagocíticas; não garante sua eliminação.','sentinelas'],
 ['NADPH oxidase','Complexo enzimático envolvido no burst respiratório e na produção de ROS por fagócitos.','sentinelas'],
 ['Opsonização','Marcação de um alvo, por exemplo com C3b ou anticorpos, que favorece sua captura por receptores de fagócitos.','complemento'],
 ['C3b','Fragmento do complemento com importante função opsonizante.','complemento'],
 ['C5a','Fragmento do complemento com atividade quimiotática e pró-inflamatória.','complemento'],
 ['MAC','Complexo de ataque à membrana (C5b–9), capaz de formar poros em membranas suscetíveis.','complemento'],
 ['MHC I','Moléculas que apresentam predominantemente peptídeos endógenos a linfócitos T CD8+ convencionais.','adaptativa'],
 ['MHC II','Moléculas em APCs profissionais que apresentam predominantemente peptídeos exógenos a T CD4+ convencionais.','adaptativa'],
 ['TCR','Receptor de células T convencionais, tipicamente voltado ao reconhecimento de peptídeo–MHC.','adaptativa'],
 ['CD4+','Subpopulação T que coordena respostas e pode auxiliar ativação de células B e outros efetores.','adaptativa'],
 ['CD8+','Subpopulação T que pode reconhecer e eliminar células-alvo via mecanismos citotóxicos.','adaptativa'],
 ['Coestimulação','Sinais além do TCR, como CD28–CD80/CD86, envolvidos na ativação de T virgens.','adaptativa'],
 ['IgM','Isotipo de imunoglobulina frequentemente associado ao início de respostas humorais.','anticorpos'],
 ['IgG','Isotipo comum no soro, com várias funções efetoras conforme a subclasse e o contexto.','anticorpos'],
 ['IgA','Imunoglobulina importante para proteção de superfícies mucosas.','anticorpos'],
 ['IgE','Isotipo ligado a FcεRI em mastócitos e basófilos, associado a alergias imediatas e defesa contra alguns parasitas.','memoria'],
 ['Troca de classe','Recombinação em células B que muda região constante da cadeia pesada, modificando propriedades efetoras.','anticorpos'],
 ['Memória imunológica','Capacidade de resposta modificada e frequentemente mais rápida após encontro prévio com antígeno.','memoria'],
 ['Hipersensibilidade I','Resposta imediata típica dependente de IgE e mastócitos em indivíduos sensibilizados.','memoria'],
 ['CAR-T','Linfócito T modificado para expressar receptor quimérico dirigido a um alvo como CD19.','cart'],
 ['CD19','Molécula de superfície presente em grande parte da linhagem B; alvo de algumas terapias CAR-T.','cart'],
 ['CRS','Síndrome de liberação de citocinas, possível toxicidade inflamatória de imunoterapias celulares.','cart']
].map(([term,description,world])=>({term,description,world}));

export const WORLDS=[...CORE_WORLDS,...EXTRA_WORLDS];
export const CASES=[...CORE_CASES,...EXTRA_CASES,...INCIDENT_CASES];
export const GLOSSARY=[...CORE_GLOSSARY,...EXTRA_GLOSSARY,...INCIDENT_GLOSSARY];
