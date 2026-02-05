import { Gem, Gift, Zap, Truck, Shield, Star } from 'lucide-react';

export function Strip() {
  const items = [
    {
      icon: Gem,
      title: 'Made to Elevate',
      description: 'Designed to look premium on trays, shelves, and in your photos.',
      color: 'from-[#F4A6B9] to-[#E890A0]',
    },
    {
      icon: Gift,
      title: 'Gift-Ready',
      description: 'Perfect for birthdays, weddings, and home upgrades.',
      color: 'from-[#8CCFE8] to-[#6BB8D4]',
    },
    {
      icon: Zap,
      title: 'Fast Checkout',
      description: 'Tap "Checkout" to send your order to WhatsApp.',
      color: 'from-[#E6E6FA] to-[#D4D4E8]',
    },
    {
      icon: Truck,
      title: 'Nationwide Delivery',
      description: '2-5 days in Lagos, 3-10 days nationwide.',
      color: 'from-[#C5E8D4] to-[#A8D9BC]',
    },
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: 'Handmade with care and attention to detail.',
      color: 'from-[#F0E6C8] to-[#E8D9A8]',
    },
    {
      icon: Star,
      title: 'Premium Materials',
      description: 'Only the finest waxes, scents, and decor materials.',
      color: 'from-[#FFD1DC] to-[#FFC4D2]',
    },
  ];

  return (
    <section className="py-10 border-y border-[#FFD1DC]/30 bg-white/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <item.icon size={24} className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-tight">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
