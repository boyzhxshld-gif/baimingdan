
import React, { useState } from 'react';
import { Users, Trophy, BarChart3, Sliders, Calendar, ArrowRight, Gavel, MonitorPlay, Check, X, Clock, AlertCircle, FileText } from 'lucide-react';

const ReviewOverview: React.FC = () => {
  const [viewMode, setViewMode] = useState<'judge' | 'competition'>('judge');
  const [selectedJudge, setSelectedJudge] = useState<any>(null);
  const [selectedCompetition, setSelectedCompetition] = useState<any>(null);
  const [drawerTab, setDrawerTab] = useState<'stats' | 'works'>('stats');

  // Mock Judges
  const judges = [
      { id: 1, name: '张专家', tags: ['演讲', '小学组'], load: 12, maxLoad: 50, status: 'active', reviewed: 156, avgTime: '8min', pending: 12 },
      { id: 2, name: '李教授', tags: ['朗诵', '中学组'], load: 28, maxLoad: 50, status: 'busy', reviewed: 89, avgTime: '12min', pending: 28 },
      { id: 3, name: '王主持', tags: ['主持', '综合'], load: 5, maxLoad: 50, status: 'idle', reviewed: 210, avgTime: '6min', pending: 5 },
      { id: 4, name: '赵老师', tags: ['演讲', '高中组'], load: 0, maxLoad: 50, status: 'idle', reviewed: 45, avgTime: '15min', pending: 0 },
      { id: 5, name: '钱评委', tags: ['英语', '综合'], load: 45, maxLoad: 50, status: 'busy', reviewed: 320, avgTime: '5min', pending: 45 },
  ];

  // Mock Competitions in Review
  const competitions = [
      { 
          id: 1, 
          title: '第五届“讲好中国故事”演讲大赛', 
          stage: '复赛 (省级决选)', 
          progress: 78, 
          total: 1200, 
          reviewed: 936, 
          judges: 12, 
          deadline: '2025-08-31',
          groups: [
              { name: '小学A组', progress: 100, total: 400, reviewed: 400 },
              { name: '小学B组', progress: 85, total: 500, reviewed: 425 },
              { name: '初中组', progress: 37, total: 300, reviewed: 111 },
          ]
      },
      { 
          id: 2, 
          title: '经典诗文诵读挑战赛', 
          stage: '初赛 (海选)', 
          progress: 45, 
          total: 800, 
          reviewed: 360, 
          judges: 8, 
          deadline: '2025-09-10',
          groups: [
              { name: '小学组', progress: 50, total: 500, reviewed: 250 },
              { name: '中学组', progress: 36, total: 300, reviewed: 110 },
          ]
      },
      { 
          id: 3, 
          title: '“金话筒”青少年主持人大赛', 
          stage: '初赛', 
          progress: 92, 
          total: 500, 
          reviewed: 460, 
          judges: 5, 
          deadline: '2025-11-20',
          groups: [
              { name: '综合组', progress: 92, total: 500, reviewed: 460 },
          ]
      },
  ];

  // Mock Works Data for Detail View (Competition context)
  const mockWorksCompetition = [
      { id: 'W001', title: '我的家乡', student: '王小明', group: '小学A组', judge: '张专家', score: 92.5, status: '已评审' },
      { id: 'W002', title: '祖国颂', student: '李小红', group: '小学B组', judge: '李教授', score: 88.0, status: '已评审' },
      { id: 'W003', title: '未来已来', student: '张小刚', group: '初中组', judge: '-', score: '-', status: '待评审' },
      { id: 'W004', title: '少年中国说', student: '陈小花', group: '小学A组', judge: '张专家', score: 90.0, status: '已评审' },
      { id: 'W005', title: 'English Speech', student: 'Lucy', group: '高中组', judge: '钱评委', score: '-', status: '评审中' },
  ];

  // Mock Works Data for Detail View (Judge context)
  const mockWorksJudge = [
      { id: 'J001', title: '我的家乡', student: '王小明', group: '小学A组', competition: '第五届演讲大赛', score: 92.5, status: '已评审' },
      { id: 'J002', title: '少年中国说', student: '陈小花', group: '小学A组', competition: '第五届演讲大赛', score: 90.0, status: '已评审' },
      { id: 'J003', title: '红旗飘飘', student: '赵六', group: '小学A组', competition: '第五届演讲大赛', score: '-', status: '待评审' },
  ];

  return (
    <div className="space-y-6 relative h-full">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-black text-stone-800 font-serif">评审概览</h1>
            
            {/* View Toggle */}
            <div className="flex bg-white p-1 rounded-xl border border-stone-200 shadow-sm">
                <button 
                    onClick={() => setViewMode('judge')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center ${viewMode === 'judge' ? 'bg-stone-800 text-white shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}
                >
                    <Users size={14} className="mr-1.5" /> 按评委查看
                </button>
                <button 
                    onClick={() => setViewMode('competition')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center ${viewMode === 'competition' ? 'bg-stone-800 text-white shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}
                >
                    <Trophy size={14} className="mr-1.5" /> 按赛事查看
                </button>
            </div>
        </div>

        {/* Stats Cards (Dynamic based on view) */}
        <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                <div className="text-xs text-stone-500 font-bold uppercase mb-2">
                    {viewMode === 'judge' ? '活跃评委数' : '进行中赛事'}
                </div>
                <div className="text-3xl font-black text-stone-800 font-serif">
                    {viewMode === 'judge' ? judges.filter(j => j.status !== 'idle').length : competitions.length}
                </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                <div className="text-xs text-stone-500 font-bold uppercase mb-2">待评审作品总数</div>
                <div className="text-3xl font-black text-stone-800 font-serif">1,240</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                <div className="text-xs text-stone-500 font-bold uppercase mb-2">整体评审进度</div>
                <div className="text-3xl font-black text-[#7f1d1d] font-serif">62%</div>
            </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden min-h-[500px]">
            {viewMode === 'judge' ? (
                // Judge View Table
                <div className="p-6">
                    <h3 className="font-bold text-stone-800 mb-4 flex items-center">
                        <Users size={18} className="mr-2 text-stone-400" /> 评委工作状态
                    </h3>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-xs text-stone-500 border-b border-stone-100 uppercase tracking-wider">
                                <th className="pb-3 pl-2">评委姓名</th>
                                <th className="pb-3">专业标签</th>
                                <th className="pb-3">当前状态</th>
                                <th className="pb-3">当前负荷</th>
                                <th className="pb-3">累计评审</th>
                                <th className="pb-3 text-right pr-2">操作</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {judges.map(judge => (
                                <tr key={judge.id} onClick={() => { setSelectedJudge(judge); setDrawerTab('stats'); }} className="border-b border-stone-50 last:border-0 group hover:bg-stone-50 transition-colors cursor-pointer">
                                    <td className="py-4 pl-2 font-bold text-stone-800">{judge.name}</td>
                                    <td className="py-4">
                                        <div className="flex gap-2">
                                            {judge.tags.map(tag => (
                                                <span key={tag} className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded text-[10px] font-bold border border-stone-200">{tag}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                                            judge.status === 'active' ? 'bg-green-50 text-green-600 border-green-100' :
                                            judge.status === 'busy' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                            'bg-stone-100 text-stone-500 border-stone-200'
                                        }`}>
                                            {judge.status === 'active' ? '工作中' : judge.status === 'busy' ? '高负荷' : '空闲'}
                                        </span>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex items-center w-32">
                                            <div className="flex-1 h-2 bg-stone-100 rounded-full mr-3 overflow-hidden">
                                                <div 
                                                    className={`h-full rounded-full ${judge.load/judge.maxLoad > 0.8 ? 'bg-amber-500' : 'bg-green-500'}`} 
                                                    style={{ width: `${(judge.load / judge.maxLoad) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-stone-500 font-mono w-12 text-right">{judge.load}/{judge.maxLoad}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 font-mono text-stone-600">{judge.reviewed}</td>
                                    <td className="py-4 text-right pr-2">
                                        <button className="p-1.5 hover:bg-stone-200 rounded text-stone-400 hover:text-[#7f1d1d] transition-colors">
                                            <Sliders size={16}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                // Competition View List
                <div className="p-6 space-y-4">
                    <h3 className="font-bold text-stone-800 mb-4 flex items-center">
                        <Trophy size={18} className="mr-2 text-stone-400" /> 赛事评审进度
                    </h3>
                    {competitions.map(comp => (
                        <div key={comp.id} onClick={() => { setSelectedCompetition(comp); setDrawerTab('stats'); }} className="border border-stone-200 rounded-xl p-5 hover:shadow-md transition-all group cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="text-lg font-bold text-stone-800 mb-1 group-hover:text-[#7f1d1d] transition-colors">{comp.title}</h4>
                                    <div className="flex items-center gap-3 text-xs text-stone-500">
                                        <span className="bg-stone-100 px-2 py-0.5 rounded border border-stone-200">{comp.stage}</span>
                                        <span className="flex items-center"><Calendar size={12} className="mr-1"/> 截止: {comp.deadline}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-black font-serif text-stone-800">{comp.progress}%</div>
                                    <div className="text-xs text-stone-400">完成度</div>
                                </div>
                            </div>
                            
                            <div className="relative pt-2">
                                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden mb-3">
                                    <div className={`h-full rounded-full ${comp.progress === 100 ? 'bg-green-500' : 'bg-[#7f1d1d]'}`} style={{ width: `${comp.progress}%` }}></div>
                                </div>
                                <div className="flex justify-between items-center text-xs text-stone-500 border-t border-stone-50 pt-3">
                                    <div className="flex gap-4">
                                        <span className="flex items-center"><MonitorPlay size={14} className="mr-1.5 text-stone-400"/> 已评 {comp.reviewed} / 总数 {comp.total}</span>
                                        <span className="flex items-center"><Gavel size={14} className="mr-1.5 text-stone-400"/> {comp.judges} 位评委参与</span>
                                    </div>
                                    <button className="font-bold text-stone-400 hover:text-[#7f1d1d] flex items-center transition-colors">
                                        查看详情 <ArrowRight size={14} className="ml-1" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* Judge Detail Drawer */}
        {selectedJudge && (
            <div className="fixed inset-0 z-50 flex justify-end">
                <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm transition-opacity" onClick={() => setSelectedJudge(null)}></div>
                <div className="bg-white w-[600px] h-full shadow-2xl relative z-10 animate-slide-left flex flex-col border-l border-stone-200">
                    <div className="h-16 border-b border-stone-100 flex items-center justify-between px-6 bg-stone-50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center font-bold text-stone-500">
                                {selectedJudge.name[0]}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-stone-800">{selectedJudge.name}</h2>
                                <div className="flex gap-2 text-xs">
                                    {selectedJudge.tags.map((t: string) => <span key={t} className="text-stone-500 bg-white border border-stone-200 px-1.5 rounded">{t}</span>)}
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setSelectedJudge(null)} className="text-stone-400 hover:text-stone-600"><X size={20} /></button>
                    </div>

                    <div className="flex border-b border-stone-100">
                        <button 
                            onClick={() => setDrawerTab('stats')}
                            className={`flex-1 py-3 text-sm font-bold text-center ${drawerTab === 'stats' ? 'text-[#7f1d1d] border-b-2 border-[#7f1d1d]' : 'text-stone-500 hover:bg-stone-50'}`}
                        >
                            进度概览
                        </button>
                        <button 
                            onClick={() => setDrawerTab('works')}
                            className={`flex-1 py-3 text-sm font-bold text-center ${drawerTab === 'works' ? 'text-[#7f1d1d] border-b-2 border-[#7f1d1d]' : 'text-stone-500 hover:bg-stone-50'}`}
                        >
                            分配作品 ({mockWorksJudge.length})
                        </button>
                    </div>
                    
                    <div className="p-6 flex-1 overflow-y-auto space-y-6 bg-stone-50/30">
                        {drawerTab === 'stats' ? (
                            <>
                                {/* Stats Grid */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-white p-4 rounded-xl border border-stone-100 text-center shadow-sm">
                                        <div className="text-2xl font-black text-stone-800 font-serif">{selectedJudge.reviewed}</div>
                                        <div className="text-xs text-stone-500 mt-1">已评审作品</div>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-stone-100 text-center shadow-sm">
                                        <div className="text-2xl font-black text-[#7f1d1d] font-serif">{selectedJudge.pending}</div>
                                        <div className="text-xs text-stone-500 mt-1">待评审</div>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-stone-100 text-center shadow-sm">
                                        <div className="text-2xl font-black text-green-600 font-serif">{selectedJudge.avgTime}</div>
                                        <div className="text-xs text-stone-500 mt-1">平均耗时</div>
                                    </div>
                                </div>

                                {/* Current Tasks */}
                                <div>
                                    <h3 className="font-bold text-stone-800 text-sm mb-3">当前任务</h3>
                                    <div className="border border-stone-200 rounded-xl p-4 space-y-4 bg-white shadow-sm">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Trophy size={16}/></div>
                                                <div>
                                                    <div className="font-bold text-stone-700 text-sm">第五届“讲好中国故事”演讲大赛</div>
                                                    <div className="text-xs text-stone-400 mt-0.5">小学A组 · 复赛</div>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">进行中</span>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-stone-500">任务进度</span>
                                                <span className="font-bold text-stone-700">12 / 50</span>
                                            </div>
                                            <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-500 w-[24%]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-stone-50 text-xs font-bold text-stone-500 uppercase border-b border-stone-100">
                                        <tr>
                                            <th className="p-3 pl-4">作品</th>
                                            <th className="p-3">赛事</th>
                                            <th className="p-3 text-right">分数</th>
                                            <th className="p-3 text-right pr-4">状态</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone-50">
                                        {mockWorksJudge.map((work) => (
                                            <tr key={work.id} className="hover:bg-stone-50 transition-colors">
                                                <td className="p-3 pl-4">
                                                    <div className="font-bold text-stone-700">{work.title}</div>
                                                    <div className="text-[10px] text-stone-500">{work.student}</div>
                                                </td>
                                                <td className="p-3">
                                                    <div className="text-xs text-stone-600 truncate max-w-[100px]">{work.competition}</div>
                                                    <div className="text-[10px] text-stone-400">{work.group}</div>
                                                </td>
                                                <td className="p-3 text-right font-mono font-bold">{work.score}</td>
                                                <td className="p-3 text-right pr-4">
                                                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                                                        work.status === '已评审' ? 'bg-green-50 text-green-600 border-green-100' :
                                                        work.status === '评审中' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                        'bg-stone-100 text-stone-500 border-stone-200'
                                                    }`}>
                                                        {work.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

        {/* Competition Detail Drawer */}
        {selectedCompetition && (
            <div className="fixed inset-0 z-50 flex justify-end">
                <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm transition-opacity" onClick={() => setSelectedCompetition(null)}></div>
                <div className="bg-white w-[700px] h-full shadow-2xl relative z-10 animate-slide-left flex flex-col border-l border-stone-200">
                    <div className="h-16 border-b border-stone-100 flex items-center justify-between px-6 bg-stone-50">
                        <div>
                            <h2 className="text-lg font-bold text-stone-800 line-clamp-1">{selectedCompetition.title}</h2>
                            <p className="text-xs text-stone-500">{selectedCompetition.stage}</p>
                        </div>
                        <button onClick={() => setSelectedCompetition(null)} className="text-stone-400 hover:text-stone-600"><X size={20} /></button>
                    </div>

                    <div className="flex border-b border-stone-100">
                        <button 
                            onClick={() => setDrawerTab('stats')}
                            className={`flex-1 py-3 text-sm font-bold text-center ${drawerTab === 'stats' ? 'text-[#7f1d1d] border-b-2 border-[#7f1d1d]' : 'text-stone-500 hover:bg-stone-50'}`}
                        >
                            进度概览
                        </button>
                        <button 
                            onClick={() => setDrawerTab('works')}
                            className={`flex-1 py-3 text-sm font-bold text-center ${drawerTab === 'works' ? 'text-[#7f1d1d] border-b-2 border-[#7f1d1d]' : 'text-stone-500 hover:bg-stone-50'}`}
                        >
                            作品明细
                        </button>
                    </div>

                    <div className="p-6 flex-1 overflow-y-auto space-y-8 bg-stone-50/30">
                        {drawerTab === 'stats' ? (
                            <>
                                {/* Overall Progress */}
                                <div className="bg-[#1c1917] rounded-2xl p-6 text-white shadow-lg">
                                    <div className="flex justify-between items-end mb-2">
                                        <div>
                                            <div className="text-xs text-stone-400 font-bold uppercase mb-1">总体评审进度</div>
                                            <div className="text-3xl font-black font-serif">{selectedCompetition.progress}%</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-bold">{selectedCompetition.reviewed} / {selectedCompetition.total}</div>
                                            <div className="text-xs text-stone-500">已评 / 总数</div>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden mt-4">
                                        <div className="h-full bg-green-500" style={{width: `${selectedCompetition.progress}%`}}></div>
                                    </div>
                                </div>

                                {/* Group Breakdown */}
                                <div>
                                    <h3 className="font-bold text-stone-800 text-sm mb-4">组别进度明细</h3>
                                    <div className="space-y-4">
                                        {selectedCompetition.groups.map((group: any, idx: number) => (
                                            <div key={idx} className="bg-white p-4 rounded-xl border border-stone-200">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-bold text-stone-700 text-sm">{group.name}</span>
                                                    <span className={`text-xs font-bold ${group.progress === 100 ? 'text-green-600' : 'text-[#7f1d1d]'}`}>{group.progress}%</span>
                                                </div>
                                                <div className="h-2 bg-stone-100 rounded-full overflow-hidden mb-2">
                                                    <div className={`h-full ${group.progress === 100 ? 'bg-green-500' : 'bg-[#7f1d1d]'}`} style={{width: `${group.progress}%`}}></div>
                                                </div>
                                                <div className="flex justify-between text-xs text-stone-400">
                                                    <span>已评: {group.reviewed}</span>
                                                    <span>待评: {group.total - group.reviewed}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Judge List */}
                                <div>
                                    <h3 className="font-bold text-stone-800 text-sm mb-4">参与评委 ({selectedCompetition.judges})</h3>
                                    <div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-stone-50 text-xs font-bold text-stone-500 uppercase border-b border-stone-100">
                                                <tr>
                                                    <th className="p-3">评委</th>
                                                    <th className="p-3 text-center">分配量</th>
                                                    <th className="p-3 text-center">已完成</th>
                                                    <th className="p-3 text-right">进度</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-stone-50">
                                                {[1,2,3].map(i => (
                                                    <tr key={i}>
                                                        <td className="p-3 font-bold text-stone-700">评委 {i}</td>
                                                        <td className="p-3 text-center text-stone-600 font-mono">50</td>
                                                        <td className="p-3 text-center text-stone-600 font-mono">{i*15}</td>
                                                        <td className="p-3 text-right font-bold text-stone-800">{Math.round((i*15/50)*100)}%</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-stone-50 text-xs font-bold text-stone-500 uppercase border-b border-stone-100">
                                        <tr>
                                            <th className="p-3 pl-4">作品</th>
                                            <th className="p-3">选手</th>
                                            <th className="p-3">组别</th>
                                            <th className="p-3">评审人</th>
                                            <th className="p-3 text-right">分数</th>
                                            <th className="p-3 text-right pr-4">状态</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone-50">
                                        {mockWorksCompetition.map((work) => (
                                            <tr key={work.id} className="hover:bg-stone-50 transition-colors">
                                                <td className="p-3 pl-4 font-bold text-stone-700">{work.title}</td>
                                                <td className="p-3 text-stone-600">{work.student}</td>
                                                <td className="p-3 text-stone-500 text-xs">{work.group}</td>
                                                <td className="p-3 text-stone-600">{work.judge}</td>
                                                <td className="p-3 text-right font-mono font-bold">{work.score}</td>
                                                <td className="p-3 text-right pr-4">
                                                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                                                        work.status === '已评审' ? 'bg-green-50 text-green-600 border-green-100' :
                                                        work.status === '评审中' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                        'bg-stone-100 text-stone-500 border-stone-200'
                                                    }`}>
                                                        {work.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default ReviewOverview;
