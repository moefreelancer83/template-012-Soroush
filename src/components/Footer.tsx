import Link from 'next/link';

interface FooterProps {
  footer: {
    companyName: string;
    tagline: string;
    quickLinksTitle: string;
    legalTitle: string;
    emergencyTitle: string;
    links: Array<{ title: string; url: string }>;
    copyright: string;
    attorneyDisclaimer: string;
  };
  contact: {
    address: {
      street: string;
      city: string;
      country: string;
    };
    phone: string;
    email: string;
    emergencyPhone: string;
    hours: {
      emergency: string;
    };
  };
}

const Footer = ({ footer, contact }: FooterProps) => {
  // Add safety checks for undefined data
  if (!footer || !contact) {
    return null;
  }
  
  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-playfair font-bold mb-4">
              {footer.companyName || 'Keller Law Firm'}
            </h3>
            <p className="text-gray-300 mb-4">
              {footer.tagline || ''}
            </p>
            <div className="text-sm text-gray-400">
              <p>{contact.address?.street || ''}</p>
              <p>{contact.address?.city || ''}, {contact.address?.country || ''}</p>
              <p className="mt-2">{contact.phone || ''}</p>
              <p>{contact.email || ''}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold">{footer.quickLinksTitle || 'Quick Links'}</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-gold transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-gold transition-colors">Legal Services</Link></li>
              <li><Link href="/team" className="text-gray-300 hover:text-gold transition-colors">Our Team</Link></li>
              <li><Link href="/clients" className="text-gray-300 hover:text-gold transition-colors">Our Clients</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold">{footer.legalTitle || 'Legal'}</h4>
            <ul className="space-y-2">
              {footer.links && footer.links.map((link) => (
                <li key={link.title}>
                  <Link href={link.url} className="text-gray-300 hover:text-gold transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-sm text-gray-400">
              <p>{footer.emergencyTitle || ''}</p>
              <p className="text-gold font-semibold">{contact.emergencyPhone || ''}</p>
              <p className="mt-2">{contact.hours?.emergency || ''}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>{footer.copyright || `© ${new Date().getFullYear()} Keller Law Firm. All rights reserved.`}</p>
          <p className="mt-2 text-sm">
            {footer.attorneyDisclaimer || ''}
          </p>
          <p className="mt-4">
            <a 
              href={`${process.env.NEXT_PUBLIC_LANDING_CLIENT_URL || 'http://localhost:3000'}/auth/login?templateId=template-012`}
              className="text-gray-500 hover:text-gold text-xs transition-colors"
            >
              Admin
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;