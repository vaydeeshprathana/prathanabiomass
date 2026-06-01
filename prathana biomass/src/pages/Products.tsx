import { Flame, Leaf, Package, CheckCircle, Info, Phone } from 'lucide-react';

interface ProductsProps {
  onNavigate: (page: 'home' | 'products' | 'about' | 'contact') => void;
}

const features = [
  'High burning efficiency for boilers & furnaces',
  'Eco-friendly, sustainably sourced wood',
  'Raw, non-coated chips – no chemical treatment',
  'Consistent moisture levels for stable combustion',
  'Suitable for industrial heating applications',
  'Bulk supply with flexible order quantities',
];

const specs = [
  { label: 'Product Type', value: 'Bulk Raw Wood Chips (Non-Coated)' },
  { label: 'Application', value: 'Boilers, Industrial Burners, Heating' },
  { label: 'Price Range', value: '₹3,900 – ₹8,000 per tonne' },
  { label: 'Minimum Order', value: '1 Tonne' },
  { label: 'Maximum Order', value: '50 Tonnes' },
  { label: 'Pricing Factors', value: 'Moisture level, wood type, order volume' },
  { label: 'Origin', value: 'Periathatchur, Villupuram, Tamil Nadu' },
];

export default function Products({ onNavigate }: ProductsProps) {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-forest-900 to-forest-700 text-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-4">
            <Package size={16} />
            <span>Our Products</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Premium Biomass Wood Chips</h1>
          <p className="text-stone-300 text-lg max-w-2xl leading-relaxed">
            High-quality, bulk raw wood chips manufactured for industrial boilers and large-scale burning applications — delivered reliably across Tamil Nadu.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        {/* Product card */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          <div className="relative h-64 overflow-hidden">
            <img
              src="https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Biomass wood chips"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-6">
              <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Available Now
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-stone-800">Bulk Raw Wood Chips</h2>
                <p className="text-stone-500 mt-1">Non-coated · Industrial Grade</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-700">₹3,900 – ₹8,000</div>
                <div className="text-stone-500 text-sm">per tonne (varies)</div>
              </div>
            </div>

            <p className="text-stone-600 leading-relaxed mb-6">
              Our premium wood chips are sourced and processed in Periathatchur, Villupuram District, Tamil Nadu. They are raw and non-coated, making them ideal for direct combustion in industrial boilers, furnaces, and large-scale heating systems. Pricing varies based on moisture content, wood type, and order volume.
            </p>

            {/* Features */}
            <h3 className="font-bold text-stone-700 mb-3 flex items-center gap-2">
              <Flame size={16} className="text-amber-600" /> Key Features
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-stone-600">
                  <CheckCircle size={15} className="text-green-500 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 justify-center"
            >
              <Phone size={16} /> Enquire & Get Quote
            </button>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
          <h3 className="font-bold text-stone-800 text-xl mb-6 flex items-center gap-2">
            <Info size={18} className="text-green-600" /> Product Specifications
          </h3>
          <div className="divide-y divide-stone-100">
            {specs.map(({ label, value }) => (
              <div key={label} className="flex flex-col sm:flex-row sm:items-center py-3.5 gap-1">
                <span className="sm:w-48 text-stone-500 text-sm font-medium shrink-0">{label}</span>
                <span className="text-stone-800 text-sm font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Eco badge */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-start gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
            <Leaf size={24} className="text-green-600" />
          </div>
          <div>
            <h4 className="font-bold text-green-800 mb-1">Committed to Sustainability</h4>
            <p className="text-green-700 text-sm leading-relaxed">
              Biomass wood chips are a renewable energy source that significantly reduce dependency on fossil fuels. Our sourcing practices prioritize responsible forestry to ensure a cleaner, greener future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
