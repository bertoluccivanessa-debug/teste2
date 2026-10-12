# Notas de atualização — v3.2.0

## Navegabilidade

- Mantidas as 10 áreas temáticas, 42 missões, oito cenários e 16 personagens da versão 3.0.
- Atalho para o ImunoLab na página inicial, no menu principal e nas missões.
- Retorno ao caso a partir do ImunoLab preserva sessão ativa.
- Antes de trocar uma missão em andamento, o jogo solicita confirmação, evitando perda acidental de respostas.
- Melhorias de foco e indicações de estados dos botões da interface.

## Interação científico-pedagógica

- Três experimentos interativos guiados: fagocitose, peptídeo–MHC II/TCR/coestimulação e epítopo–parátopo de IgG.
- Cada experimento tem três etapas causais e uma intervenção experimental que interrompe a consequência.
- Feedback explicativo distingue reconhecimento, processamento/internalização e efeito funcional.
- Tentativas idênticas incorretas não são contabilizadas repetidas vezes na mesma etapa.
- Sessões antigas continuam legíveis após a migração do formato de salvamento.

## Publicação

- Build estático sem bibliotecas de terceiros (`npm run build` → `dist/`).
- Vercel com `vercel.json` na raiz do repositório; Github Actions com testes e build em push/PR.
- Arte ilustrada WebP, SVG, CSS e Javascript presentes no pacote, sem depender de URLs de imagem de terceiros.

## Estado de validação

Os 15 testes automatizados foram executados e passaram. O build estático gerou a pasta `dist/`. **Recomenda-se teste gráfico manual em desktop e celular depois do deploy**; esta versão não afirma ter sido aprovada por revisão editorial/científica externa nem avaliada em estudo pedagógico.
