# Redesign — Museu Vivo

## Auditoria
O contraste entre as salas era insuficiente: a mesma superfície clara dominava toda a visita. O hero dividia texto e cartaz em duas caixas equivalentes. Títulos, linhas e fotografias tinham escalas previsíveis, sem planos de profundidade. Acervo em cards aproximava a visita de um catálogo. A mesma animação de opacidade/translação se repetia.

## Sistema e composição
- Dark Plum #160F1D, Purple #81589D, Apricot #EDAF7A, Ivory #F8F0DF, Terracotta #A35F3E.
- Cormorant Garamond: nome monumental, datas, palavras e números das salas. DM Sans: leitura e controles.
- Grid editorial em 12 colunas, margens fluidas e fotografia como plano compositivo.
- Entrada: fotografia de margem a margem à direita e nome em duas linhas sobre o retrato. Uma ficha curta dá início à visita.
- Raízes: página de arquivo marfim. O ano e a linha do tempo ocupam a coluna oposta à fotografia documental.
- Escrevivência: campo roxo, palavra desmembrada e quatro palavras em diferentes posições.
- Acervo: plum, livros com presença física, legendas curtas e modal editorial claro.
- Vozes: colagem tipográfica em terracota, com palavras em diferentes planos e três perspectivas lado a lado com a composição.
- Legado: composição tipográfica ampla, linha em expansão e convite ao acolhimento.
- Acolhimento: marfim, títulos plum, sentimentos como lista tipográfica com estados selecionados.

## Movimento e verificação
GSAP mantém a navegação horizontal e define coreografias por sala (máscara, linha, translação tipográfica e parallax). Mobile usa snap e rolagem interna natural. Movimento reduzido leva à leitura vertical. Verificar desktop, tablet, celular, teclado, diálogos e todos os sentimentos antes de publicar. Preservar a audiência atual do Site.


## Revisão da versão editorial

A entrada tinha três textos de apresentação e competia com as legendas laterais. O retrato reaparecia em três salas. Os controles de acolhimento ficavam atrás do menu no celular e os rótulos secundários do carrossel tinham pouco contraste.

A revisão concentrou a entrada em nome, retrato e ação. O grid de 12 colunas usa espaçamento fluido, linhas de contraste distintas para fundos claros e escuros, e uma curva de movimento compartilhada. A composição de Vozes usa palavras sobrepostas, mantendo espaço para a leitura de cada perspectiva. O acolhimento ganhou acesso direto no cabeçalho móvel, alvos de 60 px para os sentimentos e retorno de foco às escolhas.
