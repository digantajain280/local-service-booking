import { useState } from 'react';
import { MapPin, Search, Clock, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '../../components/ui/Input';

export default function HomeScreen() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = [
    { icon: '⚡', name: 'Electrician' },
    { icon: '🚰', name: 'Plumber' },
    { icon: '❄️', name: 'AC Repair' },
    { icon: '🧹', name: 'Cleaning' },
    { icon: '💇', name: 'Salon' },
    { icon: '🔧', name: 'Carpenter' },
  ];

  const faqs = [
    { q: "How do I book a service?", a: "Select a category, browse available services, choose a time slot, and confirm your booking securely." },
    { q: "Are the service providers verified?", a: "Yes, all our professionals undergo strict background checks and KYC verification." },
    { q: "What if I need to cancel?", a: "You can cancel free of charge up to 2 hours before the scheduled service time." }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col pb-8">
      {/* Header */}
      <div className="bg-black text-white px-6 pt-12 pb-6 rounded-b-[2rem]">
        <div className="flex items-center text-sm mb-6 opacity-80">
          <MapPin size={16} className="mr-1" />
          <span>Home - 123 Main Street</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-6">What do you need<br/>help with?</h1>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
          <input 
            placeholder="Search for services..." 
            className="w-full bg-white/15 backdrop-blur-md border border-white/20 text-white placeholder:text-white/60 rounded-2xl py-4 pl-12 pr-4 outline-none focus:bg-white/20 transition-colors"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 pt-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold">Categories</h2>
          <button className="text-sm font-medium text-neutral-500">See all</button>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <div key={i} className="flex flex-col items-center bg-white p-4 rounded-3xl shadow-sm border border-neutral-100/50">
              <div className="text-3xl mb-2">{cat.icon}</div>
              <span className="text-[11px] font-semibold text-center">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Services */}
      <div className="px-6 pt-8">
        <h2 className="text-xl font-bold mb-4">Popular Near You</h2>
        
        <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-4">
          {[1,2,3].map((item) => (
             <div key={item} className="flex-none w-64 bg-white rounded-3xl p-4 shadow-sm border border-neutral-100 flex flex-col">
               <div className="w-full h-32 bg-neutral-100 rounded-2xl mb-4 overflow-hidden">
                 <img src={`https://picsum.photos/seed/service${item}/400/300`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
               </div>
               <div className="flex justify-between items-start mb-2">
                 <div>
                   <h3 className="font-bold text-lg">AC Deep Clean</h3>
                   <p className="text-xs text-neutral-500">45 mins • ₹499</p>
                 </div>
                 <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-lg">
                   ★ 4.8
                 </div>
               </div>
             </div>
          ))}
        </div>
      </div>

      {/* Service Timings & FAQs */}
      <div className="px-6 pt-8">
        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-5 mb-8 flex items-start gap-4 text-blue-900">
           <div className="bg-blue-200/50 p-2 rounded-xl text-blue-600 shrink-0">
             <Clock size={24} />
           </div>
           <div>
             <h3 className="font-bold text-lg mb-1">Service Timings</h3>
             <p className="text-sm opacity-80 leading-relaxed">
               Our professionals are available from <strong>8:00 AM to 10:00 PM</strong>, all 7 days a week. Instant booking depends on nearby availability.
             </p>
           </div>
        </div>

        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <HelpCircle size={20} className="text-neutral-500" /> Frequently Asked Questions
        </h2>
        
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden transition-all">
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-4 flex justify-between items-center font-semibold"
              >
                <span className="text-sm pr-4">{faq.q}</span>
                {openFaq === index ? <ChevronUp size={20} className="text-neutral-400 shrink-0" /> : <ChevronDown size={20} className="text-neutral-400 shrink-0" />}
              </button>
              {openFaq === index && (
                <div className="p-4 pt-0 text-sm text-neutral-500 leading-relaxed border-t border-neutral-100 mt-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
