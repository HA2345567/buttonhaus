"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Package, Truck, CheckCircle, Clock, X, Eye, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

import { useOrders, Order } from "@/lib/orders";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const statusConfig = {
  processing: {
    label: "Processing",
    color: "bg-yellow-500",
    icon: Clock,
    description: "Your order is being prepared"
  },
  shipped: {
    label: "Shipped",
    color: "bg-blue-500",
    icon: Truck,
    description: "Your order is on the way"
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-500",
    icon: CheckCircle,
    description: "Your order has been delivered"
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-500",
    icon: X,
    description: "Your order has been cancelled"
  }
};

function OrderDetailsModal({ order }: { order: Order }) {
  const config = statusConfig[order.status];
  const StatusIcon = config.icon;

  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Order Details - {order.id}
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-6">
        {/* Order Status */}
        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
          <div className={`p-2 rounded-full ${config.color} text-white`}>
            <StatusIcon className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold">{config.label}</div>
            <div className="text-sm text-muted-foreground">{config.description}</div>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <h3 className="font-semibold mb-4">Items Ordered</h3>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="relative h-16 w-16 rounded-md overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <div className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                    {item.color && ` • Color: ${item.color}`}
                    {item.size && ` • Size: ${item.size}`}
                  </div>
                </div>
                <div className="font-semibold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Order Summary */}
        <div>
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div>
          <h3 className="font-semibold mb-4">Delivery Information</h3>
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <div><strong>Name:</strong> {order.customerInfo.name}</div>
            <div><strong>Phone:</strong> {order.customerInfo.phone}</div>
            <div><strong>Email:</strong> {order.customerInfo.email}</div>
            <div><strong>Address:</strong> {order.customerInfo.address}, {order.customerInfo.city} - {order.customerInfo.pincode}</div>
          </div>
        </div>

        {/* Order Timeline */}
        <div>
          <h3 className="font-semibold mb-4">Order Timeline</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Order Placed</span>
              <span>{new Date(order.orderDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Delivery</span>
              <span>{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
            </div>
            {order.trackingNumber && (
              <div className="flex justify-between">
                <span>Tracking Number</span>
                <span className="font-mono">{order.trackingNumber}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default function OrdersPage() {
  const orders = useOrders();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                My Orders
              </h1>
              <p className="text-muted-foreground">
                Track and manage your orders
              </p>
            </div>
          </div>
        </motion.div>

        {orders.orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
              <Package className="relative h-24 w-24 text-primary mx-auto" />
            </div>
            <h2 className="text-3xl font-bold mb-4">No orders yet</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <Button asChild size="lg" className="px-8">
              <Link href="/products">
                <Package className="mr-2 h-5 w-5" />
                Start Shopping
              </Link>
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <span className="text-lg font-semibold">
                  {orders.totalOrders()} {orders.totalOrders() === 1 ? 'order' : 'orders'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {orders.orders.map((order, index) => {
                const config = statusConfig[order.status];
                const StatusIcon = config.icon;
                
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card rounded-2xl border shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-semibold">{order.id}</h3>
                          <Badge className={`${config.color} text-white`}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {config.label}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Order Date:</span>
                            <div className="font-medium">
                              {new Date(order.orderDate).toLocaleDateString()}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Items:</span>
                            <div className="font-medium">
                              {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Total:</span>
                            <div className="font-medium text-lg">
                              ₹{order.total.toFixed(2)}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <span className="text-muted-foreground text-sm">Delivery to:</span>
                          <div className="font-medium">
                            {order.customerInfo.name} • {order.customerInfo.city}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <OrderDetailsModal order={order} />
                        </Dialog>
                        
                        {order.status === "shipped" && (
                          <Button size="sm">
                            <Truck className="mr-2 h-4 w-4" />
                            Track Order
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex gap-2 overflow-x-auto">
                        {order.items.slice(0, 4).map((item) => (
                          <div key={item.id} className="flex-shrink-0">
                            <div className="relative h-12 w-12 rounded-md overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        ))}
                        {order.items.length > 4 && (
                          <div className="flex-shrink-0 h-12 w-12 rounded-md bg-muted flex items-center justify-center text-xs font-medium">
                            +{order.items.length - 4}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}