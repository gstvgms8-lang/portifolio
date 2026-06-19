export const projects = [
  {
    slug: 'check-empilhadeira',
    icon: '📋',
    title: 'Checklist Operacional de Carga e Descarga',
    category: 'App Mobile e Site Operacional',
    headline: 'Checklist digital para conferência, ocorrências, pendências e histórico de carga e descarga.',
    description: 'Demonstração para equipes de recebimento, expedição e logística acompanharem a operação pelo app mobile ou pela versão web desktop.',
    problem: 'Checklists em papel e anotações soltas dificultam a conferência da carga, o registro de ocorrências e a rastreabilidade do processo.',
    solution: 'Um checklist operacional com etapas de carga e descarga, observações por item, controle de pendências e histórico digital para consulta rápida.',
    features: ['Checklist de carga e descarga', 'Registro de ocorrências operacionais', 'Observações por etapa', 'Pendências para acompanhamento', 'Visualização mobile e desktop'],
    tech: ['Flutter', 'Flutter Web', 'Android', 'Site Desktop', 'Web Demo'],
    demoPath: '/demos/check-empilhadeira',
    demoEmbedPath: '/demos/checklist-e-gerenciamento/index.html'
  },
  {
    slug: 'sistema-fiscal',
    icon: '📦',
    title: 'Gestão de Estoque',
    category: 'Sistema Desktop Empresarial',
    headline: 'Auditoria de inventário, conferência de produtos e acompanhamento de divergências em estoque.',
    description: 'Modelo demonstrativo de sistema desktop para apoiar inventários, conferências operacionais e análise de diferenças entre estoque físico e sistema.',
    problem: 'Inventários feitos em planilhas ou controles separados dificultam a comparação dos saldos, o acompanhamento das divergências e a tomada de decisão.',
    solution: 'Sistema desktop com painéis de auditoria, filtros por produto, resumo de divergências, histórico de conferência e visualização organizada dos itens analisados.',
    features: ['Auditoria de inventário', 'Conferência de produtos', 'Análise de divergências', 'Filtros por categoria e status', 'Relatórios operacionais'],
    tech: ['Flutter Desktop', 'Dart', 'Inventário', 'Gestão de Estoque', 'Web Demo'],
    demoPath: '/demos/sistema-fiscal',
    demoEmbedPath: '/demos/auditoria-de-inventario/index.html',
    demoDefaultView: 'desktop'
  },
  {
    slug: 'app-inventario',
    icon: '📱',
    title: 'Inventário Mobile',
    category: 'App Mobile de Inventário',
    headline: 'Contagem física, auditoria de estoque e registro de divergências pelo celular.',
    description: 'Aplicativo mobile demonstrativo para equipes realizarem contagens físicas, auditorias de estoque e conferências de produtos diretamente no celular.',
    problem: 'A contagem física em papel ou planilhas paralelas torna o inventário mais lento, aumenta retrabalho e dificulta a conferência das divergências.',
    solution: 'Um app mobile para registrar contagens, acompanhar itens auditados, comparar quantidades e organizar pendências encontradas durante o inventário.',
    features: ['Contagem física de estoque', 'Auditoria por produto', 'Registro de divergências', 'Histórico de conferências', 'Uso em celular Android'],
    tech: ['Flutter', 'Dart', 'Android', 'Inventário', 'Web Demo'],
    demoPath: '/demos/app-inventario',
    demoEmbedPath: '/demos/app-inventario/index.html',
    demoViews: ['mobile']
  },
  {
    slug: 'restaurante-delivery',
    icon: '🍕',
    title: 'Delivery Restaurante',
    category: 'Sistema Web Comercial',
    headline: 'Cardápio digital, pedidos online e painel administrativo para restaurantes.',
    description: 'Demonstração comercial para pizzarias, lanchonetes e restaurantes que querem vender sem depender apenas de marketplaces.',
    problem: 'Muitos estabelecimentos pagam taxas altas e não têm controle total sobre seus pedidos e clientes.',
    solution: 'Site próprio com cardápio digital, carrinho, envio de pedidos, painel e identidade personalizada.',
    features: ['Cardápio online', 'Carrinho de pedidos', 'Pedido online', 'Painel da cozinha', 'Gestão de produtos'],
    tech: ['Next.js', 'Node.js', 'React', 'PostgreSQL', 'Painel Admin'],
    demoPath: '/demos/restaurante-delivery',
    demoEmbedPath: '/demos/restaurante/index.html'
  }
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}
