'use client';

import { notFound } from 'next/navigation';
import AnimatedSection from '@/components/AnimatedSection';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, GraduationCap, Scale, Globe, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TeamMemberClientProps {
  slug: string;
}

export default function TeamMemberClient({ slug }: TeamMemberClientProps) {
  const { t } = useLanguage();
  
  if (!t || !t.team) {
    return null;
  }
  
  const member = t.team.members.find((m: any) => {
    const memberSlug = m.slug || m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return memberSlug === slug;
  });

  if (!member) {
    notFound();
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-navy to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="slide-in-left">
              <div className="relative max-w-md mx-auto">
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="rounded-lg shadow-xl object-cover"
                />
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-in-right">
              <h1 className="text-5xl font-playfair font-bold mb-4">
                {member.name}
              </h1>
              <p className="text-2xl text-gold mb-6">{member.title}</p>
              <p className="text-lg text-gray-200 leading-relaxed">
                {member.shortBio}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Back to Team */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-6">
          <Link 
            href="/team"
            className="inline-flex items-center text-navy hover:text-gold transition-colors"
          >
            <ChevronLeft className="mr-2" size={20} />
            Back to Team
          </Link>
        </div>
      </div>

      {/* Full Bio Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-in">
              <h2 className="text-3xl font-playfair font-bold text-navy mb-8">
                Professional Background
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p>{member.fullBio}</p>
              </div>
            </AnimatedSection>

            {/* Qualifications Grid */}
            <div className="grid md:grid-cols-2 gap-8 mt-16">
              {/* Education */}
              {member.education && (
                <AnimatedSection animation="slide-in-left" delay={100}>
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-center mb-6">
                      <GraduationCap className="text-gold mr-3" size={28} />
                      <h3 className="text-2xl font-playfair font-bold text-navy">Education</h3>
                    </div>
                    <ul className="space-y-3">
                      {member.education.map((edu: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-gold mr-3 mt-1">•</span>
                          <span className="text-gray-600">{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              )}

              {/* Bar Admissions */}
              {member.admissions && (
                <AnimatedSection animation="slide-in-right" delay={200}>
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-center mb-6">
                      <Scale className="text-gold mr-3" size={28} />
                      <h3 className="text-2xl font-playfair font-bold text-navy">Bar Admissions</h3>
                    </div>
                    <ul className="space-y-3">
                      {member.admissions.map((admission: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-gold mr-3 mt-1">•</span>
                          <span className="text-gray-600">{admission}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              )}

              {/* Languages */}
              {member.languages && (
                <AnimatedSection animation="slide-in-left" delay={300}>
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-center mb-6">
                      <Globe className="text-gold mr-3" size={28} />
                      <h3 className="text-2xl font-playfair font-bold text-navy">Languages</h3>
                    </div>
                    <ul className="space-y-3">
                      {member.languages.map((language: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-gold mr-3 mt-1">•</span>
                          <span className="text-gray-600">{language}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              )}

              {/* Professional Memberships */}
              {member.memberships && (
                <AnimatedSection animation="slide-in-right" delay={400}>
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-center mb-6">
                      <Award className="text-gold mr-3" size={28} />
                      <h3 className="text-2xl font-playfair font-bold text-navy">Memberships</h3>
                    </div>
                    <ul className="space-y-3">
                      {member.memberships.map((membership: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-gold mr-3 mt-1">•</span>
                          <span className="text-gray-600">{membership}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Contact CTA */}
            <AnimatedSection animation="fade-in" delay={500}>
              <div className="mt-16 bg-light-gold rounded-lg p-10 text-center">
                <h3 className="text-2xl font-playfair font-bold text-navy mb-4">
                  Get in Touch with {member.name}
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Schedule a consultation to discuss your legal needs and learn how {member.name} can assist you.
                </p>
                <Link href="/contact" className="btn-primary">
                  Schedule Consultation
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Other Team Members */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-playfair font-bold text-navy mb-12 text-center">
            Meet Other Team Members
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {t.team.members
              .filter((m: any) => {
                const memberSlug = m.slug || m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                return memberSlug !== slug;
              })
              .slice(0, 4)
              .map((otherMember: any, index: number) => {
                const otherSlug = otherMember.slug || otherMember.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                return (
                  <AnimatedSection
                    key={otherSlug}
                    animation="fade-in"
                    delay={index * 100}
                  >
                    <Link href={`/team/${otherSlug}`}>
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
                        <div className="aspect-square relative">
                          <Image
                            src={otherMember.photo}
                            alt={otherMember.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-playfair font-bold text-navy mb-2">
                            {otherMember.name}
                          </h3>
                          <p className="text-gold font-semibold">
                            {otherMember.title}
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
    </div>
  );
}