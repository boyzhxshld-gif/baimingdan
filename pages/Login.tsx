
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, verify credentials. Here we just redirect.
    localStorage.setItem('userRole', 'ADMIN');
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f4] relative overflow-hidden font-sans">
      {/* Texture Background */}
      <div className="absolute inset-0 bg-[#7f1d1d]">
          <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L19.515 8.485 18.1 7.07 25.172 0h2.828zM32 0l-6.485 6.485 1.415 1.415L34.828 0H32zm5.657 0l-6.485 6.485 1.415 1.415L39.072 0h-1.415zM0 0l21.213 21.213-1.414 1.414L0 2.828V0zm60 0L38.787 21.213l1.414 1.414L60 2.828V0zM0 60l21.213-21.213-1.414-1.414L0 57.172V60zm60 0L38.787 38.787l1.414-1.414L60 57.172V60z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
          }}></div>
          {/* Circular Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10"></div>
      </div>
      
      <div className="bg-white w-full max-w-5xl h-[600px] rounded-[2rem] shadow-2xl z-10 overflow-hidden flex relative ring-8 ring-white/10 backdrop-blur-xl">
         {/* Left Banner */}
         <div className="w-5/12 bg-stone-900 relative overflow-hidden flex flex-col p-12 justify-between text-white">
             <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=1000&auto=format&fit=crop&q=80")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
             }}></div>
             
             <div className="relative z-10">
                 <div className="w-14 h-14 bg-amber-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg text-white border-2 border-amber-400/30">
                     <BookOpen size={28} />
                 </div>
                 <h1 className="text-4xl font-black font-serif tracking-wide leading-tight mb-2 text-white drop-shadow-md">
                     讲好<br/>中国故事
                 </h1>
                 <div className="h-1 w-20 bg-amber-600 rounded-full mb-4"></div>
                 <p className="text-stone-300 text-xs tracking-widest uppercase font-medium">Official Management System</p>
             </div>

             <div className="relative z-10">
                 <div className="flex items-center space-x-2 text-stone-400 text-xs mb-3 font-medium bg-black/20 w-fit px-3 py-1.5 rounded-full border border-white/10">
                     <ShieldCheck size={14} className="text-amber-500" />
                     <span>官方认证 · 安全登录</span>
                 </div>
                 <p className="text-stone-500 text-[10px]">© 2025 Zhongxian Media. All rights reserved.</p>
             </div>
         </div>

         {/* Right Form */}
         <div className="flex-1 p-12 flex flex-col justify-center bg-[#fdfbf7]">
             <div className="max-w-sm mx-auto w-full">
                 <h2 className="text-3xl font-black text-[#7f1d1d] mb-2 font-serif">管理员登录</h2>
                 <p className="text-stone-500 text-sm mb-10 font-medium">请输入您的账号和密码以访问控制台</p>

                 <form onSubmit={handleLogin} className="space-y-6">
                     <div className="space-y-1.5">
                         <label className="text-xs font-bold text-stone-500 ml-1 uppercase tracking-wider">账号</label>
                         <div className="relative group">
                             <input 
                               type="text" 
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                               className="w-full bg-white border-2 border-stone-200 rounded-xl py-4 pl-12 pr-4 text-stone-800 font-bold focus:border-[#7f1d1d] focus:ring-4 focus:ring-[#7f1d1d]/5 outline-none transition-all placeholder:text-stone-300 group-hover:border-stone-300"
                               placeholder="Admin ID"
                             />
                             <User size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 group-focus-within:text-[#7f1d1d] transition-colors" />
                         </div>
                     </div>

                     <div className="space-y-1.5">
                         <label className="text-xs font-bold text-stone-500 ml-1 uppercase tracking-wider">密码</label>
                         <div className="relative group">
                             <input 
                               type="password" 
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               className="w-full bg-white border-2 border-stone-200 rounded-xl py-4 pl-12 pr-4 text-stone-800 font-bold focus:border-[#7f1d1d] focus:ring-4 focus:ring-[#7f1d1d]/5 outline-none transition-all placeholder:text-stone-300 group-hover:border-stone-300"
                               placeholder="••••••••"
                             />
                             <Lock size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 group-focus-within:text-[#7f1d1d] transition-colors" />
                         </div>
                     </div>

                     <div className="flex justify-between items-center pt-2">
                         <label className="flex items-center cursor-pointer select-none">
                             <input type="checkbox" className="w-4 h-4 text-[#7f1d1d] rounded border-stone-300 focus:ring-[#7f1d1d] cursor-pointer" />
                             <span className="ml-2 text-xs text-stone-500 font-bold hover:text-stone-700">记住我</span>
                         </label>
                         <button type="button" className="text-xs font-bold text-[#7f1d1d] hover:text-[#991b1b] hover:underline">忘记密码?</button>
                     </div>

                     <button 
                       type="submit"
                       className="w-full bg-[#7f1d1d] text-white font-bold py-4 rounded-xl shadow-lg shadow-red-900/20 hover:bg-[#991b1b] hover:shadow-red-900/30 active:scale-[0.98] transition-all flex items-center justify-center group mt-4 text-base"
                     >
                         进入系统 <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                     </button>
                 </form>
             </div>
         </div>
      </div>
    </div>
  );
};

export default Login;
