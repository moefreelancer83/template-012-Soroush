'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry. We will contact you within 24 hours.');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto">
      <h3 className="text-2xl font-playfair font-bold text-navy mb-6">
        Schedule a Consultation
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name" className="text-navy font-semibold">
              Full Name *
            </Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-navy font-semibold">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="mt-2"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="phone" className="text-navy font-semibold">
              Phone Number
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="company" className="text-navy font-semibold">
              Company/Organization
            </Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className="mt-2"
            />
          </div>
        </div>

        <div>
          <Label className="text-navy font-semibold">
            Legal Service Needed
          </Label>
          <Select value={formData.service} onValueChange={(value) => handleChange('service', value)}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select a legal service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="corporate">Corporate Law</SelectItem>
              <SelectItem value="litigation">Commercial Litigation</SelectItem>
              <SelectItem value="banking">Banking & Finance</SelectItem>
              <SelectItem value="realestate">Real Estate Law</SelectItem>
              <SelectItem value="employment">Employment Law</SelectItem>
              <SelectItem value="tax">Tax & Regulatory</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="message" className="text-navy font-semibold">
            Message *
          </Label>
          <Textarea
            id="message"
            required
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            className="mt-2 min-h-[120px]"
            placeholder="Please describe your legal matter and how we can assist you..."
          />
        </div>

        <Button
          type="submit"
          className="w-full btn-primary text-lg py-6"
        >
          Send Message
        </Button>
        
        <p className="text-sm text-gray-600 text-center">
          All communications are confidential and protected by attorney-client privilege.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;