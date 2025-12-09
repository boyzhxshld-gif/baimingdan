
import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronRight, MapPin, PlayCircle, Clock, ChevronDown, X, Building2, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeLevel, setActiveLevel] = useState('primary');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Banner State
  const bannerRef = useRef<HTMLDivElement>(null);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  const handleScroll = () => {
    if (bannerRef.current) {
      const scrollLeft = bannerRef.current.scrollLeft;
      const width = bannerRef.current.offsetWidth;
      const index = Math.round(scrollLeft / width);
      setActiveBannerIndex(index);
    }
  };

  // Enhanced Categories with Competition Details
  const competitionTracks = [
    { 
      id: 'speech', 
      competitionId: '1',
      name: '演讲', 
      title: '讲好中国故事演讲大赛',
      deadline: '10-25',
      img: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=600&auto=format&fit=crop&q=80',
      levels: ['primary', 'junior', 'senior'],
      isRegistered: true
    },
    { 
      id: 'reading', 
      competitionId: '2',
      name: '诵读', 
      title: '经典诗文诵读大赛',
      deadline: '11-10',
      img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80',
      levels: ['primary', 'junior'],
      isRegistered: true
    },
    { 
      id: 'host', 
      competitionId: '3',
      name: '主持', 
      title: '青少年主持人大赛',
      deadline: '12-01',
      img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80',
      levels: ['primary', 'junior'],
      isRegistered: false
    },
    { 
      id: 'english', 
      competitionId: '4',
      name: '英语', 
      title: '英语风采大赛',
      deadline: '12-15',
      img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80',
      levels: ['primary', 'junior', 'senior'],
      isRegistered: true
    },
    { 
      id: 'drama', 
      competitionId: '5',
      name: '戏剧', 
      title: '童话剧独白表演赛',
      deadline: '11-20',
      img: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=600&auto=format&fit=crop&q=80',
      levels: ['primary'],
      isRegistered: true
    },
    { 
      id: 'debate', 
      competitionId: '6',
      name: '辩论', 
      title: '青少年辩论邀请赛',
      deadline: '12-20',
      img: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=600&auto=format&fit=crop&q=80',
      levels: ['junior', 'senior'],
      isRegistered: false
    },
    { 
      id: 'ai', 
      competitionId: '7',
      name: '语言科技', 
      title: 'AI 语言创意大赛',
      deadline: '01-15',
      img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80',
      levels: ['primary', 'junior', 'senior'],
      isSpecial: true,
      isRegistered: false
    },
  ];

  const getVisibleTracks = () => {
      if (activeLevel === 'all') return competitionTracks;
      return competitionTracks.filter(c => c.levels.includes(activeLevel));
  };

  const handleSearch = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
          navigate(`/competitions?search=${searchQuery}`);
      }
  };

  const handleTrackClick = (competitionId: string) => {
      navigate(`/competition/${competitionId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f4] pb-24">
      {/* Header Area */}
      <div className="bg-[#f5f5f4] sticky top-0 z-30 px-5 pt-4 pb-2">
          <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                  {/* Artistic Seal Header Design */}
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-md border-2 border-amber-100 mr-3">
                      <span className="text-white font-serif font-black text-2xl leading-none mt-0.5">讲</span>
                  </div>
                  <div className="flex flex-col justify-center">
                      <h1 className="text-2xl font-black text-primary-dark tracking-tighter font-serif leading-none mb-1">
                          讲好中国故事
                      </h1>
                  </div>
              </div>
              <div className="flex items-center space-x-3">
                  <div 
                    className="relative cursor-pointer p-2 hover:bg-stone-200 rounded-full transition-colors"
                    onClick={() => navigate('/mine/messages')}
                  >
                      <Bell size={22} className="text-stone-600" />
                      <span className="absolute top-1.5 right-2 w-2 h-2 bg-primary rounded-full border border-[#f5f5f4]"></span>
                  </div>
              </div>
          </div>

          <div className="relative group shadow-sm">
              <input 
                  type="text" 
                  placeholder="搜索赛事名称、关键字" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  className="w-full bg-white border border-stone-200 focus:border-primary/30 text-stone-800 text-sm rounded-xl pl-11 pr-4 py-3.5 outline-none transition-all placeholder:text-stone-400 font-medium"
              />
              <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 group-focus-within:text-primary transition-colors" />
          </div>
      </div>

      <div className="p-5 space-y-6 animate-slide-up">
          
          {/* Banner Carousel */}
          <div className="relative w-full aspect-[2.2/1] rounded-[1.5rem] overflow-hidden shadow-xl shadow-stone-900/10">
              <div 
                ref={bannerRef}
                onScroll={handleScroll}
                className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
              >
                  {/* Slide 1: Organizer */}
                  <div 
                    onClick={() => navigate('/organizer')}
                    className="w-full h-full flex-shrink-0 snap-center relative cursor-pointer group"
                  >
                      <img 
                          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80" 
                          alt="Organizer" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 sepia-[.1]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/70 to-transparent"></div>
                      <div className="absolute inset-0 p-6 flex flex-col justify-center text-white">
                          <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold border border-white/20 w-fit mb-2 text-amber-200">
                              官方主办
                          </div>
                          <h2 className="text-2xl font-serif font-black mb-1 drop-shadow-md">中国教育电视台<br/>中线传媒</h2>
                          <p className="text-xs text-white/80 mb-4">权威平台 · 专业赛事 · 助力成长</p>
                          <div className="flex items-center text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
                              了解主办方 <ChevronRight size={14} className="ml-1" />
                          </div>
                      </div>
                  </div>

                  {/* Slide 2: Rules */}
                  <div 
                    onClick={() => navigate('/rules')}
                    className="w-full h-full flex-shrink-0 snap-center relative cursor-pointer group"
                  >
                      <img 
                          src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1000&auto=format&fit=crop&q=80" 
                          alt="Rules" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 sepia-[.1]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-800/70 to-transparent"></div>
                      <div className="absolute inset-0 p-6 flex flex-col justify-center text-white">
                          <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold border border-white/20 w-fit mb-2 text-blue-200">
                              赛制解读
                          </div>
                          <h2 className="text-2xl font-serif font-black mb-1 drop-shadow-md">公平 · 公正 · 公开</h2>
                          <p className="text-xs text-white/80 mb-4">评分标准与晋级流程全解析</p>
                          <div className="flex items-center text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
                              查看详情 <ChevronRight size={14} className="ml-1" />
                          </div>
                      </div>
                  </div>
              </div>

              {/* Indicators */}
              <div className="absolute bottom-3 right-4 flex space-x-1.5">
                  {[0, 1].map((idx) => (
                      <div 
                        key={idx} 
                        className={`h-1.5 rounded-full transition-all duration-300 ${activeBannerIndex === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/40'}`}
                      ></div>
                  ))}
              </div>
          </div>

          {/* Level Switcher */}
          <div className="flex items-center justify-between space-x-2 bg-stone-200/50 p-1.5 rounded-xl border border-stone-200">
              {['primary', 'junior', 'senior'].map(level => (
                  <button 
                      key={level}
                      onClick={() => setActiveLevel(level)}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 font-serif ${
                          activeLevel === level 
                          ? 'bg-primary text-white shadow-md' 
                          : 'text-stone-500 hover:text-stone-700 hover:bg-stone-200'
                      }`}
                  >
                      {{'primary': '小学组', 'junior': '初中组', 'senior': '高中/职高'}[level]}
                  </button>
              ))}
          </div>

          {/* 2-Column Grid Track List */}
          <div>
              <div className="flex justify-between items-center mb-4 px-1">
                  <h2 className="text-lg font-black text-primary-dark flex items-center font-serif tracking-tight">
                      <span className="w-1.5 h-5 bg-primary rounded-full mr-2 shadow-sm"></span>
                      选择赛道
                  </h2>
                  <span className="text-xs text-stone-400 font-medium flex items-center">
                      冬季赛事报名开始了 <Sparkles size={12} className="ml-1 text-amber-500" />
                  </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                  {getVisibleTracks().map((track) => (
                      <div 
                          key={track.id} 
                          onClick={() => handleTrackClick(track.competitionId)}
                          className="bg-white rounded-2xl overflow-hidden shadow-card border border-stone-100 cursor-pointer group hover:border-primary/30 hover:shadow-glow transition-all duration-300 relative aspect-[1.1/1]"
                      >
                          <img src={track.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={track.name} />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary/20 to-transparent"></div>
                          
                          {/* Registered Badge */}
                          {track.isRegistered && (
                              <div className="absolute top-2 right-2 bg-green-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center backdrop-blur-sm border border-white/20">
                                  <CheckCircle2 size={10} className="mr-1"/> 已报名
                              </div>
                          )}

                          {/* Arrow moved to bottom right */}
                          <div className="absolute bottom-3 right-3 w-7 h-7 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 group-hover:bg-primary group-hover:border-primary transition-colors z-10 shadow-sm">
                               <ChevronRight size={14} />
                          </div>

                          <div className="absolute inset-0 p-4 flex flex-col justify-end">
                              <h3 className="text-2xl font-black text-white font-serif mb-1 tracking-wider leading-none drop-shadow-md">
                                  {track.name}
                              </h3>
                              <p className="text-[10px] text-stone-200 line-clamp-1 opacity-90 mb-1 font-medium pr-4">
                                  {track.title}
                              </p>
                              <div className="flex items-center text-[10px] text-amber-200 font-bold">
                                  <Clock size={10} className="mr-1" />
                                  <span>{track.deadline} 截止</span>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* More Functions - Courses Only */}
          <div>
              <div className="flex justify-between items-end mb-3 px-1">
                  <h2 className="text-lg font-black text-primary-dark flex items-center font-serif tracking-tight">
                      <span className="w-1.5 h-5 bg-primary rounded-full mr-2 shadow-sm"></span>
                      更多功能
                  </h2>
              </div>
              <div 
                onClick={() => navigate('/courses')}
                className="bg-white rounded-[1.5rem] p-1 cursor-pointer shadow-sm border border-stone-100 hover:shadow-md hover:border-primary/20 transition-all group"
              >
                  <div className="bg-stone-50 h-24 rounded-[1.3rem] p-5 relative overflow-hidden flex flex-col justify-center">
                      <div className="relative z-10 flex justify-between items-center">
                          <div>
                              <h3 className="text-stone-800 font-black text-lg leading-tight mb-1 font-serif flex items-center">
                                  名师公益课 
                                  <span className="ml-2 bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-sans">免费</span>
                              </h3>
                              <p className="text-stone-500 text-xs font-medium">大师指导 · 技巧提升 · 赛前必看</p>
                          </div>
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-amber-600 group-hover:scale-110 transition-transform">
                              <PlayCircle size={24} fill="currentColor" className="text-white" />
                          </div>
                      </div>
                      
                      <div className="absolute -bottom-2 right-10 opacity-5 rotate-12 pointer-events-none">
                          <BookOpen size={80} className="text-stone-900" />
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Home;
