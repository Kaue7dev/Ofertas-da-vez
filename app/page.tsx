import CategoryBar from "@/components/CategoryBar"
import DealsSection from "@/components/DealsSection"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import HeroBanner from "@/components/HeroBanner"
import MobileNav from "@/components/MobileNav"
import {
  BEST_SELLERS,
  FEATURED_DEALS,
} from "@/lib/home-data"

export default function Home() {
  return (
    <div id="topo" className="min-h-screen overflow-x-hidden bg-background pb-20 md:pb-0">
      <Header />
      <main>
        <HeroBanner />
        <CategoryBar />

        <DealsSection
          id="ofertas-destaque"
          title="Ofertas em destaque"
          subtitle="Uma seleção principal, com leitura rápida e foco nos produtos que mais puxam clique e intenção de compra."
          icon="flame"
          items={FEATURED_DEALS}
          viewAllHref="/explorar"
          viewAllLabel="Explorar mais"
        />

        <DealsSection
          id="mais-vendidos"
          title="Mais vendidos da semana"
          subtitle="Itens com maior tração nas lojas parceiras, organizados para orientar descoberta sem lotar a home."
          icon="trending"
          items={BEST_SELLERS}
          viewAllHref="/explorar"
          viewAllLabel="Ver mais no explorar"
        />
      </main>

      <Footer />
      <MobileNav />
    </div>
  )
}
