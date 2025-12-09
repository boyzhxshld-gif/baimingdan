
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Plus, Clock, CheckCircle2, Mic, BookOpen, Video, Globe, AlertCircle, ChevronRight, School, GraduationCap, CreditCard, Upload, GitMerge, Zap, FileBadge, List, MoreHorizontal, ArrowUp, ArrowDown, X, Users, User, XCircle, Award, Edit3, Lock, ChevronUp, MapPin } from 'lucide-react';
import BottomNav from '../components/BottomNav';

interface Student {
    id: string;
    name: string;
    relation: string;
    school: string;
    grade: string;
    avatarColor: string;
    avatarUrl?: string;
}

const MyRegistrations: React.FC = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'TEACHER';
  const isTeacher = userRole === 'TEACHER';
  const isStudent = userRole === 'STUDENT';
  const isParent = userRole === 'PARENT';

  const [activeTab, setActiveTab] = useState('all');
  const [teacherRegType, setTeacherRegType] = useState<'individual' | 'team'>('individual');
  const [showStudentMenu, setShowStudentMenu] = useState(false);
  const [expandedStage, setExpandedStage] = useState<string | null>(null);
  
  const initialStudents: Student[] = [
      { 
          id: '1', 
          name: '王小明', 
          relation: isTeacher ? '学生' : '本人', 
          school: '北京市海淀区第一实验小学', 
          grade: '五年级 (2) 班', 
          avatarColor: 'bg-stone-200',
          avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=60'
      },
      { 
          id: '2', 
          name: '王小红', 
          relation: isTeacher ? '学生' : '妹妹', 
          school: '北京市海淀区第一实验小学', 
          grade: '二年级 (1) 班', 
          avatarColor: 'bg-stone-200',
          avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=60'
      },
      {
          id: '3',
          name: '李小刚',
          relation: isTeacher ? '学生' : '表弟',
          school: '朝阳区实验小学',
          grade: '三年级',
          avatarColor: 'bg-stone-200',
      }
  ];

  const [studentList, setStudentList] = useState<Student[]>(initialStudents);
  const [currentStudent, setCurrentStudent] = useState<Student>(initialStudents[0]);

  // Update current student if role changes or list changes
  useEffect(() => {
      if (studentList.length > 0) {
          setCurrentStudent(studentList[0]);
      }
  }, [userRole]);

  const registrations = [
    { 
      id: '1', 
      studentId: '1', 
      title: '第五届“讲好中国故事”全国青少年语言素养大赛', 
      group: '小学组 / 个人赛',
      status: 'pending', 
      statusText: '晋级待上传', 
      category: '演讲',
      categoryIcon: Mic,
      date: '2025-10-01',
      actionRequired: true,
      actionType: 'upload', 
      deadline: '2天后截止',
      structure: 'promotion',
      currentStageIndex: 2,
      stages: ['初赛', '复赛', '决赛'],
      type: 'individual'
    },
    { 
      id: '2', 
      studentId: '2', 
      title: '经典诗文诵读大赛-海淀区选拔赛', 
      group: '小学组 (A组)',
      status: 'pending', 
      statusText: '待上传作品',
      category: '诵读',
      categoryIcon: BookOpen,
      date: '2025-11-10',
      actionRequired: true,
      actionType: 'upload',
      deadline: '3天后截止',
      structure: 'single',
      type: 'individual'
    },
    { 
      id: '3', 
      studentId: '1',
      title: '“金话筒”青少年主持人大赛', 
      group: '小学组 / 个人赛',
      status: 'active', 
      statusText: '待审核',
      category: '主持',
      categoryIcon: Video,
      date: '2025-11-15',
      actionRequired: false,
      structure: 'promotion',
      currentStageIndex: 1,
      stages: ['初赛', '复赛', '决赛'],
      type: 'individual'
    },
    // Team Scenarios
    {
        id: '10', // Team: Promoted & Wait Upload
        studentId: '1', 
        title: '青少年团队辩论赛',
        group: '初中组 / 团队赛',
        status: 'pending',
        statusText: '已晋级待上传',
        category: '辩论',
        categoryIcon: Users,
        date: '2025-12-01',
        structure: 'promotion',
        currentStageIndex: 1,
        actionRequired: true,
        actionType: 'upload',
        stages: ['初赛', '复赛', '决赛'],
        type: 'team',
        teamName: '飞跃梦想队'
    },
    {
        id: '20', // Team: Submitted / In Review
        studentId: '1', 
        title: '全国少儿英语戏剧团体赛',
        group: '小学组 / 团队赛',
        status: 'active',
        statusText: '作品审核中',
        category: '戏剧',
        categoryIcon: Users,
        date: '2025-11-20',
        structure: 'single',
        type: 'team',
        teamName: '未来之星战队'
    },
    {
        id: '21', // Team: Completed
        studentId: '1', 
        title: '校园合唱艺术节',
        group: '初中组 / 团队赛',
        status: 'ended',
        statusText: '已完赛',
        category: '合唱',
        categoryIcon: Users,
        date: '2025-09-15',
        structure: 'single',
        type: 'team',
        hasCertificate: true,
        teamName: '海淀实验合唱团'
    },
    {
        id: '11', // Promotion: Submitted / Pending Review
        studentId: '1',
        title: '21世纪杯英语演讲比赛', 
        group: '小学组 / 个人赛',
        status: 'pending', 
        statusText: '待审核',
        category: '英语',
        categoryIcon: Globe,
        date: '2025-09-01',
        structure: 'promotion',
        currentStageIndex: 0,
        stages: ['初赛', '复赛', '决赛'],
        type: 'individual'
    },
    {
        id: '12', // Promotion: In Review
        studentId: '2',
        title: '中华经典诵读', 
        group: '小学组',
        status: 'active', 
        statusText: '作品审核中',
        category: '诵读',
        categoryIcon: BookOpen,
        date: '2025-08-20',
        structure: 'promotion',
        currentStageIndex: 0,
        stages: ['初赛', '复赛', '决赛'],
        type: 'individual'
    },
    {
        id: '13', // Promotion: Eliminated (Stage 2)
        studentId: '3',
        title: '青少年科普讲解大赛',
        group: '初中组',
        status: 'ended',
        statusText: '未晋级',
        category: '解说',
        categoryIcon: Video,
        date: '2025-07-20',
        structure: 'promotion',
        hasCertificate: true, 
        currentStageIndex: 1,
        stages: ['初赛', '复赛', '决赛'],
        type: 'individual'
    },
    {
        id: '14', // Promotion: Completed (Awarded)
        studentId: '1',
        title: '全国中学生演讲大赛',
        group: '高中组',
        status: 'ended',
        statusText: '已完赛',
        category: '演讲',
        categoryIcon: Mic,
        date: '2025-06-15',
        structure: 'promotion',
        hasCertificate: true,
        currentStageIndex: 2,
        stages: ['初赛', '复赛', '决赛'],
        type: 'individual'
    },
    { 
        id: '5', 
        studentId: '2',
        title: '童话剧独白表演赛', 
        group: '小学组',
        status: 'ended', 
        statusText: '已完赛',
        category: '戏剧',
        categoryIcon: Globe,
        date: '2025-08-15',
        structure: 'single',
        hasCertificate: true,
        type: 'individual'
    },
    {
        id: '8',
        studentId: '1',
        title: '全国中学生作文大赛',
        group: '小学组',
        status: 'active',
        statusText: '评审进行中',
        category: '写作',
        categoryIcon: BookOpen,
        date: '2025-12-20',
        structure: 'single',
        type: 'individual'
    },
    {
        id: '9',
        studentId: '1',
        title: '少儿编程创意赛',
        group: '小学组',
        status: 'pending',
        statusText: '待审核',
        category: '科技',
        categoryIcon: Zap,
        date: '2025-12-25',
        structure: 'single',
        type: 'individual',
        actionRequired: false 
    },
    {
        id: '7',
        studentId: '3',
        title: '科普讲解大赛',
        group: '初中组',
        status: 'ended',
        statusText: '已完赛',
        category: '解说',
        categoryIcon: Video,
        date: '2025-07-20',
        structure: 'single',
        hasCertificate: true,
        type: 'individual'
    }
  ];

  // Helper to filter base list for counts and display
  const getBaseList = () => {
      return registrations.filter(r => {
          if (isTeacher) {
              if (teacherRegType === 'individual') {
                  // Teacher Individual: Filter by selected student if type matches
                  return r.type === 'individual' && r.studentId === currentStudent.id;
              }
              if (teacherRegType === 'team') {
                  // Teacher Team: Show all teams (or could filter by team if we had a team switcher)
                  return r.type === 'team';
              }
          } else if (isParent) {
              // Parent: Individual items for the selected child
              if (r.type === 'team') return false; 
              if (r.studentId !== currentStudent.id) return false;
          } else if (isStudent) {
              // Student: Only their own items (mocked as ID '1')
              if (r.studentId !== '1') return false;
          }
          return true;
      });
  };

  const baseList = getBaseList();
  const pendingCount = baseList.filter(r => r.actionRequired === true).length;
  const activeCount = baseList.filter(r => r.status === 'active' || (r.status === 'pending' && !r.actionRequired)).length;

  const tabs = [
    { id: 'all', label: '全部' },
    { id: 'pending', label: `待处理${pendingCount > 0 ? ` (${pendingCount})` : ''}` },
    { id: 'active', label: `参赛中${activeCount > 0 ? ` (${activeCount})` : ''}` },
    { id: 'ended', label: '已结束' },
  ];

  const filtered = baseList.filter(r => {
      if (activeTab === 'all') return true;
      if (activeTab === 'pending') return r.actionRequired === true;
      if (activeTab === 'active') return r.status === 'active' || (r.status === 'pending' && !r.actionRequired);
      if (activeTab === 'ended') return r.status === 'ended' || r.status === 'completed' || r.status === 'eliminated';
      return true;
  });

  const getPendingCount = (studentId: string) => {
      return registrations.filter(r => r.studentId === studentId && r.actionRequired).length;
  };

  const getStatusStyle = (item: any) => {
      if (item.actionRequired) return 'bg-amber-50 text-amber-700 border-amber-100';
      if (item.status === 'active' || (item.status === 'pending' && !item.actionRequired)) return 'bg-primary/5 text-primary border-primary/20';
      if (item.status === 'ended' || item.status === 'completed' || item.status === 'eliminated') {
          return 'bg-stone-50 text-stone-400 border-stone-200';
      }
      return 'bg-stone-50 text-stone-500 border-stone-100';
  };

  const handleCardClick = (item: any) => {
      navigate(`/registration/${item.id}`);
  };

  const moveStudent = (index: number, direction: 'up' | 'down') => {
      const newList = [...studentList];
      if (direction === 'up' && index > 0) {
          [newList[index], newList[index - 1]] = [newList[index - 1], newList[index]];
      } else if (direction === 'down' && index < newList.length - 1) {
          [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
      }
      setStudentList(newList);
  };

  // Determine if we show the student switcher
  // Show for Parent OR (Teacher in Individual Mode)
  const showSwitcher = isParent || (isTeacher && teacherRegType === 'individual');

  const toggleExpandedStage = (itemId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setExpandedStage(expandedStage === itemId ? null : itemId);
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <div className="pt-4 pb-2 bg-white shadow-sm sticky top-0 z-20 border-b border-stone-100">
        <div className="px-5 flex items-center justify-between mb-4">
            <h1 className="text-xl font-black text-stone-800 font-serif">我的报名</h1>
            
            {isTeacher && (
              <div className="flex bg-stone-50 p-0.5 rounded-lg border border-stone-100">
                    <button 
                        onClick={() => setTeacherRegType('individual')}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all flex items-center ${
                            teacherRegType === 'individual' 
                            ? 'bg-white text-primary shadow-sm' 
                            : 'text-stone-400 hover:text-stone-600'
                        }`}
                    >
                        <User size={12} className="mr-1" /> 个人
                    </button>
                    <button 
                        onClick={() => setTeacherRegType('team')}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all flex items-center ${
                            teacherRegType === 'team' 
                            ? 'bg-white text-primary shadow-sm' 
                            : 'text-stone-400 hover:text-stone-600'
                        }`}
                    >
                        <Users size={12} className="mr-1" /> 团体
                    </button>
              </div>
            )}
        </div>

        {/* Student Switcher - Visible for Parents AND Teachers (Individual Mode) */}
        {showSwitcher && (
            <div className="w-full overflow-x-auto no-scrollbar px-5 pb-3">
                <div className="flex space-x-4 min-w-max">
                    {studentList.map(student => {
                        const isSelected = currentStudent.id === student.id;
                        const pendingCount = getPendingCount(student.id);
                        return (
                            <div 
                                key={student.id} 
                                className="flex flex-col items-center cursor-pointer group w-14" 
                                onClick={() => setCurrentStudent(student)}
                            >
                                <div className={`relative w-12 h-12 rounded-full transition-all duration-200 ${isSelected ? 'ring-2 ring-offset-2 ring-primary scale-105' : 'ring-1 ring-stone-100 grayscale-[0.3] hover:grayscale-0'}`}>
                                    <div className={`w-full h-full rounded-full overflow-hidden bg-stone-200 border border-white ${student.avatarColor} flex items-center justify-center text-stone-500 text-sm font-bold shadow-sm`}>
                                        {student.avatarUrl ? (
                                            <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" />
                                        ) : (
                                            student.name[0]
                                        )}
                                    </div>
                                    {pendingCount > 0 && (
                                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary border-2 border-white rounded-full flex items-center justify-center text-[9px] text-white font-bold">
                                            {pendingCount}
                                        </span>
                                    )}
                                </div>
                                <span className={`text-[10px] mt-2 font-bold truncate w-full text-center transition-colors ${isSelected ? 'text-primary' : 'text-stone-500 group-hover:text-stone-700'}`}>
                                    {student.name}
                                </span>
                            </div>
                        );
                    })}
                    
                    <div 
                        className="flex flex-col items-center w-14 cursor-pointer group"
                        onClick={() => setShowStudentMenu(true)}
                    >
                        <div className="w-12 h-12 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-400 group-hover:bg-stone-100 group-hover:text-stone-600 transition-colors shadow-sm">
                            <MoreHorizontal size={20} />
                        </div>
                        <span className="text-[10px] mt-2 text-stone-400 font-medium group-hover:text-stone-600 transition-colors">
                            更多
                        </span>
                    </div>
                </div>
            </div>
        )}

        {/* Student Menu Modal */}
        {showSwitcher && showStudentMenu && (
            <div className="fixed inset-0 z-50 flex items-end justify-center">
                <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm transition-opacity" onClick={() => setShowStudentMenu(false)}></div>
                
                <div className="bg-white w-full max-w-md rounded-t-[2rem] shadow-2xl relative z-10 animate-slide-up h-[70vh] flex flex-col">
                    <div className="w-full flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing" onClick={() => setShowStudentMenu(false)}>
                        <div className="w-12 h-1.5 bg-stone-200 rounded-full"></div>
                    </div>

                    <div className="px-6 py-4 flex justify-between items-center border-b border-stone-50">
                        <div>
                            <h3 className="text-lg font-black text-stone-800 font-serif">选手管理</h3>
                            <p className="text-xs text-stone-400 mt-0.5">点击选中，或调整展示顺序</p>
                        </div>
                        <button 
                            onClick={() => setShowStudentMenu(false)} 
                            className="bg-stone-100 p-2 rounded-full text-stone-500 hover:bg-stone-200 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {studentList.map((student, index) => {
                            const pendingCount = getPendingCount(student.id);
                            const isCurrent = currentStudent.id === student.id;
                            return (
                                <div 
                                    key={student.id}
                                    className={`p-3 rounded-2xl border transition-all flex items-center group ${
                                        isCurrent 
                                        ? 'bg-primary/5 border-primary/20 shadow-sm' 
                                        : 'bg-white border-stone-100 hover:border-primary/10'
                                    }`}
                                >
                                    <div 
                                        className="flex items-center flex-1 cursor-pointer"
                                        onClick={() => {
                                            setCurrentStudent(student);
                                            setShowStudentMenu(false);
                                        }}
                                    >
                                        <div className={`w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 font-bold text-lg mr-4 shadow-sm border-2 border-white overflow-hidden flex-shrink-0`}>
                                            {student.avatarUrl ? (
                                                <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" />
                                            ) : (
                                                student.name[0]
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center mb-1">
                                                <span className={`font-bold mr-2 truncate ${isCurrent ? 'text-primary' : 'text-stone-800'}`}>{student.name}</span>
                                                {student.relation && (
                                                    <span className="text-[10px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded font-medium flex-shrink-0">{student.relation}</span>
                                                )}
                                                {pendingCount > 0 && (
                                                    <span className="ml-2 text-[10px] bg-primary text-white px-1.5 py-0.5 rounded-full font-bold">
                                                        {pendingCount}待办
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-xs text-stone-500 flex items-center truncate">
                                                <School size={10} className="mr-1 flex-shrink-0" /> {student.school}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col space-y-1 ml-2 pl-2 border-l border-stone-100">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); moveStudent(index, 'up'); }}
                                            disabled={index === 0}
                                            className="p-1.5 text-stone-400 hover:text-primary hover:bg-stone-50 rounded-lg disabled:opacity-20 disabled:hover:bg-transparent"
                                        >
                                            <ArrowUp size={14} />
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); moveStudent(index, 'down'); }}
                                            disabled={index === studentList.length - 1}
                                            className="p-1.5 text-stone-400 hover:text-primary hover:bg-stone-50 rounded-lg disabled:opacity-20 disabled:hover:bg-transparent"
                                        >
                                            <ArrowDown size={14} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="p-4 bg-white border-t border-stone-50 pb-8">
                        <button 
                            onClick={() => {
                                setShowStudentMenu(false);
                                navigate('/mine/archives');
                            }}
                            className="w-full py-4 border-2 border-dashed border-stone-200 rounded-2xl text-stone-500 font-bold text-sm flex items-center justify-center hover:bg-stone-50 hover:border-primary/50 hover:text-primary transition-all active:scale-[0.99]"
                        >
                            <Plus size={18} className="mr-2" /> 添加新选手
                        </button>
                    </div>
                </div>
            </div>
        )}

        <div className="px-5">
            <div className="flex p-1 bg-stone-100 rounded-xl mb-2">
            {tabs.map(tab => (
                <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id 
                    ? 'bg-white text-primary shadow-sm' 
                    : 'text-stone-400 hover:text-stone-600'
                }`}
                >
                {tab.label}
                </button>
            ))}
            </div>
        </div>
      </div>

      <div className="px-5 py-4 space-y-4 pb-24 animate-slide-up">
        {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-stone-400">
                <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle size={32} className="opacity-50" />
                </div>
                <p className="text-sm font-medium">
                    {(isTeacher && teacherRegType === 'team') 
                      ? '暂无团体报名记录' 
                      : (showSwitcher ? `${currentStudent.name} 暂无${activeTab === 'all' ? '' : '此状态的'}报名记录` : '暂无报名记录')
                    }
                </p>
                <button onClick={() => navigate('/competitions')} className="mt-4 text-primary font-bold text-sm">
                    去报名参赛
                </button>
            </div>
        )}

        {filtered.map((item) => {
            const isPending = item.status === 'pending';
            const showAction = item.actionRequired && isPending;
            const isExpanded = expandedStage === item.id;
            
            return (
              <div 
                key={item.id} 
                onClick={() => handleCardClick(item)}
                className="bg-white rounded-2xl p-5 border border-stone-100 shadow-card transition-all duration-200 cursor-pointer hover:border-primary/30 active:scale-[0.99] group relative overflow-hidden"
              >
                {/* Background Watermark */}
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] transform rotate-12 pointer-events-none">
                    <item.categoryIcon size={100} className="text-stone-900" />
                </div>

                <div className="flex justify-between items-start mb-3 relative z-10">
                    <div className="flex items-center gap-2">
                        {item.structure === 'promotion' ? (
                            <span className="text-[10px] font-bold bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded border border-stone-200 flex items-center">
                                <GitMerge size={10} className="mr-1"/> 晋级制
                            </span>
                        ) : (
                            <span className="text-[10px] font-bold bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded border border-stone-200 flex items-center">
                                <Zap size={10} className="mr-1"/> 单项赛
                            </span>
                        )}
                        
                        {item.teamName && (
                            <span className="text-[10px] font-bold bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded border border-stone-200 flex items-center">
                                <Users size={10} className="mr-1"/> {item.teamName}
                            </span>
                        )}
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center border ${getStatusStyle(item)}`}>
                        {item.statusText}
                    </span>
                </div>

                <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="flex-1 pr-3">
                         <h3 className="text-base font-bold text-stone-800 leading-snug group-hover:text-primary transition-colors mb-1.5 font-serif">
                            {item.title}
                         </h3>
                         <p className="text-xs text-stone-400 flex items-center">
                            <span className="bg-stone-50 px-1.5 py-0.5 rounded mr-2 text-stone-500 font-medium">{item.category}</span>
                            {item.group}
                         </p>
                    </div>
                </div>

                {/* Render Stages ONLY if not a single structure */}
                {item.stages && item.structure !== 'single' && (
                    <div className="flex items-center justify-between mb-4 px-2 relative z-10">
                        <div className="absolute top-2.5 left-4 right-4 h-0.5 bg-stone-100 -z-10"></div>
                        {item.stages.map((stage: string, idx: number) => {
                            const isPast = idx < (item.currentStageIndex ?? -1);
                            const isCurrent = idx === item.currentStageIndex;
                            
                            const isEliminated = item.statusText === '已淘汰' || item.statusText === '未晋级';
                            const isFailedStage = isEliminated && isCurrent;

                            return (
                                <div key={idx} className="flex flex-col items-center w-12">
                                    <div className={`w-5 h-5 rounded-full mb-1 border-2 flex items-center justify-center shadow-sm transition-all ${
                                        isFailedStage ? 'bg-stone-200 border-stone-300 text-stone-500' :
                                        isPast ? 'bg-stone-300 border-stone-300 text-white' : 
                                        isCurrent ? 'bg-primary border-primary text-white ring-4 ring-red-50' :
                                        'bg-stone-50 border-stone-200'
                                    }`}>
                                        {isFailedStage ? <XCircle size={12}/> : 
                                         isPast ? <CheckCircle2 size={12} /> : 
                                         isCurrent ? <div className="w-2 h-2 bg-white rounded-full"></div> : 
                                         <div className="w-1.5 h-1.5 bg-stone-300 rounded-full"></div>}
                                    </div>
                                    <span className={`text-[10px] font-bold truncate max-w-full ${
                                        isFailedStage ? 'text-stone-400' :
                                        isCurrent ? 'text-primary' : isPast ? 'text-stone-400' : 'text-stone-300'
                                    }`}>{stage}</span>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="h-px bg-stone-50 w-full mb-3 relative z-10"></div>

                <div className="flex items-center justify-between relative z-10">
                    <div className="text-xs font-medium">
                        {isPending && !showAction && (
                             <span className="text-stone-500 flex items-center">
                                <Clock size={14} className="mr-1" /> 评审即将开始
                            </span>
                        )}
                        {showAction && (
                            <span className="text-amber-700 flex items-center font-bold">
                                <Clock size={14} className="mr-1" /> {item.deadline || '请尽快提交'}
                            </span>
                        )}
                        {item.status === 'active' && (
                            <span className="text-primary flex items-center">
                                <Clock size={14} className="mr-1" /> 评审进行中
                            </span>
                        )}
                        {item.status === 'ended' && (
                             <div className="flex space-x-3 items-center">
                                <span className="text-stone-500">
                                    {item.statusText === '已完赛' || item.hasCertificate ? '比赛已结束' : '比赛结束'}
                                </span>
                             </div>
                        )}
                    </div>

                    <div className="flex items-center text-stone-300 group-hover:text-primary transition-colors text-xs font-bold">
                        {showAction && item.actionType === 'upload' ? (
                            <span className="text-primary flex items-center mr-1">
                                <Upload size={14} className="mr-1" /> 去上传
                            </span>
                        ) : (showAction && item.statusText.includes('修改')) ? (
                             <span className="text-blue-600 flex items-center mr-1">
                                <Edit3 size={14} className="mr-1" /> 修改作品
                            </span>
                        ) : (
                            <>查看详情 <ChevronRight size={14} className="ml-0.5" /></>
                        )}
                    </div>
                </div>
              </div>
            );
        })}
      </div>
      
      <BottomNav />
    </div>
  );
};

export default MyRegistrations;
