import { useState } from 'react';
import { Eye, Plus, Search, Filter, ArrowRight } from 'lucide-react';
import type { Product, Settings } from '@/types';

interface ShopProps {
  products: Product[];
  settings: Settings | null;
  onViewProduct: (id: string) => void;
  onAddToCart: (id: string, qty: number) => void;
}

export function Shop({ products, settings, onViewProduct, onAddToCart }: ShopProps) {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Candles', 'Home Decor'];

  const filteredProducts = products.filter(p => {
    const matchesCategory = filter === 'All' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.short.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (price: number) => {
    return `${settings?.currency?.symbol || '₦'}${price.toLocaleString()}`;
  };

  return (
    <section id="shop" className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-luxury mb-4">
            <Filter size={16} className="text-[#F4A6B9]" />
            <span className="text-sm font-medium text-[#8B5A6B]">Our Collection</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Shop <span className="gradient-text">Luxury</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a piece, add to cart, and checkout via WhatsApp. Prices are in NGN.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl glass-luxury border border-[#FFD1DC]/50 text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm ${
                  filter === cat
                    ? 'bg-gradient-to-r from-[#F4A6B9] to-[#8CCFE8] text-white shadow-lg'
                    : 'bg-white border border-[#FFD1DC] text-gray-700 hover:bg-[#FFE4EB] hover:shadow-md'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-800">{filteredProducts.length}</span> products
          </p>
          <a href="#" className="text-sm text-[#F4A6B9] hover:text-[#E890A0] font-medium flex items-center gap-1">
            View All <ArrowRight size={14} />
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="product-card glass-luxury rounded-3xl overflow-hidden group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Image */}
              <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Badges */}
                {product.badges.length > 0 && (
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {product.badges.slice(0, 2).map((badge, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
                          i === 0 ? 'bg-[#F4A6B9] text-white' : 
                          i === 1 ? 'bg-[#8CCFE8] text-white' : 
                          'bg-white/90 text-gray-700'
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => onViewProduct(product.id)}
                    className="px-6 py-3 rounded-xl bg-white text-gray-800 font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform"
                  >
                    <Eye size={18} />
                    Quick View
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{product.category}</p>
                    <h3 className="font-serif font-semibold text-gray-800 line-clamp-1 group-hover:text-[#F4A6B9] transition-colors">{product.name}</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 min-h-[40px]">{product.short}</p>

                <div className="flex items-center justify-between pt-3 border-t border-[#FFD1DC]/30">
                  <span className="font-bold text-xl text-[#F4A6B9]">{formatPrice(product.price)}</span>
                  <button
                    onClick={() => onAddToCart(product.id, 1)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl btn-pastel text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#FFE4EB] flex items-center justify-center">
              <Search size={32} className="text-[#F4A6B9]" />
            </div>
            <p className="text-gray-600 text-lg mb-2">No products found</p>
            <p className="text-gray-400">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </section>
  );
}
