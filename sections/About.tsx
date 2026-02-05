import { Heart, Sparkles, Palette, Award, Users, MapPin } from 'lucide-react';
import type { Product, Settings } from '@/types';

interface AboutProps {
  products: Product[];
  settings: Settings | null;
}

export function About({ products, settings }: AboutProps) {
  const features = [
    {
      icon: Heart,
      title: 'Handmade',
      description: 'Small-batch + quality finishing.',
      gradient: 'from-[#FFD1DC] to-[#F4A6B9]',
    },
    {
      icon: Sparkles,
      title: 'Clean Luxury',
      description: 'Minimal shapes, statement presence.',
      gradient: 'from-[#B8E0F0] to-[#8CCFE8]',
    },
    {
      icon: Palette,
      title: 'Custom Options',
      description: 'Colors, sets, gifts & events.',
      gradient: 'from-[#E6E6FA] to-[#D4D4E8]',
    },
  ];

  const stats = [
    { value: '500+', label: 'Happy Customers', icon: Users },
    { value: '37', label: 'Unique Products', icon: Sparkles },
    { value: '3+', label: 'Years Experience', icon: Award },
    { value: 'Lagos', label: 'Based In', icon: MapPin },
  ];

  const whatsappLink = settings?.contact?.whatsAppNumberInternational
    ? `https://wa.me/${settings.contact.whatsAppNumberInternational.replace(/[^\d]/g, '')}`
    : '#';

  return (
    <section id="about" className="py-24 section-blue relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#B8E0F0]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#FFD1DC]/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-luxury mb-4">
                <Heart size={16} className="text-[#F4A6B9]" />
                <span className="text-sm font-medium text-[#8B5A6B]">Our Story</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
                About <span className="gradient-text">Cctimeless</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We create sculptural candles and clean decor that feels premium, feminine, and timeless. 
                Every piece is handmade in Lagos in small batches—designed to style your space and your content.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="glass-luxury rounded-2xl p-5 text-center hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-3 shadow-lg`}>
                    <feature.icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-[#FFE4EB] flex items-center justify-center mb-2">
                    <stat.icon size={20} className="text-[#F4A6B9]" />
                  </div>
                  <p className="font-serif text-xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl btn-pastel text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Order on WhatsApp
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white border-2 border-[#FFD1DC] text-gray-700 font-semibold hover:bg-[#FFE4EB] transition-all"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-2 gap-4">
            {products.slice(0, 4).map((product, index) => (
              <div
                key={product.id}
                className={`rounded-2xl overflow-hidden shadow-lg img-zoom ${
                  index === 0 ? 'aspect-[3/4] row-span-2' : 'aspect-square'
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
