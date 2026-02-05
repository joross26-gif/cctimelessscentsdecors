import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import type { Settings } from '@/types';

interface FAQProps {
  settings: Settings | null;
}

export function FAQ({ settings }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How do I order?',
      answer: 'Add items to cart and click Checkout. The site will open WhatsApp with your order summary already written. It\'s that simple!',
    },
    {
      question: 'Do you deliver?',
      answer: settings?.shipping?.leadTime || 'Yes. 2–5 business days (Lagos) • 3–10 business days (Nationwide) (timing may vary by location).',
    },
    {
      question: 'What is your return policy?',
      answer: settings?.policies?.returns || 'Because our pieces are handmade, we accept returns only for items received damaged. Contact us within 24 hours of delivery with photos.',
    },
    {
      question: 'How do I care for sculptural candles?',
      answer: settings?.policies?.care || 'Keep away from direct heat/sunlight. Trim wick to 5mm. Place candles on a heat-safe tray.',
    },
    {
      question: 'Can I request custom scents/colors?',
      answer: 'Yes! Tap "Custom Orders" or message us on WhatsApp with your idea. We love creating unique pieces for our customers.',
    },
    {
      question: 'Do you offer bulk discounts?',
      answer: 'Yes, we offer special pricing for bulk orders and corporate gifting. Contact us via WhatsApp for a custom quote.',
    },
  ];

  return (
    <section id="faq" className="py-24 section-pink relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-[#FFD1DC]/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-[#B8E0F0]/20 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto px-4 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-luxury mb-4">
            <HelpCircle size={16} className="text-[#F4A6B9]" />
            <span className="text-sm font-medium text-[#8B5A6B]">Got Questions?</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-gray-600">
            Quick answers about orders, shipping and care.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-luxury rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/50 transition-colors"
              >
                <span className="font-semibold text-gray-800 pr-4 text-lg">{faq.question}</span>
                <div className={`w-10 h-10 rounded-full bg-[#FFE4EB] flex items-center justify-center flex-shrink-0 transition-all ${openIndex === index ? 'bg-[#F4A6B9]' : ''}`}>
                  <ChevronDown
                    size={20}
                    className={`text-[#F4A6B9] transition-all duration-300 ${openIndex === index ? 'rotate-180 text-white' : ''}`}
                  />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-48' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl btn-pastel text-white font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
