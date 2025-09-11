'use client';

import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { useLanguage } from '@/contexts/LanguageContext';

export default function ServicesClient() {
  const { t } = useLanguage();
  
  if (!t || !t.services) {
    return null;
  }
  
  const { services, cta, contact } = t;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-navy to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
              {services.title}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {services.description}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.areas && services.areas.map((service: any, index: number) => (
              <AnimatedSection
                key={service.title}
                animation="fade-in"
                delay={index * 100}
                className="bg-white rounded-lg shadow-xl p-8 card-hover"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gold/10 rounded-lg flex items-center justify-center">
                    <div className="w-8 h-8 bg-gold rounded"></div>
                  </div>
                </div>
                <h3 className="text-2xl font-playfair font-bold text-navy mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-navy text-white">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-playfair font-bold mb-6">
              {cta?.homeTitle || "Ready to Get Started?"}
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              {cta?.homeDescription || "Contact us today for a confidential consultation. Our experienced legal team is ready to provide the strategic counsel you need."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-secondary">
                {cta?.scheduleConsultationText || "Schedule Consultation"}
              </Link>
              <Link 
                href={`tel:${contact?.phone || ''}`}
                className="btn-primary border-2 border-white hover:bg-white hover:text-navy"
              >
                {cta?.callPrefix || "Call"} {contact?.phone || ''}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}