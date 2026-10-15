import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Camera,
  Castle,
  Sparkles,
  Utensils,
  Cake,
  Music,
  Speaker,
  Flower2,
  Flame,
  Smile,
  Shirt,
  Gem,
  Palette,
  Mail,
  Car,
  CalendarCheck,
  Truck,
  PackagePlus,
  ArrowRight,
} from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const { categories, vendors, setSelectedCategory, setActiveCustomerTab, language } = useApp();

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera':
        return Camera;
      case 'Castle':
        return Castle;
      case 'Sparkles':
        return Sparkles;
      case 'Utensils':
        return Utensils;
      case 'Cake':
        return Cake;
      case 'Music':
        return Music;
      case 'Speaker':
        return Speaker;
      case 'Flower2':
        return Flower2;
      case 'Flame':
        return Flame;
      case 'Smile':
        return Smile;
      case 'Shirt':
        return Shirt;
      case 'Gem':
        return Gem;
      case 'Palette':
        return Palette;
      case 'Mail':
        return Mail;
      case 'Car':
        return Car;
      case 'CalendarCheck':
        return CalendarCheck;
      case 'Truck':
        return Truck;
      default:
        return PackagePlus;
    }
  };

  const activeCategories = categories.filter(c => c.active);

  return (
    <section id="categories-section" className="py-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#8C2337] mb-1">
              {language === 'en' ? 'Comprehensive Directory' : 'सम्पूर्ण वैवाहिक सेवाएँ'}
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {language === 'en' ? 'Explore Wedding Categories' : 'शादी की मुख्य श्रेणियाँ'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md">
            {language === 'en'
              ? 'From grand marriage lawns and caterers to bridal mehndi and brass bands — everything organized in one place.'
              : 'बारात घर, हलवाई, फोटोग्राफर से लेकर पंडित जी तक — हर सेवा एक ही मंच पर।'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {activeCategories.map(cat => {
            const Icon = getCategoryIcon(cat.icon);
            const count = vendors.filter(v => v.categoryId === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveCustomerTab('directory');
                }}
                className="group p-4 bg-white rounded-lg border border-stone-200/90 hover:border-[#6E1428] hover:shadow-md transition-all text-left flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 rounded bg-[#FAF2F4] text-[#6E1428] group-hover:bg-[#6E1428] group-hover:text-[#F3D797] flex items-center justify-center transition-colors mb-3">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif text-sm font-semibold text-stone-900 group-hover:text-[#6E1428] transition-colors leading-snug line-clamp-2">
                    {language === 'en' ? cat.name : cat.nameHi}
                  </h3>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span>{count} {count === 1 ? 'vendor' : 'vendors'}</span>
                  <ArrowRight className="w-3 h-3 text-stone-400 group-hover:text-[#6E1428] group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
