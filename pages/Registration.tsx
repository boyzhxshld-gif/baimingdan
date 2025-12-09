
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, Info, CheckCircle2, Plus, MapPin, X, AlertTriangle, ChevronRight, User, Users, School, BadgeCheck, Phone, FileText, Lock, Contact, CreditCard, Trash2, Camera, Edit2, Check } from 'lucide-react';
import Header from '../components/Header';

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userRole = localStorage.getItem('userRole') || 'TEACHER';
  const isStudentRole = userRole === 'STUDENT';
  const isParentRole = userRole === 'PARENT';
  const isTeacherRole = userRole === 'TEACHER';

  const [linkedStudents, setLinkedStudents] = useState([
    {
      id: '1',
      name: '王小明',
      gender: '男',
      idType: '身份证',
      idNumber: '110105201201011234',
      phone: '13800138000',
      school: '北京市第一实验小学',
      grade: '五年级',
      teacher: '李华',
      relation: '学生',
      avatarColor: 'bg-blue-500',
      avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&auto=format&fit=crop&q=80'
    },
    {
      id: '2',
      name: '李小红',
      gender: '女',
      idType: '身份证',
      idNumber: '110105201205051234',
      school: '北京市第一实验小学',
      grade: '五年级',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80'
    },
    {
      id: '3',
      name: '张小刚',
      gender: '男',
      idType: '身份证',
      idNumber: '110105201206061234',
      school: '北京市第一实验小学',
      grade: '五年级',
      avatarUrl: ''
    }
  ]);

  const [linkedTeams, setLinkedTeams] = useState([
      { id: 't1', name: '飞跃梦想队', members: 5, leader: '李华', memberIds: ['1', '2', '3'] },
      { id: 't2', name: '未来之星战队', members: 3, leader: '李华', memberIds: ['2'] }
  ]);

  const regions = ['北京赛区', '上海赛区', '苏州赛区', '杭州赛区', '广州赛区', '深圳赛区', '线上赛区'];
  const levels = ['小学组', '初中组', '高中/职高'];
  const idTypes = ['身份证', '护照', '港澳台通行证'];
  const genders = ['男', '女'];

  const [participationType, setParticipationType] = useState<'single' | 'team'>('single');
  
  // Teacher/Parent Mode State
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');
  
  // Student Mode State (Editable Form)
  const [studentFormData, setStudentFormData] = useState({
      name: '王小明', // Mock pre-fill
      gender: '男',
      idType: '身份证',
      idNumber: '110105201201011234',
      school: '北京市第一实验小学',
      grade: '五年级',
      avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&auto=format&fit=crop&q=80'
  });

  // Manual Add Form State
  const [manualForm, setManualForm] = useState({
      name: '',
      gender: '男',
      idType: '身份证',
      idNumber: '',
      school: ''
  });

  // Common State
  const [showStudentSelector, setShowStudentSelector] = useState(false);
  const [showRegionPicker, setShowRegionPicker] = useState(false);
  const [showTeamPicker, setShowTeamPicker] = useState(false);
  const [showLevelPicker, setShowLevelPicker] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);

  const [formData, setFormData] = useState({
    region: '北京赛区',
    track: '', 
    level: '', 
    workName: '',
    teamName: '',
    contactPhone: '13800138000'
  });

  useEffect(() => {
    let track = '演讲';
    let level = '小学组';
    if (id === '1') { track = '演讲'; level = '小学组'; }
    else if (id === '2') { track = '朗诵'; level = '小学组'; }
    else if (id === '3') { track = '主持'; level = '初中组'; }
    
    setFormData(prev => ({ ...prev, track, level }));

    // Force single participation for Student and Parent roles
    if (isStudentRole || isParentRole) {
        setParticipationType('single');
    }
  }, [id, isStudentRole, isParentRole]);

  // Validation Helper
  const validateBasic = () => {
      if (!formData.region) {
          alert('请选择参赛赛区');
          return false;
      }
      return true;
  };

  const handleConfirm = () => {
      if (!validateBasic()) return;
      
      let finalSelectedStudents: any[] = [];

      if (isStudentRole) {
          // Validate Student Form
          if (!studentFormData.name || !studentFormData.idNumber || !studentFormData.school) {
              alert('请完善选手信息');
              return;
          }
          // Construct a student object from the form
          finalSelectedStudents = [{
              id: 'student_self',
              ...studentFormData
          }];
      } else {
          // Teacher/Parent Logic
          if (selectedStudentIds.length === 0) {
              alert('请至少添加一名参赛选手');
              return;
          }
          
          if (participationType === 'team' && !formData.teamName) {
              alert('请选择参赛团队');
              return;
          }

          finalSelectedStudents = linkedStudents.filter(s => selectedStudentIds.includes(s.id));
      }

      navigate('/registration-confirm', {
          state: { 
              formData, 
              selectedStudents: finalSelectedStudents, 
              participationType, 
              competitionId: id 
          }
      });
  };

  const handleTeamSelect = (team: any) => {
      setSelectedTeamId(team.id);
      setFormData({...formData, teamName: team.name});
      // Auto-populate students from team
      if (team.memberIds && team.memberIds.length > 0) {
          setSelectedStudentIds(team.memberIds);
      }
      setShowTeamPicker(false);
  };

  const handleSaveManual = () => {
      if (!manualForm.name || !manualForm.idNumber) {
          alert('请填写姓名和证件号码');
          return;
      }
      const newStudent = {
          id: `manual_${Date.now()}`,
          ...manualForm,
          phone: '',
          grade: '',
          teacher: '',
          relation: '新增',
          avatarColor: 'bg-stone-400',
          avatarUrl: ''
      };
      setLinkedStudents(prev => [...prev, newStudent]);
      setSelectedStudentIds(prev => [...prev, newStudent.id]);
      setShowManualEntry(false);
      setManualForm({ name: '', gender: '男', idType: '身份证', idNumber: '', school: '' }); // Reset
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <Header title="参赛报名" />

      <div className="p-5 flex-1 overflow-y-auto pb-32 space-y-6">
          
          {/* Competition Info Block */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
              <div className="bg-stone-50/50 px-5 py-3 border-b border-stone-100 flex justify-between items-center">
                  <h3 className="font-bold text-stone-800 text-sm font-serif">赛事信息</h3>
                  <span className="text-xs text-stone-400">请确认信息准确</span>
              </div>
              <div className="px-5">
                  <div className="py-4 border-b border-stone-50 flex justify-between items-center">
                      <span className="text-sm text-stone-500 font-medium">赛道 (自动填充)</span>
                      <div className="flex items-center text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                          <span className="text-sm font-bold mr-1.5">{formData.track}</span>
                          <Lock size={12} className="text-stone-400" />
                      </div>
                  </div>
                  <div 
                      className="py-4 border-b border-stone-50 flex justify-between items-center cursor-pointer group"
                      onClick={() => setShowLevelPicker(true)}
                  >
                      <span className="text-sm text-stone-500 font-medium">组别</span>
                      <div className="flex items-center text-stone-800">
                          <span className="text-sm font-bold mr-2">{formData.level}</span>
                          <ChevronRight size={16} className="text-stone-300 group-hover:text-primary transition-colors" />
                      </div>
                  </div>
                  <div 
                      className="py-4 flex justify-between items-center cursor-pointer group"
                      onClick={() => setShowRegionPicker(true)}
                  >
                      <span className="text-sm text-stone-500 font-medium">参赛赛区</span>
                      <div className="flex items-center text-primary">
                          <MapPin size={14} className="mr-1 text-primary" />
                          <span className="text-sm font-bold mr-2">{formData.region}</span>
                          <ChevronRight size={16} className="text-primary/50 group-hover:translate-x-1 transition-transform" />
                      </div>
                  </div>
              </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
              <h3 className="font-bold text-stone-800 text-sm mb-4 font-serif">选手信息</h3>

              {isTeacherRole && (
                  <div className="mb-5">
                      <div className="flex bg-stone-100 p-1 rounded-xl relative">
                          <button 
                              onClick={() => {
                                  setParticipationType('single');
                                  // Keep selected IDs or clear? Usually clear when switching modes to avoid confusion
                                  setSelectedStudentIds([]);
                                  setSelectedTeamId('');
                                  setFormData(prev => ({...prev, teamName: ''}));
                              }}
                              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${participationType === 'single' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                          >
                              <User size={14} className="mr-1.5" /> 个人参赛
                          </button>
                          <button 
                              onClick={() => {
                                  setParticipationType('team');
                                  setSelectedStudentIds([]);
                                  setSelectedTeamId('');
                                  setFormData(prev => ({...prev, teamName: ''}));
                              }}
                              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${participationType === 'team' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                          >
                              <Users size={14} className="mr-1.5" /> 团队参赛
                          </button>
                      </div>
                  </div>
              )}

              {/* Student Role: Editable Form */}
              {isStudentRole ? (
                  <div className="space-y-4 animate-fade-in">
                      <div className="flex justify-center mb-2">
                           <div className="w-20 h-20 rounded-full bg-stone-100 border-2 border-stone-200 overflow-hidden relative">
                               {studentFormData.avatarUrl ? (
                                   <img src={studentFormData.avatarUrl} className="w-full h-full object-cover" />
                               ) : (
                                   <div className="w-full h-full flex items-center justify-center"><User size={24} className="text-stone-300" /></div>
                               )}
                               <div className="absolute bottom-0 w-full bg-black/30 h-6 flex items-center justify-center">
                                   <Edit2 size={12} className="text-white" />
                               </div>
                           </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                              <label className="text-xs font-bold text-stone-500 mb-1 block">姓名</label>
                              <input type="text" value={studentFormData.name} onChange={(e) => setStudentFormData({...studentFormData, name: e.target.value})} className="w-full p-2.5 bg-stone-50 rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/10" />
                          </div>
                          <div>
                              <label className="text-xs font-bold text-stone-500 mb-1 block">性别</label>
                              <select value={studentFormData.gender} onChange={(e) => setStudentFormData({...studentFormData, gender: e.target.value})} className="w-full p-2.5 bg-stone-50 rounded-xl font-bold text-sm outline-none appearance-none">
                                  {genders.map(g => <option key={g}>{g}</option>)}
                              </select>
                          </div>
                      </div>
                      
                      <div>
                          <label className="text-xs font-bold text-stone-500 mb-1 block">证件号码</label>
                          <div className="flex gap-2">
                              <select value={studentFormData.idType} onChange={(e) => setStudentFormData({...studentFormData, idType: e.target.value})} className="w-1/3 p-2.5 bg-stone-50 rounded-xl font-bold text-xs outline-none appearance-none">
                                  {idTypes.map(t => <option key={t}>{t}</option>)}
                              </select>
                              <input type="text" value={studentFormData.idNumber} onChange={(e) => setStudentFormData({...studentFormData, idNumber: e.target.value})} className="flex-1 p-2.5 bg-stone-50 rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/10" />
                          </div>
                      </div>

                      <div>
                          <label className="text-xs font-bold text-stone-500 mb-1 block">所在学校</label>
                          <input type="text" value={studentFormData.school} onChange={(e) => setStudentFormData({...studentFormData, school: e.target.value})} className="w-full p-2.5 bg-stone-50 rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/10" />
                      </div>
                  </div>
              ) : (
                  // Teacher/Parent Role: Improved Selection UI
                  <div className="space-y-4 animate-fade-in">
                      
                      {/* Team Selection (Teacher Only) */}
                      {participationType === 'team' && (
                          <div onClick={() => setShowTeamPicker(true)} className="w-full bg-stone-50 border-2 border-stone-100 rounded-xl p-4 flex justify-between items-center cursor-pointer hover:border-primary/30 transition-colors mb-4">
                              <div>
                                  <label className="text-xs text-stone-400 block mb-1">选择团队</label>
                                  <span className={`font-bold text-base ${formData.teamName ? 'text-stone-800' : 'text-stone-400'}`}>{formData.teamName || '点击选择团队'}</span>
                              </div>
                              <ChevronDown size={18} className="text-stone-400" />
                          </div>
                      )}

                      {/* Selected List - Main View */}
                      <div className="space-y-3">
                          {selectedStudentIds.length > 0 ? (
                              <>
                                <div className="flex items-center justify-between px-1 mb-1">
                                    <span className="text-xs font-bold text-stone-500">
                                        已选 {selectedStudentIds.length} 位选手
                                    </span>
                                    <span className="text-[10px] text-stone-400">滑动删除</span>
                                </div>
                                {linkedStudents.filter(s => selectedStudentIds.includes(s.id)).map(student => (
                                    <div key={student.id} className="bg-stone-50 border border-stone-200 rounded-xl p-3 flex justify-between items-center shadow-sm relative group overflow-hidden">
                                        <div className="flex items-center relative z-10">
                                            <div className="w-10 h-10 bg-stone-200 rounded-full overflow-hidden mr-3 border-2 border-white shadow-sm">
                                                {student.avatarUrl ? <img src={student.avatarUrl} className="w-full h-full object-cover"/> : <div className="flex items-center justify-center h-full text-stone-400"><User size={16} /></div>}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-stone-800 flex items-center">
                                                    {student.name}
                                                    {student.gender === '女' && <span className="text-[10px] ml-2 text-pink-400 bg-pink-50 px-1 rounded">女</span>}
                                                </div>
                                                <div className="text-xs text-stone-400">{student.idNumber}</div>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => setSelectedStudentIds(prev => prev.filter(id => id !== student.id))} 
                                            className="p-2 bg-white hover:bg-red-50 text-stone-400 hover:text-red-500 rounded-lg transition-colors border border-stone-100 shadow-sm z-10"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                
                                {/* Add More Button */}
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <button 
                                        onClick={() => setShowStudentSelector(true)}
                                        className="py-3 rounded-xl border border-primary/30 text-primary font-bold text-xs bg-primary/5 hover:bg-primary/10 transition-colors flex items-center justify-center"
                                    >
                                        <Users size={14} className="mr-1.5" /> {isParentRole ? '从孩子列表选' : '从名单库选'}
                                    </button>
                                    <button 
                                        onClick={() => setShowManualEntry(true)}
                                        className="py-3 rounded-xl border border-stone-200 text-stone-600 font-bold text-xs bg-stone-50 hover:bg-stone-100 transition-colors flex items-center justify-center"
                                    >
                                        <Plus size={14} className="mr-1.5" /> 手动添加
                                    </button>
                                </div>
                              </>
                          ) : (
                              /* Empty State - Prominent Actions */
                              <div className="border-2 border-dashed border-stone-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-stone-50/50 hover:bg-stone-50 transition-colors">
                                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-3 text-stone-400">
                                      <User size={24} />
                                  </div>
                                  <p className="text-stone-400 text-xs mb-4 font-medium">暂未添加参赛选手</p>
                                  <div className="flex gap-3 w-full">
                                      <button 
                                        onClick={() => setShowStudentSelector(true)}
                                        className="flex-1 py-3 bg-white text-stone-700 rounded-xl text-xs font-bold border border-stone-200 hover:border-primary/50 hover:text-primary shadow-sm transition-all flex items-center justify-center"
                                      >
                                         <Users size={14} className="mr-1.5" /> 
                                         {isParentRole ? '选择孩子' : '从名单库选'}
                                      </button>
                                      <button 
                                        onClick={() => setShowManualEntry(true)}
                                        className="flex-1 py-3 bg-primary text-white rounded-xl text-xs font-bold shadow-md shadow-red-900/10 hover:bg-primary-dark transition-all flex items-center justify-center"
                                      >
                                         <Plus size={14} className="mr-1.5" /> 手动添加
                                      </button>
                                  </div>
                              </div>
                          )}
                      </div>
                  </div>
              )}
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
              <h3 className="font-bold text-stone-800 text-sm mb-4 font-serif">补充信息</h3>
              <div className="space-y-4">
                  <div className="relative">
                      <label className="absolute left-3 top-3 text-xs font-bold text-stone-400 flex items-center">
                          <Phone size={12} className="mr-1"/> 联系电话
                      </label>
                      <input 
                          type="tel" 
                          value={formData.contactPhone} 
                          onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                          className="w-full bg-stone-50 rounded-xl px-3 pt-8 pb-3 text-sm font-bold text-stone-800 outline-none focus:ring-2 focus:ring-primary/20"
                      />
                  </div>
                  <div className="relative">
                      <label className="absolute left-3 top-3 text-xs font-bold text-stone-400 flex items-center">
                          <FileText size={12} className="mr-1"/> 作品名称 (选填)
                      </label>
                      <input 
                          type="text" 
                          value={formData.workName} 
                          onChange={(e) => setFormData({...formData, workName: e.target.value})}
                          placeholder="可在后续上传时填写"
                          className="w-full bg-stone-50 rounded-xl px-3 pt-8 pb-3 text-sm font-bold text-stone-800 outline-none focus:ring-2 focus:ring-primary/20"
                      />
                  </div>
              </div>
          </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-md px-6 py-4 border-t border-stone-100 flex items-center justify-center z-30 shadow-lg">
          <button 
              onClick={handleConfirm}
              className="w-full bg-primary text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-red-900/20 hover:bg-primary-dark transition-all active:scale-95"
          >
              下一步：确认信息
          </button>
      </div>

      {/* Pickers (Region, Team, Student, Manual, Level) */}
      {[
          { show: showRegionPicker, setShow: setShowRegionPicker, items: regions, title: '选择参赛赛区', onSelect: (v: string) => setFormData({...formData, region: v}) },
          { show: showLevelPicker, setShow: setShowLevelPicker, items: levels, title: '修改组别', onSelect: (v: string) => setFormData({...formData, level: v}) },
      ].map(({ show, setShow, items, title, onSelect }, idx) => (
          show && (
            <div key={idx} className="fixed inset-0 z-50 flex items-end justify-center">
                <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm" onClick={() => setShow(false)}></div>
                <div className="bg-white w-full max-w-md rounded-t-3xl relative z-10 animate-slide-up">
                    <div className="px-6 py-4 border-b border-stone-50 flex justify-between items-center">
                        <h3 className="font-bold text-stone-800 font-serif">{title}</h3>
                        <button onClick={() => setShow(false)} className="p-2 bg-stone-50 rounded-full text-stone-400"><X size={20} /></button>
                    </div>
                    <div className="p-2 max-h-[60vh] overflow-y-auto">
                        {items.map((item) => (
                            <button 
                                key={item}
                                onClick={() => { onSelect(item); setShow(false); }}
                                className="w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold hover:bg-stone-50 flex justify-between items-center text-stone-700"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
          )
      ))}

      {/* Team Picker */}
      {showTeamPicker && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
              <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm" onClick={() => setShowTeamPicker(false)}></div>
              <div className="bg-white w-full max-w-md rounded-t-3xl relative z-10 animate-slide-up">
                  <div className="px-6 py-4 border-b border-stone-50 flex justify-between items-center">
                      <h3 className="font-bold text-stone-800 font-serif">选择团队</h3>
                      <button onClick={() => setShowTeamPicker(false)} className="p-2 bg-stone-50 rounded-full text-stone-400"><X size={20} /></button>
                  </div>
                  <div className="p-2 max-h-[60vh] overflow-y-auto">
                      {linkedTeams.map((team) => (
                          <button 
                              key={team.id}
                              onClick={() => handleTeamSelect(team)}
                              className="w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold hover:bg-stone-50 flex justify-between items-center text-stone-700"
                          >
                              <span>{team.name}</span>
                              <span className="text-xs text-stone-400">{team.members}人</span>
                          </button>
                      ))}
                  </div>
              </div>
          </div>
      )}
      
      {/* Student Selector (Existing Roster) */}
      {showStudentSelector && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
                <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm" onClick={() => setShowStudentSelector(false)}></div>
                <div className="bg-white w-full max-w-md rounded-t-3xl relative z-10 animate-slide-up h-[70vh] flex flex-col">
                    <div className="px-6 py-4 border-b border-stone-50 flex justify-between items-center">
                        <h3 className="font-bold text-stone-800 font-serif">选择选手</h3>
                        <button onClick={() => setShowStudentSelector(false)} className="p-2 bg-stone-50 rounded-full text-stone-400"><X size={20} /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {linkedStudents.map(student => {
                            const isSelected = selectedStudentIds.includes(student.id);
                            return (
                                <div key={student.id} onClick={() => {
                                    if (isSelected) setSelectedStudentIds(prev => prev.filter(id => id !== student.id));
                                    else setSelectedStudentIds(prev => [...prev, student.id]);
                                }} className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${isSelected ? 'border-primary bg-primary/5' : 'border-stone-100'}`}>
                                    <div className="flex items-center">
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${isSelected ? 'bg-primary border-primary' : 'border-stone-300'}`}>
                                            {isSelected && <Check size={14} className="text-white" />}
                                        </div>
                                        <div>
                                            <div className="font-bold text-stone-800 text-sm">{student.name}</div>
                                            <div className="text-xs text-stone-400">{student.idNumber}</div>
                                        </div>
                                    </div>
                                    {student.school && <span className="text-[10px] text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded truncate max-w-[100px]">{student.school}</span>}
                                </div>
                            );
                        })}
                    </div>
                    <div className="p-4 border-t border-stone-100">
                        <button onClick={() => setShowStudentSelector(false)} className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow-md">确认选择 ({selectedStudentIds.length})</button>
                    </div>
                </div>
          </div>
      )}

      {/* Manual Entry Modal (New Implementation) */}
      {showManualEntry && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
              <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setShowManualEntry(false)}></div>
              <div className="bg-white w-full max-w-md rounded-t-3xl p-6 relative z-10 animate-slide-up">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-stone-800 font-serif">手动添加选手</h3>
                      <button onClick={() => setShowManualEntry(false)} className="p-2 bg-stone-50 rounded-full text-stone-400 hover:bg-stone-100"><X size={20} /></button>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                      <div>
                          <label className="text-xs font-bold text-stone-500 mb-1 block ml-1">姓名</label>
                          <input 
                              value={manualForm.name} 
                              onChange={e => setManualForm({...manualForm, name: e.target.value})}
                              className="w-full bg-stone-50 p-3 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20" 
                              placeholder="请输入选手姓名"
                          />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                              <label className="text-xs font-bold text-stone-500 mb-1 block ml-1">性别</label>
                              <select 
                                  value={manualForm.gender} 
                                  onChange={e => setManualForm({...manualForm, gender: e.target.value})}
                                  className="w-full bg-stone-50 p-3 rounded-xl text-sm font-bold outline-none appearance-none"
                              >
                                  <option>男</option>
                                  <option>女</option>
                              </select>
                          </div>
                          <div>
                              <label className="text-xs font-bold text-stone-500 mb-1 block ml-1">证件类型</label>
                              <select 
                                  value={manualForm.idType} 
                                  onChange={e => setManualForm({...manualForm, idType: e.target.value})}
                                  className="w-full bg-stone-50 p-3 rounded-xl text-sm font-bold outline-none appearance-none"
                              >
                                  <option>身份证</option>
                                  <option>护照</option>
                              </select>
                          </div>
                      </div>

                      <div>
                          <label className="text-xs font-bold text-stone-500 mb-1 block ml-1">证件号码</label>
                          <input 
                              value={manualForm.idNumber} 
                              onChange={e => setManualForm({...manualForm, idNumber: e.target.value})}
                              className="w-full bg-stone-50 p-3 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20" 
                              placeholder="请输入证件号码"
                          />
                      </div>

                      <div>
                          <label className="text-xs font-bold text-stone-500 mb-1 block ml-1">学校 (选填)</label>
                          <input 
                              value={manualForm.school} 
                              onChange={e => setManualForm({...manualForm, school: e.target.value})}
                              className="w-full bg-stone-50 p-3 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20" 
                              placeholder="请输入学校名称"
                          />
                      </div>
                  </div>

                  <button 
                      onClick={handleSaveManual}
                      className="w-full bg-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-900/20 active:scale-95 transition-all"
                  >
                      保存并添加
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};

export default Registration;
