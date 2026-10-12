> **PACOTE CORRIGIDO PARA GITHUB + VERCEL:** Leia primeiro [`docs/PUBLICACAO_V5_5_GITHUB_VERCEL.md`](docs/PUBLICACAO_V5_5_GITHUB_VERCEL.md). `dist/` é gerado pelo `npm run build` e não deve ser tratado como a raiz do código-fonte.

# IMMUNOVERSE Clinical 5.5 — Laboratório Causal integrado (GitHub + Vercel)

**Versão HTML5 responsiva para a formação em Imunologia no curso de Medicina.** Código-fonte, recursos visuais e testes incluídos; publicação preparada para GitHub e Vercel. Os pacientes, resultados laboratoriais e decisões são fictícios e têm finalidade exclusivamente educacional.

## O que contém

- **Trilha semestral com 21 encontros**, alinhados ao programa da disciplina e aos movimentos **Conectar → Desenvolver → Praticar**, cobrindo N1, N2 e N3.
- **21 oficinas de pensamento imunológico** com 3 etapas: observação da evidência, mecanismo causal e aplicação clínica (**63 decisões**). Cada uma apresenta explicações em quatro camadas e sugere bancada/plantão relacionado.
- **Exploração Interativa preservada e ampliada:** 8 ambientes ilustrados, painel **DESTINOS DISPONÍVEIS** mantido, 24 pontos de descoberta e 24 problemas contextualizados com escolha de hipótese, justificativa e ligação para o ImunoLab/caso.
- **Atlas Imunológico contextualizado:** mais de 82 conceitos pesquisáveis, explicações por mecanismo, aplicação clínica, erro frequente e acesso à oficina curricular, à missão e à estação relacionada.
- **Consultoria Imunológica**, em substituição ao guia decorativo: orientações por especialidade e fase do caso, sem revelar automaticamente a resposta; atlas celular funcional para comparar condições fisiológicas e falhas.
- **ImunoLab:** nove estações avançadas (leucograma, fagocitose, complemento, apresentação antigênica, anticorpos, ELISA, tipagem ABO/Rh, imunolátex e memória vacinal), além das bancadas clínicas anteriores (inclusive VDRL e HEMACRUZI).
- **11 plantões clínicos** (N1–N3) e **42 missões originais**, com XP e rubricas formativas, painel de desempenho e exportação local.
- Abertura com pedido de nome e tratamento **“Doutor + nome”**; o nome e o progresso ficam apenas no navegador.

## Progresso e avaliação

As oficinas permitem corrigir erros, sem bloquear a aprendizagem. A pontuação por oficina é de até 45 XP, com redução leve por respostas corrigidas; mantém-se o melhor resultado por encontro, impedindo ganhos repetidos pela mesma realização. Na exploração, cada descoberta rende uma recompensa **uma única vez**. XP é **gamificação formativa**, não nota oficial, avaliação psicométrica validada ou certificação de competência médica. Casos clínicos e resultados simulados precisam de revisão docente antes de uso institucional.

## Rodar localmente

Requer **Node.js 20 ou superior**; não há dependências externas obrigatórias.

```bash
npm test
npm run build
npm run preview
```

Abra `http://localhost:4173` para testar o build de `dist/`. Para servir o código-fonte em desenvolvimento, execute `npm run dev`.

## Publicar no repositório GitHub existente

Repositório de referência: https://github.com/bertoluccivanessa-debug/immunoverse

1. Faça clone do repositório existente com a conta autorizada; **não reinicialize** a pasta `.git` e **não use `git push --force`**.
2. Extraia este ZIP e **copie o conteúdo** da pasta para a raiz do clone, preservando `.git`. Não envie o ZIP como um único arquivo.
3. Confira as diferenças em `git status` e `git diff`; execute `npm test` e `npm run build`.
4. Faça commit normal e envie para o GitHub com uma conta que possua permissão de escrita.
5. No projeto Vercel vinculado ao repositório, mantenha **Framework: Other**, **Root Directory: `./`**, **Build Command: `npm run build`** e **Output Directory: `dist`**. Não são necessárias variáveis de ambiente.
6. Após o deploy, valide o cadastro do Doutor, a trilha/CDP, a galeria de destinos, a exploração, os experimentos, o Atlas, a responsividade e o cache offline.

A alternativa `IMMUNOVERSE-CLINICAL-v5.4-SITE-VERCEL.zip` contém somente o build estático com `index.html` na raiz e configuração sem build.

## Estrutura

```text
src/                 Código web: app, módulos clínicos, atlas, exploração, imagens
src/curricular-drills.js   21 oficinas (63 decisões)
src/fieldwork.js          24 problemas dos oito destinos
src/atlas-context.js      Explicações mecanísticas contextualizadas
src/consultation.js       Consultoria por especialidade e fase
src/clinical-v54.css      Estilos responsivos novos
dist/                Build HTML5 gerado localmente (ignorado no GitHub)
 tests/               Testes de conteúdo, motor, UX, oficinas, exploração e Atlas
 docs/                Guias de implementação, curricular e publicações
 godot/               Protótipo histórico Godot preservado, sem paridade com o webapp
 vercel.json          Configuração do build Vercel
 .github/workflows/    Rotina de testes em commits/pull requests
```

## Limitações e cuidados

- A checagem automatizada de comportamento e conteúdo **não substitui** teste visual em Chrome/Safari/Firefox reais. O navegador de inspeção estava bloqueado por restrição do ambiente.
- As figuras e curvas são **esquemáticas** e não substituem fotomicrografias, padrões laboratoriais ou ensaios clínicos validados.
- Antes de divulgar publicamente, confirme direitos de distribuição das ilustrações fornecidas no projeto original.
- Histórico, cadastro e avaliações permanecem locais (`localStorage`), sem autenticação de estudante ou painel remoto do professor. Limpar dados do navegador poderá eliminar o progresso. Para avaliação valendo nota, é necessário processo institucional seguro e supervisão.
- A versão 5.4 foi **preparada**, mas não enviada automaticamente ao GitHub/Vercel. O site público só será alterado por deploy autorizado.

Veja também `docs/ATUALIZACAO_V5_4.md`.

---

## v5.5 + Laboratório Causal (integração da versão enviada)

A navegação **⚗ E se...?** incorpora cinco experimentos de perturbação molecular: C3, CD40L, NADPH oxidase, epítopo e CD3ζ. Mantém-se a trilha v5.5 original (10 mundos, 42 missões, 82 conceitos); os experimentos são um módulo **adicional**, não substituem o ImunoLab existente. O Atlas Celular inclui atalhos contextuais para a bancada experimental. A persistência é local e o XP da bancada integra o perfil geral; notas de missões permanecem separadas.

**Detalhamento científico, técnico, limites e publicação:** `docs/LABORATORIO_CAUSAL_V5_5.md`.
