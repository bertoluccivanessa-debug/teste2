/* Laboratório Causal — componente de visão montável. */
export function causalView(){return `<section id="causal-lab" class="causal-lab" aria-label="Laboratório causal de imunologia">
  <div class="lab-hero">
    <div class="lab-hero-copy"><div class="kicker">⚗ Módulo experimental · O que acontece se...?</div>
    <h1>Altere uma molécula. <em>Descubra a consequência.</em></h1>
    <p>Experimente o controle e uma perturbação molecular. Faça uma previsão, execute a simulação, compare as evidências e investigue a repercussão clínica.</p>
    <div class="lab-hero-tags"><span>5 experimentos</span><span>Comparação controle × intervenção</span><span>Casos clínicos</span></div></div>
    <div class="lab-hero-orbit" aria-hidden="true"><div class="orbit o1"></div><div class="orbit o2"></div><div class="orbit o3"></div><div class="orbit-center">?</div></div>
  </div>
  <div class="lab-topline"><div><div class="eyebrow">01 · Selecione um experimento</div><h2>Estações de pesquisa</h2><p>Escolha a alteração que deseja investigar.</p></div><div class="lab-progress-chip" id="lab-progress-chip" aria-live="polite">0/5 concluídos</div></div>
  <div class="lab-stations" id="lab-stations"></div>
  <div class="lab-workspace" id="lab-workspace" aria-live="polite"></div>
  <section class="lab-footnote"><h3>Rigor científico e limites da simulação</h3><p>As cenas são modelos conceituais qualitativos: não representam previsões quantitativas, resultados individuais de pacientes ou experimentos laboratoriais validados. A perda parcial de função, os efeitos compensatórios e os resultados clínicos reais dependem do contexto. A avaliação formativa registra XP separadamente da nota acadêmica.</p><div class="lab-footlinks"><a href="https://www.ncbi.nlm.nih.gov/books/NBK557581/" target="_blank" rel="noopener noreferrer">Complemento — NCBI ↗</a><a href="https://www.ncbi.nlm.nih.gov/books/NBK1402/" target="_blank" rel="noopener noreferrer">CD40L — GeneReviews ↗</a><a href="https://www.ncbi.nlm.nih.gov/books/NBK99496/" target="_blank" rel="noopener noreferrer">DGC — GeneReviews ↗</a></div></section>
</section>
`;}
