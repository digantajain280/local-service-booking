import { useAuth } from '../../contexts/AuthContext';
import { signOut } from '../../firebase';
import { LogOut, ChevronRight, Settings, MapPin, CreditCard } from 'lucide-react';

export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-full bg-neutral-50 pt-12">
      <div className="px-6 mb-6">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 flex items-center space-x-4 mb-8">
           <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
             {user?.email?.charAt(0).toUpperCase()}
           </div>
           <div>
             <h2 className="font-bold text-lg">{user?.displayName || 'User'}</h2>
             <p className="text-sm text-neutral-500">{user?.email}</p>
           </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden text-neutral-800">
          {[
            { icon: MapPin, label: 'Manage Addresses' },
            { icon: CreditCard, label: 'Payment Methods' },
            { icon: Settings, label: 'App Settings' }
          ].map((item, i, w) => (
             <button key={item.label} className="w-full flex items-center justify-between p-5 border-b border-neutral-100 last:border-0 hover:bg-neutral-50">
               <div className="flex items-center space-x-3">
                 <item.icon size={20} className="text-neutral-400" />
                 <span className="font-medium">{item.label}</span>
               </div>
               <ChevronRight size={20} className="text-neutral-300" />
             </button>
          ))}
        </div>

        <button 
          onClick={signOut}
          className="w-full mt-8 flex items-center justify-center space-x-2 p-4 text-red-500 font-bold bg-red-50 rounded-2xl hover:bg-red-100 transition-colors"
        >
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
