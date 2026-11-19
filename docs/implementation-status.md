# Registro da implementação

Plano: docs/superpowers/plans/2026-11-19-museu-vivo.md

- Conteúdo e navegação: completos; testes automatizados passaram após falha inicial por módulo ausente.
- Seis salas, linha do tempo e detalhes de obras: completos.
- ScrollTrigger, alternativas nativas e leitura vertical: implementados.
- Acolhimento e fontes: completos; sem coleta de dados.
- Revisão independente: cinco problemas de navegação/foco identificados e corrigidos (resize, transferência de foco, progresso vertical, coordenadas dos livros e retorno à entrada).
- Redesign: o Figma passa a ser referência de arquitetura. Novas composições e paleta implementadas em `src/art-direction.css`.
- Acervo: capas Pallas verificadas por título/ISBN, com origem registrada em `#fontes`.
- Publicação: preservar a audiência encontrada no Site na atualização (pública); código na branch de trabalho do repositório.
- Verificação visual: desktop, 390px e 768px, detalhes de livro, sentimentos e leitura vertical.
- Limite: sem teste em hardware móvel real ou leitor de tela.

## Redesign editorial
- Nova paleta obrigatória aplicada; a direção antiga do Figma passou a servir apenas como arquitetura conceitual.
- Seis composições reconstruídas; capas reais Pallas integradas e creditadas.
- Coreografias GSAP por sala, entrada por máscara e leitura vertical preservada.
- Acolhimento claro, sentimentos tipográficos, conteúdo e privacidade preservados.
- Validação: desktop 1363px, celular 390px e tablet 768px; navegação de salas, diálogo de obra, sentimentos, teclado e redução de movimento.
- Corrigido deslocamento horizontal nativo do contêiner oculto ao focar obras; o contêiner fixado usa overflow: clip.
- Corrigido conflito entre o pin-spacer do GSAP e a inserção do painel de acessibilidade pelo React, usando um contêiner de visualização estável.
- Audiência atual consultada no serviço: pública. Preservar durante a atualização.
