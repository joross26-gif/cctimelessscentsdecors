import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import type { Product, Settings, CartItem } from '@/types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  products: Product[];
  settings: Settings | null;
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cart,
  products,
  settings,
  onUpdateQty,
  onRemove,
  onClear,
}: CartDrawerProps) {
  const formatPrice = (price: number) => {
    return `${settings?.currency?.symbol || '₦'}${price.toLocaleString()}`;
  };

  const cartProducts = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return { ...item, product };
  }).filter(item => item.product);

  const total = cartProducts.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.qty;
  }, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const name = (document.getElementById('checkout-name') as HTMLInputElement)?.value?.trim() || '';
    const address = (document.getElementById('checkout-address') as HTMLInputElement)?.value?.trim() || '';
    const phone = (document.getElementById('checkout-phone') as HTMLInputElement)?.value?.trim() || '';
    const notes = (document.getElementById('checkout-notes') as HTMLInputElement)?.value?.trim() || '';

    const orderLines = cartProducts.map(item => {
      return `• ${item.product?.name} x${item.qty} — ${formatPrice((item.product?.price || 0) * item.qty)}`;
    });

    const orderText = orderLines.join('\n');
    const template = settings?.automation?.whatsAppPrefillTemplate || '{ORDER}';
    
    const text = template
      .replace('{ORDER}', orderText)
      .replace('{NAME}', name || '-')
      .replace('{ADDRESS}', address || '-')
      .replace('{PHONE}', phone || '-')
      .replace('{NOTES}', notes || '-');

    const whatsappNum = settings?.contact?.whatsAppNumberInternational?.replace(/[^\d]/g, '');
    window.open(`https://wa.me/${whatsappNum}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-[#FFD1DC]/50">
            <div className="flex items-center gap-3">
              <ShoppingBag size={24} className="text-[#F4A6B9]" />
              <h2 className="font-serif text-xl font-semibold text-gray-800">Your Cart</h2>
              {cart.length > 0 && (
                <span className="bg-gradient-to-r from-[#F4A6B9] to-[#8CCFE8] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-[#FFE4EB] transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-auto p-5 space-y-4">
            {cartProducts.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag size={48} className="mx-auto text-[#FFD1DC] mb-4" />
                <p className="text-gray-500">Your cart is empty.</p>
                <p className="text-sm text-gray-400 mt-1">Add some beautiful items!</p>
              </div>
            ) : (
              cartProducts.map((item, index) => (
                <div
                  key={item.id}
                  className="glass rounded-2xl p-4 flex gap-4"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="%23FFE4EB"%3E%3Crect width="80" height="80"/%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 truncate">{item.product?.name}</h4>
                    <p className="text-xs text-gray-500">{item.product?.category}</p>
                    <p className="text-sm text-[#F4A6B9] font-medium mt-1">
                      {formatPrice(item.product?.price || 0)} each
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQty(item.id, item.qty - 1)}
                          className="w-7 h-7 rounded-lg bg-white border border-[#FFD1DC] flex items-center justify-center hover:bg-[#FFE4EB] transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-medium">{item.qty}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.qty + 1)}
                          className="w-7 h-7 rounded-lg bg-white border border-[#FFD1DC] flex items-center justify-center hover:bg-[#FFE4EB] transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cartProducts.length > 0 && (
            <div className="p-5 border-t border-[#FFD1DC]/50 space-y-4 bg-[#FFF9FB]">
              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Estimated total</span>
                <span className="font-serif text-2xl font-bold text-[#F4A6B9]">{formatPrice(total)}</span>
              </div>

              {/* Checkout Form */}
              <div className="space-y-3">
                <input
                  id="checkout-name"
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#FFD1DC] text-sm"
                />
                <input
                  id="checkout-address"
                  type="text"
                  placeholder="Delivery address"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#FFD1DC] text-sm"
                />
                <input
                  id="checkout-phone"
                  type="tel"
                  placeholder="Phone number"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#FFD1DC] text-sm"
                />
                <input
                  id="checkout-notes"
                  type="text"
                  placeholder="Scent, color, or special request (optional)"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#FFD1DC] text-sm"
                />
              </div>

              {/* Buttons */}
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-xl btn-pastel text-white font-semibold"
              >
                Checkout on WhatsApp
              </button>
              <button
                onClick={onClear}
                className="w-full py-3 rounded-xl bg-white border border-[#FFD1DC] text-gray-600 font-medium hover:bg-[#FFE4EB] transition-all"
              >
                Clear cart
              </button>
              <p className="text-xs text-gray-500 text-center">
                By checking out, you'll be redirected to WhatsApp to confirm.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
