import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, TrendingUp, Shield, Users, Award, Palette } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsResponse, testimonialsResponse] = await Promise.all([
          axios.get(`${API}/projects`),
          axios.get(`${API}/testimonials`)
        ]);
        setProjects(projectsResponse.data);
        setTestimonials(testimonialsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const projectIcons = {
    "Dust to Diamonds - Premium Cleaning Service Website": <Palette className="w-5 h-5" />,
    "Stay Volcano Hawaii - Luxury Vacation Rental Success": <TrendingUp className="w-5 h-5" />,
    "Forensic Business Analysis": <Shield className="w-5 h-5" />,
    "Innovative Financial Strategies Program": <Users className="w-5 h-5" />,
    "Athletic Achievement - Ironman World Championship": <Award className="w-5 h-5" />
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 refined-title">
            Featured Projects & Achievements
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto refined-text">
            Real-world examples of transforming complex challenges into measurable success stories across strategic consulting, innovative financial services, and systematic business optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <Card key={project.id} className="refined-hover refined-shadow border-0 bg-gray-900 border border-gray-800 overflow-hidden group">
              <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-yellow-400 transform group-hover:scale-110 transition-transform duration-300">
                  {projectIcons[project.title] || <TrendingUp className="w-16 h-16" />}
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-yellow-400 text-black">
                    Featured
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl text-white group-hover:text-yellow-400 transition-colors duration-300 refined-title">
                  {project.title}
                </CardTitle>
                <p className="text-gray-300 leading-relaxed refined-text">
                  {project.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  {project.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="text-center p-3 bg-gray-800 rounded-lg border border-gray-700">
                      <div className="font-semibold text-yellow-400 text-sm">
                        {metric}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-gray-600 text-gray-300">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Button */}
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-yellow-400 group-hover:text-black group-hover:border-yellow-400 border-gray-600 text-gray-300 transition-all duration-300 refined-hover"
                >
                  <ExternalLink size={16} className="mr-2" />
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-8 text-center refined-title">
              Client Success Stories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.slice(0, 4).map((testimonial, index) => (
                <Card key={testimonial.id} className="refined-shadow border-0 bg-gray-900 border border-gray-800 refined-hover">
                  <CardContent className="p-6">
                    <blockquote className="text-gray-300 mb-4 refined-text leading-relaxed">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-black font-semibold">
                          {testimonial.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-white">{testimonial.author}</div>
                        <div className="text-sm text-gray-400">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center bg-gray-900 border border-gray-800 rounded-2xl p-8 refined-shadow">
          <h3 className="text-2xl font-bold text-white mb-4 refined-title">
            Ready to Transform Your Challenges?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto refined-text">
            Whether you're facing regulatory obstacles, operational challenges, or need strategic guidance, I bring the problem-solving expertise to turn your biggest challenges into breakthrough opportunities.
          </p>
          <Button 
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-3 text-lg font-semibold refined-hover border-0 rounded-lg hover:from-yellow-500 hover:to-yellow-600"
            onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Transformation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
