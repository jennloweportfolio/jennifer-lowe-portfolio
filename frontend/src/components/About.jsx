import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Target, Shield, Lightbulb, Award } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const About = () => {
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

  const highlights = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Strategic Problem Solver",
      description: "I tackle complex regulatory challenges and overwhelming problems with systematic precision and innovative solutions."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Regulatory Navigator",
      description: "Expert at navigating complex statutes, codes, and processes that overwhelm others, turning obstacles into opportunities."
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Transformation Guide",
      description: "Help purpose-driven entrepreneurs overcome their most daunting challenges using proven methodologies and systematic approaches."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Proven Excellence",
      description: "From 90%+ occupancy rates to Ironman World Championship qualification - consistent achievement across all endeavors."
    }
  ];

  if (loading) {
    return (
      <section id="about" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
        </div>
      </section>
    );
  }

  if (!profileData?.about) {
    return (
      <section id="about" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-gray-300">Unable to load about information</p>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 refined-title">
            {profileData.about.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto refined-text">
            {profileData.about.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Story Content */}
          <div className="space-y-6">
            {profileData.about.story.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-300 leading-relaxed refined-text">
                {paragraph}
              </p>
            ))}
            
            <div className="pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Core Strengths</h3>
              <div className="flex flex-wrap gap-2">
                {["Strategic Innovation", "Regulatory Navigation", "Transformation Coaching", "Financial Strategies", "System Optimization", "Excellence Achievement"].map((strength) => (
                  <Badge key={strength} variant="secondary" className="bg-yellow-600 text-white refined-hover">
                    {strength}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Highlights Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="refined-hover refined-shadow border-0 bg-gray-800 border border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-2 bg-yellow-600 rounded-lg text-white">
                      {highlight.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">
                        {highlight.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed refined-text">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
