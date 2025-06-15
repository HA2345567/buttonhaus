"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Package, Users, Star } from "lucide-react";
import { motion } from "framer-motion";

import { categories, products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CategoriesPage() {
  const getCategoryStats = (categoryId: string) => {
    const categoryProducts = products.filter(p => p.category === categoryId);
    const totalProducts = categoryProducts.length;
    const avgRating = categoryProducts.reduce((sum, p) => sum + p.rating, 0) / totalProducts;
    const totalReviews = categoryProducts.reduce((sum, p) => sum + p.reviews, 0);
    
    return { totalProducts, avgRating, totalReviews };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            <Package className="mr-1 h-3 w-3" />
            All Categories
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Explore Our
            <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Premium Collection
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover high-quality accessories across all categories, carefully curated for your creative projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((category, index) => {
            const stats = getCategoryStats(category.id);
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/products?category=${category.slug}`}>
                  <div className="relative overflow-hidden rounded-3xl border bg-card shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                          {stats.totalProducts} Products
                        </Badge>
                      </div>
                      
                      <div className="absolute bottom-6 left-6 right-6">
                        <h2 className="text-3xl font-bold text-white mb-3">
                          {category.name}
                        </h2>
                        <p className="text-white/90 text-lg leading-relaxed mb-4">
                          {category.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-white/80 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{stats.avgRating.toFixed(1)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{stats.totalReviews} reviews</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-between text-lg h-12 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        Shop {category.name}
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 border">
            <h3 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Browse all our products or get in touch with our team for custom solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/products">
                  View All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}