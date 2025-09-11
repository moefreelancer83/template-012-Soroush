import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { NavigationProvider } from '@/components/NavigationProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { LayoutClient } from '@/components/LayoutClient';
import { loadTemplate } from '@/services/templateLoader';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export async function generateMetadata(): Promise<Metadata> {
  const templateData = await loadTemplate();
  
  // Default to English metadata (can be changed to German if needed)
  const seo = templateData.metadata?.seo?.en || templateData.metadata?.seo?.de || {};
  const englishContent = templateData.en || {};
  
  return {
    title: seo.title || englishContent.siteTitle || 'Keller Law Firm',
    description: seo.description || 'Premium legal services in Zurich',
    keywords: seo.keywords || '',
    authors: seo.author ? [{ name: seo.author }] : undefined,
    openGraph: {
      title: seo.title || englishContent.siteTitle,
      description: seo.description,
      locale: seo.locale || 'en_CH',
    }
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const templateData = await loadTemplate();
  
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-sans`}>
        <NavigationProvider>
          <LanguageProvider templateData={templateData}>
            <LayoutClient>
              {children}
            </LayoutClient>
          </LanguageProvider>
        </NavigationProvider>
      </body>
    </html>
  );
}