"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Package, Truck, Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCart } from "@/lib/cart";
import { useOrders } from "@/lib/orders";
import { useAuth } from "@/lib/auth";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}

export function PaymentModal({ isOpen, onClose, total }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });
  const cart = useCart();
  const orders = useOrders();
  const { user } = useAuth();
  const router = useRouter();

  // Pre-fill user info if logged in
  useState(() => {
    if (user) {
      setCustomerInfo(prev => ({
        ...prev,
        name: user.displayName || "",
        email: user.email || "",
      }));
    }
  });

  const validateForm = () => {
    if (!customerInfo.name.trim()) {
      alert("Please enter your full name");
      return false;
    }
    if (!customerInfo.email.trim()) {
      alert("Please enter your email address");
      return false;
    }
    if (!customerInfo.phone.trim()) {
      alert("Please enter your phone number");
      return false;
    }
    if (!customerInfo.address.trim()) {
      alert("Please enter your address");
      return false;
    }
    if (!customerInfo.city.trim()) {
      alert("Please enter your city");
      return false;
    }
    if (!customerInfo.pincode.trim()) {
      alert("Please enter your pincode");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create order in the orders store
    const newOrder = orders.addOrder({
      items: cart.items,
      total,
      customerInfo,
    });

    setOrderId(newOrder.id);
    setIsProcessing(false);
    setOrderPlaced(true);

    // Clear cart after successful order
    setTimeout(() => {
      cart.clearCart();
      setOrderPlaced(false);
      onClose();
      // Redirect to orders page
      router.push('/orders');
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <Dialog open={isOpen} onOpenChange={() => {}}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex p-4 rounded-full bg-green-100 dark:bg-green-900/20 mb-6"
            >
              <CheckCircle className="h-12 w-12 text-green-600" />
            </motion.div>
            
            <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
            <p className="text-lg font-semibold text-primary mb-4">Order ID: {orderId}</p>
            <p className="text-muted-foreground mb-6">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Package className="h-4 w-4" />
                <span>Order will be processed within 24 hours</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Truck className="h-4 w-4" />
                <span>Estimated delivery: 3-5 business days</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>Confirmation email sent to {customerInfo.email}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              Redirecting to your orders page...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Complete Your Order
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            <div className="space-y-2">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total ({cart.totalItems()} items)</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Delivery Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  value={customerInfo.pincode}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, pincode: e.target.value }))}
                  placeholder="Enter pincode"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Complete Address *</Label>
                <Input
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="House/Flat No., Street, Area"
                  required
                />
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={customerInfo.city}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="Enter your city"
                  required
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Payment Method Info */}
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Payment Method
            </h3>
            <p className="text-sm text-muted-foreground">
              Cash on Delivery (COD) - Pay when your order arrives at your doorstep. 
              No advance payment required.
            </p>
          </div>

          {/* Order Button */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1" disabled={isProcessing}>
              Cancel
            </Button>
            <Button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="flex-1"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Processing Order...
                </div>
              ) : (
                `Place Order - ₹${total.toFixed(2)}`
              )}
            </Button>
          </div>

          {/* Delivery Info */}
          <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="flex items-center gap-1">
                <Package className="h-3 w-3" />
                <span>Free packaging</span>
              </div>
              <div className="flex items-center gap-1">
                <Truck className="h-3 w-3" />
                <span>3-5 day delivery</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                <span>Quality guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}