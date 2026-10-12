# IMMUNOVERSE — Da Molécula ao Paciente

Protótipo educacional em Godot 4 para investigação de mecanismos imunológicos por meio de casos clínicos.

## Interface implementada

A primeira versão do **Quadro de Casos Clínicos** já inclui:

- painel do paciente e sinais observados;
- evidências laboratoriais e mecanismos imunológicos;
- fluxo acessível de seleção evidência → mecanismo;
- validação de conexões corretas e feedback pedagógico para hipóteses incorretas;
- dicas com impacto apenas na recompensa de XP;
- separação entre XP e domínio pedagógico;
- dois casos clínicos em português brasileiro;
- progresso local salvo em `user://immunoverse_progress.json`;
- layout responsivo baseado em `Control`, `Container` e `PanelContainer`.

## Executar localmente

```bash
godot --path .
```

Checagens automatizadas:

```bash
npm run check
npm run build
npm run preview:status
```

## Estrutura

- `scenes/main.tscn`: cena principal;
- `scripts/immunoverse_main.gd`: controlador da interface e fluxo de investigação;
- `scripts/game/immuno_catalog.gd`: casos, evidências e relações corretas;
- `scripts/game/progression_service.gd`: cálculo de XP;
- `scripts/game/pedagogical_assessment.gd`: avaliação de domínio conceitual;
- `autoload/save_store.gd`: persistência local.

A exportação web para `site/` e a publicação no GitHub/Vercel ficam para a etapa seguinte, após validação visual no Preview.
