'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  
  return (
    <>
      <Navigation navigation={t?.navigation || {}} />
      <main>
        {children}
      </main>
      <Footer footer={t?.footer || {}} contact={t?.contact || {}} />
    </>
  );
}