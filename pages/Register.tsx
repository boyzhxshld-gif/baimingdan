
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Phone, Lock, CheckCircle2, School, User, ArrowRight, Building2, BadgeCheck, ChevronLeft, BookOpen, X, Users } from 'lucide-react';

const Register: React.FC = () => {
  const navigate = useNavigate();
  
  // State Management
  const [selectedRole, setSelectedRole] = useState<'STUDENT' | 'PARENT' | 'TEACHER'>('STUDENT');
  const [registrationStep, setRegistrationStep] = useState<1 | 2>(1); // 1: Account, 2: Verification (Teacher Only)
  const [showSchoolPicker, setShowSchoolPicker] = useState(false);
  
  // Form Fields
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [teacherInfo, setTeacherInfo] = useState({ name: '', school: '', idCard: '' });
  const [agreed, setAgreed] = useState(false);

  // Mock Schools
  const mockSchools = [
      '北京市海淀区第一实验小学',
      '北京市中关村第一小学',
      '北京市人大附中',
      '清华大学附属小学',
      '朝阳区实验小学',
      '上海市实验学校',
      '广州市天河区华阳小学',
      '新东方教育科技集团',
      '学而思教育'
  ];

  // Handlers
  const handleNextStep = () => {
      if (!phone || !code || !password) {
          alert('请完善账号信息');
          return;
      }
      if (!agreed) {
          alert('请先同意用户协议');
          return;
      }
      setRegistrationStep(2);
  };

  const handleFinalSubmit = () => {
      // Registration Validation
      if (selectedRole === 'TEACHER' && registrationStep === 2) {
         if (!teacherInfo.name || !teacherInfo.school || !teacherInfo.idCard) return alert('请完善教师信息');
      }
      if (selectedRole === 'STUDENT' || selectedRole === 'PARENT') {
          if (!phone || !code || !password) return alert('请完善注册信息');
          if (!agreed) return alert('请同意协议');
      }

      // Simulate API Call & Save Role
      localStorage.setItem('userRole', selectedRole);
      navigate('/mine');
  };

  const handleSchoolSelect = (school: string) => {
      setTeacherInfo({...teacherInfo, school});
      setShowSchoolPicker(false);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center overflow-hidden bg-[#7f1d1d]">
       {/* Background Pattern - Match Login */}
       <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L19.515 8.485 18.1 7.07 25.172 0h2.828zM32 0l-6.485 6.485 1.415 1.415L34.828 0H32zm5.657 0l-6.485 6.485 1.415 1.415L39.072 0h-1.415zM0 0l21.213 21.213-1.414 1.414L0 2.828V0zm60 0L38.787 21.213l1.414 1.414L60 2.828V0zM0 60l21.213-21.213-1.414-1.414L0 57.172V60zm60 0L38.787 38.787l1.414-1.414L60 57.172V60z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
      }}></div>
      
      {/* Decorative Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none"></div>
      
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-20">
          <button onClick={() => navigate('/login')} className="text-white/80 flex items-center hover:text-white transition-colors bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <ChevronLeft size={20} className="mr-1" /> <span className="text-xs font-bold">返回登录</span>
          </button>
      </div>
      
      <div className="w-full max-w-md px-6 relative z-10 flex flex-col h-full pt-20 pb-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl font-black text-white tracking-tight drop-shadow-md font-serif mb-2">
                注册新账号
            </h1>
            <p className="text-amber-100 text-sm font-medium opacity-80">
                加入语言素养大赛，开启精彩旅程
            </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#fdfbf7] rounded-[2rem] shadow-2xl shadow-black/30 overflow-hidden p-8 animate-slide-up relative border border-amber-100">
            
            {/* Role Selector */}
            <div className="mb-6">
                <p className="text-xs font-bold text-stone-400 mb-3 text-center uppercase tracking-wide">选择注册身份</p>
                <div className="flex bg-stone-100 p-1.5 rounded-xl border border-stone-200 shadow-inner">
                    <button 
                        onClick={() => { setSelectedRole('STUDENT'); setRegistrationStep(1); }}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold flex flex-col items-center justify-center transition-all duration-300 ${
                            selectedRole === 'STUDENT' 
                            ? 'bg-[#7f1d1d] text-white shadow-md' 
                            : 'text-stone-400 hover:text-stone-600'
                        }`}
                    >
                        <User size={16} className="mb-1" /> 学生
                    </button>
                    <button 
                        onClick={() => { setSelectedRole('PARENT'); setRegistrationStep(1); }}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold flex flex-col items-center justify-center transition-all duration-300 ${
                            selectedRole === 'PARENT' 
                            ? 'bg-[#7f1d1d] text-white shadow-md' 
                            : 'text-stone-400 hover:text-stone-600'
                        }`}
                    >
                        <Users size={16} className="mb-1" /> 家长
                    </button>
                    <button 
                        onClick={() => { setSelectedRole('TEACHER'); setRegistrationStep(1); }}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold flex flex-col items-center justify-center transition-all duration-300 ${
                            selectedRole === 'TEACHER' 
                            ? 'bg-[#7f1d1d] text-white shadow-md' 
                            : 'text-stone-400 hover:text-stone-600'
                        }`}
                    >
                        <School size={16} className="mb-1" /> 老师
                    </button>
                </div>
            </div>

            {/* Form Content */}
            <div className="space-y-4">
                
                {/* Step 1: Basic Account Info */}
                {registrationStep === 1 && (
                    <div className="animate-fade-in space-y-4">
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 border-r border-stone-300 pr-3 font-bold text-sm">
                                +86
                            </div>
                            <input 
                                type="tel" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="请输入手机号码"
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 pl-20 pr-4 text-stone-800 font-bold placeholder:font-normal placeholder:text-stone-400 focus:bg-white focus:border-amber-600/50 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all"
                            />
                            <Phone size={18} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-stone-400" />
                        </div>

                        <div className="flex space-x-3">
                            <div className="relative flex-1 group">
                                <input 
                                    type="text" 
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="6位验证码"
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 px-4 text-stone-800 font-bold placeholder:font-normal placeholder:text-stone-400 focus:bg-white focus:border-amber-600/50 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all"
                                />
                            </div>
                            <button className="bg-stone-100 text-stone-600 font-bold px-4 rounded-xl text-xs hover:bg-stone-200 transition-colors whitespace-nowrap border border-stone-200">
                                获取验证码
                            </button>
                        </div>

                        <div className="relative group">
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="设置登录密码 (6-20位)"
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 pl-4 pr-10 text-stone-800 font-bold placeholder:font-normal placeholder:text-stone-400 focus:bg-white focus:border-amber-600/50 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all"
                            />
                            <Lock size={18} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-stone-400" />
                        </div>
                    </div>
                )}

                {/* Step 2: Teacher Verification (Only for Teachers) */}
                {selectedRole === 'TEACHER' && registrationStep === 2 && (
                    <div className="animate-slide-up">
                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4 flex items-start">
                            <BadgeCheck size={20} className="text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-amber-800 leading-relaxed">
                                为保障赛事规范，老师注册需验证真实身份。认证通过后即可管理班级。
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-stone-500 ml-1 mb-1 block">真实姓名</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        value={teacherInfo.name}
                                        onChange={(e) => setTeacherInfo({...teacherInfo, name: e.target.value})}
                                        placeholder="请输入身份证姓名"
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3.5 pl-10 pr-4 text-stone-800 font-bold focus:bg-white focus:border-amber-600/50 outline-none transition-all"
                                    />
                                    <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                                </div>
                            </div>
                             <div>
                                <label className="text-xs font-bold text-stone-500 ml-1 mb-1 block">身份证号</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        value={teacherInfo.idCard}
                                        onChange={(e) => setTeacherInfo({...teacherInfo, idCard: e.target.value})}
                                        placeholder="请输入18位身份证号"
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3.5 pl-10 pr-4 text-stone-800 font-bold focus:bg-white focus:border-amber-600/50 outline-none transition-all"
                                    />
                                    <BadgeCheck size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-stone-500 ml-1 mb-1 block">任教学校/机构</label>
                                <div className="relative">
                                    <div 
                                        onClick={() => setShowSchoolPicker(true)}
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3.5 pl-10 pr-10 text-stone-800 font-bold cursor-pointer flex items-center overflow-hidden whitespace-nowrap"
                                    >
                                        {teacherInfo.school || <span className="text-stone-400 font-normal">请选择任教学校或机构</span>}
                                    </div>
                                    <Building2 size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                                    <ChevronRight size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Agreement */}
            {registrationStep === 1 && (
                <div className="mt-6 flex items-center justify-center bg-stone-50 p-3 rounded-xl">
                    <div 
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-2 flex-shrink-0 cursor-pointer transition-colors ${agreed ? 'bg-[#7f1d1d] border-[#7f1d1d]' : 'border-stone-300 bg-white'}`}
                        onClick={() => setAgreed(!agreed)}
                    >
                        {agreed && <CheckCircle2 size={12} className="text-white" />}
                    </div>
                    <p className="text-xs text-stone-500 leading-tight">
                        同意 <span className="text-[#7f1d1d] font-bold">《用户协议》</span> 与 <span className="text-[#7f1d1d] font-bold">《隐私政策》</span>
                    </p>
                </div>
            )}

            {/* Action Button */}
            <div className="mt-6">
                {selectedRole === 'TEACHER' && registrationStep === 1 ? (
                    <button 
                        onClick={handleNextStep}
                        className="w-full bg-stone-800 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-stone-900 active:scale-[0.98] transition-all flex items-center justify-center"
                    >
                        下一步：身份认证
                        <ArrowRight size={18} className="ml-2" />
                    </button>
                ) : (
                    <button 
                        onClick={handleFinalSubmit}
                        className="w-full font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center text-white bg-gradient-to-r from-[#7f1d1d] to-[#991b1b] hover:shadow-red-900/30"
                    >
                        完成注册
                        <ChevronRight size={18} className="ml-1 opacity-80" />
                    </button>
                )}
            </div>
        </div>
      </div>

      {/* School Picker Modal */}
      {showSchoolPicker && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowSchoolPicker(false)}></div>
              <div className="bg-white w-full max-w-md rounded-t-3xl relative z-10 animate-slide-up max-h-[60vh] flex flex-col">
                  <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center">
                      <h3 className="font-bold text-stone-800">选择学校/机构</h3>
                      <button onClick={() => setShowSchoolPicker(false)} className="text-stone-400 hover:text-stone-600">
                          <X size={20} />
                      </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2">
                      {mockSchools.map((school) => (
                          <button 
                            key={school}
                            onClick={() => handleSchoolSelect(school)}
                            className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold hover:bg-stone-50 transition-colors flex items-center justify-between group ${teacherInfo.school === school ? 'bg-amber-50 text-amber-700' : 'text-stone-700'}`}
                          >
                              {school}
                              {teacherInfo.school === school && <CheckCircle2 size={16} className="text-amber-600" />}
                          </button>
                      ))}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default Register;
