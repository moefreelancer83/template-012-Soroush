'use client';

import AnimatedSection from '@/components/AnimatedSection';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TeamClient() {
  const { t } = useLanguage();
  
  if (!t || !t.team) {
    return null;
  }
  
  const { team, contact } = t;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-navy to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
              {team.title}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {team.description || "Meet our distinguished team of legal professionals who bring decades of experience and unwavering commitment to excellence in every case."}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.members && team.members.map((member: any, index: number) => {
              const slug = member.slug || member.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              return (
                <AnimatedSection
                  key={slug}
                  animation="fade-in"
                  delay={index * 100}
                >
                  <Link href={`/team/${slug}`}>
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden card-hover group">
                      <div className="aspect-[4/5] relative">
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <p className="text-sm font-semibold mb-2">{team.viewProfileText || "View Profile"}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h2 className="text-2xl font-playfair font-bold text-navy mb-2">
                          {member.name}
                        </h2>
                        <p className="text-gold font-semibold mb-3">
                          {member.title}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {member.shortBio}
                        </p>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-navy text-white">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-playfair font-bold mb-6">
              Schedule a Consultation
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Our team is ready to provide the legal expertise you need. Contact us today to discuss your case with one of our experienced attorneys.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-secondary">
                Schedule Consultation
              </Link>
              <Link 
                href={`tel:${contact?.phone || ''}`}
                className="btn-primary border-2 border-white hover:bg-white hover:text-navy"
              >
                Call {contact?.phone || ''}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}