import CategoryBar from "@/components/CategoryBar"
import CouponsSection from "@/components/CouponsSection"
import DealsSection from "@/components/DealsSection"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import HeroBanner from "@/components/HeroBanner"
import MobileNav from "@/components/MobileNav"

export default function Home() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <HeroBanner />
      <CategoryBar />

      <div id="ofertas">
        <DealsSection
          title="🔥 Ofertas da Vez"
          subtitle="As melhores oportunidades agora"
          icon="flame"
          showDeals={4}
        />
      </div>

      <div id="cupons">
        <CouponsSection />
      </div>

      <DealsSection
        title="⚡ Acabou de chegar"
        subtitle="Ofertas fresquinhas para você"
        icon="zap"
        showDeals={8}
      />

      <DealsSection
        title="📈 Mais populares"
        subtitle="O que o pessoal está comprando"
        icon="trending"
        showDeals={4}
      />

      <Footer />
      <MobileNav />
    </div>
  )
}
