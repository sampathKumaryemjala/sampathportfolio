'use client';

import { useState, FormEvent } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Loader2 } from 'lucide-react';

interface CheckoutFormProps {
  totalAmount: number;
}

export default function CheckoutForm({ totalAmount }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // Customer details
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  
  // Billing address (required for Indian export regulations)
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('US');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
          receipt_email: email,
          payment_method_data: {
            billing_details: {
              name,
              email,
              address: {
                line1: addressLine1,
                line2: addressLine2 || undefined,
                city,
                state,
                postal_code: postalCode,
                country,
              },
            },
          },
        },
      });

      // This code only runs if there's an error (Stripe redirects on success)
      if (error) {
        // Show error to customer (e.g., insufficient funds, card declined)
        setErrorMessage(error.message || 'An error occurred during payment');
        setIsProcessing(false);
      }
      // If no error, Stripe will redirect to return_url automatically
    } catch {
      setErrorMessage('An unexpected error occurred');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold mb-2">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="john@example.com"
        />
      </div>

      {/* Billing Address Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold mb-4">Billing Address</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Required for export regulations compliance
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="addressLine1" className="block text-sm font-semibold mb-2">
              Address Line 1 <span className="text-red-500">*</span>
            </label>
            <input
              id="addressLine1"
              type="text"
              required
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Street address"
            />
          </div>

          <div>
            <label htmlFor="addressLine2" className="block text-sm font-semibold mb-2">
              Address Line 2 <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <input
              id="addressLine2"
              type="text"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Apartment, suite, etc."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-semibold mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                id="city"
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="City"
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-semibold mb-2">
                State / Province <span className="text-red-500">*</span>
              </label>
              <input
                id="state"
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="State"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="postalCode" className="block text-sm font-semibold mb-2">
                Postal Code / ZIP <span className="text-red-500">*</span>
              </label>
              <input
                id="postalCode"
                type="text"
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="12345"
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-semibold mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                id="country"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="US">United States</option>
                <option value="IN">India</option>
                <option value="GB">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="JP">Japan</option>
                <option value="CN">China</option>
                <option value="BR">Brazil</option>
                <option value="MX">Mexico</option>
                <option value="ES">Spain</option>
                <option value="IT">Italy</option>
                <option value="NL">Netherlands</option>
                <option value="SE">Sweden</option>
                <option value="SG">Singapore</option>
                <option value="AE">United Arab Emirates</option>
                <option value="SA">Saudi Arabia</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Element */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Card Information
        </label>
        <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
          <PaymentElement />
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400 text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors text-lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            Processing...
          </>
        ) : (
          <>Pay ${totalAmount.toFixed(2)}</>
        )}
      </button>

      <p className="text-xs text-center text-gray-600 dark:text-gray-400">
        By confirming your payment, you agree to our Terms of Service and Privacy Policy.
      </p>
    </form>
  );
}

