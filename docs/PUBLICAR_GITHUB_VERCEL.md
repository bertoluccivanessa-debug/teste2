> **Atualização v3.3:** se o repositório `bertoluccivanessa-debug/immunoverse` já existe, siga o fluxo de atualização no `README.md`, sem `git init` ou `git remote add`. A saída da Vercel permanece `dist/`, não `site/`.

# IMMUNOVERSE 3.2 — Guia de publicação (GitHub + Vercel)

## Escolha o pacote certo

- `IMMUNOVERSE-v3.2.0-GITHUB-VERCEL-COMPLETO.zip`: projeto principal, incluindo `src/`, `dist/`, `docs/`, `tests/`, `godot/`, `package.json`, `.github/` e `vercel.json`. **Recomendado para GitHub + atualizações automáticas na Vercel.**
- `IMMUNOVERSE-v3.2.0-SITE-ESTATICO-VERCEL.zip`: site compilado. Possui `index.html`, JavaScript, CSS e imagens na raiz, além de um `vercel.json` estático. Use para hospedagem sem build, como alternativa. Não contém os testes/código-fonte separado.

> Importante: descompacte o arquivo. Para implantar uma aplicação pelo GitHub, envie **o conteúdo da pasta**, não o ZIP como um único arquivo.

## GitHub: criar e publicar o código

1. Entre em <https://github.com/new> e crie o repositório `immunoverse` (público apenas se houver direito de distribuição das ilustrações).
2. Extraia o ZIP completo para uma pasta local.
3. Se preferir o navegador: na página do repositório, **Add file → Upload files**, selecione os arquivos e pastas da **raiz** extraída. Verifique que `package.json`, `vercel.json`, `src/` e `.github/` estejam no nível superior do repositório. Caso o upload no navegador não preserve uma pasta oculta ou exceda os limites, use Git no terminal.
4. Alternativa terminal (dentro da pasta extraída):

   ```bash
   git init
   git add .
   git commit -m "feat: IMMUNOVERSE 3.2 com ImunoLab e melhorias de UX"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/immunoverse.git
   git push -u origin main
   ```

## Vercel: ligar ao repositório

1. Acesse <https://vercel.com/new>, selecione **Import Git Repository** e escolha `immunoverse`.
2. Configure:

   | Campo | Valor |
   |---|---|
   | Framework Preset | Other |
   | Root Directory | `./` (raiz) |
   | Install Command | Padrão / nenhum pacote externo |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Node.js | 22.x (ou outra versão compatível >= 20) |
   | Environment Variables | Nenhuma obrigatória |

3. Clique **Deploy**. A Vercel criará uma URL `*.vercel.app`. A integração Git gera novas prévias para branches/pull requests e publica `main` conforme as configurações de produção.
4. Não é necessário hospedar o servidor local de desenvolvimento; a Vercel entrega o conteúdo estático de `dist/`.

## Verificação após publicação

- Abra a página inicial no computador e no celular; confira as imagens dos cenários e a navegação inferior em telas pequenas.
- Abra **Cenários**, clique em um hotspot e inicie a missão vinculada.
- Durante uma missão, abra **ImunoLab**, execute as três etapas e experimente a condição de falha; volte à missão e confirme o progresso.
- Inicie outra missão sem terminar a anterior: deve aparecer um aviso de confirmação.
- Tente duas vezes o mesmo erro: ele não pode descontar pontos duas vezes.
- Complete uma missão, recarregue a página e confira em **Meu progresso** o XP e o relatório.
- Teste com `Ctrl+Shift+R` após atualizações: existe service worker/PWA e o navegador pode conservar recursos em cache.
- Recolha revisão docente e valide a permissão para reutilização/distribuição das ilustrações antes de divulgação institucional.

## Execução local

```bash
node --version  # 20+
npm test        # testes de conteúdo, motor e experiência
npm run build   # gera dist/
npm run dev     # http://localhost:4173
```

Não há dependências externas ou backend. Os dados do aluno são armazenados apenas em `localStorage` no dispositivo, com opção de exportar relatório CSV e backup JSON. A edição atual não oferece sincronização entre dispositivos, login ou painel docente centralizado.

## Privacidade e caráter didático

Missões representam casos fictícios e não fornecem diagnóstico individual. Os microsimuladores são esquemas causais e **não** reproduzem escala temporal, cinética real ou biologia celular quantitativa. Pontos de XP são indicadores de participação/desempenho no jogo, não medida validada de aprendizagem. Para pesquisa com estudantes, realizar avaliação ética e de privacidade conforme a instituição antes de coletar dados.
