# IMMUNOVERSE Clinical 5.5 — Publicação corrigida (GitHub + Vercel)

## QUAL ZIP USAR?

- **IMMUNOVERSE-CLINICAL-v5.5-CORRIGIDO-GITHUB.zip** — para o repositório GitHub conectado à Vercel. Contém `src/`, `tools/`, `tests/`, `.github/`, `package.json`, `vercel.json`, `docs/` e `godot/`. Não inclui `dist/`: a Vercel o gera automaticamente a cada commit.
- **IMMUNOVERSE-CLINICAL-v5.5-CORRIGIDO-VERCEL-ESTATICO.zip** — para upload estático sem GitHub/build, caso necessário. Contém `index.html` e assets na raiz.

Não faça upload do ZIP dentro do próprio repositório como se fosse um site. **Extraia e envie as pastas e arquivos contidos nele.**

## Atualizar o repositório GitHub existente

1. Abra o repositório conectado ao projeto Vercel correto. Confirme no painel Vercel > Project > Settings > Git o repositório e a branch de produção.
2. Faça backup ou crie uma branch antes de substituir arquivos existentes.
3. Extraia o ZIP **GITHUB** e copie **o conteúdo extraído** para a **raiz do repositório**, onde devem ficar `package.json`, `vercel.json`, `src/index.html` e `.github/workflows/verify.yml`.
4. Faça commit para a branch de produção configurada na Vercel (frequentemente `main`). Verifique se os testes do GitHub Actions passam.
5. Quando receber o novo deployment no painel Vercel, confira status **Ready** e ambiente **Production**.

> Não crie um novo projeto Vercel se o repositório já está conectado corretamente. Não use `git push --force` nem apague `.git`.

## Configuração do projeto na Vercel

| Campo | Valor correto |
|---|---|
| Framework Preset | **Other** |
| Root Directory | **`./`** (a raiz onde se encontra o `package.json`) |
| Build Command | **`npm run build`** |
| Output Directory | **`dist`** |
| Install Command | **Padrão** (sem dependências externas) |
| Node.js | **22.x** (>= 20) |
| Production Branch | **a mesma branch utilizada no GitHub** (`main`, se configurada assim) |

A configuração raiz `vercel.json` já define o build e a pasta `dist`. Não marque `src` nem `dist` como **Root Directory**: isso rompe o caminho de `package.json` e da configuração do projeto.

## Se a URL solicitar login Vercel

Isso **não é erro HTML/JavaScript**. A mensagem de login pode vir da configuração de proteção do deployment.

- Consulte **Vercel > Project > Settings > Deployment Protection**.
- No modo **Standard Protection**, previews normalmente ficam protegidos; use o **domínio de produção** em `Settings > Domains` ao compartilhar com alunos.
- Uma URL individual como `projeto-abcdef-equipe.vercel.app` pode apontar para um **preview** protegido, mesmo quando a produção está pública.
- Não desative a proteção indiscriminadamente. Decida primeiro se o site deve ser público ou privado, e confirme o ambiente do deployment.

`vercel.json` não desativa nem contorna a proteção de acesso gerida pela conta Vercel.

## Se aparecer 404, tela branca ou versão antiga

- **404**: verifique Root Directory `./`, Output Directory `dist`, `dist/index.html` gerado e o deployment em `Ready`.
- **Tela branca**: no console do navegador, verifique se algum `.js` ou `.css` retorna 404 ou `text/html` em vez do MIME adequado. O service worker desta versão não mascara mais faltas de JavaScript com o HTML principal.
- **Versão antiga**: confirme que está abrindo o domínio de **Production**, faça recarga forçada e, se necessário, limpe apenas o cache do site; o progresso local pode ser perdido se limpar todos os dados.
- **Novo commit sem publicar**: confira em Project > Settings > Git se o repositório e a branch de produção correspondem aos atualizados.

## Como testar localmente

```bash
node --version  # >= 20
npm test
npm run build
npm run preview
```

Acesse `http://localhost:4173`. A versão compilada pode ser verificada com `npm run verify:static`.

## Limitações de verificação

A validação nesta versão inclui testes unitários, verificação de recursos locais e build. Testes visuais em navegador não substituem homologação no endereço final. Progresso/XP permanecem no `localStorage` do navegador; não há servidor de notas ou autenticação institucional.
