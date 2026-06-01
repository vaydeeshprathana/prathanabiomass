import { MapPin, Phone, Mail, Leaf, Target, Award, Users } from 'lucide-react';

const details = [
  { label: 'Company Name', value: 'M/s Prathana Biomass' },
  { label: 'Location', value: 'Periathatchur, Villupuram District, Tamil Nadu' },
  { label: 'Product', value: 'Bulk Raw Wood Chips (Non-Coated)' },
  { label: 'Applications', value: 'Boilers, Industrial Heating, Burning' },
  { label: 'Price Range', value: '₹3,900 – ₹8,000 per tonne' },
  { label: 'Min. Order Qty', value: '1 Tonne' },
  { label: 'Max. Order Qty', value: '50 Tonnes' },
];

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To provide industries across Tamil Nadu and beyond with clean, efficient biomass fuel that powers growth while protecting the planet.',
  },
  {
    icon: Award,
    title: 'Quality First',
    description: 'Every batch of wood chips is maintained to consistent quality standards — from moisture levels to chip size — ensuring reliable combustion performance.',
  },
  {
    icon: Users,
    title: 'Customer Focus',
    description: 'We build lasting partnerships through transparent pricing, flexible order quantities, and dependable delivery schedules.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-forest-900 to-forest-700 text-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-4">
            <Leaf size={16} />
            <span>About Us</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">M/s Prathana Biomass</h1>
          <p className="text-stone-300 text-lg max-w-2xl leading-relaxed">
            A leading manufacturer and bulk supplier of biomass wood chips, committed to sustainable industrial energy solutions from the heart of Tamil Nadu.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        {/* Story */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden grid md:grid-cols-2 gap-0">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-stone-800 mb-4">Who We Are</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              M/s Prathana Biomass is based in Periathatchur, Villupuram District, Tamil Nadu — a region rich in forestry resources. We specialize in the manufacture and bulk supply of raw, non-coated wood chips designed for industrial fuel and burning applications.
            </p>
            <p className="text-stone-600 leading-relaxed">
              Our deep roots in the local wood processing industry give us the capability to deliver consistent quality, competitive pricing, and reliable supply — whether you need 1 tonne or 50 tonnes.
            </p>
          </div>
          <div className="h-64 md:h-auto overflow-hidden">
            <img
              src="https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
              alt="Wood processing facility"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-2xl font-bold text-stone-800 mb-6">What Drives Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={20} className="text-amber-700" />
                </div>
                <h3 className="font-bold text-stone-800 mb-2">{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Details table */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
          <h2 className="text-xl font-bold text-stone-800 mb-6">Company Details</h2>
          <div className="divide-y divide-stone-100">
            {details.map(({ label, value }) => (
              <div key={label} className="flex flex-col sm:flex-row sm:items-center py-3.5 gap-1">
                <span className="sm:w-44 text-stone-500 text-sm font-medium shrink-0">{label}</span>
                <span className="text-stone-800 text-sm font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact quick strip */}
        <div className="bg-forest-900 text-white rounded-2xl p-8 grid sm:grid-cols-3 gap-6">
          <div className="sm:col-span-1">
            <h3 className="font-bold text-lg mb-2">Get in Touch</h3>
            <p className="text-stone-400 text-sm">We respond to all inquiries within 24 hours.</p>
          </div>
          <div className="sm:col-span-2 flex flex-col sm:flex-row gap-4">
            <a
              href="tel:8838518274"
              className="flex items-center gap-3 bg-forest-700 hover:bg-forest-600 rounded-xl px-5 py-3 transition-colors"
            >
              <Phone size={18} className="text-green-400" />
              <div>
                <div className="text-xs text-stone-400">Call Us</div>
                <div className="font-semibold text-sm">+91 88385 18274</div>
              </div>
            </a>
            <a
              href="mailto:prathanabiofuels@gmail.com"
              className="flex items-center gap-3 bg-forest-700 hover:bg-forest-600 rounded-xl px-5 py-3 transition-colors"
            >
              <Mail size={18} className="text-green-400" />
              <div>
                <div className="text-xs text-stone-400">Email Us</div>
                <div className="font-semibold text-sm">prathanabiofuels@gmail.com</div>
              </div>
            </a>
          </div>
        </div>

        {/* Map/location */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
            <MapPin size={22} className="text-green-600" />
          </div>
          <div>
            <div className="font-bold text-stone-800">Our Location</div>
            <div className="text-stone-500 text-sm mt-0.5">
              Periathatchur, Villupuram District, Tamil Nadu, India
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
