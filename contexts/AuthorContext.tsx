import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext<string>('');

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    const getSessionId = () => {
      if (typeof window !== 'undefined') {
        let sessionId = localStorage.getItem('sessionId');

        if (!sessionId) {
          sessionId = generateUniqueId();
          localStorage.setItem('sessionId', sessionId);
        }

        return sessionId;
      }

      return '';
    };

    const generateUniqueId = () => {
      return Date.now().toString(36) + Math.random().toString(36);
    };

    const id = getSessionId();
    setSessionId(id);
  }, []);

  return (
    <AuthContext.Provider value={sessionId}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };