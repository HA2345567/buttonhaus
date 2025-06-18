"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, ShoppingCart, Star, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useWishlist } from "@/lib/wishlist";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function WishlistPage() {
  const wishlist = useWishlist();
  const cart = useCart();

  const handleAddToCart = (product: any) => {
    cart.addItem({
      id: crypto.randomUUID(),
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    wishlist.removeItem(productId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            My Wishlist
          </h1>
          <p className="text-muted-foreground mb-8">
            Your favorite items saved for later
          </p>
        </motion.div>

        {wishlist.items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
              <Heart className="relative h-24 w-24 text-red-500 mx-auto" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Start browsing and add items you love to your wishlist. They'll appear here for easy access later!
            </p>
            <Button asChild size="lg" className="px-8">
              <Link href="/products">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Start Shopping
              </Link>
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500 fill-current" />
                <span className="text-lg font-semibold">
                  {wishlist.totalItems()} {wishlist.totalItems() === 1 ? 'item' : 'items'}
                </span>
              </div>
              <Button 
                variant="outline" 
                onClick={() => wishlist.clearWishlist()}
                className="text-destructive hover:text-destructive"
              >
                Clear All
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence initial={false}>
                {wishlist.items.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group relative bg-card rounded-2xl border shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
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
                      
                      <button
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 z-10"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>

                      {product.bestseller && (
                        <div className="absolute top-3 left-3 z-10">
                          <Badge className="bg-primary">Bestseller</Badge>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="text-sm text-muted-foreground mb-1">
                        {product.categoryName}
                      </div>
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        <Link href={`/product/${product.id}`} className="hover:text-primary transition-colors">
                          {product.name}
                        </Link>
                      </h3>
                      
                      <div className="flex items-center gap-1 text-sm mb-3">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-medium">{product.rating}</span>
                        <span className="text-muted-foreground">
                          ({product.reviews})
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="font-bold text-lg">
                          ₹{product.price.toFixed(2)}
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          className="bg-primary hover:bg-primary/90"
                        >
                          <ShoppingCart className="mr-1 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-12 text-center">
              <Button asChild size="lg" variant="outline">
                <Link href="/products">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}