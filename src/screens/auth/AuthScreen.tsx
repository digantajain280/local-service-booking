import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LogIn, AlertCircle, ExternalLink } from 'lucide-react';
import { signInWithGoogle } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';

export default function AuthScreen() {
  const { user, loading } = useAuth();
  const [errorMsg, setErrorMsg] = useState('');

  if (loading) return null;
  if (user) return <Navigate to="/" />;

  const handleLogin = async () => {
    try {
      setErrorMsg('');
      await signInWithGoogle();
    } catch (error: any) {
      console.error('Login failed:', error);
      if (error?.code === 'auth/popup-blocked') {
        setErrorMsg('Your browser blocked the login popup. Please allow popups for this site, or tap the button below to open the app in a new tab where popups are allowed.');
      } else if (error?.code === 'auth/cancelled-popup-request' || error?.code === 'auth/popup-closed-by-user') {
        setErrorMsg('Login was cancelled. Please try again.');
      } else {
        setErrorMsg(error?.message || 'Failed to login. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 bg-neutral-50">
      <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mb-6">
          <LogIn size={32} />
        </div>
        <h1 className="text-2xl font-bold mb-2">Welcome to UrbanServe</h1>
        <p className="text-neutral-500 mb-8 font-medium">Your trusted local services app</p>
        
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm font-medium rounded-2xl border border-red-100 flex items-start text-left gap-3 w-full">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <div>
              <p>{errorMsg}</p>
              {errorMsg.includes('popup') && (
                <a 
                  href={window.location.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-black font-bold underline"
                >
                  <ExternalLink size={14} /> Open in new tab
                </a>
              )}
            </div>
          </div>
        )}

        <Button size="lg" fullWidth onClick={handleLogin}>
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
