'use client';

import { useCart } from '@/app/providers/CartProvider';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Layout } from '@/app/reusableComponents/layout/Layout';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 min-h-screen">
          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-300" />
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Add some products to get started!
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart ({getTotalItems()} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex gap-6"
              >
                {/* Product Image */}
                <Link
                  href={`/shop/${item.product.id}`}
                  className="flex-shrink-0"
                >
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={128}
                    height={128}
                    className="w-32 h-32 object-cover rounded-lg hover:opacity-80 transition-opacity"
                  />
                </Link>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <Link
                        href={`/shop/${item.product.id}`}
                        className="text-xl font-semibold hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {item.product.category}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      aria-label="Remove from cart"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                    {item.product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.product.id, item.quantity - 1)
                        }
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.product.id, item.quantity + 1)
                        }
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ${item.product.price.toFixed(2)} each
                      </p>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Stock Warning */}
                  {item.quantity >= item.product.stock && (
                    <p className="text-sm text-red-500 mt-2">
                      Maximum stock reached
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (estimated)</span>
                  <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-purple-600 dark:text-purple-400">
                      ${(getTotalPrice() * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors mb-3"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/shop"
                className="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                Continue Shopping
              </Link>

              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-300 font-semibold">
                  🎉 Free shipping on all orders!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

