"use client";

import Image from "next/image";
import { Award, Users, Package, Heart, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";

const stats = [
  { icon: Users, label: "Happy Customers", value: "10,000+" },
  { icon: Package, label: "Products Sold", value: "50,000+" },
  { icon: Award, label: "Years of Excellence", value: "15+" },
  { icon: Heart, label: "Customer Satisfaction", value: "99%" },
];

const values = [
  {
    icon: Award,
    title: "Quality First",
    description: "Every product undergoes rigorous quality control to ensure it meets our high standards and exceeds your expectations."
  },
  {
    icon: Heart,
    title: "Customer Focused",
    description: "Your satisfaction is our priority. We listen, adapt, and continuously improve based on your feedback and needs."
  },
  {
    icon: Target,
    title: "Innovation Driven",
    description: "We constantly seek new materials, designs, and techniques to bring you the latest in garment accessory innovation."
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    description: "Quick processing, reliable shipping, and responsive customer service ensure you get what you need, when you need it."
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container py-8 md:py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            About ButtonHaus
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Crafting Excellence
            <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Since 2009
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're passionate about providing the finest garment accessories to creators, designers, 
            and craftspeople worldwide. Our journey began with a simple mission: to make premium 
            quality accessible to everyone.
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                ButtonHaus was founded in 2009 by a team of fashion enthusiasts who noticed a gap 
                in the market for high-quality, affordable garment accessories. What started as a 
                small family business has grown into a trusted name in the industry.
              </p>
              <p>
                Our founders, Maria and David Chen, began their journey in a small workshop, 
                carefully curating buttons, zippers, and trims from artisans around the world. 
                Their commitment to quality and customer service quickly earned them a loyal following.
              </p>
              <p>
                Today, we serve thousands of customers globally, from independent designers to 
                major fashion houses, while maintaining the same personal touch and attention 
                to detail that defined our early days.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border shadow-lg">
              <Image
                src="https://images.pexels.com/photos/6447067/pexels-photo-6447067.jpeg"
                alt="ButtonHaus workshop with various garment accessories"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            The passionate people behind ButtonHaus who make it all possible
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Chen",
                role: "Co-Founder & CEO",
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
              },
              {
                name: "David Chen",
                role: "Co-Founder & CTO",
                image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
              },
              {
                name: "Sarah Johnson",
                role: "Head of Design",
                image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 border">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}