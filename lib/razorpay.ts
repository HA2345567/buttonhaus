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
      resolve(false);
      return;
    }

    // Check if Razorpay is already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay SDK loaded successfully');
      resolve(true);
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
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create order');
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
      console.log('Loading Razorpay SDK...');
      const isLoaded = await loadRazorpay();
      
      if (!isLoaded) {
        throw new Error('Razorpay SDK failed to load. Please check your internet connection and try again.');
      }

      console.log('Initiating payment with options:', options);

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

      razorpay.on('payment.success', (response: any) => {
        console.log('Payment successful:', response);
        resolve();
      });

      console.log('Opening Razorpay checkout...');
      razorpay.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      reject(error);
    }
  });
};