export const projects = [
  {
    slug: 'check-empilhadeira',
    sku: 'GV-OPS-01',
    title: 'Checklist Operacional',
    shortTitle: 'Checklist',
    category: 'Operações',
    platform: 'Mobile + Web',
    year: 2026,
    featured: true,
    motion: 'floating-lines',
    accent: 'cyan',
    headline: 'Carga e descarga com rastreabilidade, ocorrências e pendências no mesmo fluxo.',
    description: 'Produto demonstrativo para equipes de recebimento, expedição e logística acompanharem a operação no celular e no desktop.',
    problem: 'Checklists em papel e anotações soltas dificultam a conferência da carga, o registro de ocorrências e a rastreabilidade do processo.',
    solution: 'Um fluxo digital de checklist com etapas, observações por item, controle de pendências e histórico para consulta rápida.',
    features: ['Checklist de carga e descarga', 'Registro de ocorrências', 'Observações por etapa', 'Controle de pendências', 'Experiência mobile e desktop'],
    tech: ['Flutter', 'Flutter Web', 'Android', 'Web', 'Operações'],
    highlights: [
      { value: '2', label: 'interfaces' },
      { value: '5', label: 'módulos principais' },
      { value: 'Web', label: 'demo navegável' }
    ],
    demoPath: '/demos/check-empilhadeira',
    demoEmbedPath: '/demos/checklist-e-gerenciamento/index.html',
    demoViews: ['mobile', 'desktop']
  },
  {
    slug: 'sistema-fiscal',
    sku: 'GV-STK-02',
    title: 'Gestão de Estoque',
    shortTitle: 'Estoque',
    category: 'Estoque',
    platform: 'Desktop',
    year: 2026,
    featured: true,
    motion: 'frost',
    accent: 'ice',
    headline: 'Auditoria de inventário e divergências apresentadas como um painel operacional.',
    description: 'Sistema desktop demonstrativo para apoiar inventários, conferências e análise de diferenças entre estoque físico e sistema.',
    problem: 'Inventários em planilhas ou controles separados dificultam a comparação dos saldos, o acompanhamento das divergências e a tomada de decisão.',
    solution: 'Uma estação de auditoria com filtros por produto, resumos de divergência, histórico de conferência e leitura rápida do estado do inventário.',
    features: ['Auditoria de inventário', 'Conferência de produtos', 'Análise de divergências', 'Filtros operacionais', 'Relatórios'],
    tech: ['Flutter Desktop', 'Dart', 'Inventário', 'Gestão de Estoque', 'Web Demo'],
    highlights: [
      { value: 'Desktop', label: 'experiência principal' },
      { value: '5', label: 'áreas de análise' },
      { value: '100%', label: 'demo fictícia' }
    ],
    demoPath: '/demos/sistema-fiscal',
    demoEmbedPath: '/demos/auditoria-de-inventario/index.html',
    demoViews: ['desktop'],
    demoDefaultView: 'desktop'
  },
  {
    slug: 'app-inventario',
    sku: 'GV-STK-03',
    title: 'Inventário Mobile',
    shortTitle: 'Inventário',
    category: 'Estoque',
    platform: 'Mobile',
    year: 2026,
    featured: true,
    motion: 'liquid',
    accent: 'violet',
    headline: 'Contagem física e auditoria de estoque no ponto onde o trabalho acontece.',
    description: 'Aplicativo mobile demonstrativo para registrar contagens, comparar quantidades e organizar divergências diretamente no celular.',
    problem: 'A contagem física em papel ou planilhas paralelas aumenta retrabalho e torna mais lenta a conferência das diferenças.',
    solution: 'Um aplicativo focado em captura rápida, leitura de itens, histórico e organização das pendências encontradas durante o inventário.',
    features: ['Contagem física', 'Auditoria por produto', 'Registro de divergências', 'Histórico de conferências', 'Fluxo Android'],
    tech: ['Flutter', 'Dart', 'Android', 'Inventário', 'Web Demo'],
    highlights: [
      { value: 'Mobile', label: 'uso em campo' },
      { value: '5', label: 'funções centrais' },
      { value: '1 toque', label: 'para abrir a demo' }
    ],
    demoPath: '/demos/app-inventario',
    demoEmbedPath: '/demos/app-inventario/index.html',
    demoViews: ['mobile']
  },
  {
    slug: 'restaurante-delivery',
    sku: 'GV-COM-04',
    title: 'Delivery Restaurante',
    shortTitle: 'Delivery',
    category: 'Comercial',
    platform: 'Web',
    year: 2026,
    featured: true,
    motion: 'blaze',
    accent: 'orange',
    headline: 'Cardápio, pedido e operação em uma experiência própria para restaurantes.',
    description: 'Demonstração comercial para pizzarias, lanchonetes e restaurantes que querem vender com identidade própria.',
    problem: 'Muitos estabelecimentos dependem exclusivamente de marketplaces, pagam taxas e perdem controle da experiência e do relacionamento com clientes.',
    solution: 'Uma presença própria com cardápio digital, carrinho, fluxo de pedido e visão operacional do negócio.',
    features: ['Cardápio online', 'Carrinho', 'Pedido digital', 'Painel operacional', 'Gestão de produtos'],
    tech: ['Flutter Web', 'Web', 'Cardápio Digital', 'Pedidos', 'Painel'],
    highlights: [
      { value: 'Web', label: 'canal de venda' },
      { value: '5', label: 'fluxos de produto' },
      { value: 'Live', label: 'demo navegável' }
    ],
    demoPath: '/demos/restaurante-delivery',
    demoEmbedPath: '/demos/restaurante/index.html',
    demoViews: ['desktop']
  }
];

export const collections = [
  { id: 'todos', label: 'Todos os projetos' },
  { id: 'Operações', label: 'Operações' },
  { id: 'Estoque', label: 'Estoque' },
  { id: 'Comercial', label: 'Comercial' }
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}
