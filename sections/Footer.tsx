import type { Settings } from '@/types';

interface FooterProps {
  settings: Settings | null;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: '#shop', label: 'Shop' },
    { href: '#collections', label: 'Collections' },
    { href: '#videos', label: 'Videos' },
    { href: '#custom', label: 'Custom Orders' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer className="py-16 border-t border-[#FFD1DC]/30 bg-white/70 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <a href="#top" className="flex items-center gap-4 group">
              <img 
                src="/assets/logo.png" 
                alt="Cctimeless scents&decor" 
                className="h-16 w-auto drop-shadow-lg transition-transform group-hover:scale-105"
              />
              <div>
                <h3 className="font-serif font-bold text-2xl text-gray-800">Cctimeless</h3>
                <p className="text-sm text-gray-500 tracking-widest uppercase">scents & decor</p>
              </div>
            </a>
            <p className="text-gray-600 text-center lg:text-left max-w-sm">
              {settings?.shortBio || 'Luxury sculptural candles and clean home decor pieces—handcrafted in Lagos.'}
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {footerLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-[#F4A6B9] transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social & Contact */}
          <div className="flex flex-col items-center lg:items-end gap-3">
            <p className="text-sm text-gray-500">
              {settings?.location || 'Lagos, Nigeria'}
            </p>
            <p className="text-sm text-gray-500">
              {settings?.contact?.whatsAppNumberInternational || '+2348108693787'}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-[#FFD1DC] to-transparent" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-sm text-gray-500">
            © {currentYear} {settings?.brandName || 'Cctimeless scents&decor'}. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            Made with <span className="text-[#F4A6B9]">♥</span> in Lagos, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
