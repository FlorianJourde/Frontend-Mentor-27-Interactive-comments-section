import { createContext, useState } from 'react';

const AuthContext = createContext<string>('');

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  function getSessionId() {
    let sessionId = localStorage.getItem('sessionId');

    if (!sessionId) {
      sessionId = generateUniqueId();
      localStorage.setItem('sessionId', sessionId);
    }

    return sessionId;
  }

  function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36);
  }

  const sessionId = getSessionId();

  return (
    <AuthContext.Provider value={sessionId}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };