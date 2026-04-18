import { useAuth } from '../../contexts/AuthContext';
import { signOut } from '../../firebase';
import { LogOut } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function ProviderProfile() {
  const { user, dbUser } = useAuth();
  
  return (
    <div className="flex flex-col min-h-full bg-neutral-50 pt-12 px-6">
      <h1 className="text-2xl font-bold mb-6">Partner Profile</h1>
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 mb-6">
         <div className="font-bold text-lg">{user?.displayName || 'Partner'}</div>
         <div className="text-sm text-neutral-500 mb-4">{user?.email}</div>
         <div className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded inline-block uppercase tracking-wider">
           Status: {dbUser?.status || 'Unknown'}
         </div>
         
         {!dbUser?.kycVerified && (
           <div className="mt-6 bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 text-sm font-medium">
              Your KYC is pending. You cannot accept jobs until verified.
              <button className="mt-2 text-black underline block">Complete KYC now</button>
           </div>
         )}
      </div>

      <button 
        onClick={signOut}
        className="w-full mt-auto mb-8 flex items-center justify-center space-x-2 p-4 text-red-500 font-bold bg-white border border-red-100 rounded-2xl hover:bg-red-50 transition-colors"
      >
        <LogOut size={20} />
        <span>Log Out</span>
      </button>
    </div>
  );
}
