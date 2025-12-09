
import React, { useState } from 'react';
import { Users, FileText, Trophy, TrendingUp, ArrowUpRight, ChevronRight, MapPin, School, Eye, BarChart3, PieChart, Calendar, CheckCircle2, AlertCircle, Clock, Megaphone, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('month');
  
  // Custom Date Range State
  const [showDateModal, setShowDateModal] = useState(false);
  const [customDates, setCustomDates] = useState({ start: '', end: '' });

  const stats = [
    { label: '累计参赛人数', value: '3420', change: '+12%', desc: '较上届', icon: Users, path: '/users' },
    { label: '覆盖学校', value: '128', change: null, desc: '活跃学校占比 85%', icon: School, path: '/users' },
    { label: '覆盖区域', value: '15', unit: '个省市', change: null, desc: '', icon: MapPin, path: '/platform' },
    { label: '赛事访问量', value: '12.5w', change: null, desc: '日均新增 1,200+', icon: Eye, path: '/dashboard' },
  ];

  // Work Queue Items
  const workQueue = [
      { 
          title: '待审核报名', 
          count: 124, 
          priority: 'high', 
          icon: FileText, 
          color: 'bg-blue-50 text-blue-600',
          path: '/registrations?status=pending',
          desc: '需人工审核的报名信息'
      },
      { 
          title: '待确认晋级', 
          count: 3, 
          priority: 'critical', 
          icon: TrendingUp, 
          color: 'bg-amber-50 text-amber-600',
          path: '/promotion',
          desc: '复赛/决赛批次评分已完成'
      },
      { 
          title: '草稿箱公告', 
          count: 5, 
          priority: 'normal', 
          icon: Megaphone, 
          color: 'bg-purple-50 text-purple-600',
          path: '/announcements',
          desc: '未发布的赛事动态'
      }
  ];

  const trackStats = [
      { name: '演讲赛道', count: 1200, percent: 35, color: 'bg-[#7f1d1d]' },
      { name: '朗诵赛道', count: 850, percent: 25, color: 'bg-amber-600' },
      { name: '英语赛道', count: 680, percent: 20, color: 'bg-blue-600' },
      { name: '主持赛道', count: 450, percent: 13, color: 'bg-purple-600' },
      { name: '其他赛道', count: 240, percent: 7, color: 'bg-stone-400' },
  ];

  const activeScoring = [
      { title: '第五届“讲好中国故事”演讲大赛 - 复赛', progress: 78, total: 1200, reviewed: 936 },
      { title: '经典诗文诵读挑战赛 - 初赛', progress: 45, total: 800, reviewed: 360 },
      { title: '“金话筒”主持人大赛 - 海选', progress: 92, total: 500, reviewed: 460 },
  ];

  const handleCustomDateConfirm = () => {
      if (customDates.start && customDates.end) {
          setDateRange('custom');
          setShowDateModal(false);
      } else {
          alert('请选择开始和结束时间');
      }
  };

  return (
    <div className="space-y-6 animate-slide-up pb-10 relative">
      {/* Header with Date Filter */}
      <div className="flex justify-between items-end">
        <div>
            <h1 className="text-2xl font-black text-stone-800 font-serif">工作台</h1>
            <p className="text-xs text-stone-500 mt-1 font-medium">数据更新至 2025-03-15 12:00</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-stone-200 shadow-sm">
            {[
                { id: 'week', label: '本周' },
                { id: 'month', label: '本月' },
                { id: 'quarter', label: '本季' },
                { id: 'year', label: '全年' }
            ].map((range) => (
                <button
                    key={range.id}
                    onClick={() => setDateRange(range.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        dateRange === range.id 
                        ? 'bg-[#7f1d1d] text-white shadow-sm' 
                        : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50'
                    }`}
                >
                    {range.label}
                </button>
            ))}
            <div className="w-px bg-stone-100 mx-1 my-1"></div>
            <button 
                onClick={() => setShowDateModal(true)}
                className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center transition-colors ${
                    dateRange === 'custom' 
                    ? 'bg-[#7f1d1d] text-white shadow-sm' 
                    : 'text-stone-500 hover:text-[#7f1d1d] hover:bg-stone-50'
                }`}
            >
                <Calendar size={14} className="mr-1.5" /> 
                {dateRange === 'custom' && customDates.start ? `${customDates.start} - ${customDates.end}` : '自定义'}
            </button>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            onClick={() => navigate(stat.path)}
            className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
          >
             <div className="flex items-center space-x-2 mb-4 text-stone-400">
                <stat.icon size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">{stat.label}</span>
             </div>
             <div className="flex items-baseline mb-2">
                 <span className="text-3xl font-black text-stone-800 font-serif">{stat.value}</span>
                 {stat.unit && <span className="text-sm font-bold text-stone-500 ml-1">{stat.unit}</span>}
             </div>
             <div className="flex items-center text-xs font-medium text-stone-400">
                 {stat.change && <span className="text-green-600 font-bold mr-2 flex items-center bg-green-50 px-1.5 py-0.5 rounded"><ArrowUpRight size={12}/> {stat.change}</span>}
                 {stat.desc}
             </div>
          </div>
        ))}
      </div>

      {/* Work Queue Section */}
      <div>
          <h3 className="text-sm font-bold text-stone-500 mb-4 flex items-center uppercase tracking-wider">
              <CheckCircle2 size={16} className="mr-2" /> 待办事项 (Work Queue)
          </h3>
          <div className="grid grid-cols-3 gap-6">
              {workQueue.map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => navigate(item.path)}
                    className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md hover:border-[#7f1d1d]/20 transition-all cursor-pointer flex items-center"
                  >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${item.color}`}>
                          <item.icon size={24} />
                      </div>
                      <div className="flex-1">
                          <div className="flex justify-between items-start">
                              <h4 className="font-bold text-stone-800">{item.title}</h4>
                              {item.count > 0 && (
                                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.priority === 'critical' ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-stone-100 text-stone-600'}`}>
                                      {item.count}
                                  </span>
                              )}
                          </div>
                          <p className="text-xs text-stone-400 mt-1">{item.desc}</p>
                      </div>
                      <ChevronRight size={16} className="text-stone-300 ml-2" />
                  </div>
              ))}
          </div>
      </div>

      {/* Middle Section: Analysis */}
      <div className="grid grid-cols-3 gap-6">
          {/* Track Distribution */}
          <div className="col-span-1 bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-stone-800 flex items-center text-sm"><PieChart size={16} className="mr-2 text-stone-400"/> 赛道报名占比</h3>
              </div>
              <div className="space-y-4">
                  {trackStats.map((item, idx) => (
                      <div key={idx}>
                          <div className="flex justify-between text-xs mb-1">
                              <span className="font-bold text-stone-700">{item.name}</span>
                              <span className="text-stone-500">{item.count}人 ({item.percent}%)</span>
                          </div>
                          <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percent}%` }}></div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Scoring Progress */}
          <div className="col-span-2 bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-stone-800 flex items-center text-sm"><BarChart3 size={16} className="mr-2 text-stone-400"/> 评审进度概览</h3>
                  <button onClick={() => navigate('/judging')} className="text-xs font-bold text-stone-400 hover:text-[#7f1d1d] transition-colors">前往评审中心</button>
              </div>
              <div className="space-y-6">
                  {activeScoring.map((item, idx) => (
                      <div key={idx} className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                          <div className="flex justify-between items-center mb-2">
                              <h4 className="font-bold text-stone-800 text-sm">{item.title}</h4>
                              <span className={`text-xs font-bold ${item.progress > 80 ? 'text-green-600' : 'text-[#7f1d1d]'}`}>{item.progress}% 完成</span>
                          </div>
                          <div className="h-2.5 w-full bg-stone-200 rounded-full overflow-hidden mb-2">
                              <div className={`h-full rounded-full ${item.progress > 80 ? 'bg-green-500' : 'bg-[#7f1d1d]'}`} style={{ width: `${item.progress}%` }}></div>
                          </div>
                          <div className="flex justify-between text-xs text-stone-400">
                              <span>已评: {item.reviewed}</span>
                              <span>总计: {item.total}</span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* Bottom Section: Recent Activity Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm flex flex-col overflow-hidden">
             <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-white">
                 <h3 className="font-bold text-stone-800 flex items-center text-sm"><Clock size={16} className="mr-2 text-stone-400"/> 实时报名动态</h3>
                 <button onClick={() => navigate('/registrations')} className="text-xs font-bold text-stone-400 hover:text-[#7f1d1d] flex items-center transition-colors">
                     查看全部 <ChevronRight size={14} />
                 </button>
             </div>
             <div className="flex-1 p-2">
                 <table className="w-full text-left border-collapse">
                     <thead>
                         <tr>
                             <th className="p-4 text-xs font-bold text-stone-400 uppercase tracking-wider">选手</th>
                             <th className="p-4 text-xs font-bold text-stone-400 uppercase tracking-wider">赛事/组别</th>
                             <th className="p-4 text-xs font-bold text-stone-400 uppercase tracking-wider">状态</th>
                             <th className="p-4 text-xs font-bold text-stone-400 uppercase tracking-wider text-right">时间</th>
                         </tr>
                     </thead>
                     <tbody className="text-sm text-stone-600">
                         {[1,2,3,4,5].map(i => (
                             <tr key={i} onClick={() => navigate('/registrations')} className="hover:bg-stone-50 transition-colors border-b border-stone-50 last:border-0 cursor-pointer group">
                                 <td className="p-4 font-bold text-stone-800 flex items-center">
                                     <div className="w-8 h-8 rounded-full bg-stone-100 mr-3 overflow-hidden border border-stone-200 group-hover:border-[#7f1d1d]/30 transition-colors flex items-center justify-center text-xs font-bold text-stone-400">
                                         {i}
                                     </div>
                                     王小{i}
                                 </td>
                                 <td className="p-4">
                                     <div className="font-bold group-hover:text-[#7f1d1d] transition-colors text-xs">讲好中国故事演讲大赛</div>
                                     <div className="text-[10px] text-stone-400 mt-0.5">小学组</div>
                                 </td>
                                 <td className="p-4">
                                     <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-[10px] font-bold border border-green-100">已报名</span>
                                 </td>
                                 <td className="p-4 text-stone-400 text-xs font-mono text-right">10:4{i}</td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>
         </div>

      {/* Custom Date Modal */}
      {showDateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4">
              <div className="bg-white w-full max-w-sm rounded-3xl p-6 relative animate-slide-up shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-lg text-stone-800 font-serif">自定义时间范围</h3>
                      <button onClick={() => setShowDateModal(false)} className="p-2 rounded-full hover:bg-stone-100 text-stone-400"><X size={20}/></button>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                      <div>
                          <label className="text-xs font-bold text-stone-500 mb-1.5 block">开始时间</label>
                          <input 
                              type="date"
                              value={customDates.start}
                              onChange={(e) => setCustomDates({...customDates, start: e.target.value})}
                              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                          />
                      </div>
                      <div>
                          <label className="text-xs font-bold text-stone-500 mb-1.5 block">结束时间</label>
                          <input 
                              type="date"
                              value={customDates.end}
                              onChange={(e) => setCustomDates({...customDates, end: e.target.value})}
                              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                          />
                      </div>
                  </div>

                  <button 
                      onClick={handleCustomDateConfirm}
                      className="w-full py-3.5 bg-[#7f1d1d] text-white font-bold rounded-xl shadow-lg shadow-red-900/20 active:scale-95 transition-all"
                  >
                      确认筛选
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};

export default Dashboard;
