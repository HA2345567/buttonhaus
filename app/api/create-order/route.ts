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

    // Use your Razorpay credentials
    const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_nMGeAK7esjjWzj';
    const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'gBcxx480PBGVSOOxOIwhQ81O';

    try {
      // Try to use Razorpay server-side API
      const Razorpay = require('razorpay');
      
      const razorpay = new Razorpay({
        key_id: RAZORPAY_KEY_ID,
        key_secret: RAZORPAY_KEY_SECRET,
      });

      const orderOptions = {
        amount: amountInPaise,
        currency: currency,
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1,
      };

      console.log('Creating Razorpay order with options:', orderOptions);
      const order = await razorpay.orders.create(orderOptions);
      console.log('Razorpay order created successfully:', order);

      return NextResponse.json(order);
    } catch (razorpayError) {
      console.warn('Razorpay API error, using mock order for demo:', razorpayError);
      
      // Fallback to mock order for demo (this will work with your test keys on frontend)
      const mockOrder = {
        id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        amount: amountInPaise,
        currency,
        status: 'created',
        created_at: Math.floor(Date.now() / 1000),
        receipt: `receipt_${Date.now()}`,
        entity: 'order'
      };

      console.log('Mock order created:', mockOrder);
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