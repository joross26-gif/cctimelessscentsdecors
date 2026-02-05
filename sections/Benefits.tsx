import { Sun, Camera, Heart, Hand, Palette, MessageCircle, Sparkles } from 'lucide-react';

export function Benefits() {
  const benefits = [
    {
      icon: Sun,
      title: 'Instant Mood Upgrade',
      description: 'Scent + warm light creates a calm, cozy atmosphere—perfect for evenings, self-care, and quiet mornings.',
      gradient: 'from-[#FFD1DC] to-[#F4A6B9]',
    },
    {
      icon: Camera,
      title: 'Photo-Ready Decor',
      description: 'Minimal sculptural shapes that look expensive on book stacks, trays, vanities, and desks.',
      gradient: 'from-[#B8E0F0] to-[#8CCFE8]',
    },
    {
      icon: Heart,
      title: 'Gift-Ready Luxury',
      description: 'Perfect for birthdays, bridal gifts, housewarmings, and "just because" moments.',
      gradient: 'from-[#E6E6FA] to-[#D4D4E8]',
    },
    {
      icon: Hand,
      title: 'Handmade in Lagos',
      description: 'Small-batch production with careful finishing—each piece is hand-poured and inspected.',
      gradient: 'from-[#C5E8D4] to-[#A8D9BC]',
    },
    {
      icon: Palette,
      title: 'Custom Colors & Sets',
      description: 'Order matching sets for events, gifting, or a themed interior. We tailor sizes and finishes.',
      gradient: 'from-[#F0E6C8] to-[#E8D9A8]',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp in 60 Seconds',
      description: 'Add to cart → checkout → WhatsApp opens with your order summary already filled in.',
      gradient: 'from-[#FFC4D2] to-[#FFB8C8]',
    },
  ];

  const scents = [
    'Vanilla + Amber',
    'Clean Linen',
    'Coconut + Sandalwood',
    'Rose + Oud',
    'Black Cherry',
    'Unscented (decor)',
  ];

  return (
    <section id="benefits" className="py-24 section-blue relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B8E0F0]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFD1DC]/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-luxury mb-4">
            <Sparkles size={16} className="text-[#F4A6B9]" />
            <span className="text-sm font-medium text-[#8B5A6B]">Why Choose Us</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Why Women Love <span className="gradient-text">Cctimeless</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A soft glow, a clean luxury aesthetic, and a premium finish—made to upgrade your mood and your space.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="glass-luxury rounded-3xl p-8 hover:shadow-xl transition-all duration-500 group hover:-translate-y-2"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <benefit.icon size={28} className="text-white" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-gray-800 mb-3">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Scents Section */}
        <div className="mt-16 glass-luxury rounded-3xl p-8 md:p-10 border border-[#FFD1DC]/30">
          <h3 className="font-serif text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">
            Popular Scent Vibes <span className="text-[#F4A6B9]">(Ask us on WhatsApp)</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {scents.map((scent, index) => (
              <span
                key={index}
                className="px-5 py-2.5 rounded-full tag-pastel text-sm font-medium hover:shadow-md transition-shadow cursor-default"
              >
                {scent}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500 text-center">
            Scent availability may vary by drop. Message us for today's options.
          </p>
        </div>
      </div>
    </section>
  );
}
