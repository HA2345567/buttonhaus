"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Smartphone, Building, Wallet, X, Shield, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { initiatePayment, createRazorpayOrder, loadRazorpay } from "@/lib/razorpay";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}

export function PaymentModal({ isOpen, onClose, total }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const cart = useCart();
  const { user } = useAuth();

  // Pre-fill user info if logged in
  useEffect(() => {
    if (user) {
      setCustomerInfo(prev => ({
        ...prev,
        name: user.displayName || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  // Load Razorpay SDK when modal opens
  useEffect(() => {
    if (isOpen) {
      loadRazorpay().then(setIsRazorpayLoaded);
    }
  }, [isOpen]);

  const paymentMethods = [
    {
      id: "upi",
      name: "UPI",
      icon: Smartphone,
      description: "Pay using UPI apps like GPay, PhonePe, Paytm",
      popular: true
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, RuPay, American Express"
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: Building,
      description: "All major banks supported"
    },
    {
      id: "wallet",
      name: "Wallets",
      icon: Wallet,
      description: "Paytm, PhonePe, Amazon Pay, etc."
    }
  ];

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
    if (!/^\d{10}$/.test(customerInfo.phone.replace(/\D/g, ''))) {
      alert("Please enter a valid 10-digit phone number");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      alert("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      return;
    }

    if (!isRazorpayLoaded) {
      alert("Payment system is loading. Please wait a moment and try again.");
      return;
    }

    setIsProcessing(true);

    try {
      console.log('Starting payment process for amount:', total);
      
      // Create order
      const order = await createRazorpayOrder(total);
      console.log('Order created:', order);

      // Get Razorpay key
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        throw new Error('Razorpay key not configured');
      }

      // Configure payment options
      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: "ButtonHaus",
        description: `Payment for ${cart.totalItems()} items`,
        order_id: order.id,
        handler: (response: any) => {
          // Payment successful
          console.log("Payment successful:", response);
          cart.clearCart();
          onClose();
          alert("🎉 Payment successful! Your order has been placed. Thank you for shopping with ButtonHaus!");
        },
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email,
          contact: customerInfo.phone,
        },
        notes: {
          address: customerInfo.address || "Not provided",
        },
        theme: {
          color: "#000000",
        },
        method: {
          upi: paymentMethod === "upi",
          card: paymentMethod === "card",
          netbanking: paymentMethod === "netbanking",
          wallet: paymentMethod === "wallet",
        },
        modal: {
          ondismiss: () => {
            console.log('Payment modal dismissed');
            setIsProcessing(false);
          }
        }
      };

      console.log('Initiating payment with options:', options);
      await initiatePayment(options);
    } catch (error) {
      console.error("Payment failed:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`❌ Payment failed: ${errorMessage}. Please try again.`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Secure Payment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Razorpay Loading Status */}
          {!isRazorpayLoaded && (
            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-blue-600">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"
                />
                <span className="text-sm">Loading payment system...</span>
              </div>
            </div>
          )}

          {/* Order Summary */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            <div className="flex justify-between items-center">
              <span>{cart.totalItems()} items</span>
              <span className="font-semibold">₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Customer Information</h3>
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
                  placeholder="Enter your 10-digit phone number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter your address (optional)"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Payment Methods */}
          <div className="space-y-4">
            <h3 className="font-semibold">Choose Payment Method</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <motion.div
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Label
                        htmlFor={method.id}
                        className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                          paymentMethod === method.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Icon className="h-5 w-5" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{method.name}</span>
                            {method.popular && (
                              <Badge variant="secondary" className="text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {method.description}
                          </p>
                        </div>
                      </Label>
                    </motion.div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>

          {/* Security Notice */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
            <Lock className="h-4 w-4 text-green-600" />
            <span>Your payment information is encrypted and secure with Razorpay</span>
          </div>

          {/* Payment Button */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1" disabled={isProcessing}>
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={isProcessing || !isRazorpayLoaded}
              className="flex-1"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Processing...
                </div>
              ) : !isRazorpayLoaded ? (
                "Loading..."
              ) : (
                `Pay ₹${total.toFixed(2)}`
              )}
            </Button>
          </div>

          {/* Test Card Info for Demo */}
          <div className="text-xs text-muted-foreground bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg">
            <p className="font-medium mb-1">🧪 Test Mode - Use these test details:</p>
            <p>• Card: 4111 1111 1111 1111</p>
            <p>• CVV: Any 3 digits</p>
            <p>• Expiry: Any future date</p>
            <p>• UPI: success@razorpay (for successful payment)</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}