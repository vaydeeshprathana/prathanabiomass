import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 88385 18274',
    href: 'tel:8838518274',
    sub: 'Mon–Sat, 9am–6pm IST',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'prathanabiofuels@gmail.com',
    href: 'mailto:prathanabiofuels@gmail.com',
    sub: 'We reply within 24 hours',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Periathatchur, Villupuram',
    href: null,
    sub: 'Tamil Nadu, India',
  },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  quantity_tonnes: string;
  message: string;
}

const initial: FormState = { name: '', email: '', phone: '', quantity_tonnes: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const { error: dbError } = await supabase.from('inquiries').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
        quantity_tonnes: form.quantity_tonnes ? parseFloat(form.quantity_tonnes) : null,
      });
      if (dbError) throw dbError;
      setSuccess(true);
      setForm(initial);
    } catch {
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-forest-900 to-forest-700 text-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-4">
            <MessageSquare size={16} />
            <span>Contact Us</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Let's Talk Biomass</h1>
          <p className="text-stone-300 text-lg max-w-2xl leading-relaxed">
            Have a bulk order inquiry, pricing question, or just want to learn more? Reach out and our team will get back to you promptly.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 grid md:grid-cols-5 gap-8">
        {/* Contact info */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="font-bold text-stone-800 text-lg mb-4">Contact Information</h2>
          {contactInfo.map(({ icon: Icon, label, value, href, sub }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm flex items-start gap-4"
            >
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                <Icon size={18} className="text-green-600" />
              </div>
              <div>
                <div className="text-stone-500 text-xs font-medium uppercase tracking-wider">{label}</div>
                {href ? (
                  <a
                    href={href}
                    className="font-semibold text-stone-800 hover:text-green-700 transition-colors text-sm mt-0.5 block"
                  >
                    {value}
                  </a>
                ) : (
                  <div className="font-semibold text-stone-800 text-sm mt-0.5">{value}</div>
                )}
                <div className="text-stone-400 text-xs mt-0.5">{sub}</div>
              </div>
            </div>
          ))}

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mt-2">
            <div className="font-semibold text-amber-800 text-sm mb-1">Bulk Orders Welcome</div>
            <p className="text-amber-700 text-xs leading-relaxed">
              We supply 1 to 50 tonnes per order. Pricing depends on moisture content, wood type, and order volume. Contact us for a custom quote.
            </p>
          </div>
        </div>

        {/* Contact form */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
            <h2 className="font-bold text-stone-800 text-xl mb-6">Send Us an Inquiry</h2>

            {success ? (
              <div className="flex flex-col items-center text-center py-8">
                <CheckCircle size={52} className="text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-stone-800 mb-2">Inquiry Sent!</h3>
                <p className="text-stone-500 text-sm max-w-xs">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 text-green-600 text-sm font-medium hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                      Required Quantity (Tonnes)
                    </label>
                    <input
                      type="number"
                      name="quantity_tonnes"
                      value={form.quantity_tonnes}
                      onChange={handleChange}
                      placeholder="1 – 50"
                      min="1"
                      max="50"
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your requirements, application, or any specific questions..."
                    required
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition resize-none"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
                    <AlertCircle size={16} className="shrink-0" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:bg-green-300 text-white font-semibold py-3 rounded-xl transition-all duration-200"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
