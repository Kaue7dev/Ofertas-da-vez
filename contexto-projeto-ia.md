# Contexto do Projeto para Outra IA

## 1. Resumo executivo

O projeto **Ofertas da Vez** e uma aplicacao **Next.js 16 + React 19 + TypeScript + Tailwind CSS v4** com foco em **marketplace/vitrine de ofertas, cupons e descoberta de produtos** para o publico brasileiro.

No estado atual do codigo, o produto implementado e **uma experiencia de front-end curada e mockada**, centrada em duas paginas principais:

- a home, com hero, categorias e prateleiras de ofertas
- a pagina de explorar, com grade de cards e descoberta de catalogo

Hoje **nao existe backend proprio, API route, integracao real com parceiros, autenticacao, persistencia, busca funcional ou carrinho real**. A interface simula esse universo com dados mockados centralizados.

## 2. Como interpretar os documentos existentes

Ha arquivos de contexto antigos na raiz que ajudam a entender a ambicao do produto, mas **nao descrevem fielmente o estado atual da implementacao**.

- `contextoapp.md`: descreve uma visao antiga de assistente de compra e carrinho inteligente multi-loja. Isso **nao esta implementado** no app atual.
- `contexto .md`: descreve uma visao mais ampla de marketplace/editorial de ofertas. E util como direcao de marca/produto, mas ainda e mais ampla do que o codigo existente.
- `AGENTS.md`: e a fonte mais confiavel de diretrizes operacionais. Ele deixa claro que o app real e o projeto Next.js na raiz, com App Router, alias `@/*` apontando para `app/*` e foco em clareza, conversao e experiencia comercial.

Se outra IA precisar decidir entre documentacao antiga e codigo atual, deve **priorizar o codigo atual** e usar os documentos antigos apenas como contexto estrategico.

## 3. Stack e fundamentos tecnicos

- Framework: Next.js `16.2.2`
- UI: React `19.2.4`
- Linguagem: TypeScript em modo `strict`
- Estilo: Tailwind CSS v4 + tokens CSS em `app/globals.css`
- Animacao: `framer-motion`
- Icones: `lucide-react`
- Utilitarios de classe: `clsx`, `tailwind-merge`, `class-variance-authority`
- Lint: ESLint 9 com `eslint-config-next`

Scripts disponiveis:

- `pnpm dev`
- `pnpm build`
- `pnpm start`
- `pnpm lint`

## 4. Estrutura do repositorio

O repositorio e pequeno e centrado em um unico app Next.js na raiz.

```text
.
|- app/
|  |- components/
|  |- explorar/
|  |- hooks/
|  |- lib/
|  |- globals.css
|  |- layout.tsx
|  \- page.tsx
|- public/
|  \- brand/
|- AGENTS.md
|- contexto .md
|- contextoapp.md
|- contexto-projeto-ia.md
|- homepage-blueprint.md
|- next.config.ts
|- tailwind.config.ts
|- tsconfig.json
\- package.json
```

Leitura rapida por pasta:

- `app/`: codigo da aplicacao App Router.
- `app/components/`: componentes de UI e composicao das paginas.
- `app/components/ui/`: primitivas pequenas reutilizaveis, hoje `badge` e `button`.
- `app/explorar/`: rota `/explorar`.
- `app/lib/`: dados mockados e utilitarios compartilhados.
- `app/hooks/`: pasta existe, mas esta vazia no momento.
- `public/brand/`: ativos da marca, incluindo o logo usado em header e footer.
- arquivos `.md` da raiz: direcao de produto e contexto, com graus diferentes de atualizacao.

## 5. Separacao de rotas

O projeto usa **App Router** e hoje tem apenas rotas de pagina:

- `/` -> `app/page.tsx`
- `/explorar` -> `app/explorar/page.tsx`

Nao existem hoje:

- `app/**/route.ts`
- `middleware.ts`
- `app/api/*`
- areas autenticadas
- paginas de detalhe de oferta
- paginas de categoria
- paginas de loja/parceiro

### 5.1 Home (`/`)

A home e uma pagina enxuta de vitrine, composta por:

- `Header`
- `HeroBanner`
- `CategoryBar`
- `DealsSection` para "Ofertas em destaque"
- `DealsSection` para "Mais vendidos da semana"
- `Footer`
- `MobileNav`

Ela consome duas listas derivadas de dados mockados:

- `FEATURED_DEALS`
- `BEST_SELLERS`

### 5.2 Explorar (`/explorar`)

A pagina de explorar e um catalogo visual simples com:

- `Header`
- barra horizontal de categorias no topo
- grid de `ExploreCard`
- `MobileNav`

Ela consome:

- `HOME_CATEGORIES`
- `FEED_ITEMS`

O metadata da rota ja esta separado via `export const metadata`.

## 6. Separacao entre rotas, front e dados

O front esta relativamente bem separado para o tamanho atual do projeto.

### 6.1 Camada de rota

As rotas sao finas. Elas fazem composicao dos componentes e escolhem quais arrays de dados entram em cada tela.

Responsabilidade das paginas hoje:

- definir a composicao da tela
- importar os componentes necessarios
- injetar os dados mockados corretos
- definir metadata quando necessario

### 6.2 Camada de componentes

Os componentes em `app/components/` concentram layout, apresentacao e pequenas interacoes.

Principais componentes ativos:

- `Header`: cabecalho com logo, busca visual, links e menu mobile.
- `HeroBanner`: carrossel de banners promocionais com autoplay.
- `CategoryBar`: atalhos visuais por categoria.
- `DealsSection`: secao generica para prateleiras da home.
- `DealCard`: card de produto usado nas prateleiras da home.
- `ExploreCard`: card do grid da pagina explorar.
- `Footer`: fechamento institucional/comercial da home.
- `MobileNav`: navegacao fixa inferior no mobile.
- `BrandLogo`: wrapper reutilizavel do logo da marca.

Primitivas reutilizaveis em `app/components/ui/`:

- `button.tsx`
- `badge.tsx`

### 6.3 Camada de dados

Toda a base mockada relevante da home e da pagina explorar esta centralizada em `app/lib/home-data.ts`.

Esse arquivo concentra:

- tipos de dominio simples, como `HomeDeal`, `HomeCategory`, `FeedItem` e `PromoBanner`
- arrays base com dados mockados
- selecoes derivadas como `FEATURED_DEALS` e `BEST_SELLERS`
- banners promocionais do hero

Isso e importante: **o projeto ainda nao separa "mock data", "service layer" e "fetching"**. Tudo vive no mesmo arquivo, o que e adequado para o estagio atual, mas outra IA nao deve assumir que ja existe camada de dados real.

### 6.4 Camada de utilitarios

`app/lib/utils.ts` hoje contem basicamente `cn()`, para merge de classes Tailwind.

Nao existe ainda uma camada de helpers de negocio, validacao ou adaptadores de API.

## 7. Server components vs client components

O projeto mistura componentes de servidor e cliente de forma simples:

- `app/page.tsx` e `app/explorar/page.tsx` sao componentes de rota sem `"use client"`
- componentes com estado, animacao ou dependencia de navegacao usam `"use client"`

Componentes client-side identificados no estado atual:

- `Header`
- `HeroBanner`
- `DealCard`
- `ExploreCard`
- `FeedCard`
- `MobileNav`

Motivos para serem client-side:

- estado local de UI
- foco em input
- menu mobile
- favoritos locais mockados
- carrossel com timer
- leitura do pathname
- animacoes com `framer-motion`

O restante pode continuar server-side enquanto for apenas composicao/apresentacao sem estado.

## 8. Organizacao visual e sistema de estilos

O design system atual e leve, mas consistente.

### 8.1 Tokens globais

`app/globals.css` concentra:

- tokens de cor via CSS custom properties
- fontes globais
- raios e sombras
- utilitario `container`
- suporte a tema `.dark`

Paleta atual:

- fundo claro quente
- laranja forte como cor primaria
- tons neutros quentes
- verde para sucesso/cashback
- amarelo para highlight

### 8.2 Tipografia

As fontes sao carregadas em `app/layout.tsx` com `next/font/google`:

- `Sora` para headings
- `DM Sans` para corpo e fonte principal

### 8.3 Tailwind

`tailwind.config.ts` espelha os mesmos tokens com `extend`, mas o projeto tambem usa recursos do Tailwind v4 em `globals.css` via `@theme inline`.

Resumo pratico:

- tokens principais vivem em `globals.css`
- Tailwind config existe para manter compatibilidade e atalhos de tema
- componentes usam classes utilitarias diretamente

## 9. Navegacao e comportamento de interface

### 9.1 Header

O `Header` faz mais papel visual do que funcional:

- campo de busca existe, mas ainda nao busca nada
- botoes de favoritos, carrinho e entrar sao placeholders visuais
- menu mobile abre/fecha localmente
- links principais apontam para ancors da home e para `/explorar`

### 9.2 Mobile

`MobileNav` cria uma barra fixa inferior para navegacao rapida.

Para evitar sobreposicao, as paginas usam padding inferior (`pb-20`) no mobile.

### 9.3 Cards e interacoes mockadas

`DealCard`, `ExploreCard` e `FeedCard` fazem link externo para URLs placeholder (`example.com`).

Detalhes importantes:

- os favoritos sao apenas estado local em memoria
- nao ha persistencia
- nao ha tracking implementado
- nao ha regras de afiliacao reais ainda

## 10. Ativos, imagens e midia

- o logo oficial esta em `public/brand/offertas-da-vez-logo.svg`
- os cards usam imagens remotas, principalmente de `images.unsplash.com`
- `next.config.ts` libera `via.placeholder.com` e `images.unsplash.com`
- mesmo com `remotePatterns`, os componentes de imagem estao usando `unoptimized`

Esse ultimo ponto significa que a configuracao de imagens existe, mas a otimizacao do Next ainda nao esta sendo aproveitada nesses cards.

## 11. O que esta ativo vs legado

### Ativo e usado nas paginas

- `Header`
- `HeroBanner`
- `CategoryBar`
- `DealsSection`
- `DealCard`
- `ExploreCard`
- `Footer`
- `MobileNav`
- `BrandLogo`
- `app/lib/home-data.ts`

### Existe no repositorio, mas hoje parece legado ou nao conectado

- `DiscoveryFeed.tsx`
- `FeedCard.tsx`

Esses componentes formam uma experiencia de feed mais editorial, mas nao sao importados pelas rotas atuais.

## 12. Limites atuais do projeto

Outra IA deve assumir que este projeto esta em fase inicial/intermediaria de front-end e que varias capacidades ainda nao existem.

Coisas que **nao** existem hoje no codigo:

- backend da aplicacao
- API interna do Next
- integracao real com afiliados/parceiros
- persistencia de favoritos
- autenticacao
- conta de usuario
- busca funcional
- filtros reais
- ordenacao real
- pagina de produto/oferta
- pagina de categoria
- pagina de loja
- analytics/eventos
- estado global
- providers compartilhados
- hooks customizados ativos

## 13. Como outra IA deve trabalhar neste repositorio

Boas suposicoes:

- tratar o projeto como uma base de **front-end comercial de ofertas**, nao como comparador multi-loja pronto
- manter App Router e componentes pequenos
- reutilizar `app/lib/home-data.ts` enquanto os dados forem mockados
- preferir evolucoes incrementais, sem criar camadas complexas antes de haver necessidade real
- respeitar os tokens e a linguagem visual ja definida em `globals.css`
- manter o tom comercial, claro e brasileiro

Maus pressupostos para evitar:

- assumir que o produto ja possui carrinho inteligente funcional
- assumir que a busca do header e real
- assumir que botoes de favoritos/carrinho/login ja estao conectados
- assumir que `contextoapp.md` descreve o estado real da implementacao
- assumir que ja existe backoffice, CMS ou ingestao de feed

## 14. Melhor ponto de partida para futuras tarefas

Se outra IA precisar entender ou modificar o projeto, a ordem mais util de leitura e:

1. `AGENTS.md`
2. `package.json`
3. `app/layout.tsx`
4. `app/page.tsx`
5. `app/explorar/page.tsx`
6. `app/lib/home-data.ts`
7. `app/components/`
8. `app/globals.css`

## 15. Resumo final em uma frase

**Ofertas da Vez, no estado atual do repositorio, e uma vitrine front-end de ofertas e descoberta de produtos, feita em Next.js App Router, com dados mockados centralizados, duas rotas publicas principais e uma arquitetura simples separando composicao de pagina, componentes visuais e base de dados ficticia.**