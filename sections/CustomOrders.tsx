import { Palette, Clock, List, MessageCircle, Check } from 'lucide-react';
import type { Settings } from '@/types';

interface CustomOrdersProps {
  settings: Settings | null;
}

export function CustomOrders({ settings }: CustomOrdersProps) {
  const whatsappLink = settings?.contact?.whatsAppNumberInternational
    ? `https://wa.me/${settings.contact.whatsAppNumberInternational.replace(/[^\d]/g, '')}?text=${encodeURIComponent('Hi Cctimeless scents&decor! I want a custom order. Here is my idea:\n\n- Item(s):\n- Quantity:\n- Colors/Theme:\n- Delivery date:')}`
    : '#';

  const customizeItems = [
    'Colors & finishes',
    'Gift sets & bundles',
    'Wedding/bridal gifts',
    'Corporate/brand gifting',
    'Bulk orders (limited drops)',
  ];

  const howItWorks = [
    { step: 'Send inspiration + quantity', desc: 'Share your vision with us' },
    { step: 'We confirm price + timeline', desc: 'Get a detailed quote' },
    { step: 'Production + quality checks', desc: 'We craft with care' },
    { step: 'Delivery or pickup', desc: 'Receive your custom piece' },
  ];

  return (
    <section id="custom" className="py-24 section-lavender relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-[#E6E6FA]/40 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#FFD1DC]/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-luxury mb-4">
            <Palette size={16} className="text-[#F4A6B9]" />
            <span className="text-sm font-medium text-[#8B5A6B]">Personalized For You</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Custom <span className="gradient-text">Orders</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Want a set for an event, a custom color, or branded gifts? Send a request and we'll reply fast.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* What You Can Customize */}
          <div className="glass-luxury rounded-3xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFD1DC] to-[#F4A6B9] flex items-center justify-center mb-6 shadow-lg">
              <Palette size={28} className="text-white" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-gray-800 mb-5">
              What You Can Customize
            </h3>
            <ul className="space-y-4">
              {customizeItems.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-[#FFE4EB] flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-[#F4A6B9]" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Lead Times */}
          <div className="glass-luxury rounded-3xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#B8E0F0] to-[#8CCFE8] flex items-center justify-center mb-6 shadow-lg">
              <Clock size={28} className="text-white" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-gray-800 mb-5">
              Lead Times
            </h3>
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-[#FFE4EB]/50">
                <p className="font-semibold text-gray-700 mb-1">Ready-to-Ship</p>
                <p className="text-sm text-gray-600">
                  {settings?.shipping?.leadTime || '2–5 business days (Lagos) • 3–10 business days (Nationwide)'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#D6EEF7]/50">
                <p className="font-semibold text-gray-700 mb-1">Custom Orders</p>
                <p className="text-sm text-gray-600">
                  {settings?.shipping?.customOrdersLeadTime || '5–14 business days depending on complexity'}
                </p>
              </div>
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 w-full justify-center px-6 py-4 rounded-xl btn-pastel text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <MessageCircle size={20} />
              Start a Custom Order
            </a>
          </div>

          {/* How It Works */}
          <div className="glass-luxury rounded-3xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E6E6FA] to-[#D4D4E8] flex items-center justify-center mb-6 shadow-lg">
              <List size={28} className="text-white" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-gray-800 mb-5">
              How It Works
            </h3>
            <div className="space-y-5">
              {howItWorks.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD1DC] to-[#B8E0F0] flex items-center justify-center text-white font-bold flex-shrink-0 shadow-md">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">{item.step}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
