# Refinamento local — Museu Vivo

## Escopo e referência

Alterações sobre a cópia da `main` de `OtavioNotFound/antiracismo`, obtida em
19/11/2026. O refinamento não altera a hospedagem; o envio ao GitHub é feito
separadamente por pull request, sem deploy.
O Figma `zxyDcjBjpF1ftE0CwEI05B` foi consultado por metadados: entrada,
conceito, acervo, acolhimento e orientações de movimento. Foi usado como
referência de conteúdo e arquitetura, conforme o pedido.

As seis salas, os textos educativos, os três livros, os cinco sentimentos,
as fontes biográficas e os créditos documentais foram preservados.

## Diagnóstico e direção

Não foi possível abrir o navegador neste ambiente. O diagnóstico abaixo vem
da leitura dos estilos e da inspeção do arquivo fotográfico, não de screenshots:

1. Entrada: escala e sobreposição do nome, retrato escurecido e ação discreta.
2. Leitura: legendas e controles de 9–12 px em várias salas.
3. Ritmo: regras responsivas sobrepostas e pouco espaço reservado às legendas.

Direção: **livro-exposição**. O nome e o retrato formam um cartaz de abertura;
Raízes funciona como uma página de arquivo. Escrevivência explora duas escalas
tipográficas, Acervo dá espaço físico às capas, Vozes usa uma colagem e Legado
encerra com uma frase ampla. O acolhimento mantém o marfim e uma leitura calma.

## Skills e decisões

- `frontend-design`: título como composição, hierarquia editorial assimétrica,
  duas famílias tipográficas, diferenciação entre salas e revisão em duas passagens.
- `gsap-core`, `gsap-timeline`: entrada coordenada por um marcador de timeline;
  remoção dos estilos transitórios após a revelação.
- `gsap-scrolltrigger`: percurso horizontal linear, movimentos discretos por sala,
  preservação do swipe nativo e da leitura vertical.
- `gsap-react`, `gsap-performance`: manutenção da limpeza de contextos,
  preferência por transformações, sem movimento decorativo contínuo.
- `vercel-react-best-practices`: conteúdo estático continua nos módulos existentes;
  nenhuma dependência de produção adicionada.

As outras skills solicitadas (`design-taste-frontend`, `impeccable`,
`ui-ux-pro-max`, `design-system`, `brand`, `ui-styling`) não foram encontradas
na instalação atual. As skills de frontend/GSAP consultadas não traziam scripts
de auditoria adequados a executar neste projeto.

## Segunda passagem

- Reserva de espaço para legenda do retrato na composição móvel.
- Cabeçalho do acervo em uma linha no desktop e capas adaptadas à altura da tela.
- Reforço do foco nos livros e sentimentos; sentimentos com alvos de 64 px.
- Seleção dos sentimentos indicada por superfície escura, contraste e sublinhado.
- Cálculo de contraste: marfim/ameixa **16,53:1**, marfim/roxo **4,85:1**,
  ameixa/damasco **9,83:1**. Terracota/marfim dá **4,34:1**, por isso textos
  pequenos nessas superfícies passaram a usar ameixa ou roxo.

## Verificação realmente executada

| Verificação | Resultado |
| --- | --- |
| `npm test` | Bloqueado pelo host: `spawn EPERM` ao iniciar o processo de teste. |
| `npm run build` | TypeScript concluiu; Vite bloqueado ao iniciar esbuild: `spawn EPERM`. |
| `node --test --test-isolation=none tests/navigation.test.mjs` | 3 testes passaram. |
| `node node_modules/typescript/bin/tsc --noEmit` | Passou. |
| Build Vite alternativo, com transpile TypeScript no mesmo processo | Passou; gerou `dist/`. Não equivale ao build padrão: sem minificação esbuild. |
| HTTP da prévia e do retrato | Respostas 200. |
| Playwright/Chrome | Não iniciou: `spawn EPERM`; execução direta do Chrome também retornou acesso negado no IPC. |

**Pendentes:** capturas em 1440 × 900, 1920 × 1080, 768 × 1024 e 390 × 844;
inspeção visual; navegação, diálogos, sentimentos, swipe e movimento reduzido
no navegador; auditoria axe. Não há screenshots fabricados nem resultados
de interação declarados como aprovados.

## Prévia e comparação

Os auxiliares abaixo são artefatos locais da sessão, fora deste repositório.
Na pasta pai do projeto, eles permitem:

```powershell
node .qa-tools/local-preview.mjs --build
node .qa-tools/local-preview.mjs --serve-only
# Em outro terminal:
node .qa-tools/serve-review.mjs
```

- Site: `http://127.0.0.1:4173/`
- Antes/depois interativo: `http://127.0.0.1:4174/review/`

O antes usa um build preservado da versão original. A comparação permite
selecionar as quatro dimensões e cada sala; não é uma galeria de screenshots.
`../review/browser-checks.mjs` prepara capturas e verificações para um ambiente
com permissão de iniciar o Chrome. O relatório atual registra a falha de lançamento.

Em um terminal sem as restrições deste host, o fluxo normal continua sendo
`npm ci`, `npm test`, `npm run build` e `npm run dev`. A configuração e as
dependências de produção do projeto não foram alteradas para contornar o host.
