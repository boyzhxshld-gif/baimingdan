
import React, { useState, useEffect } from 'react';
import { Settings, FileText, Bell, MapPin, Star, Users, Trophy, ChevronRight, ShieldCheck, Download, LogOut, School, BookOpen, GitGraph, UserCircle, PlayCircle, User, Contact, ChevronDown, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const Mine: React.FC = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<'TEACHER' | 'PARENT' | 'STUDENT'>('TEACHER');
  
  // Parent Mode: Child Switching State
  const [showChildSelector, setShowChildSelector] = useState(false);
  const [currentChild, setCurrentChild] = useState({ name: '王小明', id: '1', school: '北京市海淀区第一实验小学' });
  
  const mockChildren = [
      { id: '1', name: '王小明', school: '北京市海淀区第一实验小学', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&auto=format&fit=crop&q=80' },
      { id: '2', name: '王小红', school: '北京市海淀区第一实验小学', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80' }
  ];

  useEffect(() => {
      const storedRole = localStorage.getItem('userRole');
      if (storedRole === 'TEACHER' || storedRole === 'STUDENT' || storedRole === 'PARENT') {
          setUserRole(storedRole as any);
      }
  }, []);

  const handleLogout = () => {
      localStorage.removeItem('userRole');
      navigate('/login');
  };

  const isTeacher = userRole === 'TEACHER';
  const isParent = userRole === 'PARENT';
  const isStudent = userRole === 'STUDENT';

  const getMenuItems = () => {
      const common = [
          { icon: Trophy, label: '成绩查询', path: '/mine/scores' },
          { icon: Star, label: '收藏夹', path: '/mine/favorites' },
          { icon: MapPin, label: '地址管理', path: '/mine/address' },
          { icon: Download, label: '证书下载', path: '/mine/certificates' },
      ];

      if (isTeacher) {
          return [
              { icon: FileText, label: '报名记录', path: '/my-registrations', hasBadge: true },
              { icon: Users, label: '学生管理', path: '/mine/archives' }, // Management
              ...common
          ];
      } else if (isParent) {
          return [
              { icon: PlayCircle, label: '孩子作品', path: '/mine/works' },
              { icon: Users, label: '孩子管理', path: '/mine/archives' }, // Management
              ...common
          ];
      } else { // Student
          return [
              { icon: PlayCircle, label: '我的作品', path: '/mine/works' },
              { icon: Contact, label: '报名资料', path: '/mine/profile' },
              ...common
          ];
      }
  };

  const menuItems = getMenuItems();

  const getRoleDisplay = () => {
      if (isTeacher) return { name: '李华老师', type: '教师账号', icon: <School size={10} className="mr-1" />, id: 'T882103', desc: '北京市海淀区第一实验小学' };
      if (isParent) return { 
          name: currentChild.name, // Show current child name for context
          type: '家长账号', 
          icon: <Users size={10} className="mr-1" />, 
          id: 'P992012', 
          desc: currentChild.school,
          isSwitchable: true
      };
      return { name: '王小明', type: '学生账号', icon: <User size={10} className="mr-1" />, id: 'S2025001', desc: '北京市海淀区第一实验小学' };
  };

  const roleInfo = getRoleDisplay();

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f4]">
       <div className="bg-primary px-6 pt-10 pb-12 rounded-b-[2.5rem] shadow-glow relative z-10 animate-slide-up overflow-hidden">
          {/* Background Texture */}
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L19.515 8.485 18.1 7.07 25.172 0h2.828zM32 0l-6.485 6.485 1.415 1.415L34.828 0H32zm5.657 0l-6.485 6.485 1.415 1.415L39.072 0h-1.415zM0 0l21.213 21.213-1.414 1.414L0 2.828V0zm60 0L38.787 21.213l1.414 1.414L60 2.828V0zM0 60l21.213-21.213-1.414-1.414L0 57.172V60zm60 0L38.787 38.787l1.414-1.414L60 57.172V60z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
          }}></div>

          <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                 <h1 className="text-2xl font-black text-white tracking-tight font-serif">个人中心</h1>
                 <div className="flex space-x-4">
                    <button className="text-white/70 hover:text-white relative active:scale-95 transition-transform" onClick={() => navigate('/mine/messages')}>
                        <Bell size={24} />
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-primary"></span>
                    </button>
                    <button className="text-white/70 hover:text-white active:scale-95 transition-transform" onClick={() => navigate('/mine/settings')}>
                        <Settings size={24} />
                    </button>
                 </div>
              </div>
              
              {/* Header Click -> Account Info */}
              <div className="flex items-start mb-2 cursor-pointer group">
                 <div className="w-20 h-20 rounded-full p-1 bg-white/10 backdrop-blur-sm shadow-lg relative flex-shrink-0 mr-5 group-hover:scale-110 transition-transform border border-white/20" onClick={() => navigate('/mine/account')}>
                    <div className={`w-full h-full rounded-full flex items-center justify-center text-primary text-3xl font-bold overflow-hidden bg-[#fdfbf7] border-2 border-white`}>
                       {roleInfo.name[0]}
                    </div>
                    {isTeacher && (
                        <div className="absolute bottom-0 right-0 bg-amber-500 w-6 h-6 rounded-full border-4 border-primary flex items-center justify-center shadow-sm">
                            <ShieldCheck size={12} className="text-white" />
                        </div>
                    )}
                 </div>
                 
                 <div className="flex-1 min-w-0 pt-1">
                   <div className="flex flex-col space-y-1">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center" onClick={isParent ? () => setShowChildSelector(true) : undefined}>
                              <h2 className="text-2xl font-bold text-white truncate mr-2 font-serif tracking-wide">{roleInfo.name}</h2>
                              {isParent && (
                                  <div className="bg-white/20 rounded-full p-0.5">
                                      <ChevronDown size={16} className="text-white" />
                                  </div>
                              )}
                          </div>
                          <ChevronRight className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} onClick={() => navigate('/mine/account')} />
                       </div>
                       
                       <div className="flex flex-wrap items-center gap-2" onClick={() => navigate('/mine/account')}>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center whitespace-nowrap bg-white/10 text-white/90 border-white/20 backdrop-blur-md`}>
                            {roleInfo.icon}
                            {roleInfo.type}
                          </span>
                       </div>

                       <p className="text-xs text-white/60 truncate pt-1 font-medium" onClick={() => navigate('/mine/account')}>
                           ID: {roleInfo.id} · {roleInfo.desc}
                       </p>
                   </div>
                 </div>
              </div>
          </div>
       </div>

       <div className="px-5 -mt-6 relative z-20 pb-24">
           {/* Workflow Guide */}
           <div 
            onClick={() => navigate('/workflow-guide')}
            className="bg-white rounded-2xl p-4 shadow-card mb-6 flex items-center justify-between cursor-pointer border border-stone-100 group hover:border-primary/20 transition-all"
           >
              <div className="flex items-center">
                 <div className="w-10 h-10 bg-stone-800 rounded-xl flex items-center justify-center mr-3 text-white shadow-md">
                    <GitGraph size={20} />
                 </div>
                 <div>
                    <h3 className="font-bold text-stone-800 text-sm font-serif">新手流程指引</h3>
                    <p className="text-xs text-stone-400 mt-0.5">
                        {isStudent ? '如何完善资料并报名' : isParent ? '如何认领孩子并报名' : '如何管理学生与团队'}
                    </p>
                 </div>
              </div>
              <ChevronRight size={18} className="text-stone-300 group-hover:translate-x-1 transition-transform" />
           </div>

           <div className="bg-white rounded-[2rem] p-6 shadow-card mb-6 border border-stone-50">
             <h3 className="text-sm font-bold text-stone-800 mb-5 flex items-center font-serif">
                <span className="w-1.5 h-4 bg-primary rounded-full mr-2 shadow-sm"></span>
                常用功能
             </h3>
             <div className="grid grid-cols-3 gap-y-8 gap-x-4">
                {menuItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => navigate(item.path)}
                    className="flex flex-col items-center justify-center cursor-pointer group relative"
                  >
                     {/* Textured Icon Button */}
                     <div className={`w-14 h-14 bg-[#fcfaf8] rounded-[1.2rem] flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md group-hover:-translate-y-1 relative border border-stone-200 group-hover:border-amber-200 shadow-sm`}>
                        <item.icon size={24} className="text-stone-700 group-hover:text-primary transition-colors" />
                        {item.hasBadge && (
                            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary border-2 border-white rounded-full shadow-sm animate-pulse"></span>
                        )}
                     </div>
                     <span className="text-xs font-bold text-stone-600 group-hover:text-primary transition-colors">{item.label}</span>
                  </div>
                ))}
             </div>
           </div>

           <div className="bg-white rounded-2xl shadow-card overflow-hidden divide-y divide-stone-50 border border-stone-50">
              {/* Auth / Verification Section */}
              <div 
                className={`p-4 flex items-center justify-between transition-colors hover:bg-stone-50 cursor-pointer`} 
                onClick={() => navigate('/mine/auth')}
              >
                 <div className="flex items-center">
                    <div className="bg-stone-50 p-2 rounded-lg mr-3 text-stone-600 border border-stone-100">
                        <ShieldCheck size={18} />
                    </div>
                    <span className="text-sm font-bold text-stone-700">
                        {isTeacher ? '教师认证信息' : isParent ? '家长身份认证' : '实名认证'}
                    </span>
                 </div>
                 <div className="flex items-center">
                    <span className={`text-xs mr-2 font-bold px-2 py-0.5 rounded ${isTeacher ? 'bg-green-50 text-green-600' : 'bg-stone-100 text-stone-400'}`}>
                        {isTeacher ? '已认证' : '去认证'}
                    </span>
                    <ChevronRight size={16} className="text-stone-300" />
                 </div>
              </div>
              
              <div className="p-4 flex items-center justify-between hover:bg-stone-50 cursor-pointer transition-colors" onClick={handleLogout}>
                 <div className="flex items-center">
                    <div className="bg-stone-50 p-2 rounded-lg mr-3 text-stone-600 border border-stone-100">
                        <LogOut size={18} className="text-stone-500" />
                    </div>
                    <span className="text-sm font-bold text-stone-700">退出登录</span>
                 </div>
                 <ChevronRight size={16} className="text-stone-300" />
              </div>
           </div>
           
           <div className="mt-8 text-center">
               <div className="inline-flex items-center justify-center w-8 h-8 bg-stone-200 rounded-full mb-2 text-stone-400 opacity-50">
                   <BookOpen size={14} />
               </div>
               <p className="text-[10px] text-stone-300 font-serif font-bold tracking-widest">讲好中国故事 · 官方平台</p>
           </div>
       </div>

       {/* Child Switcher Modal */}
       {showChildSelector && (
           <div className="fixed inset-0 z-50 flex items-end justify-center">
               <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowChildSelector(false)}></div>
               <div className="bg-white w-full max-w-md rounded-t-3xl p-6 relative z-10 animate-slide-up">
                   <div className="flex justify-between items-center mb-6">
                       <h3 className="text-lg font-bold text-stone-800 font-serif">切换当前孩子</h3>
                       <button onClick={() => setShowChildSelector(false)} className="p-2 bg-stone-50 rounded-full text-stone-400 hover:bg-stone-100">
                           <ChevronDown size={20} className="transform rotate-180" />
                       </button>
                   </div>
                   
                   <div className="space-y-3 mb-6">
                       {mockChildren.map(child => (
                           <div 
                               key={child.id} 
                               onClick={() => { setCurrentChild(child); setShowChildSelector(false); }}
                               className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${currentChild.id === child.id ? 'bg-primary/5 border-primary ring-1 ring-primary/20' : 'bg-white border-stone-100 hover:border-primary/30'}`}
                           >
                               <div className="flex items-center">
                                   <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden mr-3 border border-stone-100">
                                       <img src={child.avatar} className="w-full h-full object-cover" />
                                   </div>
                                   <div>
                                       <div className={`font-bold text-sm ${currentChild.id === child.id ? 'text-primary' : 'text-stone-800'}`}>{child.name}</div>
                                       <div className="text-xs text-stone-500">{child.school}</div>
                                   </div>
                               </div>
                               {currentChild.id === child.id && (
                                   <div className="bg-primary text-white rounded-full p-1">
                                       <Check size={14} />
                                   </div>
                               )}
                           </div>
                       ))}
                       
                       <button 
                           onClick={() => { setShowChildSelector(false); navigate('/mine/archives'); }}
                           className="w-full py-3 border-2 border-dashed border-stone-200 rounded-2xl text-stone-500 font-bold text-sm flex items-center justify-center hover:bg-stone-50 hover:border-primary/50 hover:text-primary transition-colors"
                       >
                           + 认领/添加新孩子
                       </button>
                   </div>
               </div>
           </div>
       )}

       <BottomNav />
    </div>
  );
};

export default Mine;
