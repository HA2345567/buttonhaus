import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'INR' } = await request.json();

    // In a real application, you would:
    // 1. Validate the request
    // 2. Create an order using Razorpay's server-side API
    // 3. Store order details in your database
    
    // For demo purposes, we'll create a mock order
    const order = {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount: amount, // Amount should already be in paise
      currency,
      status: 'created',
      created_at: Math.floor(Date.now() / 1000)
    };

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}