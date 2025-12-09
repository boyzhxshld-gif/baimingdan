
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightElement?: React.ReactNode;
  transparent?: boolean;
  backTarget?: string; 
}

const Header: React.FC<HeaderProps> = ({ title, showBack = true, rightElement, transparent = false, backTarget }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (backTarget) {
      navigate(backTarget, { replace: true });
    } else if (location.key !== "default" && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className={`sticky top-0 z-40 transition-all duration-200 ${transparent ? 'bg-transparent' : 'bg-[#fcfaf8]/90 backdrop-blur-md border-b border-stone-200 shadow-sm'}`}>
      <div className="px-4 h-14 flex items-center justify-between">
        <div className="flex items-center flex-1 overflow-hidden">
          {showBack && (
            <button 
              onClick={handleBack} 
              className="mr-2 p-1.5 rounded-full hover:bg-stone-100 active:bg-stone-200 transition-colors flex-shrink-0 z-50 text-stone-600"
              aria-label="返回"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          <h1 className="text-lg font-bold text-stone-800 truncate pr-4 tracking-tight font-serif">{title}</h1>
        </div>
        <div className="flex-none">{rightElement}</div>
      </div>
    </div>
  );
};

export default Header;