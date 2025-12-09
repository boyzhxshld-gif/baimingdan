
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Play, Award, UploadCloud, Clock, MapPin, AlertCircle, ChevronDown, ChevronUp, Lock, FileBadge, XCircle, Edit3, Calendar, Eye } from 'lucide-react';
import Header from '../components/Header';

const RegistrationDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Dynamic State based on ID scenario
  const [currentStatus, setCurrentStatus] = useState<'wait_upload' | 'submitted' | 'in_review' | 'completed' | 'eliminated'>('wait_upload');
  const [stages, setStages] = useState<any[]>([]);
  const [data, setData] = useState<any>({});
  const [isSingle, setIsSingle] = useState(false);

  useEffect(() => {
    // Simulate fetching data
    setLoading(true);
    
    setTimeout(() => {
        if (id === '1') {
            setCurrentStatus('wait_upload');
            setData({
                title: '第五届“讲好中国故事”全国青少年语言素养大赛',
                student: '王小明',
                group: '小学组 / 个人赛 / 演讲',
                registrationNo: 'BS202510250032',
                currentStage: '全国总决赛',
            });
            setStages([
                {
                    id: 101, name: '市级初赛', type: 'online', status: 'completed', result: 'promoted',
                    rank: 'Top 5%', comment: '发音标准，情感充沛。',
                    workName: '初赛作品.mp4'
                },
                {
                    id: 102, name: '省级复赛', type: 'offline', status: 'completed', result: 'promoted',
                    rank: '一等奖', comment: '现场表现沉稳。',
                    location: '济南市山东大厦会议中心'
                },
                {
                    id: 103, name: '全国总决赛', type: 'offline', status: 'current',
                    location: '北京市中国教育电视台演播大厅', time: '2025-10-01',
                    isActionRequired: true
                }
            ]);
            setExpandedStage(2); 
        } else if (id === '2') {
            // Single, Wait Upload
            setCurrentStatus('wait_upload');
            setIsSingle(true);
            setData({
                title: '经典诗文诵读大赛-海淀区选拔赛',
                student: '王小明',
                group: '小学组 (A组)',
                registrationNo: 'SD202511100055',
                currentStage: '初赛',
            });
            setStages([
                {
                    id: 201, name: '初赛 (作品海选)', type: 'online', status: 'current',
                    time: '2025-11-10 截止',
                    isActionRequired: true
                }
            ]);
            setExpandedStage(0);
        } else if (id === '3') {
            // SCENARIO: Promotion, Stage 2 Submitted
            setCurrentStatus('submitted');
            setData({
                title: '“金话筒”青少年主持人大赛',
                student: '王小明',
                group: '小学组 / 个人赛',
                registrationNo: 'HOST2025111588',
                currentStage: '省级复赛',
            });
            setStages([
                {
                    id: 301, name: '市级初赛', type: 'online', status: 'completed', result: 'promoted',
                    rank: '一等奖', comment: '台风非常好。',
                    workName: '主持视频.mp4'
                },
                {
                    id: 302, name: '省级复赛', type: 'online', status: 'current',
                    time: '等待评审开始',
                    workName: '复赛-模拟主持.mp4', submitTime: '2025-11-14',
                    isSubmitted: true
                },
                {
                    id: 303, name: '全国总决赛', type: 'offline', status: 'locked',
                }
            ]);
            setExpandedStage(1);
        } else if (id === '10') {
            // SCENARIO: Promotion, Promoted to Stage 2, Wait Upload
            setCurrentStatus('wait_upload');
            setData({
                title: '青少年团队辩论赛',
                student: '飞跃梦想队',
                group: '初中组 / 团队赛',
                registrationNo: 'DEBATE20251201',
                currentStage: '复赛',
            });
            setStages([
                {
                    id: 1001, name: '初赛', type: 'online', status: 'completed', result: 'promoted',
                    rank: '晋级', comment: '论点清晰。',
                    workName: '初赛辩论.mp4'
                },
                {
                    id: 1002, name: '复赛', type: 'online', status: 'current',
                    time: '2025-12-10 截止',
                    isActionRequired: true
                },
                {
                    id: 1003, name: '决赛', type: 'offline', status: 'locked',
                }
            ]);
            setExpandedStage(1);
        } else if (id === '11') {
            // SCENARIO: Promotion, Stage 1 Submitted (First time)
            setCurrentStatus('submitted');
            setData({
                title: '21世纪杯英语演讲比赛',
                student: '王小明',
                group: '小学组',
                registrationNo: 'ENG2025001',
                currentStage: '初赛',
            });
            setStages([
                {
                    id: 1101, name: '初赛', type: 'online', status: 'current',
                    time: '等待评审',
                    workName: 'EnglishSpeech.mp4', submitTime: '2025-11-15',
                    isSubmitted: true
                },
                {
                    id: 1102, name: '复赛', type: 'offline', status: 'locked',
                }
            ]);
            setExpandedStage(0);
        } else if (id === '12') {
            // SCENARIO: Promotion, Stage 1 In Review
            setCurrentStatus('in_review');
            setData({
                title: '中华经典诵读',
                student: '王小红',
                group: '小学组',
                registrationNo: 'READ2025002',
                currentStage: '初赛',
            });
            setStages([
                {
                    id: 1201, name: '初赛', type: 'online', status: 'current',
                    time: '作品评审中',
                    workName: 'SongDu.mp4',
                    isReviewing: true
                },
                {
                    id: 1202, name: '复赛', type: 'offline', status: 'locked',
                }
            ]);
            setExpandedStage(0);
        } else if (id === '13') {
            // SCENARIO: Promotion, Stage 2 Eliminated
            setCurrentStatus('eliminated');
            setData({
                title: '青少年科普讲解大赛',
                student: '李小刚',
                group: '初中组',
                registrationNo: 'SCI2025003',
                currentStage: '复赛',
            });
            setStages([
                {
                    id: 1301, name: '初赛', type: 'online', status: 'completed', result: 'promoted',
                    rank: '晋级', comment: '很有趣。',
                    workName: 'Sci_Stage1.mp4'
                },
                {
                    id: 1302, name: '复赛', type: 'online', status: 'completed', result: 'eliminated',
                    rank: '未晋级', comment: '深度不足。',
                    workName: 'Sci_Stage2.mp4',
                    isEliminated: true
                },
                {
                    id: 1303, name: '决赛', type: 'offline', status: 'locked',
                }
            ]);
            setExpandedStage(1);
        } else if (id === '14') {
            // SCENARIO: Promotion, Final Completed (Awarded)
            setCurrentStatus('completed');
            setData({
                title: '全国中学生演讲大赛',
                student: '王小明',
                group: '高中组',
                registrationNo: 'SPEECH2025999',
                currentStage: '决赛',
            });
            setStages([
                {
                    id: 1401, name: '初赛', type: 'online', status: 'completed', result: 'promoted',
                    rank: '晋级',
                },
                {
                    id: 1402, name: '复赛', type: 'offline', status: 'completed', result: 'promoted',
                    rank: '一等奖',
                },
                {
                    id: 1403, name: '决赛', type: 'offline', status: 'completed', result: 'awarded',
                    rank: '特等奖', comment: '完美表现！',
                    isAwarded: true
                }
            ]);
            setExpandedStage(2);
        } else if (id === '8') {
             // Essay: In Review (Single)
             setCurrentStatus('in_review');
             setIsSingle(true);
             setData({
                title: '全国中学生作文大赛',
                student: '王小明',
                group: '小学组',
                registrationNo: 'WRITE2025122088',
                currentStage: '评审阶段',
            });
            setStages([
                {
                    id: 801, name: '作品提交', type: 'online', status: 'current',
                    time: '评审进行中',
                    workName: '我的作文.pdf', 
                    isReviewing: true
                }
            ]);
            setExpandedStage(0);
        } else if (id === '7') {
             // Science: Completed (Ended) Single
             setCurrentStatus('completed');
             setIsSingle(true);
             setData({
                title: '科普讲解大赛',
                student: '李小刚',
                group: '初中组',
                registrationNo: 'SCI2025072001',
                currentStage: '初赛',
            });
            setStages([
                {
                    id: 701, name: '初赛', type: 'online', status: 'completed', result: 'completed',
                    comment: '内容详实，但表达略显生硬。',
                    workName: '科普讲解.mp4'
                }
            ]);
            setExpandedStage(0);
        } else if (id === '9') {
             // New Single: Submitted (Wait Review)
             setCurrentStatus('submitted');
             setIsSingle(true);
             setData({
                title: '少儿编程创意赛',
                student: '王小明',
                group: '小学组',
                registrationNo: 'CODE2025122501',
                currentStage: '作品评审',
            });
            setStages([
                {
                    id: 901, name: '初赛', type: 'online', status: 'current',
                    time: '等待评审开始',
                    workName: 'MyGame.sb3', submitTime: '2025-12-01',
                    isSubmitted: true
                }
            ]);
            setExpandedStage(0);
        } else if (id === '5') {
             // Wang Xiaohong - Drama - Completed/Ended
             setCurrentStatus('completed');
             setIsSingle(true);
             setData({
                title: '童话剧独白表演赛',
                student: '王小红',
                group: '小学组',
                registrationNo: 'DRAMA2025081501',
                currentStage: '作品评选',
            });
            setStages([
                {
                    id: 501, name: '作品评选', type: 'online', status: 'completed', result: 'awarded',
                    comment: '表演生动，富有感染力。',
                    workName: '白雪公主独白.mp4',
                    isAwarded: true
                }
            ]);
            setExpandedStage(0);
        } else {
             setCurrentStatus('wait_upload');
        }
        setLoading(false);
    }, 500);
  }, [id]);

  const toggleStage = (index: number) => {
      setExpandedStage(expandedStage === index ? null : index);
  };

  const handleGoToUpload = (mode: 'edit' | 'preview' | 'new') => {
      const currentStageIndex = stages.findIndex(s => s.status === 'current');
      const canReuse = !isSingle && currentStageIndex > 0;
      navigate(`/upload/${id}?mode=${mode === 'new' ? '' : mode}`, { state: { canReuse } });
  };

  const handleViewCertificate = () => {
      navigate(`/certificate/${id}`);
  };

  const getStatusUI = () => {
      switch (currentStatus) {
          case 'wait_upload':
              return {
                  text: isSingle ? '待上传作品' : '晋级待上传',
                  icon: <UploadCloud size={28} />,
                  color: 'bg-amber-50 text-amber-600',
                  actionText: '立即上传作品',
                  actionIcon: <UploadCloud size={16} className="mr-1.5" />,
                  actionColor: 'bg-primary hover:bg-primary-dark text-white',
                  showAction: true,
                  onClickAction: () => handleGoToUpload('new'),
                  desc: '请在截止日期前提交您的参赛视频。'
              };
          case 'submitted':
              return {
                  text: '待审核',
                  icon: <Clock size={28} />,
                  color: 'bg-blue-50 text-blue-600',
                  actionText: '修改作品',
                  actionIcon: <Edit3 size={16} className="mr-1.5" />,
                  actionColor: 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50',
                  showAction: true,
                  onClickAction: () => handleGoToUpload('edit'),
                  desc: '作品已提交，等待评审开始。在此期间您可以修改作品。'
              };
          case 'in_review':
               return {
                  text: '作品审核中',
                  icon: <Clock size={28} />,
                  color: 'bg-stone-100 text-primary',
                  actionText: '预览作品',
                  actionIcon: <Eye size={16} className="mr-1.5" />,
                  actionColor: 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50',
                  showAction: true,
                  onClickAction: () => handleGoToUpload('preview'),
                  desc: '您的作品正在进行专家评审，期间无法修改。'
               };
          case 'eliminated':
               return {
                  text: '未晋级',
                  icon: <XCircle size={28} />,
                  color: 'bg-red-50 text-stone-500', // Light red background for eliminated card
                  showAction: false,
                  desc: '很遗憾您未晋级下一轮，感谢您的参与！'
               };
          case 'completed':
               return {
                  text: '已完赛',
                  icon: <FileBadge size={28} />,
                  color: 'bg-green-50 text-green-600',
                  actionText: '查看荣誉证书',
                  actionIcon: <FileBadge size={16} className="mr-1.5" />,
                  actionColor: 'bg-amber-600 hover:bg-amber-700 text-white',
                  showAction: true, 
                  onClickAction: handleViewCertificate,
                  desc: '恭喜您完成所有赛程，点击查看获奖情况。'
               };
          default:
              return {
                  text: '未知状态',
                  icon: <AlertCircle size={28} />,
                  color: 'bg-stone-100 text-stone-500',
                  showAction: false,
                  desc: ''
              };
      }
  };

  const ui = getStatusUI();

  if (loading) {
      return (
          <div className="min-h-screen bg-stone-50 flex flex-col">
              <Header title="报名详情" />
              <div className="flex-1 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-stone-200 border-t-primary rounded-full animate-spin"></div>
              </div>
          </div>
      )
  }

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <Header title="报名详情" />

      <div className="p-5 pb-24 animate-slide-up">
         {/* Top Status Card */}
         <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-stone-100 to-stone-200 rounded-bl-full -mr-8 -mt-8 z-0 opacity-50"></div>
            
            <div className="relative z-10 text-center">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-3 shadow-sm ${ui.color}`}>
                    {ui.icon}
                </div>
                <h2 className="text-xl font-black text-stone-800 mb-1 font-serif">{ui.text}</h2>
                {!isSingle && (
                    <p className="text-xs text-stone-500 font-medium mb-3">
                        当前阶段：<span className="text-primary font-bold">{data.currentStage}</span>
                    </p>
                )}
                <div className="text-xs text-stone-400 bg-stone-50 inline-block px-3 py-1 rounded-full border border-stone-100">
                    {ui.desc}
                </div>

                {ui.showAction && (
                    <div className="mt-5 w-full">
                        <button 
                            onClick={ui.onClickAction}
                            className={`w-full py-3 ${ui.actionColor} rounded-xl font-bold text-sm shadow-sm active:scale-95 transition-all flex items-center justify-center`}
                        >
                            {ui.actionIcon}
                            {ui.actionText}
                        </button>
                    </div>
                )}
            </div>
         </div>

         {/* Stages Timeline (Hidden for Single Competitions) */}
         {!isSingle && (
             <div className="space-y-4 mb-6">
                 <div className="flex items-center justify-between px-1 mb-2">
                     <h3 className="font-bold text-stone-800 text-sm font-serif">赛事进程</h3>
                 </div>

                 {stages.map((stage, index) => {
                     const isCompleted = stage.status === 'completed';
                     const isCurrent = stage.status === 'current';
                     const isLocked = stage.status === 'locked';
                     const isExpanded = expandedStage === index;
                     
                     const isEliminated = stage.isEliminated || stage.result === 'eliminated';
                     const isAwarded = stage.isAwarded;

                     return (
                         <div key={stage.id} className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isCurrent ? 'border-primary shadow-md ring-1 ring-primary/10' : 'border-stone-100 shadow-sm'}`}>
                             {/* Stage Header */}
                             <div 
                                onClick={() => !isLocked && toggleStage(index)}
                                className={`p-4 flex items-center justify-between cursor-pointer ${isCurrent ? 'bg-primary/5' : ''}`}
                             >
                                 <div className="flex items-center">
                                     <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 border-2 ${
                                         isAwarded ? 'bg-amber-50 border-amber-500 text-amber-600' :
                                         isEliminated ? 'bg-red-50 border-red-200 text-red-400' : // Light red for eliminated stage icon
                                         isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                                         isCurrent ? 'bg-white border-primary text-primary' : 
                                         'bg-stone-50 border-stone-200 text-stone-300'
                                     }`}>
                                         {isAwarded ? <Award size={16} /> :
                                          isEliminated ? <XCircle size={16} /> :
                                          isCompleted ? <CheckCircle2 size={16} /> : 
                                          isCurrent ? <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"></div> : 
                                          <Lock size={14} />}
                                     </div>
                                     <div>
                                         <h4 className={`font-bold text-sm ${isLocked ? 'text-stone-400' : 'text-stone-800'}`}>{stage.name}</h4>
                                         <div className="flex items-center mt-0.5 space-x-2">
                                             <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                                                 stage.type === 'online' ? 'bg-stone-50 border-stone-200 text-stone-500' : 'bg-purple-50 border-purple-100 text-purple-600'
                                             }`}>
                                                 {stage.type === 'online' ? '线上作品' : '线下现场'}
                                             </span>
                                             {stage.result === 'promoted' && (
                                                 <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">已晋级</span>
                                             )}
                                              {stage.result === 'eliminated' && (
                                                 <span className="text-[10px] font-bold text-red-400 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">未晋级</span>
                                             )}
                                             {stage.result === 'awarded' && (
                                                 <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">获奖</span>
                                             )}
                                         </div>
                                     </div>
                                 </div>
                                 <div className="flex items-center text-stone-400">
                                     {/* Score REMOVED from here */}
                                     {!isLocked && (isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                                 </div>
                             </div>

                             {/* Expanded Details */}
                             {isExpanded && (
                                 <div className="px-4 pb-4 pt-0 animate-fade-in">
                                     <div className="h-px w-full bg-stone-100 mb-4"></div>
                                     
                                     {(isCompleted || isEliminated) && (
                                         <div className="space-y-3">
                                             <div className={`flex justify-between items-start p-3 rounded-xl border ${isEliminated ? 'bg-red-50 border-red-100' : 'bg-stone-50 border-stone-100'}`}>
                                                 <div className="text-xs text-stone-500">
                                                     <span className="block font-bold text-stone-700 mb-1">评委评语</span>
                                                     "{stage.comment || '暂无评语'}"
                                                 </div>
                                                 {stage.rank && <div className={`text-[10px] font-bold px-2 py-1 rounded ml-2 whitespace-nowrap ${isEliminated ? 'bg-white text-stone-500 border border-stone-200' : 'bg-amber-100 text-amber-700'}`}>{stage.rank}</div>}
                                             </div>
                                             
                                             {stage.workName && (
                                                 <div className="space-y-2">
                                                     <div className="text-xs font-bold text-stone-500">参赛作品</div>
                                                     <div className="w-full aspect-video bg-black rounded-xl overflow-hidden relative group cursor-pointer">
                                                         <img src="https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=800&auto=format&fit=crop&q=60" className="w-full h-full object-cover opacity-80" />
                                                         <div className="absolute inset-0 flex items-center justify-center">
                                                             <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                                                                 <Play size={20} className="text-white ml-1" fill="currentColor" />
                                                             </div>
                                                         </div>
                                                     </div>
                                                     <div className="flex items-center text-[10px] text-stone-400">
                                                        <CheckCircle2 size={12} className="mr-1 text-green-500" /> {stage.workName}
                                                     </div>
                                                 </div>
                                             )}
                                         </div>
                                     )}

                                     {isCurrent && (
                                         <div className="space-y-3">
                                             {(stage.time || stage.location) && (
                                                 <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs text-stone-700 space-y-1">
                                                     {stage.time && (
                                                         <div className="flex items-center"><Calendar size={14} className="mr-2 text-primary" /> {stage.time}</div>
                                                     )}
                                                     {stage.location && (
                                                         <div className="flex items-center"><MapPin size={14} className="mr-2 text-primary" /> {stage.location}</div>
                                                     )}
                                                 </div>
                                             )}

                                             {stage.isReviewing && (
                                                 <div className="bg-primary/5 p-3 rounded-xl border border-primary/20 text-xs text-primary flex items-center justify-between">
                                                     <div className="flex items-center">
                                                        <Clock size={16} className="mr-2" />
                                                        作品正在评审中
                                                     </div>
                                                     <button 
                                                        onClick={() => handleGoToUpload('preview')}
                                                        className="bg-white border border-primary/30 text-primary px-3 py-1 rounded-lg text-[10px] font-bold shadow-sm flex items-center hover:bg-stone-50"
                                                     >
                                                         <Eye size={12} className="mr-1" /> 预览作品
                                                     </button>
                                                 </div>
                                             )}

                                             {stage.isSubmitted && (
                                                 <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-xs text-blue-700 flex items-center justify-between">
                                                     <div className="flex items-center">
                                                        <CheckCircle2 size={16} className="mr-2" />
                                                        已提交，等待评审
                                                     </div>
                                                     <button 
                                                        onClick={() => handleGoToUpload('edit')}
                                                        className="bg-white border border-blue-200 text-blue-600 px-3 py-1 rounded-lg text-[10px] font-bold shadow-sm flex items-center hover:bg-stone-50"
                                                     >
                                                         <Edit3 size={12} className="mr-1" /> 修改
                                                     </button>
                                                 </div>
                                             )}
                                             
                                             {stage.isActionRequired && currentStatus === 'wait_upload' && (
                                                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                                                     <div className="text-xs text-stone-500">
                                                         还未提交作品
                                                     </div>
                                                     <button onClick={() => handleGoToUpload('new')} className="px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-bold">
                                                         去上传
                                                     </button>
                                                 </div>
                                             )}
                                         </div>
                                     )}
                                 </div>
                             )}
                         </div>
                     );
                 })}
             </div>
         )}

         {/* Registration Info */}
         <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200">
             <h3 className="font-bold text-stone-800 text-sm mb-4 font-serif">基础信息</h3>
             <div className="space-y-3 text-sm">
                 <div className="flex justify-between py-2 border-b border-stone-50">
                     <span className="text-stone-500">参赛赛事</span>
                     <span className="font-medium text-stone-800 max-w-[200px] truncate text-right">{data.title}</span>
                 </div>
                 <div className="flex justify-between py-2 border-b border-stone-50">
                     <span className="text-stone-500">参赛选手</span>
                     <span className="font-medium text-stone-800">{data.student}</span>
                 </div>
                 <div className="flex justify-between py-2 border-b border-stone-50">
                     <span className="text-stone-500">赛道组别</span>
                     <span className="font-medium text-stone-800">{data.group}</span>
                 </div>
                 <div className="flex justify-between pt-2">
                     <span className="text-stone-500">报名编号</span>
                     <span className="font-medium text-stone-800 font-mono">{data.registrationNo}</span>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default RegistrationDetail;
