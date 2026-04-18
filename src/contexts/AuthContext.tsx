import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export type AppRole = 'user' | 'provider' | 'admin' | null;

interface AuthContextType {
  user: User | null;
  role: AppRole;
  dbUser: any;
  loading: boolean;
  refreshDbUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  dbUser: null,
  loading: true,
  refreshDbUser: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<any>(null);
  const [role, setRole] = useState<AppRole>(null);
  const [loading, setLoading] = useState(true);

  const fetchDbUser = async (uid: string) => {
    try {
      // Check user collection first
      let docRef = doc(db, 'users', uid);
      let docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDbUser(data);
        setRole(data.role || 'user');
        return;
      }
      
      // Check providers collection
      docRef = doc(db, 'providers', uid);
      docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDbUser(data);
        setRole('provider');
        return;
      }
      
      // No document found; means new user
      setDbUser(null);
      setRole(null);
    } catch (e) {
      console.error('Error fetching db user', e);
    }
  };

  const refreshDbUser = async () => {
    if (user?.uid) {
      await fetchDbUser(user.uid);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchDbUser(currentUser.uid);
      } else {
        setDbUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, dbUser, loading, refreshDbUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
