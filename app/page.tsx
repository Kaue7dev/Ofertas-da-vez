import CategoryBar from "@/components/CategoryBar"
import CouponsSection from "@/components/CouponsSection"
import DiscoveryHubSection from "@/components/DiscoveryHubSection"
import DealsSection from "@/components/DealsSection"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import HeroBanner from "@/components/HeroBanner"
import MobileNav from "@/components/MobileNav"
import PopularStoresSection from "@/components/PopularStoresSection"
import QuickAccessSection from "@/components/QuickAccessSection"
import TrustSection from "@/components/TrustSection"
import {
  BEST_SELLERS,
  CATEGORY_DEALS,
  FEATURED_DEALS,
  WEEKLY_FINDS,
} from "@/lib/home-data"

export default function Home() {
  return (
    <div id="topo" className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <HeroBanner />
      <QuickAccessSection />
      <CategoryBar />

      <DealsSection
        id="ofertas-destaque"
        title="Ofertas em destaque"
        icon="flame"
        items={FEATURED_DEALS}
        viewAllHref="#"
        viewAllLabel="Ver tudo"
      />

      <CouponsSection />

      <DealsSection
        id="mais-vendidos"
        title="Mais vendidos"
        icon="trending"
        items={BEST_SELLERS}
        viewAllHref="#"
        viewAllLabel="Ver tudo"
      />

      <PopularStoresSection />

      <DealsSection
        id="achados-da-semana"
        title="Achados da semana"
        icon="zap"
        items={WEEKLY_FINDS}
        viewAllHref="#"
        viewAllLabel="Ver tudo"
      />

      <DealsSection
        title="Tecnologia com preço baixo"
        icon="clock"
        items={CATEGORY_DEALS}
        viewAllHref="#"
        viewAllLabel="Ver tudo"
      />

      <DiscoveryHubSection />

      <TrustSection />

      <Footer />
      <MobileNav />
    </div>
  )
}
