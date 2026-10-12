# IMMUNOVERSE Clinical 5.5 — Projeto web para GitHub + Vercel

Laboratório virtual de Imunologia Médica, com 10 mundos, 42 missões, Atlas celular ampliado, Hematopoiese ilustrada, ImunoLab e Laboratório Causal “O que acontece se...?”. Casos clínicos e resultados fictícios, de finalidade exclusivamente educacional.

**Comece por:** [`docs/ARQUITETURA_PUBLICACAO_ESTAVEL.md`](docs/ARQUITETURA_PUBLICACAO_ESTAVEL.md).

## Desenvolvimento e verificação

Requer Node.js 22.x, sem dependências externas obrigatórias:

```bash
npm test
npm run build
npm run audit:deployment
npm run preview
```

Prévia: `http://localhost:4173`.

## Publicação

Substitua o conteúdo da raiz do repositório GitHub conectado à Vercel, preservando seu `.git`. No painel Vercel: Framework `Other`, Root Directory `./`, Build Command `npm run build`, Output Directory `dist`, Node 22.x. A pasta `dist/` será criada pelo build e não deve ser enviada ao GitHub.

O repositório deve conter `src/`, `tools/`, `tests/`, `docs/`, `.github/`, `package.json`, `vercel.json` e `.nvmrc`. O protótipo Godot foi retirado deste pacote web e pode ser mantido separadamente.

## Créditos

**IMMUNOVERSE Clinical | Imunologia Aplicada**

Desenvolvimento: **Vanessa Bertolucci** · Estágio Docente em Imunologia.

Supervisão docente: **Profa. Dra. Michelle Darrieux Bertoncini** · Curso de Imunologia - Medicina — Universidade São Francisco (USF).

*Ambiente educacional com casos clínicos simulados. Não substitui avaliação profissional ou supervisão docente.*

© 2026 · IMMUNOVERSE Clinical.
