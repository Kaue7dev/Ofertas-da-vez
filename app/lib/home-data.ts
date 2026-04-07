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

export type HomeCoupon = {
  store: string
  code: string
  discount: string
  description: string
  highlight: string
  href: string
  tone: "primary" | "success" | "highlight" | "sky"
}

export type PopularStore = {
  name: string
  offerCount: string
  href: string
}

export type PromoBanner = {
  title: string
  subtitle: string
  cta: string
  href: string
  bg: string
  eyebrow?: string
}

export type QuickAccessItem = {
  title: string
  description: string
  href: string
  icon: "truck" | "badge-percent" | "ticket" | "credit-card"
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
    href: "#achados-da-semana",
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
    href: "#cupons",
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
    href: "#cupons",
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
      "https://images.unsplash.com/photo-1585515656763-2a7d1c3d6217?w=900&h=900&fit=crop",
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
      "https://images.unsplash.com/photo-1505843490701-5be5d2f397a4?w=900&h=900&fit=crop",
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

export const WEEKLY_FINDS = pick([
  "airfryer-mondial",
  "jbl-tune",
  "cadeira-ergonomica",
  "xbox-series-s",
])

export const CATEGORY_DEALS = pick([
  "iphone-15",
  "tv-samsung",
  "notebook-lenovo",
  "robo-aspirador",
])

export const HOME_COUPONS: HomeCoupon[] = [
  {
    store: "Amazon",
    code: "CASA120",
    discount: "R$ 120 OFF",
    description: "em casa e cozinha acima de R$ 1.000",
    highlight: "cupom do dia",
    href: "https://example.com/cupom/casa120",
    tone: "primary",
  },
  {
    store: "Magalu",
    code: "MAGALU15",
    discount: "15% OFF",
    description: "em eletroportáteis selecionados",
    highlight: "válido hoje",
    href: "https://example.com/cupom/magalu15",
    tone: "success",
  },
  {
    store: "Shopee",
    code: "FRETEGRATIS",
    discount: "Frete grátis",
    description: "sem valor mínimo em milhares de itens",
    highlight: "envio em destaque",
    href: "https://example.com/cupom/fretegratis",
    tone: "highlight",
  },
  {
    store: "Mercado Livre",
    code: "ML25OFF",
    discount: "R$ 25 OFF",
    description: "em compras no app acima de R$ 199",
    highlight: "economia extra",
    href: "https://example.com/cupom/ml25off",
    tone: "sky",
  },
]

export const POPULAR_STORES: PopularStore[] = [
  { name: "Amazon", offerCount: "1.200+ ofertas", href: "#ofertas-destaque" },
  { name: "Magalu", offerCount: "780+ ofertas", href: "#achados-da-semana" },
  { name: "Mercado Livre", offerCount: "980+ ofertas", href: "#mais-vendidos" },
  { name: "Shopee", offerCount: "1.500+ ofertas", href: "#cupons" },
]

export const QUICK_ACCESS_ITEMS: QuickAccessItem[] = [
  {
    title: "Frete grátis",
    description: "Milhares de produtos com envio gratuito.",
    href: "#ofertas-destaque",
    icon: "truck",
  },
  {
    title: "Menos de R$ 100",
    description: "Produtos com preços imperdíveis.",
    href: "#achados-da-semana",
    icon: "badge-percent",
  },
  {
    title: "Cupons do dia",
    description: "Códigos prontos para economizar agora.",
    href: "#cupons",
    icon: "ticket",
  },
  {
    title: "Cashback",
    description: "Compre e receba parte do valor de volta.",
    href: "#mais-vendidos",
    icon: "credit-card",
  },
]

export const TRENDING_SEARCHES = [
  "iphone",
  "air fryer",
  "notebook",
  "tv 50",
  "jbl bluetooth",
  "cadeira ergonômica",
  "fralda pampers",
  "cafeteira nespresso",
  "smartwatch",
  "xbox series s",
  "tênis corrida",
  "robô aspirador",
]

export const POPULAR_BRANDS = [
  "Apple",
  "Samsung",
  "JBL",
  "Lenovo",
  "Philips Walita",
  "Nespresso",
  "Olympikus",
  "WAP",
  "Pampers",
  "Xbox",
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
    eyebrow: "cupons exclusivos",
    title: "Cupons de até R$ 120 para usar hoje",
    subtitle: "Amazon, Magalu, Shopee e mais com códigos prontos para aplicar.",
    cta: "Pegar cupons",
    href: "#cupons",
    bg: "bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400",
  },
  {
    eyebrow: "cashback ativo",
    title: "Ganhe até 10% de volta em compras",
    subtitle: "Produtos selecionados com cashback direto. Sem complicação.",
    cta: "Ver produtos",
    href: "#mais-vendidos",
    bg: "bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-400",
  },
]