import { useState } from 'react';
import { Home, Package, Info, Phone, Menu, X, Leaf, ChevronRight } from 'lucide-react';

export type Page = 'home' | 'products' | 'about' | 'contact';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { id: Page; label: string; icon: React.ElementType }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'about', label: 'About Us', icon: Info },
  { id: 'contact', label: 'Contact', icon: Phone },
];

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const [open, setOpen] = useState(false);

  const handleNav = (page: Page) => {
    onNavigate(page);
    setOpen(false);
  };

  return (
    <>
      {/* Mobile top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-forest-900 text-white shadow-lg lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-md hover:bg-forest-700 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2">
          <Leaf size={20} className="text-green-400" />
          <span className="font-semibold text-sm tracking-wide">Prathana Biomass</span>
        </div>
        <div className="w-9" />
      </header>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 w-72 bg-forest-900 text-white flex flex-col shadow-2xl transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:z-30`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-forest-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-inner">
              <Leaf size={22} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-base leading-tight">Prathana</div>
              <div className="text-green-400 text-xs font-medium tracking-wider uppercase">Biomass</div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-md hover:bg-forest-700 transition-colors lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map(({ id, label, icon: Icon }) => {
            const active = currentPage === id;
            return (
              <button
                key={id}
                onClick={() => handleNav(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group
                  ${active
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-stone-300 hover:bg-forest-700 hover:text-white'
                  }`}
              >
                <Icon size={18} className={active ? 'text-white' : 'text-stone-400 group-hover:text-green-400 transition-colors'} />
                <span className="font-medium text-sm">{label}</span>
                {active && <ChevronRight size={14} className="ml-auto opacity-70" />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-forest-700">
          <p className="text-stone-500 text-xs leading-relaxed">
            Periathatchur, Villupuram Dist.<br />Tamil Nadu, India
          </p>
          <a
            href="tel:8838518274"
            className="mt-2 flex items-center gap-2 text-green-400 text-xs font-medium hover:text-green-300 transition-colors"
          >
            <Phone size={12} />
            +91 88385 18274
          </a>
        </div>
      </aside>
    </>
  );
}
