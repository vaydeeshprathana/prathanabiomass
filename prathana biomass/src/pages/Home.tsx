import { Leaf, Flame, Truck, Shield, ArrowRight, Package, Phone } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: 'products' | 'about' | 'contact' | 'home') => void;
}

const stats = [
  { label: 'Per Tonne (Min)', value: '₹3,900' },
  { label: 'Per Tonne (Max)', value: '₹8,000' },
  { label: 'Min Order', value: '1 Tonne' },
  { label: 'Max Order', value: '50 Tonnes' },
];

const highlights = [
  {
    icon: Flame,
    title: 'High Burning Efficiency',
    description: 'Our wood chips deliver consistent, high-energy combustion for industrial boilers and heating systems.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Fuel',
    description: 'Sustainably sourced biomass that reduces carbon footprint compared to fossil fuels.',
  },
  {
    icon: Truck,
    title: 'Reliable Bulk Supply',
    description: 'Flexible order quantities from 1 to 50 tonnes with dependable, on-time delivery.',
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Premium non-coated raw wood chips, rigorously maintained for moisture and quality standards.',
  },
];

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-forest-900 via-forest-800 to-forest-700 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/80 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-6 py-24 lg:py-32">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-1.5 mb-6">
            <Leaf size={14} className="text-green-400" />
            <span className="text-green-300 text-xs font-medium tracking-wider uppercase">Tamil Nadu, India</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-5">
            Powering Industry<br />
            <span className="text-green-400">Sustainably.</span>
          </h1>
          <p className="text-stone-300 text-lg lg:text-xl max-w-2xl leading-relaxed mb-8">
            Prathana Biomass is a trusted manufacturer and bulk supplier of premium wood chips — engineered for high-efficiency boiler fuel and industrial burning applications.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('products')}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5"
            >
              View Products <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 backdrop-blur-sm"
            >
              <Phone size={16} /> Get a Quote
            </button>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-amber-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 divide-x divide-amber-600">
          {stats.map(({ label, value }) => (
            <div key={label} className="text-center px-4">
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-amber-200 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-stone-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800">Why Choose Prathana Biomass?</h2>
            <p className="text-stone-500 mt-3 max-w-xl mx-auto">We deliver consistent quality, sustainable fuel solutions, and dependable supply to keep your operations running.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={22} className="text-green-600" />
                </div>
                <h3 className="font-bold text-stone-800 mb-2">{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest-900 text-white py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Package size={40} className="mx-auto text-green-400 mb-4" />
          <h2 className="text-3xl font-bold mb-3">Ready to Place a Bulk Order?</h2>
          <p className="text-stone-400 mb-8 max-w-lg mx-auto">
            Contact us today for pricing, availability, and delivery details. We supply 1 to 50 tonnes across Tamil Nadu and beyond.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:-translate-y-0.5"
          >
            Contact Us Now
          </button>
        </div>
      </section>
    </div>
  );
}
