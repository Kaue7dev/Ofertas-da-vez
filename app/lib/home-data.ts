export type HomeDeal = {
  id: string
  title: string
  store: string
  category: string
  image: string
  originalPrice: number
  salePrice: number
  discount: number
  installment: string
  shipping: string
  href: string
  cashback?: number
  coupon?: string
  badge?: string
}

export type HomeCategory = {
  label: string
  description: string
  offerCount: string
  href: string
  icon:
    | "smartphone"
    | "monitor"
    | "home"
    | "shirt"
    | "sparkles"
    | "baby"
    | "dumbbell"
    | "utensils"
}

export type PromoBanner = {
  title: string
  subtitle: string
  cta: string
  href: string
  bg: string
  eyebrow?: string
}

export const HOME_CATEGORIES: HomeCategory[] = [
  {
    label: "Eletrônicos",
    description: "celulares, TVs e áudio",
    offerCount: "340+ ofertas",
    href: "#ofertas-destaque",
    icon: "smartphone",
  },
  {
    label: "Informática",
    description: "notebooks e acessórios",
    offerCount: "210+ ofertas",
    href: "#mais-vendidos",
    icon: "monitor",
  },
  {
    label: "Casa e cozinha",
    description: "eletroportáteis e utilidades",
    offerCount: "290+ ofertas",
    href: "#ofertas-destaque",
    icon: "home",
  },
  {
    label: "Moda",
    description: "tênis, roupas e acessórios",
    offerCount: "180+ ofertas",
    href: "#ofertas-destaque",
    icon: "shirt",
  },
  {
    label: "Beleza",
    description: "skincare e perfumaria",
    offerCount: "130+ ofertas",
    href: "#ofertas-destaque",
    icon: "sparkles",
  },
  {
    label: "Bebês",
    description: "fraldas e itens de rotina",
    offerCount: "95+ ofertas",
    href: "#mais-vendidos",
    icon: "baby",
  },
  {
    label: "Esportes",
    description: "treino, corrida e fitness",
    offerCount: "120+ ofertas",
    href: "#ofertas-destaque",
    icon: "dumbbell",
  },
  {
    label: "Mercado",
    description: "rotina com economia",
    offerCount: "80+ ofertas",
    href: "#mais-vendidos",
    icon: "utensils",
  },
]

const HOME_DEALS: HomeDeal[] = [
  {
    id: "iphone-15",
    title: "iPhone 15 Apple 128GB com tela Super Retina XDR",
    store: "Amazon",
    category: "Eletrônicos",
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=900&h=900&fit=crop",
    originalPrice: 5799,
    salePrice: 4999,
    discount: 14,
    installment: "10x de R$ 499,90 sem juros",
    shipping: "Frete grátis",
    href: "https://example.com/oferta/iphone-15",
    cashback: 4,
    badge: "Loja oficial",
  },
  {
    id: "airfryer-mondial",
    title: "Air Fryer Mondial Family Inox 8L com painel digital",
    store: "Magalu",
    category: "Casa e cozinha",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=900&h=900&fit=crop",
    originalPrice: 699.9,
    salePrice: 459.9,
    discount: 34,
    installment: "9x de R$ 51,10 sem juros",
    shipping: "Retire hoje",
    href: "https://example.com/oferta/airfryer-mondial",
    cashback: 8,
    coupon: "AIR20",
  },
  {
    id: "notebook-lenovo",
    title: "Notebook Lenovo IdeaPad Ryzen 7 16GB SSD 512GB",
    store: "Mercado Livre",
    category: "Informática",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&h=900&fit=crop",
    originalPrice: 4299,
    salePrice: 3499,
    discount: 19,
    installment: "12x de R$ 291,58 sem juros",
    shipping: "Chega amanhã",
    href: "https://example.com/oferta/notebook-lenovo",
    badge: "Mais vendido",
  },
  {
    id: "tv-samsung",
    title: "Smart TV Samsung Crystal UHD 50\" 4K com Gaming Hub",
    store: "Amazon",
    category: "Eletrônicos",
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=900&h=900&fit=crop",
    originalPrice: 3199,
    salePrice: 2399,
    discount: 25,
    installment: "10x de R$ 239,90 sem juros",
    shipping: "Frete grátis",
    href: "https://example.com/oferta/tv-samsung",
    cashback: 6,
  },
  {
    id: "jbl-tune",
    title: "Fone Bluetooth JBL Tune 520BT com bateria de longa duração",
    store: "Shopee",
    category: "Áudio",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&h=900&fit=crop",
    originalPrice: 349,
    salePrice: 189.9,
    discount: 46,
    installment: "3x de R$ 63,30 sem juros",
    shipping: "Frete reduzido",
    href: "https://example.com/oferta/jbl-tune",
    cashback: 10,
    coupon: "JBL20OFF",
  },
  {
    id: "nespresso",
    title: "Cafeteira Nespresso Essenza Mini preta com aeroccino",
    store: "Magalu",
    category: "Casa e cozinha",
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=900&h=900&fit=crop",
    originalPrice: 649.9,
    salePrice: 489.9,
    discount: 25,
    installment: "8x de R$ 61,23 sem juros",
    shipping: "Entrega em 2 dias",
    href: "https://example.com/oferta/nespresso",
    badge: "Cozinha em alta",
  },
  {
    id: "olimpikus-corre",
    title: "Tênis Olympikus Corre 4 masculino para corrida urbana",
    store: "Netshoes",
    category: "Moda",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&h=900&fit=crop",
    originalPrice: 599.9,
    salePrice: 379.9,
    discount: 37,
    installment: "7x de R$ 54,27 sem juros",
    shipping: "Frete grátis no app",
    href: "https://example.com/oferta/olimpikus-corre",
    coupon: "CORRE15",
  },
  {
    id: "kit-principia",
    title: "Kit Principia skincare com sérum vitamina C + niacinamida",
    store: "Amazon",
    category: "Beleza",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&h=900&fit=crop",
    originalPrice: 229.9,
    salePrice: 169.9,
    discount: 26,
    installment: "3x de R$ 56,63 sem juros",
    shipping: "Chega amanhã",
    href: "https://example.com/oferta/kit-principia",
    cashback: 5,
  },
  {
    id: "cadeira-ergonomica",
    title: "Cadeira ergonômica mesh com apoio lombar e braço 3D",
    store: "Mercado Livre",
    category: "Home office",
    image:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=900&h=900&fit=crop",
    originalPrice: 1299.9,
    salePrice: 1019.9,
    discount: 22,
    installment: "10x de R$ 101,99 sem juros",
    shipping: "Chega amanhã",
    href: "https://example.com/oferta/cadeira-ergonomica",
    badge: "Home office",
  },
  {
    id: "robo-aspirador",
    title: "Robô aspirador WAP com mapeamento e retorno automático",
    store: "Amazon",
    category: "Casa inteligente",
    image:
      "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=900&h=900&fit=crop",
    originalPrice: 1899,
    salePrice: 1299,
    discount: 31,
    installment: "10x de R$ 129,90 sem juros",
    shipping: "Frete grátis Prime",
    href: "https://example.com/oferta/robo-aspirador",
    cashback: 7,
  },
  {
    id: "pampers-confort",
    title: "Fralda Pampers Confort Sec pacote econômico G com 144 unidades",
    store: "Shopee",
    category: "Bebês",
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=900&h=900&fit=crop",
    originalPrice: 179.9,
    salePrice: 129.9,
    discount: 28,
    installment: "2x de R$ 64,95 sem juros",
    shipping: "Cupom de frete hoje",
    href: "https://example.com/oferta/pampers-confort",
    coupon: "BEBE10",
  },
  {
    id: "xbox-series-s",
    title: "Console Xbox Series S 512GB com 2 controles sem fio",
    store: "Kabum!",
    category: "Games",
    image:
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=900&h=900&fit=crop",
    originalPrice: 2999,
    salePrice: 2399,
    discount: 20,
    installment: "10x de R$ 239,90 sem juros",
    shipping: "Entrega expressa",
    href: "https://example.com/oferta/xbox-series-s",
    badge: "Gamer",
  },
]

function pick(ids: string[]) {
  const map = new Map(HOME_DEALS.map((d) => [d.id, d]))
  return ids.map((id) => map.get(id)!).filter(Boolean)
}

export const FEATURED_DEALS = pick([
  "iphone-15",
  "airfryer-mondial",
  "notebook-lenovo",
  "tv-samsung",
  "jbl-tune",
  "nespresso",
  "olimpikus-corre",
  "kit-principia",
])

export const BEST_SELLERS = pick([
  "notebook-lenovo",
  "tv-samsung",
  "robo-aspirador",
  "pampers-confort",
])

export type FeedItem = {
  id: string
  title: string
  description: string
  image: string
  store: string
  category: string
  originalPrice: number
  salePrice: number
  discount: number
  installment: string
  shipping: string
  href: string
  cashback?: number
  coupon?: string
  badge?: string
}

export const FEED_ITEMS: FeedItem[] = [
  {
    id: "feed-iphone-15-pro",
    title: "iPhone 15 Pro 256GB Titânio Natural",
    description:
      "Chip A17 Pro, câmera de 48MP com zoom óptico 5x e corpo em titânio. O mais avançado da Apple com preço especial.",
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=1000&fit=crop",
    store: "Amazon",
    category: "Eletrônicos",
    originalPrice: 8999,
    salePrice: 7299,
    discount: 19,
    installment: "12x de R$ 608,25 sem juros",
    shipping: "Frete grátis",
    href: "https://example.com/oferta/iphone-15-pro",
    cashback: 3,
    badge: "Loja oficial",
  },
  {
    id: "feed-airfryer-walita",
    title: "Air Fryer Philips Walita Turbo 4.1L",
    description:
      "Tecnologia RapidAir para frituras sem óleo. Timer de 60 minutos e desligamento automático. Ideal para famílias pequenas.",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&h=1000&fit=crop",
    store: "Magalu",
    category: "Casa e cozinha",
    originalPrice: 599.9,
    salePrice: 359.9,
    discount: 40,
    installment: "6x de R$ 59,98 sem juros",
    shipping: "Retire hoje",
    href: "https://example.com/oferta/airfryer-walita",
    cashback: 12,
    coupon: "WALITA40",
  },
  {
    id: "feed-galaxy-buds",
    title: "Galaxy Buds FE com cancelamento de ruído ativo",
    description:
      "ANC adaptável, som AKG e até 30h de bateria com o estojo. Conforto para o dia inteiro com certificação IPX2.",
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&h=1000&fit=crop",
    store: "Shopee",
    category: "Áudio",
    originalPrice: 449,
    salePrice: 259,
    discount: 42,
    installment: "4x de R$ 64,75 sem juros",
    shipping: "Frete grátis",
    href: "https://example.com/oferta/galaxy-buds",
    coupon: "BUDS15",
  },
  {
    id: "feed-cadeira-dt3",
    title: "Cadeira Gamer DT3 Sports Elise com encosto reclinável",
    description:
      "Apoio lombar e de cabeça ajustáveis, braço 4D e cilindro classe 4. Ideal para longas sessões de trabalho ou jogo.",
    image:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&h=1000&fit=crop",
    store: "Kabum!",
    category: "Home office",
    originalPrice: 1899,
    salePrice: 1299,
    discount: 32,
    installment: "10x de R$ 129,90 sem juros",
    shipping: "Entrega expressa",
    href: "https://example.com/oferta/cadeira-dt3",
    badge: "Mais vendido",
  },
  {
    id: "feed-smartwatch-amazfit",
    title: "Smartwatch Amazfit GTS 4 Mini com GPS integrado",
    description:
      "Tela AMOLED de 1,65\", mais de 120 modos de treino, SpO2 e bateria de até 15 dias. Design fino e resistente à água.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=1000&fit=crop",
    store: "Amazon",
    category: "Wearables",
    originalPrice: 699,
    salePrice: 449,
    discount: 36,
    installment: "6x de R$ 74,83 sem juros",
    shipping: "Chega amanhã",
    href: "https://example.com/oferta/amazfit-gts4",
    cashback: 8,
  },
  {
    id: "feed-tenis-nike",
    title: "Tênis Nike Revolution 7 masculino para corrida",
    description:
      "Amortecimento macio com espuma, cabedal respirável e solado emborrachado. Leve e versátil para treinos diários.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop",
    store: "Netshoes",
    category: "Moda",
    originalPrice: 499.9,
    salePrice: 299.9,
    discount: 40,
    installment: "5x de R$ 59,98 sem juros",
    shipping: "Frete grátis",
    href: "https://example.com/oferta/nike-revolution-7",
    coupon: "NIKE20",
  },
  {
    id: "feed-kindle-paperwhite",
    title: "Kindle Paperwhite 16GB com tela antirreflexo de 6,8\"",
    description:
      "Luz ajustável, resistência à água IPX8 e bateria de até 10 semanas. Leitura sem distrações em qualquer lugar.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=1000&fit=crop",
    store: "Amazon",
    category: "Eletrônicos",
    originalPrice: 699,
    salePrice: 499,
    discount: 29,
    installment: "6x de R$ 83,16 sem juros",
    shipping: "Frete grátis Prime",
    href: "https://example.com/oferta/kindle-paperwhite",
    cashback: 5,
    badge: "Loja oficial",
  },
  {
    id: "feed-panela-tramontina",
    title: "Jogo de Panelas Tramontina Paris 7 peças antiaderente",
    description:
      "Revestimento Starflon Max, cabos em baquelite e tampas de vidro temperado. Distribuição uniforme de calor.",
    image:
      "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800&h=1000&fit=crop",
    store: "Mercado Livre",
    category: "Casa e cozinha",
    originalPrice: 599.9,
    salePrice: 389.9,
    discount: 35,
    installment: "6x de R$ 64,98 sem juros",
    shipping: "Chega amanhã",
    href: "https://example.com/oferta/tramontina-paris",
  },
  {
    id: "feed-echo-dot-5",
    title: "Echo Dot 5ª geração com Alexa e som premium",
    description:
      "Alto-falante inteligente com Alexa integrada, som envolvente e controle por voz da casa conectada.",
    image:
      "https://images.unsplash.com/photo-1609921205586-7e8a57516512?w=800&h=1000&fit=crop",
    store: "Amazon",
    category: "Eletrônicos",
    originalPrice: 449,
    salePrice: 279,
    discount: 38,
    installment: "4x de R$ 69,75 sem juros",
    shipping: "Frete grátis Prime",
    href: "https://example.com/oferta/echo-dot-5",
    cashback: 5,
    badge: "Loja oficial",
  },
  {
    id: "feed-mochila-samsonite",
    title: "Mochila Samsonite Guardian com compartimento para notebook 15.6\"",
    description:
      "Tecido resistente à água, costas acolchoadas e múltiplos compartimentos. Ideal para trabalho e viagem.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1000&fit=crop",
    store: "Mercado Livre",
    category: "Acessórios",
    originalPrice: 399.9,
    salePrice: 249.9,
    discount: 38,
    installment: "5x de R$ 49,98 sem juros",
    shipping: "Frete grátis",
    href: "https://example.com/oferta/mochila-samsonite",
  },
  {
    id: "feed-perfume-malbec",
    title: "Malbec Gold Desodorante Colônia O Boticário 100ml",
    description:
      "Fragrância masculina amadeirada com notas de baunilha, café e carvalho francês. Longa fixação.",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop",
    store: "O Boticário",
    category: "Beleza",
    originalPrice: 189.9,
    salePrice: 129.9,
    discount: 32,
    installment: "3x de R$ 43,30 sem juros",
    shipping: "Retire na loja",
    href: "https://example.com/oferta/malbec-gold",
    coupon: "PERFUME20",
  },
  {
    id: "feed-aspirador-wap",
    title: "Aspirador de Pó WAP Power Speed 2000W com filtro HEPA",
    description:
      "Sucção potente, filtro HEPA lavável e coletor de 3L. Leve e eficiente para limpeza completa da casa.",
    image:
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&h=1000&fit=crop",
    store: "Magalu",
    category: "Casa e cozinha",
    originalPrice: 499.9,
    salePrice: 319.9,
    discount: 36,
    installment: "6x de R$ 53,31 sem juros",
    shipping: "Entrega expressa",
    href: "https://example.com/oferta/aspirador-wap",
    cashback: 8,
    badge: "Mais vendido",
  },
  {
    id: "feed-monitor-lg-ultrawide",
    title: 'Monitor LG UltraWide 29" IPS Full HD com HDR10',
    description:
      "Tela 21:9 com cores mais vivas, modo leitura e ideal para produtividade, estudos e setup gamer compacto.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=1000&fit=crop",
    store: "Fast Shop",
    category: "Informática",
    originalPrice: 1499,
    salePrice: 1099,
    discount: 27,
    installment: "10x de R$ 109,90 sem juros",
    shipping: "Frete grátis",
    href: "https://example.com/oferta/monitor-lg-ultrawide",
    cashback: 6,
    badge: "Setup em alta",
  },
  {
    id: "feed-nintendo-switch-oled",
    title: 'Nintendo Switch OLED 64GB com tela de 7"',
    description:
      "Cores mais vibrantes, som aprimorado e base com porta LAN. Ótima escolha para jogar em casa ou em viagens.",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=1000&fit=crop",
    store: "Amazon",
    category: "Games",
    originalPrice: 2499,
    salePrice: 1999,
    discount: 20,
    installment: "10x de R$ 199,90 sem juros",
    shipping: "Frete grátis Prime",
    href: "https://example.com/oferta/nintendo-switch-oled",
    cashback: 4,
    badge: "Loja oficial",
  },
  {
    id: "feed-mala-samsonite-bordo",
    title: "Mala de bordo Samsonite rígida 10kg com rodas 360°",
    description:
      "Estrutura leve, rodinhas silenciosas e divisórias internas para viagens curtas com mais organização.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=1000&fit=crop",
    store: "Mercado Livre",
    category: "Viagem",
    originalPrice: 799.9,
    salePrice: 579.9,
    discount: 28,
    installment: "10x de R$ 57,99 sem juros",
    shipping: "Chega amanhã",
    href: "https://example.com/oferta/mala-samsonite-bordo",
  },
  {
    id: "feed-smart-tv-tcl-50",
    title: 'Smart TV TCL 50" 4K com Google TV e Dolby Audio',
    description:
      "Imagem em alta definição, comandos por voz e apps de streaming prontos para usar na sala ou quarto.",
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&h=1000&fit=crop",
    store: "Magalu",
    category: "Eletrônicos",
    originalPrice: 2799,
    salePrice: 2149,
    discount: 23,
    installment: "10x de R$ 214,90 sem juros",
    shipping: "Retire hoje",
    href: "https://example.com/oferta/smart-tv-tcl-50",
    cashback: 5,
  },
  {
    id: "feed-logitech-mx-master-3s",
    title: "Mouse Logitech MX Master 3S sem fio com sensor 8K DPI",
    description:
      "Rolagem MagSpeed, clique silencioso e ergonomia premium para trabalho intenso no notebook ou desktop.",
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&h=1000&fit=crop",
    store: "Kabum!",
    category: "Informática",
    originalPrice: 699,
    salePrice: 479,
    discount: 31,
    installment: "8x de R$ 59,87 sem juros",
    shipping: "Entrega expressa",
    href: "https://example.com/oferta/logitech-mx-master-3s",
    badge: "Top oferta",
  },
  {
    id: "feed-kit-cerave",
    title: "Kit CeraVe limpeza + hidratação facial para rotina completa",
    description:
      "Combinação com ceramidas e ácido hialurônico para limpar, hidratar e reforçar a barreira da pele.",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=1000&fit=crop",
    store: "Época Cosméticos",
    category: "Beleza",
    originalPrice: 229.9,
    salePrice: 169.9,
    discount: 26,
    installment: "4x de R$ 42,47 sem juros",
    shipping: "Frete grátis",
    href: "https://example.com/oferta/kit-cerave",
    badge: "Rotina completa",
  },
  {
    id: "feed-jbl-go-4",
    title: "Caixa de som JBL Go 4 Bluetooth à prova d'água",
    description:
      "Compacta, portátil e com graves melhores para usar em casa, no escritório ou em viagens curtas.",
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=1000&fit=crop",
    store: "Shopee",
    category: "Áudio",
    originalPrice: 329,
    salePrice: 219,
    discount: 33,
    installment: "4x de R$ 54,75 sem juros",
    shipping: "Frete grátis",
    href: "https://example.com/oferta/jbl-go-4",
    coupon: "JBL10",
  },
  {
    id: "feed-liquidificador-oster-full",
    title: "Liquidificador Oster Full 1400 com jarra antimicrobiana",
    description:
      "Motor forte, múltiplas velocidades e jarra resistente para vitaminas, molhos e receitas do dia a dia.",
    image:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&h=1000&fit=crop",
    store: "Casas Bahia",
    category: "Casa e cozinha",
    originalPrice: 349.9,
    salePrice: 249.9,
    discount: 29,
    installment: "4x de R$ 62,47 sem juros",
    shipping: "Entrega expressa",
    href: "https://example.com/oferta/liquidificador-oster-full",
  },
  {
    id: "feed-webcam-logitech-c920s",
    title: "Webcam Logitech C920s Full HD com microfones duplos",
    description:
      "Vídeo em 1080p, foco automático e tampa de privacidade para reuniões, aulas e lives com mais nitidez.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=1000&fit=crop",
    store: "Mercado Livre",
    category: "Home office",
    originalPrice: 499,
    salePrice: 329,
    discount: 34,
    installment: "6x de R$ 54,83 sem juros",
    shipping: "Chega amanhã",
    href: "https://example.com/oferta/webcam-logitech-c920s",
  },
  {
    id: "feed-camiseta-nike-dri-fit",
    title: "Camiseta Nike Dri-FIT Legend para treino diário",
    description:
      "Tecido leve com secagem rápida e caimento confortável para academia, corrida e rotina esportiva.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop",
    store: "Netshoes",
    category: "Moda",
    originalPrice: 129.9,
    salePrice: 89.9,
    discount: 31,
    installment: "3x de R$ 29,97 sem juros",
    shipping: "Frete grátis",
    href: "https://example.com/oferta/camiseta-nike-dri-fit",
    coupon: "TREINO15",
  },
  {
    id: "feed-dolce-gusto-genio-s",
    title: "Cafeteira Dolce Gusto Genio S Touch com 15 bar",
    description:
      "Prepara cafés, cappuccinos e bebidas geladas com controle de intensidade e reservatório compacto.",
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&h=1000&fit=crop",
    store: "Mercado Livre",
    category: "Casa e cozinha",
    originalPrice: 699,
    salePrice: 489,
    discount: 30,
    installment: "6x de R$ 81,50 sem juros",
    shipping: "Chega amanhã",
    href: "https://example.com/oferta/dolce-gusto-genio-s",
    cashback: 7,
  },
  {
    id: "feed-kit-maybelline",
    title: "Kit Maybelline máscara + corretivo + batom nude",
    description:
      "Seleção prática para maquiagem de rotina com acabamento natural e boa duração ao longo do dia.",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=1000&fit=crop",
    store: "Amazon",
    category: "Beleza",
    originalPrice: 159.9,
    salePrice: 109.9,
    discount: 31,
    installment: "3x de R$ 36,63 sem juros",
    shipping: "Frete grátis Prime",
    href: "https://example.com/oferta/kit-maybelline",
    badge: "Beauty hit",
  },
  {
    id: "feed-notebook-acer-aspire-5",
    title: "Notebook Acer Aspire 5 Ryzen 7 com 16GB e SSD de 512GB",
    description:
      "Desempenho forte para trabalho, estudos e multitarefa com inicialização rápida e tela Full HD.",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=1000&fit=crop",
    store: "Amazon",
    category: "Informática",
    originalPrice: 4599,
    salePrice: 3699,
    discount: 20,
    installment: "12x de R$ 308,25 sem juros",
    shipping: "Frete grátis Prime",
    href: "https://example.com/oferta/notebook-acer-aspire-5",
    badge: "Mais procurado",
  },
  {
    id: "feed-huggies-supreme-care",
    title: "Fralda Huggies Supreme Care XG com 66 unidades",
    description:
      "Cobertura suave, absorção rápida e ajuste confortável para o dia e a noite sem apertar.",
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=1000&fit=crop",
    store: "Drogasil",
    category: "Bebês",
    originalPrice: 89.9,
    salePrice: 63.9,
    discount: 29,
    installment: "2x de R$ 31,95 sem juros",
    shipping: "Retire na loja",
    href: "https://example.com/oferta/huggies-supreme-care",
    coupon: "BEBE10",
  },
  {
    id: "feed-tenis-adidas-response",
    title: "Tênis Adidas Response Super para corrida urbana",
    description:
      "Amortecimento equilibrado e cabedal respirável para quem busca conforto em treinos leves e caminhadas.",
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=1000&fit=crop",
    store: "Adidas",
    category: "Esportes",
    originalPrice: 499.9,
    salePrice: 339.9,
    discount: 32,
    installment: "5x de R$ 67,98 sem juros",
    shipping: "Frete grátis",
    href: "https://example.com/oferta/tenis-adidas-response",
    badge: "Coleção nova",
  },
  {
    id: "feed-xbox-controller-carbon",
    title: "Controle sem fio Xbox Carbon Black com Bluetooth",
    description:
      "Pegada firme, baixa latência e compatibilidade com console, PC e celular para jogar sem cabo.",
    image:
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&h=1000&fit=crop",
    store: "Kabum!",
    category: "Games",
    originalPrice: 399,
    salePrice: 279,
    discount: 30,
    installment: "4x de R$ 69,75 sem juros",
    shipping: "Entrega expressa",
    href: "https://example.com/oferta/xbox-controller-carbon",
  },
  {
    id: "feed-escrivaninha-home-office",
    title: "Escrivaninha compacta para home office com acabamento amadeirado",
    description:
      "Tamanho ideal para quarto ou apartamento, visual limpo e espaço prático para notebook, monitor e acessórios.",
    image:
      "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=800&h=1000&fit=crop",
    store: "MadeiraMadeira",
    category: "Home office",
    originalPrice: 699.9,
    salePrice: 489.9,
    discount: 30,
    installment: "8x de R$ 61,23 sem juros",
    shipping: "Frete grátis",
    href: "https://example.com/oferta/escrivaninha-home-office",
    badge: "Ambiente em alta",
  },
]

export const PROMO_BANNERS: PromoBanner[] = [
  {
    eyebrow: "ofertas da semana",
    title: "Até 55% OFF em tecnologia e casa",
    subtitle: "As melhores ofertas de grandes lojas com desconto real e entrega rápida.",
    cta: "Ver ofertas",
    href: "#ofertas-destaque",
    bg: "bg-gradient-to-r from-primary via-orange-500 to-orange-400",
  },
  {
    eyebrow: "nichos em destaque",
    title: "Explore as categorias que mais giram no marketplace",
    subtitle: "Tecnologia, casa, moda, beleza e mais em uma leitura rápida e organizada.",
    cta: "Ver nichos",
    href: "#categorias",
    bg: "bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400",
  },
  {
    eyebrow: "mais vendidos",
    title: "Veja o que está performando melhor nesta semana",
    subtitle: "Uma seleção enxuta para descobrir rapidamente os produtos com maior tração.",
    cta: "Ver mais vendidos",
    href: "#mais-vendidos",
    bg: "bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-400",
  },
]