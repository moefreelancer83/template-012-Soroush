'use client';

import AnimatedSection from '@/components/AnimatedSection';
import ContactForm from '@/components/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactClient() {
  const { t } = useLanguage();
  
  if (!t || !t.contact) {
    return null;
  }
  
  const contact = t.contact;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-navy to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
              {contact.title}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {contact.subtitle}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <AnimatedSection animation="slide-in-left">
              <h2 className="text-3xl font-playfair font-bold text-navy mb-8">
                {contact.getInTouchTitle || "Get In Touch"}
              </h2>
              <p className="text-gray-600 mb-8">
                {contact.getInTouchDescription || "Contact our office to schedule a confidential consultation."}
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-gold mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-navy mb-2">{contact.officeAddressLabel || "Office Address"}</h3>
                    <p className="text-gray-600">
                      {contact.address?.street}<br />
                      {contact.address?.city}<br />
                      {contact.address?.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="text-gold mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-navy mb-2">{contact.phoneNumbersLabel || "Phone Numbers"}</h3>
                    <p className="text-gray-600">
                      {contact.officeLabel || "Office"}: {contact.phone}<br />
                      {contact.emergencyLabel || "Emergency"}: {contact.emergencyPhone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="text-gold mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-navy mb-2">{contact.emailLabel || "Email"}</h3>
                    <p className="text-gray-600">{contact.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="text-gold mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-navy mb-2">{contact.officeHoursLabel || "Office Hours"}</h3>
                    <p className="text-gray-600">
                      {contact.hours?.weekdays || "Monday - Friday: 9:00 - 18:00"}<br />
                      {contact.hours?.saturday || "Saturday: By appointment"}<br />
                      {contact.hours?.sunday || "Sunday: Closed"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-light-gold rounded-lg">
                <h3 className="font-semibold text-navy mb-2">{contact.directionsLabel || "Directions"}</h3>
                <p className="text-gray-700">
                  {contact.directions || "Located in the heart of Zurich's financial district."}
                </p>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection animation="slide-in-right">
              <div className="bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-2xl font-playfair font-bold text-navy mb-2">
                  {contact.formTitle || "Send Us a Message"}
                </h2>
                <p className="text-gray-600 mb-6">
                  {contact.formSubtitle || "We'll respond within 24 hours"}
                </p>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl font-playfair font-bold text-navy mb-8 text-center">
              {contact.findOfficeTitle || "Find Our Office"}
            </h2>
            <div className="rounded-lg overflow-hidden shadow-xl h-96">
              <iframe
                src={contact.googleMapsLink || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.776498374094!2d8.538433315620904!3d47.36813307916969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479aa0a7c4f0c6cf%3A0x9b2b2b2b2b2b2b2b!2sBahnhofstrasse%2C%20Z%C3%BCrich%2C%20Switzerland!5e0!3m2!1sen!2sus!4v1234567890"}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={contact.mapTitle || "Office Location"}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-16 bg-navy text-white">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              {contact.emergencyCtaTitle || "Need Immediate Legal Assistance?"}
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {contact.emergencyCtaDescription || "Our emergency hotline is available 24/7 for urgent legal matters."}
            </p>
            <div className="text-2xl font-bold text-gold">
              {contact.emergencyHotlinePrefix || "Emergency Hotline:"} {contact.emergencyPhone}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}