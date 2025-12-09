import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Heart, Share2, Clock, Eye, MessageCircle, ChevronDown, List, Video } from 'lucide-react';
import Header from '../components/Header';

const ProgramDetail: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('intro');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header title="节目详情" />
      
      {/* Video Player Area */}
      <div className="w-full aspect-video bg-slate-900 relative group cursor-pointer">
          <img 
              src="https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=1000&auto=format&fit=crop&q=60" 
              alt="Video Cover" 
              className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
                 <Play size={28} className="text-primary ml-1" fill="currentColor" />
             </div>
          </div>
          
          {/* Progress Bar (Mock) */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div className="w-1/3 h-full bg-primary relative">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm"></div>
              </div>
          </div>
      </div>

      {/* Info Header */}
      <div className="p-5 border-b border-slate-50">
          <h1 className="text-lg font-bold text-slate-900 mb-2 leading-tight">全国青少年语言素养大赛总决赛：小学组精彩瞬间</h1>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
              <div className="flex items-center space-x-3">
                  <span className="flex items-center"><Eye size={14} className="mr-1"/> 12.5w次播放</span>
                  <span className="flex items-center"><Clock size={14} className="mr-1"/> 2025-03-01</span>
              </div>
              <button className="flex items-center text-primary font-bold">
                  简介 <ChevronDown size={14} className="ml-1"/>
              </button>
          </div>
          
          <div className="flex justify-between items-center">
             <div className="flex space-x-6">
                 <button className="flex flex-col items-center text-slate-500 hover:text-red-500 transition-colors">
                     <Heart size={20} className="mb-1" />
                     <span className="text-[10px]">收藏</span>
                 </button>
                 <button className="flex flex-col items-center text-slate-500 hover:text-blue-500 transition-colors">
                     <Share2 size={20} className="mb-1" />
                     <span className="text-[10px]">分享</span>
                 </button>
                 <button className="flex flex-col items-center text-slate-500 hover:text-green-500 transition-colors">
                     <MessageCircle size={20} className="mb-1" />
                     <span className="text-[10px]">评论 (108)</span>
                 </button>
             </div>
             <button className="bg-blue-50 text-primary px-4 py-1.5 rounded-full text-xs font-bold">
                 + 关注频道
             </button>
          </div>
      </div>

      {/* Content Tabs */}
      <div className="flex border-b border-slate-100 sticky top-14 bg-white z-20">
          <button 
             onClick={() => setActiveTab('intro')}
             className={`flex-1 py-3 text-sm font-bold relative ${activeTab === 'intro' ? 'text-primary' : 'text-slate-500'}`}
          >
             节目介绍
             {activeTab === 'intro' && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full"></div>}
          </button>
          <button 
             onClick={() => setActiveTab('related')}
             className={`flex-1 py-3 text-sm font-bold relative ${activeTab === 'related' ? 'text-primary' : 'text-slate-500'}`}
          >
             相关推荐
             {activeTab === 'related' && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full"></div>}
          </button>
      </div>

      <div className="p-5 bg-slate-50 flex-1">
          {activeTab === 'intro' ? (
              <div className="space-y-4 animate-fade-in">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                      <h3 className="font-bold text-slate-800 mb-2 text-sm">视频简介</h3>
                      <p className="text-xs text-slate-600 leading-relaxed text-justify">
                          本次视频记录了第五届“讲好中国故事”全国青少年语言素养大赛总决赛小学组的精彩表现。来自全国各地的30位优秀小选手，用真挚的情感、生动的语言，讲述了家乡的变化、身边的榜样以及中华优秀传统文化。
                      </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                      <h3 className="font-bold text-slate-800 mb-3 text-sm flex items-center">
                          <List size={16} className="mr-2 text-primary"/> 选集 (全5集)
                      </h3>
                      <div className="grid grid-cols-4 gap-2">
                          {[1, 2, 3, 4, 5].map(num => (
                              <button 
                                  key={num} 
                                  className={`py-2 rounded-lg text-xs font-bold ${num === 1 ? 'bg-primary text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                              >
                                  第{num}集
                              </button>
                          ))}
                      </div>
                  </div>
              </div>
          ) : (
              <div className="space-y-4 animate-fade-in">
                  {[
                      { title: '演讲技巧公开课：如何克服紧张', views: '5.6w', time: '12:00' },
                      { title: '历届金奖作品赏析', views: '3.2w', time: '08:45' },
                      { title: '名师教你写演讲稿', views: '4.1w', time: '15:30' }
                  ].map((item, idx) => (
                      <div key={idx} className="flex bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                          <div className="w-28 aspect-video bg-slate-200 rounded-lg mr-3 relative overflow-hidden flex-shrink-0">
                             <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-600"></div>
                             <Video size={20} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/50" />
                             <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[8px] px-1 rounded">{item.time}</div>
                          </div>
                          <div className="flex flex-col justify-between py-1">
                              <h4 className="text-sm font-bold text-slate-800 line-clamp-2">{item.title}</h4>
                              <span className="text-xs text-slate-400 flex items-center">
                                  <Play size={10} className="mr-1"/> {item.views}
                              </span>
                          </div>
                      </div>
                  ))}
              </div>
          )}
      </div>
    </div>
  );
};

export default ProgramDetail;