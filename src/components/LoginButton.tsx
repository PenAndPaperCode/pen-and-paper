import React, { useState, useRef, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  picture: string;
}

interface LoginButtonProps {
  onLogin?: (user: User) => void;
  onLogout?: () => void;
}

declare global {
  interface Window {
    google: any;
  }
}

const LoginButton: React.FC<LoginButtonProps> = ({ onLogin, onLogout }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const googleButtonRef = useRef<HTMLDivElement>(null);

  const handleCredentialResponse = (response: any) => {
    try {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));

      const userData: User = {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      onLogin?.(userData);
    } catch (error) {
      console.error('Error parsing Google response:', error);
    }
  };

  const initializeGoogle = () => {
    try {
      if (!window.google || !googleButtonRef.current || user) return;

      // Clear any existing button content
      googleButtonRef.current.innerHTML = '';
      
      window.google.accounts.id.initialize({
        client_id: '339241384511-4srj07ljhqvv75ah1roi185hiqnhomo4.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      });

      // Use consistent medium size for better mobile experience
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: 'filled_black',
        size: 'medium',
        type: 'standard',
        shape: 'rectangular',
        text: 'signin_with',
      });

      console.log('Google Identity Services initialized successfully');
    } catch (err) {
      console.error('Error initializing Google Identity Services:', err);
      setError('Failed to initialize Google login');
    }
  };

  // Load saved user on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Load Google script only once
  useEffect(() => {
    if (isGoogleLoaded || user) return;

    const loadGoogleScript = () => {
      if (window.google) {
        setIsGoogleLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setIsGoogleLoaded(true);
      };
      script.onerror = () => {
        console.error('Failed to load Google Identity Services script');
        setError('Failed to load Google services');
      };
      document.head.appendChild(script);
    };

    loadGoogleScript();
  }, [isGoogleLoaded, user]);

  // Initialize Google button only when Google is loaded and user is not logged in
  useEffect(() => {
    if (isGoogleLoaded && !user) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        initializeGoogle();
      }, 100);
      
      return () => {
        clearTimeout(timer);
        // Clear the button container to prevent duplicates
        if (googleButtonRef.current) {
          googleButtonRef.current.innerHTML = '';
        }
      };
    }
  }, [isGoogleLoaded, user]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    onLogout?.();
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <div className="relative">
      {user ? (
        <>
          <div
            onClick={toggleUserMenu}
            className="flex items-center space-x-1 bg-gray-800 hover:bg-gray-700 rounded-md sm:rounded-lg px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-3 md:py-2 transition-colors cursor-pointer"
          >
            <img
              src={user.picture}
              alt={user.name}
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full flex-shrink-0"
            />
            <span className="text-white font-medium max-w-12 xs:max-w-16 sm:max-w-20 md:max-w-32 truncate text-xs sm:text-sm hidden xs:inline">
              {user.name}
            </span>
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white flex-shrink-0 hidden xs:inline" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {showUserMenu && (
            <div
              ref={menuRef}
              className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 min-w-48 sm:min-w-64 z-50"
            >
              <div className="p-3 sm:p-4">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-900 text-sm sm:text-base truncate">{user.name}</div>
                    <div className="text-xs sm:text-sm text-gray-500 truncate">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm sm:text-base"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex-shrink-0 scale-75 xs:scale-90 sm:scale-100 origin-center">
          <div ref={googleButtonRef} className="inline-block google-btn-container"></div>
        </div>
      )}
      {error && (
        <div className="text-red-600 mt-2 text-xs sm:text-sm">{error}</div>
      )}

      {/* ✅ Plain React style tag for bold text */}
      <style>
        {`
          .google-btn-container span {
            font-weight: 600 !important;
          }
        `}
      </style>
    </div>
  );
};

export default LoginButton;
