"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cart = useCart();
  
  const handleAddToCart = () => {
    cart.addItem({
      id: crypto.randomUUID(),
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className={cn(
          "overflow-hidden group h-full flex flex-col",
          featured ? "sm:col-span-2 md:col-span-1" : ""
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden">
          <Link href={`/product/${product.id}`}>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          
          {product.bestseller && (
            <div className="absolute top-2 left-2 z-10">
              <Badge className="bg-primary">Bestseller</Badge>
            </div>
          )}
          
          <div 
            className={cn(
              "absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300",
              isHovered ? "opacity-100" : ""
            )}
          >
            <Button 
              size="sm" 
              className="bg-white text-black hover:bg-white/90"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
        
        <CardHeader className="p-4">
          <CardDescription className="text-sm">{product.categoryName}</CardDescription>
          <CardTitle className="text-lg mt-1">
            <Link href={`/product/${product.id}`} className="hover:underline">
              {product.name}
            </Link>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-4 pt-0 flex-grow">
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-muted-foreground">
              ({product.reviews})
            </span>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="font-semibold">${product.price.toFixed(2)}</div>
          {product.colors.length > 0 && (
            <div className="flex gap-1">
              {product.colors.slice(0, 3).map((color) => (
                <div
                  key={color.name}
                  className="h-4 w-4 rounded-full border border-muted"
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                ></div>
              ))}
              {product.colors.length > 3 && (
                <div className="text-xs text-muted-foreground">+{product.colors.length - 3}</div>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}