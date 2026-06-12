export const projects = [
  {
    slug: 'check-empilhadeira',
    icon: '🚜',
    title: 'Check Empilhadeira',
    category: 'App Mobile Industrial',
    headline: 'Checklist operacional com controle de avarias, pendências e histórico digital.',
    description: 'Aplicativo demonstrativo para inspeção diária de máquinas, pensado para operações industriais e logísticas.',
    problem: 'Checklists em papel dificultam histórico, rastreabilidade e acompanhamento de inconformidades.',
    solution: 'Um app mobile com abertura de checklist, finalização de turno, registro de avarias, fotos e gestão de pendências.',
    features: ['Checklist por máquina', 'Registro de avarias', 'Pendências de manutenção', 'Histórico por operador', 'Dados fictícios para demonstração'],
    tech: ['Flutter', 'Supabase', 'PostgreSQL', 'Android', 'Web Demo'],
    demoPath: '/demos/check-empilhadeira'
  },
  {
    slug: 'sistema-fiscal',
    icon: '📊',
    title: 'Gestor Fiscal',
    category: 'Sistema Desktop Empresarial',
    headline: 'Consulta fiscal, análise de notas e relatórios para gestão operacional.',
    description: 'Modelo demonstrativo de sistema desktop para análise fiscal e apoio ao controle de estoque.',
    problem: 'Empresas precisam consultar grande volume de notas fiscais e identificar divergências com rapidez.',
    solution: 'Sistema desktop com API local, filtros, cache, consulta de entradas e saídas e visualização organizada dos dados.',
    features: ['Consulta de NF-e', 'Filtros por cliente', 'Notas canceladas destacadas', 'Cache local', 'Relatórios gerenciais'],
    tech: ['Flutter Desktop', 'FastAPI', 'SQL Server', 'Python', 'API Local'],
    demoPath: '/demos/sistema-fiscal'
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
    features: ['Cardápio online', 'Carrinho de pedidos', 'Pedido pelo WhatsApp', 'Painel da cozinha', 'Gestão de produtos'],
    tech: ['Next.js', 'Node.js', 'React', 'PostgreSQL', 'WhatsApp API'],
    demoPath: '/demos/restaurante-delivery'
  },
  {
    slug: 'ravenwood',
    icon: '🎮',
    title: 'Ravenwood',
    category: 'Jogo Mobile',
    headline: 'Jogo narrativo com atmosfera psicológica, eventos e exploração em 2D.',
    description: 'Projeto criativo demonstrando domínio de lógica, cenas, áudio, eventos e interação em tempo real.',
    problem: 'Jogos narrativos exigem organização de estados, eventos, assets e experiência visual consistente.',
    solution: 'Protótipo em Flutter/Flame com cenas, transições, áudio, personagens e narrativa interativa.',
    features: ['Sistema de eventos', 'Cenas interativas', 'Áudio ambiente', 'Narrativa psicológica', 'Controles mobile'],
    tech: ['Flutter', 'Flame', 'Dart', 'Android', 'Game Design'],
    demoPath: '/demos/ravenwood'
  }
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}
