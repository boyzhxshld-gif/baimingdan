
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Trophy, Users, FileText, PenTool, Settings, LogOut, Bell, Search, BookOpen, MonitorPlay, Gavel, GitGraph, TrendingUp, Shield, FolderOpen, UserCheck, PieChart, Building2, Megaphone } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  // 1. Core Overview
  const coreItems = [
    { path: '/dashboard', label: '工作台', icon: LayoutDashboard },
    { path: '/platform', label: '平台配置', icon: Settings },
  ];

  // 2. Competition Operations
  const competitionItems = [
    { path: '/competitions', label: '赛事管理', icon: Trophy },
    { path: '/registrations', label: '报名管理', icon: Users },
    { path: '/works', label: '作品管理', icon: FolderOpen },
    { path: '/announcements', label: '公告管理', icon: Megaphone },
  ];

  // 3. Content & Courses
  const contentItems = [
    { path: '/courses', label: '名师公开课', icon: MonitorPlay },
  ];

  // 4. Judging Center
  const judgingItems = [
    { path: '/review-overview', label: '评审概览', icon: PieChart },
    { path: '/judging', label: '评审分配', icon: Gavel },
    { path: '/review', label: '评审工作台', icon: PenTool },
    { path: '/promotion', label: '晋级管理', icon: TrendingUp },
  ];

  // 5. System Management
  const systemItems = [
    { path: '/schools', label: '学校/机构', icon: Building2 },
    { path: '/users', label: '用户管理', icon: FileText },
    { path: '/audit', label: '用户审核', icon: UserCheck },
    { path: '/roster', label: '名单库', icon: GitGraph },
    { path: '/permissions', label: '角色权限', icon: Shield },
  ];

  return (
    <div className="flex h-screen bg-[#f5f5f4] font-sans text-stone-800">
      {/* Sidebar - Dark Theme */}
      <aside className="w-64 bg-[#1c1917] text-white flex flex-col shadow-2xl z-20 border-r border-white/5">
        <div className="h-20 flex items-center px-6 border-b border-white/10 bg-[#0c0a09]">
           <div className="w-9 h-9 bg-[#7f1d1d] rounded-lg flex items-center justify-center mr-3 text-white shadow-lg border border-white/10">
              <Trophy size={18} />
           </div>
           <div>
             <h1 className="font-serif font-black tracking-wide text-base leading-none text-white">讲好中国故事</h1>
             <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1.5 font-bold">数字化平台</p>
           </div>
        </div>

        <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
           {/* Section 1: Core */}
           <div className="px-4 mb-3 text-[10px] font-bold text-stone-600 uppercase tracking-widest">核心概览</div>
           {coreItems.map((item) => (
               <MenuItem key={item.path} item={item} />
           ))}

           {/* Section 2: Competition */}
           <div className="px-4 mb-3 mt-6 text-[10px] font-bold text-stone-600 uppercase tracking-widest">赛事运营</div>
           {competitionItems.map((item) => (
               <MenuItem key={item.path} item={item} />
           ))}

           {/* Section 3: Content */}
           <div className="px-4 mb-3 mt-6 text-[10px] font-bold text-stone-600 uppercase tracking-widest">内容与课程</div>
           {contentItems.map((item) => (
               <MenuItem key={item.path} item={item} />
           ))}

           {/* Section 4: Judging Center */}
           <div className="px-4 mb-3 mt-6 text-[10px] font-bold text-stone-600 uppercase tracking-widest">评审中心</div>
           {judgingItems.map((item) => (
               <MenuItem key={item.path} item={item} />
           ))}

           {/* Section 5: System */}
           <div className="px-4 mb-3 mt-6 text-[10px] font-bold text-stone-600 uppercase tracking-widest">系统管理</div>
           {systemItems.map((item) => (
               <MenuItem key={item.path} item={item} />
           ))}
        </div>

        <div className="p-4 border-t border-white/10 bg-[#0c0a09]">
           <button 
             onClick={handleLogout}
             className="flex items-center text-stone-500 hover:text-white transition-colors text-xs font-bold w-full justify-center hover:bg-white/10 py-2 rounded-lg"
           >
             <LogOut size={16} className="mr-2" /> 退出登录
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#f5f5f4]">
        {/* Header */}
        <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-8 shadow-sm z-10">
           {/* Search */}
           <div className="flex items-center space-x-4">
                <div className="relative group">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 group-focus-within:text-[#7f1d1d]" />
                    <input 
                    type="text" 
                    placeholder="全局搜索赛事、考生、工单..." 
                    className="bg-stone-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm font-bold text-stone-700 w-80 outline-none focus:ring-2 focus:ring-[#7f1d1d]/10 transition-all placeholder:text-stone-400 placeholder:font-normal"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 border border-stone-200 rounded px-1.5 py-0.5 text-[10px] font-bold text-stone-400 bg-white">⌘K</div>
                </div>
           </div>

           <div className="flex items-center space-x-6">
              <button className="text-stone-500 hover:text-[#7f1d1d] transition-colors flex items-center text-xs font-bold">
                 <BookOpen size={18} className="mr-1.5" /> 文档
              </button>
              <button className="relative text-stone-500 hover:text-[#7f1d1d] transition-colors">
                 <Bell size={20} />
                 <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              <div className="flex items-center space-x-3 pl-6 border-l border-stone-200 cursor-pointer group">
                 <div className="w-9 h-9 bg-[#7f1d1d] rounded-full flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white text-sm">
                    A
                 </div>
              </div>
           </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
           <Outlet />
        </main>
      </div>
    </div>
  );
};

const MenuItem: React.FC<{ item: any }> = ({ item }) => {
    const navigate = useNavigate();
    const location = useLocation();
    // Strict matching: Exact match OR starts with path/ (to handle nested routes but avoid prefix collision)
    const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
    
    return (
        <button
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group mb-1 ${
            isActive 
            ? 'bg-[#7f1d1d] text-white shadow-md font-bold' 
            : 'text-stone-400 hover:bg-white/10 hover:text-white'
            }`}
        >
            <item.icon size={18} className={`mr-3 ${isActive ? 'text-white' : 'text-stone-500 group-hover:text-white transition-colors'}`} />
            <span className="text-sm">{item.label}</span>
        </button>
    );
};

export default AdminLayout;
