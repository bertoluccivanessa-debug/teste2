# Release 4.0 · Integração Clinical

**Composição:** IMMUNOVERSE 3.3 intacto, módulo Clinical 4.0 acrescentado como rota de navegação, armazenamento separado e oito etapas de cada plantão. O conteúdo anterior (42 missões, 10 mundos, 82 conceitos, ImunoLab, personagens e cenários) permanece funcional.

**Novos arquivos**: `src/clinical.js`, `src/clinical-data.js`, `src/clinical.css`, `tests/clinical.test.mjs`, `docs/CLINICAL_V4_GUIA_DOCENTE.md`.

**Arquivos editados**: `src/app.js` (rota, entrada no menu e delegação de eventos), `src/index.html` (stylesheet), `src/sw.js` (cache e ativos), `src/manifest.webmanifest`, `package.json` e `README.md`. `dist/` foi regenerado.

**Cobertura**: 7 plantões × 8 estágios, 18 estações didáticas, 20 encontros CDP N1/N2/N3, microscopia esquemática por clique, 3 simulações qualitativas, 3 portas de escape, 6 associações moleculares, 4 avaliações pré-escritas e exportação CSV/JSON.

**Limitações intencionais**: casos e notas sintéticas; rubrica automatizada no máximo 90/100 com 10 pontos reservados à revisão docente; nenhuma IA de avaliação de texto; não há autenticação, geração segura no servidor, fotomicrografias validadas ou integração com prontuários reais. Casos e recomendações devem ser revisados por docentes e confrontados com protocolos SUS/PNI atuais.

**Verificação executada**: `npm test` (27 testes aprovados), `npm run build` (gerado), inspeção de sintaxe `node --check` e arquivos servidos com HTTP 200. Limite conhecido: Chromium retornou `ERR_BLOCKED_BY_ADMINISTRATOR` ao acessar a porta local; teste visual final em browser real não foi possível neste ambiente.

**Deploy**: Vercel `Other`, `npm run build` → `dist`. Usar repositório já existente `bertoluccivanessa-debug/immunoverse`, preservando `.git` e o histórico. Os arquivos foram gerados localmente; não houve push ou deploy remoto nesta entrega.
