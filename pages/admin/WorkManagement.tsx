
import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Play, MoreHorizontal, FileVideo, Calendar, Clock, User } from 'lucide-react';

const WorkManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCompetition, setFilterCompetition] = useState('all');

  // Mock Works Data
  const works = [
      { id: 'W001', title: '我的家乡', student: '王小明', competition: '第五届演讲大赛', group: '小学A组', submitTime: '2025-07-20 14:30', status: '已提交', size: '120MB', cover: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=600&auto=format&fit=crop&q=60' },
      { id: 'W002', title: '经典诵读-将进酒', student: '李小红', competition: '经典诗文诵读大赛', group: '小学B组', submitTime: '2025-08-10 09:15', status: '评审中', size: '85MB', cover: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=60' },
      { id: 'W003', title: '英语演讲-My Dream', student: '张小刚', competition: '英语风采大赛', group: '初中组', submitTime: '2025-07-25 16:45', status: '已提交', size: '150MB', cover: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=60' },
      { id: 'W004', title: '主持-校园新闻', student: '赵小七', competition: '主持人大赛', group: '初中组', submitTime: '2025-08-01 11:20', status: '已评审', size: '98MB', cover: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=60' },
      { id: 'W005', title: '少年中国说', student: '陈小花', competition: '第五届演讲大赛', group: '小学B组', submitTime: '2025-07-22 10:00', status: '已提交', size: '110MB', cover: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=60' },
  ];

  const filteredWorks = works.filter(work => {
      const matchComp = filterCompetition === 'all' || work.competition.includes(filterCompetition);
      const matchSearch = work.title.includes(searchQuery) || work.student.includes(searchQuery);
      return matchComp && matchSearch;
  });

  return (
    <div className="space-y-6 h-full flex flex-col">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-black text-stone-800 font-serif">作品管理</h1>
            <button className="bg-stone-800 text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:bg-stone-900 transition-colors flex items-center text-xs">
                <Download size={16} className="mr-2" /> 批量下载作品
            </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200 flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[200px]">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索作品名称、选手姓名..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium outline-none focus:border-[#7f1d1d]" 
                />
            </div>
            
            <div className="relative group">
                <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                <select 
                    value={filterCompetition}
                    onChange={(e) => setFilterCompetition(e.target.value)}
                    className="pl-10 pr-8 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-600 outline-none focus:border-[#7f1d1d] appearance-none cursor-pointer hover:bg-stone-100 min-w-[180px]"
                >
                    <option value="all">所有赛事</option>
                    <option value="演讲">演讲大赛</option>
                    <option value="诵读">诵读大赛</option>
                    <option value="英语">英语大赛</option>
                </select>
            </div>
        </div>

        {/* Grid Content */}
        <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-4 gap-6 pb-10">
                {filteredWorks.map(work => (
                    <div key={work.id} className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden group cursor-pointer hover:border-[#7f1d1d]/30 transition-all hover:-translate-y-1 hover:shadow-md">
                        {/* Thumbnail */}
                        <div className="aspect-video bg-black relative overflow-hidden">
                            <img src={work.cover} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm group-hover:bg-[#7f1d1d] transition-colors">
                                    <Play size={20} className="text-white ml-1" fill="currentColor" />
                                </div>
                            </div>
                            <div className="absolute top-2 left-2">
                                <span className={`text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md ${
                                    work.status === '评审中' ? 'bg-[#7f1d1d]/80 text-white' : 
                                    work.status === '已评审' ? 'bg-green-500/80 text-white' : 
                                    'bg-stone-800/60 text-white'
                                }`}>
                                    {work.status}
                                </span>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded backdrop-blur-md font-mono">
                                {work.size}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="p-4">
                            <h3 className="font-bold text-stone-800 text-sm line-clamp-1 mb-1 group-hover:text-[#7f1d1d] transition-colors">{work.title}</h3>
                            <div className="flex items-center text-xs text-stone-500 mb-3">
                                <User size={12} className="mr-1" /> {work.student}
                                <span className="mx-2 text-stone-300">|</span>
                                {work.group}
                            </div>
                            
                            <div className="pt-3 border-t border-stone-100 flex justify-between items-end">
                                <div>
                                    <div className="text-[10px] text-stone-400 font-bold mb-0.5">{work.competition}</div>
                                    <div className="text-[10px] text-stone-300 flex items-center">
                                        <Calendar size={10} className="mr-1" /> {work.submitTime.split(' ')[0]}
                                    </div>
                                </div>
                                <button className="text-stone-400 hover:text-[#7f1d1d] transition-colors">
                                    <Download size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {filteredWorks.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-stone-400">
                    <FileVideo size={48} className="mb-4 opacity-20" />
                    <p className="text-sm">暂无符合条件的作品</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default WorkManagement;
