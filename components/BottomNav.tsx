
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, FileText, User } from 'lucide-react';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', icon: Home, label: '首页' },
    { path: '/my-registrations', icon: FileText, label: '我的报名' },
    { path: '/mine', icon: User, label: '我的' },
  ];

  // Whitelist approach: Only show on these exact paths
  // Any secondary page (like /mine/scores, /competition/1, etc.) will hide the nav
  const showNavPaths = ['/', '/my-registrations', '/mine'];
  
  if (!showNavPaths.includes(location.pathname)) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#fcfaf8]/95 backdrop-blur-md border-t border-[#e7e5e4] h-[70px] flex justify-around items-center z-50 shadow-[0_-4px_20px_rgba(28,25,23,0.04)]">
      {navItems.map((item) => {
        const active = isActive(item.path);
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center w-20 group relative ${
              active ? 'text-[#7f1d1d]' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <div className={`transition-transform duration-300 ease-out ${
                active ? 'scale-110 -translate-y-0.5 animate-pop' : 'scale-100'
            }`}>
               <item.icon 
                  size={24} 
                  strokeWidth={active ? 2.5 : 2} 
                  className={`mb-0.5 transition-all duration-300 drop-shadow-sm ${
                      active ? 'fill-[#7f1d1d]/10' : 'fill-transparent'
                  }`}
               />
            </div>
            
            <span className={`text-[10px] tracking-widest transition-all duration-300 ${
                active 
                ? 'font-serif font-black text-[#7f1d1d] opacity-100' 
                : 'font-sans font-medium text-stone-400 opacity-90'
            }`}>
                {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
