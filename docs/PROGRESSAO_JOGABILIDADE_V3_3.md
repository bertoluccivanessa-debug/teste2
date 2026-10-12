# IMMUNOVERSE v3.3 — Jogabilidade, engajamento e XP

## Objetivo pedagógico

A lógica de engajamento prioriza recuperação ativa, interpretação causal e feedback explicativo. XP, níveis, combos e insígnias representam **participação em atividades do jogo**, não competência clínica validada. Não há rankings públicos, pressão de tempo, perda de XP por ausência, publicidade nem envio de dados.

## O que foi adicionado

| Componente | Interação do estudante | Feedback/recompensa |
|---|---|---|
| Central de objetivos | Selecionar uma missão diária, revisar uma trilha ou iniciar uma ronda | Progresso visível e CTA explícita |
| Ronda Relâmpago | Responder a cinco perguntas escolhidas de cinco mundos | Feedback por alternativa; 8 XP por resposta correta na primeira ronda do dia, máximo 40 XP/dia |
| Missão do dia | Concluir a missão vinculada à data local | 30 XP uma vez por dia, mesmo se a missão já tiver sido concluída antes |
| ImunoLab | Concluir processo normal e observar falha causada por perturbação | 12 XP uma vez por combinação (simulador × condição), máximo vitalício 72 XP |
| Níveis | Observar XP total e barra para o próximo nível | 80 × (nível−1) + 35 × (nível−1)² é o limiar acumulado de XP de cada nível |
| Conquistas | Realizar missões, revisão, experimento comparativo e consistência | 13 insígnias, sem XP extra para evitar loops de recompensa |
| Guia personagem | Ativar uma pista contextual, gratuita, uma vez por missão | Andaimagem cognitiva, sem revelar a resposta, sem desconto de pontos |
| Combo da ronda | Acertar questões seguidas | Reforço visual; não altera os limites de XP |
| Trilha prioritária | Escolher um mundo para estudar | Recomendação de caso pendente ou revisão com nota inferior a 75 |

## Regras anticontagem duplicada

1. XP de missão clínica continua sendo creditado somente pelo **melhor registro** da missão. Uma repetição com nota igual ou inferior não cria XP adicional, mesmo que a tela exiba a nova pontuação formativa.
2. A recompensa de missão diária é computada no momento em que a missão se encerra. O ID da missão e a data local são verificados; clicar repetidamente não produz XP.
3. Uma ronda pode ser repetida livremente para aprender, mas apenas a primeira rodada concluída no dia concede XP. Não é necessário acertar todas as questões.
4. Em cada ImunoLab, a conclusão do controle e a observação efetiva de uma falha são condições independentes, recompensadas uma única vez na vida do perfil.
5. Salvar os arquivos, recarregar a página ou rever dicas não gera XP adicional.

**Limite**: toda persistência é local (`localStorage`), portanto as regras desestimulam farming casual, mas **não** protegem contra manipulação deliberada do relógio ou dos dados do navegador. Para avaliações com notas oficiais ou rankings públicos seria necessário backend autenticado, trilhas de auditoria e validação docente.

## Preservação de progresso

A chave `immunoverse.play.v2` foi mantida para carregar progresso antigo. Registros de missão, melhor nota, XP acumulado e sessão ativa são preservados. A estrutura `rewards` é adicionada automaticamente a perfis novos e migrados. Não apague o `localStorage` nem altere a chave. Um backup JSON continua disponível na tela Progresso, mas não existe ainda uma função de importação na interface.

## Roteiro curto de verificação manual

1. Abra o site em um navegador com dados antigos: as missões previamente concluídas e a investigação ativa devem permanecer.
2. Na home, abra a Ronda; responda às 5 questões; verifique a explicação científica e o XP. Refaça a ronda e confirme que o XP não duplica.
3. Conclua a missão diária e confira o bônus de 30 XP; repita a missão para confirmar que não há outro bônus naquele dia.
4. No ImunoLab, complete a condição normal; repita; depois introduza a falha e observe a etapa bloqueada. Confirme 12 XP por condição inédita, sem duplicação.
5. Abra Progresso e confira nível, insígnias, sequência de prática e registros anteriores.
6. No celular, teste toque, orientação, rolagem e navegação inferior com seis destinos. Use leitor de tela e `prefers-reduced-motion` quando disponíveis.
7. Recarregue o site e confira persistência e atualização do service worker após novo deploy.

## Ensino formal

Todas as situações clínicas são fictícias. A nota do jogo e a gamificação não devem substituir instrumentos de avaliação da instituição ou ser interpretadas como evidência de competência médica. Recomenda-se avaliação docente da precisão clínica e estudo piloto de usabilidade e aprendizagem antes da adoção curricular.
