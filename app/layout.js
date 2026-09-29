import { Suspense } from 'react';
import VisitTracker from '../components/VisitTracker';
import './globals.css';

export const metadata = {
  title: {
    default: 'Gustavo Vieira | Produtos digitais e sistemas sob medida',
    template: '%s | Gustavo Vieira'
  },
  description: 'Portfólio de Gustavo Vieira em formato de catálogo de produtos digitais: aplicativos mobile, sistemas web, desktop, integrações e automações.',
  keywords: ['desenvolvimento de sistemas', 'Flutter', 'Next.js', 'React', 'Python', 'APIs', 'automação', 'portfólio'],
  authors: [{ name: 'Gustavo Vieira' }],
  creator: 'Gustavo Vieira',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'Gustavo Vieira | Produtos digitais e sistemas sob medida',
    description: 'Projetos reais apresentados como produtos: contexto, solução, tecnologia e demonstração funcional.'
  }
};

export const viewport = {
  themeColor: '#0b0d10',
  colorScheme: 'dark'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Suspense fallback={null}>
          <VisitTracker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
