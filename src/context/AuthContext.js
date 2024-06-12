import { useContext, createContext, useState, useEffect } from 'react';
import { auth, signInWithEmailAndPassword } from '/Users/cmj/Desktop/Workspace/OSS/sentinews_v0.2/src/firebase-config.js';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext(null);  // Initial state is set to null

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);  // Initialize currentUser to null

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);  // Correctly set to setCurrentUser
    });

    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);