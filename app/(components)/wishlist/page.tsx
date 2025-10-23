'use client';

import { useWishlist } from '@/app/providers/WishlistProvider';
import { useCart } from '@/app/providers/CartProvider';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Layout } from '@/app/reusableComponents/layout/Layout';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (productId: string) => {
    const item = wishlist.find((w) => w.product.id === productId);
    if (item) {
      addToCart(item.product, 1);
      removeFromWishlist(productId);
    }
  };

  if (wishlist.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 min-h-screen">
          <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
            <Heart className="w-24 h-24 mx-auto mb-6 text-gray-300" />
            <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Start adding products you love!
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Browse Products
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">My Wishlist ({wishlist.length} items)</h1>
          <Link
            href="/shop"
            className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-2"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.product.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <Link href={`/shop/${item.product.id}`}>
                <div className="relative aspect-square overflow-hidden group">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {item.product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Out of Stock</span>
                    </div>
                  )}
                  {item.product.stock > 0 && item.product.stock < 10 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      Low Stock
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-4">
                <Link
                  href={`/shop/${item.product.id}`}
                  className="block mb-2"
                >
                  <h3 className="font-semibold text-lg line-clamp-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    {item.product.name}
                  </h3>
                </Link>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {item.product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    ${item.product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {item.product.category}
                  </span>
                </div>

                <div className="text-xs text-gray-500 mb-4">
                  Added {new Date(item.addedAt).toLocaleDateString()}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleMoveToCart(item.product.id)}
                    disabled={item.product.stock === 0}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.product.id)}
                    className="p-2 border border-red-300 dark:border-red-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">💡 Pro Tip</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Products in your wishlist may go out of stock. Add them to your cart to secure your favorites!
          </p>
        </div>
      </div>
    </Layout>
  );
}

