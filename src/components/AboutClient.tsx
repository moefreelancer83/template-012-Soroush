"use client";

import AnimatedSection from "@/components/AnimatedSection";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutClient() {
  const { t } = useLanguage();

  if (!t || !t.about) {
    return null;
  }

  const { about } = t;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={about.heroImage || "/placeholder.jpg"}
            alt={about.heritageImageAlt || "Heritage"}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-navy/70"></div>
        </div>
        <div className="relative container mx-auto px-6 text-white">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
              {about.title}
            </h1>
            <p className="text-xl max-w-3xl">{about.subtitle}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="slide-in-left">
              <h2 className="text-4xl font-playfair font-bold text-navy mb-6" data-x="about.heritageTitle">
                {about.heritageTitle || "Heritage of Excellence"}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8" data-x="about.content">
                {about.content}
              </p>
              <div className="bg-light-gold p-6 rounded-lg">
                <h3 className="text-2xl font-playfair font-bold text-navy mb-4" data-x="about.missionTitle">
                  {about.missionTitle || "Our Mission"}
                </h3>
                <p className="text-gray-700" data-x="about.mission">{about.mission}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-right">
              <div className="relative">
                <Image
                  src={about.officeImage || "/placeholder.jpg"}
                  alt={about.officeImageAlt || "Office"}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                  data-x="about.officeImage"
                />
                <div className="absolute -bottom-8 -right-8 bg-navy text-white p-8 rounded-lg shadow-xl">
                  <div className="text-4xl font-playfair font-bold text-gold mb-2">
                    {about.yearsOfExcellence}
                  </div>
                  <div className="text-lg">{about.yearsOfExcellenceLabel}</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {about.stats &&
              about.stats.map((stat: any, index: number) => (
                <AnimatedSection
                  key={stat.label}
                  animation="fade-in"
                  delay={index * 100}
                  className="text-center"
                >
                  <div className="text-4xl font-playfair font-bold text-gold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </AnimatedSection>
              ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-navy mb-6">
              {about.coreValuesTitle || "Our Core Values"}
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {about.values &&
              about.values.map((value: any, index: number) => (
                <AnimatedSection
                  key={value.title}
                  animation="fade-in"
                  delay={index * 150}
                  className="bg-white rounded-lg shadow-lg p-8"
                >
                  <h3 className="text-2xl font-playfair font-bold text-navy mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </AnimatedSection>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
