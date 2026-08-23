"use client";

import { motion } from "framer-motion";
import { Truck, Shield, Clock, Award, HeartHandshake, Sparkles } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Same-day delivery within Oromia region. Your ingredients arrive fresh and on time.",
    color: "bg-neutral-800 text-accent",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Every product is carefully inspected. If you are not satisfied, we will make it right.",
    color: "bg-neutral-800 text-accent",
  },
  {
    icon: Clock,
    title: "Always Fresh",
    description: "We rotate our stock daily to ensure you get the freshest ingredients every time.",
    color: "bg-neutral-800 text-accent",
  },
  {
    icon: Award,
    title: "Premium Brands",
    description: "We stock only trusted international and local brands known for quality.",
    color: "bg-neutral-800 text-accent",
  },
  {
    icon: HeartHandshake,
    title: "Expert Advice",
    description: "Our team of baking enthusiasts is always ready to help you choose the right ingredients.",
    color: "bg-neutral-800 text-accent",
  },
  {
    icon: Sparkles,
    title: "Special Orders",
    description: "Cannot find what you need? We will source it for you within 48 hours.",
    color: "bg-neutral-800 text-accent",
  },
];

export default function Features() {
  return (
    <section className="section-padding bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

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
            Why Choose Us
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
            The Arebian Difference
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            We are not just a store — we are your baking partner. Here is what makes us special.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-neutral-900 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-neutral-800 hover:border-accent/30"
            >
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-accent/10 transition-shadow`}
              >
                <feature.icon className="w-8 h-8" />
              </motion.div>

              <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                {feature.title}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}