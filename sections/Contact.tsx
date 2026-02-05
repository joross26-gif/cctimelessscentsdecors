import { Phone, Mail, Instagram, Send, MapPin, Clock, Sparkles } from 'lucide-react';
import type { Settings } from '@/types';

interface ContactProps {
  settings: Settings | null;
}

export function Contact({ settings }: ContactProps) {
  const whatsappLink = settings?.contact?.whatsAppNumberInternational
    ? `https://wa.me/${settings.contact.whatsAppNumberInternational.replace(/[^\d]/g, '')}`
    : '#';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = (formData.get('name') as string)?.trim() || '';
    const phone = (formData.get('phone') as string)?.trim() || '';
    const message = (formData.get('message') as string)?.trim() || '';
    
    const text = `Hi Cctimeless scents&decor!\n\nName: ${name}\nPhone: ${phone || '-'}\nMessage: ${message}`;
    window.open(`${whatsappLink}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 section-blue relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[#B8E0F0]/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#FFD1DC]/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-luxury mb-4">
            <Sparkles size={16} className="text-[#F4A6B9]" />
            <span className="text-sm font-medium text-[#8B5A6B]">Get In Touch</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Contact <span className="gradient-text">Us</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fastest reply is WhatsApp. You can also email us or send a message below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* WhatsApp */}
          <div className="glass-luxury rounded-3xl p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
              <Phone size={32} className="text-white" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-gray-800 mb-2">WhatsApp</h3>
            <p className="text-sm text-gray-500 mb-5">{settings?.contact?.whatsAppNumberInternational || '+2348108693787'}</p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-pastel text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all w-full justify-center"
            >
              Message on WhatsApp
            </a>
          </div>

          {/* Email */}
          <div className="glass-luxury rounded-3xl p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#FFD1DC] to-[#F4A6B9] flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
              <Mail size={32} className="text-white" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-gray-800 mb-2">Email</h3>
            <p className="text-sm text-gray-500 mb-5 break-all">{settings?.contact?.email || 'hello@cctimelessscentsanddecor.com'}</p>
            <a
              href={`mailto:${settings?.contact?.email || 'hello@cctimelessscentsanddecor.com'}?subject=Inquiry%20—%20Cctimeless%20scents&decor`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-[#FFD1DC] text-gray-700 text-sm font-medium hover:bg-[#FFE4EB] transition-all w-full justify-center"
            >
              Send Email
            </a>
          </div>

          {/* Social */}
          <div className="glass-luxury rounded-3xl p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#E4405F] to-[#C13584] flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
              <Instagram size={32} className="text-white" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-gray-800 mb-2">Social</h3>
            <p className="text-sm text-gray-500 mb-5">@{settings?.social?.instagramHandle || 'cc_timeless_scents_decor'}</p>
            <div className="flex gap-2">
              <a
                href={settings?.social?.instagramUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="flex-1 px-4 py-3 rounded-xl bg-white border-2 border-[#FFD1DC] text-gray-700 text-sm font-medium hover:bg-[#FFE4EB] transition-all"
              >
                Instagram
              </a>
              <a
                href={settings?.social?.tiktokUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="flex-1 px-4 py-3 rounded-xl bg-white border-2 border-[#B8E0F0] text-gray-700 text-sm font-medium hover:bg-[#D6EEF7] transition-all"
              >
                TikTok
              </a>
            </div>
          </div>

          {/* Location & Hours */}
          <div className="glass-luxury rounded-3xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#F0E6C8] to-[#D4AF37] flex items-center justify-center mb-5 shadow-lg">
              <MapPin size={32} className="text-white" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-gray-800 mb-4 text-center">Location</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#F4A6B9] mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700">{settings?.location || 'Lagos, Nigeria'}</p>
                  <p className="text-sm text-gray-500">Handmade with love</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-[#8CCFE8] mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700">Business Hours</p>
                  <p className="text-sm text-gray-500">Mon - Sat: 9AM - 6PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Message Form */}
        <div className="mt-12 glass-luxury rounded-3xl p-8 md:p-10 border border-[#FFD1DC]/30">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl font-semibold text-gray-800 mb-2">Send a Quick Message</h3>
            <p className="text-gray-600">We'll get back to you as soon as possible</p>
          </div>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                className="px-5 py-3.5 rounded-xl glass-luxury border border-[#FFD1DC]/50 text-gray-700 placeholder-gray-400"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone (optional)"
                className="px-5 py-3.5 rounded-xl glass-luxury border border-[#FFD1DC]/50 text-gray-700 placeholder-gray-400"
              />
            </div>
            <textarea
              name="message"
              placeholder="What would you like to order?"
              required
              rows={4}
              className="w-full px-5 py-3.5 rounded-xl glass-luxury border border-[#FFD1DC]/50 text-gray-700 placeholder-gray-400 resize-none mb-4"
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-pastel text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Send size={18} />
              Send Message (WhatsApp)
            </button>
            <p className="text-sm text-gray-500 text-center mt-4">
              This form sends to WhatsApp automatically. No login needed.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
