"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { ShoppingCart, Plus, Minus, Star, Package } from "lucide-react";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  inStock: boolean;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter((p) => p.category === selectedCategory);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="section-padding bg-neutral-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">
            Our Collection
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
            Premium Ingredients
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Handpicked ingredients sourced from the finest suppliers to ensure your 
            baked goods are nothing short of extraordinary.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-accent text-black shadow-lg shadow-accent/20"
                  : "bg-neutral-800 text-white/70 hover:bg-accent/10 hover:text-accent"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                layout
                whileHover={{ y: -8 }}
                className="group bg-neutral-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-neutral-800 hover:border-accent/30"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-16 h-16 text-neutral-700" />
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Badge */}
                  {!product.inStock && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                      Out of Stock
                    </div>
                  )}

                  {/* Rating */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full">
                    <Star className="w-3 h-3 text-accent fill-accent" />
                    <span className="text-xs font-medium text-white">{product.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-xs text-accent font-medium uppercase tracking-wider mb-2">
                    {product.category}
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-white/60 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="font-display text-2xl font-bold text-accent">
                      ETB {product.price}
                    </div>

                    {cart[product.id] ? (
                      <div className="flex items-center gap-2 bg-neutral-800 rounded-full p-1">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(product.id)}
                          className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center text-white hover:bg-accent hover:text-black transition-colors shadow-sm"
                        >
                          <Minus className="w-4 h-4" />
                        </motion.button>
                        <span className="w-8 text-center font-medium text-white">
                          {cart[product.id]}
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => addToCart(product.id)}
                          className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center text-white hover:bg-accent hover:text-black transition-colors shadow-sm"
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      </div>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart(product.id)}
                        disabled={!product.inStock}
                        className="w-10 h-10 rounded-full bg-accent text-black flex items-center justify-center hover:bg-accent-dark transition-all shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Package className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
            <p className="text-white/60 text-lg">No products found in this category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}