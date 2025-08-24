import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Shield, Users, Award, Globe, Cpu } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { icon: Users, label: "Happy Customers", value: "50K+" },
    { icon: Globe, label: "Countries Served", value: "120+" },
    { icon: Award, label: "Industry Awards", value: "25+" },
    { icon: Zap, label: "Products Launched", value: "500+" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Quality First",
      description: "Every product undergoes rigorous testing to meet our premium standards"
    },
    {
      icon: Cpu,
      title: "Innovation Driven",
      description: "We stay ahead of tech trends to bring you tomorrow's solutions today"
    },
    {
      icon: Zap,
      title: "Customer Focused",
      description: "Your satisfaction and success drive everything we do"
    }
  ];

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">About Makers Tech</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-glow mb-6">
            Pioneering the Future of Technology
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            For over a decade, Makers Tech has been at the forefront of technological innovation, 
            delivering cutting-edge electronic products that empower businesses and individuals to achieve more.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="card-tech text-center group">
                <IconComponent className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold text-glow mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold mb-6 text-glow">Our Story</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2013 by a team of passionate engineers and designers, Makers Tech began 
                with a simple mission: to make advanced technology accessible to everyone.
              </p>
              <p>
                What started as a small startup in Silicon Valley has grown into a global technology 
                company, serving customers in over 120 countries and partnering with industry leaders 
                to push the boundaries of what's possible.
              </p>
              <p>
                Today, we continue to innovate across multiple product categories, from high-performance 
                computing and mobile devices to cutting-edge wearables and smart home solutions.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="card-tech p-8 bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="text-center">
                <div className="text-6xl font-bold text-glow mb-2">10+</div>
                <div className="text-xl text-muted-foreground mb-4">Years of Innovation</div>
                <div className="w-16 h-1 bg-gradient-primary mx-auto rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-glow mb-6">Our Values</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These core principles guide every decision we make and every product we create.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <Card key={index} className="card-tech text-center">
                <CardContent className="p-8">
                  <IconComponent className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-3">{value.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;