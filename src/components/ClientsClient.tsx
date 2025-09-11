'use client';

import AnimatedSection from "@/components/AnimatedSection";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from '@/contexts/LanguageContext';

export default function ClientsClient() {
  const { t } = useLanguage();
  
  if (!t) {
    return null;
  }
  
  const clients = t.clients || {
    title: "Our Clients",
    subtitle: "We serve a diverse range of clients with dedication and expertise",
    types: [],
    testimonials: []
  };
  
  const { cta, contact } = t;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-navy to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
              {clients.title}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {clients.subtitle}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Client Types */}
      {clients.types && clients.types.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl font-playfair font-bold text-navy mb-6">
                Who We Serve
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clients.types.map((type: any, index: number) => (
                <AnimatedSection
                  key={type.title}
                  animation="fade-in"
                  delay={index * 100}
                  className="bg-white rounded-lg shadow-xl overflow-hidden card-hover"
                >
                  <div className="aspect-video relative">
                    <Image
                      src={type.image || "https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&w=800&h=600"}
                      alt={type.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-playfair font-bold text-navy mb-4">
                      {type.title}
                    </h3>
                    <p className="text-gray-600">
                      {type.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {clients.testimonials && clients.testimonials.length > 0 && (
        <section className="py-20 bg-light-gold">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl font-playfair font-bold text-navy mb-6">
                {clients.successStoriesTitle || "Client Success Stories"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {clients.successStoriesDescription || ""}
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clients.testimonials.map((testimonial: any, index: number) => (
                <AnimatedSection
                  key={index}
                  animation="fade-in"
                  delay={index * 100}
                  className="bg-white rounded-lg shadow-lg p-8"
                >
                  <div className="mb-6">
                    <svg className="w-12 h-12 text-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 mb-6 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="text-sm font-semibold text-navy">
                    — {testimonial.author}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-navy text-white">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-playfair font-bold mb-6">
              {clients.ctaTitle || "Become Our Next Success Story"}
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              {clients.ctaDescription || "Join the growing list of satisfied clients who have benefited from our strategic legal counsel."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-secondary">
                {clients.ctaButtonText || "Start Your Legal Journey"}
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