'use client';

import AnimatedSection from '@/components/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ImpressumClient() {
  const { t } = useLanguage();
  
  if (!t || !t.impressum) {
    return null;
  }
  
  const impressum = t.impressum;

  return (
    <div className="pt-20">
      <section className="py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-navy mb-8 text-center">
              {impressum.title}
            </h1>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="prose prose-lg max-w-none">
                  {impressum.content && impressum.content.split('\n\n').map((paragraph: string, index: number) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                      {paragraph}
                    </p>
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