import './globals.css';

export const metadata = {
  title: 'Gustavo Vieira | Desenvolvimento de Sistemas',
  description: 'Portfólio profissional de aplicativos mobile, sistemas web, desktop e soluções empresariais personalizadas.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
