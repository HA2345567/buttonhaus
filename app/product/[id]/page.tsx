"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart, Star, Truck, Heart } from "lucide-react";

import { products } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/products/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const product = products.find((p) => p.id === id);
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");
  const [quantity, setQuantity] = useState(1);
  
  const cart = useCart();
  const wishlist = useWishlist();
  const isInWishlist = product ? wishlist.isInWishlist(product.id) : false;
  
  if (!product) {
    // Could use a more sophisticated "product not found" UI here
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-4">The product you are looking for does not exist.</p>
        <Button className="mt-6" onClick={() => router.push("/products")}>
          Browse Products
        </Button>
      </div>
    );
  }
  
  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  const handleAddToCart = () => {
    cart.addItem({
      id: crypto.randomUUID(),
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      color: selectedColor,
      size: selectedSize,
    });
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      wishlist.removeItem(product.id);
    } else {
      wishlist.addItem(product);
    }
  };
  
  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, Math.min(10, value)));
  };
  
  return (
    <div className="container py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full"
              >
                <Image
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            
            {product.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => 
                    setActiveImageIndex((activeImageIndex - 1 + product.images.length) % product.images.length)
                  }
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => 
                    setActiveImageIndex((activeImageIndex + 1) % product.images.length)
                  }
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                    activeImageIndex === index ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="flex flex-col">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            
            <div className="mt-4 flex items-center gap-4">
              <div className="text-2xl font-semibold">₹{product.price.toFixed(2)}</div>
              
              <div className="flex items-center gap-1">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>
            
            <p className="mt-6 text-muted-foreground">{product.description}</p>
            
            <Separator className="my-6" />
          </div>
          
          <div className="space-y-6 flex-grow">
            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-3">Color</h3>
                <RadioGroup
                  value={selectedColor}
                  onValueChange={setSelectedColor}
                  className="flex flex-wrap gap-3"
                >
                  {product.colors.map((color) => (
                    <div key={color.name} className="flex items-center gap-2">
                      <RadioGroupItem
                        id={`color-${color.name}`}
                        value={color.name}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`color-${color.name}`}
                        className="flex items-center gap-2 rounded-md border p-2 peer-data-[state=checked]:border-primary cursor-pointer"
                      >
                        <div
                          className="h-5 w-5 rounded-full border"
                          style={{ backgroundColor: color.value }}
                        ></div>
                        <span>{color.name}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-3">Size</h3>
                <RadioGroup
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  className="flex flex-wrap gap-2"
                >
                  {product.sizes.map((size) => (
                    <div key={size} className="flex items-center gap-2">
                      <RadioGroupItem
                        id={`size-${size}`}
                        value={size}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`size-${size}`}
                        className="flex min-w-[40px] items-center justify-center rounded-md border px-3 py-2 text-center peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium mb-3">Quantity</h3>
              <div className="flex items-center border rounded-md w-fit">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-12 text-center">{quantity}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="flex gap-3">
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={handleToggleWishlist}
                className={cn(
                  "px-4",
                  isInWishlist && "text-red-500 border-red-500 hover:bg-red-50"
                )}
              >
                <Heart className={cn("h-5 w-5", isInWishlist && "fill-current")} />
              </Button>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="h-4 w-4" />
              <span>Free shipping on orders over ₹50</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="py-6">
            <div className="prose max-w-none dark:prose-invert">
              <p>{product.description}</p>
              <p>
                Our {product.name} is crafted with attention to detail and quality in mind. 
                Perfect for a variety of projects, these accessories add both functionality 
                and style to your creations.
              </p>
              <p>
                Each piece undergoes rigorous quality control to ensure durability and 
                performance that meets our high standards. Whether you're a professional 
                designer or a hobbyist, these accessories will elevate your work.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Details</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between pb-2 border-b">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{product.categoryName}</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b">
                    <span className="text-muted-foreground">Materials</span>
                    <span className="font-medium">{product.materials.join(", ")}</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b">
                    <span className="text-muted-foreground">Available Sizes</span>
                    <span className="font-medium">{product.sizes.join(", ")}</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b">
                    <span className="text-muted-foreground">Available Colors</span>
                    <span className="font-medium">{product.colors.map(c => c.name).join(", ")}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Care Instructions</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Store in a cool, dry place away from direct sunlight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Clean metal items with a soft, dry cloth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>For fabric items, hand wash with mild detergent if necessary</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Avoid contact with harsh chemicals</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="py-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Customer Reviews</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm">
                      Based on {product.reviews} reviews
                    </span>
                  </div>
                </div>
                
                <Button>Write a Review</Button>
              </div>
              
              <div className="space-y-4">
                <p className="text-muted-foreground text-center py-8">
                  Customer reviews coming soon!
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}