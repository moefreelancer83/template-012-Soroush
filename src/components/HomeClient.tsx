"use client";

import HeroSection from "@/components/HeroSection";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HomeClient() {
  const { t } = useLanguage();
  const { hero, services, about, team, cta, contact } = t || {};

  if (!t) {
    return null;
  }

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title={hero?.title || ""}
        subtitle={hero?.subtitle || ""}
        cta={hero?.cta || ""}
        image={hero?.image || ""}
      />

      {/* Services Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-navy mb-6">
              {services?.title || ""}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {services?.description || ""}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.areas &&
              services.areas.slice(0, 6).map((service: any, index: number) => (
                <AnimatedSection
                  key={service.title}
                  animation="fade-in"
                  delay={index * 100}
                  className="bg-white p-8 rounded-lg shadow-lg card-hover"
                >
                  <h3 className="text-xl font-playfair font-bold text-navy mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Link
                    href="/services"
                    className="text-gold font-semibold hover:text-yellow-600 transition-colors"
                  >
                    {services?.learnMoreText || "Learn More →"}
                  </Link>
                </AnimatedSection>
              ))}
          </div>

          <AnimatedSection className="text-center mt-16">
            <Link href="/services" className="btn-primary">
              {services?.viewAllText || "View All Services"}
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* About Us Preview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="slide-in-left">
              {/* <h2
                className="text-4xl md:text-5xl font-playfair font-bold text-navy mb-6"
                data-x="about.title"
              >
                {about?.title || ""}
              </h2>
              <p
                className="text-lg text-gray-600 mb-8 leading-relaxed"
                data-x="about.content"
              >
                {about?.content ? about.content.substring(0, 300) + "..." : ""}
              </p> */}
              <div className="space-y-4 mb-8" data-x-group="about.values">
                {Array.isArray(about?.values) &&
                  (about.values as any[]).map((value: any, index) => (
                    <div
                      key={value.title}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-gold rounded-full mt-3 flex-shrink-0"></div>
                      <div>
                        <h4
                          className="font-semibold text-navy"
                          data-x={`about.values.${index}.title`}
                          data-x-key-in-group="title"
                        >
                          {value.title}
                        </h4>
                        <p
                          className="text-gray-600"
                          data-x={`about.values.${index}.description`}
                          data-x-key-in-group="description"
                        >
                          {value.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              <Link
                href="/about"
                className="btn-primary"
                data-x="about.learnMoreText"
              >
                {about?.learnMoreText || "Learn More"}
              </Link>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-right">
              <div className="relative">
                <Image
                  src={about?.officeImage || "/placeholder.jpg"}
                  alt={about?.officeImageAlt || "Office"}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                  data-x="about.officeImage"
                />
                <div className="absolute -bottom-6 -right-6 bg-navy text-white p-6 rounded-lg">
                  <div
                    className="text-3xl font-playfair font-bold text-gold"
                    data-x="about.yearsOfExcellence"
                  >
                    {about?.yearsOfExcellence || "35+"}
                  </div>
                  <div
                    className="text-sm"
                    data-x="about.yearsOfExcellenceLabel"
                  >
                    {about?.yearsOfExcellenceLabel || "Years of Excellence"}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20 bg-light-gold">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-navy mb-6">
              {team?.title || ""}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {team?.description || ""}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" data-x-group="team.members">
            {team?.members &&
              team.members.map((member: any, index: number) => (
                <AnimatedSection
                  key={member.slug}
                  animation="fade-in"
                  delay={index * 150}
                >
                  <Link href={`/team/${member.slug}`} className="block">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
                      <div className="aspect-square relative">
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          className="object-cover"
                          data-x={`team.members.${index}.photo`}
                          data-x-key-in-group="photo"
                        />
                        <div className="absolute inset-0 bg-navy/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {team?.viewProfileText || "View Profile"}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-playfair font-bold text-navy mb-2" data-x={`team.members.${index}.name`} data-x-key-in-group="name">
                          {member.name}
                        </h3>
                        <p className="text-gold font-semibold mb-3" data-x={`team.members.${index}.title`} data-x-key-in-group="title">
                          {member.title}
                        </p>
                        <p className="text-gray-600 text-sm" data-x={`team.members.${index}.shortBio`} data-x-key-in-group="shortBio">
                          {member.shortBio}
                        </p>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
          </div>

          <AnimatedSection className="text-center mt-16">
            <Link href="/team" className="btn-primary">
              {team?.meetFullTeamText || "Meet Our Full Team"}
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-navy text-white">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              {cta?.homeTitle || ""}
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              {cta?.homeDescription || ""}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-secondary">
                {cta?.scheduleConsultationText || "Schedule Consultation"}
              </Link>
              <Link
                href={`tel:${contact?.phone || ""}`}
                className="btn-primary border-2 border-white hover:bg-white hover:text-navy"
              >
                {cta?.callPrefix || "Call"} {contact?.phone || ""}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
