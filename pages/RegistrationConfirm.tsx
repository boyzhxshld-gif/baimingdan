
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, ChevronLeft, X, Users, User } from 'lucide-react';
import Header from '../components/Header';

const RegistrationConfirm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, selectedStudents, participationType, competitionId } = location.state || {};
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleConfirm = () => {
      // Simulate API submission
      setTimeout(() => {
          setShowSuccessModal(true);
      }, 500);
  };

  const handleCloseSuccess = () => {
      setShowSuccessModal(false);
      navigate('/my-registrations');
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <Header title="报名信息确认" />

      <div className="p-5 flex-1 overflow-y-auto pb-32"> {/* Added extra padding bottom */}
          {/* Alert Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-start">
              <InfoIcon className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" size={20} />
              <p className="text-sm text-blue-800 leading-relaxed">
                  请仔细核对以下报名信息，确认无误后提交。提交后将为您生成相应的参赛记录。
              </p>
          </div>

          {/* Competition Info */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100 mb-4">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">赛事信息</h3>
              <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-stone-50 pb-2">
                      <span className="text-stone-500">参赛区域</span>
                      <span className="font-bold text-stone-800">{formData?.region}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-50 pb-2">
                      <span className="text-stone-500">赛道分组</span>
                      <span className="font-bold text-stone-800 text-right">{formData?.track}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-50 pb-2">
                      <span className="text-stone-500">组别选择</span>
                      <span className="font-bold text-stone-800">{formData?.level}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-50 pb-2">
                      <span className="text-stone-500">参赛形式</span>
                      <span className="font-bold text-stone-800">
                          {participationType === 'single' ? (selectedStudents?.length > 1 ? '批量个人报名' : '个人参赛') : '团队参赛'}
                      </span>
                  </div>
                  {participationType === 'team' && (
                      <div className="flex justify-between">
                          <span className="text-stone-500">团队名称</span>
                          <span className="font-bold text-stone-800">{formData?.teamName}</span>
                      </div>
                  )}
              </div>
          </div>

          {/* Student Info List */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100 mb-4">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">选手列表 ({selectedStudents?.length}人)</h3>
              <div className="space-y-4">
                  {selectedStudents?.map((student: any, idx: number) => (
                      <div key={student.id} className="bg-stone-50 rounded-xl p-3 border border-stone-100">
                          <div className="flex justify-between items-center mb-2">
                              <span className="font-bold text-stone-800">选手 {idx + 1}: {student.name}</span>
                              <span className="text-xs bg-white px-2 py-0.5 rounded border border-stone-200">{student.gender}</span>
                          </div>
                          <div className="text-xs text-stone-500 space-y-1">
                              <div>证件号码: {student.idNumber}</div>
                              <div>就读年级: {student.grade || '未填写'}</div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Other Info */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">其他信息</h3>
              <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-stone-50 pb-2">
                      <span className="text-stone-500">联系电话</span>
                      <span className="font-bold text-stone-800">{formData?.contactPhone}</span>
                  </div>
                  <div className="flex justify-between">
                      <span className="text-stone-500">作品名称</span>
                      <span className="font-bold text-stone-800">{formData?.workName || '未填写'}</span>
                  </div>
              </div>
          </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-md p-4 px-6 border-t border-stone-100 flex items-center justify-center z-30 shadow-lg">
        <button 
          onClick={handleConfirm}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-red-900/20 transition-all active:scale-95"
        >
          提交报名
        </button>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
              <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"></div>
              <div className="bg-white w-full max-w-sm rounded-3xl p-6 relative z-10 animate-slide-up text-center">
                  {participationType === 'team' ? (
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-primary/20">
                          <Users size={40} className="text-primary" />
                      </div>
                  ) : (
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-green-200">
                          <CheckCircle2 size={40} className="text-green-600" />
                      </div>
                  )}
                  
                  <h2 className="text-xl font-black text-stone-800 mb-2">
                      {participationType === 'team' ? '团队报名成功！' : '报名成功！'}
                  </h2>
                  <p className="text-sm text-stone-500 mb-6 leading-relaxed">
                      {participationType === 'team' 
                        ? (
                            <>
                                团队 <span className="font-bold text-primary">{formData?.teamName}</span> 已成功报名。<br/>
                                系统已为 <span className="font-bold">{selectedStudents?.length}</span> 名成员生成独立参赛编号。
                            </>
                        )
                        : selectedStudents?.length > 1 
                            ? `已成功为 ${selectedStudents.length} 名选手完成报名，生成独立参赛记录。`
                            : '恭喜您完成报名，参赛编号已生成。'
                      }
                      <br/><span className="text-xs opacity-80 mt-1 block text-stone-400">请尽快前往上传作品。</span>
                  </p>
                  
                  <button 
                      onClick={handleCloseSuccess}
                      className={`w-full text-white font-bold py-3.5 rounded-xl shadow-lg transition-all bg-primary hover:bg-primary-dark shadow-red-900/20`}
                  >
                      查看报名进度
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};

const InfoIcon = ({ className, size }: { className?: string, size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);

export default RegistrationConfirm;
