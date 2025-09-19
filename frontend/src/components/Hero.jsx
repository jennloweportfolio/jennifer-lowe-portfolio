import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowDown, Mail, Phone, MapPin } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Hero = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API}/profile`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-black pt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </section>
    );
  }

  if (!profileData) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-black pt-16">
        <div className="text-center">
          <p className="text-gray-400">Unable to load profile information</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-black pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Side */}
          <div className="space-y-8 lg:order-1">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight refined-title">
                {profileData.tagline}
              </h1>
              <p className="text-xl text-yellow-600 leading-relaxed refined-text">
                {profileData.subtitle}
              </p>
              <p className="text-lg text-gray-300 leading-relaxed max-w-2xl refined-text">
                I specialize in transforming complex challenges into breakthrough solutions through strategic innovation and systematic excellence. My expertise spans regulatory navigation, innovative financial strategies, and guiding purpose-driven entrepreneurs to overcome their most daunting obstacles.
              </p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-yellow-600" />
                <span>{profileData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-yellow-600" />
                <span>{profileData.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-yellow-600" />
                <span>{profileData.location}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection('#projects')}
                className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-8 py-3 text-lg font-semibold refined-hover border-0 rounded-lg hover:from-yellow-700 hover:to-yellow-800"
              >
                View My Work
              </Button>
              <Button 
                variant="outline" 
                onClick={() => scrollToSection('#contact')}
                className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-black px-8 py-3 text-lg font-medium refined-hover rounded-lg"
              >
                Get In Touch
              </Button>
            </div>
          </div>

          {/* Image Side */}
          <div className="flex justify-center lg:justify-end lg:order-2">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden refined-shadow-lg ring-2 ring-yellow-600/20">
                <img 
                  src="https://customer-assets.emergentagent.com/job_206f622d-a351-459e-9358-22cbc368f865/artifacts/3tq2mims_Jenn%20blue%20background.png" 
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements with gold accents */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-2xl -z-10 opacity-20"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full -z-10 opacity-20"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-20">
          <button 
            onClick={() => scrollToSection('#about')}
            className="animate-bounce p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
          >
            <ArrowDown size={24} className="text-yellow-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
