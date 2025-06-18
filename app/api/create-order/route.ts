import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'INR' } = await request.json();

    // Validate amount
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Convert amount to paise (smallest currency unit)
    const amountInPaise = Math.round(amount * 100);

    // In production, you would use Razorpay's server-side API:
    const Razorpay = require('razorpay');
    
    try {
      const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const order = await razorpay.orders.create({
        amount: amountInPaise,
        currency: currency,
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1,
      });

      return NextResponse.json(order);
    } catch (razorpayError) {
      console.warn('Razorpay API not available, using mock order for demo:', razorpayError);
      
      // Fallback to mock order for demo
      const mockOrder = {
        id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        amount: amountInPaise,
        currency,
        status: 'created',
        created_at: Math.floor(Date.now() / 1000),
        receipt: `receipt_${Date.now()}`
      };

      return NextResponse.json(mockOrder);
    }
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}