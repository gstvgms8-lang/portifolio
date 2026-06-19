import { Suspense } from 'react';
import VisitTracker from '../components/VisitTracker';
import './globals.css';

export const metadata = {
  title: 'Gustavo Vieira | Desenvolvimento de Sistemas',
  description: 'Portfólio profissional de aplicativos mobile, sistemas web, desktop e soluções empresariais personalizadas.',
  icons: {
    icon: '/favicon.svg'
  }
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
