
import React, { useState, useMemo } from 'react';
import { Play, Star, MessageCircle, Save, ChevronRight, Brain, List, FileText, ArrowLeft, ArrowRight, Calendar, Clock, CheckCircle2, AlertCircle, MoreVertical, ChevronLeft, CheckSquare, Square, Filter, Send, Edit3, Check } from 'lucide-react';

const ReviewConsole: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'works' | 'scoring'>('list');
  const [currentTask, setCurrentTask] = useState<any>(null);
  
  // Mock Tasks
  const [tasks] = useState([
      { id: 1, name: '小学A组复赛第一批次', count: 6, completed: 1, deadline: '今天 18:00', status: '进行中', progress: 16 },
      { id: 2, name: '初中组初赛补录', count: 10, completed: 0, deadline: '明天 12:00', status: '待开始', progress: 0 },
      { id: 3, name: '经典诵读专项评审', count: 50, completed: 48, deadline: '2025-08-15', status: '即将完成', progress: 96 },
  ]);

  // Mock Works Data with Status
  // status: 'pending' (never scored), 'draft' (scored but not submitted), 'submitted' (done)
  const [works, setWorks] = useState([
      { 
          id: '101', title: '我的家乡', student: '王小明', img: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=200&auto=format&fit=crop&q=60', 
          status: 'draft', totalScore: 88.0,
          scores: [ { id: 'c1', val: 35 }, { id: 'c2', val: 28 }, { id: 'c3', val: 18 }, { id: 'c4', val: 7 } ]
      },
      { 
          id: '102', title: '祖国颂', student: '李小红', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&auto=format&fit=crop&q=60', 
          status: 'submitted', totalScore: 92.5,
          scores: [ { id: 'c1', val: 38 }, { id: 'c2', val: 27 }, { id: 'c3', val: 19 }, { id: 'c4', val: 8.5 } ]
      },
      { 
          id: '103', title: 'English Speech', student: 'Lucy', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=200&auto=format&fit=crop&q=60', 
          status: 'pending', totalScore: 0,
          scores: [ { id: 'c1', val: 0 }, { id: 'c2', val: 0 }, { id: 'c3', val: 0 }, { id: 'c4', val: 0 } ]
      },
      { 
          id: '104', title: '未来已来', student: '张小刚', img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=200&auto=format&fit=crop&q=60', 
          status: 'pending', totalScore: 0,
          scores: [ { id: 'c1', val: 0 }, { id: 'c2', val: 0 }, { id: 'c3', val: 0 }, { id: 'c4', val: 0 } ]
      },
      { 
          id: '105', title: '少年中国说', student: '陈小花', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=60', 
          status: 'draft', totalScore: 85.0,
          scores: [ { id: 'c1', val: 32 }, { id: 'c2', val: 26 }, { id: 'c3', val: 18 }, { id: 'c4', val: 9 } ]
      },
      { 
          id: '106', title: '科技之光', student: '赵六', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&auto=format&fit=crop&q=60', 
          status: 'pending', totalScore: 0,
          scores: [ { id: 'c1', val: 0 }, { id: 'c2', val: 0 }, { id: 'c3', val: 0 }, { id: 'c4', val: 0 } ]
      },
  ]);

  const [activeWorkIndex, setActiveWorkIndex] = useState(0);
  const [selectedWorkIds, setSelectedWorkIds] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'submitted'>('all');

  // Scoring Configuration
  const scoreConfig = [
      { id: 'c1', label: '内容主旨', desc: '主题鲜明 (40分)', max: 40, weight: 0.4 },
      { id: 'c2', label: '语言表达', desc: '吐字清晰 (30分)', max: 30, weight: 0.3 },
      { id: 'c3', label: '仪表风范', desc: '仪态端庄 (20分)', max: 20, weight: 0.2 },
      { id: 'c4', label: '综合效果', desc: '整体感染力 (10分)', max: 10, weight: 0.1 }
  ];

  // Helper: Get filtered works
  const filteredWorks = useMemo(() => {
      if (filterStatus === 'all') return works;
      if (filterStatus === 'pending') return works.filter(w => w.status !== 'submitted');
      if (filterStatus === 'submitted') return works.filter(w => w.status === 'submitted');
      return works;
  }, [works, filterStatus]);

  // Actions
  const handleEnterTask = (task: any) => {
      setCurrentTask(task);
      setViewMode('works');
      setFilterStatus('all');
      setSelectedWorkIds([]);
  };

  const handleStartScoring = (index: number) => {
      const workId = filteredWorks[index].id;
      const realIndex = works.findIndex(w => w.id === workId);
      setActiveWorkIndex(realIndex);
      setViewMode('scoring');
  };

  const toggleSelectWork = (id: string) => {
      setSelectedWorkIds(prev => prev.includes(id) ? prev.filter(wid => wid !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
      if (selectedWorkIds.length === filteredWorks.length) setSelectedWorkIds([]);
      else setSelectedWorkIds(filteredWorks.map(w => w.id));
  };

  const handleBatchSubmit = () => {
      if (selectedWorkIds.length === 0) return;
      
      // Allow batch submit for any non-submitted work (pending or draft)
      const validIds = works.filter(w => selectedWorkIds.includes(w.id) && w.status !== 'submitted').map(w => w.id);
      
      if (validIds.length === 0) {
          alert('选中的作品均已提交，无需重复提交');
          return;
      }

      if (window.confirm(`确认批量提交选中的 ${validIds.length} 个作品吗？\n提交后无法再次修改评分。`)) {
          setWorks(prev => prev.map(w => validIds.includes(w.id) ? { ...w, status: 'submitted' } : w));
          setSelectedWorkIds([]);
          alert('批量提交成功！');
      }
  };

  const handleScoreChange = (scoreId: string, newVal: number) => {
      const newWorks = [...works];
      const work = newWorks[activeWorkIndex];
      // Prevent editing if submitted
      if (work.status === 'submitted') return;

      const scoreItem = work.scores.find(s => s.id === scoreId);
      if (scoreItem) {
          const config = scoreConfig.find(c => c.id === scoreId);
          scoreItem.val = Math.max(0, Math.min(config?.max || 100, newVal));
          
          // Recalculate Total
          work.totalScore = work.scores.reduce((sum, s) => sum + s.val, 0);
          
          // Auto set to draft if currently pending
          if (work.status === 'pending') {
              work.status = 'draft';
          }
      }
      setWorks(newWorks);
  };

  const handleSubmitScore = () => {
      if (window.confirm('确认提交评分吗？提交后不可修改。')) {
          const newWorks = [...works];
          newWorks[activeWorkIndex].status = 'submitted';
          setWorks(newWorks);
          
          // Auto advance to next non-submitted work
          const nextIndex = works.findIndex((w, i) => i > activeWorkIndex && w.status !== 'submitted');
          if (nextIndex !== -1) {
              setActiveWorkIndex(nextIndex);
          } else {
              // Try finding from start
              const anyNext = works.findIndex(w => w.status !== 'submitted');
              if (anyNext !== -1 && anyNext !== activeWorkIndex) {
                  setActiveWorkIndex(anyNext);
              } else {
                  alert('本任务所有作品已评审完毕！');
                  setViewMode('works');
              }
          }
      }
  };

  const handleTotalScoreChange = (newTotalStr: string) => {
      const newWorks = [...works];
      const work = newWorks[activeWorkIndex];
      if (work.status === 'submitted') return;

      let newTotal = parseFloat(newTotalStr);
      if (isNaN(newTotal)) return;
      newTotal = Math.max(0, Math.min(100, newTotal));
      
      // Distribute
      work.scores = work.scores.map(s => {
          const config = scoreConfig.find(c => c.id === s.id);
          return { ...s, val: parseFloat((newTotal * (config?.weight || 0)).toFixed(1)) };
      });
      work.totalScore = newTotal;
      if (work.status === 'pending') work.status = 'draft';
      setWorks(newWorks);
  };

  // Render: Task List
  if (viewMode === 'list') {
      return (
          <div className="space-y-6">
              <h1 className="text-2xl font-black text-stone-800 font-serif">评审工作台</h1>
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                  <table className="w-full text-left">
                      <thead className="bg-stone-50 border-b border-stone-200 text-xs font-bold text-stone-500 uppercase">
                          <tr>
                              <th className="p-4">任务名称</th>
                              <th className="p-4">作品数量</th>
                              <th className="p-4">截止时间</th>
                              <th className="p-4">评审进度</th>
                              <th className="p-4">状态</th>
                              <th className="p-4 text-right">操作</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                          {tasks.map(task => (
                              <tr key={task.id} className="hover:bg-stone-50 group">
                                  <td className="p-4 font-bold text-stone-800 text-sm">{task.name}</td>
                                  <td className="p-4 text-sm text-stone-600 font-mono">
                                      {task.count} <span className="text-stone-400 text-xs">份</span>
                                  </td>
                                  <td className="p-4 text-sm text-stone-600 flex items-center">
                                      <Clock size={14} className="mr-1.5 text-stone-400"/> {task.deadline}
                                  </td>
                                  <td className="p-4">
                                      <div className="flex items-center w-32">
                                          <div className="flex-1 h-1.5 bg-stone-100 rounded-full mr-2 overflow-hidden">
                                              <div className="h-full bg-[#7f1d1d]" style={{width: `${task.progress}%`}}></div>
                                          </div>
                                          <span className="text-xs font-bold text-stone-500">{task.progress}%</span>
                                      </div>
                                  </td>
                                  <td className="p-4">
                                      <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                                          task.status === '进行中' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                          task.status === '即将完成' ? 'bg-green-50 text-green-600 border-green-100' :
                                          'bg-stone-100 text-stone-500 border-stone-200'
                                      }`}>
                                          {task.status}
                                      </span>
                                  </td>
                                  <td className="p-4 text-right">
                                      <button 
                                        onClick={() => handleEnterTask(task)}
                                        className="text-white font-bold text-xs bg-[#7f1d1d] px-4 py-2 rounded-lg hover:bg-[#991b1b] shadow-md shadow-red-900/10 transition-all active:scale-95"
                                      >
                                          进入任务
                                      </button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
      );
  }

  // Render: Works List (Intermediate Step)
  if (viewMode === 'works') {
      return (
          <div className="flex flex-col h-[calc(100vh-8rem)]">
              <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                      <button onClick={() => setViewMode('list')} className="p-2 hover:bg-stone-200 rounded-full mr-2 text-stone-500">
                          <ArrowLeft size={20} />
                      </button>
                      <div>
                          <h1 className="text-xl font-black text-stone-800 font-serif">{currentTask?.name}</h1>
                          <p className="text-xs text-stone-500">作品列表</p>
                      </div>
                  </div>
                  
                  <div className="flex gap-2">
                      {selectedWorkIds.length > 0 && (
                          <button 
                              onClick={handleBatchSubmit}
                              className="bg-[#7f1d1d] text-white px-4 py-2 rounded-xl font-bold shadow-md hover:bg-[#991b1b] flex items-center text-xs transition-colors"
                          >
                              <Send size={14} className="mr-2" /> 批量提交 ({selectedWorkIds.length})
                          </button>
                      )}
                  </div>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm flex flex-col flex-1 overflow-hidden">
                  {/* Toolbar */}
                  <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/30">
                      <div className="flex gap-2">
                          {[
                              { id: 'all', label: '全部' },
                              { id: 'pending', label: '待评审' }, // Includes pending & draft
                              { id: 'submitted', label: '已提交' }
                          ].map(tab => (
                              <button
                                  key={tab.id}
                                  onClick={() => setFilterStatus(tab.id as any)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                      filterStatus === tab.id 
                                      ? 'bg-stone-800 text-white shadow-sm' 
                                      : 'bg-white text-stone-500 border border-stone-200 hover:text-stone-800'
                                  }`}
                              >
                                  {tab.label}
                              </button>
                          ))}
                      </div>
                      <div className="text-xs font-bold text-stone-400">
                          共 {filteredWorks.length} 个作品
                      </div>
                  </div>

                  {/* List */}
                  <div className="flex-1 overflow-auto">
                      <table className="w-full text-left">
                          <thead className="bg-stone-50 text-xs font-bold text-stone-500 uppercase sticky top-0 z-10 border-b border-stone-200">
                              <tr>
                                  <th className="p-4 w-12 text-center">
                                      <input 
                                          type="checkbox" 
                                          className="accent-[#7f1d1d] cursor-pointer"
                                          checked={selectedWorkIds.length === filteredWorks.length && filteredWorks.length > 0}
                                          onChange={toggleSelectAll}
                                      />
                                  </th>
                                  <th className="p-4">作品名称</th>
                                  <th className="p-4">选手</th>
                                  <th className="p-4">当前分数</th>
                                  <th className="p-4">状态</th>
                                  <th className="p-4 text-right">操作</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-100 text-sm">
                              {filteredWorks.map((work, idx) => (
                                  <tr key={work.id} className="hover:bg-stone-50 transition-colors group">
                                      <td className="p-4 text-center">
                                          <input 
                                              type="checkbox" 
                                              className="accent-[#7f1d1d] cursor-pointer"
                                              checked={selectedWorkIds.includes(work.id)}
                                              onChange={() => toggleSelectWork(work.id)}
                                          />
                                      </td>
                                      <td className="p-4 font-bold text-stone-800">{work.title}</td>
                                      <td className="p-4 text-stone-600">{work.student}</td>
                                      <td className="p-4 font-mono font-bold">
                                          {work.status === 'pending' ? '-' : <span className={work.status === 'submitted' ? 'text-green-600' : 'text-amber-600'}>{work.totalScore}</span>}
                                      </td>
                                      <td className="p-4">
                                          <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                                              work.status === 'submitted' ? 'bg-green-50 text-green-600 border-green-100' :
                                              work.status === 'draft' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                              'bg-stone-100 text-stone-400 border-stone-200'
                                          }`}>
                                              {work.status === 'submitted' ? '已提交' : work.status === 'draft' ? '已打分 (未提交)' : '待评审'}
                                          </span>
                                      </td>
                                      <td className="p-4 text-right">
                                          <button 
                                              onClick={() => handleStartScoring(idx)}
                                              className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                                                  work.status === 'submitted' 
                                                  ? 'bg-stone-50 text-stone-400 border-stone-200 hover:bg-stone-100' 
                                                  : 'bg-white text-[#7f1d1d] border-[#7f1d1d]/30 hover:bg-[#7f1d1d] hover:text-white'
                                              }`}
                                          >
                                              {work.status === 'submitted' ? '查看' : '评审'}
                                          </button>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      );
  }

  // Render: Scoring Detail
  const currentWork = works[activeWorkIndex];
  const isSubmitted = currentWork.status === 'submitted';

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] relative">
       {/* Header */}
       <div className="flex items-center justify-between mb-4">
           <button onClick={() => setViewMode('works')} className="flex items-center text-stone-500 hover:text-[#7f1d1d] font-bold text-sm">
               <ArrowLeft size={18} className="mr-1"/> 返回作品列表
           </button>
           <div className="flex items-center gap-3">
               <div className="text-xs font-bold text-stone-500 bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-sm">
                   当前任务: {currentTask?.name}
               </div>
               <div className="text-xs font-bold text-stone-500 bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-sm">
                   进度: {activeWorkIndex + 1} / {works.length}
               </div>
           </div>
       </div>

       {/* Main Content */}
       <div className="flex-1 flex gap-6 overflow-hidden pb-24">
           {/* Left: Video Player + AI Radar */}
           <div className="flex-[2] flex flex-col gap-4 overflow-hidden">
               <div className="flex-1 bg-black rounded-3xl relative overflow-hidden shadow-lg group">
                   <img 
                     src={currentWork.img} 
                     className="w-full h-full object-cover opacity-80"
                   />
                   <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                           <Play size={40} className="text-white ml-2" fill="currentColor" />
                       </div>
                   </div>
                   <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                       <h2 className="text-xl font-bold mb-1">《{currentWork.title}》</h2>
                       <p className="text-sm opacity-80">选手: {currentWork.student} | 状态: {currentWork.status === 'submitted' ? '已提交' : currentWork.status === 'draft' ? '已打分' : '待评审'}</p>
                   </div>
               </div>
               
               {/* AI Analysis Panel */}
               <div className="h-40 bg-white rounded-3xl p-4 border border-stone-200 shadow-sm flex gap-6 shrink-0">
                   <div className="w-40 bg-stone-50 rounded-2xl flex items-center justify-center relative shrink-0">
                        <Brain size={32} className="text-stone-300 absolute" />
                        <svg viewBox="0 0 100 100" className="w-full h-full p-4">
                            <polygon points="50,10 90,40 80,90 20,90 10,40" fill="rgba(127, 29, 29, 0.1)" stroke="#7f1d1d" strokeWidth="2" />
                        </svg>
                        <span className="absolute bottom-2 text-[9px] font-bold text-[#7f1d1d]">AI 预审分析</span>
                   </div>
                   <div className="flex-1 grid grid-cols-3 gap-3 content-center">
                       <div className="bg-stone-50 rounded-xl p-3 text-center">
                           <div className="text-[10px] text-stone-500 font-bold mb-1">语速稳定性</div>
                           <div className="text-lg font-black text-green-600">优</div>
                       </div>
                       <div className="bg-stone-50 rounded-xl p-3 text-center">
                           <div className="text-[10px] text-stone-500 font-bold mb-1">普通话标准度</div>
                           <div className="text-lg font-black text-blue-600">92%</div>
                       </div>
                       <div className="bg-stone-50 rounded-xl p-3 text-center">
                           <div className="text-[10px] text-stone-500 font-bold mb-1">流畅度</div>
                           <div className="text-lg font-black text-amber-600">良</div>
                       </div>
                   </div>
               </div>
           </div>

           {/* Right: Expert Scoring Form */}
           <div className="flex-1 bg-white rounded-3xl border border-stone-200 shadow-sm p-6 flex flex-col overflow-y-auto relative">
               <div className="flex justify-between items-center mb-6 pb-4 border-b border-stone-100">
                   <h3 className="font-bold text-stone-800 text-lg">专家评分</h3>
                   {isSubmitted ? (
                       <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center"><CheckCircle2 size={12} className="mr-1"/> 已提交</span>
                   ) : (
                       <span className="text-xs text-stone-400">实时保存中...</span>
                   )}
               </div>
               
               <div className={`space-y-6 flex-1 ${isSubmitted ? 'opacity-70 pointer-events-none' : ''}`}>
                   {scoreConfig.map((criterion, idx) => {
                       const currentScore = currentWork.scores.find(s => s.id === criterion.id)?.val || 0;
                       return (
                           <div key={idx} className="p-3 rounded-xl hover:bg-stone-50 transition-colors">
                               <div className="flex justify-between mb-2">
                                   <label className="font-bold text-stone-700 text-sm flex items-center">
                                       {criterion.label}
                                       <span className="ml-1 text-stone-400 text-xs font-normal">({criterion.max}分)</span>
                                   </label>
                                   <input 
                                      type="number" 
                                      value={currentScore} 
                                      onChange={(e) => handleScoreChange(criterion.id, parseFloat(e.target.value))}
                                      className="font-bold text-[#7f1d1d] w-12 text-right bg-transparent border-b border-stone-200 focus:border-[#7f1d1d] outline-none transition-all"
                                   />
                               </div>
                               <input 
                                  type="range" 
                                  min="0" max={criterion.max} step="0.5"
                                  value={currentScore}
                                  onChange={(e) => handleScoreChange(criterion.id, parseFloat(e.target.value))}
                                  className="w-full accent-[#7f1d1d]" 
                               />
                           </div>
                       );
                   })}

                   <div>
                       <label className="font-bold text-stone-700 text-sm block mb-2">评语</label>
                       <textarea 
                         className="w-full h-24 bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-medium outline-none focus:border-[#7f1d1d] resize-none focus:bg-white transition-all"
                         placeholder="请输入评语..."
                         disabled={isSubmitted}
                       ></textarea>
                   </div>
               </div>

               <div className="pt-6 border-t border-stone-100 flex justify-between items-center mt-4">
                   <div className="text-stone-500 text-sm font-bold">总分</div>
                   <div className="flex items-center">
                       <input 
                          type="number" 
                          value={currentWork.totalScore.toFixed(1)} 
                          onChange={(e) => handleTotalScoreChange(e.target.value)}
                          disabled={isSubmitted}
                          className="text-4xl font-black text-[#7f1d1d] font-serif bg-transparent w-24 text-right outline-none border-b-2 border-transparent focus:border-[#7f1d1d] transition-colors disabled:opacity-50"
                       />
                       <span className="text-xl font-black text-stone-400 ml-1">分</span>
                   </div>
               </div>
               
               {!isSubmitted && (
                   <div className="mt-6">
                       <button 
                           onClick={handleSubmitScore}
                           className="w-full py-3.5 bg-[#7f1d1d] text-white font-bold rounded-xl shadow-lg hover:bg-[#991b1b] transition-all active:scale-95 flex items-center justify-center"
                       >
                           <CheckCircle2 size={18} className="mr-2" /> 确认提交评分
                       </button>
                   </div>
               )}
           </div>
       </div>

       {/* Bottom Navigation Bar */}
       <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-stone-200 shadow-lg flex items-center px-6 z-10 rounded-t-2xl">
           <button 
                onClick={() => setActiveWorkIndex(Math.max(0, activeWorkIndex - 1))}
                disabled={activeWorkIndex === 0}
                className="p-2 rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 disabled:opacity-30 transition-colors mr-4"
           >
               <ChevronLeft size={20} />
           </button>
           
           <div className="flex-1 flex justify-center gap-3 overflow-hidden">
               {works.map((work, idx) => {
                   const isActive = idx === activeWorkIndex;
                   // Just show a window around active index
                   if (Math.abs(idx - activeWorkIndex) > 3) return null;

                   return (
                       <div 
                            key={work.id} 
                            onClick={() => setActiveWorkIndex(idx)}
                            className={`flex items-center p-1.5 pr-3 rounded-xl cursor-pointer transition-all border ${
                                isActive 
                                ? 'bg-[#7f1d1d] text-white border-[#7f1d1d] shadow-md transform scale-105' 
                                : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                            }`}
                            style={{minWidth: '160px'}}
                       >
                           <div className="w-10 h-8 bg-stone-300 rounded-lg overflow-hidden mr-2 shrink-0 relative">
                               <img src={work.img} className="w-full h-full object-cover" />
                               {work.status === 'submitted' && (
                                   <div className="absolute inset-0 bg-green-500/50 flex items-center justify-center">
                                       <Check size={12} className="text-white"/>
                                   </div>
                               )}
                           </div>
                           <div className="min-w-0 text-left">
                               <div className="text-xs font-bold truncate">{work.title}</div>
                               <div className={`text-[10px] truncate ${isActive ? 'text-red-100' : 'text-stone-400'}`}>
                                   {work.student} {work.status === 'submitted' ? '(已提交)' : work.status === 'draft' ? '(未提交)' : ''}
                               </div>
                           </div>
                       </div>
                   );
               })}
           </div>

           <button 
                onClick={() => setActiveWorkIndex(Math.min(works.length - 1, activeWorkIndex + 1))}
                disabled={activeWorkIndex === works.length - 1}
                className="p-2 rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 disabled:opacity-30 transition-colors ml-4"
           >
               <ChevronRight size={20} />
           </button>
       </div>
    </div>
  );
};

export default ReviewConsole;
