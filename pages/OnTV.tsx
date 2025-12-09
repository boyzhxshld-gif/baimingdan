import React, { useState } from 'react';
import { Search, Star, Play, Clock, Share2, MoreHorizontal, Video, Award, Mic, Globe, Tv } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const OnTV: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const programs = [
    { 
        id: 1, 
        title: '全国青少年语言素养大赛总决赛', 
        subtitle: '小学组精彩瞬间', 
        desc: '来自全国各地的优秀选手齐聚一堂，展示语言魅力。', 
        views: '12.5w',
        time: '10:20',
        color: 'from-blue-500 to-indigo-600',
        icon: Award,
        isLive: true
    },
    { 
        id: 2, 
        title: '名师点评：如何讲好中国故事', 
        subtitle: '特邀专家深度解析', 
        desc: '著名主持人现场指导，提升演讲技巧，干货满满。', 
        views: '8.3w',
        time: '45:00',
        color: 'from-purple-500 to-pink-600',
        icon: Mic,
        isLive: false
    },
    { 
        id: 3, 
        title: '优秀作品展播 2024', 
        subtitle: '金奖作品合集', 
        desc: '震撼心灵的声音，感受少年的力量，学习优秀范例。', 
        views: '5.1w',
        time: '28:15',
        color: 'from-orange-400 to-red-500',
        icon: Video,
        isLive: false
    },
    { 
        id: 4, 
        title: '英语风采大赛实录', 
        subtitle: '国际视野', 
        desc: '用世界语言讲好中国故事，展现新时代风采。', 
        views: '3.2w',
        time: '32:10',
        color: 'from-emerald-400 to-teal-600',
        icon: Globe,
        isLive: false
    },
  ];

  const filteredPrograms = programs.filter(prog => 
    prog.title.includes(searchQuery) || prog.desc.includes(searchQuery)
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Top Search Bar */}
      <div className="px-5 py-3 flex items-center space-x-3 sticky top-0 glass z-30 shadow-sm">
        <div className="flex-1 relative group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索精彩节目"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 border-none text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
          />
          <div className="absolute left-0 top-0 bottom-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400 group-focus-within:text-primary transition-colors" />
          </div>
        </div>
        <button className="bg-slate-900 text-white p-2.5 rounded-xl shadow-md hover:bg-slate-800 transition-colors active:scale-95" onClick={() => navigate('/mine/favorites')}>
          <Star size={18} />
        </button>
      </div>

      <div className="p-5 space-y-6 pb-24 animate-slide-up">
        
        {/* "I Want to be on TV" Banner */}
        <div 
            onClick={() => navigate('/tv/join')}
            className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-5 text-white shadow-lg shadow-pink-200 cursor-pointer relative overflow-hidden group"
        >
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="relative z-10 flex items-center justify-between">
                <div>
                    <div className="flex items-center mb-1">
                        <Tv size={24} className="mr-2 text-white" />
                        <h2 className="text-xl font-black tracking-tight">我要上电视</h2>
                    </div>
                    <p className="text-pink-100 text-xs font-medium">优秀选手有机会参与节目录制</p>
                </div>
                <div className="bg-white text-pink-600 px-4 py-2 rounded-xl text-xs font-bold shadow-sm group-hover:bg-pink-50 transition-colors">
                    立即申请
                </div>
            </div>
        </div>

        <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm">精彩节目</h3>
        </div>

        {filteredPrograms.length > 0 ? filteredPrograms.map((prog) => (
          <div 
            key={prog.id} 
            className="bg-white rounded-2xl overflow-hidden shadow-card border border-slate-100 group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            onClick={() => navigate(`/tv/${prog.id}`)}
          >
             {/* Video Thumbnail (CSS Generated) */}
             <div className={`relative aspect-video w-full bg-gradient-to-br ${prog.color} overflow-hidden flex items-center justify-center`}>
                {/* Decorative Background Shapes */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
                
                {/* Central Icon */}
                <div className="text-white/20 transform scale-150 absolute right-8 bottom-4">
                    <prog.icon size={80} />
                </div>

                {/* Content Text Overlay */}
                <div className="relative z-10 text-center px-8">
                    <div className="inline-block bg-white/20 backdrop-blur-md border border-white/30 rounded-lg px-3 py-1 text-white text-xs font-bold mb-2">
                        {prog.subtitle}
                    </div>
                    <h2 className="text-white text-xl font-black leading-tight drop-shadow-md">{prog.title}</h2>
                </div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                        <Play size={24} className="text-primary ml-1" fill="currentColor" />
                    </div>
                </div>

                {/* Live Badge */}
                {prog.isLive && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center animate-pulse shadow-sm">
                        <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5"></span> LIVE
                    </div>
                )}
                
                {/* Time Badge */}
                <div className="absolute bottom-3 right-3 bg-black/40 text-white text-[10px] px-2 py-0.5 rounded font-medium backdrop-blur-md flex items-center border border-white/10">
                    <Clock size={10} className="mr-1" /> {prog.time}
                </div>
             </div>
             
             <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                   <h2 className="text-base font-bold text-slate-800 line-clamp-1 pr-2">{prog.title}</h2>
                   <button className="text-slate-400 hover:text-slate-600" onClick={(e) => { e.stopPropagation(); alert('更多选项'); }}>
                      <MoreHorizontal size={18} />
                   </button>
                </div>
                <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed">{prog.desc}</p>
                
                <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-50">
                   <div className="flex items-center text-slate-400">
                       <span className="flex items-center mr-4">
                          <Play size={12} className="mr-1" /> {prog.views}次播放
                       </span>
                   </div>
                   <div className="flex space-x-3">
                       <button className="text-slate-400 hover:text-primary transition-colors flex items-center">
                          <Share2 size={14} className="mr-1"/> 分享
                       </button>
                   </div>
                </div>
             </div>
          </div>
        )) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <p>未找到相关节目</p>
            </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default OnTV;