import React from 'react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    'Strategic Consulting',
    'Regulatory Navigation Support', 
    'Transformation Coaching',
    'Innovative Financial Strategies',
    'Business System Optimization'
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* About Section */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Jennifer Ann Lowe</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              I transform overwhelming challenges into breakthrough solutions through strategic innovation and systematic optimization. Specializing in regulatory navigation, innovative financial strategies, and helping entrepreneurs tackle the obstacles that have been stalling their progress.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-300">
                <Mail size={16} />
                <a href="mailto:jenn@boostithub.com" className="hover:text-yellow-400 transition-colors">
                  jenn@boostithub.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone size={16} />
                <a href="tel:(805) 555-0123" className="hover:text-yellow-400 transition-colors">
                  (805) 555-0123
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin size={16} />
                <span>Thousand Oaks, CA</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service} className="text-gray-300 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © {currentYear} Jennifer Ann Lowe. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a 
              href="https://theofficialjennlowe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-1"
            >
              <ExternalLink size={14} />
              theofficialjennlowe.com
            </a>
          </div>
        </div>

        {/* Additional Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Ready to transform your challenges into success stories? Let's connect.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
