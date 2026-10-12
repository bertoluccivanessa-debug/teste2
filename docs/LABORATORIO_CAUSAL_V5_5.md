# Laboratório Causal — “O que acontece se...?” · Integrado à v5.5

## Objetivo

A partir de uma molécula, célula ou etapa funcional, o estudante propõe uma previsão causal, modifica uma condição experimental e interpreta as consequências em uma comparação qualitativa com o controle. A missão se completa com um caso de transferência clínica e explicação mecanística.

## Cinco estações

1. **C3** — ausência/redução de C3, deposição de C3b, opsonização e fagocitose.
2. **CD40L** — sinal Tfh–B, centro germinativo, troca de isótipos e fenótipo hiper-IgM.
3. **NADPH oxidase** — reconhecimento e fagocitose versus destruição microbicida oxidativa; doença granulomatosa crônica.
4. **Epítopo–parátopo** — especificidade de anticorpo monoclonal, afinidade e escape parcial.
5. **CD3ζ em CAR-T** — reconhecimento por scFv versus sinalização e resposta citotóxica.

Cada estação dispõe de duas intervenções (parcial e completa), previsão prévia, duas cenas SVG (controle/intervenção), desfechos qualitativos, explicações das alternativas, cadeia causal e caso clínico. São modelos didáticos **não quantitativos**, que não constituem previsão de resultados laboratoriais reais.

## Localização no projeto

- `src/causal-view.js` — estrutura da tela, acessível pela navegação principal e inferior.
- `src/causal-lab.js` — dados das cinco estações, lógica interativa, XP, registro local e montagem da tela.
- `src/causal-lab.css` — estilo responsivo adaptado à identidade visual v5.5.
- `src/app.js` — integração de rotas, perfil, atalhos do Atlas, painel de progresso e rodapé.
- `tests/causal-lab.test.mjs` — validação automatizada do percurso causal e ausência de XP duplicado.
- `src/sw.js` — cache atualizado incluindo os recursos do laboratório.

## Roteiro do aluno

1. Abrir **⚗ E se...?** no menu (ou no atalho do Atlas Celular).
2. Escolher uma estação e uma intensidade de alteração.
3. Registrar uma previsão **antes** de executar.
4. Executar o experimento e comparar os desfechos.
5. Ler a cadeia causal e a explicação das alternativas.
6. Resolver o caso clínico de transferência.
7. Acumular XP uma única vez por chave de conquista; acompanhar o avanço no painel de progresso.

## Persistência e perfil

As conquistas são guardadas no navegador, em `localStorage`, sob a chave `immunoverse.play.causal.v55`. Os XP concedidos pelo laboratório integrado são adicionados ao sistema geral de bônus de XP da plataforma, sem alterar a nota acadêmica ou os escores de missões anteriores. O painel de progresso exibe também o subtotal da bancada. O botão **Limpar meus dados** apaga ambos os progressos. O backup JSON passa a incluir o campo `causalLab` para arquivamento; esta versão não oferece importação/restauração automática do backup.

Os valores de XP não são medição validada de aprendizagem. A interpretação educacional deve apoiar-se em avaliações formativas independentes e em questões inéditas de transferência.

## Publicação

- Repositório GitHub: `src/`, `docs/`, `tests/`, `tools/`, `dist/`, `package.json`, `vercel.json` na raiz.
- Vercel: `npm run build`; Output Directory: `dist`; Runtime Node >=20.
- Site estático: os arquivos de `dist/` podem ser publicados diretamente em hospedagem estática HTTPS.

## Verificação realizada

- `npm test`: 47 testes automatizados aprovados.
- `npm run build`: 10 mundos, 42 missões, 82 conceitos.
- A suíte verifica dados, motor, módulos clínicos, roteamento legado e percurso causal com simulação de elementos DOM. **A inspeção manual completa no navegador e a publicação em domínio real não foram realizadas neste ambiente**, portanto a revisão visual final desktop/mobile deverá acontecer após o deploy.

## Créditos acadêmicos

**IMMUNOVERSE Clinical | Imunologia Aplicada**

Desenvolvimento: **Vanessa Bertolucci** · Estágio Docente em Imunologia  
Supervisão docente: **Profa. Dra. Michelle Darrieux Bertoncini** · Curso de Imunologia - Medicina — Universidade São Francisco (USF)

*Ambiente educacional com casos clínicos simulados. Não substitui avaliação profissional ou supervisão docente.*

© 2026 · IMMUNOVERSE Clinical
