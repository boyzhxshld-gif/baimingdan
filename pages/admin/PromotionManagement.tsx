
import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Filter, FileText, CheckCircle2, ChevronRight, ArrowRight, ChevronLeft, Award, RotateCcw, GitMerge, Zap, Settings, AlertTriangle, Check, X, Edit2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const PromotionManagement: React.FC = () => {
  const [searchParams] = useSearchParams();
  const competitionId = searchParams.get('competitionId');

  const [view, setView] = useState<'competitions' | 'results'>(competitionId ? 'results' : 'competitions');
  const [selectedCompetition, setSelectedCompetition] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selection & Modal States
  const [selectedResultIds, setSelectedResultIds] = useState<string[]>([]);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  // Modification Form
  const [modifyType, setModifyType] = useState<'fixed' | 'percent'>('fixed');
  const [modifyValue, setModifyValue] = useState('');
  const [modifyingSingleId, setModifyingSingleId] = useState<string | null>(null); // Track if modifying a single student
  
  // Mock Competitions
  const competitions = [
      { 
          id: '202503', 
          title: '第五届“讲好中国故事”全国青少年语言素养大赛', 
          type: 'promotion',
          currentStage: '复赛',
          nextStage: '全国总决赛',
          isFinal: false,
          scoringProgress: 92, 
          status: 'scoring',
          total: 1200,
          reviewed: 1104
      },
      { 
          id: '202504', 
          title: '“金话筒”青少年主持人大赛', 
          type: 'promotion',
          currentStage: '初赛', 
          nextStage: '复赛',
          isFinal: false,
          scoringProgress: 100, 
          status: 'complete',
          total: 500,
          reviewed: 500
      },
      {
          id: '202502',
          title: '经典诗文诵读挑战赛',
          type: 'single',
          currentStage: '初赛',
          nextStage: null,
          isFinal: true,
          scoringProgress: 100,
          status: 'complete',
          total: 8900,
          reviewed: 8900
      }
  ];

  // Mock Student Results
  const [results, setResults] = useState([
      { id: '1', name: '王小明', group: '小学A组', score: 92.5, rank: 1, status: '待发布', autoResult: '晋级' },
      { id: '2', name: '李小红', group: '小学A组', score: 88.0, rank: 15, status: '已发布', autoResult: '晋级' },
      { id: '3', name: '张小刚', group: '初中组', score: 75.0, rank: 45, status: '待发布', autoResult: '淘汰' },
      { id: '4', name: '赵小七', group: '初中组', score: 85.0, rank: 10, status: '待发布', autoResult: '晋级' },
      { id: '5', name: '孙悟空', group: '高中组', score: 95.0, rank: 1, status: '待发布', autoResult: '晋级' },
  ]);

  useEffect(() => {
      if (competitionId) {
          const comp = competitions.find(c => c.id === competitionId);
          if (comp) {
              setSelectedCompetition(comp);
              setView('results');
          }
      }
  }, [competitionId]);

  const filteredResults = results.filter(r => {
      const matchSearch = r.name.includes(searchQuery);
      return matchSearch;
  });

  const handleSelectCompetition = (comp: any) => {
      setSelectedCompetition(comp);
      setView('results');
      setSelectedResultIds([]); // Reset selection
  };

  const handleBack = () => {
      setView('competitions');
      setSelectedCompetition(null);
      setSelectedResultIds([]);
  };

  const toggleSelection = (id: string) => {
      setSelectedResultIds(prev => 
          prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
      );
  };

  const toggleAll = () => {
      if (selectedResultIds.length === filteredResults.length) {
          setSelectedResultIds([]);
      } else {
          setSelectedResultIds(filteredResults.map(r => r.id));
      }
  };

  const openModifyModal = (singleId?: string) => {
      if (singleId) {
          setModifyingSingleId(singleId);
          // Pre-fill current score if needed, or just let user input adjustment
      } else {
          setModifyingSingleId(null);
      }
      setModifyValue('');
      setShowModifyModal(true);
  };

  const handleModifyScore = () => {
      const val = parseFloat(modifyValue);
      if (isNaN(val)) return;

      const targetIds = modifyingSingleId ? [modifyingSingleId] : selectedResultIds;

      setResults(prev => prev.map(r => {
          if (targetIds.includes(r.id)) {
              let newScore = r.score;
              if (modifyType === 'fixed') {
                  newScore = r.score + val;
              } else {
                  newScore = r.score * (1 + val / 100);
              }
              newScore = Math.min(100, Math.max(0, parseFloat(newScore.toFixed(2))));
              return { ...r, score: newScore };
          }
          return r;
      }));
      setShowModifyModal(false);
      setModifyValue('');
      setModifyingSingleId(null);
      alert(modifyingSingleId ? '单个分数已调整' : '分数已批量调整');
  };

  const handleConfirmAction = () => {
      alert(selectedCompetition.isFinal || selectedCompetition.type === 'single' ? '全员成绩已发布' : '全员晋级名单已确认');
      setShowConfirmModal(false);
  };

  // View 1: Competition List
  if (view === 'competitions') {
      return (
          <div className="space-y-6">
              <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-black text-stone-800 font-serif">成绩/晋级发布</h1>
                  <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-500">筛选:</span>
                      <select 
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="bg-white border border-stone-200 text-stone-600 px-3 py-1.5 rounded-lg text-xs font-bold outline-none focus:border-[#7f1d1d]"
                      >
                          <option value="all">全部状态</option>
                          <option value="scoring">评分中</option>
                          <option value="complete">评分完成</option>
                      </select>
                  </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                  {competitions.filter(c => filterStatus === 'all' || c.status === filterStatus).map(comp => (
                      <div key={comp.id} onClick={() => handleSelectCompetition(comp)} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md hover:border-[#7f1d1d]/30 transition-all cursor-pointer group relative overflow-hidden">
                          <div className="flex justify-between items-start relative z-10">
                              <div>
                                  <div className="flex items-center gap-2 mb-2">
                                      {comp.type === 'promotion' ? (
                                          <span className="text-[10px] font-bold bg-purple-50 text-purple-600 px-2 py-0.5 rounded border border-purple-100 flex items-center">
                                              <GitMerge size={12} className="mr-1"/> 晋级制
                                          </span>
                                      ) : (
                                          <span className="text-[10px] font-bold bg-green-50 text-green-600 px-2 py-0.5 rounded border border-green-100 flex items-center">
                                              <Zap size={12} className="mr-1"/> 单项赛
                                          </span>
                                      )}
                                      <h2 className="text-lg font-bold text-stone-800 group-hover:text-[#7f1d1d] transition-colors">{comp.title}</h2>
                                  </div>
                                  
                                  <div className="flex items-center text-xs text-stone-500 mb-1 font-medium">
                                      <span className="bg-stone-100 px-2 py-0.5 rounded border border-stone-200 mr-2">当前阶段: {comp.currentStage}</span>
                                      {comp.type === 'promotion' && !comp.isFinal && (
                                          <span className="flex items-center text-[#7f1d1d]">
                                              <ArrowRight size={12} className="mx-1" /> 晋级至: {comp.nextStage}
                                          </span>
                                      )}
                                  </div>
                                  <p className="text-[10px] text-stone-400 font-mono">ID: {comp.id}</p>
                              </div>
                              <div className="text-right">
                                  <div className="text-2xl font-black font-serif text-stone-800">{comp.scoringProgress}%</div>
                                  <div className="text-xs text-stone-400">评分进度</div>
                              </div>
                          </div>
                          
                          <div className="mt-6">
                              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                                  <div className={`h-full rounded-full ${comp.status === 'complete' ? 'bg-green-500' : 'bg-[#7f1d1d]'}`} style={{ width: `${comp.scoringProgress}%` }}></div>
                              </div>
                              <div className="flex justify-between mt-2 text-xs text-stone-500 font-medium">
                                  <span>已评 {comp.reviewed} / 总数 {comp.total}</span>
                                  <span className={`${comp.status === 'complete' ? 'text-green-600' : 'text-[#7f1d1d]'}`}>{comp.status === 'complete' ? '评分完成' : '正在评分'}</span>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      );
  }

  // View 2: Result Management
  const isPublishAction = selectedCompetition?.isFinal || selectedCompetition?.type === 'single';

  return (
    <div className="space-y-6 h-full flex flex-col relative">
        {/* Header */}
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <button onClick={handleBack} className="mr-3 p-2 hover:bg-stone-200 rounded-full text-stone-500 transition-colors">
                    <ChevronLeft size={20} />
                </button>
                <div>
                    <h1 className="text-xl font-black text-stone-800 font-serif">{selectedCompetition?.title}</h1>
                    <div className="flex items-center mt-1">
                        <span className="text-xs text-white bg-[#7f1d1d] px-2 py-0.5 rounded font-bold mr-2">{selectedCompetition?.currentStage}</span>
                        {selectedCompetition?.type === 'promotion' && !selectedCompetition?.isFinal && (
                            <span className="text-xs text-stone-500 flex items-center font-medium">
                                晋级目标 <ArrowRight size={12} className="mx-1" /> {selectedCompetition?.nextStage}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex gap-3">
                <button 
                    onClick={() => openModifyModal()}
                    disabled={selectedResultIds.length === 0}
                    className="bg-white border border-stone-200 text-stone-600 px-4 py-2.5 rounded-xl font-bold shadow-sm hover:bg-stone-50 transition-colors text-xs flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Settings size={14} className="mr-2" /> 
                    批量调整分数 {selectedResultIds.length > 0 && `(${selectedResultIds.length})`}
                </button>
                
                <button 
                    onClick={() => setShowConfirmModal(true)}
                    className="bg-[#7f1d1d] text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:bg-[#991b1b] flex items-center text-xs"
                >
                    {isPublishAction ? <Award size={16} className="mr-2" /> : <TrendingUp size={16} className="mr-2" />}
                    {isPublishAction ? '确认发布成绩' : '确认晋级名单'}
                </button>
            </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 flex justify-between items-center">
            <div className="relative w-64">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索选手姓名..." 
                    className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium outline-none focus:border-[#7f1d1d]" 
                />
            </div>
            <div className="flex gap-4 text-sm font-bold text-stone-600">
                <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div> 建议晋级: 120人</div>
                <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div> 建议淘汰: 80人</div>
            </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex-1 flex flex-col">
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-stone-50 sticky top-0 z-10">
                        <tr>
                            <th className="p-5 border-b border-stone-200 w-16 text-center">
                                <input 
                                    type="checkbox" 
                                    className="w-4 h-4 accent-[#7f1d1d] cursor-pointer"
                                    checked={selectedResultIds.length === filteredResults.length && filteredResults.length > 0}
                                    onChange={toggleAll}
                                />
                            </th>
                            <th className="p-5 text-xs font-bold text-stone-500 uppercase border-b border-stone-200">排名</th>
                            <th className="p-5 text-xs font-bold text-stone-500 uppercase border-b border-stone-200">选手信息</th>
                            <th className="p-5 text-xs font-bold text-stone-500 uppercase border-b border-stone-200">组别</th>
                            <th className="p-5 text-xs font-bold text-stone-500 uppercase border-b border-stone-200">最终得分</th>
                            <th className="p-5 text-xs font-bold text-stone-500 uppercase border-b border-stone-200">系统建议</th>
                            <th className="p-5 text-xs font-bold text-stone-500 uppercase border-b border-stone-200">发布状态</th>
                            <th className="p-5 text-xs font-bold text-stone-500 uppercase border-b border-stone-200 text-right">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 bg-white">
                        {filteredResults.map((item, idx) => (
                            <tr key={item.id} className={`hover:bg-stone-50 transition-colors group ${selectedResultIds.includes(item.id) ? 'bg-[#7f1d1d]/5' : ''}`}>
                                <td className="p-5 text-center">
                                    <input 
                                        type="checkbox" 
                                        className="w-4 h-4 accent-[#7f1d1d] cursor-pointer"
                                        checked={selectedResultIds.includes(item.id)}
                                        onChange={() => toggleSelection(item.id)}
                                    />
                                </td>
                                <td className="p-5 font-black text-stone-400 font-serif italic text-lg w-16">#{item.rank}</td>
                                <td className="p-5 font-bold text-stone-800">{item.name}</td>
                                <td className="p-5 text-sm text-stone-600">{item.group}</td>
                                <td className="p-5">
                                    <span className="text-lg font-black text-[#7f1d1d] font-serif">{item.score}</span>
                                </td>
                                <td className="p-5">
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                                        item.autoResult === '晋级' ? 'bg-green-50 text-green-600 border-green-100' :
                                        'bg-stone-100 text-stone-400 border-stone-200'
                                    }`}>
                                        {item.autoResult}
                                    </span>
                                </td>
                                <td className="p-5">
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                                        item.status === '已发布' ? 'text-blue-600 bg-blue-50' : 'text-amber-600 bg-amber-50'
                                    }`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="p-5 text-right">
                                    <button 
                                        onClick={() => openModifyModal(item.id)}
                                        className="text-stone-400 hover:text-[#7f1d1d] p-1.5 transition-colors rounded hover:bg-stone-100"
                                        title="调整分数"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Modify Score Modal */}
        {showModifyModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4">
                <div className="bg-white w-full max-w-sm rounded-3xl p-6 relative animate-slide-up shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-stone-800 font-serif">{modifyingSingleId ? '调整单个选手分数' : '批量调整分数'}</h3>
                        <button onClick={() => setShowModifyModal(false)} className="p-2 rounded-full hover:bg-stone-100 text-stone-400"><X size={20}/></button>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                        {!modifyingSingleId && (
                            <div className="bg-stone-50 p-3 rounded-xl text-xs text-stone-500 border border-stone-100">
                                已选中 <span className="font-bold text-[#7f1d1d]">{selectedResultIds.length}</span> 名选手
                            </div>
                        )}
                        
                        <div>
                            <label className="block text-xs font-bold text-stone-500 mb-2">调整方式</label>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => setModifyType('fixed')}
                                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${modifyType === 'fixed' ? 'bg-[#7f1d1d] text-white border-[#7f1d1d]' : 'bg-white text-stone-600 border-stone-200'}`}
                                >
                                    {modifyingSingleId ? '增减分数' : '固定加减分'}
                                </button>
                                <button 
                                    onClick={() => setModifyType('percent')}
                                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${modifyType === 'percent' ? 'bg-[#7f1d1d] text-white border-[#7f1d1d]' : 'bg-white text-stone-600 border-stone-200'}`}
                                >
                                    百分比调整
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-500 mb-2">
                                {modifyType === 'fixed' ? '调整分值 (正数加分，负数减分)' : '调整比例 % (正数增加，负数减少)'}
                            </label>
                            <input 
                                type="number" 
                                value={modifyValue}
                                onChange={(e) => setModifyValue(e.target.value)}
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                placeholder={modifyType === 'fixed' ? '+5 或 -2' : '+10% 或 -5%'}
                            />
                        </div>
                    </div>

                    <button 
                        onClick={handleModifyScore}
                        className="w-full py-3.5 bg-[#7f1d1d] text-white font-bold rounded-xl shadow-lg shadow-red-900/20 active:scale-95 transition-all"
                    >
                        确认调整
                    </button>
                </div>
            </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4">
                <div className="bg-white w-full max-w-sm rounded-3xl p-6 relative animate-slide-up shadow-2xl text-center">
                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-100">
                        <AlertTriangle size={32} className="text-amber-500" />
                    </div>
                    <h3 className="font-black text-xl text-stone-800 mb-2 font-serif">二次确认</h3>
                    <p className="text-sm text-stone-500 leading-relaxed mb-2 font-bold text-[#7f1d1d]">
                        此操作将对所有选手生效！
                    </p>
                    <p className="text-sm text-stone-500 leading-relaxed mb-6">
                        {isPublishAction 
                            ? '您即将发布本阶段所有选手的最终成绩。发布后选手可立即查询，且不可撤回。' 
                            : '您即将确认本阶段的晋级名单。确认后晋级选手将进入下一阶段，淘汰选手流程结束。'}
                    </p>
                    
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setShowConfirmModal(false)}
                            className="flex-1 py-3 bg-stone-100 text-stone-600 font-bold rounded-xl hover:bg-stone-200 transition-colors"
                        >
                            取消
                        </button>
                        <button 
                            onClick={handleConfirmAction}
                            className="flex-1 py-3 bg-[#7f1d1d] text-white font-bold rounded-xl shadow-lg hover:bg-[#991b1b] transition-colors"
                        >
                            确认执行
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default PromotionManagement;
