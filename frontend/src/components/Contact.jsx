import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Mail, Phone, MapPin, Send, MessageSquare, Calendar } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    service_type: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API}/profile`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.data.success) {
        toast({
          title: "Message Sent Successfully!",
          description: response.data.message,
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          service_type: ''
        });
      }
    } catch (error) {
      toast({
        title: "Error Sending Message",
        description: "There was an error sending your message. Please try again or contact me directly.",
        variant: "destructive",
      });
      console.error('Error submitting contact form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceTypes = [
    "Strategic Consulting", 
    "Regulatory Navigation Support",
    "Transformation Coaching",
    "Innovative Financial Strategies",
    "Business System Optimization",
    "General Inquiry"
  ];

  const contactInfo = profileData ? [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: profileData.email,
      href: `mailto:${profileData.email}`
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: profileData.phone,
      href: `tel:${profileData.phone}`
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: profileData.location,
      href: null
    }
  ] : [];

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Let's Transform Your Challenges
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to tackle those overwhelming problems that have been sitting on your desk? Let's discuss how I can help you navigate complex challenges and achieve breakthrough results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <Card className="refined-shadow border-0 bg-gray-800 border border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-white">
                <MessageSquare className="w-5 h-5 text-yellow-400" />
                Send a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                      disabled={isSubmitting}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      disabled={isSubmitting}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service_type" className="text-gray-300">How Can I Help?</Label>
                  <select
                    id="service_type"
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:opacity-50"
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Select a service...</option>
                    {serviceTypes.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief subject line"
                    required
                    disabled={isSubmitting}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-300">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your challenge or project..."
                    rows={5}
                    required
                    disabled={isSubmitting}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 text-lg font-semibold refined-hover border-0 rounded-lg hover:from-yellow-500 hover:to-yellow-600 disabled:opacity-50 disabled:transform-none"
                  disabled={isSubmitting}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information & CTA */}
          <div className="space-y-8">
            
            {/* Contact Info */}
            {profileData && (
              <Card className="refined-shadow border-0 bg-gray-800 border border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Get In Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg">
                      <div className="p-2 bg-yellow-400 rounded-lg text-black">
                        {info.icon}
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">{info.label}</div>
                        {info.href ? (
                          <a 
                            href={info.href} 
                            className="font-medium text-white hover:text-yellow-400 transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <div className="font-medium text-white">{info.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Services CTA */}
            <Card className="refined-shadow border-0 bg-gray-800 border border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  My Specialties
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex flex-wrap gap-2">
                    {["Strategic Innovation", "Regulatory Navigation", "System Optimization", "Transformation Coaching"].map((specialty) => (
                      <Badge key={specialty} className="bg-yellow-400 text-black">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 mb-6">
                  I specialize in tackling complex, overwhelming challenges through strategic innovation and systematic solutions. From regulatory navigation to innovative financial strategies, I transform obstacles into opportunities.
                </p>
                <Button 
                  variant="outline"
                  className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule a Consultation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
