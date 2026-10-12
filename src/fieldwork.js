/** Decisões formativas vinculadas aos 24 hotspots preexistentes de exploração.
 * Estações sintéticas; opção zero no banco é a melhor, ordem é alternada na interface.
 */
const RAW={
 laboratorio:[
 ['Bancada de sorologia','O painel HBV apresenta HBsAg reagente. Qual pergunta permanece em aberto?','Fase e duração da infecção exigem marcadores e história','Anti-HBs é sempre indicativo de replicação','A cor da placa define cronicidade','HBsAg detecta antígeno; não define sozinho fase crônica.','elisa'],
 ['Microscópio de imunidade','Neutrófilos internalizam bactérias, mas não as eliminam. O que comparar?','Explosão respiratória e atividade microbicida','Somente tamanho do neutrófilo','Tipagem ABO do paciente','Internalização preservada pode coexistir com defeito de morte intracelular.','phago'],
 ['Computador de imunologia','Exposição recente a HIV e teste inicial não reagente. O que concluir?','Considerar janela, tipo de teste e reavaliação','Ausência definitiva de infecção em qualquer intervalo','Trocar o resultado por anti-HBs','Ensaios p24/anticorpos possuem janelas; contexto orienta repetição conforme protocolo.','elisa']],
 sangue:[
 ['C3b em ação','Micro-organismo recoberto por C3b persiste. O que a marcação demonstra?','Opsonização, sem provar morte','Lise imediata em todos os casos','Produção obrigatória de IgE','Opsonização facilita reconhecimento; eliminação requer outras etapas.','complement'],
 ['Anticorpo circulante','IgG se liga a um epítopo viral distante do sítio de entrada. O que testar?','Se a ligação tem efeito neutralizante funcional','Concluir que toda IgG neutraliza','Afirmar que Fc é o parátopo','Ligação específica não demonstra necessariamente neutralização.','igg'],
 ['Partícula viral','Anti-HCV reagente: o que ajuda a identificar viremia atual?','HCV RNA','Anti-HBs isolado','IgA salivar','RNA viral pesquisa infecção ativa; anticorpos indicam exposição.','elisa']],
 linfonodo:[
 ['Célula dendrítica','Uma dendrítica apresenta antígeno a T virgem. Onde ocorreu o encontro?','Região apropriada de órgão linfoide secundário','Dentro de hemácia madura','Sempre na medula óssea','APCs migratórias e recirculação T favorecem priming em linfonodos.','mhc'],
 ['Sinapse imunológica','TCR reconheceu pMHC II, mas faltou CD80/CD86. Qual variável é crítica?','Coestimulação','Antígeno D das hemácias','Número de plaquetas','O segundo sinal ajuda a determinar ativação plena.','mhc'],
 ['Encontro T–B','Centro germinativo favorece qual processo?','Seleção e maturação da resposta B','Formação de granulócitos maduros','Aglutinação de anti-D','A ajuda T folicular e seleção clonal favorecem afinidade e troca de classe.','igg']],
 medula:[
 ['Célula B imatura','Qual estrutura caracteriza reconhecimento antigênico na célula B?','BCR de membrana','TCR obrigatório de MHC I','Receptor Fc como único receptor','BCR reconhece antígeno nativo, diferente do TCR convencional.','igg'],
 ['Plasmócito','Qual função se intensifica após diferenciação em plasmócito?','Secreção de imunoglobulinas','Fagocitose de neutrófilos','Síntese de heme como função imunológica','Plasmócitos são efetores secretores da linhagem B.','igg'],
 ['Memória humoral','IgG diminuiu meses após vacina. O que não se pode concluir?','Ausência definitiva de memória imune','Queda de títulos circulantes','Necessidade de contextualização','Memória B pode persistir sem títulos séricos constantes.','vaccine']],
 ferida:[
 ['Porta de entrada','Rompimento epitelial aumenta qual risco inicial?','Entrada de microrganismos e ativação inata local','Mudança do grupo ABO','Ativação obrigatória de CAR-T','Barreiras físicas participam da defesa inicial.','phago'],
 ['Neutrófilo','Há migração celular preservada, mas fagocitose deficiente. Qual etapa investigar?','Adesão, opsoninas e internalização','Apenas a temperatura corporal','Somente a concentração de anti-HBs','Chegar ao foco não garante englobar o agente.','phago'],
 ['Fagócito sentinela','Macrófago reconhece PAMP por PRR. Qual consequência pode ocorrer?','Sinalização inflamatória e recrutamento de efetores','Produção de hemoglobina','Maturação instantânea de IgG','Receptores inatos reconhecem padrões e acionam respostas.','phago']],
 mucosa:[
 ['Barreira epitelial','Muco e junções intercelulares atuam principalmente em:','Restrição de invasão e homeostase','Esterilização universal da microbiota','Liberação obrigatória de IgE','Defesa de mucosas convive com microrganismos comensais.','vaccine'],
 ['IgA secretora','A IgA dimérica atravessa epitélio por qual receptor?','pIgR','TCR de CD8','CD19','pIgR transporta IgA polimérica para a superfície mucosa.','igg'],
 ['Dendrítica de mucosa','Por que o mesmo antígeno pode favorecer tolerância ou resposta?','Contexto de apresentação e sinais locais','Cor do antígeno no esquema','Grupo ABO do observador','Microambiente modula a direção da resposta adaptativa.','mhc']],
 hospital:[
 ['Leito de hepatites','Qual hepatite depende da presença de HBV para completar ciclo?','Hepatite D','Hepatite A','Hepatite C','HDV depende de HBsAg do HBV para produção de partículas infecciosas.','elisa'],
 ['Painel HBV','Anti-HBs isolado reagente após vacina. Qual interpretação é mais provável?','Imunidade vacinal, no contexto apropriado','Replicação de HBV confirmada','HCV RNA detectável','A vacinação contra HBV induz anti-HBs sem anti-HBc.','elisa'],
 ['Aconselhamento em HIV','Após possível exposição, qual informação é essencial para interpretar teste?','Data da exposição e método utilizado','Apenas resultado de VDRL','Somente grupo Rh','Janela e tipo de ensaio determinam limites do resultado.','elisa']],
 arena:[
 ['T CD8+ em ação','T CD8+ convencional reconhece qual complexo?','Peptídeo–MHC I','IgG Fc livre','IgA secretora no muco','TCR de T CD8+ interage com pMHC I.','mhc'],
 ['Alvo CAR-T','Qual diferença distingue CAR de TCR convencional?','CAR reconhece superfície sem exigir apresentação clássica por MHC','CAR é um anticorpo secretado por plasmócito','CAR exige anti-HBs para atuar','Arquitetura do CAR usa domínio extracelular para reconhecer alvo superficial.','mhc'],
 ['Fuga do antígeno','Após terapia anti-CD19, surge clone CD19 negativo. Que fenômeno ocorreu?','Escape por perda do alvo','Neutrofilia fisiológica','Aumento obrigatório de anti-D','Perda do antígeno-alvo pode reduzir a eficácia da terapia dirigida.','mhc']]
};
export const FIELDWORK=Object.fromEntries(Object.entries(RAW).flatMap(([scene,items])=>items.map((x,i)=>[`${scene}:${i}`,{id:`${scene}:${i}`,title:x[0],question:x[1],options:x.slice(2,5),explanation:x[5],lab:x[6],correct:0}])));
export const getFieldwork=(scene,index)=>FIELDWORK[`${scene}:${index}`]||null;
export const fieldOptions=item=>[0,1,2].map(i=>({index:i,label:item.options[(i+(item.id.length%3))%3],correct:((i+(item.id.length%3))%3)===item.correct}));
export function validateFieldwork(scenes){const problems=[];for(const s of scenes){for(let i=0;i<s.hotspots.length;i++){const item=getFieldwork(s.id,i);if(!item||item.options.length!==3||item.explanation.length<15)problems.push(`${s.id}:${i}`);}}return problems;}
