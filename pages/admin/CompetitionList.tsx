import React, { useState } from 'react';
import { Plus, Search, Filter, Edit3, Trash2, Eye, Settings, X, Calendar, Layers, ChevronDown, Check, PlusCircle, Trash, Mic, BookOpen, User, Globe, MessageCircle, AlertCircle, Clock, Users, Layout, ChevronRight, GitMerge, Zap, MapPin, ToggleLeft, ToggleRight, FileBadge, Award, TrendingUp, Monitor, MonitorPlay, Video, Locate, Image as ImageIcon, Type, LayoutTemplate, FileText, Camera, Music, Wifi, Archive, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CompetitionEditor from '../../components/CompetitionEditor';

const CompetitionList: React.FC = () => {
  const navigate = useNavigate();
  const [showEditor, setShowEditor] = useState(false);
  const [editorInitialData, setEditorInitialData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  
  const tracks = [
      { id: 't1', name: '中文演讲赛道', code: 'T1', icon: Mic, description: '个人演讲，考察语言表达能力' },
      { id: 't2', name: '经典诵读赛道', code: 'T2', icon: BookOpen, description: '经典诵读，考察发音与情感' },
      { id: 't3', name: '英文演讲赛道', code: 'T3', icon: Globe, description: '英语风采，国际视野' },
      { id: 't4', name: '主持人赛道', code: 'T4', icon: User, description: '模拟主持，考察控场与应变' },
      { id: 't5', name: '辩论赛道', code: 'T5', icon: MessageCircle, description: '逻辑思辨，语言交锋' },
  ];

  const activeCompetitions: Record<string, any> = {
      't1': { id: '202503', title: '第五届“讲好中国故事”全国青少年语言素养大赛', status: '进行中', structure: 'promotion', currentStageMode: 'online', groups: ['小学A组', '小学B组', '初中组'], applicants: 12540, deadline: '2025-10-25', daysLeft: 12 },
      't2': { id: '202502', title: '经典诗文诵读挑战赛', status: '已结束', structure: 'single', mode: 'online', groups: ['小学组', '初中组'], applicants: 8900, deadline: '2025-09-10', daysLeft: 0 },
      't4': { id: '202504', title: '“金话筒”青少年主持人大赛', status: '草稿', structure: 'promotion', currentStageMode: 'online', groups: ['初中组', '高中组'], applicants: 0, deadline: '2025-12-01', daysLeft: 45 },
      't5': { id: '202505', title: '首届青少年辩论邀请赛', status: '未开始', structure: 'single', mode: 'offline', address: '北京市海淀区少年宫', groups: ['初中组', '高中组'], applicants: 0, deadline: '2025-12-20', daysLeft: 60 }
  };

  // Mock History Data
  const historyCompetitions = [
      { id: '202401', trackName: '中文演讲赛道', title: '第四届“讲好中国故事”全国青少年语言素养大赛', startDate: '2024-03-01', endDate: '2024-10-30', applicants: 15420 },
      { id: '202402', trackName: '经典诵读赛道', title: '2024中华经典诵读大会', startDate: '2024-04-15', endDate: '2024-09-20', applicants: 9850 },
      { id: '202301', trackName: '中文演讲赛道', title: '第三届“讲好中国故事”全国青少年语言素养大赛', startDate: '2023-03-10', endDate: '2023-11-05', applicants: 12100 },
      { id: '202303', trackName: '英文演讲赛道', title: '2023国际青少年英语风采大赛', startDate: '2023-05-01', endDate: '2023-12-15', applicants: 6500 },
  ];

  // Determine which tracks are occupied (have an active competition)
  const occupiedTracks = Object.keys(activeCompetitions).filter(key => {
      const status = activeCompetitions[key].status;
      return status !== '已结束';
  });

  const handleCreate = (preselectedTrackId?: string) => {
      if (preselectedTrackId && occupiedTracks.includes(preselectedTrackId)) {
          alert('该赛道已有正在进行或未开始的赛事，无法创建新赛事。请先结束当前赛事或选择其他赛道。');
          return;
      }
      setEditorInitialData(preselectedTrackId ? { track: preselectedTrackId } : null);
      setShowEditor(true);
  };

  const handleEditDraft = (comp: any) => {
      // Mock loading data into editor
      setEditorInitialData({
          ...comp,
          track: Object.keys(activeCompetitions).find(key => activeCompetitions[key].id === comp.id),
      });
      setShowEditor(true);
  };

  const handleSaveCompetition = (data: any, isDraft: boolean) => {
      console.log('Saving competition:', data, 'Draft:', isDraft);
      alert(isDraft ? '已保存到草稿箱' : '赛事发布成功！');
      setShowEditor(false);
  };

  const getStatusStyle = (status: string) => {
      switch(status) {
          case '进行中': case '报名中': return 'bg-green-50 text-green-600 border-green-100';
          case '已结束': return 'bg-stone-100 text-stone-500 border-stone-200';
          case '草稿': return 'bg-amber-50 text-amber-600 border-amber-100';
          case '未开始': return 'bg-blue-50 text-blue-600 border-blue-100';
          default: return 'bg-stone-100 text-stone-500';
      }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
            <h1 className="text-3xl font-black text-stone-800 font-serif mb-2">赛事管理</h1>
            <p className="text-stone-500 text-sm">基于赛道创建和管理赛事，每个赛道同一时间仅允许一个活跃赛事。</p>
        </div>
        <button 
            onClick={() => handleCreate()}
            className="bg-[#7f1d1d] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-red-900/20 hover:bg-[#991b1b] transition-colors flex items-center"
        >
            <Plus size={20} className="mr-2" /> 创建新赛事
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-stone-100 p-1 rounded-xl w-fit">
          <button 
            onClick={() => setActiveTab('active')}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center ${activeTab === 'active' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
          >
              <Zap size={16} className="mr-2" /> 进行中 / 未开始
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center ${activeTab === 'history' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
          >
              <History size={16} className="mr-2" /> 历史赛事 ({historyCompetitions.length})
          </button>
      </div>

      {/* Content Area */}
      {activeTab === 'active' ? (
          <div className="grid grid-cols-1 gap-6 animate-fade-in">
              {tracks.map(track => {
                  const comp = activeCompetitions[track.id];
                  return (
                      <div key={track.id} className="bg-white rounded-2xl border border-stone-200 shadow-sm flex overflow-hidden min-h-[180px] group transition-all hover:shadow-md relative">
                          {/* Left: Track Info */}
                          <div className="w-64 bg-stone-50/30 border-r border-stone-100 p-8 flex flex-col justify-center items-center text-center flex-shrink-0 relative">
                              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-stone-100 mb-4 text-[#7f1d1d] group-hover:scale-110 transition-transform duration-300">
                                  <track.icon size={28} strokeWidth={1.5} />
                              </div>
                              <h3 className="font-black text-stone-800 text-lg font-serif mb-1">{track.name}</h3>
                              <p className="text-xs font-bold text-stone-400 font-mono">赛道代码: {track.code}</p>
                          </div>

                          {/* Right: Competition Details */}
                          <div className="flex-1 p-8 flex flex-col justify-center relative">
                              {comp ? (
                                  <div className="flex flex-col h-full justify-between">
                                      {/* Status Badge */}
                                      <div className="absolute top-6 right-6">
                                          <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full border ${getStatusStyle(comp.status)}`}>{comp.status}</span>
                                      </div>

                                      <div className="flex justify-between items-start pr-20">
                                          <div>
                                              <div className="flex items-center gap-2 mb-2">
                                                  {comp.structure === 'promotion' ? (
                                                      <span className="text-[10px] font-bold bg-purple-50 text-purple-600 px-2 py-0.5 rounded border border-purple-100 flex items-center">
                                                          <GitMerge size={12} className="mr-1"/> 晋级制
                                                      </span>
                                                  ) : (
                                                      <span className="text-[10px] font-bold bg-green-50 text-green-600 px-2 py-0.5 rounded border border-green-100 flex items-center">
                                                          <Zap size={12} className="mr-1"/> 单项赛
                                                      </span>
                                                  )}
                                                  {/* Mode Badge */}
                                                  {comp.structure === 'single' ? (
                                                      comp.mode === 'offline' ? (
                                                          <span className="text-[10px] font-bold bg-stone-100 text-stone-600 px-2 py-0.5 rounded border border-stone-200 flex items-center">
                                                              <MapPin size={12} className="mr-1"/> 线下赛
                                                          </span>
                                                      ) : (
                                                          <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100 flex items-center">
                                                              <Monitor size={12} className="mr-1"/> 线上赛
                                                          </span>
                                                      )
                                                  ) : (
                                                      comp.currentStageMode === 'offline' ? (
                                                          <span className="text-[10px] font-bold bg-stone-100 text-stone-600 px-2 py-0.5 rounded border border-stone-200 flex items-center">
                                                              <MapPin size={12} className="mr-1"/> 当前线下
                                                          </span>
                                                      ) : (
                                                          <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100 flex items-center">
                                                              <Monitor size={12} className="mr-1"/> 当前线上
                                                          </span>
                                                      )
                                                  )}
                                              </div>
                                              <h2 
                                                onClick={() => navigate(`/competitions/${comp.id}`)}
                                                className="text-2xl font-black text-stone-800 font-serif leading-tight mb-3 hover:text-[#7f1d1d] hover:underline decoration-2 underline-offset-4 transition-all cursor-pointer"
                                              >
                                                  {comp.title}
                                              </h2>
                                              <div className="flex items-center gap-2">
                                                  <span className="text-xs text-stone-400 mr-1">包含组别:</span>
                                                  {comp.groups.map((grp: string) => (
                                                      <span key={grp} className="text-[10px] font-bold px-2 py-1 rounded bg-stone-100 text-stone-600 border border-stone-200">
                                                          {grp}
                                                      </span>
                                                  ))}
                                              </div>
                                          </div>
                                      </div>

                                      <div className="flex items-center justify-between mt-6 pt-6 border-t border-stone-50">
                                          <div className="flex space-x-8">
                                              <div className="flex items-center text-stone-600">
                                                  <Users size={18} className="mr-2 text-stone-400" />
                                                  <span className="text-sm font-bold">{comp.applicants.toLocaleString()}</span>
                                                  <span className="text-xs text-stone-400 ml-1">报名</span>
                                              </div>
                                              <div className="flex items-center text-stone-600">
                                                  <Clock size={18} className="mr-2 text-stone-400" />
                                                  <span className="text-sm font-bold">截止: {comp.deadline}</span>
                                                  {(comp.status === '进行中' || comp.status === '报名中') && <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded ml-2 font-bold">{comp.daysLeft}天后</span>}
                                              </div>
                                          </div>
                                          
                                          <div className="flex gap-2">
                                              {(comp.status === '草稿' || comp.status === '未开始') && (
                                                  <button 
                                                      onClick={() => handleEditDraft(comp)}
                                                      className="px-4 py-2 bg-white border border-stone-200 text-stone-600 font-bold text-xs rounded-lg hover:bg-stone-50 hover:text-[#7f1d1d] flex items-center transition-colors shadow-sm"
                                                  >
                                                      <Edit3 size={14} className="mr-1" /> 编辑
                                                  </button>
                                              )}
                                              <button 
                                                onClick={() => navigate(`/competitions/${comp.id}`)}
                                                className="px-4 py-2 bg-stone-50 text-stone-600 font-bold text-xs rounded-lg hover:bg-stone-100 border border-stone-100 flex items-center transition-colors"
                                              >
                                                  管理赛事 <ChevronRight size={14} className="ml-1" />
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                              ) : (
                                  <div className="w-full h-full border-2 border-dashed border-stone-200 rounded-xl flex flex-col items-center justify-center bg-stone-50/30 hover:bg-stone-50 hover:border-stone-300 transition-colors cursor-pointer" onClick={() => handleCreate(track.id)}>
                                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 text-stone-300 group-hover:text-[#7f1d1d] transition-colors">
                                          <Plus size={24} />
                                      </div>
                                      <p className="text-stone-400 text-sm font-bold">该赛道暂无活跃赛事</p>
                                      <button className="mt-3 text-[#7f1d1d] text-xs font-bold flex items-center">
                                          <Plus size={14} className="mr-1" /> 创建赛事
                                      </button>
                                  </div>
                              )}
                          </div>
                      </div>
                  );
              })}
          </div>
      ) : (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden animate-fade-in flex-1">
              <div className="p-6 border-b border-stone-100 bg-stone-50/30 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                      <Archive size={18} className="text-stone-400" />
                      <h3 className="font-bold text-stone-800">历史赛事归档</h3>
                  </div>
                  <div className="text-xs font-bold text-stone-400">共 {historyCompetitions.length} 条记录</div>
              </div>
              <table className="w-full text-left">
                  <thead className="bg-stone-50 border-b border-stone-200 text-xs font-bold text-stone-500 uppercase">
                      <tr>
                          <th className="p-5 pl-6">赛事名称</th>
                          <th className="p-5">所属赛道</th>
                          <th className="p-5">举办时间</th>
                          <th className="p-5">报名人数</th>
                          <th className="p-5">状态</th>
                          <th className="p-5 text-right pr-6">操作</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-sm">
                      {historyCompetitions.map(comp => (
                          <tr key={comp.id} className="hover:bg-stone-50 transition-colors group">
                              <td className="p-5 pl-6 font-bold text-stone-800">{comp.title}</td>
                              <td className="p-5 text-stone-600">{comp.trackName}</td>
                              <td className="p-5 text-stone-500 font-mono text-xs">{comp.startDate} ~ {comp.endDate}</td>
                              <td className="p-5 text-stone-600 font-bold">{comp.applicants.toLocaleString()}</td>
                              <td className="p-5">
                                  <span className="px-2.5 py-1 bg-stone-100 text-stone-500 rounded text-xs font-bold border border-stone-200 flex w-fit items-center">
                                      <div className="w-1.5 h-1.5 rounded-full bg-stone-400 mr-1.5"></div> 已结束
                                  </span>
                              </td>
                              <td className="p-5 text-right pr-6">
                                  <button onClick={() => navigate(`/competitions/${comp.id}`)} className="text-[#7f1d1d] text-xs font-bold hover:underline bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 hover:bg-red-100 transition-colors">
                                      查看详情
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              {historyCompetitions.length === 0 && (
                  <div className="p-12 text-center text-stone-400 flex flex-col items-center">
                      <Archive size={48} className="mb-4 opacity-20" />
                      <p className="text-sm font-medium">暂无历史赛事数据</p>
                  </div>
              )}
          </div>
      )}

      {showEditor && (
          <CompetitionEditor 
              initialData={editorInitialData} 
              occupiedTracks={occupiedTracks}
              onSave={handleSaveCompetition} 
              onClose={() => setShowEditor(false)} 
          />
      )}
    </div>
  );
};

export default CompetitionList;