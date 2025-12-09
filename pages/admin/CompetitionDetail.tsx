import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Users, School, MapPin, Eye, ArrowUpRight, MoreHorizontal, Edit3, FileText, Settings, UserCheck, Gavel, TrendingUp, Calendar, Clock, AlertCircle, ChevronRight, Layers, Trash2, Check, Upload, ArrowRight, Monitor, Smartphone, X } from 'lucide-react';
import CompetitionEditor from '../../components/CompetitionEditor';

const CompetitionDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeStageIdx, setActiveStageIdx] = useState(1); // Default to current (Stage 1: 复赛)
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  // Mock Data for the Competition Shell
  const compData = {
      id: id || '202503',
      title: id === '202502' ? '经典诗文诵读挑战赛' : id === '202505' ? '首届青少年辩论邀请赛' : id === '202504' ? '“金话筒”青少年主持人大赛' : '第五届“讲好中国故事”全国青少年语言素养大赛',
      status: id === '202502' ? '已结束' : id === '202504' ? '草稿' : id === '202505' ? '未开始' : '进行中',
      structure: (id === '202502' || id === '202505') ? 'single' : 'promotion',
      mode: id === '202505' ? 'offline' : 'online', 
      address: id === '202505' ? '北京市海淀区少年宫' : '', // Global address for single offline
      groupsList: id === '202502' ? ['小学组', '初中组'] : id === '202505' ? ['初中组', '高中组'] : ['小学A组', '小学B组', '初中组'],
      stats: [
          { label: '累计参赛人数', value: id === '202502' ? '8900' : id === '202505' ? '0' : id === '202504' ? '0' : '3420', change: (id === '202505' || id === '202504') ? '' : '+12% 较上届', icon: Users },
          { label: '覆盖学校', value: id === '202504' ? '0' : '128', desc: '活跃学校占比 85%', icon: School },
          { label: '覆盖区域', value: '15', unit: '个省市', icon: MapPin },
          { label: '赛事访问量', value: '12.5w', desc: '日均新增 1,200+', icon: Eye }
      ],
      timeline: id === '202502' ? [
          { name: '作品海选', date: '2025.08.01 - 09.10', status: 'completed', mode: 'online' }
      ] : id === '202505' ? [
          { name: '现场决赛', date: '2025.12.01 - 12.20', status: 'upcoming', mode: 'offline', address: '北京市海淀区少年宫' }
      ] : [
          { name: '初赛 (市级选拔)', date: '2025.04.01 - 06.30', status: 'completed', mode: 'online' },
          { name: '复赛 (省级决选)', date: '2025.07.01 - 09.30', status: 'current', mode: 'online' },
          { name: '全国总决赛', date: '2025.10.01 - 10.30', status: 'upcoming', mode: 'offline', address: '北京·中国教育电视台演播大厅' }
      ]
  };
  
  const isEditable = compData.status === '草稿' || compData.status === '未开始';

  // Dynamic Data per Stage
  // NOTE: For 'Expert Scoring' status, progress should visually span past registration/upload.
  const stageGroupsData: Record<number, any[]> = {
      0: id === '202505' ? [
        // Debate (Single Stage Offline - Not Started)
        {
            name: '初中组',
            progress: 0,
            status: '待开始',
            date: '12.01-12.20',
            applicants: 0,
            submitted: 0, 
            reviewed: 0,
            promotedCount: 0,
            promotionRatio: '-'
        },
        {
            name: '高中组',
            progress: 0,
            status: '待开始',
            date: '12.01-12.20',
            applicants: 0,
            submitted: 0,
            reviewed: 0,
            promotedCount: 0,
            promotionRatio: '-'
        }
      ] : [ // Stage 0: 初赛 (Completed) - For multi-stage
        { 
            name: '小学A组 (1-3年级)', 
            progress: 100, 
            status: '已完成', 
            date: '04.01-06.30', 
            applicants: 3000, 
            submitted: 2950, 
            reviewed: 2950, 
            promotedCount: 1200, 
            promotionRatio: '40%' 
        },
        // ... other groups
      ],
      1: [ // Stage 1: 复赛 (Current)
        { 
            name: '小学A组 (1-3年级)', 
            progress: 66,  
            status: '专家评分', 
            date: '08.11-08.31', 
            applicants: 1200, 
            submitted: 1200, 
            reviewed: 800, 
            promotedCount: 0, 
            promotionRatio: '-' 
        },
        // ... other groups
      ],
      // ...
  };

  useEffect(() => {
      if (compData.structure === 'single') {
          setActiveStageIdx(0);
      }
  }, [compData.structure, id]);

  const currentGroups = stageGroupsData[activeStageIdx] || [];
  const currentTimelineStage = compData.timeline[activeStageIdx] || compData.timeline[0];
  const isLaterStage = currentTimelineStage.name.includes('复赛') || currentTimelineStage.name.includes('决赛');
  const isFinalStage = activeStageIdx === compData.timeline.length - 1;
  const currentStageMode = compData.structure === 'single' ? compData.mode : currentTimelineStage.mode;
  const currentStageAddress = compData.structure === 'single' ? compData.address : currentTimelineStage.address;

  const handlePreview = () => {
      setShowPreviewModal(true);
  };

  const handleEdit = () => {
      if (!isEditable) return;
      setShowEditor(true);
  };

  const handleSaveCompetition = (data: any, isDraft: boolean) => {
      console.log('Updating competition:', data);
      alert('赛事配置已更新！');
      setShowEditor(false);
  };

  const handleDelete = () => {
      if (window.confirm('确定要删除该赛事吗？删除后不可恢复。')) {
          alert('赛事已删除');
          navigate('/competitions');
      }
  };

  const handleManage = (path: string, group?: string) => {
      let url = `${path}?competitionId=${compData.id}`;
      if (group) {
          url += `&group=${encodeURIComponent(group)}`;
      }
      navigate(url);
  };

  const handleStageAction = (groupName: string, stageName: string) => {
      const stageMap: Record<string, string> = {
          '报名阶段': '/registrations',
          '晋级名单': '/registrations',
          '作品上传': '/registrations',
          '专家评分': '/review',
          '晋级确认': '/promotion',
          '最终成绩发布': '/promotion'
      };
      const path = stageMap[stageName];
      if (path) {
          handleManage(path, groupName);
      }
  };

  return (
    <div className="space-y-6 animate-slide-up">
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
                <div className="flex items-center">
                    <button onClick={() => navigate('/competitions')} className="mr-4 p-2 hover:bg-stone-50 rounded-full transition-colors">
                        <ChevronLeft size={20} className="text-stone-500" />
                    </button>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-xl font-black text-stone-800 font-serif">{compData.title}</h1>
                            <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded border border-green-100 flex items-center">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div> {compData.status}
                            </span>
                            {compData.structure === 'single' ? (
                                compData.mode === 'offline' ? (
                                    <span className="bg-stone-100 text-stone-600 text-[10px] font-bold px-2 py-0.5 rounded border border-stone-200 flex items-center">
                                        <MapPin size={10} className="mr-1"/> 线下赛
                                    </span>
                                ) : (
                                    <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-100 flex items-center">
                                        <Monitor size={10} className="mr-1"/> 线上赛
                                    </span>
                                )
                            ) : (
                                <span className="bg-purple-50 text-purple-600 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-100 flex items-center">
                                    <Layers size={10} className="mr-1"/> 晋级制
                                </span>
                            )}
                        </div>
                        <div className="flex items-center text-xs text-stone-400 font-mono space-x-4">
                            <span>ID: {compData.id}</span>
                            <span>组别: {compData.groupsList.join(', ')}</span>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button 
                        onClick={handlePreview}
                        className="px-4 py-2 bg-stone-50 border border-stone-200 text-stone-600 rounded-xl text-sm font-bold hover:bg-stone-100 transition-colors flex items-center"
                    >
                        <Smartphone size={16} className="mr-2" /> 预览H5
                    </button>
                    <button 
                        disabled={!isEditable}
                        className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center border ${
                            isEditable 
                            ? 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50 cursor-pointer' 
                            : 'bg-stone-100 border-stone-100 text-stone-400 cursor-not-allowed'
                        }`}
                        onClick={handleEdit}
                    >
                        <Edit3 size={16} className="mr-2" /> 配置
                    </button>
                    <button 
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-bold hover:bg-red-100 transition-colors flex items-center"
                    >
                        <Trash2 size={16} className="mr-2" /> 删除
                    </button>
                </div>
            </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-6">
            {compData.stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
                    <div className="flex items-center text-stone-400 mb-3 space-x-2">
                        <stat.icon size={16} />
                        <span className="text-xs font-bold">{stat.label}</span>
                    </div>
                    <div className="flex items-baseline mb-1">
                        <span className="text-2xl font-black text-stone-800 font-serif">{stat.value}</span>
                        {stat.unit && <span className="text-sm font-bold text-stone-500 ml-1">{stat.unit}</span>}
                    </div>
                    <div className="text-[10px] font-bold text-stone-400">
                        {stat.change ? <span className="text-green-600">{stat.change}</span> : stat.desc}
                    </div>
                </div>
            ))}
        </div>

        {/* Timeline Visualization */}
        {compData.structure !== 'single' && (
            <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="font-bold text-stone-800 flex items-center"><Layers size={18} className="mr-2 text-stone-400"/> 赛程阶段概览</h3>
                </div>
                
                <div className="relative px-10">
                    <div className="absolute top-5 left-0 right-0 h-0.5 bg-stone-100 z-0"></div>
                    
                    <div className="flex justify-between relative z-10">
                        {compData.timeline.map((stage, idx) => {
                            const isCompleted = stage.status === 'completed';
                            const isCurrent = stage.status === 'current';
                            const isSelected = activeStageIdx === idx;
                            
                            return (
                                <div 
                                    key={idx} 
                                    onClick={() => setActiveStageIdx(idx)}
                                    className={`flex flex-col items-center text-center w-1/3 cursor-pointer group transition-all ${isSelected ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 mb-3 transition-all ${
                                        isCurrent ? 'bg-green-500 border-green-200 text-white shadow-lg scale-110' : 
                                        isCompleted ? 'bg-stone-600 border-stone-300 text-white' : 
                                        'bg-white border-stone-200 text-stone-300'
                                    } ${isSelected ? 'ring-4 ring-offset-2 ring-stone-200' : ''}`}>
                                        {isCompleted ? <Check size={18} /> : <span className="font-bold text-sm">{idx + 1}</span>}
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center gap-1 mb-1">
                                            {stage.mode === 'offline' ? <MapPin size={10} className="text-stone-400"/> : <Monitor size={10} className="text-stone-400"/>}
                                            <span className={`text-sm font-bold ${isCurrent ? 'text-[#7f1d1d]' : 'text-stone-800'}`}>{stage.name}</span>
                                        </div>
                                        <span className="text-[10px] text-stone-500 font-mono bg-stone-50 px-2 py-0.5 rounded-full border border-stone-100">
                                            {stage.date}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        )}

        {/* Stage Dashboard Header */}
        <div className="bg-[#1c1917] rounded-2xl p-6 text-white shadow-lg flex justify-between items-center transition-all duration-300">
            <div>
                <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-lg font-bold">{currentTimelineStage.name} - 运行状态</h2>
                    <span className={`text-[10px] px-2 py-0.5 rounded border font-bold ${
                        currentTimelineStage.status === 'current' 
                        ? 'bg-red-900/50 text-red-200 border-red-800' 
                        : currentTimelineStage.status === 'upcoming' 
                        ? 'bg-stone-700 text-stone-300 border-stone-600'
                        : 'bg-green-900/50 text-green-200 border-green-800'
                    }`}>
                        {currentTimelineStage.status === 'current' ? '当前阶段' : (currentTimelineStage.status === 'completed' ? '已结束' : '未开始')}
                    </span>
                    {currentStageMode === 'offline' ? (
                        <div className="flex items-center text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded border border-white/20">
                            <MapPin size={10} className="mr-1"/> 线下赛 {currentStageAddress && `- ${currentStageAddress}`}
                        </div>
                    ) : (
                        <div className="flex items-center text-[10px] font-bold bg-blue-900/30 px-2 py-0.5 rounded border border-blue-500/30">
                            <Monitor size={10} className="mr-1"/> 线上赛
                        </div>
                    )}
                </div>
                <div className="flex gap-8 mt-4">
                    <div>
                        <div className="text-[10px] text-stone-400 uppercase font-bold mb-1">本阶段参与</div>
                        <div className="text-2xl font-black font-serif">
                            {currentGroups.reduce((acc, g) => acc + (g.applicants || 0), 0)}
                        </div>
                    </div>
                    {currentStageMode === 'online' && (
                        <div>
                            <div className="text-[10px] text-stone-400 uppercase font-bold mb-1">作品提交数</div>
                            <div className="text-2xl font-black font-serif text-red-400">
                                {currentGroups.reduce((acc, g) => acc + (g.submitted || 0), 0)}
                            </div>
                        </div>
                    )}
                    <div>
                        <div className="text-[10px] text-stone-400 uppercase font-bold mb-1">已评审</div>
                        <div className="text-2xl font-black font-serif text-green-400">
                            {currentGroups.reduce((acc, g) => acc + (g.reviewed || 0), 0)}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Group Details Cards */}
        <div className="space-y-4">
            {currentGroups.length > 0 ? currentGroups.map((group, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 font-black text-lg ${idx === 2 ? 'bg-stone-100 text-stone-600' : 'bg-red-50 text-[#7f1d1d]'}`}>
                                {group.name[0]}
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-stone-800">{group.name}</h3>
                                <div className="text-xs text-stone-400 mt-0.5">总进度: {group.progress}%</div>
                            </div>
                        </div>
                    </div>

                    {/* Mini Timeline for Group */}
                    <div className="relative px-4">
                        <div className="absolute top-2.5 left-0 right-0 h-1 bg-stone-100 rounded-full"></div>
                        <div className="absolute top-2.5 left-0 h-1 bg-green-500 rounded-full transition-all duration-1000" style={{width: `${group.progress}%`}}></div>

                        <div className="flex justify-between relative z-10">
                            {((): string[] => {
                                const steps = [];
                                steps.push(isLaterStage ? '晋级名单' : '报名阶段');
                                if (currentStageMode === 'online') {
                                    steps.push('作品上传');
                                }
                                steps.push('专家评分');
                                if (isFinalStage || compData.structure === 'single') {
                                    steps.push('最终成绩发布');
                                } else {
                                    steps.push('晋级确认');
                                }
                                return steps;
                            })().map((step, stepIdx) => {
                                // Status Logic Mapping
                                const statusMap: Record<string, number> = { 
                                    '待开始': -1,
                                    '报名阶段': 0, '晋级名单': 0, 
                                    '作品上传': 1, 
                                    '专家评分': currentStageMode === 'offline' ? 1 : 2, 
                                    '晋级确认': currentStageMode === 'offline' ? 2 : 3,
                                    '最终成绩发布': currentStageMode === 'offline' ? 2 : 3,
                                    '已完成': 4 
                                };
                                const currentStatusIdx = statusMap[group.status] ?? 0;
                                
                                const isPassed = stepIdx < currentStatusIdx;
                                const isCurrent = stepIdx === currentStatusIdx;
                                
                                let StepIcon = Users;
                                if (step === '作品上传') StepIcon = Upload;
                                else if (step === '专家评分') StepIcon = Gavel;
                                else if (step === '晋级确认' || step === '最终成绩发布') StepIcon = TrendingUp;

                                let detailText = '';
                                const showDetail = isPassed || isCurrent; 

                                if (showDetail) {
                                    if (step.includes('名单') || step.includes('报名')) {
                                        detailText = `${group.applicants}人`;
                                    } else if (step === '作品上传') {
                                        const pct = group.applicants > 0 ? Math.round((group.submitted / group.applicants) * 100) : 0;
                                        detailText = `${group.submitted}份 (${pct}%)`;
                                    } else if (step === '专家评分') {
                                        const denominator = currentStageMode === 'online' ? group.submitted : group.applicants;
                                        const pct = denominator > 0 ? Math.round((group.reviewed / denominator) * 100) : 0;
                                        detailText = `已评${pct}%`;
                                    } else if (step === '晋级确认' || step === '最终成绩发布') {
                                        detailText = `完成度 ${group.progress === 100 ? '100%' : '0%'}`;
                                    }
                                }

                                return (
                                    <div key={step} className="flex flex-col items-center text-center w-24">
                                        <div className={`w-6 h-6 rounded-full border-2 mb-2 flex items-center justify-center bg-white ${
                                            isCurrent ? 'border-[#7f1d1d] text-[#7f1d1d] scale-125 shadow-md' : 
                                            isPassed ? 'border-green-500 text-green-500 bg-green-50' : 'border-stone-200 text-stone-300'
                                        }`}>
                                            {isCurrent ? <StepIcon size={12}/> : isPassed ? <Check size={12}/> : <div className="w-1.5 h-1.5 bg-current rounded-full"></div>}
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className={`text-[10px] font-bold mb-0.5 ${isCurrent ? 'text-[#7f1d1d]' : isPassed ? 'text-stone-600' : 'text-stone-400'}`}>
                                                {step}
                                            </span>
                                            <span className={`text-[9px] scale-90 ${isCurrent ? 'text-red-400 font-bold' : isPassed ? 'text-green-600' : 'text-stone-300'}`}>
                                                {isCurrent ? '进行中' : isPassed ? '已完成' : '待开始'}
                                            </span>
                                            
                                            {showDetail && (
                                                <span className="text-[9px] text-stone-500 font-medium bg-stone-50 px-1.5 rounded mt-1 border border-stone-100">
                                                    {detailText}
                                                </span>
                                            )}

                                            {showDetail && (
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); handleStageAction(group.name, step); }}
                                                    className="mt-1.5 text-[9px] font-bold text-stone-500 bg-stone-100 hover:bg-[#7f1d1d] hover:text-white px-2 py-0.5 rounded-full transition-colors flex items-center shadow-sm"
                                                >
                                                    查看详情 <ChevronRight size={8} className="ml-0.5"/>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )) : (
                <div className="p-10 text-center text-stone-400 bg-stone-50 rounded-2xl border border-stone-200">
                    此阶段暂无分组数据
                </div>
            )}
        </div>

        {/* Editor Modal */}
        {showEditor && (
            <CompetitionEditor 
                initialData={compData} 
                onSave={handleSaveCompetition} 
                onClose={() => setShowEditor(false)} 
            />
        )}

        {/* Mobile Simulator Modal */}
        {showPreviewModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/80 backdrop-blur-sm p-4">
                <div className="relative animate-slide-up">
                    <button 
                        onClick={() => setShowPreviewModal(false)}
                        className="absolute -right-12 top-0 bg-white/20 p-2 rounded-full text-white hover:bg-white/40 transition-colors"
                    >
                        <X size={24} />
                    </button>

                    {/* iPhone Frame */}
                    <div className="w-[375px] h-[812px] bg-black rounded-[40px] border-[8px] border-stone-800 shadow-2xl relative overflow-hidden ring-4 ring-stone-700/50">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-stone-800 rounded-b-2xl z-20"></div>
                        
                        <iframe 
                            src={`${window.location.origin}${window.location.pathname}#/competition/${id}`}
                            className="w-full h-full bg-white"
                            title="H5 Preview"
                        />
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default CompetitionDetail;