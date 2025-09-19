import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Briefcase, Users, Calculator, Lightbulb, Monitor } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${API}/skills`);
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const skillIcons = {
    "Strategic Problem-Solving": <Lightbulb className="w-5 h-5" />,
    "Innovative Financial Services": <Calculator className="w-5 h-5" />,
    "Business Operations": <Briefcase className="w-5 h-5" />,
    "Transformation Coaching": <Users className="w-5 h-5" />,
    "Technology & Systems": <Monitor className="w-5 h-5" />
  };

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            My diverse expertise spans strategic problem-solving, innovative financial services, and transformation coaching - all unified by a systematic approach to turning complex challenges into breakthrough solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillGroup, index) => (
            <Card key={index} className="refined-hover refined-shadow border-0 bg-gray-800 border border-gray-700 hover:scale-105 transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="p-2 bg-yellow-400 rounded-lg text-black">
                    {skillIcons[skillGroup.category] || <Lightbulb className="w-5 h-5" />}
                  </div>
                  <span className="text-white">{skillGroup.category}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-300">
                          {skill}
                        </span>
                        <span className="text-xs text-yellow-400">
                          Expert
                        </span>
                      </div>
                      <Progress 
                        value={85 + Math.random() * 15} 
                        className="h-2 bg-gray-700"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Achievements */}
        <div className="mt-16 bg-gray-800 border border-gray-700 rounded-2xl p-8 refined-shadow">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Key Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">90%+</div>
              <div className="text-gray-300">Strategic Implementation Success</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">15+</div>
              <div className="text-gray-300">Years Financial Innovation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">100%</div>
              <div className="text-gray-300">Complex Problem Resolution</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">2x</div>
              <div className="text-gray-300">Ironman World Championships</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
