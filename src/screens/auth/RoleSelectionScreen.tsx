import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { UserIcon, Briefcase } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { Button } from '../../components/ui/Button';
import { cn } from '../../lib/utils';

export default function RoleSelectionScreen() {
  const { user, role, refreshDbUser } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'user' | 'provider' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already setup, redirect
  if (role) return <Navigate to="/" />;
  if (!user) return <Navigate to="/auth" />;

  const handleCompleteSetup = async () => {
    if (!selectedRole || !user) return;
    setIsSubmitting(true);

    try {
      const collectionName = selectedRole === 'user' ? 'users' : 'providers';
      const docRef = doc(db, collectionName, user.uid);
      
      const baseData = {
        uid: user.uid,
        name: user.displayName || 'Anonymous User',
        email: user.email || '',
        phone: user.phoneNumber || '',
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      if (selectedRole === 'user') {
        await setDoc(docRef, { ...baseData, role: 'user' });
      } else {
        await setDoc(docRef, { ...baseData, status: 'pending', kycVerified: false, rating: 0, reviewsCount: 0, services: [] });
      }

      await refreshDbUser();
      navigate('/');
    } catch (error: any) {
      console.error('Error saving role:', error);
      alert('Failed to save role: ' + (error.message || 'Missing or insufficient permissions.'));
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col p-6 items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 pb-8">
        <h1 className="text-2xl font-bold mb-2 pt-2">How do you want to use UrbanServe?</h1>
        <p className="text-neutral-500 mb-8">Choose your account type to proceed</p>

        <div className="space-y-4 mb-8">
          <button
            onClick={() => setSelectedRole('user')}
            className={cn(
              "w-full text-left p-6 rounded-2xl border-2 transition-all flex items-start space-x-4",
              selectedRole === 'user' ? "border-black bg-neutral-50 ring-4 ring-neutral-100" : "border-neutral-100 hover:border-neutral-200 bg-white"
            )}
          >
            <div className="bg-black text-white p-3 rounded-xl mt-1">
              <UserIcon size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Customer</h3>
              <p className="text-neutral-500 text-sm">Find and book local services from verified professionals</p>
            </div>
          </button>

          <button
            onClick={() => setSelectedRole('provider')}
            className={cn(
              "w-full text-left p-6 rounded-2xl border-2 transition-all flex items-start space-x-4",
              selectedRole === 'provider' ? "border-black bg-neutral-50 ring-4 ring-neutral-100" : "border-neutral-100 hover:border-neutral-200 bg-white"
            )}
          >
            <div className="bg-black text-white p-3 rounded-xl mt-1">
              <Briefcase size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Service Provider</h3>
              <p className="text-neutral-500 text-sm">Accept bookings, manage jobs, and grow your local business</p>
            </div>
          </button>
        </div>

        <Button 
          fullWidth 
          size="lg" 
          disabled={!selectedRole || isSubmitting}
          onClick={handleCompleteSetup}
        >
          {isSubmitting ? 'Setting up...' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
