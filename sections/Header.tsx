import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Instagram, Phone } from 'lucide-react';
import type { Settings } from '@/types';

interface HeaderProps {
  settings: Settings | null;
  cartCount: number;
  onOpenCart: () => void;
}

export function Header({ settings, cartCount, onOpenCart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#shop', label: 'Shop' },
    { href: '#collections', label: 'Collections' },
    { href: '#videos', label: 'Videos' },
    { href: '#benefits', label: 'Benefits' },
    { href: '#about', label: 'About' },
    { href: '#custom', label: 'Custom' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact' },
  ];

  const whatsappLink = settings?.contact?.whatsAppNumberInternational
    ? `https://wa.me/${settings.contact.whatsAppNumberInternational.replace(/[^\d]/g, '')}`
    : '#';

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#F4A6B9] via-[#E8A0B0] to-[#8CCFE8] text-white text-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex justify-between items-center relative">
          <div className="hidden sm:block font-medium tracking-wide">
            ✨ Handmade in Lagos • 2–5 business days (Lagos) • 3–10 business days (Nationwide)
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <a href={settings?.social?.instagramUrl || '#'} target="_blank" rel="noreferrer" className="hover:text-white/80 transition-colors flex items-center gap-1.5">
              <Instagram size={14} /> <span className="hidden sm:inline">Instagram</span>
            </a>
            <span className="opacity-50">|</span>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="hover:text-white/80 transition-colors flex items-center gap-1.5 font-medium">
              <Phone size={14} /> <span className="hidden sm:inline">Order on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'glass-luxury shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src="/assets/logo.png" 
                alt="Cctimeless scents&decor" 
                className="h-14 w-auto drop-shadow-lg transition-transform group-hover:scale-105"
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-serif font-semibold text-xl text-gray-800 tracking-tight">Cctimeless</span>
              <span className="block text-xs text-gray-500 tracking-widest uppercase">scents & decor</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-700 hover:text-[#F4A6B9] transition-all py-2 px-4 rounded-xl hover:bg-[#FFE4EB]/50 font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 border border-[#FFD1DC] text-gray-700 hover:bg-[#FFE4EB] transition-all shadow-sm hover:shadow-md"
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline font-medium">Cart</span>
              {cartCount > 0 && (
                <span className="bg-gradient-to-r from-[#F4A6B9] to-[#8CCFE8] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse-soft">
                  {cartCount}
                </span>
              )}
            </button>
            <a
              href="#shop"
              className="hidden sm:block px-6 py-2.5 rounded-xl btn-pastel text-white font-medium text-sm shadow-lg hover:shadow-xl transition-all"
            >
              Shop Now
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/80 border border-[#FFD1DC] hover:bg-[#FFE4EB] transition-all"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden glass-luxury border-t border-[#FFD1DC]/30 transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-[#F4A6B9] py-3 px-4 rounded-xl hover:bg-[#FFE4EB]/50 transition-all font-medium"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 mt-4 pt-4 border-t border-[#FFD1DC]/50">
              <a href="#shop" onClick={() => setMobileMenuOpen(false)} className="flex-1 px-5 py-3 rounded-xl btn-pastel text-white font-medium text-center shadow-lg">
                Shop Now
              </a>
              <button onClick={() => { setMobileMenuOpen(false); onOpenCart(); }} className="flex-1 px-5 py-3 rounded-xl bg-white border border-[#FFD1DC] text-gray-700 font-medium hover:bg-[#FFE4EB] transition-all">
                Open Cart
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
