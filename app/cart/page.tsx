"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Minus, Plus, ShoppingBag, Trash2, CreditCard, Truck, Shield, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { PaymentModal } from "@/components/payment/PaymentModal";

export default function CartPage() {
  const cart = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  
  const handleQuantityChange = (id: string, quantity: number) => {
    cart.updateQuantity(id, Math.max(1, quantity));
  };
  
  const handleRemoveItem = (id: string) => {
    cart.removeItem(id);
  };

  const handleApplyPromo = () => {
    // Demo promo codes
    const promoCodes = {
      "SAVE10": 0.1,
      "WELCOME20": 0.2,
      "FIRST15": 0.15
    };

    if (promoCodes[promoCode as keyof typeof promoCodes]) {
      setAppliedPromo(promoCode);
      setPromoCode("");
    } else {
      alert("Invalid promo code");
    }
  };

  const subtotal = cart.totalPrice();
  const discount = appliedPromo ? subtotal * (appliedPromo === "SAVE10" ? 0.1 : appliedPromo === "WELCOME20" ? 0.2 : 0.15) : 0;
  const shippingCost = subtotal > 50 ? 0 : 5.99;
  const tax = (subtotal - discount) * 0.18; // 18% GST
  const total = subtotal - discount + shippingCost + tax;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground mb-8">
            Review your items and proceed to checkout
          </p>
        </motion.div>
        
        {cart.items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
              <ShoppingBag className="relative h-24 w-24 text-primary mx-auto" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <Button asChild size="lg" className="px-8">
              <Link href="/products">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Start Shopping
              </Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-2xl border shadow-lg overflow-hidden"
              >
                <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-transparent">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Cart Items ({cart.totalItems()})
                  </h2>
                </div>
                
                <div className="p-6">
                  <AnimatePresence initial={false}>
                    <div className="space-y-6">
                      {cart.items.map((item, index) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, height: 0, y: 20 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="group relative"
                        >
                          <div className="flex items-center gap-4 p-4 rounded-xl border bg-gradient-to-r from-background to-muted/20 hover:shadow-md transition-all duration-300">
                            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-lg mb-1">
                                <Link href={`/product/${item.productId}`} className="hover:text-primary transition-colors">
                                  {item.name}
                                </Link>
                              </h3>
                              
                              <div className="flex flex-wrap gap-2 mb-3">
                                {item.color && (
                                  <Badge variant="secondary" className="text-xs">
                                    {item.color}
                                  </Badge>
                                )}
                                {item.size && (
                                  <Badge variant="secondary" className="text-xs">
                                    Size: {item.size}
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center border rounded-lg overflow-hidden">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 rounded-none hover:bg-primary/10"
                                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                      disabled={item.quantity <= 1}
                                    >
                                      <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="w-12 text-center text-sm font-medium bg-muted/50">
                                      {item.quantity}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 rounded-none hover:bg-primary/10"
                                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    >
                                      <Plus className="h-3 w-3" />
                                    </Button>
                                  </div>
                                  
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                    onClick={() => handleRemoveItem(item.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Remove
                                  </Button>
                                </div>
                                
                                <div className="text-right">
                                  <div className="font-bold text-lg">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    ₹{item.price.toFixed(2)} each
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </AnimatePresence>
                </div>
                
                <div className="p-6 border-t bg-muted/20">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <Button variant="outline" asChild className="flex-1">
                      <Link href="/products" className="flex items-center justify-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Continue Shopping
                      </Link>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      onClick={() => cart.clearCart()}
                      className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="sticky top-20"
              >
                <div className="bg-card rounded-2xl border shadow-lg overflow-hidden">
                  <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-transparent">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Order Summary
                    </h2>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Subtotal ({cart.totalItems()} items)</span>
                      <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                    </div>
                    
                    {appliedPromo && (
                      <div className="flex justify-between items-center text-green-600">
                        <span>Discount ({appliedPromo})</span>
                        <span className="font-medium">-₹{discount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1">
                        <Truck className="h-4 w-4" />
                        Shipping
                      </span>
                      <span className="font-medium">
                        {shippingCost === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `₹${shippingCost.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Tax (GST 18%)</span>
                      <span className="font-medium">₹{tax.toFixed(2)}</span>
                    </div>
                    
                    {/* Promo Code */}
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                          className="flex-1"
                        />
                        <Button 
                          variant="outline" 
                          onClick={handleApplyPromo}
                          disabled={!promoCode}
                        >
                          Apply
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Try: SAVE10, WELCOME20, FIRST15
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">₹{total.toFixed(2)}</span>
                    </div>
                    
                    <Button 
                      className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300" 
                      size="lg"
                      onClick={() => setIsPaymentModalOpen(true)}
                    >
                      <CreditCard className="mr-2 h-5 w-5" />
                      Proceed to Payment
                    </Button>
                    
                    {/* Trust Indicators */}
                    <div className="space-y-3 pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span>Secure SSL encrypted payment</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Truck className="h-4 w-4 text-blue-600" />
                        <span>Free shipping on orders over ₹50</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 text-yellow-600" />
                        <span>30-day money-back guarantee</span>
                      </div>
                    </div>
                    
                    <div className="text-center text-xs text-muted-foreground pt-4 border-t">
                      <p>
                        By proceeding, you agree to our{" "}
                        <Link href="/terms" className="underline hover:text-primary">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="underline hover:text-primary">
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        total={total}
      />
    </div>
  );
}