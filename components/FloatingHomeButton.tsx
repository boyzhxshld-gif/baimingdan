import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';

const FloatingHomeButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on Home page (redundant) and Auth pages
  if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  // Logic to determine if BottomNav is visible (must match BottomNav.tsx logic)
  const hideNavPrefixes = [
    '/competition/', 
    '/register', 
    '/login',
    '/upload/', 
    '/ai-editor', 
    '/tv/', 
    '/workflow-guide',
    '/certificate/',
    '/registration/'
  ];
  const isMineSubPage = location.pathname.startsWith('/mine/') && location.pathname !== '/mine';
  const isBottomNavHidden = hideNavPrefixes.some(prefix => location.pathname.startsWith(prefix)) || isMineSubPage;

  // If BottomNav is visible, we need to position this button higher so it doesn't overlap
  const positionClass = isBottomNavHidden ? 'bottom-6' : 'bottom-20';

  return (
    <button
      onClick={() => navigate('/')}
      className={`fixed ${positionClass} right-4 z-40 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-slate-100 text-slate-600 hover:text-primary hover:scale-110 active:scale-95 transition-all duration-300 group`}
      aria-label="返回首页"
    >
      <Home size={24} className="group-hover:fill-blue-50" />
    </button>
  );
};

export default FloatingHomeButton;