# Changelog — 3.3.0

- Central de objetivos na tela inicial e na estação de progresso, com missão do dia, Ronda Relâmpago e estudo priorizado.
- Ronda de 5 questões interativas em 5 mundos distintos, com embaralhamento determinístico por data, feedback de alternativa, combo visual e XP diário limitado.
- Níveis progressivos com títulos e barra de XP, 13 conquistas com critérios descritivos, acompanhamento de prática recorrente sem punição por ausência.
- Pistas contextuais gratuitas dos guias, limitadas a uma por missão.
- Bônus de XP por conclusão de controle ou perturbação no ImunoLab, sem contagem dupla.
- Premiação da missão do dia somente ao finalizar o caso vinculado à data; repetição de missões mantém o melhor registro e só concede diferenças positivas de XP base.
- Feedback de XP no relatório e notificações de recompensa, objetivo explícito em cada fase e indicação de ganho estimado ao concluir.
- Elenco completo recolhível na home para facilitar descoberta das opções de jogo.
- `src/gamification.js`, atualização da lista offline no `src/sw.js` e documentação de regras e limitações.
- Compatibilidade com `localStorage` antigo preservada.
- Oito testes automatizados adicionais de progressão, antifarming, migração e interface (23 no total).
