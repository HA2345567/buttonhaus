declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
  method?: {
    upi?: boolean;
    card?: boolean;
    netbanking?: boolean;
    wallet?: boolean;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (amount: number, currency: string = 'INR') => {
  try {
    // In a real application, this would call your backend API
    // For now, we'll create a mock order that works with Razorpay
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100, // Convert to paise
        currency,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    return await response.json();
  } catch (error) {
    // Fallback for demo purposes
    console.warn('Using fallback order creation for demo');
    return {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      status: 'created'
    };
  }
};

export const initiatePayment = async (options: RazorpayOptions) => {
  const isLoaded = await loadRazorpay();
  
  if (!isLoaded) {
    throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
  }

  return new Promise((resolve, reject) => {
    const razorpayOptions = {
      ...options,
      modal: {
        ondismiss: () => {
          reject(new Error('Payment cancelled by user'));
        }
      }
    };

    const razorpay = new window.Razorpay(razorpayOptions);
    
    razorpay.on('payment.failed', (response: any) => {
      reject(new Error(`Payment failed: ${response.error.description}`));
    });

    razorpay.open();
  });
};