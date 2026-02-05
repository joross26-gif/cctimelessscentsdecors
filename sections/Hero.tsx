import { useState, useRef } from 'react';
import { ArrowRight, Sparkles, Heart, MessageCircle, Play, Pause } from 'lucide-react';
import type { Product, Settings } from '@/types';

interface HeroProps {
  settings: Settings | null;
  featuredProducts: Product[];
  onViewProduct: (id: string) => void;
}

export function Hero({ settings, featuredProducts, onViewProduct }: HeroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const formatPrice = (price: number) => {
    return `${settings?.currency?.symbol || '₦'}${price.toLocaleString()}`;
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={settings?.media?.heroVideo || '/assets/video_teal_gold_1.mp4'} type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD1DC]/60 via-[#B8E0F0]/40 to-[#E6E6FA]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/30" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#FFD1DC]/30 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-[#B8E0F0]/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/4 w-56 h-56 bg-[#E6E6FA]/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-luxury shadow-lg">
              <Sparkles size={16} className="text-[#F4A6B9]" />
              <span className="text-sm font-semibold text-[#8B5A6B] tracking-wide uppercase">
                Luxury Candles • Home Decor • Lagos
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 leading-[1.1]">
                <span className="block">Scented.</span>
                <span className="block gradient-text">Styled.</span>
                <span className="block text-gray-700">Timeless.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-lg leading-relaxed font-light">
                {settings?.shortBio || 'Luxury sculptural candles and clean home decor pieces—handcrafted in Lagos for women who love statement interiors.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#shop"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl btn-pastel text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                Shop Collection
                <ArrowRight size={20} />
              </a>
              <a
                href="#videos"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/90 border-2 border-[#FFD1DC] text-gray-700 font-semibold text-lg hover:bg-[#FFE4EB] transition-all shadow-lg"
              >
                <Play size={18} />
                Watch Videos
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 pt-4">
              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass-luxury text-sm text-gray-700 shadow-sm">
                <Heart size={14} className="text-[#F4A6B9]" />
                Handmade in Lagos
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass-luxury text-sm text-gray-700 shadow-sm">
                <Sparkles size={14} className="text-[#8CCFE8]" />
                Premium Quality
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass-luxury text-sm text-gray-700 shadow-sm">
                <MessageCircle size={14} className="text-[#D4AF37]" />
                WhatsApp Order
              </span>
            </div>
          </div>

          {/* Right Content - Featured Products */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-widest">Featured Products</p>
              <a href="#shop" className="text-sm text-[#F4A6B9] hover:text-[#E890A0] font-medium flex items-center gap-1">
                View All <ArrowRight size={14} />
              </a>
            </div>
            <div className="grid gap-4">
              {featuredProducts.slice(0, 3).map((product, index) => (
                <div
                  key={product.id}
                  onClick={() => onViewProduct(product.id)}
                  className="product-card glass-luxury rounded-2xl p-4 flex gap-4 cursor-pointer group"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 img-zoom">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {product.badges.slice(0, 1).map((badge, i) => (
                          <span key={i} className="premium-badge">{badge}</span>
                        ))}
                      </div>
                      <h3 className="font-serif font-semibold text-gray-800 line-clamp-1 group-hover:text-[#F4A6B9] transition-colors">{product.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-1">{product.short}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg text-[#F4A6B9]">{formatPrice(product.price)}</span>
                      <button className="px-4 py-1.5 rounded-full bg-[#FFE4EB] text-[#F4A6B9] text-sm font-medium hover:bg-[#F4A6B9] hover:text-white transition-all">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Controls */}
      {videoLoaded && (
        <button
          onClick={toggleVideo}
          className="absolute bottom-8 right-8 z-30 w-12 h-12 rounded-full glass-luxury flex items-center justify-center text-gray-700 hover:text-[#F4A6B9] transition-all shadow-lg hover:shadow-xl"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-gray-400/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-gray-400/70 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
