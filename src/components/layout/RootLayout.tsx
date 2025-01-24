// components/layout/RootLayout.tsx
import { Header } from "./Header";
import { Footer } from "./Footer";

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex-1 mt-16'>{children}</main>
      <Footer />
    </div>
  );
}
