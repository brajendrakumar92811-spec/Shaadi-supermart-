import React from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../utils/translations';
import { Heart, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, cities, categories, setSelectedCategory, setActiveCustomerTab, setUserRole } = useApp();
  const t = translations[language];

  return (
    <footer className="bg-[#241318] text-stone-300 text-sm border-t border-[#46232D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Brand & Mission */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#E5C378] tracking-tight mb-2">
              Shaadi Supermart
            </h3>
            <p className="text-stone-300 text-xs leading-relaxed mb-4">
              {t.tagline}. Connecting wedding families in Etawah and across Uttar Pradesh with genuine, verified local wedding vendors, transparent pricing, and direct quotations.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#E5C378]">
              <ShieldCheck className="w-4 h-4 text-[#E5C378]" />
              <span>100% Verified Local Business Partners</span>
            </div>
            <div className="mt-4 text-xs text-stone-400 space-y-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>Civil Lines, Etawah, Uttar Pradesh 206001</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span>+91 98370 12345 (Etawah Support)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <span>support@shaadisupermart.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Popular Categories */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#F4E3C1] mb-3">
              {language === 'en' ? 'Wedding Categories' : 'शादी की मुख्य सेवाएँ'}
            </h4>
            <ul className="space-y-1.5 text-xs">
              {categories.slice(0, 6).map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setActiveCustomerTab('directory');
                    }}
                    className="hover:text-[#E5C378] transition-colors cursor-pointer text-left"
                  >
                    {language === 'en' ? cat.name : cat.nameHi}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setActiveCustomerTab('directory');
                  }}
                  className="text-[#E5C378] hover:underline cursor-pointer pt-1 inline-block"
                >
                  {language === 'en' ? 'View all 18 categories →' : 'सभी 18 सेवाएँ देखें →'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Service Cities in UP */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#F4E3C1] mb-3">
              {language === 'en' ? 'Network & Service Areas' : 'सेवा क्षेत्र (उत्तर प्रदेश)'}
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-300">
              {cities.map(city => (
                <li key={city.id} className="flex items-center justify-between">
                  <span>{city.name} ({city.nameHi})</span>
                  <span className="text-[11px] text-stone-400">
                    {city.name === 'Etawah' ? 'Active Hub' : 'Expanding'}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-3 border-t border-[#46232D]">
              <p className="text-[11px] text-stone-400">
                Are you a wedding vendor in Etawah or Auraiya?
              </p>
              <button
                onClick={() => setUserRole('vendor')}
                className="mt-1.5 text-xs font-medium text-[#E5C378] hover:underline cursor-pointer"
              >
                Join as Partner Vendor →
              </button>
            </div>
          </div>

          {/* Column 4: Quick Tools & Trust */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#F4E3C1] mb-3">
              {language === 'en' ? 'Wedding Tools' : 'वेडिंग प्लानिंग टूल्स'}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => setActiveCustomerTab('budget')}
                  className="hover:text-[#E5C378] transition-colors cursor-pointer text-left"
                >
                  {language === 'en' ? 'Free Wedding Budget Calculator' : 'शादी का बजट कैलकुलेटर'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveCustomerTab('checklist')}
                  className="hover:text-[#E5C378] transition-colors cursor-pointer text-left"
                >
                  {language === 'en' ? 'Wedding Planning Checklist' : 'चरणबद्ध शादी की चेकलिस्ट'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveCustomerTab('directory')}
                  className="hover:text-[#E5C378] transition-colors cursor-pointer text-left"
                >
                  {language === 'en' ? 'Direct Quotation Comparison' : 'कोटेशन तुलना'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setUserRole('admin')}
                  className="hover:text-[#E5C378] transition-colors cursor-pointer text-left"
                >
                  {language === 'en' ? 'Admin Governance Panel' : 'सुपर एडमिन नियंत्रण'}
                </button>
              </li>
            </ul>
            <div className="mt-4 p-2.5 rounded bg-[#331A21] border border-[#522935] text-[11px] text-stone-300">
              <span className="font-semibold text-[#E5C378] block mb-0.5">Transparent & Fair</span>
              We do not fabricate reviews, ratings, or distances. All vendor listings are verified through official phone and shop registration audits.
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="pt-6 border-t border-[#3F1E27] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} Shaadi Supermart Technologies India. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span className="hover:text-stone-200 cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-stone-200 cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-stone-200 cursor-pointer">Vendor Code of Conduct</span>
            <span>·</span>
            <span className="hover:text-stone-200 cursor-pointer">Grievance Officer</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
