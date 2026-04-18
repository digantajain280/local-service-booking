import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Calendar } from 'lucide-react';

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');

  return (
    <div className="flex flex-col min-h-full bg-neutral-50 pt-12">
      <div className="px-6 mb-6">
        <h1 className="text-2xl font-bold">My Bookings</h1>
      </div>

      <div className="px-6 mb-6">
         <div className="bg-neutral-100 p-1 rounded-2xl flex">
            <button 
              className={cn("flex-1 py-2 rounded-xl text-sm font-bold transition-colors", activeTab === 'upcoming' ? 'bg-white shadow-sm' : 'text-neutral-500')}
              onClick={() => setActiveTab('upcoming')}
            > Upcoming</button>
            <button 
              className={cn("flex-1 py-2 rounded-xl text-sm font-bold transition-colors", activeTab === 'completed' ? 'bg-white shadow-sm' : 'text-neutral-500')}
              onClick={() => setActiveTab('completed')}
            > History</button>
         </div>
      </div>

      <div className="px-6 flex-1 flex flex-col items-center justify-center text-neutral-400">
         <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mb-4 text-neutral-300">
            <Calendar size={32} />
         </div>
         <p className="font-medium text-center">No {activeTab} bookings found.</p>
         <button className="mt-4 text-black font-bold text-sm">Explore services</button>
      </div>
    </div>
  );
}
