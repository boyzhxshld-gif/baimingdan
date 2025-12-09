
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { FileText, Trophy, Star, Users, MapPin, CreditCard, ShieldCheck, FileCheck, Award, Play, Trash2, Edit2, Plus, ChevronRight, ChevronDown, School, CheckCircle2, UserCircle, User, Edit3, Search, Lock, HelpCircle, LogOut, Scan, BadgeCheck, XCircle, RefreshCcw, Building2, X, CheckSquare, Square, Check, Filter, Video, MonitorPlay, Calendar, Copy, Phone, KeyRound, Bell, Trash, Globe, Image as ImageIcon, Camera, Upload, Contact, AlertCircle, Download, PlayCircle, Link, RotateCcw, ChevronLeft, MessageCircle, Save, FileBadge, Settings, Info } from 'lucide-react';

const SecondaryPage: React.FC = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  
  const userRole = localStorage.getItem('userRole') || 'TEACHER';
  const isTeacher = userRole === 'TEACHER';
  const isParent = userRole === 'PARENT';
  const isStudent = userRole === 'STUDENT';
  
  // Redirect logic for Students
  useEffect(() => {
      if (isStudent) {
          if (type === 'scores') {
              navigate('/mine/scores/student_self?type=individual', { replace: true });
          } else if (type === 'certificates') {
              navigate('/mine/certificates/student_self?type=individual', { replace: true });
          } else if (type === 'works') {
              navigate('/mine/works/student_self', { replace: true });
          }
      }
  }, [type, isStudent, navigate]);

  // Tabs
  const [archivesTab, setArchivesTab] = useState<'students' | 'teams'>('students');
  const [certTab, setCertTab] = useState<'individual' | 'team'>('individual');
  const [scoreFilterType, setScoreFilterType] = useState<'individual' | 'team'>('individual');

  // Auth Form State
  const [parentAuthForm, setParentAuthForm] = useState({ name: '', idCard: '', householdImg: '' });
  const [teacherAuthForm, setTeacherAuthForm] = useState({ name: '', idCard: '', school: '', certImg: '' });
  
  // Archives Modal State
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [studentForm, setStudentForm] = useState({ id: '', name: '', idNumber: '', school: '', grade: '' });
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [teamForm, setTeamForm] = useState({ id: '', name: '', leader: '', count: '' });

  // Address State
  const [addresses, setAddresses] = useState([
      { id: 1, name: '李华', phone: '13800138000', region: '北京市 海淀区', address: '中关村大街1号海淀科技大厦A座', isDefault: true },
      { id: 2, name: '王小明', phone: '13900139000', region: '北京市 朝阳区', address: '朝阳公园路19号', isDefault: false }
  ]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressForm, setAddressForm] = useState({ id: 0, name: '', phone: '', region: '', address: '', isDefault: false });

  // Account Management State
  const [accountInfo, setAccountInfo] = useState({
      avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&auto=format&fit=crop&q=80',
      nickname: '李华老师',
      phone: '138****8000'
  });
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ old: '', new: '', confirm: '' });

  // Mock Data
  const [studentsMock, setStudentsMock] = useState([
      { 
          id: '1', 
          name: '王小明', 
          gender: '男',
          relation: '本人', 
          school: '北京市海淀区第一实验小学', 
          institution: '新东方素质教育中心',
          idType: '身份证',
          idNumber: '110105201201011234',
          regNumber: 'STU2025001',
          avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=60',
          certCount: 3,
          competitionCount: 5,
          workCount: 3
      },
      { 
          id: '2', 
          name: '王小红', 
          gender: '女',
          relation: '妹妹', 
          school: '北京市海淀区第一实验小学', 
          institution: '',
          idType: '身份证',
          idNumber: '110105201405051234',
          regNumber: 'STU2025002',
          avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=60',
          certCount: 1,
          competitionCount: 2,
          workCount: 2
      },
      { 
          id: '3', 
          name: '李小刚', 
          gender: '男',
          relation: '学生', 
          school: '朝阳区实验小学', 
          institution: '',
          idType: '身份证',
          idNumber: '110105201306061234',
          regNumber: 'STU2025003',
          avatarUrl: '',
          certCount: 0,
          competitionCount: 1,
          workCount: 1
      }
  ]);

  const [teamsMock, setTeamsMock] = useState([
      { id: 't1', name: '飞跃梦想队', count: 5, school: '海淀实验小学', leader: '李华', avatarUrl: 'https://ui-avatars.com/api/?name=飞跃&background=random', certCount: 1, competitionCount: 1 },
      { id: 't2', name: '未来之星战队', count: 3, school: '少年宫', leader: '张老师', avatarUrl: 'https://ui-avatars.com/api/?name=未来&background=random', certCount: 0, competitionCount: 1 },
  ]);

  const messagesMock = [
      { id: 1, title: '初赛晋级通知', content: '恭喜王小明同学在第五届“讲好中国故事”演讲大赛初赛中晋级。', time: '2小时前', read: false },
      { id: 2, title: '作品上传提醒', content: '请在11月20日前完成童话剧独白表演赛的视频上传。', time: '1天前', read: true },
      { id: 3, title: '系统维护通知', content: '系统将于本周日凌晨进行例行维护。', time: '3天前', read: true }
  ];

  const favoriteCompetitions = [
      { id: '1', title: '第五届“讲好中国故事”演讲大赛', category: '演讲', status: '报名中', deadline: '2025-10-25', img: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=200&auto=format&fit=crop&q=60' },
      { id: '3', title: '青少年主持人大赛', category: '主持', status: '报名中', deadline: '2025-12-01', img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=200&auto=format&fit=crop&q=60' }
  ];
  
  // Profile Editing State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileEditForm, setProfileEditForm] = useState<any>({});

  // Helpers
  const handleEditProfile = () => {
      const student = studentsMock[0];
      setProfileEditForm({
          name: student.name,
          gender: student.gender,
          idType: student.idType,
          idNumber: student.idNumber,
          school: student.school,
          avatarUrl: student.avatarUrl
      });
      setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
      if(!profileEditForm.name || !profileEditForm.idNumber) return alert('请完善基本信息');
      setStudentsMock(prev => prev.map((s, idx) => idx === 0 ? { ...s, ...profileEditForm } : s));
      setIsEditingProfile(false);
      alert('报名资料已更新');
  };

  const handleEditAddress = (addr: any) => { setAddressForm(addr); setShowAddressModal(true); };
  const handleAddAddress = () => { setAddressForm({ id: 0, name: '', phone: '', region: '', address: '', isDefault: false }); setShowAddressModal(true); };
  
  const handleSaveAddress = () => {
      if (!addressForm.name || !addressForm.phone || !addressForm.address) return alert('请完善地址信息');
      if (addressForm.id === 0) {
          setAddresses([...addresses, { ...addressForm, id: Date.now() }]);
      } else {
          setAddresses(addresses.map(a => a.id === addressForm.id ? addressForm : a));
      }
      setShowAddressModal(false);
  };

  const handleSaveStudent = () => {
      if (!studentForm.name || !studentForm.idNumber) return alert('请填写姓名和证件号');
      if (studentForm.id) {
          setStudentsMock(prev => prev.map(s => s.id === studentForm.id ? { ...s, ...studentForm } : s));
      } else {
          setStudentsMock(prev => [...prev, { ...studentForm, id: Date.now().toString(), achievements: [], works: [], certificates: [], gender: '男', relation: '学生', institution: '', idType: '身份证', regNumber: `STU${Date.now()}`, avatarUrl: '', certCount: 0, competitionCount: 0, workCount: 0 }]);
      }
      setShowStudentModal(false);
  };

  const handleSaveTeam = () => {
      if (!teamForm.name) return alert('请填写团队名称');
      if (teamForm.id) {
          setTeamsMock(prev => prev.map(t => t.id === teamForm.id ? { ...t, ...teamForm, count: Number(teamForm.count) || 0 } : t));
      } else {
          setTeamsMock(prev => [...prev, { ...teamForm, id: Date.now().toString(), count: Number(teamForm.count) || 0, school: '', avatarUrl: `https://ui-avatars.com/api/?name=${teamForm.name}&background=random`, certCount: 0, competitionCount: 0 }]);
      }
      setShowTeamModal(false);
  };

  const handleResetAccount = () => {
      if (window.confirm('确定要重置账号吗？这将清除所有本地数据。')) {
          alert('账号已重置');
          navigate('/login');
      }
  };

  const getPageContent = (type: string | undefined) => {
    switch (type) {
      case 'scores':
        if (isStudent) return null; 
        const scoreList = scoreFilterType === 'individual' ? studentsMock : teamsMock;
        return {
            title: '成绩查询',
            content: (
                <div className="space-y-4 animate-slide-up pb-10">
                    <div className="bg-white p-1 rounded-xl flex border border-stone-200 shadow-sm mb-4">
                        <button onClick={() => setScoreFilterType('individual')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${scoreFilterType === 'individual' ? 'bg-primary text-white shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}>按学员/孩子</button>
                        <button onClick={() => setScoreFilterType('team')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${scoreFilterType === 'team' ? 'bg-primary text-white shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}>按团队</button>
                    </div>

                    <div className="space-y-3">
                        {scoreList.map((item: any) => (
                            <div key={item.id} onClick={() => navigate(`/mine/scores/${item.id}?type=${scoreFilterType}`)} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center justify-between cursor-pointer hover:border-primary/30 transition-all">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mr-4 border border-stone-200 overflow-hidden">
                                        <img src={item.avatarUrl || `https://ui-avatars.com/api/?name=${item.name}&background=random`} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-stone-800 text-sm">{item.name}</h3>
                                        <div className="flex space-x-3 mt-1 text-xs text-stone-500">
                                            <span>参赛: {item.competitionCount}次</span>
                                            <span>证书: {item.certCount}张</span>
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-stone-300" />
                            </div>
                        ))}
                    </div>
                </div>
            )
        };

      case 'certificates':
        if (isStudent) return null;
        const certList = certTab === 'individual' ? studentsMock : teamsMock;
        return {
          title: '证书下载',
          content: (
            <div className="space-y-4 animate-slide-up pb-10">
               {isTeacher && (
                   <div className="flex bg-stone-100 p-1 rounded-xl mb-2">
                        <button onClick={() => setCertTab('individual')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${certTab === 'individual' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500'}`}>个人证书</button>
                        <button onClick={() => setCertTab('team')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${certTab === 'team' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500'}`}>团队证书</button>
                   </div>
               )}

               <div className="space-y-3">
                   {certList.map((item: any) => (
                       <div key={item.id} onClick={() => navigate(`/mine/certificates/${item.id}?type=${certTab}`)} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center justify-between cursor-pointer hover:border-primary/30">
                           <div className="flex items-center">
                               <div className="w-10 h-10 bg-stone-200 rounded-full overflow-hidden mr-3"><img src={item.avatarUrl || `https://ui-avatars.com/api/?name=${item.name}&background=random`} className="w-full h-full object-cover" /></div>
                               <div>
                                   <div className="font-bold text-stone-800">{item.name}</div>
                                   <div className="text-xs text-stone-500">可下载证书: {item.certCount}</div>
                               </div>
                           </div>
                           <ChevronRight size={18} className="text-stone-300" />
                       </div>
                   ))}
               </div>
            </div>
          )
        };

      case 'works': 
        if (isStudent) return null;
        return { 
            title: isParent ? '孩子作品' : '学生作品', 
            content: (
                <div className="space-y-4 animate-slide-up pb-10">
                    <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-xs text-blue-800 mb-4">
                        请先选择{isParent ? '孩子' : '学生'}，查看其提交的所有参赛作品。
                    </div>
                    <div className="space-y-3">
                        {studentsMock.map((item: any) => (
                            <div key={item.id} onClick={() => navigate(`/mine/works/${item.id}`)} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center justify-between cursor-pointer hover:border-primary/30 transition-all">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mr-4 border border-stone-200 overflow-hidden">
                                        <img src={item.avatarUrl || `https://ui-avatars.com/api/?name=${item.name}&background=random`} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-stone-800 text-sm">{item.name}</h3>
                                        <div className="flex space-x-3 mt-1 text-xs text-stone-500">
                                            <span>作品: {item.workCount || 0}个</span>
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-stone-300" />
                            </div>
                        ))}
                    </div>
                </div>
            ) 
        };

      case 'auth':
        if (isTeacher) {
            return {
                title: '教师认证信息',
                content: (
                    <form className="space-y-6 animate-slide-up pb-10" autoComplete="off">
                        <div className="bg-blue-50 p-4 rounded-xl text-xs text-blue-800 border border-blue-100 leading-relaxed">
                            <h4 className="font-bold flex items-center mb-1"><ShieldCheck size={14} className="mr-1"/> 认证说明</h4>
                            <p>请填写真实身份信息并上传教师资格证或工作证，审核通过后将获得班级管理权限。</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 space-y-5">
                             <div><label className="text-xs font-bold text-stone-500 mb-1.5 block">真实姓名</label><input type="text" value={teacherAuthForm.name} onChange={e => setTeacherAuthForm({...teacherAuthForm, name: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-primary/30" placeholder="请输入真实姓名" autoComplete="off"/></div>
                             <div><label className="text-xs font-bold text-stone-500 mb-1.5 block">身份证号</label><input type="text" value={teacherAuthForm.idCard} onChange={e => setTeacherAuthForm({...teacherAuthForm, idCard: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-primary/30" placeholder="请输入身份证号码" autoComplete="off"/></div>
                             <div><label className="text-xs font-bold text-stone-500 mb-1.5 block">任教学校/机构</label><input type="text" value={teacherAuthForm.school} onChange={e => setTeacherAuthForm({...teacherAuthForm, school: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-primary/30" placeholder="请输入学校全称" autoComplete="off"/></div>
                             <div><label className="text-xs font-bold text-stone-500 mb-1.5 block">资格证/工作证</label><div className="w-full h-40 bg-stone-50 border-2 border-dashed border-stone-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-stone-100"><div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2"><Camera size={24} className="text-stone-400" /></div><span className="text-xs text-stone-400 font-bold">点击上传照片</span></div></div>
                        </div>
                        <button type="button" className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-900/20 active:scale-95 transition-all">提交认证申请</button>
                    </form>
                )
            };
        }
        if (isParent) {
            return {
                title: '家长身份认证',
                content: (
                    <form className="space-y-6 animate-slide-up pb-10" autoComplete="off">
                        <div className="bg-amber-50 p-4 rounded-xl text-xs text-amber-800 border border-amber-100 leading-relaxed">
                            <h4 className="font-bold flex items-center mb-1"><ShieldCheck size={14} className="mr-1"/> 认证说明</h4>
                            <p>为保障未成年人信息安全，认领/管理学生账号前需进行家长身份实名认证。请上传户口本信息页及本人身份证。</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 space-y-5">
                             <div><label className="text-xs font-bold text-stone-500 mb-1.5 block">家长姓名</label><input type="text" value={parentAuthForm.name} onChange={e => setParentAuthForm({...parentAuthForm, name: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-primary/30" placeholder="请输入您的真实姓名" autoComplete="off"/></div>
                             <div><label className="text-xs font-bold text-stone-500 mb-1.5 block">身份证号</label><input type="text" value={parentAuthForm.idCard} onChange={e => setParentAuthForm({...parentAuthForm, idCard: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-primary/30" placeholder="请输入您的身份证号码" autoComplete="off"/></div>
                             <div><label className="text-xs font-bold text-stone-500 mb-1.5 block">户口本</label><div className="w-full h-40 bg-stone-50 border-2 border-dashed border-stone-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-stone-100"><div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2"><Camera size={24} className="text-stone-400" /></div><span className="text-xs text-stone-400 font-bold">点击上传照片</span></div></div>
                        </div>
                        <button type="button" className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-900/20 active:scale-95 transition-all">提交认证申请</button>
                    </form>
                )
            };
        }
        return { 
            title: '实名认证', 
            content: (
                <div className="space-y-6 animate-slide-up pb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 text-center">
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShieldCheck size={32} className="text-green-500" />
                        </div>
                        <h3 className="font-bold text-lg text-stone-800 mb-2">已完成实名认证</h3>
                        <p className="text-xs text-stone-500 mb-6">身份证号：110105********1234</p>
                    </div>
                </div>
            ) 
        };

      case 'account':
          return {
              title: '账号信息',
              content: (
                  <div className="space-y-4 animate-slide-up pb-10">
                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center justify-between">
                          <span className="font-bold text-stone-700 text-sm">头像</span>
                          <div className="flex items-center cursor-pointer group" onClick={() => alert('点击上传新头像')}>
                              <div className="w-12 h-12 rounded-full bg-stone-200 overflow-hidden border-2 border-white shadow-sm group-hover:opacity-80">
                                  <img src={accountInfo.avatarUrl} className="w-full h-full object-cover" />
                              </div>
                              <ChevronRight size={16} className="text-stone-300 ml-2" />
                          </div>
                      </div>
                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center justify-between cursor-pointer hover:bg-stone-50" onClick={() => setShowNicknameModal(true)}>
                          <span className="font-bold text-stone-700 text-sm">昵称</span>
                          <div className="flex items-center text-stone-500 text-sm">{accountInfo.nickname}<ChevronRight size={16} className="text-stone-300 ml-2" /></div>
                      </div>
                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center justify-between cursor-pointer hover:bg-stone-50" onClick={() => setShowPhoneModal(true)}>
                          <span className="font-bold text-stone-700 text-sm">绑定手机</span>
                          <div className="flex items-center text-stone-500 text-sm">{accountInfo.phone}<span className="ml-2 text-xs bg-stone-100 px-2 py-0.5 rounded text-stone-400">修改</span></div>
                      </div>
                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center justify-between cursor-pointer hover:bg-stone-50 mt-4" onClick={() => setShowPasswordModal(true)}>
                          <span className="font-bold text-stone-700 text-sm">登录密码</span>
                          <div className="flex items-center text-stone-500 text-sm">修改密码<ChevronRight size={16} className="text-stone-300 ml-2" /></div>
                      </div>
                  </div>
              )
          };

      case 'settings':
          return {
              title: '设置',
              content: (
                  <div className="space-y-4 animate-slide-up pb-10">
                      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                          <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-stone-50 border-b border-stone-50" onClick={() => navigate('/mine/account')}>
                              <div className="flex items-center"><Lock size={18} className="text-stone-400 mr-3"/> <span className="text-sm font-bold text-stone-700">账号安全</span></div>
                              <ChevronRight size={16} className="text-stone-300" />
                          </div>
                          <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-stone-50 border-b border-stone-50">
                              <div className="flex items-center"><ShieldCheck size={18} className="text-stone-400 mr-3"/> <span className="text-sm font-bold text-stone-700">隐私政策</span></div>
                              <ChevronRight size={16} className="text-stone-300" />
                          </div>
                          <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-stone-50 border-b border-stone-50">
                              <div className="flex items-center"><FileText size={18} className="text-stone-400 mr-3"/> <span className="text-sm font-bold text-stone-700">用户协议</span></div>
                              <ChevronRight size={16} className="text-stone-300" />
                          </div>
                          <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-stone-50">
                              <div className="flex items-center"><Info size={18} className="text-stone-400 mr-3"/> <span className="text-sm font-bold text-stone-700">关于我们</span></div>
                              <span className="text-xs text-stone-400">v1.2.0</span>
                          </div>
                      </div>

                      <button 
                          onClick={handleResetAccount}
                          className="w-full bg-white text-red-500 font-bold py-4 rounded-2xl shadow-sm border border-stone-100 hover:bg-red-50 transition-colors"
                      >
                          重置账号 (清除数据)
                      </button>
                  </div>
              )
          };

      case 'messages': return { title: '消息中心', content: (<div className="space-y-3 animate-slide-up pb-10">{messagesMock.map(msg => (<div key={msg.id} className={`bg-white p-4 rounded-2xl shadow-sm border ${msg.read ? 'border-stone-100' : 'border-primary/20 bg-primary/5'} relative`}>{!msg.read && <div className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full"></div>}<div className="flex items-center mb-1"><MessageCircle size={14} className="text-primary mr-2" /><h3 className="font-bold text-stone-800 text-sm">{msg.title}</h3></div><p className="text-xs text-stone-600 leading-relaxed mb-2 pl-6">{msg.content}</p><div className="text-[10px] text-stone-400 pl-6">{msg.time}</div></div>))}</div>)};
      case 'favorites': return { title: '我的收藏', content: (<div className="space-y-4 animate-slide-up pb-10">{favoriteCompetitions.map(comp => (<div key={comp.id} onClick={() => navigate(`/competition/${comp.id}`)} className="bg-white p-3 rounded-2xl shadow-sm border border-stone-100 flex gap-3 cursor-pointer hover:border-primary/30 transition-all"><div className="w-24 h-24 rounded-xl bg-stone-200 flex-shrink-0 overflow-hidden"><img src={comp.img} className="w-full h-full object-cover" /></div><div className="flex-1 flex flex-col justify-between py-1"><div><h3 className="font-bold text-stone-800 text-sm font-serif line-clamp-2">{comp.title}</h3><div className="text-xs text-stone-500 mt-1">{comp.category} · 截止 {comp.deadline}</div></div><div className="flex justify-between items-center"><span className="text-xs font-bold text-primary">{comp.status}</span><button className="text-stone-400 hover:text-stone-600"><Star size={18} fill="currentColor" className="text-amber-400" /></button></div></div></div>))}</div>)};
      case 'address': return { title: '地址管理', content: (<div className="space-y-4 animate-slide-up pb-20">{addresses.map(addr => (<div key={addr.id} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 relative group"><div className="flex justify-between items-start mb-2"><div className="flex items-center"><span className="font-bold text-stone-800 mr-3">{addr.name}</span><span className="text-sm text-stone-500 font-medium">{addr.phone}</span>{addr.isDefault && <span className="ml-2 bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded font-bold">默认</span>}</div><button onClick={() => handleEditAddress(addr)} className="text-stone-400 hover:text-primary"><Edit2 size={16} /></button></div><p className="text-xs text-stone-600 leading-relaxed pr-8">{addr.region} {addr.address}</p></div>))}<button onClick={handleAddAddress} className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-red-900/20 flex items-center active:scale-95 transition-all"><Plus size={18} className="mr-2" /> 新增地址</button>{showAddressModal && (<div className="fixed inset-0 z-50 flex items-end justify-center"><div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setShowAddressModal(false)}></div><div className="bg-white w-full max-w-md rounded-t-3xl p-6 relative z-10 animate-slide-up"><h3 className="text-lg font-bold text-stone-800 mb-6 font-serif">{addressForm.id === 0 ? '新增地址' : '编辑地址'}</h3><div className="space-y-4 mb-6"><input placeholder="收货人姓名" value={addressForm.name} onChange={e => setAddressForm({...addressForm, name: e.target.value})} className="w-full bg-stone-50 p-3 rounded-xl text-sm outline-none font-bold" /><input placeholder="手机号码" value={addressForm.phone} onChange={e => setAddressForm({...addressForm, phone: e.target.value})} className="w-full bg-stone-50 p-3 rounded-xl text-sm outline-none font-bold" /><input placeholder="所在地区 (省市区)" value={addressForm.region} onChange={e => setAddressForm({...addressForm, region: e.target.value})} className="w-full bg-stone-50 p-3 rounded-xl text-sm outline-none font-bold" /><textarea placeholder="详细地址" value={addressForm.address} onChange={e => setAddressForm({...addressForm, address: e.target.value})} className="w-full bg-stone-50 p-3 rounded-xl text-sm outline-none font-bold h-24 resize-none" /><div className="flex items-center" onClick={() => setAddressForm({...addressForm, isDefault: !addressForm.isDefault})}><div className={`w-5 h-5 rounded border mr-2 flex items-center justify-center ${addressForm.isDefault ? 'bg-primary border-primary' : 'border-stone-300 bg-white'}`}>{addressForm.isDefault && <Check size={14} className="text-white" />}</div><span className="text-sm text-stone-600">设为默认地址</span></div></div><button onClick={handleSaveAddress} className="w-full bg-primary text-white py-3.5 rounded-xl font-bold">保存</button></div></div>)}</div>)};
      case 'profile': return { title: '个人资料', content: (
          <div className="space-y-6 animate-slide-up pb-10">
              {isEditingProfile ? (
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 space-y-4">
                      <div className="flex justify-center mb-4">
                          <div className="w-24 h-24 rounded-full bg-stone-100 border-4 border-white shadow-sm overflow-hidden relative">
                              <img src={profileEditForm.avatarUrl} className="w-full h-full object-cover" />
                              <div className="absolute bottom-0 inset-x-0 bg-black/40 text-white text-[10px] py-1 text-center">修改</div>
                          </div>
                      </div>
                      <div><label className="text-xs font-bold text-stone-500 block mb-1">姓名</label><input value={profileEditForm.name} onChange={e => setProfileEditForm({...profileEditForm, name: e.target.value})} className="w-full bg-stone-50 p-3 rounded-xl text-sm font-bold outline-none" /></div>
                      <div><label className="text-xs font-bold text-stone-500 block mb-1">证件号码</label><input value={profileEditForm.idNumber} onChange={e => setProfileEditForm({...profileEditForm, idNumber: e.target.value})} className="w-full bg-stone-50 p-3 rounded-xl text-sm font-bold outline-none" /></div>
                      <div><label className="text-xs font-bold text-stone-500 block mb-1">学校</label><input value={profileEditForm.school} onChange={e => setProfileEditForm({...profileEditForm, school: e.target.value})} className="w-full bg-stone-50 p-3 rounded-xl text-sm font-bold outline-none" /></div>
                      <div className="flex gap-3 pt-2">
                          <button onClick={() => setIsEditingProfile(false)} className="flex-1 py-3 rounded-xl bg-stone-100 text-stone-600 font-bold text-sm">取消</button>
                          <button onClick={handleSaveProfile} className="flex-1 py-3 rounded-xl bg-primary text-white font-bold text-sm">保存</button>
                      </div>
                  </div>
              ) : (
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 relative">
                      <button onClick={handleEditProfile} className="absolute top-4 right-4 p-2 rounded-full bg-stone-50 text-stone-400 hover:text-primary hover:bg-stone-100"><Edit3 size={18} /></button>
                      <div className="flex flex-col items-center mb-6">
                          <div className="w-24 h-24 rounded-full bg-stone-200 overflow-hidden border-4 border-white shadow-sm mb-3">
                              <img src={studentsMock[0].avatarUrl} className="w-full h-full object-cover" />
                          </div>
                          <h2 className="text-xl font-black text-stone-800">{studentsMock[0].name}</h2>
                          <p className="text-xs text-stone-500 mt-1">{studentsMock[0].school}</p>
                      </div>
                      <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b border-stone-50"><span className="text-stone-500 text-sm">证件类型</span><span className="font-bold text-stone-800 text-sm">{studentsMock[0].idType}</span></div>
                          <div className="flex justify-between py-2 border-b border-stone-50"><span className="text-stone-500 text-sm">证件号码</span><span className="font-bold text-stone-800 text-sm">{studentsMock[0].idNumber}</span></div>
                          <div className="flex justify-between py-2 border-b border-stone-50"><span className="text-stone-500 text-sm">性别</span><span className="font-bold text-stone-800 text-sm">{studentsMock[0].gender}</span></div>
                          <div className="flex justify-between py-2"><span className="text-stone-500 text-sm">学籍号</span><span className="font-bold text-stone-800 text-sm">{studentsMock[0].regNumber}</span></div>
                      </div>
                  </div>
              )}
          </div>
      )};
      case 'archives': 
      case 'students':
        const title = isParent ? '孩子管理' : '学生/团队管理';
        const buttonText = isParent ? '认领/添加孩子' : (archivesTab === 'students' ? '添加新学生' : '创建新团队');
        return { title: title, content: (<div className="space-y-4 animate-slide-up pb-20">{isTeacher && (<div className="flex bg-stone-100 p-1 rounded-xl mb-4"><button onClick={() => setArchivesTab('students')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${archivesTab === 'students' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500'}`}>学生管理</button><button onClick={() => setArchivesTab('teams')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${archivesTab === 'teams' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500'}`}>团队管理</button></div>)}{archivesTab === 'students' && studentsMock.map(student => (<div key={student.id} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center justify-between"><div className="flex items-center"><div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center mr-3 border border-stone-200 overflow-hidden"><img src={student.avatarUrl || `https://ui-avatars.com/api/?name=${student.name}&background=random`} className="w-full h-full object-cover" /></div><div><h3 className="font-bold text-stone-800 text-sm">{student.name}</h3><p className="text-xs text-stone-500">{student.school}</p></div></div><button onClick={() => { setStudentForm({ id: student.id, name: student.name, idNumber: student.idNumber, school: student.school, grade: '' }); setShowStudentModal(true); }} className="p-2 text-stone-400 hover:text-primary bg-stone-50 rounded-lg"><Edit2 size={16} /></button></div>))}{archivesTab === 'teams' && teamsMock.map(team => (<div key={team.id} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center justify-between"><div className="flex items-center"><div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center mr-3 border border-stone-200 overflow-hidden"><img src={team.avatarUrl} className="w-full h-full object-cover" /></div><div><h3 className="font-bold text-stone-800 text-sm">{team.name}</h3><p className="text-xs text-stone-500">成员: {team.count}人 | 领队: {team.leader}</p></div></div><button onClick={() => { setTeamForm({ id: team.id, name: team.name, leader: team.leader, count: team.count.toString() }); setShowTeamModal(true); }} className="p-2 text-stone-400 hover:text-primary bg-stone-50 rounded-lg"><Edit2 size={16} /></button></div>))}<button onClick={() => { if (archivesTab === 'students') { setStudentForm({ id: '', name: '', idNumber: '', school: '', grade: '' }); setShowStudentModal(true); } else { setTeamForm({ id: '', name: '', leader: '', count: '' }); setShowTeamModal(true); } }} className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-red-900/20 flex items-center active:scale-95 transition-all"><Plus size={18} className="mr-2" /> {buttonText}</button>{showStudentModal && (<div className="fixed inset-0 z-50 flex items-end justify-center"><div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setShowStudentModal(false)}></div><div className="bg-white w-full max-w-md rounded-t-3xl p-6 relative z-10 animate-slide-up"><h3 className="text-lg font-bold text-stone-800 mb-6 font-serif">{studentForm.id ? '编辑学生' : '添加新学生'}</h3><div className="space-y-4 mb-6"><input placeholder="姓名" value={studentForm.name} onChange={e => setStudentForm({...studentForm, name: e.target.value})} className="w-full bg-stone-50 p-3 rounded-xl text-sm outline-none font-bold" /><input placeholder="身份证号" value={studentForm.idNumber} onChange={e => setStudentForm({...studentForm, idNumber: e.target.value})} className="w-full bg-stone-50 p-3 rounded-xl text-sm outline-none font-bold" /><input placeholder="学校" value={studentForm.school} onChange={e => setStudentForm({...studentForm, school: e.target.value})} className="w-full bg-stone-50 p-3 rounded-xl text-sm outline-none font-bold" /></div><button onClick={handleSaveStudent} className="w-full bg-primary text-white py-3.5 rounded-xl font-bold">保存</button></div></div>)}{showTeamModal && (<div className="fixed inset-0 z-50 flex items-end justify-center"><div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setShowTeamModal(false)}></div><div className="bg-white w-full max-w-md rounded-t-3xl p-6 relative z-10 animate-slide-up"><h3 className="text-lg font-bold text-stone-800 mb-6 font-serif">{teamForm.id ? '编辑团队' : '创建新团队'}</h3><div className="space-y-4 mb-6"><input placeholder="团队名称" value={teamForm.name} onChange={e => setTeamForm({...teamForm, name: e.target.value})} className="w-full bg-stone-50 p-3 rounded-xl text-sm outline-none font-bold" /><input placeholder="领队老师" value={teamForm.leader} onChange={e => setTeamForm({...teamForm, leader: e.target.value})} className="w-full bg-stone-50 p-3 rounded-xl text-sm outline-none font-bold" /></div><button onClick={handleSaveTeam} className="w-full bg-primary text-white py-3.5 rounded-xl font-bold">保存</button></div></div>)}</div>)};
      default: return { title: '页面', content: <div className="p-8 text-center text-stone-400">页面建设中...</div> };
    }
  };

  const { title, content } = getPageContent(type) || { title: '', content: null };

  // If student is redirecting, don't render layout
  if (isStudent && (type === 'scores' || type === 'certificates' || type === 'works')) return null;

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <Header title={title} />
      <div className="flex-1 overflow-y-auto p-5">
        {content}
      </div>
    </div>
  );
};

export default SecondaryPage;
