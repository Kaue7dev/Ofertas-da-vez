import AdminPlaceholderPanel from "@/admin/_components/AdminPlaceholderPanel"

export default function AdminBuscarPage() {
  return (
    <AdminPlaceholderPanel
      eyebrow="Buscar em preparacao"
      title="Busca guiada para montar ofertas com mais rapidez."
      description="Esta aba fica preparada para receber pesquisa de produtos, atalhos de curadoria e futuros fluxos de descoberta sem carregar o modo manual com mais blocos do que ele precisa."
      points={[
        "Pesquisar produtos e puxar dados para preencher ofertas mais rapido.",
        "Separar descoberta, selecao e publicacao em etapas mais simples.",
        "Criar um espaco mais limpo para evoluir integracoes futuras.",
      ]}
    />
  )
}