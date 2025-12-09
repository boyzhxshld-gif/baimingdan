
import React from 'react';
import { UserCircle, Database, Trophy, FileText, CheckCircle2, ArrowRight, GitMerge, PlayCircle, RefreshCw, ChevronRight, Users, ShieldCheck } from 'lucide-react';
import Header from '../components/Header';

const WorkflowGuide: React.FC = () => {
  const userRole = localStorage.getItem('userRole') || 'TEACHER';
  const isStudent = userRole === 'STUDENT';
  const isParent = userRole === 'PARENT';
  const isTeacher = userRole === 'TEACHER';

  const getSteps = () => {
      if (isStudent) {
          return [
              { title: '身份确认', desc: '登录学生账号', icon: UserCircle, color: 'blue' },
              { title: '完善资料', desc: '填写个人报名资料', icon: FileText, color: 'orange' },
              { title: '选赛报名', desc: '选择赛事并确认', icon: Trophy, color: 'purple' },
              { title: '参赛流程', desc: '上传作品 / 参加比赛', icon: PlayCircle, color: 'green' },
          ];
      } else if (isParent) {
          return [
              { title: '家长认证', desc: '完成家长身份认证', icon: ShieldCheck, color: 'blue' },
              { title: '认领/添加', desc: '关联孩子信息', icon: Users, color: 'orange' },
              { title: '代理报名', desc: '为孩子选择赛事报名', icon: Trophy, color: 'purple' },
              { title: '进度管理', desc: '跟进比赛与上传作品', icon: RefreshCw, color: 'green' },
          ];
      } else { // Teacher
          return [
              { title: '教师认证', desc: '完成身份验证', icon: ShieldCheck, color: 'blue' },
              { title: '学生管理', desc: '批量导入/管理学生', icon: Database, color: 'orange' },
              { title: '团队/个人报名', desc: '组织学生或团队参赛', icon: Users, color: 'purple' },
              { title: '赛事管理', desc: '统一查看学生进度', icon: FileText, color: 'green' },
          ];
      }
  };

  const steps = getSteps();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header title="新手流程指引" />
      
      <div className="flex-1 overflow-auto p-4 relative bg-[#F3F4F6]" style={{
        backgroundImage: 'radial-gradient(#E5E7EB 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}>
        
        <div className="max-w-md mx-auto space-y-8 relative pb-20 pt-4">
          
          <div className="text-center mb-8">
              <h2 className="text-xl font-black text-slate-800">
                  {isStudent ? '学生参赛指引' : isParent ? '家长操作指引' : '教师管理指引'}
              </h2>
              <p className="text-slate-500 text-sm mt-1">只需简单4步，开启您的{isTeacher ? '管理' : '参赛'}之旅</p>
          </div>

          {steps.map((step, index) => (
              <React.Fragment key={index}>
                  <div className="relative z-10">
                    <div className={`bg-white rounded-2xl shadow-card border-2 border-${step.color}-100 p-5 w-72 mx-auto relative group hover:border-${step.color}-400 transition-colors`}>
                       <div className={`absolute -top-3 left-4 bg-${step.color}-100 text-${step.color}-700 text-[10px] font-bold px-3 py-1 rounded-full border border-${step.color}-200 uppercase`}>
                          STEP {index + 1}: {step.title}
                       </div>
                       <div className="flex items-start mt-2">
                          <div className={`bg-${step.color}-50 p-2.5 rounded-xl mr-4 flex-shrink-0`}>
                             <step.icon size={28} className={`text-${step.color}-600`} />
                          </div>
                          <div>
                             <h3 className="font-bold text-slate-800 text-sm">{step.title}</h3>
                             <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                {step.desc}
                             </p>
                          </div>
                       </div>
                       {index > 0 && <div className={`absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border-2 border-${steps[index-1].color}-300 rounded-full z-20`}></div>}
                       {index < steps.length - 1 && <div className={`absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border-2 border-${step.color}-400 rounded-full z-20`}></div>}
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                      <div className="h-10 w-0.5 bg-slate-300 mx-auto -my-1">
                         <div className="w-full h-full flex flex-col items-center justify-center">
                             <div className="w-1 h-1 bg-slate-300 rounded-full mb-1"></div>
                             <div className="w-1 h-1 bg-slate-300 rounded-full mb-1"></div>
                             <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                         </div>
                      </div>
                  )}
              </React.Fragment>
          ))}

          {/* Post-Loop */}
          <div className="relative z-10 pt-4">
             <div className="border-2 border-dashed border-slate-300 rounded-3xl p-5 w-80 mx-auto bg-slate-50">
                 <h4 className="text-xs font-bold text-slate-400 text-center mb-4 uppercase tracking-wider">后续流程</h4>
                 
                 <div className="space-y-3">
                    <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                           <CheckCircle2 size={16} className="text-blue-600" />
                        </div>
                        <div>
                            <span className="block text-xs font-bold text-slate-700">系统通知</span>
                            <span className="text-[10px] text-slate-400">关注消息中心，获取评审结果</span>
                        </div>
                    </div>
                 </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WorkflowGuide;
