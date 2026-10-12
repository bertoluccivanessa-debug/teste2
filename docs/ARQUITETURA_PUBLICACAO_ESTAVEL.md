# IMMUNOVERSE Clinical 5.5 — Arquitetura estável GitHub → Vercel

Este é um projeto **HTML5 / JavaScript ES Modules estático**. Não necessita Vite, Next.js, React ou banco de dados para os módulos atuais.

## Estrutura canônica do projeto web

```text
./
├── package.json      ← configuração dos scripts; Node.js 22
├── vercel.json       ← build command e pasta de saída
├── .nvmrc            ← Node.js 22
├── src/              ← única fonte do website
│   ├── index.html    ← entrada HTML
│   ├── app.js        ← navegação / interações
│   ├── consultation.js   ← conteúdo científico do atlas e da hematopoiese
│   ├── morphology.js     ← ilustrações vetoriais celulares
│   ├── clinical-v54.css  ← estilos responsivos e hematopoiese
│   ├── causal-lab.js / causal-view.js
│   └── assets/
├── tests/            ← testes de regressão
├── tools/            ← scripts de compilação e verificação
├── docs/             ← documentação
└── .github/workflows/verify.yml
```

A pasta `dist/` é **gerada automaticamente** por `npm run build`; não deve ser enviada ao repositório GitHub. O protótipo Godot também não participa do build web e é distribuído separadamente para reduzir confusão.

## Parâmetros Vercel

| Configuração | Valor |
|---|---|
| Framework Preset | Other |
| Root Directory | `./` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node.js | 22.x |
| Production Branch | `main`, se configurada no GitHub |

O arquivo `vercel.json` da raiz já especifica build e output. Alterações no painel devem respeitar esses valores.

## Validação local e automática

```bash
npm test
npm run build
npm run audit:deployment
```

O comando `npm run build` executa primeiro `npm test` e só copia `src/` para `dist/` após passar nos testes. O audit confirma a estrutura esperada e os recursos referenciados no resultado da compilação.

## Como atualizar SEM criar um segundo projeto

1. Salve uma cópia de segurança de eventuais mudanças feitas diretamente no GitHub depois desta versão.
2. Extraia o ZIP de código-fonte e **copie seu conteúdo para a raiz** do repositório existente (não uma subpasta com nome do ZIP).
3. Preserve a pasta `.git` se trabalhar via clone local. Não envie `dist/` nem o ZIP para o repositório.
4. Faça commit em `main` (caso seja a branch vinculada à produção).
5. Confira Vercel → Deployments → **Production / Ready**.
6. Abra o **domínio de produção**, em janela anônima, e valide Atlas → Hematopoiese, navegação móvel, ImunoLab e Laboratório Causal.

### Interpretando o erro

- **`No Output Directory named dist found`**: Root Directory, build command ou instalação de Node estão incorretos; confirme que o log executou `npm run build` na raiz.
- **`Module not found`, `Failed to load module script`, MIME `text/html` para `.js`**: arquivos de `src/` ausentes ou deployment antigo/rotas indevidas. Execute `npm run audit:deployment` localmente e verifique os requests do navegador.
- **`404: NOT_FOUND`**: o domínio pode apontar para outra implantação ou build sem `dist/index.html`.
- **Tela de autenticação Vercel (`sso-api`)**: Deployment Protection; não é corrigível mudando o arquivo ZIP.
- **Tela antiga após deploy Ready**: conferir domínio de produção, limpar cache PWA/Service Worker e recarregar.

O uso institucional exige revisão científica e teste manual de navegadores e dispositivos. Testes automatizados não simulam navegação real no ambiente local desta execução.
