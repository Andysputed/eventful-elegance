import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, Utensils } from "lucide-react";

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
}

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      const { data } = await supabase.from('menu_items').select('*').eq('is_available', true);
      if (data) setMenuItems(data);
      setLoading(false);
    };
    fetchMenu();
  }, []);

  const categories = ["Starters", "Main Course", "Dessert", "Drinks"];

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <div className="pt-32 pb-20 container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <Utensils className="w-10 h-10 text-gold mx-auto mb-4" />
          <h1 className="font-display text-5xl font-bold text-charcoal mb-4">Our Menu</h1>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-gold" /></div>
        ) : (
          <div className="space-y-16">
            {categories.map(cat => {
              const items = menuItems.filter(i => i.category === cat);
              if (items.length === 0) return null;
              return (
                <div key={cat}>
                  <h2 className="text-2xl font-bold text-forest border-b border-stone-200 pb-2 mb-8 uppercase tracking-widest text-center">{cat}</h2>
                  <div className="grid gap-8">
                    {items.map(item => (
                      <div key={item.id} className="flex justify-between items-baseline group">
                        <div className="flex-1 pr-4">
                          <h3 className="text-xl font-semibold text-charcoal group-hover:text-gold transition-colors">{item.name}</h3>
                          <p className="text-stone-500 italic text-sm mt-1">{item.description}</p>
                        </div>
                        <div className="text-xl font-bold text-charcoal whitespace-nowrap">KES {item.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MenuPage;