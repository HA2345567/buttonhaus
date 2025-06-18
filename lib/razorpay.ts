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
  modal?: {
    ondismiss?: () => void;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if we're in the browser
    if (typeof window === 'undefined') {
      console.log('Not in browser environment');
      resolve(false);
      return;
    }

    // Check if Razorpay is already loaded
    if (window.Razorpay) {
      console.log('Razorpay already loaded');
      resolve(true);
      return;
    }

    console.log('Loading Razorpay SDK...');
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => {
      console.log('Razorpay SDK loaded successfully');
      // Add a small delay to ensure the script is fully initialized
      setTimeout(() => resolve(true), 100);
    };
    
    script.onerror = (error) => {
      console.error('Failed to load Razorpay SDK:', error);
      resolve(false);
    };
    
    document.head.appendChild(script);
  });
};

export const createRazorpayOrder = async (amount: number, currency: string = 'INR') => {
  try {
    console.log('Creating Razorpay order for amount:', amount);
    
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount, // Amount in rupees
        currency,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Order creation failed:', errorText);
      throw new Error(`Failed to create order: ${response.status}`);
    }

    const order = await response.json();
    console.log('Order created successfully:', order);
    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const initiatePayment = async (options: RazorpayOptions): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('Initiating payment process...');
      
      // Ensure Razorpay is loaded
      const isLoaded = await loadRazorpay();
      
      if (!isLoaded) {
        throw new Error('Razorpay SDK failed to load. Please check your internet connection and try again.');
      }

      if (!window.Razorpay) {
        throw new Error('Razorpay is not available. Please refresh the page and try again.');
      }

      console.log('Creating Razorpay instance with options:', {
        ...options,
        // Don't log sensitive data
        key: options.key.substring(0, 10) + '...',
      });

      const razorpayOptions = {
        ...options,
        modal: {
          ondismiss: () => {
            console.log('Payment modal dismissed by user');
            reject(new Error('Payment cancelled by user'));
          },
          ...options.modal,
        },
      };

      const razorpay = new window.Razorpay(razorpayOptions);
      
      razorpay.on('payment.failed', (response: any) => {
        console.error('Payment failed:', response);
        reject(new Error(`Payment failed: ${response.error?.description || 'Unknown error'}`));
      });

      console.log('Opening Razorpay checkout...');
      razorpay.open();
      
      // Don't resolve here - let the handler or error callbacks handle resolution
    } catch (error) {
      console.error('Error initiating payment:', error);
      reject(error);
    }
  });
};