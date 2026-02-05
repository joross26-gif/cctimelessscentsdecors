import { X, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import type { Product, Settings } from '@/types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  settings: Settings | null;
  onAddToCart: (id: string, qty: number) => void;
  onOpenCart: () => void;
}

export function ProductModal({
  product,
  isOpen,
  onClose,
  settings,
  onAddToCart,
  onOpenCart,
}: ProductModalProps) {
  const [qty, setQty] = useState(1);

  if (!product || !isOpen) return null;

  const formatPrice = (price: number) => {
    return `${settings?.currency?.symbol || '₦'}${price.toLocaleString()}`;
  };

  const handleAddToCart = () => {
    onAddToCart(product.id, qty);
    onClose();
    onOpenCart();
    setQty(1);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto pointer-events-auto">
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="aspect-square md:aspect-auto bg-gray-100 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="600" fill="%23FFE4EB"%3E%3Crect width="600" height="600"/%3E%3Ctext x="300" y="305" text-anchor="middle" fill="%23F4A6B9" font-size="24"%3E' + product.name + '%3C/text%3E%3C/svg%3E';
                }}
              />
              {/* Close button on mobile */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 md:hidden w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 flex flex-col">
              {/* Close button on desktop */}
              <button
                onClick={onClose}
                className="hidden md:flex self-end w-10 h-10 rounded-full bg-gray-100 items-center justify-center hover:bg-gray-200 transition-colors mb-4"
              >
                <X size={20} />
              </button>

              {/* Badges */}
              {product.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.badges.map((badge, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        i === 0 ? 'bg-[#F4A6B9] text-white' : 
                        i === 1 ? 'bg-[#8CCFE8] text-white' : 
                        'bg-[#E6E6FA] text-[#7A6A8B]'
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              {/* Title & Price */}
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-2xl font-bold text-[#F4A6B9] mb-4">
                {formatPrice(product.price)}
              </p>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6">
                {product.short}
              </p>

              {/* Category */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm text-gray-500">Category:</span>
                <span className="px-3 py-1 rounded-full bg-[#FFE4EB] text-[#F4A6B9] text-sm font-medium">
                  {product.category}
                </span>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="mt-auto space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-10 h-10 rounded-xl bg-white border border-[#FFD1DC] flex items-center justify-center hover:bg-[#FFE4EB] transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-12 text-center font-semibold text-lg">{qty}</span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="w-10 h-10 rounded-xl bg-white border border-[#FFD1DC] flex items-center justify-center hover:bg-[#FFE4EB] transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 rounded-xl btn-pastel text-white font-semibold text-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>

                <p className="text-sm text-gray-500 text-center">
                  Checkout opens WhatsApp with your order summary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
