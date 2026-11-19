# Museu Vivo — Conceição Evaristo

Exposição literária em seis salas, com animação horizontal ligada ao scroll, navegação por teclado, leitura vertical e acolhimento emocional antirracista.

## Executar

Requer Node.js 22 ou superior.

```sh
npm ci
npm run dev
npm test
npm run build
```

O build estático é gerado em `dist/`. Qualquer hospedagem de arquivos estáticos pode servi-lo. A navegação usa hashes e não requer regras de redirecionamento.

## Organização

- `src/Museum.tsx`: salas, ScrollTrigger, linha do tempo e obras.
- `src/Support.tsx`: sentimentos e orientações, sem envio ou persistência de dados.
- `src/content.ts`: textos e fontes públicas.
- `src/navigation.mjs`: limites de navegação e respostas de acolhimento.
- `src/styles.css`: identidade, responsividade e movimento reduzido.

O museu usa scroll horizontal nativo em telas menores e pinning GSAP em desktop. As opções de acessibilidade permitem leitura vertical e redução de movimento. A área de acolhimento usa navegação convencional. Não há analytics, cadastro, API de IA ou coleta de relatos.

## Referências e créditos

Design: https://www.figma.com/design/zxyDcjBjpF1ftE0CwEI05B

Fotografia: Fora do Eixo / Festival Latinidades 2013. Arquivo original: https://commons.wikimedia.org/wiki/File:ConceicaoEvaristo.jpg — CC BY-SA 2.0. A cópia WebP foi redimensionada; seu recorte visual é feito em CSS. Licença: https://creativecommons.org/licenses/by-sa/2.0/

As fichas tipográficas dos livros são arte editorial própria, não capas oficiais. Textos de reflexão e títulos editoriais não são citações da autora. A página `#fontes` registra as fontes de pesquisa e de apoio, consultadas em 19/11/2026.

## Validação

Build TypeScript/Vite e testes de navegação e conteúdo. Inspeção no navegador em desktop e em áreas de 390 e 768 pixels: entrada, navegação de salas, detalhes de livros, acesso ao acolhimento e seleção de sentimentos. Também conferida a alternativa de leitura vertical. Gestos em aparelho físico e auditoria com leitor de tela não foram executados.
