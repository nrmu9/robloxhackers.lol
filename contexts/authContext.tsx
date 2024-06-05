import { createContext, useContext, useEffect, useState, ReactNode, FC } from 'react';
import { GithubAuthProvider, User, signInWithPopup, signOut } from 'firebase/auth';
import { auth, db } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  role: string | null;
  editableCards: string[] | null;
  signInWithGitHub: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [editableCards, setEditableCards] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchUserRole = async (userUid: string) => {
      try {
        const roleDoc = await getDoc(doc(db, 'roles', userUid));
        if (roleDoc.exists()) {
          const roleData = roleDoc.data();
          setRole(roleData.role);
          if (roleData.role === 'editor') {
            setEditableCards(roleData.editableCards || []);
          } else {
            setEditableCards(null);
          }
        } else {
          setRole(null);
          setEditableCards(null);
        }
      } catch (error) {
        console.error('Error fetching role:', error);
        setRole(null);
        setEditableCards(null);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        await fetchUserRole(user.uid);
      } else {
        setRole(null);
        setEditableCards(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGitHub = async () => {
    const provider = new GithubAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
    setRole(null);
    setEditableCards(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, editableCards, signInWithGitHub, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };
