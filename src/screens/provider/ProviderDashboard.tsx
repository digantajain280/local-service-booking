import { Wallet, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function ProviderDashboard() {
  const { dbUser } = useAuth();
  
  return (
    <div className="flex flex-col min-h-full pb-8">
      {/* Header */}
      <div className="bg-black text-white px-6 pt-12 pb-6 rounded-b-[2rem]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded border border-green-400 uppercase tracking-wider">
            {dbUser?.status === 'active' ? 'Online' : 'Offline'}
          </div>
        </div>

        <div className="bg-white/10 rounded-3xl p-5 border border-white/20">
          <div className="text-white/60 mb-1 text-sm font-medium">Today's Earnings</div>
          <div className="text-4xl font-bold mb-4">₹2,450</div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
             <div>
               <div className="text-white/60 text-xs mb-1">Jobs Done</div>
               <div className="text-lg font-bold">3</div>
             </div>
             <div>
               <div className="text-white/60 text-xs mb-1">Time Online</div>
               <div className="text-lg font-bold">4h 20m</div>
             </div>
          </div>
        </div>
      </div>

      <div className="px-6 pt-8">
        <h2 className="text-xl font-bold mb-4">New Request</h2>
        <div className="bg-white rounded-3xl p-5 border-2 border-orange-500 shadow-md">
           <div className="flex justify-between items-start mb-4">
              <div>
                 <h3 className="font-bold text-lg">AC Gas Filling</h3>
                 <p className="text-neutral-500 text-sm">₹1,200 • Est. 1h 30m</p>
              </div>
              <div className="bg-orange-100 text-orange-600 p-2 rounded-xl">
                 <Clock size={20} />
              </div>
           </div>
           
           <div className="text-sm font-medium text-neutral-600 mb-6 bg-neutral-50 p-3 rounded-xl border border-neutral-100 flex gap-2">
              <span className="shrink-0 pt-0.5">📍</span>
              <span>12, Sunrise Apartments, Layout 3<br/>2.4 km away</span>
           </div>
           
           <div className="flex gap-3">
              <button className="flex-1 bg-neutral-100 text-neutral-700 font-bold py-3 rounded-xl text-sm">Decline</button>
              <button className="flex-1 bg-black text-white font-bold py-3 rounded-xl text-sm">Accept Job</button>
           </div>
        </div>
      </div>
    </div>
  );
}
