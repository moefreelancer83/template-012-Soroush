'use client';

import AnimatedSection from '@/components/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PrivacyClient() {
  const { t } = useLanguage();
  
  if (!t || !t.privacy) {
    return null;
  }
  
  const privacy = t.privacy;

  return (
    <div className="pt-20">
      <section className="py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-navy mb-8 text-center">
              {privacy.title}
            </h1>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="prose prose-lg max-w-none">
                  {privacy.content && privacy.content.split('\n\n').map((section: string, index: number) => (
                    <div key={index} className="mb-8">
                      {section.includes('.') && section.match(/^\d+\./) ? (
                        <div>
                          <h2 className="text-xl font-bold text-navy mb-4">
                            {section.split('\n')[0]}
                          </h2>
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {section.split('\n').slice(1).join('\n')}
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {section}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}