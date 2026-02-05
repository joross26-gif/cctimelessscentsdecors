import { useState, useEffect } from 'react';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Strip } from './sections/Strip';
import { Benefits } from './sections/Benefits';
import { Shop } from './sections/Shop';
import { Collections } from './sections/Collections';
import { VideoGallery } from './sections/VideoGallery';
import { About } from './sections/About';
import { CustomOrders } from './sections/CustomOrders';
import { FAQ } from './sections/FAQ';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { CartDrawer } from './sections/CartDrawer';
import { ProductModal } from './sections/ProductModal';
import { useCart } from './hooks/useCart';
import { useSettings } from './hooks/useSettings';
import { useProducts } from './hooks/useProducts';
import type { Product } from './types';
import './App.css';

function App() {
  const { cart, cartCount, addToCart, removeFromCart, updateQty, clearCart } = useCart();
  const { settings } = useSettings();
  const { products, loading } = useProducts();
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get featured products (first 3 with badges)
  const featuredProducts = products
    .filter(p => p.badges.some(b => /best seller|new|statement/i.test(b)))
    .slice(0, 3);

  // If no featured products, use first 3
  const displayFeatured = featuredProducts.length > 0 
    ? featuredProducts 
    : products.slice(0, 3);

  const handleViewProduct = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const handleAddToCart = (id: string, qty: number) => {
    addToCart(id, qty);
  };

  // Prevent body scroll when cart or modal is open
  useEffect(() => {
    if (isCartOpen || isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen, isModalOpen]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFE4EB] via-[#D6EEF7] to-[#E6E6FA]">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#F4A6B9] to-[#8CCFE8] flex items-center justify-center animate-pulse shadow-xl">
            <img src="/assets/logo.png" alt="Cctimeless" className="h-12 w-auto" />
          </div>
          <p className="text-gray-600 text-lg">Loading your luxury experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header 
        settings={settings} 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
      />
      
      <main id="top">
        <Hero 
          settings={settings} 
          featuredProducts={displayFeatured} 
          onViewProduct={handleViewProduct} 
        />
        <Strip />
        <Benefits />
        <Shop 
          products={products} 
          settings={settings} 
          onViewProduct={handleViewProduct}
          onAddToCart={handleAddToCart}
        />
        <Collections products={products} />
        <VideoGallery settings={settings} />
        <About products={products} settings={settings} />
        <CustomOrders settings={settings} />
        <FAQ settings={settings} />
        <Contact settings={settings} />
      </main>
      
      <Footer settings={settings} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        products={products}
        settings={settings}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        onClear={clearCart}
      />

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        settings={settings}
        onAddToCart={handleAddToCart}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}

export default App;
