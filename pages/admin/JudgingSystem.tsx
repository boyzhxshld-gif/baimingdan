
import React, { useState, useMemo } from 'react';
import { Users, RefreshCw, Sliders, UserCheck, FileText, Check, Search, Filter, ChevronRight, BarChart3, Zap, GitMerge, MapPin, School, Play, X, Trash2, Calendar, MessageSquare, Clock, Save, ChevronDown } from 'lucide-react';

const JudgingSystem: React.FC = () => {
  const [showSelectedDrawer, setShowSelectedDrawer] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  // Task Config State
  const [taskConfig, setTaskConfig] = useState({
      name: '',
      deadline: '',
      notes: ''
  });

  // Mock Judges with Expanded Fields
  const judges = [
      { id: 1, name: '张专家', tags: ['演讲', '小学组'], recommender: '语协', load: 12, maxLoad: 50, status: 'active' },
      { id: 2, name: '李教授', tags: ['朗诵', '中学组'], recommender: '传媒大学', load: 28, maxLoad: 50, status: 'busy' },
      { id: 3, name: '王主持', tags: ['主持', '综合'], recommender: '电视台', load: 5, maxLoad: 50, status: 'idle' },
      { id: 4, name: '赵老师', tags: ['演讲', '高中组'], recommender: '新东方', load: 0, maxLoad: 50, status: 'idle' },
      { id: 5, name: '钱评委', tags: ['英语', '综合'], recommender: '外研社', load: 45, maxLoad: 50, status: 'busy' },
  ];

  const recommenders = ['语协', '传媒大学', '电视台', '新东方', '外研社', '作协', '教委'];

  // Mock Pending Works
  const pendingWorks = [
      { id: 'W001', title: '我的家乡', student: '王小明', track: '演讲', group: '小学A组', structure: 'promotion', region: '北京赛区', school: '海淀实验小学', submitTime: '10:30', cover: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=200&auto=format&fit=crop&q=60' },
      { id: 'W002', title: '祖国颂', student: '李小红', track: '朗诵', group: '小学B组', structure: 'single', region: '华东赛区', school: '上海实验小学', submitTime: '11:15', cover: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&auto=format&fit=crop&q=60' },
      { id: 'W003', title: '未来已来', student: '张小刚', track: '演讲', group: '初中组', structure: 'promotion', region: '北京赛区', school: '人大附中', submitTime: '09:45', cover: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=200&auto=format&fit=crop&q=60' },
      { id: 'W004', title: 'English Speech', student: 'Lucy', track: '英语', group: '高中组', structure: 'promotion', region: '线上赛区', school: '新东方', submitTime: '14:20', cover: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=200&auto=format&fit=crop&q=60' },
      { id: 'W005', title: '少年中国说', student: '陈小花', track: '朗诵', group: '小学A组', structure: 'promotion', region: '华南赛区', school: '深圳中学', submitTime: '10:00', cover: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=60' },
  ];

  // States
  const [selectedWorkIds, setSelectedWorkIds] = useState<string[]>([]);
  const [selectedJudgeIds, setSelectedJudgeIds] = useState<number[]>([]);
  const [allocationMethod, setAllocationMethod] = useState<'average' | 'speed'>('average');
  
  // Work Filters
  const [filterTrack, setFilterTrack] = useState('all');
  const [filterGroup, setFilterGroup] = useState('all');
  const [filterStructure, setFilterStructure] = useState('all');
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterSchool, setFilterSchool] = useState('all');

  // Judge Filters
  const [filterJudgeTrack, setFilterJudgeTrack] = useState('all');
  const [filterJudgeRecommender, setFilterJudgeRecommender] = useState<string[]>([]);
  const [showRecommenderDropdown, setShowRecommenderDropdown] = useState(false);

  // Work Filter Logic
  const filteredWorks = useMemo(() => {
      return pendingWorks.filter(work => {
          const matchTrack = filterTrack === 'all' || work.track === filterTrack;
          const matchGroup = filterGroup === 'all' || work.group === filterGroup;
          const matchStructure = filterStructure === 'all' || work.structure === filterStructure;
          const matchRegion = filterRegion === 'all' || work.region === filterRegion;
          const matchSchool = filterSchool === 'all' || work.school === filterSchool;
          return matchTrack && matchGroup && matchStructure && matchRegion && matchSchool;
      });
  }, [filterTrack, filterGroup, filterStructure, filterRegion, filterSchool]);

  // Judge Filter Logic
  const filteredJudges = useMemo(() => {
      return judges.filter(judge => {
          const matchTrack = filterJudgeTrack === 'all' || judge.tags.some(tag => tag.includes(filterJudgeTrack));
          const matchRecommender = filterJudgeRecommender.length === 0 || filterJudgeRecommender.includes(judge.recommender);
          return matchTrack && matchRecommender;
      });
  }, [filterJudgeTrack, filterJudgeRecommender]);

  // Selection Handlers
  const toggleWorkSelection = (id: string) => {
      setSelectedWorkIds(prev => prev.includes(id) ? prev.filter(wid => wid !== id) : [...prev, id]);
  };

  const toggleAllWorks = () => {
      if (selectedWorkIds.length === filteredWorks.length) setSelectedWorkIds([]);
      else setSelectedWorkIds(filteredWorks.map(w => w.id));
  };

  const toggleJudgeSelection = (id: number) => {
      setSelectedJudgeIds(prev => prev.includes(id) ? prev.filter(jid => jid !== id) : [...prev, id]);
  };

  const toggleRecommenderFilter = (r: string) => {
      setFilterJudgeRecommender(prev => 
          prev.includes(r) ? prev.filter(i => i !== r) : [...prev, r]
      );
  };

  const handleConfirmAssignment = () => {
      if (!taskConfig.name || !taskConfig.deadline) return alert('请完善任务信息');
      
      alert(`已创建任务 "${taskConfig.name}"，共分配 ${selectedWorkIds.length} 个作品给 ${selectedJudgeIds.length} 位评委`);
      setShowConfirmModal(false);
      setSelectedWorkIds([]);
      setSelectedJudgeIds([]);
      setTaskConfig({ name: '', deadline: '', notes: '' });
  };

  // Calculation
  const estPerJudge = selectedJudgeIds.length > 0 ? Math.ceil(selectedWorkIds.length / selectedJudgeIds.length) : 0;

  // Selected Objects
  const selectedWorks = pendingWorks.filter(w => selectedWorkIds.includes(w.id));

  return (
    <div className="space-y-6 h-full flex flex-col relative">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-black text-stone-800 font-serif">评审分配</h1>
            <div className="text-sm font-bold text-stone-500 bg-stone-100 px-3 py-1.5 rounded-lg">
                任务分配与调度
            </div>
        </div>

        <div className="flex gap-6 h-[calc(100vh-10rem)] overflow-hidden relative">
            {/* Left: Pending Works Pool */}
            <div className="flex-[2] bg-white rounded-2xl shadow-sm border border-stone-200 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-stone-100 bg-stone-50/30">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-stone-800 flex items-center"><FileText size={16} className="mr-2 text-stone-400"/> 待分配作品池</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold bg-stone-100 text-stone-500 px-2 py-1 rounded">已选 {selectedWorkIds.length}</span>
                            {selectedWorkIds.length > 0 && (
                                <button 
                                    onClick={() => setShowSelectedDrawer(true)}
                                    className="text-xs font-bold text-[#7f1d1d] hover:underline"
                                >
                                    查看明细
                                </button>
                            )}
                        </div>
                    </div>
                    
                    {/* Filters Row 1 */}
                    <div className="flex gap-2 mb-2">
                        <select 
                            value={filterTrack} 
                            onChange={e => setFilterTrack(e.target.value)}
                            className="bg-white border border-stone-200 text-stone-600 text-xs font-bold px-3 py-2 rounded-lg outline-none focus:border-[#7f1d1d]"
                        >
                            <option value="all">所有赛道</option>
                            <option>演讲</option>
                            <option>朗诵</option>
                            <option>英语</option>
                        </select>
                        <select 
                            value={filterGroup} 
                            onChange={e => setFilterGroup(e.target.value)}
                            className="bg-white border border-stone-200 text-stone-600 text-xs font-bold px-3 py-2 rounded-lg outline-none focus:border-[#7f1d1d]"
                        >
                            <option value="all">所有组别</option>
                            <option>小学A组</option>
                            <option>小学B组</option>
                            <option>初中组</option>
                            <option>高中组</option>
                        </select>
                        <select 
                            value={filterStructure} 
                            onChange={e => setFilterStructure(e.target.value)}
                            className="bg-white border border-stone-200 text-stone-600 text-xs font-bold px-3 py-2 rounded-lg outline-none focus:border-[#7f1d1d]"
                        >
                            <option value="all">赛制类型</option>
                            <option value="promotion">晋级制</option>
                            <option value="single">单项赛</option>
                        </select>
                    </div>
                    
                    {/* Filters Row 2 */}
                    <div className="flex gap-2">
                        <select 
                            value={filterRegion} 
                            onChange={e => setFilterRegion(e.target.value)}
                            className="bg-white border border-stone-200 text-stone-600 text-xs font-bold px-3 py-2 rounded-lg outline-none focus:border-[#7f1d1d]"
                        >
                            <option value="all">所有赛区</option>
                            <option>北京赛区</option>
                            <option>华东赛区</option>
                            <option>华南赛区</option>
                            <option>线上赛区</option>
                        </select>
                        <select 
                            value={filterSchool} 
                            onChange={e => setFilterSchool(e.target.value)}
                            className="bg-white border border-stone-200 text-stone-600 text-xs font-bold px-3 py-2 rounded-lg outline-none focus:border-[#7f1d1d]"
                        >
                            <option value="all">所有学校/机构</option>
                            <option>海淀实验小学</option>
                            <option>人大附中</option>
                            <option>新东方</option>
                        </select>
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-0">
                    <table className="w-full text-left">
                        <thead className="text-xs text-stone-500 bg-stone-50 sticky top-0 z-10">
                            <tr>
                                <th className="p-3 w-10 text-center border-b border-stone-200">
                                    <input type="checkbox" className="accent-[#7f1d1d] cursor-pointer" 
                                        onChange={toggleAllWorks}
                                        checked={selectedWorkIds.length === filteredWorks.length && filteredWorks.length > 0}
                                    />
                                </th>
                                <th className="p-3 border-b border-stone-200">作品预览</th>
                                <th className="p-3 border-b border-stone-200">作品/选手信息</th>
                                <th className="p-3 border-b border-stone-200">属性</th>
                                <th className="p-3 border-b border-stone-200">来源</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {filteredWorks.map(work => (
                                <tr key={work.id} className={`hover:bg-stone-50 border-b border-stone-50 last:border-0 cursor-pointer ${selectedWorkIds.includes(work.id) ? 'bg-[#7f1d1d]/5' : ''}`} onClick={() => toggleWorkSelection(work.id)}>
                                    <td className="p-3 text-center" onClick={e => e.stopPropagation()}>
                                        <input 
                                            type="checkbox" 
                                            className="accent-[#7f1d1d] cursor-pointer"
                                            checked={selectedWorkIds.includes(work.id)}
                                            onChange={() => toggleWorkSelection(work.id)}
                                        />
                                    </td>
                                    <td className="p-3 w-24">
                                        <div className="w-20 h-12 bg-black rounded-lg overflow-hidden relative flex-shrink-0">
                                            <img src={work.cover} className="w-full h-full object-cover opacity-80" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Play size={16} className="text-white" fill="currentColor"/>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-3">
                                        <div className="font-bold text-stone-700 text-sm line-clamp-1">{work.title}</div>
                                        <div className="text-xs text-stone-400 font-normal flex items-center mt-0.5">
                                            {work.student} <span className="mx-1 text-stone-300">|</span> ID: {work.id}
                                        </div>
                                    </td>
                                    <td className="p-3">
                                        <div className="flex flex-wrap gap-1">
                                            <span className="text-[9px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">{work.track}</span>
                                            <span className="text-[9px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">{work.group}</span>
                                            {work.structure === 'promotion' ? <GitMerge size={10} className="text-purple-500"/> : <Zap size={10} className="text-green-500"/>}
                                        </div>
                                    </td>
                                    <td className="p-3 text-xs text-stone-500">
                                        <div className="flex items-center mb-0.5"><MapPin size={10} className="mr-1"/> {work.region}</div>
                                        <div className="flex items-center"><School size={10} className="mr-1"/> {work.school}</div>
                                    </td>
                                </tr>
                            ))}
                            {filteredWorks.length === 0 && (
                                <tr><td colSpan={5} className="p-10 text-center text-stone-400 text-sm">暂无匹配作品</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Right: Allocation Action Panel */}
            <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                {/* Step 1: Select Judges */}
                <div className="bg-white rounded-2xl shadow-sm border border-stone-200 flex-1 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-stone-100 bg-stone-50/30">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-stone-800 text-sm flex items-center"><UserCheck size={16} className="mr-2 text-stone-400"/> 选择评委 ({selectedJudgeIds.length})</h3>
                        </div>
                        {/* Judge Filters */}
                        <div className="flex gap-2">
                            <select 
                                value={filterJudgeTrack} 
                                onChange={e => setFilterJudgeTrack(e.target.value)}
                                className="bg-white border border-stone-200 text-stone-600 text-xs font-bold px-2 py-1.5 rounded-lg outline-none focus:border-[#7f1d1d] flex-1"
                            >
                                <option value="all">擅长赛道</option>
                                <option>演讲</option>
                                <option>朗诵</option>
                                <option>英语</option>
                                <option>主持</option>
                            </select>
                            
                            {/* Recommender Dropdown */}
                            <div className="relative flex-1">
                                <button 
                                    onClick={() => setShowRecommenderDropdown(!showRecommenderDropdown)}
                                    className="w-full bg-white border border-stone-200 text-stone-600 text-xs font-bold px-2 py-1.5 rounded-lg outline-none focus:border-[#7f1d1d] flex items-center justify-between"
                                >
                                    <span className="truncate">
                                        {filterJudgeRecommender.length > 0 ? `已选 ${filterJudgeRecommender.length} 项` : '推荐方'}
                                    </span>
                                    <ChevronDown size={12} />
                                </button>
                                
                                {showRecommenderDropdown && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setShowRecommenderDropdown(false)}></div>
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-stone-200 rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto p-2">
                                            {recommenders.map(r => (
                                                <div 
                                                    key={r}
                                                    onClick={() => toggleRecommenderFilter(r)}
                                                    className={`flex items-center px-2 py-1.5 rounded-lg cursor-pointer text-xs font-bold mb-1 ${filterJudgeRecommender.includes(r) ? 'bg-[#7f1d1d]/10 text-[#7f1d1d]' : 'hover:bg-stone-50 text-stone-600'}`}
                                                >
                                                    <div className={`w-3 h-3 rounded border mr-2 flex items-center justify-center ${filterJudgeRecommender.includes(r) ? 'bg-[#7f1d1d] border-[#7f1d1d]' : 'border-stone-300 bg-white'}`}>
                                                        {filterJudgeRecommender.includes(r) && <Check size={10} className="text-white" />}
                                                    </div>
                                                    {r}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto p-2 space-y-1">
                        {filteredJudges.map(judge => (
                            <div 
                                key={judge.id} 
                                onClick={() => toggleJudgeSelection(judge.id)}
                                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                                    selectedJudgeIds.includes(judge.id) 
                                    ? 'border-[#7f1d1d] bg-[#7f1d1d]/5' 
                                    : 'border-transparent hover:bg-stone-50'
                                }`}
                            >
                                <div className="flex items-center">
                                    <div className={`w-4 h-4 rounded border mr-3 flex items-center justify-center ${selectedJudgeIds.includes(judge.id) ? 'bg-[#7f1d1d] border-[#7f1d1d]' : 'border-stone-300 bg-white'}`}>
                                        {selectedJudgeIds.includes(judge.id) && <Check size={12} className="text-white" />}
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm text-stone-800 flex items-center">
                                            {judge.name}
                                            {judge.recommender && <span className="ml-2 text-[10px] text-stone-400 font-normal border px-1 rounded bg-white">{judge.recommender}</span>}
                                        </div>
                                        <div className="text-[10px] text-stone-400 flex gap-1 mt-0.5">
                                            {judge.tags.map(t => <span key={t} className="bg-stone-100 px-1 rounded">{t}</span>)}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-bold text-stone-500">{judge.load} / {judge.maxLoad}</div>
                                    <div className="w-16 h-1.5 bg-stone-100 rounded-full mt-1 overflow-hidden">
                                        <div className="h-full bg-green-500 rounded-full" style={{width: `${(judge.load/judge.maxLoad)*100}%`}}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step 2: Configuration & Action */}
                <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5 flex-shrink-0">
                    <h3 className="font-bold text-stone-800 text-sm mb-4 flex items-center"><Sliders size={16} className="mr-2 text-stone-400"/> 分配配置</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-stone-500 block mb-2">分配方式</label>
                            <div className="flex bg-stone-50 p-1 rounded-lg">
                                <button 
                                    onClick={() => setAllocationMethod('average')}
                                    className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${allocationMethod === 'average' ? 'bg-white text-[#7f1d1d] shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                                >
                                    平均分配
                                </button>
                                <button 
                                    onClick={() => setAllocationMethod('speed')}
                                    className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${allocationMethod === 'speed' ? 'bg-white text-[#7f1d1d] shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                                >
                                    速度优先
                                </button>
                            </div>
                        </div>

                        <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs text-stone-500">已选作品</span>
                                <span className="text-sm font-black text-stone-800">{selectedWorkIds.length}</span>
                            </div>
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-xs text-stone-500">已选评委</span>
                                <span className="text-sm font-black text-stone-800">{selectedJudgeIds.length}</span>
                            </div>
                            <div className="h-px w-full bg-stone-200 mb-3"></div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-[#7f1d1d]">预计人均新增</span>
                                <span className="text-lg font-black text-[#7f1d1d]">{estPerJudge} <span className="text-xs font-normal text-stone-400">个</span></span>
                            </div>
                        </div>

                        <button 
                            disabled={selectedWorkIds.length === 0 || selectedJudgeIds.length === 0}
                            onClick={() => setShowConfirmModal(true)}
                            className="w-full bg-[#7f1d1d] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-900/20 hover:bg-[#991b1b] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                        >
                            确认分配任务
                        </button>
                    </div>
                </div>
            </div>

            {/* Selected Works Drawer */}
            {showSelectedDrawer && (
                <div className="absolute inset-y-0 right-0 w-80 bg-white shadow-2xl z-20 border-l border-stone-200 flex flex-col animate-slide-left">
                    <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50">
                        <h3 className="font-bold text-stone-800 text-sm">已选作品 ({selectedWorks.length})</h3>
                        <button onClick={() => setShowSelectedDrawer(false)} className="text-stone-400 hover:text-stone-600"><X size={18} /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {selectedWorks.map(work => (
                            <div key={work.id} className="flex items-center bg-stone-50 p-2 rounded-xl border border-stone-100 relative group">
                                <div className="w-12 h-8 bg-black rounded overflow-hidden flex-shrink-0 mr-3">
                                    <img src={work.cover} className="w-full h-full object-cover opacity-80" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs font-bold text-stone-800 truncate">{work.title}</div>
                                    <div className="text-[10px] text-stone-500">{work.student}</div>
                                </div>
                                <button 
                                    onClick={() => toggleWorkSelection(work.id)}
                                    className="absolute top-1 right-1 p-1 bg-white rounded-full text-stone-400 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        ))}
                        {selectedWorks.length === 0 && <p className="text-xs text-stone-400 text-center py-4">暂无选择</p>}
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-md rounded-3xl p-6 relative animate-slide-up shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg text-stone-800 font-serif">确认分配任务</h3>
                            <button onClick={() => setShowConfirmModal(false)} className="p-2 rounded-full hover:bg-stone-100 text-stone-400"><X size={20}/></button>
                        </div>
                        
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="text-xs font-bold text-stone-500 mb-1.5 block">任务名称</label>
                                <input 
                                    value={taskConfig.name}
                                    onChange={e => setTaskConfig({...taskConfig, name: e.target.value})}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                    placeholder="例如：小学组复赛第一批次"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-stone-500 mb-1.5 block">截止时间</label>
                                <input 
                                    type="datetime-local"
                                    value={taskConfig.deadline}
                                    onChange={e => setTaskConfig({...taskConfig, deadline: e.target.value})}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-stone-500 mb-1.5 block">备注说明 (选填)</label>
                                <textarea 
                                    value={taskConfig.notes}
                                    onChange={e => setTaskConfig({...taskConfig, notes: e.target.value})}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d] resize-none h-20"
                                    placeholder="给评委的留言..."
                                />
                            </div>
                            
                            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 flex items-start">
                                <MessageSquare size={16} className="text-blue-600 mr-2 mt-0.5" />
                                <div className="text-xs text-blue-800">
                                    即将为 <span className="font-bold">{selectedJudgeIds.length}</span> 位评委分配 <span className="font-bold">{selectedWorkIds.length}</span> 个作品。
                                    分配方式：<span className="font-bold">{allocationMethod === 'average' ? '平均分配' : '速度优先'}</span>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={handleConfirmAssignment}
                            className="w-full py-3.5 bg-[#7f1d1d] text-white font-bold rounded-xl shadow-lg shadow-red-900/20 active:scale-95 transition-all flex items-center justify-center"
                        >
                            <Save size={18} className="mr-2" /> 确认创建并分配
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default JudgingSystem;
