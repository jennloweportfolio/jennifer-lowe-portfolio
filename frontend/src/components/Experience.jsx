import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Calendar, Building } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Experience = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await axios.get(`${API}/experience`);
        setExperience(response.data);
      } catch (error) {
        console.error('Error fetching experience:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Professional Experience
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A proven track record of transforming challenges into success across innovative financial services, strategic consulting, and systematic business optimization.
          </p>
        </div>

        <div className="space-y-8">
          {experience.map((job, index) => (
            <Card key={job.id} className="refined-hover refined-shadow border-0 bg-gray-900 border-l-4 border-l-yellow-400">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="space-y-2">
                    <CardTitle className="text-xl text-white">
                      {job.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-yellow-400 font-semibold">
                      <Building size={16} />
                      {job.company}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {job.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {job.location}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="self-start whitespace-nowrap border-gray-600 text-gray-300">
                    {job.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {job.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 leading-relaxed">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Career Highlights */}
        <div className="mt-16 bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Career Highlights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-800 border border-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400 mb-2">USC Graduate</div>
              <div className="text-gray-300">Business Administration</div>
            </div>
            <div className="text-center p-4 bg-gray-800 border border-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400 mb-2">Strategic Innovation</div>
              <div className="text-gray-300">Alternative Financial Solutions</div>
            </div>
            <div className="text-center p-4 bg-gray-800 border border-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400 mb-2">World-Class</div>
              <div className="text-gray-300">Athletic Achievement</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
