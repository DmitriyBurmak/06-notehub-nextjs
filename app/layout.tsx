import TanStackProvider from '../components/TanStackProvider/TanStackProvider';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
        </TanStackProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
