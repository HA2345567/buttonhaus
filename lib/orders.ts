"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "./types";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
  status: "processing" | "shipped" | "delivered" | "cancelled";
  orderDate: string;
  estimatedDelivery: string;
  trackingNumber?: string;
}

interface OrdersStore {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "orderDate" | "estimatedDelivery" | "status">) => void;
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  totalOrders: () => number;
}

export const useOrders = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: [],
      
      addOrder: (orderData) => {
        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
        const orderDate = new Date().toISOString();
        const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(); // 5 days from now
        
        const newOrder: Order = {
          ...orderData,
          id: orderId,
          orderDate,
          estimatedDelivery,
          status: "processing",
        };
        
        const { orders } = get();
        set({ orders: [newOrder, ...orders] });
        
        return newOrder;
      },
      
      getOrderById: (id) => {
        const { orders } = get();
        return orders.find(order => order.id === id);
      },
      
      updateOrderStatus: (id, status) => {
        const { orders } = get();
        set({
          orders: orders.map(order =>
            order.id === id ? { ...order, status } : order
          ),
        });
      },
      
      totalOrders: () => {
        const { orders } = get();
        return orders.length;
      },
    }),
    {
      name: "buttonhaus-orders",
    }
  )
);