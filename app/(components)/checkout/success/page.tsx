'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, ArrowRight, XCircle, Loader2 } from 'lucide-react';
import { Layout } from '@/app/reusableComponents/layout/Layout';
import { useCart } from '@/app/providers/CartProvider';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  
  const [orderNumber] = useState(() => 
    'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase()
  );
  const [paymentStatus, setPaymentStatus] = useState<'loading' | 'succeeded' | 'failed'>('loading');

  useEffect(() => {
    // Check payment status from URL parameters
    const redirectStatus = searchParams.get('redirect_status');
    const paymentIntent = searchParams.get('payment_intent');

    if (redirectStatus === 'succeeded' && paymentIntent) {
      setPaymentStatus('succeeded');
      // Clear the cart after successful payment
      clearCart();
    } else if (redirectStatus === 'failed') {
      setPaymentStatus('failed');
    } else {
      // If no status, assume success (direct navigation)
      setPaymentStatus('succeeded');
      clearCart();
    }
  }, [searchParams, clearCart]);

  // Loading state
  if (paymentStatus === 'loading') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-purple-600 mx-auto mb-4 animate-spin" />
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Confirming your payment...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  // Failed state
  if (paymentStatus === 'failed') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 min-h-screen">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <div className="mb-6">
                <XCircle className="w-24 h-24 text-red-500 mx-auto" />
              </div>
              
              <h1 className="text-4xl font-bold mb-4">Payment Failed</h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Unfortunately, your payment could not be processed. Please try again.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/checkout"
                  className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Try Again
                </Link>
                <Link
                  href="/cart"
                  className="inline-flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Back to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Thank you for your purchase. Your order has been confirmed.
            </p>

            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Order Number
              </p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {orderNumber}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <Package className="w-8 h-8 text-purple-600" />
                <div className="text-left">
                  <h3 className="font-semibold">Order Confirmation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    A confirmation email has been sent to your email address.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <Package className="w-8 h-8 text-purple-600" />
                <div className="text-left">
                  <h3 className="font-semibold">Shipping Information</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your order will be shipped within 1-2 business days.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Continue Shopping
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-300">
              What happens next?
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-2">
              <li>• You&apos;ll receive an email confirmation shortly</li>
              <li>• Track your order status in your account</li>
              <li>• Estimated delivery: 3-5 business days</li>
              <li>• Need help? Contact our support team</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

