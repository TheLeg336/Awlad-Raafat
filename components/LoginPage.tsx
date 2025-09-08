import React, { useEffect, useRef } from 'react';
import { useAuth } from '../AuthContext';
import { WHITELISTED_EDITORS } from '../constants';
import { User } from '../types';

declare global {
  interface Window {
    google: any;
  }
}

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const loginButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleCredentialResponse = (response: any) => {
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const userData = JSON.parse(jsonPayload);
      
      if (WHITELISTED_EDITORS.includes(userData.email)) {
        const user: User = {
          name: userData.name,
          email: userData.email,
          picture: userData.picture,
        };
        login(user);
      } else {
        alert('Access Denied. Your account is not authorized to edit this website.');
      }
    };

    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: process.env.GOOGLE_CLIENT_ID, // This must be configured in the environment
        callback: handleCredentialResponse,
      });
      if (loginButtonRef.current) {
        window.google.accounts.id.renderButton(
          loginButtonRef.current,
          { theme: 'outline', size: 'large', type: 'standard', text: 'signin_with' }
        );
      }
      window.google.accounts.id.prompt();
    } else {
        console.warn("Google Identity Services script not loaded yet.")
    }
  }, [login]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-background)] font-body-luxe">
        <style>{`
            :root {
                --color-background: #1A202C;
                --color-text-primary: #E5E5E5;
                --color-text-secondary: #A9A9A9;
            }
        `}</style>
      <div className="p-10 bg-[var(--color-secondary)] rounded-lg shadow-xl text-center max-w-sm w-full">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2 font-heading-luxe">Admin Login</h1>
        <p className="text-[var(--color-text-secondary)] mb-8">Sign in with Google to edit the website.</p>
        <div ref={loginButtonRef} className="flex justify-center"></div>
         {!process.env.GOOGLE_CLIENT_ID && (
            <p className="text-red-400 mt-4 text-xs">
                Google Client ID is not configured. Login is disabled.
            </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
