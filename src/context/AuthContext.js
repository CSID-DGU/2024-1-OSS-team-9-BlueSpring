import { useContext, createContext, useState, useEffect } from 'react';
import { auth, signInWithEmailAndPassword } from '/Users/cmj/Desktop/Workspace/OSS/sentinews_v0.2/src/firebase-config.js';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);