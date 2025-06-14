"use client";

import { Shield, Truck, RefreshCw, Award, Heart, Zap } from "lucide-react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Shield,
    title: "Premium Quality",
    description: "Every product undergoes rigorous quality control to ensure durability and excellence.",
    color: "text-green-600"
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    description: "Free shipping on orders over ₹50. Express delivery available nationwide.",
    color: "text-blue-600"
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day hassle-free returns. Your satisfaction is our top priority.",
    color: "text-purple-600"
  },
  {
    icon: Award,
    title: "Expert Curation",
    description: "Handpicked by industry professionals for creators and designers.",
    color: "text-yellow-600"
  },
  {
    icon: Heart,
    title: "Customer Love",
    description: "Join thousands of satisfied customers who trust ButtonHaus for their projects.",
    color: "text-red-600"
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Latest trends and cutting-edge designs to keep your creations ahead of the curve.",
    color: "text-indigo-600"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Why Choose ButtonHaus
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Crafted for Excellence
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing the finest garment accessories with unmatched service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-8 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative">
                  <div className={`inline-flex p-3 rounded-xl bg-muted/50 ${feature.color} mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}