import { Search } from 'lucide-react';
import { Input } from '../../components/ui/Input';

export default function SearchScreen() {
  return (
    <div className="p-6 pt-12">
      <h1 className="text-2xl font-bold mb-6">Search Services</h1>
      <Input icon={<Search size={20} />} placeholder="Plumber, Electrician, etc." autoFocus />
      
      <div className="mt-8">
        <h3 className="text-sm font-bold text-neutral-400 mb-4 uppercase tracking-wider">Suggested Actions</h3>
        <div className="flex flex-wrap gap-2">
           {['AC Repair', 'Sofa Cleaning', 'Wiring', 'Haircut for Men'].map(item => (
             <button key={item} className="px-4 py-2 bg-neutral-100 rounded-xl text-sm font-medium hover:bg-neutral-200">
               {item}
             </button>
           ))}
        </div>
      </div>
    </div>
  );
}
