import { ArrowRight, Sparkles } from 'lucide-react';
import type { Product } from '@/types';

interface CollectionsProps {
  products: Product[];
}

export function Collections({ products }: CollectionsProps) {
  const collections = [
    {
      id: 'pastel-pink',
      name: 'Pastel Pink Collection',
      description: 'Soft pink tones that bring warmth and femininity to any space. Perfect for creating a cozy, romantic atmosphere.',
      gradient: 'from-[#FFD1DC] via-[#FFC4D2] to-[#F4A6B9]',
      textColor: 'text-[#8B5A6B]',
      accent: '#F4A6B9',
    },
    {
      id: 'sky-blue',
      name: 'Sky Blue Collection',
      description: 'Calming blue hues that evoke serenity and peace. Ideal for creating a tranquil, refreshing environment.',
      gradient: 'from-[#B8E0F0] via-[#A8D4E8] to-[#8CCFE8]',
      textColor: 'text-[#5A7A8B]',
      accent: '#8CCFE8',
    },
    {
      id: 'mixed-pastel',
      name: 'Mixed Pastel Collection',
      description: 'A harmonious blend of pink, blue, and lavender tones for a dreamy, whimsical aesthetic.',
      gradient: 'from-[#E6E6FA] via-[#FFD1DC] to-[#B8E0F0]',
      textColor: 'text-[#7A6A8B]',
      accent: '#E6E6FA',
    },
  ];

  return (
    <section id="collections" className="py-24 section-pink relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#FFD1DC]/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-[#B8E0F0]/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-luxury mb-4">
            <Sparkles size={16} className="text-[#F4A6B9]" />
            <span className="text-sm font-medium text-[#8B5A6B]">Curated For You</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Our <span className="gradient-text">Collections</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Clean luxury for women: sculptural candles, glossy accents, and styling pieces that feel premium.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} opacity-90`} />
              
              {/* Decorative Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-20 h-20 rounded-full border-2 border-white/50" />
                <div className="absolute bottom-20 left-10 w-12 h-12 rounded-full border-2 border-white/30" />
                <div className="absolute top-1/2 right-5 w-8 h-8 rounded-full bg-white/20" />
              </div>
              
              {/* Content */}
              <div className="relative p-8 min-h-[420px] flex flex-col justify-end">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 transform group-hover:translate-y-[-8px] transition-transform duration-500 shadow-lg">
                  <h3 className={`font-serif text-2xl font-bold ${collection.textColor} mb-3`}>
                    {collection.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">
                    {collection.description}
                  </p>
                  <a
                    href="#shop"
                    className={`inline-flex items-center gap-2 text-sm font-semibold ${collection.textColor} hover:gap-3 transition-all`}
                  >
                    Shop Collection
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Product Preview */}
        {products.length > 0 && (
          <div className="mt-16 glass-luxury rounded-3xl p-8 md:p-10 border border-[#FFD1DC]/30">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl img-zoom">
                <img
                  src={products[0]?.image}
                  alt="Featured"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-5">
                <div className="inline-flex items-center gap-2">
                  <span className="premium-badge">Featured</span>
                  <span className="premium-badge" style={{ background: 'linear-gradient(135deg, #B8E0F0, #8CCFE8)' }}>Best Seller</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-800">
                  {products[0]?.name}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">{products[0]?.short}</p>
                <div className="flex items-center gap-4 pt-2">
                  <span className="font-serif text-3xl font-bold text-[#F4A6B9]">
                    ₦{products[0]?.price.toLocaleString()}
                  </span>
                </div>
                <a
                  href="#shop"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl btn-pastel text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Shop Now
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
