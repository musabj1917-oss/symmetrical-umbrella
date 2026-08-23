"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { ShoppingCart, Minus, Plus, Trash2, Send, Package } from "lucide-react";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
}

export default function Order() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productsData);
    });
    return () => unsubscribe();
  }, []);

  const addToCart = (productId: string) => {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
    toast.success("Added to cart!");
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const deleteFromCart = (productId: string) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
    toast.success("Removed from cart");
  };

  const cartItems = Object.entries(cart)
    .map(([id, quantity]) => {
      const product = products.find((p) => p.id === id);
      return product ? { ...product, quantity } : null;
    })
    .filter(Boolean) as (Product & { quantity: number })[];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        items: cartItems,
        customer: customerInfo,
        total,
        status: "pending",
        createdAt: new Date().toISOString(),
      });
      toast.success("Order placed successfully!");
      setCart({});
      setIsCheckingOut(false);
      setCustomerInfo({ name: "", phone: "", address: "", notes: "" });
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-black">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">
              Shop
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6">
              Place Your Order
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Products */}
            <div className="lg:col-span-2">
              <div className="grid sm:grid-cols-2 gap-6">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-neutral-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-neutral-800"
                  >
                    <div className="h-40 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        <Package className="w-12 h-12 text-neutral-700" />
                      )}
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-1">{product.name}</h3>
                    <p className="text-accent font-bold text-xl mb-4">ETB {product.price}</p>
                    <button
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                      className="w-full py-3 bg-accent text-black rounded-xl font-medium hover:bg-accent-dark transition-all disabled:opacity-50"
                    >
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Cart */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-neutral-900 rounded-3xl p-8 shadow-xl h-fit sticky top-28 border border-neutral-800"
            >
              <div className="flex items-center gap-3 mb-6">
                <ShoppingCart className="w-6 h-6 text-accent" />
                <h2 className="font-display text-2xl font-bold text-white">Your Cart</h2>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
                  <p className="text-white/60">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    <AnimatePresence>
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-4 p-4 bg-neutral-800 rounded-xl"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-white">{item.name}</h4>
                            <p className="text-accent text-sm">ETB {item.price}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center shadow-sm"
                            >
                              <Minus className="w-4 h-4 text-white" />
                            </button>
                            <span className="w-8 text-center font-medium text-white">{item.quantity}</span>
                            <button
                              onClick={() => addToCart(item.id)}
                              className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center shadow-sm"
                            >
                              <Plus className="w-4 h-4 text-white" />
                            </button>
                            <button
                              onClick={() => deleteFromCart(item.id)}
                              className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center text-red-400 ml-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="border-t border-neutral-800 pt-6">
                    <div className="flex justify-between mb-6">
                      <span className="font-display text-xl font-bold text-white">Total</span>
                      <span className="font-display text-2xl font-bold text-accent">ETB {total}</span>
                    </div>
                    <button
                      onClick={() => setIsCheckingOut(true)}
                      className="w-full py-4 bg-accent text-black rounded-full font-medium text-lg hover:bg-accent-dark transition-all shadow-lg shadow-accent/20"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckingOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-neutral-900 rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-neutral-800"
            >
              <h2 className="font-display text-2xl font-bold text-white mb-6">Checkout</h2>
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-700 bg-neutral-800 text-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-700 bg-neutral-800 text-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    placeholder="+251..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Delivery Address</label>
                  <textarea
                    required
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-700 bg-neutral-800 text-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
                    rows={3}
                    placeholder="Your address in Oromia..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Notes (Optional)</label>
                  <textarea
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-700 bg-neutral-800 text-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
                    rows={2}
                    placeholder="Any special instructions..."
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="flex-1 py-3 border-2 border-neutral-700 text-white rounded-full font-medium hover:bg-neutral-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-accent text-black rounded-full font-medium hover:bg-accent-dark transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Place Order
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}