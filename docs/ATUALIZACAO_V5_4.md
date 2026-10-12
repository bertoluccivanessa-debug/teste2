# Atualização 5.4 — Exploração, Atlas e raciocínio causal

## Objetivo pedagógico

Substituir interações predominantemente decorativas por tarefas que exijam reconhecer evidências, elaborar hipóteses, identificar mecanismos, testar consequências e transferir conhecimentos a outras situações. A lógica de cada oficina é **Conectar (evidência) → Desenvolver (mecanismo) → Praticar (aplicação)**.

## Alterações implementadas

| Área | Integração |
|---|---|
| Trilha semestral | Os 21 encontros contêm oficinas próprias (63 decisões ao todo), além de ligações para bancada e caso |
| Exploração Interativa | Os oito cenários e o título **DESTINOS DISPONÍVEIS** permanecem; 24 hotspots têm pergunta interpretativa e feedback |
| Atlas Imunológico | Conceitos com explicação, função, mecanismo, exemplo clínico, erro frequente e acesso a outras atividades |
| Mentoria | **Consultoria Imunológica** orientada por especialidade; atlas celular com observação em condição normal/alterada |
| ImunoLab | Conexões do conteúdo do programa a experimentos de leucograma, fagocitose, complemento, MHC, imunoglobulinas, ELISA, ABO/Rh, imunolátex e vacinas |
| Avaliação | XP por oficina/domínio e descoberta, sem bônus infinito por repetição; separação explícita de nota oficial |
| Interface | Estética acadêmica e clínica, componentes responsivos, tratamento “Doutor + nome” |

## Percursos recomendados para teste pedagógico

1. **N1 · Leucograma (06/08):** do painel clínico, abrir o encontro, realizar as três decisões, consultar explicações, acessar o ImunoLab de hematologia e transferir a inferência ao caso indicado. Rever que 3.000 leucócitos/µL × 20% = 600 neutrófilos/µL (neutropenia moderada, segundo classificação por contagem absoluta).
2. **N1 · MHC e linfócitos (20/08):** identificar captura/processamento, distinguir pMHC II–TCR e coestimulação, comparar ativação normal e falha, acessar plantão.
3. **N2 · Sorologia (01/10):** associar marcador a analito, diferenciar exposição de viremia em hepatite C e ponderar janela no HIV; executar bancada de ELISA.
4. **N2 · VDRL/HEMACRUZI (12/11):** distinguir floculação, hemaglutinação, controles analíticos e significado do reagente.
5. **N3 · Integração (03/12):** integrar hemólise imune, complemento, uso de imunossupressores, limitações sorológicas e prioridade clínica em caso sintético.
6. **Exploração:** abrir “Cenários”; alternar entre os oito DESTINOS DISPONÍVEIS; responder a dois hotspots, errar primeiro um deles e verificar que há recuperação; seguir para ImunoLab e caso.
7. **Atlas:** pesquisar anti-HBs, anti-HCV, IgA, MHC II e CAR-T; conferir as quatro camadas e navegar para a oficina e o experimento associados.

## Validação técnica

- `npm test`: **45 testes automatizados** aprovados ao empacotar, incluindo compatibilidade com progresso anterior e checagem dos 21 encontros/24 pontos de exploração.
- `npm run build`: saída `dist/` gerada.
- Recursos públicos e scripts foram conferidos localmente; **renderização visual real em navegador permanece pendente**.
- Não houve alteração remota do repositório nem deploy de produção nesta entrega.

## Integridade científica

Simulações representam relações causais didáticas, não modelos quantitativos de resposta imune. Decisões diagnósticas, sorologias e esquemas vacinais são fictícios, não substituem diretrizes clínicas atualizadas. Toda implantação como atividade de ensino exige validação por docente responsável.
